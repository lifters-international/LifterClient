export const searchTrainers = `
    query searchTrainers($search: String!) {
        searchTrainers(search: $search) {
            id
            name
            bio
            profilePicture
            price
            ratingsAverage
        }
    }
`;
