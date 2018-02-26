const isIE = () => (navigator.appName == "Microsoft Internet Explorer");
const IEVersion = () => (parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")));
export {
    isIE,
    IEVersion
};