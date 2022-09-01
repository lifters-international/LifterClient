export const getApiUrl = () => {
    return `${getServerUrl()}graphql`;
}

export const getWSApiUrl = () => {
    return  `ws://${process.env.REACT_APP_DOMAIN || "10.0.0.169:5000"}/graphql`;
}

export const getImageUploadApi = () => {
    return `${getServerUrl()}upload/image`;
}

export const getServerUrl = () => {
    console.log(process.env.REACT_APP_DOMAIN_NAME)
    return process.env.REACT_APP_DOMAIN_NAME || "http://10.0.0.169:5000/";
}