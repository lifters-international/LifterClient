import React from 'react';
import { Link, useLocation } from "react-router-dom";

import { TrainerAcceptedClients, shortenText } from '../../../utils';

import ClientBox from "../ClientBox";

import "./index.css";

export type AcceptedClientsViewProps = {
    token: string;
    clients: TrainerAcceptedClients[];
}

const AcceptedTrainersView: React.FC<AcceptedClientsViewProps> = ( { token, clients }) => {
    const location = useLocation();
    let activeSelected = new URLSearchParams(location.search).get("client");
    clients.sort((a, b) => Number(b.date) - Number(a.date));

    // Active and inactive is used to make us more responsive and mobile friendly.
    return (
        <div className={`AcceptedClientContainer`}>
            <div className="AcceptedClientContext">
                Messages
                <div className="circle">{
                    clients.map(c => c.unreadMessages).reduce( ( a, b ) => a + b, 0 )
                }</div>
            </div>

            <div className={`ClientHolder ${activeSelected ? 'active' : 'unactive'}`}>
                <div className="ClientHolderContext">
                    {
                        clients.length === 0 ? (
                            <div className="NoClients">No Messages</div>
                        ) : (
                            clients.map(( client ) => {
                                let text = client.lastMessage?.message || "";
                                const shortText = shortenText(text, 45);
                                
                                return (
                                    <Link key={client.id} className="Client" to={`/trainers/?&client=${client.id}&tab=messages`} title={client.name}>
                                        <img src={client.profilePicture} alt={client.name + " pic"} className="profile-pic" />
                                        <div className="client-info">
                                            <div className="client-name">{client.name}</div>
                                            <div className="client-message" title={text}>{shortText}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        )
                    }
                </div>
                <ClientBox token={token} />
            </div>
        </div>
    )
}

export default AcceptedTrainersView;
