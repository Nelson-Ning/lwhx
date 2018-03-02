const isIE = () => (navigator.appName == "Microsoft Internet Explorer");
const IEVersion = () => (parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")));
// 时间戳转Date形式
const getLocalTime = (nS) => (new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' '));

export {
    isIE,
    IEVersion,
    getLocalTime
};