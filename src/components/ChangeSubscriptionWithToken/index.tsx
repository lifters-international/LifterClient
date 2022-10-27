import React from 'react';
import { useParams, Navigate, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import Error from '../Error';
import { useSessionHandler, useUserSubscriptionInfor } from '../../hooks';
import { PlanType, fetchGraphQl, GraphqlError } from "../../utils";
import { subscribeToBasicLifter } from "../../graphQlQuieries";
import LiftersNavBar from "../../assests/LifterNavBar.json";
import Lottie from 'react-lottie-player';
import CheckOutModal from "../ChangeSubscription/CheckOutModal";
import "../ChangeSubscription/ChangeSubscription.css";

const ChangeSubscription: React.FC = () => {
    let { token } = useParams();
    const { result, loading, error } = useUserSubscriptionInfor(token as string);
    const [ isOpen, setIsOpen ] = React.useState(false);
    const [ showError, setShowError ] = React.useState(false);
    const [ err, setErr ] = React.useState<GraphqlError | null>(null);
    const [ plan, setPlan ] = React.useState<PlanType>(PlanType.BASIC);
    const navigate = useNavigate();

    if (loading) return <Loading />;

    if (error.length > 0) {
        if (error[0].message === "User does not exist.") return <Navigate to="/createAccount" replace={true} />
        else return <Error {...error[0]} reload={true}/>
    };

    return (
        <>
            <NavBar token={token as string}/>
            <div className="SubscriptionContainer">
                <div className="Subscription">
                    <Lottie
                        animationData={LiftersNavBar}
                        loop={false}
                        speed={0.2}
                        play
                        className="PeerContainerPeer SubscriptionImage"
                    />
                    <h1>Basic Subscription</h1>
                    <p>Free</p>
                    <ul>
                        <li>5 Matches A Day</li>
                        <li>Messaging</li>
                        <li>Ads</li>
                    </ul>
                    {
                        result?.stripeSubscriptionId === PlanType.BASIC ? (
                            <button className="SubscriptionButton Red" disabled type="button">Current Subscription</button>
                        ) : (
                            <button type="button" className="SubscriptionButton Blue" onClick={ () => {
                                fetchGraphQl(subscribeToBasicLifter, { token }).then(result => {
                                    if (result.errors) {
                                        setErr(result.errors[0]);
                                        setShowError(true);
                                    }else {
                                        navigate(0);
                                    }

                                })
                            }}>Subscribe</button>
                        )
                    }
                </div>

                <div className="Subscription">
                    <Lottie
                        animationData={LiftersNavBar}
                        loop={false}
                        speed={0.2}
                        play
                        className="PeerContainerPeer SubscriptionImage"
                    />
                    <h1>Pro Subscription</h1>
                    <p>$6.99 a month</p>
                    <ul>
                        <li>15 Matches A Day</li>
                        <li>Messaging</li>
                        <li>Ads</li>
                        <li>Searches</li>
                        <li>Find New Matches</li>
                        <li>Food Analytics</li>
                        {/*<li>Video/Voice Call</li>*/}
                    </ul>

                    { 
                        result?.stripeSubscriptionId === PlanType.PRO ? (
                            <button className="SubscriptionButton Red" disabled type="button">Current Subscription</button>
                        )
                        : 
                        (
                            <button type="button" className="SubscriptionButton Blue" onClick={ () => {
                                setPlan(PlanType.PRO);
                                setIsOpen(true);
                            } }>Subscribe</button>
                        )
                    }
                </div>

                <div className="Subscription">
                    <Lottie
                        animationData={LiftersNavBar}
                        loop={false}
                        speed={0.2}
                        play
                        className="PeerContainerPeer SubscriptionImage"
                    />
                    <h1>Unlimited Subscription</h1>
                    <p>$8.99 a month</p>
                    <ul>
                        <li>Unlimited Matches</li>
                        <li>Messaging</li>
                        <li>No Ads</li>
                        <li>Searches</li>
                        <li>Find New Matches</li>
                        <li>Food Analytics</li>
                        {/*<li>Video/Voice Call</li>*/}
                    </ul>

                    { 
                        result?.stripeSubscriptionId === PlanType.UNLIMITED ? (
                            <button className="SubscriptionButton Red" disabled type="button">Current Subscription</button>
                        )
                        : 
                        (
                            <button type="button" className="SubscriptionButton Blue" onClick={ () => {
                                setPlan(PlanType.UNLIMITED);
                                setIsOpen(true);
                            } }>Subscribe</button>
                        )
                    }
                </div>
            </div>
            <CheckOutModal isOpen={isOpen} setIsOpen={setIsOpen} customerId={token as string} plan={plan}/>
            {
                showError && err ? <Error {...err} reload={true} /> : null
            }
        </>
    );
}


export default ChangeSubscription;