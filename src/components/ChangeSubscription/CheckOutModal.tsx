import React from 'react';
import { Card } from "antd";
import { loadStripe } from '@stripe/stripe-js';
import Loading from "../Loading";
import { fetchGraphQl } from "../../utils";
import { subscribeToProLifter } from "../../graphQlQuieries";
import { useNavigate } from "react-router-dom";


const stripePromise = loadStripe('pk_live_51KLGztATNTHRR4UvZoAjTJTqgnN1i7hnRkTjV7kTf0EViTfLMu6h83OZDFEIFmBtt6TuXiU7vqd5j3jOOHUStcCV00kcz2eBej');

export type CheckOutModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    customerId: string;
}


const CheckOutModal: React.FC<CheckOutModalProps> = ({ isOpen, setIsOpen, customerId }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const zipRef = React.useRef<HTMLInputElement>(null);
    const [ errorStatement, setErrorStatement ] = React.useState<string>("");
    const [ loading, setSetLoading ] = React.useState(false);
    const navigate = useNavigate();
    let submitFunc: ( () => Promise<void> ) | undefined = undefined;

    (async () => {
        if (isOpen && ref.current !== null) {
            const stripe = await stripePromise;
            const elements = stripe!.elements();
            const cardElement = elements.create('card', {
                hidePostalCode: true,
                style: {
                    base: {
                        fontSize: '16px', '::placeholder': { color: "#aab7c4" },
                        fontFamily: '"Open Sans", "Helvetica", sans-serif',
                        fontSmoothing: 'antialiased',
                    },
                    invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a'
                    }
                }
            });
            cardElement.mount(ref.current);

            cardElement.on('change', (event) => {
                if (event.error) setErrorStatement(event.error.message);
                else setErrorStatement("");

                submitFunc = async () => {
                    if (event.complete && zipRef.current !== null) {
                        if ( zipRef.current.value.length > 0 ) {
                            let result = await stripe?.createPaymentMethod({ 
                                type: 'card',
                                card: cardElement,
                                billing_details: {
                                    address: {
                                        postal_code: zipRef.current.value
                                    }
                                }
                            });
    
                            setSetLoading(true);
    
                            if ( result && result.paymentMethod ) {
                                let graphqlResult = await fetchGraphQl(subscribeToProLifter, { token: customerId, paymentMethodId: result.paymentMethod.id });
    
                                setSetLoading(false);
                                if ( graphqlResult.errors) {
                                    setErrorStatement(graphqlResult.errors[0].message);
                                }else {
                                    navigate(0);
                                }
                            }else if ( result && result.error) {
                                setErrorStatement(result.error.message as string);
                            }
                        }else setErrorStatement("Please enter a zip code");
                    }
                }
            });
        }
    })();

    return (
        <Card className={`CheckOutModal ${isOpen ? 'open' : 'close'}`} onClick={
            (event: any) => {
                if (event.target.classList.length > 1 && event.target.classList.contains("CheckOutModal")) setIsOpen(false);
            }
        }>
            <div className="CheckOutContainer">
                <h1>Credit Card Information</h1>
                <p>Put in your credit card information and become a Pro Lifter today</p>
                <div className="CheckOutError">{errorStatement}</div>
                <div className="CheckOutDivForm">
                    <div className="CheckOutDiv" ref={ref} />
                    <input type="text" className="CheckOutPostalCode" autoComplete='postal-code' title="Zip Code" placeholder="Zip Code" ref={zipRef}/>
                </div>
                <button type="button" className="SubscriptionButton Blue CheckOutButton" onClick={ () => {
                    if (submitFunc !== undefined) submitFunc();
                }}>Subscribe</button>
            </div>
            {loading && <Loading />}
        </Card>
    )
}

export default CheckOutModal;