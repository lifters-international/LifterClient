import React from 'react';

import { AcceptedUserMatches } from "../../../utils";
import ProfilePicture from "../../ProfilePicture";

import MessageBox from "../MessageBox";

import "./MessageContainer.css";

export type MessageContainerProps = {
    token: string;
    matches: AcceptedUserMatches[];
}

export type MessageContainerCurrentView = {
    currentMatchId: string;
    name: string;
    profilePicture: string;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ token, matches }: MessageContainerProps) => {
    const [ currentView, setCurrentView] = React.useState<MessageContainerCurrentView>( { currentMatchId: "", name: "", profilePicture: "" } );

    matches.sort( (a, b) => Number(b.date) - Number(a.date));

    return (
        <div className="MessageContainer">
            <div className="UnMatchedPeersContainerContext">
                Messages
                <div className="circle">{matches.length}</div>
            </div>
            <div className="MessageHolder">
                <div className="MessageHolderContext">
                    {
                        matches.length === 0 ? (
                            <div className="NoMessages">No Messages</div>
                        ) : (
                            matches.map((message: AcceptedUserMatches) => {
                                let text = message.lastMessage?.message || "";
                                const shortenedText = text.slice(0, 45) + ( (text.length!) >= 45 ? "..." : "");

                                return (
                                    <div key={message.id} className="MessageMatches" onClick={
                                        () => {
                                            setCurrentView({
                                                currentMatchId: message.id,
                                                name: message.name,
                                                profilePicture: message.profilePicture
                                            });
                                        }
                                    }>
                                        <ProfilePicture image={message.profilePicture} alt={message.name + " picture"} imageClass="MessageMatchesProfilePicture" />
                                        <div className="MessageMatchesContext">
                                            <div className="MessageMatchesContextName">{message.name}</div>
                                            <div className="MessageMatchesContextMessage" title={text} >{shortenedText}</div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                <MessageBox token={token} {...currentView} />
            </div>
        </div>
    )
}

export default MessageContainer;