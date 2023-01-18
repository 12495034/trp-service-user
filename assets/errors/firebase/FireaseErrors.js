//add additional firebase errors to this file as they become known
//keeps all errors in a single document so that response messages are kept consistent and can be maintained easily
export const firebaseErrors = {
    invalidEmail: {
        error: 'auth/invalid-email',
        message: 'Invalid Email - Please enter a valid email address'
    },
    invalidUser: {
        error: 'auth/user-not-found',
        message: 'Invalid Email - Please enter a valid email address'
    },

}