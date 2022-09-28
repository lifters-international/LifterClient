import React from 'react';
import PeerContainer from '../PeerContainer';
import ProfilePicture from "../ProfilePicture";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useSignInUserData } from '../../hooks';
import { IoMdSend } from "react-icons/io";
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

                <IoMdSend 
                    size={60}
                    color="red"
                    onClick={() => {navigate("/messages")}}
                    className="NavBarLottie"
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