export * from "./fetchGraphQl";
export * from "./types";

export const importSvg = (path: string): string => {
    return require(`../assests/${path}`);
}

export const getApiUrl = () => {
    return "http://localhost:5000/graphql";
}

export const getImageUploadApi = () => {
    return "http://localhost:5000/upload/image";
}

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}