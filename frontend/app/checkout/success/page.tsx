import { redirect } from 'next/navigation';

export default function CheckoutSuccessRedirect() {
  redirect('/en/checkout/success');
}
