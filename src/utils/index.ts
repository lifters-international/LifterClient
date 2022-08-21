export * from "./fetchGraphQl";
export * from "./types";
export * from "./urls";
export * from "./client"

export const importSvg = (path: string): string => {
    return require(`../assests/${path}`);
}

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

