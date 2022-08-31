import React from 'react';
import Lottie from 'react-lottie-player';
import LiftersNavBar from "../../assests/LifterNavBar.json";
import "./PeerContainer.css";

export type PeerContainerProps = {
    onClick?: () => void;
    peerContainerClassName?: string;
    peerClassName?: string;
    peerTextClassName?: string;
}

const PeerContainer: React.FC<PeerContainerProps> = (props: PeerContainerProps) => {
    return (
        <div className={props.peerContainerClassName || "PeerContainer"} onClick={ props.onClick || undefined}>
            <Lottie
                animationData={LiftersNavBar}
                loop
                speed={0.2}
                play
                className={props.peerClassName || "PeerContainerPeer"}
            />
            
        </div>
    );
}

export default PeerContainer;