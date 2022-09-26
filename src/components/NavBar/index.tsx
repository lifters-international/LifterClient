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
import { AiOutlineBarChart } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { IoFastFoodSharp } from "react-icons/io5";

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
                <HiHome
                    size={60}
                    color="red"
                    onClick={() => navigate("/")}
                    className="NavBarLottie"
                />

                <Lottie
                    animationData={MessageLottie}
                    loop
                    speed={1}
                    play
                    className="NavBarMessageLottie NavBarLottie"
                    onClick={() => {navigate("/messages")}}
                />

                <IoFastFoodSharp 
                    size={60}
                    color="red"
                    onClick={() => navigate("/food")}
                    className="NavBarLottie"
                />

                <ProfilePicture image={signedInUser.data!.profilePicture} onClick={ () => navigate("/profile" )} imageClass="NavBarProfileImage"/>
            </div>
        </div>
    )
};

export default NavBar;