import Axios from 'axios';

import axios from 'axios';
import { showAlert } from './ alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe('pk_test_LkBYLbFUpguorkdSHY6CoaWH');

  try {
    // 1) get checkout session from the server
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2) create checkout form + charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
