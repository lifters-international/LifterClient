export const getApiUrl = () => {
    return `${getServerUrl()}graphql`;
}

export const getWSApiUrl = () => {
    return  `ws://${process.env.DOMAIN || "10.0.0.169:5000"}/graphql`;
}

export const getImageUploadApi = () => {
    return `${getServerUrl()}upload/image`;
}

export const getServerUrl = () => {
    console.log(process.env.DOMAIN_NAME)
    return process.env.DOMAIN_NAME || "http://10.0.0.169:5000/";
}