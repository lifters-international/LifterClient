import React from 'react';
import Lottie from 'react-lottie-player';
import HomeLottie from "../../assests/homeIcon.json";
import MessageLottie from "../../assests/messagingIcon.json";
import PeerContainer from '../PeerContainer';
import ProfilePicture from "../ProfilePicture";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useSignInUserData } from '../../hooks';

export type NavBarsProps = {
    token: string;
}

const NavBar: React.FC<NavBarsProps> = ( { token }: NavBarsProps) => {
    const navigate = useNavigate();
    const signedInUser = useSignInUserData(token);

    if ( signedInUser.loading ) return <></>;

    if ( signedInUser.error ) return <></>;

    return (
        <div className="NavBar">
            <PeerContainer peerContainerClassName="PeerContainer NavBarItem" onClick={ () => navigate("/") }/>
            <div className="NavBarContainer">
                <SearchBar className="NavBarSearch"/>
                <Lottie
                    animationData={HomeLottie}
                    loop
                    speed={1}
                    play
                    className="NavBarHomeLottie NavBarLottie"
                    onClick={ () => navigate("/") }
                />

                <Lottie
                    animationData={MessageLottie}
                    loop
                    speed={1}
                    play
                    className="NavBarMessageLottie NavBarLottie"
                    onClick={() => {navigate("/messages")}}
                />

                <ProfilePicture image={signedInUser.data!.profilePicture} onClick={ () => navigate("/profile" )} imageClass="NavBarProfileImage"/>
            </div>
        </div>
    )
};

export default NavBar;