import React from 'react';
import { HeartFilled } from '@ant-design/icons';
import "./PeerMatch.css";
import { useAcceptDeclineMatch } from "../../hooks";

export type PeerContainerProps = {
    id?: string;
    userToken?: string;
    username?: string;
    age?: number;
    bio?: string;
    profilePicture?: string;
    allowAction?: boolean;
    next?: () => void;
}

const PeerContainer: React.FC<PeerContainerProps> = ( { userToken, id, username, age, bio, profilePicture, allowAction, next } : PeerContainerProps) => {
    const shortenedBio = bio?.slice(0, 45) + ( (bio?.length!) >= 45 ? "..." : "");
    const acceptDecline = useAcceptDeclineMatch();

    const acceptMatch = async ( accept: boolean ) => {
        acceptDecline.acceptDecline( userToken!, id!, accept, 
            ( result ) =>{
                console.log(result)
            },
            ( error ) => {
                console.log(error)
            }    
        );
    }

    return (
        <div className="PeerMatch">
            <div className="PeerMatchImageContainer">
                <img src={profilePicture} alt="profile" className="PeerImages"/>
                <div className="PeerMatchDetails">
                    <div className="PeerMatchDetailsName">{username}, {age}</div>
                    <div className="PeerMatchDetailsBio" title={bio}>
                        {shortenedBio}
                    </div> 
                </div>
            </div>

            <div className="PeerMatchActionContainer">
                <div className="PeerMatchX circle" onClick={
                    allowAction ? () => {
                        acceptMatch( false );
                        if (next) next();
                    }
                    : undefined
                }>X</div>
                <div className="PeerMatchHeart circle" onClick={
                    allowAction ? () => {
                        acceptMatch( true );
                        if (next) next();
                    }
                    : undefined
                }>
                    <HeartFilled twoToneColor="#eb2f96" style={
                        {   
                            verticalAlign: 'middle'
                        }
                    }/>
                </div>
            </div>
        </div>
    )
}

PeerContainer.defaultProps = {
    userToken: "",
    id: "",
    username: "Codingwithcn",
    age: 18,
    bio: "Creator of Lifters, Software Developer, Enjoys Travelling",
    profilePicture: "/defaultPicture.png"
}

export default PeerContainer;