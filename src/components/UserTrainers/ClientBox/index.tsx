import React from 'react';
import { useLocation } from "react-router-dom";

import { useGetClientsTrainerAndMessages } from "../../../hooks";

import { Loading, Error } from "../../../components";

import { Settings } from "./Settings";
import { Train } from "./Train";
import { Message } from "./Message";

import "./index.css";

const ClientBox: React.FC<{token : string}> = ({ token }) => {
    const location = useLocation();
    const selectedClient = new URLSearchParams(location.search).get("client");
    const selectedTab =  new URLSearchParams(location.search).get("tab") || "settings";
    const clientAndMessages = useGetClientsTrainerAndMessages(token, selectedClient!);

    if ( !selectedClient ) {
        return (
            <div className="ClientBox">
                <div className="ClientBoxEmpty">
                    Click on a client to start talking with them
                </div>
            </div>
        )
    }

    if ( clientAndMessages.loading ) {
        return (
            <div className="ClientBoxLoading"> <Loading /> </div>
        )
    }

    if ( clientAndMessages.error.length > 0 ) {
        return (
            <div className="ClientBoxLoading">
                <Error {...clientAndMessages.error[0]} reload={false} />
            </div>
        )
    }

    return (
        <div className="ClientBox ClientBoxContainer">
            {
                selectedTab === "settings" ?
                    <Settings {...clientAndMessages.details} client={selectedClient} token={token} /> :
                    selectedTab === "train" ?
                        <Train /> :
                        selectedTab === "messages"?
                            <Message 
                                {...clientAndMessages.details} 
                                client={selectedClient} 
                                token={token}  
                                messages={clientAndMessages.messages} 
                                sendMessage={clientAndMessages.sendMessage}
                                sendReadMessage={clientAndMessages.sendReadMessage}
                            /> : null

            }
        </div>
    )
}

export default ClientBox;
