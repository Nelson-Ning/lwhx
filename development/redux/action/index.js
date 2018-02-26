/**
 * 公共 action
 */

export const CommonActions = {
    changeLoading: (bool) => {
        return {
            type: 'LOADING',
            loading: bool
        }
    },
    changeAside: (bool) => {
        return {
            type: 'CHANGE_ASIDE',
            hide: bool
        }
    },
    changeUserInfo: (data) => {
        return {
            type: 'CHANGE_USERINFO',
            userInfo: data
        }
    }
};