import React, { useEffect, useRef } from "react";

import videojs from "video.js";
import 'video.js/dist/video-js.css';

export const VideoJs: React.FC<{ url: string, updateTime: ( time : number ) => void }> = ({ url, updateTime }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);

    useEffect(() => {

        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current!.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, undefined, () => {
                videojs.log('player is ready');
            });
        } else {
            const player = playerRef.current as any;

            player.autoplay(true);
        }
    }, [videoRef]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        }
    }, [playerRef]);

    useEffect(() => {
        const interval = setInterval(() => {
            if ( !videoRef.current!.paused ) updateTime(videoRef.current!.currentTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div data-vjs-player >
            <video className="VideoContainer video-js" controls controlsList="nodownload" src={url} autoPlay preload="auto" ref={videoRef} />
        </div>
    )
}

