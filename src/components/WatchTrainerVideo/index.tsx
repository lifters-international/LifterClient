import React from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import Error from "../Error";

import { useSessionHandler, useWatchTrainerVideo } from "../../hooks";

import { BiLike, BiDislike } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { MdOutlineFileDownloadOff } from "react-icons/md";
import { AiOutlineDownload } from "react-icons/ai";

import "./index.css";

const WatchTrainerVideo: React.FC = () => {
    const { id: videoId } = useParams();
    const authentication = useSessionHandler();
    const watchVideo = useWatchTrainerVideo(authentication.token!, videoId as string);
    const navigation = useNavigate()

    if (authentication.loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            ||
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            ||
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (
            authentication.error[0].message === "jwt expired"
            ||
            authentication.error[0].message === "User does not exist."
        ) return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    if (watchVideo.loading) return <Loading />;

    console.log(watchVideo)

    return (
        <div className="WatchTrainerVideoPage">
            <NavBar token={authentication.token!} />

            <video className="VideoContainer" controls controlsList="nodownload" src={watchVideo.videoData?.video.url} preload="auto" />

            <div className="splitter">
                <div className="detailsContainer">
                    <div className="title">{watchVideo.videoData?.video.title}</div>

                    <div className="details">
                        <div className="name-client-sub">
                            <img alt="trainer-profile" src={watchVideo.videoData?.video.trainerProfile} className="profile" />
                            <div>
                                <div className="trainer-name" onClick={ () => navigation(`/trainer/${watchVideo.videoData?.video.trainerId}`)}>{watchVideo.videoData?.video.trainerName}</div>
                                <div>{watchVideo.videoData?.video.clientCount} clients</div>
                            </div>
                            {
                                !watchVideo.videoData?.video.isClient ?
                                    <div className="sub">Become Client</div>
                                    :
                                    <div className="sub">Cancel Trainer Subscription</div>
                            }
                        </div>

                        <div className="buttons">
                            <div className="likeDislike">
                                <div className="holder like">
                                    <BiLike size={30} color="#FF3636" />
                                    <span>{watchVideo.videoData?.video.likes}</span>
                                </div>
                                <div className="holder">
                                    <BiDislike size={30} color="#FF3636" />
                                    <span>{watchVideo.videoData?.video.disLikes}</span>
                                </div>
                            </div>

                            <div>
                                <IoMdShareAlt size={30} color="#FF3636" />
                            </div>

                            <div>
                                {
                                    watchVideo.videoData?.video.isClient ? 
                                    <AiOutlineDownload size={30} color="#FF3636" />
                                    : <MdOutlineFileDownloadOff size={30} color="#FF3636" />
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className="vidRecommends">

                </div>
            </div>
        </div>
    )
}

export default WatchTrainerVideo;
