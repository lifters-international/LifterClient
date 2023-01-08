import React, { useState } from "react";

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";

import { IoMdShareAlt } from "react-icons/io";

import "./index.css";

export type ShareProps = {
    thumbnail?: string;
    text?: string;
    url: string;
    title: string;
    quote: string;
    share: {
        size?: number;
        color?: string;
        className?: string;
    }
}

const Share: React.FC<ShareProps> = ({ thumbnail, url, title, text, share, quote }) => {
    const [activeShare, setActiveShare] = useState(false);

    return (
        <>
            {
                !activeShare ? <IoMdShareAlt size={share.size || 30} color={share.color || "#FF3636"} className={share.className || "icon" } onClick={() => setActiveShare(true)} /> : (
                    <div className="ShareContainer"
                        onClick={ 
                            ( e : any ) => {
                                if ( e.target.classList.contains("ShareContainer") ) setActiveShare(false);
                            }
                        }
                    >
                        <div className="ShareWrapper">
                            <div className="share-text">{`${text ? text : "Share Now"}`}</div>
                            <div className="share-buttons">
                                <EmailShareButton url={url} title={title} body={quote} >
                                    <EmailIcon size={55} round={true} />
                                </EmailShareButton>

                                <FacebookShareButton url={url} title={title} quote={quote} hashtag="#Lifters #LiftersHome #LiftersFitness #LiftersCommunity #LifterShare">
                                    <FacebookIcon size={55} round={true} />
                                </FacebookShareButton>

                                <LinkedinShareButton url={url} title={title} summary={quote} source="https://www.lifters.app" >
                                    <LinkedinIcon size={55} round={true} />
                                </LinkedinShareButton>

                                <TwitterShareButton url={url} title={title} via="https://www.lifters.app" related={["liftersCommunity"]} hashtags={["Lifters", "LiftersHome", "LiftersFitness", "LiftersCommunity", "LifterShare"]} >
                                    <TwitterIcon size={55} round={true} />
                                </TwitterShareButton>

                                <PinterestShareButton url={url} title={title} media={thumbnail || "https://www.lifters.app/lifters-icon-google-play.png"} description={quote}>
                                    <PinterestIcon size={55} round={true} />
                                </PinterestShareButton>

                                <RedditShareButton url={url} title={title} >
                                    <RedditIcon size={55} round={true} />
                                </RedditShareButton>

                                <TelegramShareButton url={url} title={title} >
                                    <TelegramIcon size={55} round={true} />
                                </TelegramShareButton>

                                <WhatsappShareButton url={url} title={title} >
                                    <WhatsappIcon size={55} round={true} />
                                </WhatsappShareButton>
                            </div>

                            <div className="share-copy-link">
                                <div className="link">{url}</div>
                                <div className="copy-button">Copy</div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Share;
