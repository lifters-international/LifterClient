import React, { useState } from 'react';
import PeerContainer from '../PeerContainer';
import ProfilePicture from "../ProfilePicture";
import SearchBar from "../SearchBar";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useSignInUserData } from '../../hooks';
import { IoMdSend } from "react-icons/io";
import { IoFastFoodSharp } from "react-icons/io5";

export type NavBarsProps = {
    token: string;
}

const NavBar: React.FC<NavBarsProps> = ({ token }: NavBarsProps) => {
    const navigate = useNavigate();
    const signedInUser = useSignInUserData(token);
    const [dropDown, setDropDown] = useState(false);

    if (signedInUser.loading) return <Loading/>;

    if (signedInUser.error) return <></>;

    return (
        <div className="NavBar">
            <PeerContainer peerContainerClassName="PeerContainer NavBarItem" onClick={() => navigate("/")} />
            <div className="NavBarContainer">
                <SearchBar className="NavBarSearch" />

                <IoMdSend
                    size={60}
                    color="red"
                    onClick={() => { navigate("/messages") }}
                    className="NavBarLottie"
                />

                <IoFastFoodSharp
                    size={60}
                    color="red"
                    onClick={() => navigate("/food")}
                    className="NavBarLottie"
                />

                <ProfilePicture image={signedInUser.data!.profilePicture} onClick={() => navigate("/profile")} imageClass="NavBarProfileImage" />

            </div>


            <div className="NavBarContainerMobile">
                <SearchBar className="NavBarSearch" />

                <div className="NavBarContainerMobileDropDown">
                    <div className="NavBarContainerMobileDropDownMenu" onClick={ () => setDropDown(!dropDown) }>
                        Menu
                    </div>

                    {
                        dropDown ? (
                            <div className="NavBarContainerMobileDropDownContent">

                                <IoMdSend
                                    size={60}
                                    color="red"
                                    onClick={() => { navigate("/messages") }}
                                    className="NavBarLottie"
                                />

                                <IoFastFoodSharp
                                    size={60}
                                    color="red"
                                    onClick={() => navigate("/food")}
                                    className="NavBarLottie"
                                />

                                <ProfilePicture image={signedInUser.data!.profilePicture} onClick={() => navigate("/profile")} imageClass="NavBarProfileImage" />
                            </div>

                        ) : null
                    }
                </div>
            </div>
        </div>
    )
};

export default NavBar;