import React, { useState, useEffect } from "react";

import { fetchGraphQl, WatchTrainerVideo } from "../utils";

import { watchTrainerVideo } from "../graphQlQuieries";

export type WatchTrainerVideoState = {
    loading: boolean;
    error: string;
    videoData?: WatchTrainerVideo;
}

export const useWatchTrainerVideo = ( token: string, videoId: string ) => {
    const [ state, setState ] = useState<WatchTrainerVideoState>({
        loading: true,
        error: "",
    });

    useEffect( () => {
        if ( token === null || videoId === null ) return;

        fetchGraphQl(watchTrainerVideo, { token, videoId })
        .then( res => {
            if ( res.errors ) {
                setState({
                    ...state,
                    error: res.errors[0].message,
                    loading: false
                })
            }else {
                setState({
                    ...state,
                    loading: false,
                    videoData: res.data.WatchTrainerVideo
                })
            }
        })
    }, [ token, videoId ])

    return state;
}
