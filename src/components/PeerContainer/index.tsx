import React from 'react';
import Lottie from 'react-lottie-player'
import Pear from "../../assests/PearLogo.json";
import PeerText from "../../assests/PeerText.json";
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
                animationData={Pear}
                loop
                speed={1}
                play
                className={props.peerClassName || "PeerContainerPeer"}
            />
            <Lottie
                animationData={PeerText}
                loop
                speed={1}
                play
                className={props.peerTextClassName || "PeerContainerPeerText"}
            />
        </div>
    );
}

export default PeerContainer;