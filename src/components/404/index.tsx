import React from "react";
import Lottie from 'react-lottie-player'
import notFound from "./404.json";
import "./404.css";
const NotFound404: React.FC = () => {
    return (
        <>
            <div className="Frame404"> 
                <Lottie
                    animationData={notFound}
                    loop
                    speed={2.5}
                    play
                    className="lottie"
                />
            </div>
            <div className="div404">Sorry the page you are looking for does not exist</div>
        </>
    );
}

export default NotFound404;