import * as React from 'react';
import api from '../utils/Api-service';
import Layout from '../components/Layout';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Donate = (props: DonateProps) => {   

    const stripe = useStripe();
    const elements = useElements();

    const [amount, setAmount] = React.useState('');

    const handleDonate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { token, error } = await stripe.createToken(cardElement);
        const result = await api('/api/donate', 'POST', { amount, token })
        console.log(result);
        setAmount('');
        cardElement.clear();
    }

    return (
        <Layout>
            <form className="form-group font-weight-bold">
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="form-label"></label>
                    <CardElement className="form-control"/>
                </div>
                <button onClick={handleDonate} className="btn btn-success">Buy Me A Coffee</button>
            </form>
        </Layout>
    );

}

interface DonateProps {}

export default Donate;