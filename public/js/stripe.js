/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const Stripe = require('stripe');

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const stripe = Stripe(
      'pk_test_51MfJG8SCzhRA5wdmNqcZePlltnz4NRvTpIx0rOjUhaPHIXQcAwW4d2Fy1fWeyumMDWRtywm3CZTtcjzmDBxoFSxS00t76PhfCO'
    );

    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card

    //await stripe.redirectToCheckout({
    //  sessionId: session.data.session.id,
    //});

    //works as expected
    window.location.replace(session.data.session.url);
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
