export const subscribeToUnlimitedLifter =  `
    query Query($paymentMethodId: String!, $token: String!) {
        subscribeToUnlimited(paymentMethodId: $paymentMethodId, token: $token)
    }
`;