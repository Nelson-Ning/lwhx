export const LoginActions = {
    doLogin: (data) => {
        return {
            type: 'LOGIN_GOLOGIN',
            loginInfo: data
        }
    },
};