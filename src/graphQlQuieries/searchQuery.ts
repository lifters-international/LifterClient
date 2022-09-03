export const searchQuery = `
    query SearchUsers($search: String!, $token: String!) {
        searchUsers(search: $search, token: $token) {
            id
            username
            email
            age
            gender
            genderOfPrefense
            bio
            profilePicture
            homeGymLocation
        }
    }
`;