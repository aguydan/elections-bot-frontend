import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import ActionCookieListener from './action-cookie-listener';

export default function ToastProvider({ children }: { children: ReactNode }) {
  const cookieStore = cookies();

  const actionCookies = {
    actionId: cookieStore.get('actionId')?.value || '',
    action: cookieStore.get('action')?.value || '',
    resource: cookieStore.get('resource')?.value || '',
  };

  return (
    <>
      <ToastContainer />
      <ActionCookieListener {...actionCookies} />
      {children}
    </>
  );
}
