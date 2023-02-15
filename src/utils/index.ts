import { UserData, WatchTrainerVideo } from "@lifters-international/lifters-utils";

export * from "@lifters-international/lifters-utils";

export type TrainersSearchResult = {
    id: string;

    name: string;

    bio: string;

    profilePicture: string;

    productId: string;

    price: string;

    ratingsAverage: number;
}

export type SearchLiftersAndTrainersResults = {
    type: "lifters" | "trainers";

    lifters?: UserData;

    trianer?: TrainersSearchResult
}

export type SearchLiftersAndTrainers = {
    searchUserAndTrainers: {
        results: SearchLiftersAndTrainersResults[];
    }
}

export type WatchTrainerVideoV401CommentsChildren = {
    comment: string;
    createdAt: string; 
    id: string; 
    parentId: string; 
    updatedAt: number; 
    videoId: string; 
    whoCreatedId: string; 
    whoCreatedName: string; 
    whoCreatedProfilePicture: string; 
    whoCreatedType: "lifters" | "trainers" 
};

export type WatchTrainerVideoV401Comments = {
    id: string;

    comment: string;

    whoCreatedId: string;

    whoCreatedType: "lifters" | "trainers";

    whoCreatedName: string;

    whoCreatedProfilePicture: string;

    updatedAt: number;

    parentId?: string;

    childrenCount: number;

    children: WatchTrainerVideoV401CommentsChildren[];
}

export type WatchTrainerVideoV401 = WatchTrainerVideo & {
    comments: WatchTrainerVideoV401Comments[];
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
