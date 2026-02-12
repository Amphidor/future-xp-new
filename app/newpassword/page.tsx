import newpassword from '@/components/NewPassword';

// Avoid static generation timeout: this page uses Redux/store and is auth-related
export const dynamic = 'force-dynamic';

export default function NewPassword() {
  return <NewPassword />;
}