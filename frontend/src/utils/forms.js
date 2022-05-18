export const parseErrorMessage = (fieldsErrorMessage) => {
    return Object.entries(fieldsErrorMessage).reduce(
        (acc, [fieldName, errors]) => {
            // errors : ["m1", "m2"]
            acc[fieldName] = {
                validateStatus: 'error',
                help: errors.join(' '),
            };
            return acc;
        },
        {}, // 초기값
    );
};
