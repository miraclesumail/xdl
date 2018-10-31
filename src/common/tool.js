import moment from 'moment';
const tool = {
    getSessionStore (name) { // 获取临储存
        return JSON.parse(sessionStorage.getItem(name));
    },
    setSessionStore (name, val) { // 设置临时储存
        sessionStorage.setItem(name, JSON.stringify(val));
    },
    deleteSessionStore (name) { // 删除临时储存
        sessionStorage.removeItem(name);
    },
    setLocalStore (name, val) { // 设置本地永久储存
        localStorage.setItem(name, JSON.stringify(val));
    },
    getLocalStore (name) {
        return JSON.parse(localStorage.getItem(name));
    },
    deleteLocalStore (name) {
        localStorage.removeItem(name);
    },
    baseString (arr) { // 解析返回的Buffer数据流
        let base64String = 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(arr)));
        return base64String;
    },
    timeFormat (number, format) {
        let time = moment(number).format(format);
        return time;
    },
    numberFormat (number, format) {
    },
    trimTransfer (name) {
        return name.replace(/\s+/, '');
    },
    cookie: { // 操作Cookie
        set (name, key, expiredays) {
            let cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(key);
            if (expiredays) {
                cookieText += '; expires = ' + new Date(expiredays).toGMTString();
            } else {
            }
            document.cookie = cookieText;
        },
        get (name) {
            let cookieName = encodeURIComponent(name) + '=';
            let cookieStart = document.cookie.indexOf(cookieName);
            let cookieValue = null;
            if (cookieStart > -1) {
                let cookieEnd = document.cookie.indexOf(';', cookieStart);
                if (cookieEnd === -1) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            }
            return cookieValue;
        },
        unset (name) {
            this.set(name, '', new Date(0));
        }
    },
    cookieObj: { // TODO 突破限制操作cookie的方法 对象值
        set () {
        },
        setAll () {
        },
        get () {
        },
        getAll () {
        },
        unSet () {
        }
    },
    useEnvironment () {
        let app = null;
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            app = 'ios';
        } else if (/(Android)/i.test(navigator.userAgent)) {
            app = 'android';
        }
        return app;
    },
    webViewEnvironment () {
        let isIosApp = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
        let baidu = /Baidu/.test(navigator.userAgent);
        let isAndroidApp = window.native;
        return isIosApp || isAndroidApp || baidu;
    },
    getDeviceNumber () {
        let isApp = this.webViewEnvironment();
        if (isApp) {
            return window.deviceid.getDeviceInfo();
        } else {
            return {
                id: null,
                device: null
            };
        }
    },
    formalNumber (test) {
        return /^[0-9]*$/.test(test);
    },
    // 获取某月有多少天
    getDaysInOneMonth(year, month){
        month = parseInt(month,10)+1;
        var d= new Date(year+"/"+month+"/0");
        return d.getDate();
    }
};
export default tool;
