import { NextResponse } from 'next/server';

async function getDarajaToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error('M-Pesa credentials are not set in environment variables.');
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  
  const response = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${auth}`
    },
    // Add cache: 'no-store' to prevent caching of the token
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to get Daraja token:', errorText);
    throw new Error(`Failed to get Daraja token. Status: ${response.status}`);
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const { amount, phone } = await request.json();
    
    if (!amount || !phone) {
        return NextResponse.json({ message: 'Amount and phone number are required.' }, { status: 400 });
    }

    const token = await getDarajaToken();
    const shortcode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    // Ensure the App URL has the protocol
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!shortcode || !passkey || !appUrl) {
        throw new Error('M-Pesa Shortcode, Passkey, or App URL not configured.');
    }

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
    
    // Sanitize phone number to Kenyan format
    let sanitizedPhone = phone.trim();
    if (sanitizedPhone.startsWith('+')) {
      sanitizedPhone = sanitizedPhone.substring(1);
    } else if (sanitizedPhone.startsWith('0')) {
      sanitizedPhone = `254${sanitizedPhone.substring(1)}`;
    }


    const callbackUrl = `${appUrl}/api/mpesa/callback`;
    console.log(`Using Callback URL: ${callbackUrl}`);

    const stkPushPayload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: sanitizedPhone,
      PartyB: shortcode,
      PhoneNumber: sanitizedPhone,
      CallBackURL: callbackUrl,
      AccountReference: "CuratedFinds",
      TransactionDesc: "Payment for goods",
    };
    
    const response = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(stkPushPayload)
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error('STK push failed:', responseData);
        return NextResponse.json({ message: responseData.errorMessage || 'Failed to initiate STK push.' }, { status: response.status });
    }

    return NextResponse.json({ message: responseData.CustomerMessage || 'STK push initiated successfully. Please check your phone.' });

  } catch (error: any) {
    console.error('M-Pesa STK Push Error:', error);
    return NextResponse.json({ message: error.message || 'An internal server error occurred.' }, { status: 500 });
  }
}
