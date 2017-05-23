define("common/helper/i18nHelper", [], function () {
    function t() {
        var e = arguments;
        if (e[0]) return e[0].replace(/\{\{|\}\}|\{(\d+)\}/g, function (t, n) {
            if (t == "{{") return "{";
            if (t == "}}") return "}";
            var r = parseInt(n) + 1,
                i = e[r];
            return i == undefined && (i = t),
                i
        })
    }

    function n(t) {
        e = t || {}
    }

    function r() {
        return e
    }

    function i() {
        var e = arguments;
        if (e[0]) {
            var n = e[0],
                i = r()[n];
            return i ? (e[0] = i, t.apply(this, e)) : n
        }
    }

    var e = {};
    return {
        formatter: t,
        f: t,
        i18n: i,
        i18nConfig: n
    }
});