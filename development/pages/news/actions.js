export const NewsActions = {
    changeParams: (params) => {
        return {
            type: 'NEWS_CHANHE_PARAMS',
            params: params
        }
    },
    changeMessage: (data) => {
        return {
            type: 'NEWS_CHANHE_MESSAGE',
            message: data
        }
    }
};