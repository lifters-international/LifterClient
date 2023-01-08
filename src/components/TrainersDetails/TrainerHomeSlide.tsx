import React from "react";

import { TrainersGym } from "../../utils";

import { useUserGetAllTrainerVideo } from "../../hooks";
import Loading from "../Loading";
import Error from "../Error";
import { VideoSummary } from "./VideoSummary";

export type Props = {
    gyms: TrainersGym[];
    trainerId: string;
    token: string;
}

export const TrainerHomeSlide: React.FC<Props> = ({ gyms, trainerId, token }) => {
    let trainersVidSummary = useUserGetAllTrainerVideo( token, trainerId );

    if ( trainersVidSummary.loading ) return <Loading />;

    if ( trainersVidSummary.error ) return <Error message="An Error occured while loading trainer videos." reload={true} />;

    return (
        <div className="TrainerHomeSlide">
            <h1>Trainer Gyms</h1>
            <div className="gyms">
                {
                    gyms.map((gym, index) => {
                        return (
                            <a className="gym" key={index} href={`https://www.google.com/maps/search/?api=1&query=${gym.location}`} target="_blank" rel="noopener noreferrer" >
                                <span>{gym.location}</span>
                            </a>
                        )
                    })
                }
            </div>

            <h1>Trainer Videos</h1>

            <div className="VideoSummaryContainer">
                {
                    trainersVidSummary.data.map( ( vid, index) => {
                        return <VideoSummary {...vid} key={index} />
                    })
                }
            </div>
        </div>
    )

}
