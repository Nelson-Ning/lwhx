const isIE = () => (navigator.appName == "Microsoft Internet Explorer");
const IEVersion = () => (parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")));
// 时间戳转Date形式
const getLocalTime = (nS) => (new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' '));
class AJAX {
    constructor() {
        this.xhr = (function() {
            // 使用 typeof 不会报错
            if (typeof XMLHttpRequest !== undefined) {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== undefined) {
                if (typeof arguments.callee.activeXString !== 'string') {
                    var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'],
                        i, len;
                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (error) {
                            console.log('Your Browser do not support ' + versions[i] + '.');
                        }
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error('没有可用的 AJAX 对象构造器');
            }
        })();
        this.send = (items, method) => {
            return new Promise((resolve, reject) => {
                this.xhr.open(method, items.url, items.async || true);
                (function(xhr) {
                    for (var prop in items) {
                        if (items.hasOwnProperty(prop)) {
                            if (prop === 'onload') {
                                xhr.onload = function() {
                                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                                        items[prop].call(xhr, xhr.responseText, xhr.status, xhr);
                                    } else {
                                        console.log('load event -- Request was unsuccessful: ' + xhr.status);
                                    }
                                };
                            } else if (prop === 'onprogress' || prop === 'ontimeout' || prop === 'onerror' || prop === 'onabort' || prop === 'onloadstart' || prop === 'onloadend') {
                                xhr[prop] = function(e) {
                                    items[prop].call(xhr, e, xhr.responseText, xhr.status, xhr);
                                }
                            } else if (prop === 'timeout' || prop === 'withCredentials') {
                                xhr[prop] = items[prop];
                            } else if (prop === 'overrideMimeType') {
                                xhr.overrideMimeType(items[prop]);
                            } else if (prop === 'requestHeader') {
                                for (var header in items[prop]) {
                                    if (items[prop].hasOwnProperty(header)) {
                                        xhr.setRequestHeader(header, items[prop][header]);
                                    }
                                }
                            } else if (prop === 'upload') {
                                // 使用 Ajax 上传数据的状态事件回调函数，可用 upload.onprogress 实现上传进度条，当然需要服务器支持返回上传进度
                                for (var uploadEvent in items[prop]) {
                                    if (items[prop].hasOwnProperty(uploadEvent)) {
                                        xhr.upload[uploadEvent] = items[prop][uploadEvent];
                                    }
                                }
                            }
                        }
                    }
                })(this.xhr);
                let data = items.data;
                if (method.toLowerCase() === 'get') {
                    if (typeof data === 'object' && data !== null) {
                        url = (function() {
                            var queryArr = [];
                            for (var prop in data) {
                                if (data.hasOwnProperty(prop)) {
                                    queryArr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]));
                                }
                            }
                            return (url + '?' + queryArr.join('&'));
                        })();
                        data = null;
                    } else if (typeof data === 'string') {
                        data = data.indexOf('?') === 0 ? data : '?' + data;
                        url = url + data;
                        data = null;
                    } else {
                        data = null;
                    }
                } else {
                    // 对于 POST，data 可以是null、字符串、文件（表单文件控件取得）、FormData、ArrayBuffer
                    if (data instanceof FormData || data instanceof File || data instanceof ArrayBuffer) {
                        data = data;
                    } else if (typeof data === 'object') {
                        data = function() {
                            var serializeArr = [];
                            for (var prop in data) {
                                if (data.hasOwnProperty(prop)) {
                                    serializeArr.push(encodeURIComponent(prop) + '=' + encodeURIComponent(data[prop]));
                                }
                            }
                            return serializeArr.join('&');
                        }();
                    } else if (typeof data === 'string') {
                        data = data;
                    } else {
                        data = null;
                    }
                }
                this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                this.xhr.send(data);
                this.xhr.onreadystatechange = () => {
                    if (this.xhr.readyState === 4) {
                        try {
                            if ((this.xhr.status >= 200 && this.xhr.status < 300) || this.xhr.status == 304) {
                                try {
                                    var ret = JSON.parse(this.xhr.response)
                                } catch (e) {
                                    reject('JSON解析错误: ' + e);
                                }
                                resolve(ret);
                            } else {
                                reject('请求错误: ' + this.xhr.status + ' ' + this.xhr.statusText);
                            }
                        } catch (error) {
                            reject('回调函数内部发生错误，请检查回调函数！', error);
                        }
                    }
                }
            })
        }

    }

    post(options) {
        return this.send(options, 'post');
    }

    get(options) {
        return this.send(options, 'get');
    }
}

function setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
};
/*使用方法：setCookie('user', 'simon', 11);*/
/*获取cookie*/
function getCookie(name) {
    var arr = document.cookie.split('; '); //多个cookie值是以; 分隔的，用split把cookie分割开并赋值给数组
    for (var i = 0; i < arr[i].length; i++) //历遍数组
    {
        var arr2 = arr[i].split('='); //原来割好的数组是：user=simon，再用split('=')分割成：user simon 这样可以通过arr2[0] arr2[1]来分别获取user和simon 
        if (arr2[0] == name) //如果数组的属性名等于传进来的name
        {
            return arr2[1]; //就返回属性名对应的值
        }
        return ''; //没找到就返回空
    }
};
/*使用方法：getCookie('user')*/
/*删除cookie*/
function removeCookie(name) {
    setCookie(name, 1, -1); //-1就是告诉系统已经过期，系统就会立刻去删除cookie
};
/*使用方法：removeCookie('user')*/
export {
    isIE,
    IEVersion,
    getLocalTime,
    AJAX,
    setCookie,
    getCookie
};