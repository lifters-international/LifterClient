export const watchTrainerVideo = `
    query WatchTrainerVideo($videoId: String!, $token: String!) {
        WatchTrainerVideo(videoId: $videoId, token: $token) {
            recommendedVideos {
                duration
                id
                thumbnail
                title
                updatedAt
                views
            }
            video {
                comments {
                    comment
                    id
                    updatedAt
                    whoCreatedId
                    whoCreatedName
                    whoCreatedProfilePicture
                    whoCreatedType
                }
                dislikes
                id
                likes
                url
                clientCount
                description
                isClient
                title
                trainerName
                trainerId
                trainerProfile
                views
                date
            }
            viewHistoryId
        }
    }
`;
