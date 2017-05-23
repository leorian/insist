define("common/cons/aliyunCons", [], function () {
    var e = {
            SUCCESS: "200",
            SESSION_TIMEOUT: "-99",
            NEED_LOGIN: "-100",
            HTTP_SUCCESS: 200
        },
        t = function () {
            var e = window.location.hostname;
            if (!e.match(/^.+\.aliyun\.|^aliyun\./)) return ".com";
            var t = e.replace(/^.*\.aliyun|^aliyun/i, "");
            return t || (t = ".com"),
                t
        }();
    return {
        SHOW_RESPONSE_ERROR_MESSAGE: "showResponseErrorMessage",
        RESPONSE_CODE: e,
        ALIYUN_CONSOLE_SESSION_TIMEOUT: "aliyunConsoleSessionTimeout",
        SUFFIX: t
    }
});