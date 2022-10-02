export * from "./fetchGraphQl";
export * from "./types";
export * from "./urls";
export * from "./client"
export { default as socket } from "./socket";

export const importSvg = (path: string): string => {
    return require(`../assests/${path}`);
}

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const formatAMPM = (date: Date) => {
    var hours = date.getHours();
    var minutes: string | number = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const capitalizeFirstLetter = (sent: string) => {
    return sent.charAt(0).toUpperCase() + sent.slice(1);
}

export function getCurrentDate(separator = '-') {
    let newDate = new Date(new Date().toUTCString());
    let date = newDate.getUTCDate();
    let month = newDate.getUTCMonth() + 1;
    let year = newDate.getUTCFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date < 10 ? `0${date}` : `${date}`}`;
}
