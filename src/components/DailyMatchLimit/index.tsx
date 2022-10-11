import React from 'react';
import Lottie from 'react-lottie-player';
import LiftersNavBar from "../../assests/LifterNavBar.json";
import { Link } from "react-router-dom";
import "./index.css";

const DailyMatchLimit: React.FC = () => {
    return (
        <div className="DailyMatchLimitContainer">
            <Lottie
                animationData={LiftersNavBar}
                loop={true}
                speed={0.2}
                play
                className="PeerContainerPeer SubscriptionImage"
            />
            <div className="DailyMatchLimitContainerHeader">Daily Match Limit Has Been Reached</div>
            <div>Try Again Tomorrow</div>
            <Link to="/changeSubscription" className="DailyMatchLimitContainerUpgrade">Upgrade To Get More</Link>
        </div>
    );
}

export default DailyMatchLimit;