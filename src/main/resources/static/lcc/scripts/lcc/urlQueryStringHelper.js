define("common/helper/urlQueryStringHelper", [], function () {
    function n() {
        var n = window.location.search.substring(1),
            r = null;
        if (n) {
            r = {};
            if (n == t && e) return e[n];
            t = n;
            var i = n.split("&");
            for (var s = 0, o = null; o = i[s]; s++) o = o.split("="),
                r[o[0]] = o[1];
            return e[n] = r,
                r
        }
        return null
    }

    var e = {},
        t = "";
    return {
        getQueryValue: function (e) {
            var t = n();
            if (t == null) return null;
            var r = t[e];
            return r
        },
        getQueryValueMap: n
    }
});
