import React from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import NavBar from "../NavBar";
import Error from "../Error";

import { useSessionHandler, useWatchTrainerVideo, useSignInUserData } from "../../hooks";

import { getDiff, shortenNumber, shortenText } from "../../utils";

import { BiLike, BiDislike } from "react-icons/bi";
import { MdOutlineFileDownloadOff } from "react-icons/md";
import { AiOutlineDownload, AiFillLike, AiFillDislike } from "react-icons/ai";

import { CommentsContainer } from "./CommentsContainer";

import { VideoJs } from "./VideoPlayer";

import ShareView from "../Share";

import "./index.css";

const WatchTrainerVideo: React.FC = () => {
    const { id: videoId } = useParams();
    const authentication = useSessionHandler();
    const watchVideo = useWatchTrainerVideo(authentication.token!, videoId as string);
    const signedUser = useSignInUserData(authentication.token!);
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

    if (watchVideo.loading || signedUser.loading) return <Loading />;

    if (signedUser.error) return <Error {...signedUser.error[0]} reload={true} />;

    let date = new Date(new Date(watchVideo.videoData?.video.date!).toLocaleString());

    return (
        <div className="WatchTrainerVideoPage">
            <NavBar token={authentication.token!} />

            <VideoJs url={watchVideo.videoData?.video.url!}
                updateTime={
                    (seconds) => watchVideo.updateTime(seconds)
                }
            />

            <div className="splitter">
                <div className="detailsContainer">
                    <div className="title">{watchVideo.videoData?.video.title}</div>

                    <div className="details">
                        <div className="name-client-sub">
                            <img alt="trainer-profile" src={watchVideo.videoData?.video.trainerProfile} className="profile" />
                            <div>
                                <div className="trainer-name" onClick={() => navigation(`/trainer/${watchVideo.videoData?.video.trainerId}`)}>{watchVideo.videoData?.video.trainerName}</div>
                                <div>{watchVideo.videoData?.video.clientCount} clients</div>
                            </div>
                            {
                                !watchVideo.videoData?.video.isClient ?
                                    <div className="sub" onClick={() => navigation(`/trainers/${watchVideo.videoData?.video.trainerId}/client`)}>Become Client</div>
                                    :
                                    <div className="sub" onClick={() => navigation(`/trainers/${watchVideo.videoData?.video.trainerId}/client`)}>UnSubscribe</div>
                            }
                        </div>

                        <div className="buttons">
                            {
                                !watchVideo.videoData?.allowLikes && !watchVideo.videoData?.allowDislikes ? null : (
                                    <div className={`likeDislike ${!watchVideo.videoData?.allowLikes || !watchVideo.videoData?.allowDislikes ? "none" : "" }`}>
                                        {
                                            watchVideo.videoData?.allowLikes === true && (
                                                <div className="holder like">
                                                    {
                                                        watchVideo.videoData!.likedVideo ? <AiFillLike size={30} color="#FF3636" /> : <BiLike size={30} color="#FF3636" onClick={() => watchVideo.likeVideo()} />
                                                    }
                                                    <span>{watchVideo.videoData?.video.likes}</span>
                                                </div>
                                            )
                                        }
                                        {
                                            watchVideo.videoData?.allowDislikes && (
                                                <div className="holder">
                                                    {
                                                        watchVideo.videoData!.dislikedVideo ? <AiFillDislike size={30} color="#FF3636" /> : <BiDislike size={30} color="#FF3636" onClick={() => watchVideo.disLikeVideo()} />
                                                    }
                                                    <span>{watchVideo.videoData?.video.disLikes}</span>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }

                            <div>
                                <ShareView
                                    thumbnail={watchVideo.videoData?.video.thumbnail}
                                    title={watchVideo.videoData?.video.title!}
                                    url={window.location.href}
                                    text={`Share ${watchVideo.videoData?.video.trainerName}'s Video`}
                                    quote={`Come and watch ${watchVideo.videoData?.video.trainerName} Lifters... The #1 Home For All Things GYM!!!`}
                                    share={{

                                    }}
                                />
                            </div>

                            <div>
                                {
                                    watchVideo.videoData?.video.isClient ?
                                        (
                                            <AiOutlineDownload size={30} color="#FF3636" onClick={() => window.open(watchVideo.videoData?.video.url)}  className="icon" />
                                        )
                                        : <MdOutlineFileDownloadOff size={30} color="#FF3636" />
                                }
                            </div>
                        </div>
                    </div>

                    <div className="description">
                        <div className="views-date">
                            {shortenNumber((watchVideo.videoData?.video.views || 0) + 1)} views &#8226; &nbsp;
                            {getDiff(date, new Date(new Date().toLocaleString()))} ago
                        </div>

                        <div className="desc">
                            {watchVideo.videoData?.video.description}
                        </div>
                    </div>

                    <CommentsContainer
                        comments={watchVideo.videoData?.comments!}
                        profilePicture={signedUser.data?.profilePicture!}
                        postComment={watchVideo.postComment}
                        allowComments={watchVideo.videoData?.allowComments!}
                        askForChildren={watchVideo.askForChildren}
                        removeChildren={watchVideo.removeChildren}
                    />

                </div>

                <div className="vidRecommends">
                    {
                        watchVideo.videoData?.recommendedVideos.map((vid, index) => {
                            let durationSummary = new Date(vid.duration * 1000).toISOString().substring(11, 19);

                            durationSummary = durationSummary.substring(0, 3) === "00:" ? durationSummary.substring(3) : durationSummary;

                            return (
                                <div className="video-rec" key={index}>
                                    <a href={`/videos/${vid.id}`} >
                                        <div className="vidInfor">
                                            <img className="thumbnail" src={vid.thumbnail} alt="thumbnail" />
                                            <span className={`duration${durationSummary.length === 5 ? " min" : " hour"}`}>{durationSummary}</span>
                                        </div>

                                        <div className="bottom">
                                            <div className="desc">{shortenText(vid.title, 52)}</div>
                                            <div className="dets"> {shortenNumber(vid.views)} views &#8226; &nbsp; {getDiff(date, new Date(new Date().toLocaleString()))} ago </div>
                                        </div>
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default WatchTrainerVideo;
