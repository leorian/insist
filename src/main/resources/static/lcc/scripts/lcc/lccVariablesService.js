define("lcc/utils/lccVariablesService", [], function () {
    function i(e, t) {
        var n = s(e), r = {};
        if (angular.isObject(n)) {
            for (var i in t) {
                var o = t[i];
                if (o === n[i]) {
                    r[i] = o;
                }
                else {
                    var u = n[i];
                    u != undefined && (u == "" || u === undefined ? r[i] = o : r[u] = o)
                }
            }
        }
        else r = t;
        return r
    }

    var e = window.ALIYUN_LCC_CONSOLE_CONFIG, t;
    e && (t = e.SEC_TOKEN);
    /*
     * n = eXzIWH5Bna1HAWOCKHBg6
     * */
    var n = function (t) {
            if (e && e[t] !== undefined) return e[t]
        },
        r = function (e) {
            var t = e.code, n;
            if (t === RESPONSE_CODE.SERVER_STATUS_ILLEGAL) {
                var r = e.instanceId || "",
                    i = ECS_OPERATION_TEXT[e.type] || "";
                n = "<b>" + i + i18nHelper.i18n("ecs.cons.conssimple.err.empty", r)
            }
            else if (t === RESPONSE_CODE.DUPLICATE_IMAGE_ID) {
                n = e.message;
            }
            else if (t === RESPONSE_CODE.SNAPSHOT_USED_IMAGE_CANNOT_DEL ||
                t === RESPONSE_CODE.SNAPSHOT_USED_DISK_CANNOT_DEL) {
                var s = e.requestId;
                e.snapshotNickname && (s = s + "/" + e.snapshotNickname),
                    n = i18nHelper.i18n("ecs.cons.conssimple.err.delete_sp", s, e.message)
            }

            return n
        },

        s = function (e) {
            if (window && window[e] !== undefined) {
                return window[e]
            }
        };

    return {
        getKeyFromConstants: n,
        getGlobalKey: s,
        getFormDefinition: i,
        getSecToken: t,
        errorMessageHelper: r
    }

});