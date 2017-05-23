(function (e, t, n) {
    "use strict";
    t.module("ngAnimate", ["ng"]).config(["$provide", "$animateProvider", function (r, i) {
        var s = t.noop,
            o = t.forEach,
            u = i.$$selectors,
            a = 1,
            f = "$$ngAnimateState",
            l = "ng-animate",
            c = {
                running: !0
            };
        r.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement", "$timeout", "$rootScope", "$document", function (e, n, r, i, h, p, d) {
            function v(e) {
                if (e) {
                    var t = [],
                        i = {};
                    e = e.substr(1).split("."),
                    (r.transitions || r.animations) && e.push("");
                    for (var s = 0; s < e.length; s++) {
                        var o = e[s],
                            a = u[o];
                        a && !i[o] && (t.push(n.get(a)), i[o] = !0)
                    }
                    return t
                }
            }
            function g(e, t, n, r, i, u, a) {
                function c(e) {
                    m();
                    if (!0 === e) g();
                    else {
                        if (e = n.data(f)) e.done = g,
                            n.data(f, e);
                        p(T, "after", g)
                    }
                }
                function p(r, i, u) {
                    var a = i + "End";
                    o(r, function (o, f) {
                        var l = function () {
                            e: {
                                var e = i + "Complete",
                                    t = r[f];
                                t[e] = !0,
                                    (t[a] || s)();
                                for (t = 0; t < r.length; t++) if (!r[t][e]) break e;
                                u()
                            }
                        };
                        "before" != i || "enter" != e && "move" != e ? o[i] ? o[a] = x ? o[i](n, t, l) : o[i](n, l) : l() : l()
                    })
                }
                function d() {
                    a && h(a, 0, !1)
                }
                function m() {
                    m.hasBeenRun || (m.hasBeenRun = !0, u())
                }
                function g() {
                    if (!g.hasBeenRun) {
                        g.hasBeenRun = !0;
                        var e = n.data(f);
                        e && (x ? w(n) : (e.closeAnimationTimeout = h(function () {
                                w(n)
                            }, 0, !1), n.data(f, e))),
                            d()
                    }
                }
                var y = n.attr("class") || "",
                    S = (" " + (y + " " + t)).replace(/\s+/g, ".");
                r || (r = i ? i.parent() : n.parent());
                var S = v(S),
                    x = "addClass" == e || "removeClass" == e;
                i = n.data(f) || {};
                if (E(n, r) || 0 === S.length) m(),
                    g();
                else {
                    var T = [];
                    i.running && x && i.structural || o(S, function (r) {
                        if (!r.allowCancel || r.allowCancel(n, e, t)) {
                            var i = r[e];
                            "leave" == e ? (r = i, i = null) : r = r["before" + e.charAt(0).toUpperCase() + e.substr(1)],
                                T.push({
                                    before: r,
                                    after: i
                                })
                        }
                    }),
                        0 === T.length ? (m(), d()) : (r = " " + y + " ", i.running && (h.cancel(i.closeAnimationTimeout), w(n), b(i.animations), i.beforeComplete ? (i.done || s)(!0) : x && !i.structural && (r = "removeClass" == i.event ? r.replace(i.className, "") : r + i.className + " ")), y = " " + t + " ", "addClass" == e && 0 <= r.indexOf(y) || "removeClass" == e && -1 == r.indexOf(y) ? (m(), d()) : (n.addClass(l), n.data(f, {
                                    running: !0,
                                    event: e,
                                    className: t,
                                    structural: !x,
                                    animations: T,
                                    done: c
                                }), p(T, "before", c)))
                }
            }
            function y(e) {
                e = e[0],
                e.nodeType == a && o(e.querySelectorAll("." + l), function (e) {
                    e = t.element(e);
                    var n = e.data(f);
                    n && (b(n.animations), w(e))
                })
            }
            function b(e) {
                o(e, function (t) {
                    e.beforeComplete || (t.beforeEnd || s)(!0),
                    e.afterComplete || (t.afterEnd || s)(!0)
                })
            }
            function w(e) {
                e[0] == i[0] ? c.disabled || (c.running = !1, c.structural = !1) : (e.removeClass(l), e.removeData(f))
            }
            function E(e, t) {
                if (c.disabled) return !0;
                if (e[0] == i[0]) return c.disabled || c.running;
                do {
                    if (0 === t.length) break;
                    var n = t[0] == i[0],
                        r = n ? c : t.data(f),
                        r = r && ( !! r.disabled || !! r.running);
                    if (n || r) return r;
                    if (n) break
                } while (t = t.parent());
                return !0
            }
            return i.data(f, c),
                p.$$postDigest(function () {
                    c.running = !1
                }),
                {
                    enter: function (t, n, r, i) {
                        this.enabled(!1, t),
                            e.enter(t, n, r),
                            p.$$postDigest(function () {
                                g("enter", "ng-enter", t, n, r, s, i)
                            })
                    },
                    leave: function (t, n) {
                        y(t),
                            this.enabled(!1, t),
                            p.$$postDigest(function () {
                                g("leave", "ng-leave", t, null, null, function () {
                                    e.leave(t)
                                }, n)
                            })
                    },
                    move: function (t, n, r, i) {
                        y(t),
                            this.enabled(!1, t),
                            e.move(t, n, r),
                            p.$$postDigest(function () {
                                g("move", "ng-move", t, n, r, s, i)
                            })
                    },
                    addClass: function (t, n, r) {
                        g("addClass", n, t, null, null, function () {
                            e.addClass(t, n)
                        }, r)
                    },
                    removeClass: function (t, n, r) {
                        g("removeClass", n, t, null, null, function () {
                            e.removeClass(t, n)
                        }, r)
                    },
                    enabled: function (e, t) {
                        switch (arguments.length) {
                            case 2:
                                if (e) w(t);
                                else {
                                    var n = t.data(f) || {};
                                    n.disabled = !0,
                                        t.data(f, n)
                                }
                                break;
                            case 1:
                                c.disabled = !e;
                                break;
                            default:
                                e = !c.disabled
                        }
                        return !!e
                    }
                }
        }]),
            i.register("", ["$window", "$sniffer", "$timeout", function (r, i, u) {
                function f(e) {
                    U.push(e),
                        u.cancel(z),
                        z = u(function () {
                            o(U, function (e) {
                                e()
                            }),
                                U = [],
                                z = null,
                                I = {}
                        }, 10, !1)
                }
                function l(e, t) {
                    var n = t ? I[t] : null;
                    if (!n) {
                        var i = 0,
                            s = 0,
                            u = 0,
                            f = 0,
                            l, h, p, d;
                        o(e, function (e) {
                            if (e.nodeType == a) {
                                e = r.getComputedStyle(e) || {},
                                    p = e[x + A],
                                    i = Math.max(c(p), i),
                                    d = e[x + O],
                                    l = e[x + M],
                                    s = Math.max(c(l), s),
                                    h = e[C + M],
                                    f = Math.max(c(h), f);
                                var t = c(e[C + A]);
                                0 < t && (t *= parseInt(e[C + _], 10) || 1),
                                    u = Math.max(t, u)
                            }
                        }),
                            n = {
                                total: 0,
                                transitionPropertyStyle: d,
                                transitionDurationStyle: p,
                                transitionDelayStyle: l,
                                transitionDelay: s,
                                transitionDuration: i,
                                animationDelayStyle: h,
                                animationDelay: f,
                                animationDuration: u
                            },
                        t && (I[t] = n)
                    }
                    return n
                }
                function c(e) {
                    var n = 0;
                    return e = t.isString(e) ? e.split(/\s*,\s*/) : [],
                        o(e, function (e) {
                            n = Math.max(parseFloat(e) || 0, n)
                        }),
                        n
                }
                function h(e) {
                    var t = e.parent(),
                        n = t.data(P);
                    return n || (t.data(P, ++R), n = R),
                    n + "-" + e[0].className
                }
                function p(e, t) {
                    var n = h(e),
                        r = n + " " + t,
                        i = {},
                        s = I[r] ? ++I[r].total : 0;
                    if (0 < s) {
                        var u = t + "-stagger",
                            i = n + " " + u;
                        (n = !I[i]) && e.addClass(u),
                            i = l(e, i),
                        n && e.removeClass(u)
                    }
                    e.addClass(t),
                        r = l(e, r),
                        u = Math.max(r.transitionDuration, r.animationDuration);
                    if (0 === u) return e.removeClass(t),
                        !1;
                    var a = "";
                    return 0 < r.transitionDuration ? (e.addClass(j), a += F + " ", e[0].style[x + O] = "none") : e[0].style[C] = "none 0s",
                        o(t.split(" "), function (e, t) {
                            a += (0 < t ? " " : "") + e + "-active"
                        }),
                        e.data(H, {
                            className: t,
                            activeClassName: a,
                            maxDuration: u,
                            classes: t + " " + a,
                            timings: r,
                            stagger: i,
                            ii: s
                        }),
                        !0
                }
                function d(e) {
                    e = e[0];
                    var t = x + O;
                    e.style[t] && 0 < e.style[t].length && (e.style[t] = "")
                }
                function v(e, t, n) {
                    function r(e) {
                        e.stopPropagation(),
                            e = e.originalEvent || e;
                        var t = e.$manualTimeStamp || e.timeStamp || Date.now();
                        Math.max(t - h, 0) >= c && e.elapsedTime >= f && n()
                    }
                    var s = e.data(H);
                    if (e.hasClass(t) && s) {
                        var o = e[0],
                            u = s.timings,
                            a = s.stagger,
                            f = s.maxDuration,
                            l = s.activeClassName,
                            c = 1e3 * Math.max(u.transitionDelay, u.animationDelay),
                            h = Date.now(),
                            p = L + " " + N,
                            d = s.ii,
                            v, s = "",
                            g = [];
                        if (0 < u.transitionDuration) {
                            var y = u.transitionPropertyStyle; - 1 == y.indexOf("all") && (v = !0, s += S + "transition-property: " + y + ", " + (i.msie ? "-ms-zoom" : "border-spacing") + "; ", s += S + "transition-duration: " + u.transitionDurationStyle + ", " + u.transitionDuration + "s; ", g.push(S + "transition-property"), g.push(S + "transition-duration"))
                        } else e[0].style[C] = "";
                        return 0 < d && (0 < a.transitionDelay && 0 === a.transitionDuration && (y = u.transitionDelayStyle, v && (y += ", " + u.transitionDelay + "s"), s += S + "transition-delay: " + m(y, a.transitionDelay, d) + "; ", g.push(S + "transition-delay")), 0 < a.animationDelay && 0 === a.animationDuration && (s += S + "animation-delay: " + m(u.animationDelayStyle, a.animationDelay, d) + "; ", g.push(S + "animation-delay"))),
                        0 < g.length && (u = o.getAttribute("style") || "", o.setAttribute("style", u + " " + s)),
                            e.on(p, r),
                            e.addClass(l),


                            function (n) {
                                e.off(p, r),
                                    e.removeClass(l),
                                    w(e, t);
                                for (var i in g) o.style.removeProperty(g[i])
                            }
                    }
                    n()
                }
                function m(e, t, n) {
                    var r = "";
                    return o(e.split(","), function (e, i) {
                        r += (0 < i ? "," : "") + (n * t + parseInt(e, 10)) + "s"
                    }),
                        r
                }
                function g(e, t) {
                    if (p(e, t)) return function (n) {
                        n && w(e, t)
                    }
                }
                function y(e, t, n) {
                    if (e.data(H)) return v(e, t, n);
                    w(e, t),
                        n()
                }
                function b(e, t, n) {
                    var r = g(e, t);
                    if (r) {
                        var i = r;
                        return f(function () {
                            d(e),
                                i = y(e, t, n)
                        }),


                            function (e) {
                                (i || s)(e)
                            }
                    }
                    n()
                }
                function w(e, t) {
                    e.removeClass(t),
                        e.removeClass(j),
                        e.removeData(H)
                }
                function E(e, n) {
                    var r = "";
                    return e = t.isArray(e) ? e : e.split(/\s+/),
                        o(e, function (e, t) {
                            e && 0 < e.length && (r += (0 < t ? " " : "") + e + n)
                        }),
                        r
                }
                var S = "",
                    x, N, C, L;
                e.ontransitionend === n && e.onwebkittransitionend !== n ? (S = "-webkit-", x = "WebkitTransition", N = "webkitTransitionEnd transitionend") : (x = "transition", N = "transitionend"),
                    e.onanimationend === n && e.onwebkitanimationend !== n ? (S = "-webkit-", C = "WebkitAnimation", L = "webkitAnimationEnd animationend") : (C = "animation", L = "animationend");
                var A = "Duration",
                    O = "Property",
                    M = "Delay",
                    _ = "IterationCount",
                    P = "$$ngAnimateKey",
                    H = "$$ngAnimateCSS3Data",
                    j = "ng-animate-start",
                    F = "ng-animate-active",
                    I = {},
                    R = 0,
                    U = [],
                    z;
                return {
                    allowCancel: function (e, n, r) {
                        var i = (e.data(H) || {}).classes;
                        if (!i || 0 <= ["enter", "leave", "move"].indexOf(n)) return !0;
                        var s = e.parent(),
                            u = t.element(e[0].cloneNode());
                        return u.attr("style", "position:absolute; top:-9999px; left:-9999px"),
                            u.removeAttr("id"),
                            u.html(""),
                            o(i.split(" "), function (e) {
                                u.removeClass(e)
                            }),
                            u.addClass(E(r, "addClass" == n ? "-add" : "-remove")),
                            s.append(u),
                            e = l(u),
                            u.remove(),
                        0 < Math.max(e.transitionDuration, e.animationDuration)
                    },
                    enter: function (e, t) {
                        return b(e, "ng-enter", t)
                    },
                    leave: function (e, t) {
                        return b(e, "ng-leave", t)
                    },
                    move: function (e, t) {
                        return b(e, "ng-move", t)
                    },
                    beforeAddClass: function (e, t, n) {
                        if (t = g(e, E(t, "-add"))) return f(function () {
                            d(e),
                                n()
                        }),
                            t;
                        n()
                    },
                    addClass: function (e, t, n) {
                        return y(e, E(t, "-add"), n)
                    },
                    beforeRemoveClass: function (e, t, n) {
                        if (t = g(e, E(t, "-remove"))) return f(function () {
                            d(e),
                                n()
                        }),
                            t;
                        n()
                    },
                    removeClass: function (e, t, n) {
                        return y(e, E(t, "-remove"), n)
                    }
                }
            }])
    }])
})(window, window.angular);