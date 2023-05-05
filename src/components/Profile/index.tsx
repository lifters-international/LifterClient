import React, { useState, useEffect } from 'react';
import Loading from "../Loading";
import NavBar from "../NavBar";
import { useSessionHandler, useSignInUserData, useSaveUserProfileChanges, useLoggedInUserHomePage } from '../../hooks';
import { turnArrayIntoDimensionalArray, shortenNumber } from '../../utils';
import { updateUserInformationMutation } from "../../graphQlQuieries";
import { updateUserPassword } from "../../graphQlQuieries";
import { Navigate, useNavigate } from 'react-router-dom';
import Notify, { NotifyStateManager, NotifyStateManagerType } from "../Notify";
import Error from '../Error';
import Modal from '../Modal';
import { MdWidgets } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";
import "./Profile.css";

const Profile: React.FC = () => {
    const authentication = useSessionHandler();

    const [refreshing, setRefreshing] = useState(false);

    const { loading, errors, data } = useLoggedInUserHomePage(authentication.token!, refreshing);

    const [view, setView] = useState<"saved" | "reels">("reels");

    useEffect(() => {
        setRefreshing(true);
    }, [view]);

    useEffect(() => {
        setRefreshing(loading);
    }, [data]);

    if (authentication.loading || loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            ||
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            ||
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/logIn" />;
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if (errors.length > 0) return <Error {...errors[0]} reload={true} />;

    return (
        <div className="profile-page">
            <NavBar token={authentication.token!} />

            <div className="profile-container">
                <div className="profile-edit-container">
                    <img src={data?.profilePicture} alt="profilePicture" className="profilePicture" />
                    <div className="side-container">
                        <div className="edit-u-b">
                            <div className="username">{data?.username}</div>
                            <a className="editButton" href="/profile/settings">Edit Profile</a>
                        </div>

                        <div className="data-rows">
                            <div className="data-row">{shortenNumber(data!.reels.length)} reels</div>
                            <div className="data-row">{shortenNumber(data!.followers)} followers</div>
                            <div className="data-row">{shortenNumber(data!.following)} following</div>
                        </div>

                        <div className="bio">{data!.bio || "Founder of Lifters. GYM Rat"}</div>
                    </div>
                </div>

                <div className="viewSelectors">
                    <MdWidgets
                        size={60}
                        color="#FF3636"
                        className={`viewSelect ${ view === "reels" ? "selected" : ""}`}
                        onClick={() => setView("reels")}
                    />

                    <BsFillBookmarkFill
                        size={52}
                        color="#FF3636"
                        className={`viewSelect ${ view === "saved" ? "selected" : ""} viewSelect-bookmark`}
                        onClick={() => setView("saved")}
                    />
                </div>

                <div className="reels-container">
                    {
                        (
                           ( turnArrayIntoDimensionalArray(view === "reels" ? data!.reels : data!.reelsSaves) as { id: string, video_url: string }[][] ).map(( row, index) => (
                                <div className="reel-row-container" key={`profile-reel-row${index}`}>
                                    {
                                        row.map((reel, index) => (
                                            <div className="reel-container" key={`profile-reel-row-reel-${index}`}>
                                                <video src={reel.video_url} controls={false} />
                                            </div>
                                        ))
                                    }
                                </div>
                           ))
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;
