
import { Suspense } from 'react';
import { SignupForm } from '@/components/auth/signup-form';

export default function SignupPageContainer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
