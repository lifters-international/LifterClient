import { UserData, GraphqlFetchResult } from "@lifters-international/lifters-utils";

export * from "@lifters-international/lifters-utils";

export const getApiUrl = () => {
    return `${getServerUrl()}graphql`;
}

export const getWSApiUrl = () => {
    return `wss://${process.env.NODE_ENV === "production" ? "server.lifters.app" : "localhost:5000"}/graphql`;
}

export const getImageUploadApi = () => {
    return `${getServerUrl()}upload/image`;
}

export const getServerUrl = () => {
    return process.env.NODE_ENV === "production" ? "https://server.lifters.app/" : "http://localhost:5000/";
}


export const fetchGraphQl = async (query: string, variables: any): Promise<GraphqlFetchResult> => {
    const response = await fetch(
        getApiUrl(),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                //"Accept": ""Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ query, variables })
        }
    );
    const data = await response.json();
    return data;
}

export type TrainersClientDetails = {
    name: string;
    profilePicture: string;
    messages: TrainersClientMessage[];
    canSeeUserFoodHistory: boolean;
    /*
        THIS IS A LATER FEATURE THAT IS NOT CURRENTLY SUPPORTED
        canSeeUserWorkoutHistory: boolean;
        canSeeUserWeightHistory: boolean;
    */

    trainersDecision: TrainersDecision;

    dateCreated: number;
}


export type TrainerPendingClients = {
    id: string;
    profilePicture: string;
    name: string;
    date: number;
}

export type TrainersClientMessage = {
    id: string;
    status: "DELIVERED" | "READ";
    timeRead: number | null;
    whoSent: "LIFTERS" | "TRAINERS";
    metaDataType: "TEXT" | "IMAGE" | "AUDIO" | "VIDEO";
    message: string;
    createdAt: number;
};

export type TrainerAcceptedClients = {
    lastMessage: TrainersClientMessage | null;
    lastMessageDate: number | null;
    unreadMessages: number;
} & TrainerPendingClients;

export type TrainersSummary = {
    id: string;
    name: string;
    bio: string;
    profilePicture: string;
    price: string;
    ratingsAverage: number;
}

export type TrainersRatings = {
    id: string
    rating: number;
    lifterName: string;
    lifterProfilePicture: string;
    comment: string;
    createdAt: number;
    trainer?: Trainers;
}

export type Trainers = {
    bannerImage: string;
    bio: string;
    clients: TrainersClient[];
    email: string;
    gyms: TrainersGym[];
    id: string;
    onBoardCompleted: boolean;
    price: number;
    profilePicture: string;
    ratings: TrainersRatings[];
}

export type TrainersGym = {
    id: string;
    location: string;
}

export enum TrainersDecision {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    DENIED = "DENIED",
    VERIFYING_PAYMENT = "VERIFYING_PAYMENT"
}

export type TrainersClient = {
    canSeeUserFoodHistory: boolean;
    canSeeUserWorkoutHistory: boolean;
    canSeeUserWeightHistory: boolean;
    client: UserData;
    id: string;
    trainer: Trainers;
    trainersDecision: TrainersDecision;
}

export type TrainersDetails = {
    bannerImage: string;

    clientCount: number;

    gymCount: number;

    gyms: TrainersGym[];

    ratingsAverage: number;

    ratings: TrainersRatings[];

    onBoardCompleted: boolean;
} & TrainersSummary;

export type TrainerVideoSummary = {
    id: string;
    clientOnly: boolean;
    duration: number;
    thumbnail: string;
    isClient: boolean;
    title: string;
    updatedAt: number;
    views: number
}

export type TrainerSearchVideoSummary = {
    profilePicture: string;
} & TrainerVideoSummary;

export type WatchTrainerVideo = {
    recommendedVideos: {
        id: string;
        title: string;
        thumbnail: string;
        duration: number;
        updateAt: number;
        views: number;
    }[];

    video: {
        id: string;
        title: string;
        description: string;
        clientCount: number;
        isClient: boolean;
        trainerId: string;
        trainerProfile: string;
        trainerName: string;
        url: string;
        likes: number;
        disLikes: number;
        views: number;
        date: number;
        thumbnail: string;
    }

    comments: {
        id: string;
        comment: string;
        whoCreatedId: string;
        whoCreatedType: "lifters" | "trainers";
        whoCreatedName: string;
        whoCreatedProfilePicture: string;
        updatedAt: number;
    }[];

    viewHistoryId: string;

    allowLikes: boolean;

    allowDislikes: boolean;

    allowComments: boolean
}

export type UpdateTrainerClient = {
    canSeeUserFoodHistory?: boolean;
    canSeeUserWorkOutHistory?: boolean;
    canSeeUserWeightHistory?: boolean;
}

export const getDiff = (start: Date, end: Date) => {
    const msInSecond = 1000;
    const msInMinute = msInSecond * 60;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;
    const msInWeek = msInDay * 7;
    const msInMonth = msInWeek * 4.34524;
    const msInYear = msInMonth * 12;

    let diff = Math.abs(end.getTime() - start.getTime());

    if (diff / msInSecond < 1000) return `${Math.round(diff / msInSecond)} seconds`;

    else if (diff / msInMinute < 60) return `${Math.round(diff / msInMinute)} minutes`;

    else if (diff / msInHour < 24) return `${Math.round(diff / msInHour)} hours`;

    else if (diff / msInDay < 7) return `${Math.round(diff / msInDay)} days`;

    else if (diff / msInWeek < 4) return `${Math.round(diff / msInWeek)} weeks`;

    else if (diff / msInMonth < 12) return `${Math.round(diff / msInMonth)} months`;

    else return `${Math.round(diff / msInYear)} years`
}

export const shortenText = (text: string, length = 20, end = "...") => {
    if (text.length > length) {
        return text.substring(0, length) + end;
    }
    return text;
}

export const shortenNumber = (num: number) => {
    const thousand = 1000;
    const million = thousand * 1000;
    const billion = million * 100;
    const trillion = billion * 1000;

    if (num < thousand) return `${num}`;

    else if (num / thousand < 1000) return `${Math.round(num / thousand)}k`;

    else if (num / million < 100) return `${Math.round(num / million)} mil`;

    else if (num / billion < 1000) return `${Math.round(num / billion)} billion`;

    else return `${num / trillion} trillion`;
}
