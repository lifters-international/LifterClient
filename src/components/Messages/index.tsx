import * as React from 'react';
import Loading from "../Loading";
import NavBar from "../NavBar";
import ProfilePicture from "../ProfilePicture";
import { Navigate, Link } from "react-router-dom";
import { useSessionHandler, useUserMatchesSubscription, useUserAcceptedMatchesSubscription } from '../../hooks';
import MessageContainer from './MessageContainer';
import Error from '../Error';

import { socket, SubscriptionType } from "../../utils";

import "./Messages.css";

const Messages: React.FC = () => {
    const authentication = useSessionHandler();
    const userMatchesSubscription = useUserMatchesSubscription(authentication.token!);
    const userAcceptedMatchesSubscription = useUserAcceptedMatchesSubscription(authentication.token!);
    const [socketAuthenticated, setSocketAuthenticated] = React.useState(false);

    if (authentication.loading) return <Loading />;

    if (authentication.error) {
        if (
            authentication.error[0].message === "jwt malformed"
            || 
            authentication.error[0].extensions.code === "BAD_USER_INPUT"
            || 
            authentication.error[0].message === "jwt expired"
        ) return <Navigate to="/createAccount" replace={true} />
        else if (authentication.error[0].message === "jwt expired") return <Navigate to="/logIn" replace={true} />
        else return <Error {...authentication.error[0]} reload={true} />;
    }

    socket.onMessages("authenticated", () => {
        setSocketAuthenticated(true);
    });
    
    if (authentication.token && !socketAuthenticated) socket.messagesAuthenticate(authentication.token);

    if ( !socketAuthenticated ) return <Loading/>

    return (
        <>
            <NavBar token={authentication.token!} />
            <div className="UnMatchedPeersContainer">
                <div className="UnMatchedPeersContainerContext">
                    NEW MATCHES
                    <div className="circle">{userMatchesSubscription.data?.matches.length}</div>
                </div>
                <div className="UnMatchedContain">
                    <div className="UnMatchedPeerContain">
                        {
                            userMatchesSubscription.data?.matches.map((match, index) => {
                                return (
                                    <Link
                                        key={`UnMatchedPeer${index}`}
                                        className="UnMatchedPeers"
                                        title={match.name}
                                        to={`/matches/${match.id}`}
                                    >
                                        <ProfilePicture image={match.profilePicture} alt={match.name + " picture"} imageClass="UnMatchedContainProfilePicture" />
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <MessageContainer
                matches={userAcceptedMatchesSubscription.data}
                token={authentication.token!}
            />
        </>
    )
}

export default Messages;