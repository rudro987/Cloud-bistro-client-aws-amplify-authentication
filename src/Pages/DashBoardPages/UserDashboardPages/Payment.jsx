import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
  } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please pay your due"></SectionTitle>
            <div>
                <Elements stripe={stripePromise}>
                
                </Elements>
            </div>
        </div>
    );
};

export default Payment;