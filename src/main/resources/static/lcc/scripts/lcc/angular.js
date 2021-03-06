(function (e, t, n) {
    "use strict";

    function r(e) {
        return function () {
            var t = arguments[0],
                n = "[" + (e ? e + ":" : "") + t + "] ",
                r = arguments[1],
                i = arguments,
                s = function (e) {
                    return typeof e == "function" ? e.toString().replace(/ \{[\s\S]*$/, "") : typeof e == "undefined" ? "undefined" : typeof e != "string" ? JSON.stringify(e) : e
                },
                o, u;
            o = n + r.replace(/\{\d+\}/g, function (e) {
                    var t = +e.slice(1, -1),
                        n;
                    if (t + 2 < i.length) return n = i[t + 2],
                        typeof n == "function" ? n.toString().replace(/ ?\{[\s\S]*$/, "") : typeof n == "undefined" ? "undefined" : typeof n != "string" ? ft(n) : n;
                    return e
                }),
                o = o + "\nhttp://errors.angularjs.org/1.2.2/" + (e ? e + "/" : "") + t;
            for (u = 2; u < arguments.length; u++) o = o + (u == 2 ? "?" : "&") + "p" + (u - 2) + "=" + encodeURIComponent(s(arguments[u]));
            return new Error(o)
        }
    }
    function w(e) {
        if (e == null || U(e)) return !1;
        var t = e.length;
        return e.nodeType === 1 && t ? !0 : B(e) || I(e) || t === 0 || typeof t == "number" && t > 0 && t - 1 in e
    }
    function E(e, t, n) {
        var r;
        if (e) if (q(e)) for (r in e) r != "prototype" && r != "length" && r != "name" && e.hasOwnProperty(r) && t.call(n, e[r], r);
        else if (e.forEach && e.forEach !== E) e.forEach(t, n);
        else if (w(e)) for (r = 0; r < e.length; r++) t.call(n, e[r], r);
        else for (r in e) e.hasOwnProperty(r) && t.call(n, e[r], r);
        return e
    }
    function S(e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(n);
        return t.sort()
    }
    function x(e, t, n) {
        var r = S(e);
        for (var i = 0; i < r.length; i++) t.call(n, e[r[i]], r[i]);
        return r
    }
    function T(e) {
        return function (t, n) {
            e(n, t)
        }
    }
    function N() {
        var e = b.length,
            t;
        while (e) {
            e--,
                t = b[e].charCodeAt(0);
            if (t == 57) return b[e] = "A",
                b.join("");
            if (t != 90) return b[e] = String.fromCharCode(t + 1),
                b.join("");
            b[e] = "0"
        }
        return b.unshift("0"),
            b.join("")
    }
    function C(e, t) {
        t ? e.$$hashKey = t : delete e.$$hashKey
    }
    function k(e) {
        var t = e.$$hashKey;
        return E(arguments, function (t) {
            t !== e && E(t, function (t, n) {
                e[n] = t
            })
        }),
            C(e, t),
            e
    }
    function L(e) {
        return parseInt(e, 10)
    }
    function A(e, t) {
        return k(new(k(function () {}, {
            prototype: e
        })), t)
    }
    function O() {}
    function M(e) {
        return e
    }
    function _(e) {
        return function () {
            return e
        }
    }
    function D(e) {
        return typeof e == "undefined"
    }
    function P(e) {
        return typeof e != "undefined"
    }
    function H(e) {
        return e != null && typeof e == "object"
    }
    function B(e) {
        return typeof e == "string"
    }
    function j(e) {
        return typeof e == "number"
    }
    function F(e) {
        return p.apply(e) == "[object Date]"
    }
    function I(e) {
        return p.apply(e) == "[object Array]"
    }
    function q(e) {
        return typeof e == "function"
    }
    function R(e) {
        return p.apply(e) == "[object RegExp]"
    }
    function U(e) {
        return e && e.document && e.location && e.alert && e.setInterval
    }
    function z(e) {
        return e && e.$evalAsync && e.$watch
    }
    function W(e) {
        return p.apply(e) === "[object File]"
    }
    function X(e) {
        return typeof e == "boolean"
    }
    function $(e) {
        return e && (e.nodeName || e.on && e.find)
    }
    function J(e) {
        var t = {},
            n = e.split(","),
            r;
        for (r = 0; r < n.length; r++) t[n[r]] = !0;
        return t
    }
    function K(e, t, n) {
        var r = [];
        return E(e, function (e, i, s) {
            r.push(t.call(n, e, i, s))
        }),
            r
    }
    function Q(e, t) {
        var n = 0,
            r;
        if (I(e) || B(e)) return e.length;
        if (H(e)) for (r in e)(!t || e.hasOwnProperty(r)) && n++;
        return n
    }
    function G(e, t) {
        return Y(e, t) != -1
    }
    function Y(e, t) {
        if (e.indexOf) return e.indexOf(t);
        for (var n = 0; n < e.length; n++) if (t === e[n]) return n;
        return -1
    }
    function Z(e, t) {
        var n = Y(e, t);
        return n >= 0 && e.splice(n, 1),
            t
    }
    function et(e) {
        if (e) switch (e.nodeName) {
            case "OPTION":
            case "PRE":
            case "TITLE":
                return !0
        }
        return !1
    }
    function tt(e, t) {
        if (U(e) || z(e)) throw d("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (!t) t = e,
        e && (I(e) ? t = tt(e, []) : F(e) ? t = new Date(e.getTime()) : R(e) ? t = new RegExp(e.source) : H(e) && (t = tt(e, {})));
        else {
            if (e === t) throw d("cpi", "Can't copy! Source and destination are identical.");
            if (I(e)) {
                t.length = 0;
                for (var n = 0; n < e.length; n++) t.push(tt(e[n]))
            } else {
                var r = t.$$hashKey;
                E(t, function (e, n) {
                    delete t[n]
                });
                for (var i in e) t[i] = tt(e[i]);
                C(t, r)
            }
        }
        return t
    }
    function nt(e, t) {
        t = t || {};
        for (var n in e) e.hasOwnProperty(n) && n.substr(0, 2) !== "$$" && (t[n] = e[n]);
        return t
    }
    function rt(e, t) {
        if (e === t) return !0;
        if (e === null || t === null) return !1;
        if (e !== e && t !== t) return !0;
        var r = typeof e,
            i = typeof t,
            s, o, u;
        if (r == i && r == "object") {
            if (!I(e)) {
                if (F(e)) return F(t) && e.getTime() == t.getTime();
                if (R(e) && R(t)) return e.toString() == t.toString();
                if (z(e) || z(t) || U(e) || U(t) || I(t)) return !1;
                u = {};
                for (o in e) {
                    if (o.charAt(0) === "$" || q(e[o])) continue;
                    if (!rt(e[o], t[o])) return !1;
                    u[o] = !0
                }
                for (o in t) if (!u.hasOwnProperty(o) && o.charAt(0) !== "$" && t[o] !== n && !q(t[o])) return !1;
                return !0
            }
            if (!I(t)) return !1;
            if ((s = e.length) == t.length) {
                for (o = 0; o < s; o++) if (!rt(e[o], t[o])) return !1;
                return !0
            }
        }
        return !1
    }
    function it() {
        return t.securityPolicy && t.securityPolicy.isActive || t.querySelector && ( !! t.querySelector("[ng-csp]") || !! t.querySelector("[data-ng-csp]"))
    }
    function st(e, t, n) {
        return e.concat(c.call(t, n))
    }
    function ot(e, t) {
        return c.call(e, t || 0)
    }
    function ut(e, t) {
        var n = arguments.length > 2 ? ot(arguments, 2) : [];
        return !q(t) || t instanceof RegExp ? t : n.length ?
                function () {
                    return arguments.length ? t.apply(e, n.concat(c.call(arguments, 0))) : t.apply(e, n)
                } : function () {
                    return arguments.length ? t.apply(e, arguments) : t.call(e)
                }
    }
    function at(e, r) {
        var i = r;
        return typeof e == "string" && e.charAt(0) === "$" ? i = n : U(r) ? i = "$WINDOW" : r && t === r ? i = "$DOCUMENT" : z(r) && (i = "$SCOPE"),
            i
    }
    function ft(e, t) {
        return typeof e == "undefined" ? n : JSON.stringify(e, at, t ? "  " : null)
    }
    function lt(e) {
        return B(e) ? JSON.parse(e) : e
    }
    function ct(e) {
        if (e && e.length !== 0) {
            var t = i("" + e);
            e = t != "f" && t != "0" && t != "false" && t != "no" && t != "n" && t != "[]"
        } else e = !1;
        return e
    }
    function ht(e) {
        e = f(e).clone();
        try {
            e.html("")
        } catch (t) {}
        var n = 3,
            r = f("<div>").append(e).html();
        try {
            return e[0].nodeType === n ? i(r) : r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (e, t) {
                    return "<" + i(t)
                })
        } catch (t) {
            return i(r)
        }
    }
    function pt(e) {
        try {
            return decodeURIComponent(e)
        } catch (t) {}
    }
    function dt(e) {
        var t = {},
            n, r;
        return E((e || "").split("&"), function (e) {
            if (e) {
                n = e.split("="),
                    r = pt(n[0]);
                if (P(r)) {
                    var i = P(n[1]) ? pt(n[1]) : !0;
                    t[r] ? I(t[r]) ? t[r].push(i) : t[r] = [t[r], i] : t[r] = i
                }
            }
        }),
            t
    }
    function vt(e) {
        var t = [];
        return E(e, function (e, n) {
            I(e) ? E(e, function (e) {
                    t.push(gt(n, !0) + (e === !0 ? "" : "=" + gt(e, !0)))
                }) : t.push(gt(n, !0) + (e === !0 ? "" : "=" + gt(e, !0)))
        }),
            t.length ? t.join("&") : ""
    }
    function mt(e) {
        return gt(e, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }
    function gt(e, t) {
        return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, t ? "%20" : "+")
    }
    function yt(e, n) {
        function a(e) {
            e && r.push(e)
        }
        var r = [e],
            i, s, o = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
            u = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        E(o, function (n) {
            o[n] = !0,
                a(t.getElementById(n)),
                n = n.replace(":", "\\:"),
            e.querySelectorAll && (E(e.querySelectorAll("." + n), a), E(e.querySelectorAll("." + n + "\\:"), a), E(e.querySelectorAll("[" + n + "]"), a))
        }),
            E(r, function (e) {
                if (!i) {
                    var t = " " + e.className + " ",
                        n = u.exec(t);
                    n ? (i = e, s = (n[2] || "").replace(/\s+/g, ",")) : E(e.attributes, function (t) {
                            !i && o[t.name] && (i = e, s = t.value)
                        })
                }
            }),
        i && n(i, s ? [s] : [])
    }
    function bt(n, r) {
        var i = function () {
                n = f(n);
                if (n.injector()) {
                    var e = n[0] === t ? "document" : ht(n);
                    throw d("btstrpd", "App Already Bootstrapped with this Element '{0}'", e)
                }
                r = r || [],
                    r.unshift(["$provide", function (e) {
                        e.value("$rootElement", n)
                    }]),
                    r.unshift("ng");
                var i = vn(r);
                return i.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function (e, t, n, r, i) {
                    e.$apply(function () {
                        t.data("$injector", r),
                            n(t)(e)
                    })
                }]),
                    i
            },
            s = /^NG_DEFER_BOOTSTRAP!/;
        if (e && !s.test(e.name)) return i();
        e.name = e.name.replace(s, ""),
            m.resumeBootstrap = function (e) {
                E(e, function (e) {
                    r.push(e)
                }),
                    i()
            }
    }
    function Et(e, t) {
        return t = t || "_",
            e.replace(wt, function (e, n) {
                return (n ? t : "") + e.toLowerCase()
            })
    }
    function St() {
        l = e.jQuery,
            l ? (f = l, k(l.fn, {
                    scope: tn.scope,
                    isolateScope: tn.isolateScope,
                    controller: tn.controller,
                    injector: tn.injector,
                    inheritedData: tn.inheritedData
                }), Rt("remove", !0, !0, !1), Rt("empty", !1, !1, !1), Rt("html", !1, !1, !0)) : f = Ut,
            m.element = f
    }
    function xt(e, t, n) {
        if (!e) throw d("areq", "Argument '{0}' is {1}", t || "?", n || "required");
        return e
    }
    function Tt(e, t, n) {
        return n && I(e) && (e = e[e.length - 1]),
            xt(q(e), t, "not a function, got " + (e && typeof e == "object" ? e.constructor.name || "Object" : typeof e)),
            e
    }
    function Nt(e, t) {
        if (e === "hasOwnProperty") throw d("badname", "hasOwnProperty is not a valid {0} name", t)
    }
    function Ct(e, t, n) {
        if (!t) return e;
        var r = t.split("."),
            i, s = e,
            o = r.length;
        for (var u = 0; u < o; u++) i = r[u],
        e && (e = (s = e)[i]);
        return !n && q(e) ? ut(s, e) : e
    }
    function kt(e) {
        if (e.startNode === e.endNode) return f(e.startNode);
        var t = e.startNode,
            n = [t];
        do {
            t = t.nextSibling;
            if (!t) break;
            n.push(t)
        } while (t !== e.endNode);
        return f(n)
    }
    function Lt(e) {
        function i(e, t, n) {
            return e[t] || (e[t] = n())
        }
        var t = r("$injector"),
            n = r("ng"),
            s = i(e, "angular", Object);
        return s.$$minErr = s.$$minErr || r,
            i(s, "module", function () {
                var e = {};
                return function (s, o, u) {
                    var a = function (e, t) {
                        if (e === "hasOwnProperty") throw n("badname", "hasOwnProperty is not a valid {0} name", t)
                    };
                    return a(s, "module"),
                    o && e.hasOwnProperty(s) && (e[s] = null),
                        i(e, s, function () {
                            function a(t, n, r) {
                                return function () {
                                    return e[r || "push"]([t, n, arguments]),
                                        i
                                }
                            }
                            if (!o) throw t("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", s);
                            var e = [],
                                n = [],
                                r = a("$injector", "invoke"),
                                i = {
                                    _invokeQueue: e,
                                    _runBlocks: n,
                                    requires: o,
                                    name: s,
                                    provider: a("$provide", "provider"),
                                    factory: a("$provide", "factory"),
                                    service: a("$provide", "service"),
                                    value: a("$provide", "value"),
                                    constant: a("$provide", "constant", "unshift"),
                                    animation: a("$animateProvider", "register"),
                                    filter: a("$filterProvider", "register"),
                                    controller: a("$controllerProvider", "register"),
                                    directive: a("$compileProvider", "directive"),
                                    config: r,
                                    run: function (e) {
                                        return n.push(e),
                                            this
                                    }
                                };
                            return u && r(u),
                                i
                        })
                }
            })
    }
    function Ot(t) {
        k(t, {
            bootstrap: bt,
            copy: tt,
            extend: k,
            equals: rt,
            element: f,
            forEach: E,
            injector: vn,
            noop: O,
            bind: ut,
            toJson: ft,
            fromJson: lt,
            identity: M,
            isUndefined: D,
            isDefined: P,
            isString: B,
            isFunction: q,
            isObject: H,
            isNumber: j,
            isElement: $,
            isArray: I,
            version: At,
            isDate: F,
            lowercase: i,
            uppercase: s,
            callbacks: {
                counter: 0
            },
            $$minErr: r,
            $$csp: it
        }),
            g = Lt(e);
        try {
            g("ngLocale")
        } catch (n) {
            g("ngLocale", []).provider("$locale", Wn)
        }
        g("ng", ["ngLocale"], ["$provide", function (t) {
            t.provider("$compile", Tn).directive({
                a: ai,
                input: Ni,
                textarea: Ni,
                form: pi,
                script: os,
                select: fs,
                style: cs,
                option: ls,
                ngBind: ji,
                ngBindHtml: Ii,
                ngBindTemplate: Fi,
                ngClass: Ri,
                ngClassEven: zi,
                ngClassOdd: Ui,
                ngCloak: Wi,
                ngController: Xi,
                ngForm: di,
                ngHide: es,
                ngIf: $i,
                ngInclude: Ji,
                ngInit: Ki,
                ngNonBindable: Qi,
                ngPluralize: Gi,
                ngRepeat: Yi,
                ngShow: Zi,
                ngStyle: ts,
                ngSwitch: ns,
                ngSwitchWhen: rs,
                ngSwitchDefault: is,
                ngOptions: as,
                ngTransclude: ss,
                ngModel: Mi,
                ngList: Pi,
                ngChange: _i,
                required: Di,
                ngRequired: Di,
                ngValue: Bi
            }).directive(fi).directive(Vi),
                t.provider({
                    $anchorScroll: mn,
                    $animate: yn,
                    $browser: wn,
                    $cacheFactory: En,
                    $controller: On,
                    $document: Mn,
                    $exceptionHandler: _n,
                    $filter: Rr,
                    $interpolate: Un,
                    $interval: zn,
                    $http: jn,
                    $httpBackend: In,
                    $location: or,
                    $log: ur,
                    $parse: Er,
                    $rootScope: Tr,
                    $q: Sr,
                    $sce: Mr,
                    $sceDelegate: Or,
                    $sniffer: _r,
                    $templateCache: Sn,
                    $timeout: Dr,
                    $window: qr
                })
        }])
    }
    function Bt() {
        return ++Dt
    }
    function qt(e) {
        return e.replace(jt, function (e, t, n, r) {
            return r ? n.toUpperCase() : n
        }).replace(Ft, "Moz$1")
    }
    function Rt(e, t, n, r) {
        function s(e) {
            var s = n && e ? [this.filter(e)] : [this],
                o = t,
                u, a, c, h, p, d, v;
            if (!r || e != null) while (s.length) {
                u = s.shift();
                for (a = 0, c = u.length; a < c; a++) {
                    h = f(u[a]),
                        o ? h.triggerHandler("$destroy") : o = !o;
                    for (p = 0, d = (v = h.children()).length; p < d; p++) s.push(l(v[p]))
                }
            }
            return i.apply(this, arguments)
        }
        var i = l.fn[e];
        i = i.$original || i,
            s.$original = i,
            l.fn[e] = s
    }
    function Ut(e) {
        if (e instanceof Ut) return e;
        if (!(this instanceof Ut)) {
            if (B(e) && e.charAt(0) != "<") throw It("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new Ut(e)
        }
        if (B(e)) {
            var n = t.createElement("div");
            n.innerHTML = "<div>&#160;</div>" + e,
                n.removeChild(n.firstChild),
                Yt(this, n.childNodes);
            var r = f(t.createDocumentFragment());
            r.append(this)
        } else Yt(this, e)
    }
    function zt(e) {
        return e.cloneNode(!0)
    }
    function Wt(e) {
        Vt(e);
        for (var t = 0, n = e.childNodes || []; t < n.length; t++) Wt(n[t])
    }
    function Xt(e, t, n, r) {
        if (P(r)) throw It("offargs", "jqLite#off() does not support the `selector` argument");
        var i = $t(e, "events"),
            s = $t(e, "handle");
        if (!s) return;
        D(t) ? E(i, function (t, n) {
                Ht(e, n, t),
                    delete i[n]
            }) : E(t.split(" "), function (t) {
                D(n) ? (Ht(e, t, i[t]), delete i[t]) : Z(i[t] || [], n)
            })
    }
    function Vt(e, t) {
        var r = e[_t],
            i = Mt[r];
        if (i) {
            if (t) {
                delete Mt[r].data[t];
                return
            }
            i.handle && (i.events.$destroy && i.handle({}, "$destroy"), Xt(e)),
                delete Mt[r],
                e[_t] = n
        }
    }
    function $t(e, t, n) {
        var r = e[_t],
            i = Mt[r || -1];
        if (!P(n)) return i && i[t];
        i || (e[_t] = r = Bt(), i = Mt[r] = {}),
            i[t] = n
    }
    function Jt(e, t, n) {
        var r = $t(e, "data"),
            i = P(n),
            s = !i && P(t),
            o = s && !H(t);
        !r && !o && $t(e, "data", r = {});
        if (i) r[t] = n;
        else {
            if (!s) return r;
            if (o) return r && r[t];
            k(r, t)
        }
    }
    function Kt(e, t) {
        return e.getAttribute ? (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + t + " ") > -1 : !1
    }
    function Qt(e, t) {
        t && e.setAttribute && E(t.split(" "), function (t) {
            e.setAttribute("class", V((" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + V(t) + " ", " ")))
        })
    }
    function Gt(e, t) {
        if (t && e.setAttribute) {
            var n = (" " + (e.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            E(t.split(" "), function (e) {
                e = V(e),
                n.indexOf(" " + e + " ") === -1 && (n += e + " ")
            }),
                e.setAttribute("class", V(n))
        }
    }
    function Yt(e, t) {
        if (t) {
            t = !t.nodeName && P(t.length) && !U(t) ? t : [t];
            for (var n = 0; n < t.length; n++) e.push(t[n])
        }
    }
    function Zt(e, t) {
        return en(e, "$" + (t || "ngController") + "Controller")
    }
    function en(e, t, r) {
        e = f(e),
        e[0].nodeType == 9 && (e = e.find("html"));
        var i = I(t) ? t : [t];
        while (e.length) {
            for (var s = 0, o = i.length; s < o; s++) if ((r = e.data(i[s])) !== n) return r;
            e = e.parent()
        }
    }
    function sn(e, t) {
        var n = nn[t.toLowerCase()];
        return n && rn[e.nodeName] && n
    }
    function on(e, n) {
        var r = function (r, i) {
            r.preventDefault || (r.preventDefault = function () {
                r.returnValue = !1
            }),
            r.stopPropagation || (r.stopPropagation = function () {
                r.cancelBubble = !0
            }),
            r.target || (r.target = r.srcElement || t);
            if (D(r.defaultPrevented)) {
                var s = r.preventDefault;
                r.preventDefault = function () {
                    r.defaultPrevented = !0,
                        s.call(r)
                },
                    r.defaultPrevented = !1
            }
            r.isDefaultPrevented = function () {
                return r.defaultPrevented || r.returnValue === !1
            },
                E(n[i || r.type], function (t) {
                    t.call(e, r)
                }),
                a <= 8 ? (r.preventDefault = null, r.stopPropagation = null, r.isDefaultPrevented = null) : (delete r.preventDefault, delete r.stopPropagation, delete r.isDefaultPrevented)
        };
        return r.elem = e,
            r
    }
    function un(e) {
        var t = typeof e,
            r;
        return t == "object" && e !== null ? typeof(r = e.$$hashKey) == "function" ? r = e.$$hashKey() : r === n && (r = e.$$hashKey = N()) : r = e,
        t + ":" + r
    }
    function an(e) {
        E(e, this.put, this)
    }
    function dn(e) {
        var t, n, r, i;
        return typeof e == "function" ? (t = e.$inject) || (t = [], e.length && (n = e.toString().replace(hn, ""), r = n.match(fn), E(r[1].split(ln), function (e) {
                e.replace(cn, function (e, n, r) {
                    t.push(r)
                })
            })), e.$inject = t) : I(e) ? (i = e.length - 1, Tt(e[i], "fn"), t = e.slice(0, i)) : Tt(e, "fn", !0),
            t
    }
    function vn(e) {
        function f(e) {
            return function (t, n) {
                if (!H(t)) return e(t, n);
                E(t, T(e))
            }
        }
        function l(e, t) {
            Nt(e, "service");
            if (q(t) || I(t)) t = o.instantiate(t);
            if (!t.$get) throw pn("pget", "Provider '{0}' must define $get factory method.", e);
            return s[e + n] = t
        }
        function c(e, t) {
            return l(e, {
                $get: t
            })
        }
        function h(e, t) {
            return c(e, ["$injector", function (e) {
                return e.instantiate(t)
            }])
        }
        function p(e, t) {
            return c(e, _(t))
        }
        function d(e, t) {
            Nt(e, "constant"),
                s[e] = t,
                u[e] = t
        }
        function v(e, t) {
            var r = o.get(e + n),
                i = r.$get;
            r.$get = function () {
                var e = a.invoke(i, r);
                return a.invoke(t, null, {
                    $delegate: e
                })
            }
        }
        function m(e) {
            var t = [],
                n, r, s, u;
            return E(e, function (e) {
                if (i.get(e)) return;
                i.put(e, !0);
                try {
                    if (B(e)) {
                        n = g(e),
                            t = t.concat(m(n.requires)).concat(n._runBlocks);
                        for (r = n._invokeQueue, s = 0, u = r.length; s < u; s++) {
                            var a = r[s],
                                f = o.get(a[0]);
                            f[a[1]].apply(f, a[2])
                        }
                    } else q(e) ? t.push(o.invoke(e)) : I(e) ? t.push(o.invoke(e)) : Tt(e, "module")
                } catch (l) {
                    throw I(e) && (e = e[e.length - 1]),
                    l.message && l.stack && l.stack.indexOf(l.message) == -1 && (l = l.message + "\n" + l.stack),
                        pn("modulerr", "Failed to instantiate module {0} due to:\n{1}", e, l.stack || l.message || l)
                }
            }),
                t
        }
        function y(e, i) {
            function o(n) {
                if (e.hasOwnProperty(n)) {
                    if (e[n] === t) throw pn("cdep", "Circular dependency found: {0}", r.join(" <- "));
                    return e[n]
                }
                try {
                    return r.unshift(n),
                        e[n] = t,
                        e[n] = i(n)
                } finally {
                    r.shift()
                }
            }
            function u(e, t, n) {
                var r = [],
                    i = dn(e),
                    s, u, a;
                for (u = 0, s = i.length; u < s; u++) {
                    a = i[u];
                    if (typeof a != "string") throw pn("itkn", "Incorrect injection token! Expected service name as string, got {0}", a);
                    r.push(n && n.hasOwnProperty(a) ? n[a] : o(a))
                }
                e.$inject || (e = e[s]);
                switch (t ? -1 : r.length) {
                    case 0:
                        return e();
                    case 1:
                        return e(r[0]);
                    case 2:
                        return e(r[0], r[1]);
                    case 3:
                        return e(r[0], r[1], r[2]);
                    case 4:
                        return e(r[0], r[1], r[2], r[3]);
                    case 5:
                        return e(r[0], r[1], r[2], r[3], r[4]);
                    case 6:
                        return e(r[0], r[1], r[2], r[3], r[4], r[5]);
                    case 7:
                        return e(r[0], r[1], r[2], r[3], r[4], r[5], r[6]);
                    case 8:
                        return e(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]);
                    case 9:
                        return e(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]);
                    case 10:
                        return e(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9]);
                    default:
                        return e.apply(t, r)
                }
            }
            function a(e, t) {
                var n = function () {},
                    r, i;
                return n.prototype = (I(e) ? e[e.length - 1] : e).prototype,
                    r = new n,
                    i = u(e, r, t),
                    H(i) || q(i) ? i : r
            }
            return {
                invoke: u,
                instantiate: a,
                get: o,
                annotate: dn,
                has: function (t) {
                    return s.hasOwnProperty(t + n) || e.hasOwnProperty(t)
                }
            }
        }
        var t = {},
            n = "Provider",
            r = [],
            i = new an,
            s = {
                $provide: {
                    provider: f(l),
                    factory: f(c),
                    service: f(h),
                    value: f(p),
                    constant: f(d),
                    decorator: v
                }
            },
            o = s.$injector = y(s, function () {
                throw pn("unpr", "Unknown provider: {0}", r.join(" <- "))
            }),
            u = {},
            a = u.$injector = y(u, function (e) {
                var t = o.get(e + n);
                return a.invoke(t.$get, t)
            });
        return E(m(e), function (e) {
            a.invoke(e || O)
        }),
            a
    }
    function mn() {
        var e = !0;
        this.disableAutoScrolling = function () {
            e = !1
        },
            this.$get = ["$window", "$location", "$rootScope", function (t, n, r) {
                function o(e) {
                    var t = null;
                    return E(e, function (e) {
                        !t && i(e.nodeName) === "a" && (t = e)
                    }),
                        t
                }
                function u() {
                    var e = n.hash(),
                        r;
                    e ? (r = s.getElementById(e)) ? r.scrollIntoView() : (r = o(s.getElementsByName(e))) ? r.scrollIntoView() : e === "top" && t.scrollTo(0, 0) : t.scrollTo(0, 0)
                }
                var s = t.document;
                return e && r.$watch(function () {
                    return n.hash()
                }, function () {
                    r.$evalAsync(u)
                }),
                    u
            }]
    }
    function bn(e, t, r, i) {
        function v(e) {
            try {
                e.apply(null, ot(arguments, 1))
            } finally {
                p--;
                if (p === 0) while (d.length) try {
                    d.pop()()
                } catch (t) {
                    r.error(t)
                }
            }
        }
        function y(e, t) {
            (function n() {
                E(m, function (e) {
                    e()
                }),
                    g = t(n, e)
            })()
        }
        function N() {
            S = null;
            if (b == s.url()) return;
            b = s.url(),
                E(x, function (e) {
                    e(s.url())
                })
        }
        var s = this,
            o = t[0],
            u = e.location,
            a = e.history,
            l = e.setTimeout,
            c = e.clearTimeout,
            h = {};
        s.isMock = !1;
        var p = 0,
            d = [];
        s.$$completeOutstandingRequest = v,
            s.$$incOutstandingRequestCount = function () {
                p++
            },
            s.notifyWhenNoOutstandingRequests = function (e) {
                E(m, function (e) {
                    e()
                }),
                    p === 0 ? e() : d.push(e)
            };
        var m = [],
            g;
        s.addPollFn = function (e) {
            return D(g) && y(100, l),
                m.push(e),
                e
        };
        var b = u.href,
            w = t.find("base"),
            S = null;
        s.url = function (t, n) {
            u !== e.location && (u = e.location);
            if (t) {
                if (b == t) return;
                return b = t,
                    i.history ? n ? a.replaceState(null, "", t) : (a.pushState(null, "", t), w.attr("href", w.attr("href"))) : (S = t, n ? u.replace(t) : u.href = t),
                    s
            }
            return S || u.href.replace(/%27/g, "'")
        };
        var x = [],
            T = !1;
        s.onUrlChange = function (t) {
            return T || (i.history && f(e).on("popstate", N), i.hashchange ? f(e).on("hashchange", N) : s.addPollFn(N), T = !0),
                x.push(t),
                t
        },
            s.baseHref = function () {
                var e = w.attr("href");
                return e ? e.replace(/^https?\:\/\/[^\/]*/, "") : ""
            };
        var C = {},
            k = "",
            L = s.baseHref();
        s.cookies = function (e, t) {
            var i, s, u, a, f;
            if (!e) {
                if (o.cookie !== k) {
                    k = o.cookie,
                        s = k.split("; "),
                        C = {};
                    for (a = 0; a < s.length; a++) u = s[a],
                        f = u.indexOf("="),
                    f > 0 && (e = unescape(u.substring(0, f)), C[e] === n && (C[e] = unescape(u.substring(f + 1))))
                }
                return C
            }
            t === n ? o.cookie = escape(e) + "=;path=" + L + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : B(t) && (i = (o.cookie = escape(e) + "=" + escape(t) + ";path=" + L).length + 1, i > 4096 && r.warn("Cookie '" + e + "' possibly not set or overflowed because it was too large (" + i + " > 4096 bytes)!"))
        },
            s.defer = function (e, t) {
                var n;
                return p++,
                    n = l(function () {
                        delete h[n],
                            v(e)
                    }, t || 0),
                    h[n] = !0,
                    n
            },
            s.defer.cancel = function (e) {
                return h[e] ? (delete h[e], c(e), v(O), !0) : !1
            }
    }
    function wn() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function (e, t, n, r) {
            return new bn(e, r, t, n)
        }]
    }
    function En() {
        this.$get = function () {
            function t(t, n) {
                function c(e) {
                    e != f && (l ? l == e && (l = e.n) : l = e, h(e.n, e.p), h(e, f), f = e, f.n = null)
                }
                function h(e, t) {
                    e != t && (e && (e.p = t), t && (t.n = e))
                }
                if (t in e) throw r("$cacheFactory")("iid", "CacheId '{0}' is already taken!", t);
                var i = 0,
                    s = k({}, n, {
                        id: t
                    }),
                    o = {},
                    u = n && n.capacity || Number.MAX_VALUE,
                    a = {},
                    f = null,
                    l = null;
                return e[t] = {
                    put: function (e, t) {
                        var n = a[e] || (a[e] = {
                                key: e
                            });
                        c(n);
                        if (D(t)) return;
                        return e in o || i++,
                            o[e] = t,
                        i > u && this.remove(l.key),
                            t
                    },
                    get: function (e) {
                        var t = a[e];
                        if (!t) return;
                        return c(t),
                            o[e]
                    },
                    remove: function (e) {
                        var t = a[e];
                        if (!t) return;
                        t == f && (f = t.p),
                        t == l && (l = t.n),
                            h(t.n, t.p),
                            delete a[e],
                            delete o[e],
                            i--
                    },
                    removeAll: function () {
                        o = {},
                            i = 0,
                            a = {},
                            f = l = null
                    },
                    destroy: function () {
                        o = null,
                            s = null,
                            a = null,
                            delete e[t]
                    },
                    info: function () {
                        return k({}, s, {
                            size: i
                        })
                    }
                }
            }
            var e = {};
            return t.info = function () {
                var t = {};
                return E(e, function (e, n) {
                    t[n] = e.info()
                }),
                    t
            },
                t.get = function (t) {
                    return e[t]
                },
                t
        }
    }
    function Sn() {
        this.$get = ["$cacheFactory", function (e) {
            return e("templates")
        }]
    }
    function Tn(e) {
        var r = {},
            i = "Directive",
            s = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
            o = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
            u = /^\s*(https?|ftp|mailto|tel|file):/,
            l = /^\s*(https?|ftp|file):|data:image\//,
            c = /^(on[a-z]+|formaction)$/;
        this.directive = function h(t, n) {
            return Nt(t, "directive"),
                B(t) ? (xt(n, "directiveFactory"), r.hasOwnProperty(t) || (r[t] = [], e.factory(t + i, ["$injector", "$exceptionHandler", function (e, n) {
                        var i = [];
                        return E(r[t], function (r, s) {
                            try {
                                var o = e.invoke(r);
                                q(o) ? o = {
                                        compile: _(o)
                                    } : !o.compile && o.link && (o.compile = _(o.link)),
                                    o.priority = o.priority || 0,
                                    o.index = s,
                                    o.name = o.name || t,
                                    o.require = o.require || o.controller && o.name,
                                    o.restrict = o.restrict || "A",
                                    i.push(o)
                            } catch (u) {
                                n(u)
                            }
                        }),
                            i
                    }])), r[t].push(n)) : E(t, T(h)),
                this
        },
            this.aHrefSanitizationWhitelist = function (e) {
                return P(e) ? (u = e, this) : u
            },
            this.imgSrcSanitizationWhitelist = function (e) {
                return P(e) ? (l = e, this) : l
            },
            this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", function (e, h, p, d, v, m, g, b, w, S, x) {
                function D(e, t, n, r, i) {
                    e instanceof f || (e = f(e)),
                        E(e, function (t, n) {
                            t.nodeType == 3 && t.nodeValue.match(/\S+/) && (e[n] = t = f(t).wrap("<span></span>").parent()[0])
                        });
                    var s = j(e, t, e, n, r, i);
                    return function (n, r, i) {
                        xt(n, "scope");
                        var o = r ? tn.clone.call(e) : e;
                        E(i, function (e, t) {
                            o.data("$" + t + "Controller", e)
                        });
                        for (var u = 0, a = o.length; u < a; u++) {
                            var f = o[u];
                            (f.nodeType == 1 || f.nodeType == 9) && o.eq(u).data("$scope", n)
                        }
                        return P(o, "ng-scope"),
                        r && r(o, n),
                        s && s(n, o, o),
                            o
                    }
                }
                function P(e, t) {
                    try {
                        e.addClass(t)
                    } catch (n) {}
                }
                function j(e, t, r, i, s, o) {
                    function v(e, r, i, s) {
                        var o, a, l, c, h, p, d, v, m, g = [];
                        for (d = 0, v = r.length; d < v; d++) g.push(r[d]);
                        for (d = 0, m = 0, v = u.length; d < v; m++) l = g[m],
                            o = u[d++],
                            a = u[d++],
                            c = f(l),
                            o ? (o.scope ? (h = e.$new(), c.data("$scope", h), P(c, "ng-scope")) : h = e, p = o.transclude, p || !s && t ? o(a, h, l, i, F(e, p || t)) : o(a, h, l, n, s)) : a && a(e, l.childNodes, n, s)
                    }
                    var u = [],
                        a, l, c, h, p;
                    for (var d = 0; d < e.length; d++) h = new T,
                        c = R(e[d], [], h, d === 0 ? i : n, s),
                        a = c.length ? W(c, e[d], h, t, r, null, [], [], o) : null,
                        l = a && a.terminal || !e[d].childNodes || !e[d].childNodes.length ? null : j(e[d].childNodes, a ? a.transclude : t),
                        u.push(a),
                        u.push(l),
                        p = p || a || l,
                        o = null;
                    return p ? v : null
                }
                function F(e, t) {
                    return function (r, i, s) {
                        var o = !1;
                        r || (r = e.$new(), r.$$transcluded = !0, o = !0);
                        var u = t(r, i, s);
                        return o && u.on("$destroy", ut(r, r.$destroy)),
                            u
                    }
                }
                function R(e, t, n, r, i) {
                    var u = e.nodeType,
                        f = n.$attr,
                        l, c;
                    switch (u) {
                        case 1:
                            $(t, Cn(y(e).toLowerCase()), "E", r, i);
                            for (var h, p, d, v, m, g = e.attributes, b = 0, w = g && g.length; b < w; b++) {
                                var E = !1,
                                    S = !1;
                                h = g[b];
                                if (!a || a >= 8 || h.specified) {
                                    p = h.name,
                                        v = Cn(p),
                                    O.test(v) && (p = Et(v.substr(6), "-"));
                                    var x = v.replace(/(Start|End)$/, "");
                                    v === x + "Start" && (E = p, S = p.substr(0, p.length - 5) + "end", p = p.substr(0, p.length - 6)),
                                        d = Cn(p.toLowerCase()),
                                        f[d] = p,
                                        n[d] = m = V(a && p == "href" ? decodeURIComponent(e.getAttribute(p, 2)) : h.value),
                                    sn(e, d) && (n[d] = !0),
                                        et(e, t, m, d),
                                        $(t, d, "A", r, i, E, S)
                                }
                            }
                            c = e.className;
                            if (B(c) && c !== "") while (l = o.exec(c)) d = Cn(l[2]),
                            $(t, d, "C", r, i) && (n[d] = V(l[3])),
                                c = c.substr(l.index + l[0].length);
                            break;
                        case 3:
                            Y(t, e.nodeValue);
                            break;
                        case 8:
                            try {
                                l = s.exec(e.nodeValue),
                                l && (d = Cn(l[1]), $(t, d, "M", r, i) && (n[d] = V(l[2])))
                            } catch (T) {}
                    }
                    return t.sort(Q),
                        t
                }
                function U(e, t, n) {
                    var r = [],
                        i = 0;
                    if (t && e.hasAttribute && e.hasAttribute(t)) {
                        var s = e;
                        do {
                            if (!e) throw xn("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", t, n);
                            e.nodeType == 1 && (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--), r.push(e), e = e.nextSibling
                        } while (i > 0)
                    } else r.push(e);
                    return f(r)
                }
                function z(e, t, n) {
                    return function (r, i, s, o, u) {
                        return i = U(i[0], t, n),
                            e(r, i, s, o, u)
                    }
                }
                function W(e, r, i, s, o, u, a, l, c) {
                    function ut(e, t, n, r) {
                        if (e) {
                            n && (e = z(e, n, r)),
                                e.require = k.require;
                            if (b === k || k.$$isolateScope) e = rt(e, {
                                isolateScope: !0
                            });
                            a.push(e)
                        }
                        if (t) {
                            n && (t = z(t, n, r)),
                                t.require = k.require;
                            if (b === k || k.$$isolateScope) t = rt(t, {
                                isolateScope: !0
                            });
                            l.push(t)
                        }
                    }
                    function at(e, t, n) {
                        var r, i = "data",
                            s = !1;
                        if (B(e)) {
                            while ((r = e.charAt(0)) == "^" || r == "?") e = e.substr(1),
                            r == "^" && (i = "inheritedData"),
                                s = s || r == "?";
                            r = null,
                            n && i === "data" && (r = n[e]),
                                r = r || t[i]("$" + e + "Controller");
                            if (!r && !s) throw xn("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", e, A);
                            return r
                        }
                        return I(e) && (r = [], E(e, function (e) {
                            r.push(at(e, t, n))
                        })),
                            r
                    }
                    function ft(e, t, s, o, u) {
                        function H(e, t) {
                            var r;
                            return arguments.length < 2 && (t = e, e = n),
                            N && (r = L),
                                u(e, t, r)
                        }
                        var c, d, v, S, x, C, k, L = {},
                            A;
                        r === s ? c = i : c = nt(i, new T(f(s), i.$attr)),
                            d = c.$$element;
                        if (b) {
                            var O = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
                                M = f(s);
                            k = t.$new(!0),
                                w && w === b.$$originalDirective ? M.data("$isolateScope", k) : M.data("$isolateScopeNoTemplate", k),
                                P(M, "ng-isolate-scope"),
                                E(b.scope, function (e, n) {
                                    var r = e.match(O) || [],
                                        i = r[3] || n,
                                        s = r[2] == "?",
                                        o = r[1],
                                        u, a, f;
                                    k.$$isolateBindings[n] = o + i;
                                    switch (o) {
                                        case "@":
                                            c.$observe(i, function (e) {
                                                k[n] = e
                                            }),
                                                c.$$observers[i].$$scope = t,
                                            c[i] && (k[n] = h(c[i])(t));
                                            break;
                                        case "=":
                                            if (s && !c[i]) return;
                                            a = m(c[i]),
                                                f = a.assign ||
                                                    function () {
                                                        throw u = k[n] = a(t),
                                                            xn("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", c[i], b.name)
                                                    },
                                                u = k[n] = a(t),
                                                k.$watch(function () {
                                                    var r = a(t);
                                                    return r !== k[n] && (r !== u ? u = k[n] = r : f(t, r = u = k[n])),
                                                        r
                                                });
                                            break;
                                        case "&":
                                            a = m(c[i]),
                                                k[n] = function (e) {
                                                    return a(t, e)
                                                };
                                            break;
                                        default:
                                            throw xn("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", b.name, n, e)
                                    }
                                })
                        }
                        A = u && H,
                        y && E(y, function (e) {
                            var n = {
                                    $scope: e === b || e.$$isolateScope ? k : t,
                                    $element: d,
                                    $attrs: c,
                                    $transclude: A
                                },
                                r;
                            C = e.controller,
                            C == "@" && (C = c[e.name]),
                                r = g(C, n),
                                L[e.name] = r,
                            N || d.data("$" + e.name + "Controller", r),
                            e.controllerAs && (n.$scope[e.controllerAs] = r)
                        });
                        for (v = 0, S = a.length; v < S; v++) try {
                            x = a[v],
                                x(x.isolateScope ? k : t, d, c, x.require && at(x.require, d, L), A)
                        } catch (_) {
                            p(_, ht(d))
                        }
                        var D = t;
                        b && (b.template || b.templateUrl === null) && (D = k),
                        e && e(D, s.childNodes, n, u);
                        for (v = l.length - 1; v >= 0; v--) try {
                            x = l[v],
                                x(x.isolateScope ? k : t, d, c, x.require && at(x.require, d, L), A)
                        } catch (_) {
                            p(_, ht(d))
                        }
                    }
                    c = c || {};
                    var d = -Number.MAX_VALUE,
                        v, y = c.controllerDirectives,
                        b = c.newIsolateScopeDirective,
                        w = c.templateDirective,
                        S = c.nonTlbTranscludeDirective,
                        x = !1,
                        N = !1,
                        C = i.$$element = f(r),
                        k, A, O, M = u,
                        _ = s,
                        j, F;
                    for (var W = 0, $ = e.length; W < $; W++) {
                        k = e[W];
                        var Q = k.$$start,
                            Y = k.$$end;
                        Q && (C = U(r, Q, Y)),
                            O = n;
                        if (d > k.priority) break;
                        if (F = k.scope) v = v || k,
                        k.templateUrl || (G("new/isolated scope", b, k, C), H(F) && (b = k));
                        A = k.name,
                        !k.templateUrl && k.controller && (F = k.controller, y = y || {}, G("'" + A + "' controller", y[A], k, C), y[A] = k);
                        if (F = k.transclude) x = !0,
                        k.$$tlb || (G("transclusion", S, k, C), S = k),
                            F == "element" ? (N = !0, d = k.priority, O = U(r, Q, Y), C = i.$$element = f(t.createComment(" " + A + ": " + i[A] + " ")), r = C[0], tt(o, f(ot(O)), r), _ = D(O, s, d, M && M.name, {
                                    nonTlbTranscludeDirective: S
                                })) : (O = f(zt(r)).contents(), C.html(""), _ = D(O, s));
                        if (k.template) {
                            G("template", w, k, C),
                                w = k,
                                F = q(k.template) ? k.template(C, i) : k.template,
                                F = L(F);
                            if (k.replace) {
                                M = k,
                                    O = f("<div>" + V(F) + "</div>").contents(),
                                    r = O[0];
                                if (O.length != 1 || r.nodeType !== 1) throw xn("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", A, "");
                                tt(o, C, r);
                                var Z = {
                                        $attr: {}
                                    },
                                    et = R(r, [], Z),
                                    it = e.splice(W + 1, e.length - (W + 1));
                                b && X(et),
                                    e = e.concat(et).concat(it),
                                    J(i, Z),
                                    $ = e.length
                            } else C.html(F)
                        }
                        if (k.templateUrl) G("template", w, k, C),
                            w = k,
                        k.replace && (M = k),
                            ft = K(e.splice(W, e.length - W), C, i, o, _, a, l, {
                                controllerDirectives: y,
                                newIsolateScopeDirective: b,
                                templateDirective: w,
                                nonTlbTranscludeDirective: S
                            }),
                            $ = e.length;
                        else if (k.compile) try {
                            j = k.compile(C, i, _),
                                q(j) ? ut(null, j, Q, Y) : j && ut(j.pre, j.post, Q, Y)
                        } catch (st) {
                            p(st, ht(C))
                        }
                        k.terminal && (ft.terminal = !0, d = Math.max(d, k.priority))
                    }
                    return ft.scope = v && v.scope === !0,
                        ft.transclude = x && _,
                        ft
                }
                function X(e) {
                    for (var t = 0, n = e.length; t < n; t++) e[t] = A(e[t], {
                        $$isolateScope: !0
                    })
                }
                function $(t, s, o, u, a, f, l) {
                    if (s === a) return null;
                    var c = null;
                    if (r.hasOwnProperty(s)) for (var h, d = e.get(s + i), v = 0, m = d.length; v < m; v++) try {
                        h = d[v],
                        (u === n || u > h.priority) && h.restrict.indexOf(o) != -1 && (f && (h = A(h, {
                            $$start: f,
                            $$end: l
                        })), t.push(h), c = h)
                    } catch (g) {
                        p(g)
                    }
                    return c
                }
                function J(e, t) {
                    var n = t.$attr,
                        r = e.$attr,
                        i = e.$$element;
                    E(e, function (r, i) {
                        i.charAt(0) != "$" && (t[i] && t[i] !== r && (r += (i === "style" ? ";" : " ") + t[i]), e.$set(i, r, !0, n[i]))
                    }),
                        E(t, function (t, s) {
                            s == "class" ? (P(i, t), e["class"] = (e["class"] ? e["class"] + " " : "") + t) : s == "style" ? (i.attr("style", i.attr("style") + ";" + t), e.style = (e.style ? e.style + ";" : "") + t) : s.charAt(0) != "$" && !e.hasOwnProperty(s) && (e[s] = t, r[s] = n[s])
                        })
                }
                function K(e, t, n, r, i, s, o, u) {
                    var a = [],
                        l, c, h = t[0],
                        p = e.shift(),
                        m = k({}, p, {
                            templateUrl: null,
                            transclude: null,
                            replace: null,
                            $$originalDirective: p
                        }),
                        g = q(p.templateUrl) ? p.templateUrl(t, n) : p.templateUrl;
                    return t.html(""),
                        d.get(S.getTrustedResourceUrl(g), {
                            cache: v
                        }).success(function (d) {
                            var v, y, b, w;
                            d = L(d);
                            if (p.replace) {
                                b = f("<div>" + V(d) + "</div>").contents(),
                                    v = b[0];
                                if (b.length != 1 || v.nodeType !== 1) throw xn("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", p.name, g);
                                y = {
                                    $attr: {}
                                },
                                    tt(r, t, v);
                                var S = R(v, [], y);
                                H(p.scope) && X(S),
                                    e = S.concat(e),
                                    J(n, y)
                            } else v = h,
                                t.html(d);
                            e.unshift(m),
                                l = W(e, v, n, i, t, p, s, o, u),
                                E(r, function (e, n) {
                                    e == v && (r[n] = t[0])
                                }),
                                c = j(t[0].childNodes, i);
                            while (a.length) {
                                var x = a.shift(),
                                    T = a.shift(),
                                    N = a.shift(),
                                    C = a.shift(),
                                    k = t[0];
                                T !== h && (k = zt(v), tt(N, f(T), k)),
                                    l.transclude ? w = F(x, l.transclude) : w = C,
                                    l(c, x, k, r, w)
                            }
                            a = null
                        }).error(function (e, t, n, r) {
                            throw xn("tpload", "Failed to load template: {0}", r.url)
                        }),


                        function (t, n, r, i, s) {
                            a ? (a.push(n), a.push(r), a.push(i), a.push(s)) : l(c, n, r, i, s)
                        }
                }
                function Q(e, t) {
                    var n = t.priority - e.priority;
                    return n !== 0 ? n : e.name !== t.name ? e.name < t.name ? -1 : 1 : e.index - t.index
                }
                function G(e, t, n, r) {
                    if (t) throw xn("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", t.name, n.name, e, ht(r))
                }
                function Y(e, t) {
                    var n = h(t, !0);
                    n && e.push({
                        priority: 0,
                        compile: _(function (t, r) {
                            var i = r.parent(),
                                s = i.data("$binding") || [];
                            s.push(n),
                                P(i.data("$binding", s), "ng-binding"),
                                t.$watch(n, function (t) {
                                    r[0].nodeValue = t
                                })
                        })
                    })
                }
                function Z(e, t) {
                    if (t == "srcdoc") return S.HTML;
                    var n = y(e);
                    if (t == "xlinkHref" || n == "FORM" && t == "action" || n != "IMG" && (t == "src" || t == "ngSrc")) return S.RESOURCE_URL
                }
                function et(e, t, n, r) {
                    var i = h(n, !0);
                    if (!i) return;
                    if (r === "multiple" && y(e) === "SELECT") throw xn("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", ht(e));
                    t.push({
                        priority: 100,
                        compile: function () {
                            return {
                                pre: function (n, s, o) {
                                    var u = o.$$observers || (o.$$observers = {});
                                    if (c.test(r)) throw xn("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    i = h(o[r], !0, Z(e, r));
                                    if (!i) return;
                                    o[r] = i(n),
                                        (u[r] || (u[r] = [])).$$inter = !0,
                                        (o.$$observers && o.$$observers[r].$$scope || n).$watch(i, function (t, n) {
                                            r === "class" && t != n ? o.$updateClass(t, n) : o.$set(r, t)
                                        })
                                }
                            }
                        }
                    })
                }
                function tt(e, n, r) {
                    var i = n[0],
                        s = n.length,
                        o = i.parentNode,
                        u, a;
                    if (e) for (u = 0, a = e.length; u < a; u++) if (e[u] == i) {
                        e[u++] = r;
                        for (var l = u, c = l + s - 1, h = e.length; l < h; l++, c++) c < h ? e[l] = e[c] : delete e[l];
                        e.length -= s - 1;
                        break
                    }
                    o && o.replaceChild(r, i);
                    var p = t.createDocumentFragment();
                    p.appendChild(i),
                        r[f.expando] = i[f.expando];
                    for (var d = 1, v = n.length; d < v; d++) {
                        var m = n[d];
                        f(m).remove(),
                            p.appendChild(m),
                            delete n[d]
                    }
                    n[0] = r,
                        n.length = 1
                }
                function rt(e, t) {
                    return k(function () {
                        return e.apply(null, arguments)
                    }, e, t)
                }
                var T = function (e, t) {
                    this.$$element = e,
                        this.$attr = t || {}
                };
                T.prototype = {
                    $normalize: Cn,
                    $addClass: function (e) {
                        e && e.length > 0 && x.addClass(this.$$element, e)
                    },
                    $removeClass: function (e) {
                        e && e.length > 0 && x.removeClass(this.$$element, e)
                    },
                    $updateClass: function (e, t) {
                        this.$removeClass(An(t, e)),
                            this.$addClass(An(e, t))
                    },
                    $set: function (e, t, r, i) {
                        var s = sn(this.$$element[0], e),
                            o, f;
                        s && (this.$$element.prop(e, t), i = s),
                            this[e] = t,
                            i ? this.$attr[e] = i : (i = this.$attr[e], i || (this.$attr[e] = i = Et(e, "-"))),
                            f = y(this.$$element);
                        if (f === "A" && e === "href" || f === "IMG" && e === "src") if (!a || a >= 8) o = jr(t).href,
                        o !== "" && (e === "href" && !o.match(u) || e === "src" && !o.match(l)) && (this[e] = t = "unsafe:" + o);
                        r !== !1 && (t === null || t === n ? this.$$element.removeAttr(i) : this.$$element.attr(i, t));
                        var c = this.$$observers;
                        c && E(c[e], function (e) {
                            try {
                                e(t)
                            } catch (n) {
                                p(n)
                            }
                        })
                    },
                    $observe: function (e, t) {
                        var n = this,
                            r = n.$$observers || (n.$$observers = {}),
                            i = r[e] || (r[e] = []);
                        return i.push(t),
                            b.$evalAsync(function () {
                                i.$$inter || t(n[e])
                            }),
                            t
                    }
                };
                var N = h.startSymbol(),
                    C = h.endSymbol(),
                    L = N == "{{" || C == "}}" ? M : function (t) {
                            return t.replace(/\{\{/g, N).replace(/}}/g, C)
                        },
                    O = /^ngAttr[A-Z]/;
                return D
            }]
    }
    function Cn(e) {
        return qt(e.replace(Nn, ""))
    }
    function kn(e, t, n, r) {}
    function Ln(e, t, n, r, i) {}
    function An(e, t) {
        var n = "",
            r = e.split(/\s+/),
            i = t.split(/\s+/);
        e: for (var s = 0; s < r.length; s++) {
            var o = r[s];
            for (var u = 0; u < i.length; u++) if (o == i[u]) continue e;
            n += (n.length > 0 ? " " : "") + o
        }
        return n
    }
    function On() {
        var e = {},
            t = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function (t, n) {
            Nt(t, "controller"),
                H(t) ? k(e, t) : e[t] = n
        },
            this.$get = ["$injector", "$window", function (n, i) {
                return function (s, o) {
                    var u, a, f, l;
                    B(s) && (a = s.match(t), f = a[1], l = a[3], s = e.hasOwnProperty(f) ? e[f] : Ct(o.$scope, f, !0) || Ct(i, f, !0), Tt(s, f, !0)),
                        u = n.instantiate(s, o);
                    if (l) {
                        if (!o || typeof o.$scope != "object") throw r("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", f || s.name, l);
                        o.$scope[l] = u
                    }
                    return u
                }
            }]
    }
    function Mn() {
        this.$get = ["$window", function (e) {
            return f(e.document)
        }]
    }
    function _n() {
        this.$get = ["$log", function (e) {
            return function (t, n) {
                e.error.apply(e, arguments)
            }
        }]
    }
    function Dn(e) {
        var t = {},
            n, r, s;
        return e ? (E(e.split("\n"), function (e) {
                s = e.indexOf(":"),
                    n = i(V(e.substr(0, s))),
                    r = V(e.substr(s + 1)),
                n && (t[n] ? t[n] += ", " + r : t[n] = r)
            }), t) : t
    }
    function Pn(e) {
        var t = H(e) ? e : n;
        return function (n) {
            return t || (t = Dn(e)),
                n ? t[i(n)] || null : t
        }
    }
    function Hn(e, t, n) {
        return q(n) ? n(e, t) : (E(n, function (n) {
                e = n(e, t)
            }), e)
    }
    function Bn(e) {
        return 200 <= e && e < 300
    }
    function jn() {
        var e = /^\s*(\[|\{[^\{])/,
            t = /[\}\]]\s*$/,
            r = /^\)\]\}',?\n/,
            o = {
                "Content-Type": "application/json;charset=utf-8"
            },
            u = this.defaults = {
                transformResponse: [function (n) {
                    return B(n) && (n = n.replace(r, ""), e.test(n) && t.test(n) && (n = lt(n))),
                        n
                }],
                transformRequest: [function (e) {
                    return H(e) && !W(e) ? ft(e) : e
                }],
                headers: {
                    common: {
                        Accept: "application/json, text/plain, */*"
                    },
                    post: o,
                    put: o,
                    patch: o
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN"
            },
            a = this.interceptors = [],
            f = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (e, t, r, o, l, c) {
            function d(e) {
                function m(e) {
                    var t = k({}, e, {
                        data: Hn(e.data, e.headers, r.transformResponse)
                    });
                    return Bn(e.status) ? t : l.reject(t)
                }
                function y(e) {
                    function a(e) {
                        var t;
                        E(e, function (n, r) {
                            q(n) && (t = n(), t != null ? e[r] = t : delete e[r])
                        })
                    }
                    var t = u.headers,
                        n = k({}, e.headers),
                        r, s, o;
                    t = k({}, t.common, t[i(e.method)]),
                        a(t),
                        a(n);
                    e: for (r in t) {
                        s = i(r);
                        for (o in n) if (i(o) === s) continue e;
                        n[r] = t[r]
                    }
                    return n
                }
                var r = {
                        transformRequest: u.transformRequest,
                        transformResponse: u.transformResponse
                    },
                    o = y(e);
                k(r, e),
                    r.headers = o,
                    r.method = s(r.method);
                var a = Fr(r.url) ? t.cookies()[r.xsrfCookieName || u.xsrfCookieName] : n;
                a && (o[r.xsrfHeaderName || u.xsrfHeaderName] = a);
                var f = function (e) {
                        o = e.headers;
                        var t = Hn(e.data, Pn(o), e.transformRequest);
                        return D(e.data) && E(o, function (e, t) {
                            i(t) === "content-type" && delete o[t]
                        }),
                        D(e.withCredentials) && !D(u.withCredentials) && (e.withCredentials = u.withCredentials),
                            g(e, t, o).then(m, m)
                    },
                    c = [f, n],
                    h = l.when(r);
                E(p, function (e) {
                    (e.request || e.requestError) && c.unshift(e.request, e.requestError),
                    (e.response || e.responseError) && c.push(e.response, e.responseError)
                });
                while (c.length) {
                    var d = c.shift(),
                        v = c.shift();
                    h = h.then(d, v)
                }
                return h.success = function (e) {
                    return h.then(function (t) {
                        e(t.data, t.status, t.headers, r)
                    }),
                        h
                },
                    h.error = function (e) {
                        return h.then(null, function (t) {
                            e(t.data, t.status, t.headers, r)
                        }),
                            h
                    },
                    h
            }
            function v(e) {
                E(arguments, function (e) {
                    d[e] = function (t, n) {
                        return d(k(n || {}, {
                            method: e,
                            url: t
                        }))
                    }
                })
            }
            function m(e) {
                E(arguments, function (e) {
                    d[e] = function (t, n, r) {
                        return d(k(r || {}, {
                            method: e,
                            url: t,
                            data: n
                        }))
                    }
                })
            }
            function g(t, n, r) {
                function p(e, t, n) {
                    a && (Bn(e) ? a.put(c, [e, t, Dn(n)]) : a.remove(c)),
                        v(t, e, n),
                    o.$$phase || o.$apply()
                }
                function v(e, n, r) {
                    n = Math.max(n, 0),
                        (Bn(n) ? i.resolve : i.reject)({
                            data: e,
                            status: n,
                            headers: Pn(r),
                            config: t
                        })
                }
                function m() {
                    var e = Y(d.pendingRequests, t);
                    e !== -1 && d.pendingRequests.splice(e, 1)
                }
                var i = l.defer(),
                    s = i.promise,
                    a, f, c = y(t.url, t.params);
                d.pendingRequests.push(t),
                    s.then(m, m),
                (t.cache || u.cache) && t.cache !== !1 && t.method == "GET" && (a = H(t.cache) ? t.cache : H(u.cache) ? u.cache : h);
                if (a) {
                    f = a.get(c);
                    if (P(f)) {
                        if (f.then) return f.then(m, m),
                            f;
                        I(f) ? v(f[1], f[0], tt(f[2])) : v(f, 200, {})
                    } else a.put(c, s)
                }
                return D(f) && e(t.method, c, n, p, r, t.timeout, t.withCredentials, t.responseType),
                    s
            }
            function y(e, t) {
                if (!t) return e;
                var n = [];
                return x(t, function (e, t) {
                    if (e === null || D(e)) return;
                    I(e) || (e = [e]),
                        E(e, function (e) {
                            H(e) && (e = ft(e)),
                                n.push(gt(t) + "=" + gt(e))
                        })
                }),
                e + (e.indexOf("?") == -1 ? "?" : "&") + n.join("&")
            }
            var h = r("$http"),
                p = [];
            return E(a, function (e) {
                p.unshift(B(e) ? c.get(e) : c.invoke(e))
            }),
                E(f, function (e, t) {
                    var n = B(e) ? c.get(e) : c.invoke(e);
                    p.splice(t, 0, {
                        response: function (e) {
                            return n(l.when(e))
                        },
                        responseError: function (e) {
                            return n(l.reject(e))
                        }
                    })
                }),
                d.pendingRequests = [],
                v("get", "delete", "head", "jsonp"),
                m("post", "put"),
                d.defaults = u,
                d
        }]
    }
    function In() {
        this.$get = ["$browser", "$window", "$document", function (e, t, n) {
            return qn(e, Fn, e.defer, t.angular.callbacks, n[0], t.location.protocol.replace(":", ""))
        }]
    }
    function qn(e, t, n, r, s, o) {
        function f(e, t) {
            var n = s.createElement("script"),
                r = function () {
                    n.onreadystatechange = n.onload = n.onerror = null,
                        s.body.removeChild(n),
                    t && t()
                };
            return n.type = "text/javascript",
                n.src = e,
                a && a <= 8 ? n.onreadystatechange = function () {
                        /loaded|complete/.test(n.readyState) && r()
                    } : n.onload = n.onerror = function () {
                        r()
                    },
                s.body.appendChild(n),
                r
        }
        var u = -1;
        return function (s, a, l, c, h, p, d, v) {
            function S() {
                m = u,
                y && y(),
                b && b.abort()
            }
            function x(t, r, i, s) {
                var u = o || jr(a).protocol;
                w && n.cancel(w),
                    y = b = null,
                    r = u == "file" ? i ? 200 : 404 : r,
                    r = r == 1223 ? 204 : r,
                    t(r, i, s),
                    e.$$completeOutstandingRequest(O)
            }
            var m;
            e.$$incOutstandingRequestCount(),
                a = a || e.url();
            if (i(s) == "jsonp") {
                var g = "_" + (r.counter++).toString(36);
                r[g] = function (e) {
                    r[g].data = e
                };
                var y = f(a.replace("JSON_CALLBACK", "angular.callbacks." + g), function () {
                    r[g].data ? x(c, 200, r[g].data) : x(c, m || -2),
                        delete r[g]
                })
            } else {
                var b = new t;
                b.open(s, a, !0),
                    E(h, function (e, t) {
                        P(e) && b.setRequestHeader(t, e)
                    }),
                    b.onreadystatechange = function () {
                        if (b.readyState == 4) {
                            var e = null,
                                t = null;
                            m !== u && (e = b.getAllResponseHeaders(), t = b.responseType ? b.response : b.responseText),
                                x(c, m || b.status, t, e)
                        }
                    },
                d && (b.withCredentials = !0),
                v && (b.responseType = v),
                    b.send(l || null)
            }
            if (p > 0) var w = n(S, p);
            else p && p.then && p.then(S)
        }
    }
    function Un() {
        var e = "{{",
            t = "}}";
        this.startSymbol = function (t) {
            return t ? (e = t, this) : e
        },
            this.endSymbol = function (e) {
                return e ? (t = e, this) : t
            },
            this.$get = ["$parse", "$exceptionHandler", "$sce", function (n, r, i) {
                function u(u, a, f) {
                    var l, c, h = 0,
                        p = [],
                        d = u.length,
                        v = !1,
                        m, g, y = [];
                    while (h < d)(l = u.indexOf(e, h)) != -1 && (c = u.indexOf(t, l + s)) != -1 ? (h != l && p.push(u.substring(h, l)), p.push(m = n(g = u.substring(l + s, c))), m.exp = g, h = c + o, v = !0) : (h != d && p.push(u.substring(h)), h = d);
                    (d = p.length) || (p.push(""), d = 1);
                    if (f && p.length > 1) throw Rn("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", u);
                    if (!a || v) return y.length = d,
                        m = function (e) {
                            try {
                                for (var t = 0, n = d, s; t < n; t++) typeof(s = p[t]) == "function" && (s = s(e), f ? s = i.getTrusted(f, s) : s = i.valueOf(s), s === null || D(s) ? s = "" : typeof s != "string" && (s = ft(s))),
                                    y[t] = s;
                                return y.join("")
                            } catch (o) {
                                var a = Rn("interr", "Can't interpolate: {0}\n{1}", u, o.toString());
                                r(a)
                            }
                        },
                        m.exp = u,
                        m.parts = p,
                        m
                }
                var s = e.length,
                    o = t.length;
                return u.startSymbol = function () {
                    return e
                },
                    u.endSymbol = function () {
                        return t
                    },
                    u
            }]
    }
    function zn() {
        this.$get = ["$rootScope", "$window", "$q", function (e, t, n) {
            function i(i, s, o, u) {
                var a = t.setInterval,
                    f = t.clearInterval,
                    l = n.defer(),
                    c = l.promise,
                    h = 0,
                    p = P(u) && !u;
                return o = P(o) ? o : 0,
                    c.then(null, null, i),
                    c.$$intervalId = a(function () {
                        l.notify(h++),
                        o > 0 && h >= o && (l.resolve(h), f(c.$$intervalId), delete r[c.$$intervalId]),
                        p || e.$apply()
                    }, s),
                    r[c.$$intervalId] = l,
                    c
            }
            var r = {};
            return i.cancel = function (e) {
                return e && e.$$intervalId in r ? (r[e.$$intervalId].reject("canceled"), clearInterval(e.$$intervalId), delete r[e.$$intervalId], !0) : !1
            },
                i
        }]
    }
    function Wn() {
        this.$get = function () {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    },
                        {
                            minInt: 1,
                            minFrac: 2,
                            maxFrac: 2,
                            posPre: "¤",
                            posSuf: "",
                            negPre: "(¤",
                            negSuf: ")",
                            gSize: 3,
                            lgSize: 3
                        }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function (e) {
                    return e === 1 ? "one" : "other"
                }
            }
        }
    }
    function Jn(e) {
        var t = e.split("/"),
            n = t.length;
        while (n--) t[n] = mt(t[n]);
        return t.join("/")
    }
    function Kn(e, t, n) {
        var r = jr(e, n);
        t.$$protocol = r.protocol,
            t.$$host = r.hostname,
            t.$$port = L(r.port) || Vn[r.protocol] || null
    }
    function Qn(e, t, n) {
        var r = e.charAt(0) !== "/";
        r && (e = "/" + e);
        var i = jr(e, n);
        t.$$path = decodeURIComponent(r && i.pathname.charAt(0) === "/" ? i.pathname.substring(1) : i.pathname),
            t.$$search = dt(i.search),
            t.$$hash = decodeURIComponent(i.hash),
        t.$$path && t.$$path.charAt(0) != "/" && (t.$$path = "/" + t.$$path)
    }
    function Gn(e, t) {
        if (t.indexOf(e) === 0) return t.substr(e.length)
    }
    function Yn(e) {
        var t = e.indexOf("#");
        return t == -1 ? e : e.substr(0, t)
    }
    function Zn(e) {
        return e.substr(0, Yn(e).lastIndexOf("/") + 1)
    }
    function er(e) {
        return e.substring(0, e.indexOf("/", e.indexOf("//") + 2))
    }
    function tr(e, t) {
        this.$$html5 = !0,
            t = t || "";
        var r = Zn(e);
        Kn(e, this, e),
            this.$$parse = function (t) {
                var n = Gn(r, t);
                if (!B(n)) throw $n("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, r);
                Qn(n, this, e),
                this.$$path || (this.$$path = "/"),
                    this.$$compose()
            },
            this.$$compose = function () {
                var e = vt(this.$$search),
                    t = this.$$hash ? "#" + mt(this.$$hash) : "";
                this.$$url = Jn(this.$$path) + (e ? "?" + e : "") + t,
                    this.$$absUrl = r + this.$$url.substr(1)
            },
            this.$$rewrite = function (i) {
                var s, o;
                if ((s = Gn(e, i)) !== n) return o = s,
                    (s = Gn(t, s)) !== n ? r + (Gn("/", s) || s) : e + o;
                if ((s = Gn(r, i)) !== n) return r + s;
                if (r == i + "/") return r
            }
    }
    function nr(e, t) {
        var n = Zn(e);
        Kn(e, this, e),
            this.$$parse = function (r) {
                var i = Gn(e, r) || Gn(n, r),
                    s = i.charAt(0) == "#" ? Gn(t, i) : this.$$html5 ? i : "";
                if (!B(s)) throw $n("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', r, t);
                Qn(s, this, e),
                    this.$$compose()
            },
            this.$$compose = function () {
                var n = vt(this.$$search),
                    r = this.$$hash ? "#" + mt(this.$$hash) : "";
                this.$$url = Jn(this.$$path) + (n ? "?" + n : "") + r,
                    this.$$absUrl = e + (this.$$url ? t + this.$$url : "")
            },
            this.$$rewrite = function (t) {
                if (Yn(e) == Yn(t)) return t
            }
    }
    function rr(e, t) {
        this.$$html5 = !0,
            nr.apply(this, arguments);
        var n = Zn(e);
        this.$$rewrite = function (r) {
            var i;
            if (e == Yn(r)) return r;
            if (i = Gn(n, r)) return e + t + i;
            if (n === r + "/") return n
        }
    }
    function ir(e) {
        return function () {
            return this[e]
        }
    }
    function sr(e, t) {
        return function (n) {
            return D(n) ? this[e] : (this[e] = t(n), this.$$compose(), this)
        }
    }
    function or() {
        var t = "",
            n = !1;
        this.hashPrefix = function (e) {
            return P(e) ? (t = e, this) : t
        },
            this.html5Mode = function (e) {
                return P(e) ? (n = e, this) : n
            },
            this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (r, s, o, u) {
                function v(e) {
                    r.$broadcast("$locationChangeSuccess", a.absUrl(), e)
                }
                var a, l, c = s.baseHref(),
                    h = s.url(),
                    p;
                n ? (p = er(h) + (c || "/"), l = o.history ? tr : rr) : (p = Yn(h), l = nr),
                    a = new l(p, "#" + t),
                    a.$$parse(a.$$rewrite(h)),
                    u.on("click", function (t) {
                        if (t.ctrlKey || t.metaKey || t.which == 2) return;
                        var n = f(t.target);
                        while (i(n[0].nodeName) !== "a") if (n[0] === u[0] || !(n = n.parent())[0]) return;
                        var o = n.prop("href"),
                            l = a.$$rewrite(o);
                        o && !n.attr("target") && l && !t.isDefaultPrevented() && (t.preventDefault(), l != s.url() && (a.$$parse(l), r.$apply(), e.angular["ff-684208-preventDefault"] = !0))
                    }),
                a.absUrl() != h && s.url(a.absUrl(), !0),
                    s.onUrlChange(function (e) {
                        if (a.absUrl() != e) {
                            if (r.$broadcast("$locationChangeStart", e, a.absUrl()).defaultPrevented) {
                                s.url(a.absUrl());
                                return
                            }
                            r.$evalAsync(function () {
                                var t = a.absUrl();
                                a.$$parse(e),
                                    v(t)
                            }),
                            r.$$phase || r.$digest()
                        }
                    });
                var d = 0;
                return r.$watch(function () {
                    var t = s.url(),
                        n = a.$$replace;
                    if (!d || t != a.absUrl()) d++,
                        r.$evalAsync(function () {
                            r.$broadcast("$locationChangeStart", a.absUrl(), t).defaultPrevented ? a.$$parse(t) : (s.url(a.absUrl(), n), v(t))
                        });
                    return a.$$replace = !1,
                        d
                }),
                    a
            }]
    }
    function ur() {
        var e = !0,
            t = this;
        this.debugEnabled = function (t) {
            return P(t) ? (e = t, this) : e
        },
            this.$get = ["$window", function (n) {
                function r(e) {
                    return e instanceof Error && (e.stack ? e = e.message && e.stack.indexOf(e.message) === -1 ? "Error: " + e.message + "\n" + e.stack : e.stack : e.sourceURL && (e = e.message + "\n" + e.sourceURL + ":" + e.line)),
                        e
                }
                function i(e) {
                    var t = n.console || {},
                        i = t[e] || t.log || O;
                    return i.apply ?
                        function () {
                            var e = [];
                            return E(arguments, function (t) {
                                e.push(r(t))
                            }),
                                i.apply(t, e)
                        } : function (e, t) {
                            i(e, t == null ? "" : t)
                        }
                }
                return {
                    log: i("log"),
                    info: i("info"),
                    warn: i("warn"),
                    error: i("error"),
                    debug: function () {
                        var n = i("debug");
                        return function () {
                            e && n.apply(t, arguments)
                        }
                    }()
                }
            }]
    }
    function cr(e, t) {
        if (e === "constructor") throw ar("isecfld", 'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}', t);
        return e
    }
    function hr(e, t) {
        if (e && e.constructor === e) throw ar("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", t);
        if (e && e.document && e.location && e.alert && e.setInterval) throw ar("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", t);
        if (e && (e.nodeName || e.on && e.find)) throw ar("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", t);
        return e
    }
    function gr(e, t, r, i, s) {
        s = s || {};
        var o = t.split("."),
            u;
        for (var a = 0; o.length > 1; a++) {
            u = cr(o.shift(), i);
            var f = e[u];
            f || (f = {}, e[u] = f),
                e = f,
            e.then && s.unwrapPromises && (lr(i), "$$v" in e ||
            function (e) {
                e.then(function (t) {
                    e.$$v = t
                })
            }(e), e.$$v === n && (e.$$v = {}), e = e.$$v)
        }
        return u = cr(o.shift(), i),
            e[u] = r,
            r
    }
    function br(e, t, r, i, s, o, u) {
        return cr(e, o),
            cr(t, o),
            cr(r, o),
            cr(i, o),
            cr(s, o),
            u.unwrapPromises ?
                function (a, f) {
                    var l = f && f.hasOwnProperty(e) ? f : a,
                        c;
                    return l === null || l === n ? l : (l = l[e], l && l.then && (lr(o), "$$v" in l || (c = l, c.$$v = n, c.then(function (e) {
                            c.$$v = e
                        })), l = l.$$v), !t || l === null || l === n ? l : (l = l[t], l && l.then && (lr(o), "$$v" in l || (c = l, c.$$v = n, c.then(function (e) {
                                c.$$v = e
                            })), l = l.$$v), !r || l === null || l === n ? l : (l = l[r], l && l.then && (lr(o), "$$v" in l || (c = l, c.$$v = n, c.then(function (e) {
                                    c.$$v = e
                                })), l = l.$$v), !i || l === null || l === n ? l : (l = l[i], l && l.then && (lr(o), "$$v" in l || (c = l, c.$$v = n, c.then(function (e) {
                                        c.$$v = e
                                    })), l = l.$$v), !s || l === null || l === n ? l : (l = l[s], l && l.then && (lr(o), "$$v" in l || (c = l, c.$$v = n, c.then(function (e) {
                                            c.$$v = e
                                        })), l = l.$$v), l)))))
                } : function (u, a) {
                    var f = a && a.hasOwnProperty(e) ? a : u;
                    return f === null || f === n ? f : (f = f[e], !t || f === null || f === n ? f : (f = f[t], !r || f === null || f === n ? f : (f = f[r], !i || f === null || f === n ? f : (f = f[i], !s || f === null || f === n ? f : (f = f[s], f)))))
                }
    }
    function wr(e, t, r) {
        if (yr.hasOwnProperty(e)) return yr[e];
        var i = e.split("."),
            s = i.length,
            o;
        if (t.csp) s < 6 ? o = br(i[0], i[1], i[2], i[3], i[4], r, t) : o = function (e, o) {
                var u = 0,
                    a;
                do a = br(i[u++], i[u++], i[u++], i[u++], i[u++], r, t)(e, o),
                    o = n,
                    e = a;
                while (u < s);
                return a
            };
        else {
            var u = "var l, fn, p;\n";
            E(i, function (e, n) {
                cr(e, r),
                    u += "if(s === null || s === undefined) return s;\nl=s;\ns=" + (n ? "s" : '((k&&k.hasOwnProperty("' + e + '"))?k:s)') + '["' + e + '"]' + ";\n" + (t.unwrapPromises ? 'if (s && s.then) {\n pw("' + r.replace(/(["\r\n])/g, "\\$1") + '");\n' + ' if (!("$$v" in s)) {\n' + " p=s;\n" + " p.$$v = undefined;\n" + " p.then(function(v) {p.$$v=v;});\n" + "}\n" + " s=s.$$v\n" + "}\n" : "")
            }),
                u += "return s;";
            var a = new Function("s", "k", "pw", u);
            a.toString = function () {
                return u
            },
                o = function (e, t) {
                    return a(e, t, lr)
                }
        }
        return e !== "hasOwnProperty" && (yr[e] = o),
            o
    }
    function Er() {
        var e = {},
            t = {
                csp: !1,
                unwrapPromises: !1,
                logPromiseWarnings: !0
            };
        this.unwrapPromises = function (e) {
            return P(e) ? (t.unwrapPromises = !! e, this) : t.unwrapPromises
        },
            this.logPromiseWarnings = function (e) {
                return P(e) ? (t.logPromiseWarnings = e, this) : t.logPromiseWarnings
            },
            this.$get = ["$filter", "$sniffer", "$log", function (n, r, i) {
                return t.csp = r.csp,
                    lr = function (n) {
                        if (!t.logPromiseWarnings || fr.hasOwnProperty(n)) return;
                        fr[n] = !0,
                            i.warn("[$parse] Promise found in the expression `" + n + "`. " + "Automatic unwrapping of promises in Angular expressions is deprecated.")
                    },


                    function (r) {
                        var i;
                        switch (typeof r) {
                            case "string":
                                if (e.hasOwnProperty(r)) return e[r];
                                var s = new vr(t),
                                    o = new mr(s, n, t);
                                return i = o.parse(r, !1),
                                r !== "hasOwnProperty" && (e[r] = i),
                                    i;
                            case "function":
                                return r;
                            default:
                                return O
                        }
                    }
            }]
    }
    function Sr() {
        this.$get = ["$rootScope", "$exceptionHandler", function (e, t) {
            return xr(function (t) {
                e.$evalAsync(t)
            }, t)
        }]
    }
    function xr(e, t) {
        function u(e) {
            return e
        }
        function a(e) {
            return s(e)
        }
        function f(e) {
            var t = r(),
                n = 0,
                s = I(e) ? [] : {};
            return E(e, function (e, r) {
                n++,
                    i(e).then(function (e) {
                        if (s.hasOwnProperty(r)) return;
                        s[r] = e,
                        --n || t.resolve(s)
                    }, function (e) {
                        if (s.hasOwnProperty(r)) return;
                        t.reject(e)
                    })
            }),
            n === 0 && t.resolve(s),
                t.promise
        }
        var r = function () {
                var o = [],
                    f, l;
                return l = {
                    resolve: function (t) {
                        if (o) {
                            var r = o;
                            o = n,
                                f = i(t),
                            r.length && e(function () {
                                var e;
                                for (var t = 0, n = r.length; t < n; t++) e = r[t],
                                    f.then(e[0], e[1], e[2])
                            })
                        }
                    },
                    reject: function (e) {
                        l.resolve(s(e))
                    },
                    notify: function (t) {
                        if (o) {
                            var n = o;
                            o.length && e(function () {
                                var e;
                                for (var r = 0, i = n.length; r < i; r++) e = n[r],
                                    e[2](t)
                            })
                        }
                    },
                    promise: {
                        then: function (e, n, i) {
                            var s = r(),
                                l = function (n) {
                                    try {
                                        s.resolve((q(e) ? e : u)(n))
                                    } catch (r) {
                                        s.reject(r),
                                            t(r)
                                    }
                                },
                                c = function (e) {
                                    try {
                                        s.resolve((q(n) ? n : a)(e))
                                    } catch (r) {
                                        s.reject(r),
                                            t(r)
                                    }
                                },
                                h = function (e) {
                                    try {
                                        s.notify((q(i) ? i : u)(e))
                                    } catch (n) {
                                        t(n)
                                    }
                                };
                            return o ? o.push([l, c, h]) : f.then(l, c, h),
                                s.promise
                        },
                        "catch": function (e) {
                            return this.then(null, e)
                        },
                        "finally": function (e) {
                            function t(e, t) {
                                var n = r();
                                return t ? n.resolve(e) : n.reject(e),
                                    n.promise
                            }
                            function n(n, r) {
                                var i = null;
                                try {
                                    i = (e || u)()
                                } catch (s) {
                                    return t(s, !1)
                                }
                                return i && q(i.then) ? i.then(function () {
                                        return t(n, r)
                                    }, function (e) {
                                        return t(e, !1)
                                    }) : t(n, r)
                            }
                            return this.then(function (e) {
                                return n(e, !0)
                            }, function (e) {
                                return n(e, !1)
                            })
                        }
                    }
                },
                    l
            },
            i = function (t) {
                return t && q(t.then) ? t : {
                        then: function (n) {
                            var i = r();
                            return e(function () {
                                i.resolve(n(t))
                            }),
                                i.promise
                        }
                    }
            },
            s = function (n) {
                return {
                    then: function (i, s) {
                        var o = r();
                        return e(function () {
                            try {
                                o.resolve((q(s) ? s : a)(n))
                            } catch (e) {
                                o.reject(e),
                                    t(e)
                            }
                        }),
                            o.promise
                    }
                }
            },
            o = function (n, o, f, l) {
                var c = r(),
                    h, p = function (e) {
                        try {
                            return (q(o) ? o : u)(e)
                        } catch (n) {
                            return t(n),
                                s(n)
                        }
                    },
                    d = function (e) {
                        try {
                            return (q(f) ? f : a)(e)
                        } catch (n) {
                            return t(n),
                                s(n)
                        }
                    },
                    v = function (e) {
                        try {
                            return (q(l) ? l : u)(e)
                        } catch (n) {
                            t(n)
                        }
                    };
                return e(function () {
                    i(n).then(function (e) {
                        if (h) return;
                        h = !0,
                            c.resolve(i(e).then(p, d, v))
                    }, function (e) {
                        if (h) return;
                        h = !0,
                            c.resolve(d(e))
                    }, function (e) {
                        if (h) return;
                        c.notify(v(e))
                    })
                }),
                    c.promise
            };
        return {
            defer: r,
            reject: s,
            when: o,
            all: f
        }
    }
    function Tr() {
        var e = 10,
            t = r("$rootScope");
        this.digestTtl = function (t) {
            return arguments.length && (e = t),
                e
        },
            this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function (n, r, i, s) {
                function o() {
                    this.$id = N(),
                        this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null,
                        this["this"] = this.$root = this,
                        this.$$destroyed = !1,
                        this.$$asyncQueue = [],
                        this.$$postDigestQueue = [],
                        this.$$listeners = {},
                        this.$$isolateBindings = {}
                }
                function a(e) {
                    if (u.$$phase) throw t("inprog", "{0} already in progress", u.$$phase);
                    u.$$phase = e
                }
                function f() {
                    u.$$phase = null
                }
                function l(e, t) {
                    var n = i(e);
                    return Tt(n, t),
                        n
                }
                function c() {}
                o.prototype = {
                    constructor: o,
                    $new: function (e) {
                        var t, n;
                        return e ? (n = new o, n.$root = this.$root, n.$$asyncQueue = this.$$asyncQueue, n.$$postDigestQueue = this.$$postDigestQueue) : (t = function () {}, t.prototype = this, n = new t, n.$id = N()),
                            n["this"] = n,
                            n.$$listeners = {},
                            n.$parent = this,
                            n.$$watchers = n.$$nextSibling = n.$$childHead = n.$$childTail = null,
                            n.$$prevSibling = this.$$childTail,
                            this.$$childHead ? (this.$$childTail.$$nextSibling = n, this.$$childTail = n) : this.$$childHead = this.$$childTail = n,
                            n
                    },
                    $watch: function (e, t, n) {
                        var r = this,
                            i = l(e, "watch"),
                            s = r.$$watchers,
                            o = {
                                fn: t,
                                last: c,
                                get: i,
                                exp: e,
                                eq: !! n
                            };
                        if (!q(t)) {
                            var u = l(t || O, "listener");
                            o.fn = function (e, t, n) {
                                u(n)
                            }
                        }
                        if (typeof e == "string" && i.constant) {
                            var a = o.fn;
                            o.fn = function (e, t, n) {
                                a.call(this, e, t, n),
                                    Z(s, o)
                            }
                        }
                        return s || (s = r.$$watchers = []),
                            s.unshift(o),


                            function () {
                                Z(s, o)
                            }
                    },
                    $watchCollection: function (e, t) {
                        function c() {
                            s = u(n);
                            var e, t;
                            if (!H(s)) r !== s && (r = s, o++);
                            else if (w(s)) {
                                r !== a && (r = a, l = r.length = 0, o++),
                                    e = s.length,
                                l !== e && (o++, r.length = l = e);
                                for (var i = 0; i < e; i++) r[i] !== s[i] && (o++, r[i] = s[i])
                            } else {
                                r !== f && (r = f = {}, l = 0, o++),
                                    e = 0;
                                for (t in s) s.hasOwnProperty(t) && (e++, r.hasOwnProperty(t) ? r[t] !== s[t] && (o++, r[t] = s[t]) : (l++, r[t] = s[t], o++));
                                if (l > e) {
                                    o++;
                                    for (t in r) r.hasOwnProperty(t) && !s.hasOwnProperty(t) && (l--, delete r[t])
                                }
                            }
                            return o
                        }
                        function h() {
                            t(s, r, n)
                        }
                        var n = this,
                            r, s, o = 0,
                            u = i(e),
                            a = [],
                            f = {},
                            l = 0;
                        return this.$watch(c, h)
                    },
                    $digest: function () {
                        var n, i, s, o, u = this.$$asyncQueue,
                            l = this.$$postDigestQueue,
                            h, p, d = e,
                            v, m, g = this,
                            y = [],
                            b, w, E;
                        a("$digest");
                        do {
                            p = !1, m = g;
                            while (u.length) try {
                                E = u.shift(),
                                    E.scope.$eval(E.expression)
                            } catch (S) {
                                r(S)
                            }
                            do {
                                if (o = m.$$watchers) {
                                    h = o.length;
                                    while (h--) try {
                                        n = o[h],
                                        n && (i = n.get(m)) !== (s = n.last) && !(n.eq ? rt(i, s) : typeof i == "number" && typeof s == "number" && isNaN(i) && isNaN(s)) && (p = !0, n.last = n.eq ? tt(i) : i, n.fn(i, s === c ? i : s, m), d < 5 && (b = 4 - d, y[b] || (y[b] = []), w = q(n.exp) ? "fn: " + (n.exp.name || n.exp.toString()) : n.exp, w += "; newVal: " + ft(i) + "; oldVal: " + ft(s), y[b].push(w)))
                                    } catch (S) {
                                        r(S)
                                    }
                                }
                                if (!(v = m.$$childHead || m !== g && m.$$nextSibling)) while (m !== g && !(v = m.$$nextSibling)) m = m.$parent
                            } while (m = v);
                            if (p && !(d--)) throw f(), t("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", e, ft(y))
                        } while (p || u.length);
                        f();
                        while (l.length) try {
                            l.shift()()
                        } catch (S) {
                            r(S)
                        }
                    },
                    $destroy: function () {
                        if (u == this || this.$$destroyed) return;
                        var e = this.$parent;
                        this.$broadcast("$destroy"),
                            this.$$destroyed = !0,
                        e.$$childHead == this && (e.$$childHead = this.$$nextSibling),
                        e.$$childTail == this && (e.$$childTail = this.$$prevSibling),
                        this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling),
                        this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling),
                            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null
                    },
                    $eval: function (e, t) {
                        return i(e)(this, t)
                    },
                    $evalAsync: function (e) {
                        !u.$$phase && !u.$$asyncQueue.length && s.defer(function () {
                            u.$$asyncQueue.length && u.$digest()
                        }),
                            this.$$asyncQueue.push({
                                scope: this,
                                expression: e
                            })
                    },
                    $$postDigest: function (e) {
                        this.$$postDigestQueue.push(e)
                    },
                    $apply: function (e) {
                        try {
                            return a("$apply"),
                                this.$eval(e)
                        } catch (t) {
                            r(t)
                        } finally {
                            f();
                            try {
                                u.$digest()
                            } catch (t) {
                                throw r(t),
                                    t
                            }
                        }
                    },
                    $on: function (e, t) {
                        var n = this.$$listeners[e];
                        return n || (this.$$listeners[e] = n = []),
                            n.push(t),


                            function () {
                                n[Y(n, t)] = null
                            }
                    },
                    $emit: function (e, t) {
                        var n = [],
                            i, s = this,
                            o = !1,
                            u = {
                                name: e,
                                targetScope: s,
                                stopPropagation: function () {
                                    o = !0
                                },
                                preventDefault: function () {
                                    u.defaultPrevented = !0
                                },
                                defaultPrevented: !1
                            },
                            a = st([u], arguments, 1),
                            f, l;
                        do {
                            i = s.$$listeners[e] || n, u.currentScope = s;
                            for (f = 0, l = i.length; f < l; f++) {
                                if (!i[f]) {
                                    i.splice(f, 1),
                                        f--,
                                        l--;
                                    continue
                                }
                                try {
                                    i[f].apply(null, a)
                                } catch (c) {
                                    r(c)
                                }
                            }
                            if (o) return u;
                            s = s.$parent
                        } while (s);
                        return u
                    },
                    $broadcast: function (e, t) {
                        var n = this,
                            i = n,
                            s = n,
                            o = {
                                name: e,
                                targetScope: n,
                                preventDefault: function () {
                                    o.defaultPrevented = !0
                                },
                                defaultPrevented: !1
                            },
                            u = st([o], arguments, 1),
                            a, f, l;
                        do {
                            i = s, o.currentScope = i, a = i.$$listeners[e] || [];
                            for (f = 0, l = a.length; f < l; f++) {
                                if (!a[f]) {
                                    a.splice(f, 1),
                                        f--,
                                        l--;
                                    continue
                                }
                                try {
                                    a[f].apply(null, u)
                                } catch (c) {
                                    r(c)
                                }
                            }
                            if (!(s = i.$$childHead || i !== n && i.$$nextSibling)) while (i !== n && !(s = i.$$nextSibling)) i = i.$parent
                        } while (i = s);
                        return o
                    }
                };
                var u = new o;
                return u
            }]
    }
    function kr(e) {
        return e.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }
    function Lr(e) {
        if (e === "self") return e;
        if (B(e)) {
            if (e.indexOf("***") > -1) throw Nr("iwcard", "Illegal sequence *** in string matcher.  String: {0}", e);
            return e = kr(e).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"),
                new RegExp("^" + e + "$")
        }
        if (R(e)) return new RegExp("^" + e.source + "$");
        throw Nr("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }
    function Ar(e) {
        var t = [];
        return P(e) && E(e, function (e) {
            t.push(Lr(e))
        }),
            t
    }
    function Or() {
        this.SCE_CONTEXTS = Cr;
        var e = ["self"],
            t = [];
        this.resourceUrlWhitelist = function (t) {
            return arguments.length && (e = Ar(t)),
                e
        },
            this.resourceUrlBlacklist = function (e) {
                return arguments.length && (t = Ar(e)),
                    t
            },
            this.$get = ["$injector", function (r) {
                function s(e, t) {
                    return e === "self" ? Fr(t) : !! e.exec(t.href)
                }
                function o(n) {
                    var r = jr(n.toString()),
                        i, o, u = !1;
                    for (i = 0, o = e.length; i < o; i++) if (s(e[i], r)) {
                        u = !0;
                        break
                    }
                    if (u) for (i = 0, o = t.length; i < o; i++) if (s(t[i], r)) {
                        u = !1;
                        break
                    }
                    return u
                }
                function u(e) {
                    var t = function (t) {
                        this.$$unwrapTrustedValue = function () {
                            return t
                        }
                    };
                    return e && (t.prototype = new e),
                        t.prototype.valueOf = function () {
                            return this.$$unwrapTrustedValue()
                        },
                        t.prototype.toString = function () {
                            return this.$$unwrapTrustedValue().toString()
                        },
                        t
                }
                function l(e, t) {
                    var r = f.hasOwnProperty(e) ? f[e] : null;
                    if (!r) throw Nr("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", e, t);
                    if (t === null || t === n || t === "") return t;
                    if (typeof t != "string") throw Nr("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", e);
                    return new r(t)
                }
                function c(e) {
                    return e instanceof a ? e.$$unwrapTrustedValue() : e
                }
                function h(e, t) {
                    if (t === null || t === n || t === "") return t;
                    var r = f.hasOwnProperty(e) ? f[e] : null;
                    if (r && t instanceof r) return t.$$unwrapTrustedValue();
                    if (e === Cr.RESOURCE_URL) {
                        if (o(t)) return t;
                        throw Nr("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", t.toString())
                    }
                    if (e === Cr.HTML) return i(t);
                    throw Nr("unsafe", "Attempting to use an unsafe value in a safe context.")
                }
                var i = function (t) {
                    throw Nr("unsafe", "Attempting to use an unsafe value in a safe context.")
                };
                r.has("$sanitize") && (i = r.get("$sanitize"));
                var a = u(),
                    f = {};
                return f[Cr.HTML] = u(a),
                    f[Cr.CSS] = u(a),
                    f[Cr.URL] = u(a),
                    f[Cr.JS] = u(a),
                    f[Cr.RESOURCE_URL] = u(f[Cr.URL]),
                    {
                        trustAs: l,
                        getTrusted: h,
                        valueOf: c
                    }
            }]
    }
    function Mr() {
        var e = !0;
        this.enabled = function (t) {
            return arguments.length && (e = !! t),
                e
        },
            this.$get = ["$parse", "$sniffer", "$sceDelegate", function (t, n, r) {
                if (e && n.msie && n.msieDocumentMode < 8) throw Nr("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
                var s = tt(Cr);
                s.isEnabled = function () {
                    return e
                },
                    s.trustAs = r.trustAs,
                    s.getTrusted = r.getTrusted,
                    s.valueOf = r.valueOf,
                e || (s.trustAs = s.getTrusted = function (e, t) {
                    return t
                }, s.valueOf = M),
                    s.parseAs = function (n, r) {
                        var i = t(r);
                        return i.literal && i.constant ? i : function (t, r) {
                                return s.getTrusted(n, i(t, r))
                            }
                    };
                var o = s.parseAs,
                    u = s.getTrusted,
                    a = s.trustAs;
                return E(Cr, function (e, t) {
                    var n = i(t);
                    s[qt("parse_as_" + n)] = function (t) {
                        return o(e, t)
                    },
                        s[qt("get_trusted_" + n)] = function (t) {
                            return u(e, t)
                        },
                        s[qt("trust_as_" + n)] = function (t) {
                            return a(e, t)
                        }
                }),
                    s
            }]
    }
    function _r() {
        this.$get = ["$window", "$document", function (e, t) {
            var n = {},
                r = L((/android (\d+)/.exec(i((e.navigator || {}).userAgent)) || [])[1]),
                s = /Boxee/i.test((e.navigator || {}).userAgent),
                o = t[0] || {},
                u = o.documentMode,
                f, l = /^(Moz|webkit|O|ms)(?=[A-Z])/,
                c = o.body && o.body.style,
                h = !1,
                p = !1,
                d;
            if (c) {
                for (var v in c) if (d = l.exec(v)) {
                    f = d[0],
                        f = f.substr(0, 1).toUpperCase() + f.substr(1);
                    break
                }
                f || (f = "WebkitOpacity" in c && "webkit"),
                    h = "transition" in c || f + "Transition" in c,
                    p = "animation" in c || f + "Animation" in c,
                r && (!h || !p) && (h = B(o.body.style.webkitTransition), p = B(o.body.style.webkitAnimation))
            }
            return {
                history: !(!e.history || !e.history.pushState || r < 4) && !s,
                hashchange: "onhashchange" in e && (!u || u > 7),
                hasEvent: function (e) {
                    if (e == "input" && a == 9) return !1;
                    if (D(n[e])) {
                        var t = o.createElement("div");
                        n[e] = "on" + e in t
                    }
                    return n[e]
                },
                csp: it(),
                vendorPrefix: f,
                transitions: h,
                animations: p,
                msie: a,
                msieDocumentMode: u
            }
        }]
    }
    function Dr() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (e, t, n, r) {
            function s(s, o, u) {
                var a = n.defer(),
                    f = a.promise,
                    l = P(u) && !u,
                    c;
                return c = t.defer(function () {
                    try {
                        a.resolve(s())
                    } catch (t) {
                        a.reject(t),
                            r(t)
                    } finally {
                        delete i[f.$$timeoutId]
                    }
                    l || e.$apply()
                }, o),
                    f.$$timeoutId = c,
                    i[c] = a,
                    f
            }
            var i = {};
            return s.cancel = function (e) {
                return e && e.$$timeoutId in i ? (i[e.$$timeoutId].reject("canceled"), delete i[e.$$timeoutId], t.defer.cancel(e.$$timeoutId)) : !1
            },
                s
        }]
    }
    function jr(e, t) {
        var n = e,
            r;
        return a && (Pr.setAttribute("href", n), n = Pr.href),
            Pr.setAttribute("href", n),
            r = Ir(Pr.pathname, e, t),
            r = r.charAt(0) === "/" ? r : "/" + r,
            {
                href: Pr.href,
                protocol: Pr.protocol ? Pr.protocol.replace(/:$/, "") : "",
                host: Pr.host,
                search: Pr.search ? Pr.search.replace(/^\?/, "") : "",
                hash: Pr.hash ? Pr.hash.replace(/^#/, "") : "",
                hostname: Pr.hostname,
                port: Pr.port,
                pathname: r
            }
    }
    function Fr(e) {
        var t = B(e) ? jr(e) : e;
        return t.protocol === Br.protocol && t.host === Br.host
    }
    function Ir(e, t, n) {
        var r;
        return t.indexOf(n) === 0 && (t = t.replace(n, "")),
            Hr.exec(t) ? e : (r = Hr.exec(e), r ? r[1] : e)
    }
    function qr() {
        this.$get = _(e)
    }
    function Rr(e) {
        function n(r, i) {
            if (H(r)) {
                var s = {};
                return E(r, function (e, t) {
                    s[t] = n(t, e)
                }),
                    s
            }
            return e.factory(r + t, i)
        }
        var t = "Filter";
        this.register = n,
            this.$get = ["$injector", function (e) {
                return function (n) {
                    return e.get(n + t)
                }
            }],
            n("currency", zr),
            n("date", ti),
            n("filter", Ur),
            n("json", ni),
            n("limitTo", si),
            n("lowercase", ri),
            n("number", Wr),
            n("orderBy", oi),
            n("uppercase", ii)
    }
    function Ur() {
        return function (e, t, n) {
            if (!I(e)) return e;
            var r = typeof n,
                i = [];
            i.check = function (e) {
                for (var t = 0; t < i.length; t++) if (!i[t](e)) return !1;
                return !0
            },
            r !== "function" && (r === "boolean" && n ? n = function (e, t) {
                    return m.equals(e, t)
                } : n = function (e, t) {
                    return t = ("" + t).toLowerCase(),
                    ("" + e).toLowerCase().indexOf(t) > -1
                });
            var s = function (e, t) {
                if (typeof t == "string" && t.charAt(0) === "!") return !s(e, t.substr(1));
                switch (typeof e) {
                    case "boolean":
                    case "number":
                    case "string":
                        return n(e, t);
                    case "object":
                        switch (typeof t) {
                            case "object":
                                return n(e, t);
                            default:
                                for (var r in e) if (r.charAt(0) !== "$" && s(e[r], t)) return !0
                        }
                        return !1;
                    case "array":
                        for (var i = 0; i < e.length; i++) if (s(e[i], t)) return !0;
                        return !1;
                    default:
                        return !1
                }
            };
            switch (typeof t) {
                case "boolean":
                case "number":
                case "string":
                    t = {
                        $: t
                    };
                case "object":
                    for (var o in t) o == "$" ?
                        function () {
                            if (!t[o]) return;
                            var e = o;
                            i.push(function (n) {
                                return s(n, t[e])
                            })
                        }() : function () {
                            if (typeof t[o] == "undefined") return;
                            var e = o;
                            i.push(function (n) {
                                return s(Ct(n, e), t[e])
                            })
                        }();
                    break;
                case "function":
                    i.push(t);
                    break;
                default:
                    return e
            }
            var u = [];
            for (var a = 0; a < e.length; a++) {
                var f = e[a];
                i.check(f) && u.push(f)
            }
            return u
        }
    }
    function zr(e) {
        var t = e.NUMBER_FORMATS;
        return function (e, n) {
            return D(n) && (n = t.CURRENCY_SYM),
                Vr(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, 2).replace(/\u00A4/g, n)
        }
    }
    function Wr(e) {
        var t = e.NUMBER_FORMATS;
        return function (e, n) {
            return Vr(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n)
        }
    }
    function Vr(e, t, n, r, i) {
        if (isNaN(e) || !isFinite(e)) return "";
        var s = e < 0;
        e = Math.abs(e);
        var o = e + "",
            u = "",
            a = [],
            f = !1;
        if (o.indexOf("e") !== -1) {
            var l = o.match(/([\d\.]+)e(-?)(\d+)/);
            l && l[2] == "-" && l[3] > i + 1 ? o = "0" : (u = o, f = !0)
        }
        if (!f) {
            var c = (o.split(Xr)[1] || "").length;
            D(i) && (i = Math.min(Math.max(t.minFrac, c), t.maxFrac));
            var h = Math.pow(10, i);
            e = Math.round(e * h) / h;
            var p = ("" + e).split(Xr),
                d = p[0];
            p = p[1] || "";
            var v, m = 0,
                g = t.lgSize,
                y = t.gSize;
            if (d.length >= g + y) {
                m = d.length - g;
                for (v = 0; v < m; v++)(m - v) % y === 0 && v !== 0 && (u += n),
                    u += d.charAt(v)
            }
            for (v = m; v < d.length; v++)(d.length - v) % g === 0 && v !== 0 && (u += n),
                u += d.charAt(v);
            while (p.length < i) p += "0";
            i && i !== "0" && (u += r + p.substr(0, i))
        } else i > 0 && e > -1 && e < 1 && (u = e.toFixed(i));
        return a.push(s ? t.negPre : t.posPre),
            a.push(u),
            a.push(s ? t.negSuf : t.posSuf),
            a.join("")
    }
    function $r(e, t, n) {
        var r = "";
        e < 0 && (r = "-", e = -e),
            e = "" + e;
        while (e.length < t) e = "0" + e;
        return n && (e = e.substr(e.length - t)),
        r + e
    }
    function Jr(e, t, n, r) {
        return n = n || 0,


            function (i) {
                var s = i["get" + e]();
                if (n > 0 || s > -n) s += n;
                return s === 0 && n == -12 && (s = 12),
                    $r(s, t, r)
            }
    }
    function Kr(e, t) {
        return function (n, r) {
            var i = n["get" + e](),
                o = s(t ? "SHORT" + e : e);
            return r[o][i]
        }
    }
    function Qr(e) {
        var t = -1 * e.getTimezoneOffset(),
            n = t >= 0 ? "+" : "";
        return n += $r(Math[t > 0 ? "floor" : "ceil"](t / 60), 2) + $r(Math.abs(t % 60), 2),
            n
    }
    function Gr(e, t) {
        return e.getHours() < 12 ? t.AMPMS[0] : t.AMPMS[1]
    }
    function ti(e) {
        function n(e) {
            var n;
            if (n = e.match(t)) {
                var r = new Date(0),
                    i = 0,
                    s = 0,
                    o = n[8] ? r.setUTCFullYear : r.setFullYear,
                    u = n[8] ? r.setUTCHours : r.setHours;
                n[9] && (i = L(n[9] + n[10]), s = L(n[9] + n[11])),
                    o.call(r, L(n[1]), L(n[2]) - 1, L(n[3]));
                var a = L(n[4] || 0) - i,
                    f = L(n[5] || 0) - s,
                    l = L(n[6] || 0),
                    c = Math.round(parseFloat("0." + (n[7] || 0)) * 1e3);
                return u.call(r, a, f, l, c),
                    r
            }
            return e
        }
        var t = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function (t, r) {
            var i = "",
                s = [],
                o, u;
            r = r || "mediumDate",
                r = e.DATETIME_FORMATS[r] || r,
            B(t) && (ei.test(t) ? t = L(t) : t = n(t)),
            j(t) && (t = new Date(t));
            if (!F(t)) return t;
            while (r) u = Zr.exec(r),
                u ? (s = st(s, u, 1), r = s.pop()) : (s.push(r), r = null);
            return E(s, function (n) {
                o = Yr[n],
                    i += o ? o(t, e.DATETIME_FORMATS) : n.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }),
                i
        }
    }
    function ni() {
        return function (e) {
            return ft(e, !0)
        }
    }
    function si() {
        return function (e, t) {
            if (!I(e) && !B(e)) return e;
            t = L(t);
            if (B(e)) return t ? t >= 0 ? e.slice(0, t) : e.slice(t, e.length) : "";
            var n = [],
                r, i;
            t > e.length ? t = e.length : t < -e.length && (t = -e.length),
                t > 0 ? (r = 0, i = t) : (r = e.length + t, i = e.length);
            for (; r < i; r++) n.push(e[r]);
            return n
        }
    }
    function oi(e) {
        return function (t, n, r) {
            function o(e, t) {
                for (var r = 0; r < n.length; r++) {
                    var i = n[r](e, t);
                    if (i !== 0) return i
                }
                return 0
            }
            function u(e, t) {
                return ct(t) ?
                    function (t, n) {
                        return e(n, t)
                    } : e
            }
            function a(e, t) {
                var n = typeof e,
                    r = typeof t;
                return n == r ? (n == "string" && (e = e.toLowerCase(), t = t.toLowerCase()), e === t ? 0 : e < t ? -1 : 1) : n < r ? -1 : 1
            }
            if (!I(t)) return t;
            if (!n) return t;
            n = I(n) ? n : [n],
                n = K(n, function (t) {
                    var n = !1,
                        r = t || M;
                    if (B(t)) {
                        if (t.charAt(0) == "+" || t.charAt(0) == "-") n = t.charAt(0) == "-",
                            t = t.substring(1);
                        r = e(t)
                    }
                    return u(function (e, t) {
                        return a(r(e), r(t))
                    }, n)
                });
            var i = [];
            for (var s = 0; s < t.length; s++) i.push(t[s]);
            return i.sort(u(o, r))
        }
    }
    function ui(e) {
        return q(e) && (e = {
            link: e
        }),
            e.restrict = e.restrict || "AC",
            _(e)
    }
    function ci(e, t) {
        function u(t, n) {
            n = n ? "-" + Et(n, "-") : "",
                e.removeClass((t ? ki : Ci) + n).addClass((t ? Ci : ki) + n)
        }
        var n = this,
            r = e.parent().controller("form") || li,
            i = 0,
            s = n.$error = {},
            o = [];
        n.$name = t.name || t.ngForm,
            n.$dirty = !1,
            n.$pristine = !0,
            n.$valid = !0,
            n.$invalid = !1,
            r.$addControl(n),
            e.addClass(Li),
            u(!0),
            n.$addControl = function (e) {
                Nt(e.$name, "input"),
                    o.push(e),
                e.$name && (n[e.$name] = e)
            },
            n.$removeControl = function (e) {
                e.$name && n[e.$name] === e && delete n[e.$name],
                    E(s, function (t, r) {
                        n.$setValidity(r, !0, e)
                    }),
                    Z(o, e)
            },
            n.$setValidity = function (e, t, o) {
                var a = s[e];
                if (t) a && (Z(a, o), a.length || (i--, i || (u(t), n.$valid = !0, n.$invalid = !1), s[e] = !1, u(!0, e), r.$setValidity(e, !0, n)));
                else {
                    i || u(t);
                    if (a) {
                        if (G(a, o)) return
                    } else s[e] = a = [],
                        i++,
                        u(!1, e),
                        r.$setValidity(e, !1, n);
                    a.push(o),
                        n.$valid = !1,
                        n.$invalid = !0
                }
            },
            n.$setDirty = function () {
                e.removeClass(Li).addClass(Ai),
                    n.$dirty = !0,
                    n.$pristine = !1,
                    r.$setDirty()
            },
            n.$setPristine = function () {
                e.removeClass(Ai).addClass(Li),
                    n.$dirty = !1,
                    n.$pristine = !0,
                    E(o, function (e) {
                        e.$setPristine()
                    })
            }
    }
    function bi(e, t, i, s, o, u) {
        var a = !1;
        t.on("compositionstart", function () {
            a = !0
        }),
            t.on("compositionend", function () {
                a = !1
            });
        var f = function () {
            if (a) return;
            var n = t.val();
            ct(i.ngTrim || "T") && (n = V(n)),
            s.$viewValue !== n && e.$apply(function () {
                s.$setViewValue(n)
            })
        };
        if (o.hasEvent("input")) t.on("input", f);
        else {
            var l, c = function () {
                l || (l = u.defer(function () {
                    f(),
                        l = null
                }))
            };
            t.on("keydown", function (e) {
                var t = e.keyCode;
                if (t === 91 || 15 < t && t < 19 || 37 <= t && t <= 40) return;
                c()
            }),
                t.on("change", f),
            o.hasEvent("paste") && t.on("paste cut", c)
        }
        s.$render = function () {
            t.val(s.$isEmpty(s.$viewValue) ? "" : s.$viewValue)
        };
        var h = i.ngPattern,
            p, d, v = function (e, t) {
                return s.$isEmpty(t) || e.test(t) ? (s.$setValidity("pattern", !0), t) : (s.$setValidity("pattern", !1), n)
            };
        h && (d = h.match(/^\/(.*)\/([gim]*)$/), d ? (h = new RegExp(d[1], d[2]), p = function (e) {
                return v(h, e)
            }) : p = function (n) {
                var i = e.$eval(h);
                if (!i || !i.test) throw r("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", h, i, ht(t));
                return v(i, n)
            }, s.$formatters.push(p), s.$parsers.push(p));
        if (i.ngMinlength) {
            var m = L(i.ngMinlength),
                g = function (e) {
                    return !s.$isEmpty(e) && e.length < m ? (s.$setValidity("minlength", !1), n) : (s.$setValidity("minlength", !0), e)
                };
            s.$parsers.push(g),
                s.$formatters.push(g)
        }
        if (i.ngMaxlength) {
            var y = L(i.ngMaxlength),
                b = function (e) {
                    return !s.$isEmpty(e) && e.length > y ? (s.$setValidity("maxlength", !1), n) : (s.$setValidity("maxlength", !0), e)
                };
            s.$parsers.push(b),
                s.$formatters.push(b)
        }
    }
    function wi(e, t, r, i, s, o) {
        bi(e, t, r, i, s, o),
            i.$parsers.push(function (e) {
                var t = i.$isEmpty(e);
                return t || gi.test(e) ? (i.$setValidity("number", !0), e === "" ? null : t ? e : parseFloat(e)) : (i.$setValidity("number", !1), n)
            }),
            i.$formatters.push(function (e) {
                return i.$isEmpty(e) ? "" : "" + e
            });
        if (r.min) {
            var u = function (e) {
                var t = parseFloat(r.min);
                return !i.$isEmpty(e) && e < t ? (i.$setValidity("min", !1), n) : (i.$setValidity("min", !0), e)
            };
            i.$parsers.push(u),
                i.$formatters.push(u)
        }
        if (r.max) {
            var a = function (e) {
                var t = parseFloat(r.max);
                return !i.$isEmpty(e) && e > t ? (i.$setValidity("max", !1), n) : (i.$setValidity("max", !0), e)
            };
            i.$parsers.push(a),
                i.$formatters.push(a)
        }
        i.$formatters.push(function (e) {
            return i.$isEmpty(e) || j(e) ? (i.$setValidity("number", !0), e) : (i.$setValidity("number", !1), n)
        })
    }
    function Ei(e, t, r, i, s, o) {
        bi(e, t, r, i, s, o);
        var u = function (e) {
            return i.$isEmpty(e) || vi.test(e) ? (i.$setValidity("url", !0), e) : (i.$setValidity("url", !1), n)
        };
        i.$formatters.push(u),
            i.$parsers.push(u)
    }
    function Si(e, t, r, i, s, o) {
        bi(e, t, r, i, s, o);
        var u = function (e) {
            return i.$isEmpty(e) || mi.test(e) ? (i.$setValidity("email", !0), e) : (i.$setValidity("email", !1), n)
        };
        i.$formatters.push(u),
            i.$parsers.push(u)
    }
    function xi(e, t, n, r) {
        D(n.name) && t.attr("name", N()),
            t.on("click", function () {
                t[0].checked && e.$apply(function () {
                    r.$setViewValue(n.value)
                })
            }),
            r.$render = function () {
                var e = n.value;
                t[0].checked = e == r.$viewValue
            },
            n.$observe("value", r.$render)
    }
    function Ti(e, t, n, r) {
        var i = n.ngTrueValue,
            s = n.ngFalseValue;
        B(i) || (i = !0),
        B(s) || (s = !1),
            t.on("click", function () {
                e.$apply(function () {
                    r.$setViewValue(t[0].checked)
                })
            }),
            r.$render = function () {
                t[0].checked = r.$viewValue
            },
            r.$isEmpty = function (e) {
                return e !== i
            },
            r.$formatters.push(function (e) {
                return e === i
            }),
            r.$parsers.push(function (e) {
                return e ? i : s
            })
    }
    function qi(e, t) {
        return e = "ngClass" + e,


            function () {
                return {
                    restrict: "AC",
                    link: function (n, r, i) {
                        function o(e) {
                            if (t === !0 || n.$index % 2 === t) {
                                var r = u(e || "");
                                s ? rt(e, s) || i.$updateClass(r, u(s)) : i.$addClass(r)
                            }
                            s = tt(e)
                        }
                        function u(e) {
                            if (I(e)) return e.join(" ");
                            if (H(e)) {
                                var t = [],
                                    n = 0;
                                return E(e, function (e, n) {
                                    e && t.push(n)
                                }),
                                    t.join(" ")
                            }
                            return e
                        }
                        var s;
                        n.$watch(i[e], o, !0),
                            i.$observe("class", function (t) {
                                o(n.$eval(i[e]))
                            }),
                        e !== "ngClass" && n.$watch("$index", function (r, s) {
                            var o = r & 1;
                            if (o !== s & 1) {
                                var a = u(n.$eval(i[e]));
                                o === t ? i.$addClass(a) : i.$removeClass(a)
                            }
                        })
                    }
                }
            }
    }
    var i = function (e) {
            return B(e) ? e.toLowerCase() : e
        },
        s = function (e) {
            return B(e) ? e.toUpperCase() : e
        },
        o = function (e) {
            return B(e) ? e.replace(/[A-Z]/g, function (e) {
                    return String.fromCharCode(e.charCodeAt(0) | 32)
                }) : e
        },
        u = function (e) {
            return B(e) ? e.replace(/[a-z]/g, function (e) {
                    return String.fromCharCode(e.charCodeAt(0) & -33)
                }) : e
        };
    "i" !== "I".toLowerCase() && (i = o, s = u);
    var a, f, l, c = [].slice,
        h = [].push,
        p = Object.prototype.toString,
        d = r("ng"),
        v = e.angular,
        m = e.angular || (e.angular = {}),
        g, y, b = ["0", "0", "0"];
    a = L((/msie (\d+)/.exec(i(navigator.userAgent)) || [])[1]),
    isNaN(a) && (a = L((/trident\/.*; rv:(\d+)/.exec(i(navigator.userAgent)) || [])[1])),
        O.$inject = [],
        M.$inject = [];
    var V = function () {
        return String.prototype.trim ?
            function (e) {
                return B(e) ? e.trim() : e
            } : function (e) {
                return B(e) ? e.replace(/^\s*/, "").replace(/\s*$/, "") : e
            }
    }();
    a < 9 ? y = function (e) {
            return e = e.nodeName ? e : e[0],
                e.scopeName && e.scopeName != "HTML" ? s(e.scopeName + ":" + e.nodeName) : e.nodeName
        } : y = function (e) {
            return e.nodeName ? e.nodeName : e[0].nodeName
        };
    var wt = /[A-Z]/g,
        At = {
            full: "1.2.2",
            major: 1,
            minor: 2,
            dot: 2,
            codeName: "consciousness-inertia"
        },
        Mt = Ut.cache = {},
        _t = Ut.expando = "ng-" + (new Date).getTime(),
        Dt = 1,
        Pt = e.document.addEventListener ?
            function (e, t, n) {
                e.addEventListener(t, n, !1)
            } : function (e, t, n) {
                e.attachEvent("on" + t, n)
            },
        Ht = e.document.removeEventListener ?
            function (e, t, n) {
                e.removeEventListener(t, n, !1)
            } : function (e, t, n) {
                e.detachEvent("on" + t, n)
            },
        jt = /([\:\-\_]+(.))/g,
        Ft = /^moz([A-Z])/,
        It = r("jqLite"),
        tn = Ut.prototype = {
            ready: function (n) {
                function i() {
                    if (r) return;
                    r = !0,
                        n()
                }
                var r = !1;
                t.readyState === "complete" ? setTimeout(i) : (this.on("DOMContentLoaded", i), Ut(e).on("load", i))
            },
            toString: function () {
                var e = [];
                return E(this, function (t) {
                    e.push("" + t)
                }),
                "[" + e.join(", ") + "]"
            },
            eq: function (e) {
                return e >= 0 ? f(this[e]) : f(this[this.length + e])
            },
            length: 0,
            push: h,
            sort: [].sort,
            splice: [].splice
        },
        nn = {};
    E("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (e) {
        nn[i(e)] = e
    });
    var rn = {};
    E("input,select,option,textarea,button,form,details".split(","), function (e) {
        rn[s(e)] = !0
    }),
        E({
            data: Jt,
            inheritedData: en,
            scope: function (e) {
                return f(e).data("$scope") || en(e.parentNode || e, ["$isolateScope", "$scope"])
            },
            isolateScope: function (e) {
                return f(e).data("$isolateScope") || f(e).data("$isolateScopeNoTemplate")
            },
            controller: Zt,
            injector: function (e) {
                return en(e, "$injector")
            },
            removeAttr: function (e, t) {
                e.removeAttribute(t)
            },
            hasClass: Kt,
            css: function (e, t, r) {
                t = qt(t);
                if (!P(r)) {
                    var i;
                    return a <= 8 && (i = e.currentStyle && e.currentStyle[t], i === "" && (i = "auto")),
                        i = i || e.style[t],
                    a <= 8 && (i = i === "" ? n : i),
                        i
                }
                e.style[t] = r
            },
            attr: function (e, t, r) {
                var s = i(t);
                if (nn[s]) {
                    if (!P(r)) return e[t] || (e.attributes.getNamedItem(t) || O).specified ? s : n;
                    r ? (e[t] = !0, e.setAttribute(t, s)) : (e[t] = !1, e.removeAttribute(s))
                } else if (P(r)) e.setAttribute(t, r);
                else if (e.getAttribute) {
                    var o = e.getAttribute(t, 2);
                    return o === null ? n : o
                }
            },
            prop: function (e, t, n) {
                if (!P(n)) return e[t];
                e[t] = n
            },
            text: function () {
                function t(t, n) {
                    var r = e[t.nodeType];
                    if (D(n)) return r ? t[r] : "";
                    t[r] = n
                }
                var e = [];
                return a < 9 ? (e[1] = "innerText", e[3] = "nodeValue") : e[1] = e[3] = "textContent",
                    t.$dv = "",
                    t
            }(),
            val: function (e, t) {
                if (D(t)) {
                    if (y(e) === "SELECT" && e.multiple) {
                        var n = [];
                        return E(e.options, function (e) {
                            e.selected && n.push(e.value || e.text)
                        }),
                            n.length === 0 ? null : n
                    }
                    return e.value
                }
                e.value = t
            },
            html: function (e, t) {
                if (D(t)) return e.innerHTML;
                for (var n = 0, r = e.childNodes; n < r.length; n++) Wt(r[n]);
                e.innerHTML = t
            }
        }, function (e, t) {
            Ut.prototype[t] = function (t, r) {
                var i, s;
                if ((e.length == 2 && e !== Kt && e !== Zt ? t : r) === n) {
                    if (H(t)) {
                        for (i = 0; i < this.length; i++) if (e === Jt) e(this[i], t);
                        else for (s in t) e(this[i], s, t[s]);
                        return this
                    }
                    var o = e.$dv,
                        u = o === n ? Math.min(this.length, 1) : this.length;
                    for (var a = 0; a < u; a++) {
                        var f = e(this[a], t, r);
                        o = o ? o + f : f
                    }
                    return o
                }
                for (i = 0; i < this.length; i++) e(this[i], t, r);
                return this
            }
        }),
        E({
            removeData: Vt,
            dealoc: Wt,
            on: function hs(e, n, r, i) {
                if (P(i)) throw It("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
                var s = $t(e, "events"),
                    o = $t(e, "handle");
                s || $t(e, "events", s = {}),
                o || $t(e, "handle", o = on(e, s)),
                    E(n.split(" "), function (n) {
                        var i = s[n];
                        if (!i) {
                            if (n == "mouseenter" || n == "mouseleave") {
                                var u = t.body.contains || t.body.compareDocumentPosition ?
                                    function (e, t) {
                                        var n = e.nodeType === 9 ? e.documentElement : e,
                                            r = t && t.parentNode;
                                        return e === r || !! r && r.nodeType === 1 && !! (n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
                                    } : function (e, t) {
                                        if (t) while (t = t.parentNode) if (t === e) return !0;
                                        return !1
                                    };
                                s[n] = [];
                                var a = {
                                    mouseleave: "mouseout",
                                    mouseenter: "mouseover"
                                };
                                hs(e, a[n], function (e) {
                                    var t = this,
                                        r = e.relatedTarget;
                                    (!r || r !== t && !u(t, r)) && o(e, n)
                                })
                            } else Pt(e, n, o),
                                s[n] = [];
                            i = s[n]
                        }
                        i.push(r)
                    })
            },
            off: Xt,
            replaceWith: function (e, t) {
                var n, r = e.parentNode;
                Wt(e),
                    E(new Ut(t), function (t) {
                        n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e),
                            n = t
                    })
            },
            children: function (e) {
                var t = [];
                return E(e.childNodes, function (e) {
                    e.nodeType === 1 && t.push(e)
                }),
                    t
            },
            contents: function (e) {
                return e.childNodes || []
            },
            append: function (e, t) {
                E(new Ut(t), function (t) {
                    (e.nodeType === 1 || e.nodeType === 11) && e.appendChild(t)
                })
            },
            prepend: function (e, t) {
                if (e.nodeType === 1) {
                    var n = e.firstChild;
                    E(new Ut(t), function (t) {
                        e.insertBefore(t, n)
                    })
                }
            },
            wrap: function (e, t) {
                t = f(t)[0];
                var n = e.parentNode;
                n && n.replaceChild(t, e),
                    t.appendChild(e)
            },
            remove: function (e) {
                Wt(e);
                var t = e.parentNode;
                t && t.removeChild(e)
            },
            after: function (e, t) {
                var n = e,
                    r = e.parentNode;
                E(new Ut(t), function (e) {
                    r.insertBefore(e, n.nextSibling),
                        n = e
                })
            },
            addClass: Gt,
            removeClass: Qt,
            toggleClass: function (e, t, n) {
                D(n) && (n = !Kt(e, t)),
                    (n ? Gt : Qt)(e, t)
            },
            parent: function (e) {
                var t = e.parentNode;
                return t && t.nodeType !== 11 ? t : null
            },
            next: function (e) {
                if (e.nextElementSibling) return e.nextElementSibling;
                var t = e.nextSibling;
                while (t != null && t.nodeType !== 1) t = t.nextSibling;
                return t
            },
            find: function (e, t) {
                return e.getElementsByTagName(t)
            },
            clone: zt,
            triggerHandler: function (e, t, n) {
                var r = ($t(e, "events") || {})[t];
                n = n || [];
                var i = [{
                    preventDefault: O,
                    stopPropagation: O
                }];
                E(r, function (t) {
                    t.apply(e, i.concat(n))
                })
            }
        }, function (e, t) {
            Ut.prototype[t] = function (t, n, r) {
                var i;
                for (var s = 0; s < this.length; s++) D(i) ? (i = e(this[s], t, n, r), P(i) && (i = f(i))) : Yt(i, e(this[s], t, n, r));
                return P(i) ? i : this
            },
                Ut.prototype.bind = Ut.prototype.on,
                Ut.prototype.unbind = Ut.prototype.off
        }),
        an.prototype = {
            put: function (e, t) {
                this[un(e)] = t
            },
            get: function (e) {
                return this[un(e)]
            },
            remove: function (e) {
                var t = this[e = un(e)];
                return delete this[e],
                    t
            }
        };
    var fn = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        ln = /,/,
        cn = /^\s*(_?)(\S+?)\1\s*$/,
        hn = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
        pn = r("$injector"),
        gn = r("$animate"),
        yn = ["$provide", function (e) {
            this.$$selectors = {},
                this.register = function (t, n) {
                    var r = t + "-animation";
                    if (t && t.charAt(0) != ".") throw gn("notcsel", "Expecting class selector starting with '.' got '{0}'.", t);
                    this.$$selectors[t.substr(1)] = r,
                        e.factory(r, n)
                },
                this.$get = ["$timeout", function (e) {
                    return {
                        enter: function (t, n, r, i) {
                            if (r) r.after(t);
                            else {
                                if (!n || !n[0]) n = r.parent();
                                n.append(t)
                            }
                            i && e(i, 0, !1)
                        },
                        leave: function (t, n) {
                            t.remove(),
                            n && e(n, 0, !1)
                        },
                        move: function (e, t, n, r) {
                            this.enter(e, t, n, r)
                        },
                        addClass: function (t, n, r) {
                            n = B(n) ? n : I(n) ? n.join(" ") : "",
                                E(t, function (e) {
                                    Gt(e, n)
                                }),
                            r && e(r, 0, !1)
                        },
                        removeClass: function (t, n, r) {
                            n = B(n) ? n : I(n) ? n.join(" ") : "",
                                E(t, function (e) {
                                    Qt(e, n)
                                }),
                            r && e(r, 0, !1)
                        },
                        enabled: O
                    }
                }]
        }],
        xn = r("$compile");
    Tn.$inject = ["$provide"];
    var Nn = /^(x[\:\-_]|data[\:\-_])/i,
        Fn = e.XMLHttpRequest ||
            function () {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                } catch (e) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                } catch (t) {}
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                } catch (n) {}
                throw r("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
            },
        Rn = r("$interpolate"),
        Xn = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
        Vn = {
            http: 80,
            https: 443,
            ftp: 21
        },
        $n = r("$location");
    rr.prototype = nr.prototype = tr.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: ir("$$absUrl"),
        url: function (e, t) {
            if (D(e)) return this.$$url;
            var n = Xn.exec(e);
            return n[1] && this.path(decodeURIComponent(n[1])),
            (n[2] || n[1]) && this.search(n[3] || ""),
                this.hash(n[5] || "", t),
                this
        },
        protocol: ir("$$protocol"),
        host: ir("$$host"),
        port: ir("$$port"),
        path: sr("$$path", function (e) {
            return e.charAt(0) == "/" ? e : "/" + e
        }),
        search: function (e, t) {
            switch (arguments.length) {
                case 0:
                    return this.$$search;
                case 1:
                    if (B(e)) this.$$search = dt(e);
                    else {
                        if (!H(e)) throw $n("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                        this.$$search = e
                    }
                    break;
                default:
                    D(t) || t === null ? delete this.$$search[e] : this.$$search[e] = t
            }
            return this.$$compose(),
                this
        },
        hash: sr("$$hash", M),
        replace: function () {
            return this.$$replace = !0,
                this
        }
    };
    var ar = r("$parse"),
        fr = {},
        lr, pr = {
            "null": function () {
                return null
            },
            "true": function () {
                return !0
            },
            "false": function () {
                return !1
            },
            "undefined": O,
            "+": function (e, t, r, i) {
                return r = r(e, t),
                    i = i(e, t),
                    P(r) ? P(i) ? r + i : r : P(i) ? i : n
            },
            "-": function (e, t, n, r) {
                return n = n(e, t),
                    r = r(e, t),
                (P(n) ? n : 0) - (P(r) ? r : 0)
            },
            "*": function (e, t, n, r) {
                return n(e, t) * r(e, t)
            },
            "/": function (e, t, n, r) {
                return n(e, t) / r(e, t)
            },
            "%": function (e, t, n, r) {
                return n(e, t) % r(e, t)
            },
            "^": function (e, t, n, r) {
                return n(e, t) ^ r(e, t)
            },
            "=": O,
            "===": function (e, t, n, r) {
                return n(e, t) === r(e, t)
            },
            "!==": function (e, t, n, r) {
                return n(e, t) !== r(e, t)
            },
            "==": function (e, t, n, r) {
                return n(e, t) == r(e, t)
            },
            "!=": function (e, t, n, r) {
                return n(e, t) != r(e, t)
            },
            "<": function (e, t, n, r) {
                return n(e, t) < r(e, t)
            },
            ">": function (e, t, n, r) {
                return n(e, t) > r(e, t)
            },
            "<=": function (e, t, n, r) {
                return n(e, t) <= r(e, t)
            },
            ">=": function (e, t, n, r) {
                return n(e, t) >= r(e, t)
            },
            "&&": function (e, t, n, r) {
                return n(e, t) && r(e, t)
            },
            "||": function (e, t, n, r) {
                return n(e, t) || r(e, t)
            },
            "&": function (e, t, n, r) {
                return n(e, t) & r(e, t)
            },
            "|": function (e, t, n, r) {
                return r(e, t)(e, t, n(e, t))
            },
            "!": function (e, t, n) {
                return !n(e, t)
            }
        },
        dr = {
            n: "\n",
            f: "\f",
            r: "\r",
            t: "	",
            v: "",
            "'": "'",
            '"': '"'
        },
        vr = function (e) {
            this.options = e
        };
    vr.prototype = {
        constructor: vr,
        lex: function (e) {
            this.text = e,
                this.index = 0,
                this.ch = n,
                this.lastCh = ":",
                this.tokens = [];
            var t, r = [];
            while (this.index < this.text.length) {
                this.ch = this.text.charAt(this.index);
                if (this.is("\"'")) this.readString(this.ch);
                else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek())) this.readNumber();
                else if (this.isIdent(this.ch)) this.readIdent(),
                this.was("{,") && r[0] === "{" && (t = this.tokens[this.tokens.length - 1]) && (t.json = t.text.indexOf(".") === -1);
                else if (this.is("(){}[].,;:?")) this.tokens.push({
                    index: this.index,
                    text: this.ch,
                    json: this.was(":[,") && this.is("{[") || this.is("}]:,")
                }),
                this.is("{[") && r.unshift(this.ch),
                this.is("}]") && r.shift(),
                    this.index++;
                else {
                    if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue
                    }
                    var i = this.ch + this.peek(),
                        s = i + this.peek(2),
                        o = pr[this.ch],
                        u = pr[i],
                        a = pr[s];
                    a ? (this.tokens.push({
                            index: this.index,
                            text: s,
                            fn: a
                        }), this.index += 3) : u ? (this.tokens.push({
                                index: this.index,
                                text: i,
                                fn: u
                            }), this.index += 2) : o ? (this.tokens.push({
                                    index: this.index,
                                    text: this.ch,
                                    fn: o,
                                    json: this.was("[,:") && this.is("+-")
                                }), this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        },
        is: function (e) {
            return e.indexOf(this.ch) !== -1
        },
        was: function (e) {
            return e.indexOf(this.lastCh) !== -1
        },
        peek: function (e) {
            var t = e || 1;
            return this.index + t < this.text.length ? this.text.charAt(this.index + t) : !1
        },
        isNumber: function (e) {
            return "0" <= e && e <= "9"
        },
        isWhitespace: function (e) {
            return e === " " || e === "\r" || e === "	" || e === "\n" || e === "" || e === " "
        },
        isIdent: function (e) {
            return "a" <= e && e <= "z" || "A" <= e && e <= "Z" || "_" === e || e === "$"
        },
        isExpOperator: function (e) {
            return e === "-" || e === "+" || this.isNumber(e)
        },
        throwError: function (e, t, n) {
            n = n || this.index;
            var r = P(t) ? "s " + t + "-" + this.index + " [" + this.text.substring(t, n) + "]" : " " + n;
            throw ar("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", e, r, this.text)
        },
        readNumber: function () {
            var e = "",
                t = this.index;
            while (this.index < this.text.length) {
                var n = i(this.text.charAt(this.index));
                if (n == "." || this.isNumber(n)) e += n;
                else {
                    var r = this.peek();
                    if (n == "e" && this.isExpOperator(r)) e += n;
                    else if (this.isExpOperator(n) && r && this.isNumber(r) && e.charAt(e.length - 1) == "e") e += n;
                    else {
                        if (!this.isExpOperator(n) || !! r && !! this.isNumber(r) || e.charAt(e.length - 1) != "e") break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            e = 1 * e,
                this.tokens.push({
                    index: t,
                    text: e,
                    json: !0,
                    fn: function () {
                        return e
                    }
                })
        },
        readIdent: function () {
            var e = this,
                t = "",
                n = this.index,
                r, i, s, o;
            while (this.index < this.text.length) {
                o = this.text.charAt(this.index);
                if (o !== "." && !this.isIdent(o) && !this.isNumber(o)) break;
                o === "." && (r = this.index),
                    t += o,
                    this.index++
            }
            if (r) {
                i = this.index;
                while (i < this.text.length) {
                    o = this.text.charAt(i);
                    if (o === "(") {
                        s = t.substr(r - n + 1),
                            t = t.substr(0, r - n),
                            this.index = i;
                        break
                    }
                    if (!this.isWhitespace(o)) break;
                    i++
                }
            }
            var u = {
                index: n,
                text: t
            };
            if (pr.hasOwnProperty(t)) u.fn = pr[t],
                u.json = pr[t];
            else {
                var a = wr(t, this.options, this.text);
                u.fn = k(function (e, t) {
                    return a(e, t)
                }, {
                    assign: function (n, r) {
                        return gr(n, t, r, e.text, e.options)
                    }
                })
            }
            this.tokens.push(u),
            s && (this.tokens.push({
                index: r,
                text: ".",
                json: !1
            }), this.tokens.push({
                index: r + 1,
                text: s,
                json: !1
            }))
        },
        readString: function (e) {
            var t = this.index;
            this.index++;
            var n = "",
                r = e,
                i = !1;
            while (this.index < this.text.length) {
                var s = this.text.charAt(this.index);
                r += s;
                if (i) {
                    if (s === "u") {
                        var o = this.text.substring(this.index + 1, this.index + 5);
                        o.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + o + "]"),
                            this.index += 4,
                            n += String.fromCharCode(parseInt(o, 16))
                    } else {
                        var u = dr[s];
                        u ? n += u : n += s
                    }
                    i = !1
                } else if (s === "\\") i = !0;
                else {
                    if (s === e) {
                        this.index++,
                            this.tokens.push({
                                index: t,
                                text: r,
                                string: n,
                                json: !0,
                                fn: function () {
                                    return n
                                }
                            });
                        return
                    }
                    n += s
                }
                this.index++
            }
            this.throwError("Unterminated quote", t)
        }
    };
    var mr = function (e, t, n) {
        this.lexer = e,
            this.$filter = t,
            this.options = n
    };
    mr.ZERO = function () {
        return 0
    },
        mr.prototype = {
            constructor: mr,
            parse: function (e, t) {
                this.text = e,
                    this.json = t,
                    this.tokens = this.lexer.lex(e),
                t && (this.assignment = this.logicalOR, this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function () {
                    this.throwError("is not valid json", {
                        text: e,
                        index: 0
                    })
                });
                var n = t ? this.primary() : this.statements();
                return this.tokens.length !== 0 && this.throwError("is an unexpected token", this.tokens[0]),
                    n.literal = !! n.literal,
                    n.constant = !! n.constant,
                    n
            },
            primary: function () {
                var e;
                if (this.expect("(")) e = this.filterChain(),
                    this.consume(")");
                else if (this.expect("[")) e = this.arrayDeclaration();
                else if (this.expect("{")) e = this.object();
                else {
                    var t = this.expect();
                    e = t.fn,
                    e || this.throwError("not a primary expression", t),
                    t.json && (e.constant = !0, e.literal = !0)
                }
                var n, r;
                while (n = this.expect("(", "[", ".")) n.text === "(" ? (e = this.functionCall(e, r), r = null) : n.text === "[" ? (r = e, e = this.objectIndex(e)) : n.text === "." ? (r = e, e = this.fieldAccess(e)) : this.throwError("IMPOSSIBLE");
                return e
            },
            throwError: function (e, t) {
                throw ar("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", t.text, e, t.index + 1, this.text, this.text.substring(t.index))
            },
            peekToken: function () {
                if (this.tokens.length === 0) throw ar("ueoe", "Unexpected end of expression: {0}", this.text);
                return this.tokens[0]
            },
            peek: function (e, t, n, r) {
                if (this.tokens.length > 0) {
                    var i = this.tokens[0],
                        s = i.text;
                    if (s === e || s === t || s === n || s === r || !e && !t && !n && !r) return i
                }
                return !1
            },
            expect: function (e, t, n, r) {
                var i = this.peek(e, t, n, r);
                return i ? (this.json && !i.json && this.throwError("is not valid json", i), this.tokens.shift(), i) : !1
            },
            consume: function (e) {
                this.expect(e) || this.throwError("is unexpected, expecting [" + e + "]", this.peek())
            },
            unaryFn: function (e, t) {
                return k(function (n, r) {
                    return e(n, r, t)
                }, {
                    constant: t.constant
                })
            },
            ternaryFn: function (e, t, n) {
                return k(function (r, i) {
                    return e(r, i) ? t(r, i) : n(r, i)
                }, {
                    constant: e.constant && t.constant && n.constant
                })
            },
            binaryFn: function (e, t, n) {
                return k(function (r, i) {
                    return t(r, i, e, n)
                }, {
                    constant: e.constant && n.constant
                })
            },
            statements: function () {
                var e = [];
                for (;;) {
                    this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && e.push(this.filterChain());
                    if (!this.expect(";")) return e.length === 1 ? e[0] : function (t, n) {
                            var r;
                            for (var i = 0; i < e.length; i++) {
                                var s = e[i];
                                s && (r = s(t, n))
                            }
                            return r
                        }
                }
            },
            filterChain: function () {
                var e = this.expression(),
                    t;
                for (;;) {
                    if (!(t = this.expect("|"))) return e;
                    e = this.binaryFn(e, t.fn, this.filter())
                }
            },
            filter: function () {
                var e = this.expect(),
                    t = this.$filter(e.text),
                    n = [];
                for (;;) {
                    if (!(e = this.expect(":"))) {
                        var r = function (e, r, i) {
                            var s = [i];
                            for (var o = 0; o < n.length; o++) s.push(n[o](e, r));
                            return t.apply(e, s)
                        };
                        return function () {
                            return r
                        }
                    }
                    n.push(this.expression())
                }
            },
            expression: function () {
                return this.assignment()
            },
            assignment: function () {
                var e = this.ternary(),
                    t, n;
                return (n = this.expect("=")) ? (e.assign || this.throwError("implies assignment but [" + this.text.substring(0, n.index) + "] can not be assigned to", n), t = this.ternary(), function (n, r) {
                        return e.assign(n, t(n, r), r)
                    }) : e
            },
            ternary: function () {
                var e = this.logicalOR(),
                    t, n;
                if (!(n = this.expect("?"))) return e;
                t = this.ternary();
                if (n = this.expect(":")) return this.ternaryFn(e, t, this.ternary());
                this.throwError("expected :", n)
            },
            logicalOR: function () {
                var e = this.logicalAND(),
                    t;
                for (;;) {
                    if (!(t = this.expect("||"))) return e;
                    e = this.binaryFn(e, t.fn, this.logicalAND())
                }
            },
            logicalAND: function () {
                var e = this.equality(),
                    t;
                if (t = this.expect("&&")) e = this.binaryFn(e, t.fn, this.logicalAND());
                return e
            },
            equality: function () {
                var e = this.relational(),
                    t;
                if (t = this.expect("==", "!=", "===", "!==")) e = this.binaryFn(e, t.fn, this.equality());
                return e
            },
            relational: function () {
                var e = this.additive(),
                    t;
                if (t = this.expect("<", ">", "<=", ">=")) e = this.binaryFn(e, t.fn, this.relational());
                return e
            },
            additive: function () {
                var e = this.multiplicative(),
                    t;
                while (t = this.expect("+", "-")) e = this.binaryFn(e, t.fn, this.multiplicative());
                return e
            },
            multiplicative: function () {
                var e = this.unary(),
                    t;
                while (t = this.expect("*", "/", "%")) e = this.binaryFn(e, t.fn, this.unary());
                return e
            },
            unary: function () {
                var e;
                return this.expect("+") ? this.primary() : (e = this.expect("-")) ? this.binaryFn(mr.ZERO, e.fn, this.unary()) : (e = this.expect("!")) ? this.unaryFn(e.fn, this.unary()) : this.primary()
            },
            fieldAccess: function (e) {
                var t = this,
                    n = this.expect().text,
                    r = wr(n, this.options, this.text);
                return k(function (t, n, i) {
                    return r(i || e(t, n), n)
                }, {
                    assign: function (r, i, s) {
                        return gr(e(r, s), n, i, t.text, t.options)
                    }
                })
            },
            objectIndex: function (e) {
                var t = this,
                    r = this.expression();
                return this.consume("]"),
                    k(function (i, s) {
                        var o = e(i, s),
                            u = r(i, s),
                            a, f;
                        return o ? (a = hr(o[u], t.text), a && a.then && t.options.unwrapPromises && (f = a, "$$v" in a || (f.$$v = n, f.then(function (e) {
                                f.$$v = e
                            })), a = a.$$v), a) : n
                    }, {
                        assign: function (n, i, s) {
                            var o = r(n, s),
                                u = hr(e(n, s), t.text);
                            return u[o] = i
                        }
                    })
            },
            functionCall: function (e, t) {
                var n = [];
                if (this.peekToken().text !== ")") do n.push(this.expression());
                while (this.expect(","));
                this.consume(")");
                var r = this;
                return function (i, s) {
                    var o = [],
                        u = t ? t(i, s) : i;
                    for (var a = 0; a < n.length; a++) o.push(n[a](i, s));
                    var f = e(i, s, u) || O;
                    hr(u, r.text),
                        hr(f, r.text);
                    var l = f.apply ? f.apply(u, o) : f(o[0], o[1], o[2], o[3], o[4]);
                    return hr(l, r.text)
                }
            },
            arrayDeclaration: function () {
                var e = [],
                    t = !0;
                if (this.peekToken().text !== "]") do {
                    var n = this.expression();
                    e.push(n), n.constant || (t = !1)
                } while (this.expect(","));
                return this.consume("]"),
                    k(function (t, n) {
                        var r = [];
                        for (var i = 0; i < e.length; i++) r.push(e[i](t, n));
                        return r
                    }, {
                        literal: !0,
                        constant: t
                    })
            },
            object: function () {
                var e = [],
                    t = !0;
                if (this.peekToken().text !== "}") do {
                    var n = this.expect(),
                        r = n.string || n.text;
                    this.consume(":");
                    var i = this.expression();
                    e.push({
                        key: r,
                        value: i
                    }), i.constant || (t = !1)
                } while (this.expect(","));
                return this.consume("}"),
                    k(function (t, n) {
                        var r = {};
                        for (var i = 0; i < e.length; i++) {
                            var s = e[i];
                            r[s.key] = s.value(t, n)
                        }
                        return r
                    }, {
                        literal: !0,
                        constant: t
                    })
            }
        };
    var yr = {},
        Nr = r("$sce"),
        Cr = {
            HTML: "html",
            CSS: "css",
            URL: "url",
            RESOURCE_URL: "resourceUrl",
            JS: "js"
        },
        Pr = t.createElement("a"),
        Hr = /^\/?.*?:(\/.*)/,
        Br = jr(e.location.href, !0);
    Rr.$inject = ["$provide"],
        zr.$inject = ["$locale"],
        Wr.$inject = ["$locale"];
    var Xr = ".",
        Yr = {
            yyyy: Jr("FullYear", 4),
            yy: Jr("FullYear", 2, 0, !0),
            y: Jr("FullYear", 1),
            MMMM: Kr("Month"),
            MMM: Kr("Month", !0),
            MM: Jr("Month", 2, 1),
            M: Jr("Month", 1, 1),
            dd: Jr("Date", 2),
            d: Jr("Date", 1),
            HH: Jr("Hours", 2),
            H: Jr("Hours", 1),
            hh: Jr("Hours", 2, -12),
            h: Jr("Hours", 1, -12),
            mm: Jr("Minutes", 2),
            m: Jr("Minutes", 1),
            ss: Jr("Seconds", 2),
            s: Jr("Seconds", 1),
            sss: Jr("Milliseconds", 3),
            EEEE: Kr("Day"),
            EEE: Kr("Day", !0),
            a: Gr,
            Z: Qr
        },
        Zr = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
        ei = /^\-?\d+$/;
    ti.$inject = ["$locale"];
    var ri = _(i),
        ii = _(s);
    oi.$inject = ["$parse"];
    var ai = _({
            restrict: "E",
            compile: function (e, n) {
                return a <= 8 && (!n.href && !n.name && n.$set("href", ""), e.append(t.createComment("IE fix"))),


                    function (e, t) {
                        t.on("click", function (e) {
                            t.attr("href") || e.preventDefault()
                        })
                    }
            }
        }),
        fi = {};
    E(nn, function (e, t) {
        if (e == "multiple") return;
        var n = Cn("ng-" + t);
        fi[n] = function () {
            return {
                priority: 100,
                compile: function () {
                    return function (e, r, i) {
                        e.$watch(i[n], function (n) {
                            i.$set(t, !! n)
                        })
                    }
                }
            }
        }
    }),
        E(["src", "srcset", "href"], function (e) {
            var t = Cn("ng-" + e);
            fi[t] = function () {
                return {
                    priority: 99,
                    link: function (n, r, i) {
                        i.$observe(t, function (t) {
                            if (!t) return;
                            i.$set(e, t),
                            a && r.prop(e, i[e])
                        })
                    }
                }
            }
        });
    var li = {
        $addControl: O,
        $removeControl: O,
        $setValidity: O,
        $setDirty: O,
        $setPristine: O
    };
    ci.$inject = ["$element", "$attrs", "$scope"];
    var hi = function (e) {
            return ["$timeout", function (t) {
                var r = {
                    name: "form",
                    restrict: e ? "EAC" : "E",
                    controller: ci,
                    compile: function () {
                        return {
                            pre: function (e, r, i, s) {
                                if (!i.action) {
                                    var o = function (e) {
                                        e.preventDefault ? e.preventDefault() : e.returnValue = !1
                                    };
                                    Pt(r[0], "submit", o),
                                        r.on("$destroy", function () {
                                            t(function () {
                                                Ht(r[0], "submit", o)
                                            }, 0, !1)
                                        })
                                }
                                var u = r.parent().controller("form"),
                                    a = i.name || i.ngForm;
                                a && gr(e, a, s, a),
                                u && r.on("$destroy", function () {
                                    u.$removeControl(s),
                                    a && gr(e, a, n, a),
                                        k(s, li)
                                })
                            }
                        }
                    }
                };
                return r
            }]
        },
        pi = hi(),
        di = hi(!0),
        vi = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        mi = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
        gi = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
        yi = {
            text: bi,
            number: wi,
            url: Ei,
            email: Si,
            radio: xi,
            checkbox: Ti,
            hidden: O,
            button: O,
            submit: O,
            reset: O
        },
        Ni = ["$browser", "$sniffer", function (e, t) {
            return {
                restrict: "E",
                require: "?ngModel",
                link: function (n, r, s, o) {
                    o && (yi[i(s.type)] || yi.text)(n, r, s, o, t, e)
                }
            }
        }],
        Ci = "ng-valid",
        ki = "ng-invalid",
        Li = "ng-pristine",
        Ai = "ng-dirty",
        Oi = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", function (e, t, n, i, s) {
            function c(e, t) {
                t = t ? "-" + Et(t, "-") : "",
                    i.removeClass((e ? ki : Ci) + t).addClass((e ? Ci : ki) + t)
            }
            this.$viewValue = Number.NaN,
                this.$modelValue = Number.NaN,
                this.$parsers = [],
                this.$formatters = [],
                this.$viewChangeListeners = [],
                this.$pristine = !0,
                this.$dirty = !1,
                this.$valid = !0,
                this.$invalid = !1,
                this.$name = n.name;
            var o = s(n.ngModel),
                u = o.assign;
            if (!u) throw r("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", n.ngModel, ht(i));
            this.$render = O,
                this.$isEmpty = function (e) {
                    return D(e) || e === "" || e === null || e !== e
                };
            var a = i.inheritedData("$formController") || li,
                f = 0,
                l = this.$error = {};
            i.addClass(Li),
                c(!0),
                this.$setValidity = function (e, t) {
                    if (l[e] === !t) return;
                    t ? (l[e] && f--, f || (c(!0), this.$valid = !0, this.$invalid = !1)) : (c(!1), this.$invalid = !0, this.$valid = !1, f++),
                        l[e] = !t,
                        c(t, e),
                        a.$setValidity(e, t, this)
                },
                this.$setPristine = function () {
                    this.$dirty = !1,
                        this.$pristine = !0,
                        i.removeClass(Ai).addClass(Li)
                },
                this.$setViewValue = function (n) {
                    this.$viewValue = n,
                    this.$pristine && (this.$dirty = !0, this.$pristine = !1, i.removeClass(Li).addClass(Ai), a.$setDirty()),
                        E(this.$parsers, function (e) {
                            n = e(n)
                        }),
                    this.$modelValue !== n && (this.$modelValue = n, u(e, n), E(this.$viewChangeListeners, function (e) {
                        try {
                            e()
                        } catch (n) {
                            t(n)
                        }
                    }))
                };
            var h = this;
            e.$watch(function () {
                var n = o(e);
                if (h.$modelValue !== n) {
                    var r = h.$formatters,
                        i = r.length;
                    h.$modelValue = n;
                    while (i--) n = r[i](n);
                    h.$viewValue !== n && (h.$viewValue = n, h.$render())
                }
            })
        }],
        Mi = function () {
            return {
                require: ["ngModel", "^?form"],
                controller: Oi,
                link: function (e, t, n, r) {
                    var i = r[0],
                        s = r[1] || li;
                    s.$addControl(i),
                        e.$on("$destroy", function () {
                            s.$removeControl(i)
                        })
                }
            }
        },
        _i = _({
            require: "ngModel",
            link: function (e, t, n, r) {
                r.$viewChangeListeners.push(function () {
                    e.$eval(n.ngChange)
                })
            }
        }),
        Di = function () {
            return {
                require: "?ngModel",
                link: function (e, t, n, r) {
                    if (!r) return;
                    n.required = !0;
                    var i = function (e) {
                        if (n.required && r.$isEmpty(e)) {
                            r.$setValidity("required", !1);
                            return
                        }
                        return r.$setValidity("required", !0),
                            e
                    };
                    r.$formatters.push(i),
                        r.$parsers.unshift(i),
                        n.$observe("required", function () {
                            i(r.$viewValue)
                        })
                }
            }
        },
        Pi = function () {
            return {
                require: "ngModel",
                link: function (e, t, r, i) {
                    var s = /\/(.*)\//.exec(r.ngList),
                        o = s && new RegExp(s[1]) || r.ngList || ",",
                        u = function (e) {
                            if (D(e)) return;
                            var t = [];
                            return e && E(e.split(o), function (e) {
                                e && t.push(V(e))
                            }),
                                t
                        };
                    i.$parsers.push(u),
                        i.$formatters.push(function (e) {
                            return I(e) ? e.join(", ") : n
                        }),
                        i.$isEmpty = function (e) {
                            return !e || !e.length
                        }
                }
            }
        },
        Hi = /^(true|false|\d+)$/,
        Bi = function () {
            return {
                priority: 100,
                compile: function (e, t) {
                    return Hi.test(t.ngValue) ?
                        function (t, n, r) {
                            r.$set("value", t.$eval(r.ngValue))
                        } : function (t, n, r) {
                            t.$watch(r.ngValue, function (t) {
                                r.$set("value", t)
                            })
                        }
                }
            }
        },
        ji = ui(function (e, t, r) {
            t.addClass("ng-binding").data("$binding", r.ngBind),
                e.$watch(r.ngBind, function (r) {
                    t.text(r == n ? "" : r)
                })
        }),
        Fi = ["$interpolate", function (e) {
            return function (t, n, r) {
                var i = e(n.attr(r.$attr.ngBindTemplate));
                n.addClass("ng-binding").data("$binding", i),
                    r.$observe("ngBindTemplate", function (e) {
                        n.text(e)
                    })
            }
        }],
        Ii = ["$sce", "$parse", function (e, t) {
            return function (n, r, i) {
                function o() {
                    return (s(n) || "").toString()
                }
                r.addClass("ng-binding").data("$binding", i.ngBindHtml);
                var s = t(i.ngBindHtml);
                n.$watch(o, function (i) {
                    r.html(e.getTrustedHtml(s(n)) || "")
                })
            }
        }],
        Ri = qi("", !0),
        Ui = qi("Odd", 0),
        zi = qi("Even", 1),
        Wi = ui({
            compile: function (e, t) {
                t.$set("ngCloak", n),
                    e.removeClass("ng-cloak")
            }
        }),
        Xi = [function () {
            return {
                scope: !0,
                controller: "@",
                priority: 500
            }
        }],
        Vi = {};
    E("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (e) {
        var t = Cn("ng-" + e);
        Vi[t] = ["$parse", function (n) {
            return {
                compile: function (r, s) {
                    var o = n(s[t]);
                    return function (t, n, r) {
                        n.on(i(e), function (e) {
                            t.$apply(function () {
                                o(t, {
                                    $event: e
                                })
                            })
                        })
                    }
                }
            }
        }]
    });
    var $i = ["$animate", function (e) {
            return {
                transclude: "element",
                priority: 600,
                terminal: !0,
                restrict: "A",
                $$tlb: !0,
                link: function (n, r, i, s, o) {
                    var u, a;
                    n.$watch(i.ngIf, function (f) {
                        ct(f) ? a || (a = n.$new(), o(a, function (n) {
                                u = {
                                    startNode: n[0],
                                    endNode: n[n.length++] = t.createComment(" end ngIf: " + i.ngIf + " ")
                                },
                                    e.enter(n, r.parent(), r)
                            })) : (a && (a.$destroy(), a = null), u && (e.leave(kt(u)), u = null))
                    })
                }
            }
        }],
        Ji = ["$http", "$templateCache", "$anchorScroll", "$compile", "$animate", "$sce", function (e, t, n, r, i, s) {
            return {
                restrict: "ECA",
                priority: 400,
                terminal: !0,
                transclude: "element",
                compile: function (o, u) {
                    var a = u.ngInclude || u.src,
                        f = u.onload || "",
                        l = u.autoscroll;
                    return function (o, u, c, h, p) {
                        var d = 0,
                            v, m, g = function () {
                                v && (v.$destroy(), v = null),
                                m && (i.leave(m), m = null)
                            };
                        o.$watch(s.parseAsResourceUrl(a), function (a) {
                            var c = function () {
                                    P(l) && (!l || o.$eval(l)) && n()
                                },
                                h = ++d;
                            a ? (e.get(a, {
                                    cache: t
                                }).success(function (e) {
                                    if (h !== d) return;
                                    var t = o.$new(),
                                        n = p(t, O);
                                    g(),
                                        v = t,
                                        m = n,
                                        m.html(e),
                                        i.enter(m, null, u, c),
                                        r(m.contents())(v),
                                        v.$emit("$includeContentLoaded"),
                                        o.$eval(f)
                                }).error(function () {
                                    h === d && g()
                                }), o.$emit("$includeContentRequested")) : g()
                        })
                    }
                }
            }
        }],
        Ki = ui({
            compile: function () {
                return {
                    pre: function (e, t, n) {
                        e.$eval(n.ngInit)
                    }
                }
            }
        }),
        Qi = ui({
            terminal: !0,
            priority: 1e3
        }),
        Gi = ["$locale", "$interpolate", function (e, t) {
            var n = /{}/g;
            return {
                restrict: "EA",
                link: function (r, s, o) {
                    var u = o.count,
                        a = o.$attr.when && s.attr(o.$attr.when),
                        f = o.offset || 0,
                        l = r.$eval(a) || {},
                        c = {},
                        h = t.startSymbol(),
                        p = t.endSymbol(),
                        d = /^when(Minus)?(.+)$/;
                    E(o, function (e, t) {
                        d.test(t) && (l[i(t.replace("when", "").replace("Minus", "-"))] = s.attr(o.$attr[t]))
                    }),
                        E(l, function (e, r) {
                            c[r] = t(e.replace(n, h + u + "-" + f + p))
                        }),
                        r.$watch(function () {
                            var n = parseFloat(r.$eval(u));
                            return isNaN(n) ? "" : (n in l || (n = e.pluralCat(n - f)), c[n](r, s, !0))
                        }, function (t) {
                            s.text(t)
                        })
                }
            }
        }],
        Yi = ["$parse", "$animate", function (e, n) {
            var i = "$$NG_REMOVED",
                s = r("ngRepeat");
            return {
                transclude: "element",
                priority: 1e3,
                terminal: !0,
                $$tlb: !0,
                link: function (r, o, u, a, l) {
                    var c = u.ngRepeat,
                        h = c.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/),
                        p, d, v, m, g, y, b, S, x, T = {
                            $id: un
                        };
                    if (!h) throw s("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", c);
                    y = h[1],
                        b = h[2],
                        p = h[4],
                        p ? (d = e(p), v = function (e, t, n) {
                                return x && (T[x] = e),
                                    T[S] = t,
                                    T.$index = n,
                                    d(r, T)
                            }) : (m = function (e, t) {
                                return un(t)
                            }, g = function (e) {
                                return e
                            }),
                        h = y.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
                    if (!h) throw s("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", y);
                    S = h[3] || h[1],
                        x = h[2];
                    var N = {};
                    r.$watchCollection(b, function (u) {
                        var a, h, p = o[0],
                            d, y = {},
                            b, T, C, k, L, A, O, M, _ = [],
                            D;
                        if (w(u)) O = u,
                            A = v || m;
                        else {
                            A = v || g,
                                O = [];
                            for (C in u) u.hasOwnProperty(C) && C.charAt(0) != "$" && O.push(C);
                            O.sort()
                        }
                        b = O.length,
                            h = _.length = O.length;
                        for (a = 0; a < h; a++) {
                            C = u === O ? a : O[a],
                                k = u[C],
                                L = A(C, k, a),
                                Nt(L, "`track by` id");
                            if (N.hasOwnProperty(L)) M = N[L],
                                delete N[L],
                                y[L] = M,
                                _[a] = M;
                            else {
                                if (y.hasOwnProperty(L)) throw E(_, function (e) {
                                    e && e.startNode && (N[e.id] = e)
                                }),
                                    s("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}", c, L);
                                _[a] = {
                                    id: L
                                },
                                    y[L] = !1
                            }
                        }
                        for (C in N) N.hasOwnProperty(C) && (M = N[C], D = kt(M), n.leave(D), E(D, function (e) {
                            e[i] = !0
                        }), M.scope.$destroy());
                        for (a = 0, h = O.length; a < h; a++) {
                            C = u === O ? a : O[a],
                                k = u[C],
                                M = _[a],
                            _[a - 1] && (p = _[a - 1].endNode);
                            if (M.startNode) {
                                T = M.scope,
                                    d = p;
                                do d = d.nextSibling;
                                while (d && d[i]);
                                M.startNode != d && n.move(kt(M), null, f(p)),
                                    p = M.endNode
                            } else T = r.$new();
                            T[S] = k,
                            x && (T[x] = C),
                                T.$index = a,
                                T.$first = a === 0,
                                T.$last = a === b - 1,
                                T.$middle = !T.$first && !T.$last,
                                T.$odd = !(T.$even = (a & 1) === 0),
                            M.startNode || l(T, function (e) {
                                e[e.length++] = t.createComment(" end ngRepeat: " + c + " "),
                                    n.enter(e, null, f(p)),
                                    p = e,
                                    M.scope = T,
                                    M.startNode = p && p.endNode ? p.endNode : e[0],
                                    M.endNode = e[e.length - 1],
                                    y[M.id] = M
                            })
                        }
                        N = y
                    })
                }
            }
        }],
        Zi = ["$animate", function (e) {
            return function (t, n, r) {
                t.$watch(r.ngShow, function (r) {
                    e[ct(r) ? "removeClass" : "addClass"](n, "ng-hide")
                })
            }
        }],
        es = ["$animate", function (e) {
            return function (t, n, r) {
                t.$watch(r.ngHide, function (r) {
                    e[ct(r) ? "addClass" : "removeClass"](n, "ng-hide")
                })
            }
        }],
        ts = ui(function (e, t, n) {
            e.$watch(n.ngStyle, function (n, r) {
                r && n !== r && E(r, function (e, n) {
                    t.css(n, "")
                }),
                n && t.css(n)
            }, !0)
        }),
        ns = ["$animate", function (e) {
            return {
                restrict: "EA",
                require: "ngSwitch",
                controller: ["$scope", function () {
                    this.cases = {}
                }],
                link: function (t, n, r, i) {
                    var s = r.ngSwitch || r.on,
                        o, u, a = [];
                    t.$watch(s, function (s) {
                        for (var f = 0, l = a.length; f < l; f++) a[f].$destroy(),
                            e.leave(u[f]);
                        u = [],
                            a = [];
                        if (o = i.cases["!" + s] || i.cases["?"]) t.$eval(r.change),
                            E(o, function (n) {
                                var r = t.$new();
                                a.push(r),
                                    n.transclude(r, function (t) {
                                        var r = n.element;
                                        u.push(t),
                                            e.enter(t, r.parent(), r)
                                    })
                            })
                    })
                }
            }
        }],
        rs = ui({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            compile: function (e, t) {
                return function (e, n, r, i, s) {
                    i.cases["!" + t.ngSwitchWhen] = i.cases["!" + t.ngSwitchWhen] || [],
                        i.cases["!" + t.ngSwitchWhen].push({
                            transclude: s,
                            element: n
                        })
                }
            }
        }),
        is = ui({
            transclude: "element",
            priority: 800,
            require: "^ngSwitch",
            link: function (e, t, n, r, i) {
                r.cases["?"] = r.cases["?"] || [],
                    r.cases["?"].push({
                        transclude: i,
                        element: t
                    })
            }
        }),
        ss = ui({
            controller: ["$element", "$transclude", function (e, t) {
                if (!t) throw r("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", ht(e));
                this.$transclude = t
            }],
            link: function (e, t, n, r) {
                r.$transclude(function (e) {
                    t.html(""),
                        t.append(e)
                })
            }
        }),
        os = ["$templateCache", function (e) {
            return {
                restrict: "E",
                terminal: !0,
                compile: function (t, n) {
                    if (n.type == "text/ng-template") {
                        var r = n.id,
                            i = t[0].text;
                        e.put(r, i)
                    }
                }
            }
        }],
        us = r("ngOptions"),
        as = _({
            terminal: !0
        }),
        fs = ["$compile", "$parse", function (e, r) {
            var i = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
                s = {
                    $setViewValue: O
                };
            return {
                restrict: "E",
                require: ["select", "?ngModel"],
                controller: ["$element", "$scope", "$attrs", function (e, t, n) {
                    var r = this,
                        i = {},
                        o = s,
                        u, a;
                    r.databound = n.ngModel,
                        r.init = function (e, t, n) {
                            o = e,
                                u = t,
                                a = n
                        },
                        r.addOption = function (t) {
                            Nt(t, '"option value"'),
                                i[t] = !0,
                            o.$viewValue == t && (e.val(t), a.parent() && a.remove())
                        },
                        r.removeOption = function (e) {
                            this.hasOption(e) && (delete i[e], o.$viewValue == e && this.renderUnknownOption(e))
                        },
                        r.renderUnknownOption = function (t) {
                            var n = "? " + un(t) + " ?";
                            a.val(n),
                                e.prepend(a),
                                e.val(n),
                                a.prop("selected", !0)
                        },
                        r.hasOption = function (e) {
                            return i.hasOwnProperty(e)
                        },
                        t.$on("$destroy", function () {
                            r.renderUnknownOption = O
                        })
                }],
                link: function (s, o, u, a) {
                    function T(e, t, n, r) {
                        n.$render = function () {
                            var e = n.$viewValue;
                            r.hasOption(e) ? (y.parent() && y.remove(), t.val(e), e === "" && v.prop("selected", !0)) : D(e) && v ? t.val("") : r.renderUnknownOption(e)
                        },
                            t.on("change", function () {
                                e.$apply(function () {
                                    y.parent() && y.remove(),
                                        n.$setViewValue(t.val())
                                })
                            })
                    }
                    function N(e, t, n) {
                        var r;
                        n.$render = function () {
                            var e = new an(n.$viewValue);
                            E(t.find("option"), function (t) {
                                t.selected = P(e.get(t.value))
                            })
                        },
                            e.$watch(function () {
                                rt(r, n.$viewValue) || (r = tt(n.$viewValue), n.$render())
                            }),
                            t.on("change", function () {
                                e.$apply(function () {
                                    var e = [];
                                    E(t.find("option"), function (t) {
                                        t.selected && e.push(t.value)
                                    }),
                                        n.$setViewValue(e)
                                })
                            })
                    }
                    function C(t, s, o) {
                        function x() {
                            var e = {
                                    "": []
                                },
                                n = [""],
                                r, i, u, p, b, x, T = o.$modelValue,
                                N = y(t) || [],
                                C = l ? S(N) : N,
                                k, L, A, O, M, _ = {},
                                D, H = !1,
                                B, j, F;
                            if (h) if (w && I(T)) {
                                H = new an([]);
                                for (var q = 0; q < T.length; q++) _[f] = T[q],
                                    H.put(w(t, _), T[q])
                            } else H = new an(T);
                            for (M = 0; A = C.length, M < A; M++) {
                                k = M;
                                if (l) {
                                    k = C[M];
                                    if (k.charAt(0) === "$") continue;
                                    _[l] = k
                                }
                                _[f] = N[k],
                                    r = c(t, _) || "",
                                (i = e[r]) || (i = e[r] = [], n.push(r));
                                if (h) D = P(H.remove(w ? w(t, _) : v(t, _)));
                                else {
                                    if (w) {
                                        var R = {};
                                        R[f] = T,
                                            D = w(t, R) === w(t, _)
                                    } else D = T === v(t, _);
                                    H = H || D
                                }
                                F = a(t, _),
                                    F = P(F) ? F : "",
                                    i.push({
                                        id: w ? w(t, _) : l ? C[M] : M,
                                        label: F,
                                        selected: D
                                    })
                            }
                            h || (d || T === null ? e[""].unshift({
                                    id: "",
                                    label: "",
                                    selected: !H
                                }) : H || e[""].unshift({
                                    id: "?",
                                    label: "",
                                    selected: !0
                                }));
                            for (O = 0, L = n.length; O < L; O++) {
                                r = n[O],
                                    i = e[r],
                                    E.length <= O ? (p = {
                                            element: g.clone().attr("label", r),
                                            label: i.label
                                        }, b = [p], E.push(b), s.append(p.element)) : (b = E[O], p = b[0], p.label != r && p.element.attr("label", p.label = r)),
                                    B = null;
                                for (M = 0, A = i.length; M < A; M++) u = i[M],
                                    (x = b[M + 1]) ? (B = x.element, x.label !== u.label && B.text(x.label = u.label), x.id !== u.id && B.val(x.id = u.id), x.selected !== u.selected && B.prop("selected", x.selected = u.selected)) : (u.id === "" && d ? j = d : (j = m.clone()).val(u.id).attr("selected", u.selected).text(u.label), b.push(x = {
                                            element: j,
                                            label: u.label,
                                            id: u.id,
                                            selected: u.selected
                                        }), B ? B.after(j) : p.element.append(j), B = j);
                                M++;
                                while (b.length > M) b.pop().element.remove()
                            }
                            while (E.length > O) E.pop()[0].element.remove()
                        }
                        var u;
                        if (!(u = p.match(i))) throw us("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", p, ht(s));
                        var a = r(u[2] || u[1]),
                            f = u[4] || u[6],
                            l = u[5],
                            c = r(u[3] || ""),
                            v = r(u[2] ? u[1] : f),
                            y = r(u[7]),
                            b = u[8],
                            w = b ? r(u[8]) : null,
                            E = [
                                [{
                                    element: s,
                                    label: ""
                                }]
                            ];
                        d && (e(d)(t), d.removeClass("ng-scope"), d.remove()),
                            s.empty(),
                            s.on("change", function () {
                                t.$apply(function () {
                                    var e, r = y(t) || [],
                                        i = {},
                                        u, a, c, p, d, m, g, b;
                                    if (h) {
                                        a = [];
                                        for (d = 0, g = E.length; d < g; d++) {
                                            e = E[d];
                                            for (p = 1, m = e.length; p < m; p++) if ((c = e[p].element)[0].selected) {
                                                u = c.val(),
                                                l && (i[l] = u);
                                                if (w) for (b = 0; b < r.length; b++) {
                                                    i[f] = r[b];
                                                    if (w(t, i) == u) break
                                                } else i[f] = r[u];
                                                a.push(v(t, i))
                                            }
                                        }
                                    } else {
                                        u = s.val();
                                        if (u == "?") a = n;
                                        else if (u === "") a = null;
                                        else if (w) for (b = 0; b < r.length; b++) {
                                            i[f] = r[b];
                                            if (w(t, i) == u) {
                                                a = v(t, i);
                                                break
                                            }
                                        } else i[f] = r[u],
                                        l && (i[l] = u),
                                            a = v(t, i);
                                        E[0].length > 1 && E[0][1].id !== u && (E[0][1].selected = !1)
                                    }
                                    o.$setViewValue(a)
                                })
                            }),
                            o.$render = x,
                            t.$watch(x)
                    }
                    if (!a[1]) return;
                    var l = a[0],
                        c = a[1],
                        h = u.multiple,
                        p = u.ngOptions,
                        d = !1,
                        v, m = f(t.createElement("option")),
                        g = f(t.createElement("optgroup")),
                        y = m.clone();
                    for (var b = 0, w = o.children(), x = w.length; b < x; b++) if (w[b].value === "") {
                        v = d = w.eq(b);
                        break
                    }
                    l.init(c, d, y),
                    h && (c.$isEmpty = function (e) {
                        return !e || e.length === 0
                    }),
                        p ? C(s, o, c) : h ? N(s, o, c) : T(s, o, c, l)
                }
            }
        }],
        ls = ["$interpolate", function (e) {
            var t = {
                addOption: O,
                removeOption: O
            };
            return {
                restrict: "E",
                priority: 100,
                compile: function (n, r) {
                    if (D(r.value)) {
                        var i = e(n.text(), !0);
                        i || r.$set("value", n.text())
                    }
                    return function (e, n, r) {
                        var s = "$selectController",
                            o = n.parent(),
                            u = o.data(s) || o.parent().data(s);
                        u && u.databound ? n.prop("selected", !1) : u = t,
                            i ? e.$watch(i, function (t, n) {
                                    r.$set("value", t),
                                    t !== n && u.removeOption(n),
                                        u.addOption(t)
                                }) : u.addOption(r.value),
                            n.on("$destroy", function () {
                                u.removeOption(r.value)
                            })
                    }
                }
            }
        }],
        cs = _({
            restrict: "E",
            terminal: !0
        });
    St(),
        Ot(m),
        f(t).ready(function () {
            yt(t, bt)
        })
})(window, document);
