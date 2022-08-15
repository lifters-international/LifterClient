import Lottie from 'react-lottie-player'
import React from "react";
import Loding from "./loading.json";
import "./Loading.css";
const Loading: React.FC = () => {
    return (
        <div className="loading">
            <Lottie
                animationData={Loding}
                loop
                speed={1}
                play
                className="lottie-loading"
            ></Lottie>
        </div>
    );
}

export default Loading;