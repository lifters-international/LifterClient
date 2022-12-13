import { UserData } from "@lifters-international/lifters-utils";

export * from "@lifters-international/lifters-utils";

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
    lifter: {
        id: string;
        username: string;
        profilePicture: string;
    };
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
    DENIED = "DENIED"
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
