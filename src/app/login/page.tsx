
import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPageContainer() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
