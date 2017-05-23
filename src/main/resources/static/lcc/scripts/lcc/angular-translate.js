angular.module("pascalprecht.translate", ["ng"]).run(["$translate", function (e) {
    var t = e.storageKey(),
        n = e.storage();
    n ? n.get(t) ? e.use(n.get(t)) : angular.isString(e.preferredLanguage()) ? e.use(e.preferredLanguage()) : n.set(t, e.use()) : angular.isString(e.preferredLanguage()) && e.use(e.preferredLanguage())
}]),
    angular.module("pascalprecht.translate").provider("$translate", ["$STORAGE_KEY", function (e) {
        var t = {},
            n, r = [],
            i, s, o, u, a, f, l = e,
            c, h, p, d = [],
            v = !1,
            m, g = "translate-cloak",
            y, b, w, E = !1,
            S = ".",
            x = function () {
                var e = window.navigator;
                return (e.language || e.browserLanguage || e.systemLanguage || e.userLanguage || "").split("-").join("_")
            },
            T = function (e) {
                var t = [],
                    n = angular.lowercase(e),
                    s = 0,
                    o = r.length;
                for (; s < o; s++) t.push(angular.lowercase(r[s]));
                if (t.indexOf(n) > -1) return e;
                if (i) {
                    var u;
                    for (var a in i) {
                        var f = !1,
                            l = i.hasOwnProperty(a) && angular.lowercase(a) === angular.lowercase(e);
                        a.slice(-1) === "*" && (f = a.slice(0, -1) === e.slice(0, a.length - 1));
                        if (l || f) {
                            u = i[a];
                            if (t.indexOf(angular.lowercase(u)) > -1) return u
                        }
                    }
                }
                var c = e.split("_");
                return c.length > 1 && t.indexOf(angular.lowercase(c[0])) > -1 ? c[0] : e
            },
            N = function (e, n) {
                if (!e && !n) return t;
                if (e && !n) {
                    if (angular.isString(e)) return t[e]
                } else angular.isObject(t[e]) || (t[e] = {}),
                    angular.extend(t[e], C(n));
                return this
            };
        this.translations = N,
            this.cloakClassName = function (e) {
                return e ? (g = e, this) : g
            };
        var C = function (e, t, n, r) {
            var i, s, o, u;
            t || (t = []),
            n || (n = {});
            for (i in e) {
                if (!e.hasOwnProperty(i)) continue;
                u = e[i],
                    angular.isObject(u) ? C(u, t.concat(i), n, i) : (s = t.length ? "" + t.join(S) + S + i : i, t.length && i === r && (o = "" + t.join(S), n[o] = "@:" + s), n[s] = u)
            }
            return n
        };
        this.addInterpolation = function (e) {
            return d.push(e),
                this
        },
            this.useMessageFormatInterpolation = function () {
                return this.useInterpolation("$translateMessageFormatInterpolation")
            },
            this.useInterpolation = function (e) {
                return p = e,
                    this
            },
            this.useSanitizeValueStrategy = function (e) {
                return v = e,
                    this
            },
            this.preferredLanguage = function (e) {
                return e ? (n = e, this) : n
            },
            this.translationNotFoundIndicator = function (e) {
                return this.translationNotFoundIndicatorLeft(e),
                    this.translationNotFoundIndicatorRight(e),
                    this
            },
            this.translationNotFoundIndicatorLeft = function (e) {
                return e ? (b = e, this) : b
            },
            this.translationNotFoundIndicatorRight = function (e) {
                return e ? (w = e, this) : w
            },
            this.fallbackLanguage = function (e) {
                return k(e),
                    this
            };
        var k = function (e) {
            return e ? (angular.isString(e) ? (o = !0, s = [e]) : angular.isArray(e) && (o = !1, s = e), angular.isString(n) && s.push(n), this) : o ? s[0] : s
        };
        this.use = function (e) {
            if (e) {
                if (!t[e] && !m) throw new Error("$translateProvider couldn't find translationTable for langKey: '" + e + "'");
                return u = e,
                    this
            }
            return u
        };
        var L = function (e) {
            if (!e) return c ? c + l : l;
            l = e
        };
        this.storageKey = L,
            this.useUrlLoader = function (e) {
                return this.useLoader("$translateUrlLoader", {
                    url: e
                })
            },
            this.useStaticFilesLoader = function (e) {
                return this.useLoader("$translateStaticFilesLoader", e)
            },
            this.useLoader = function (e, t) {
                return m = e,
                    y = t || {},
                    this
            },
            this.useLocalStorage = function () {
                return this.useStorage("$translateLocalStorage")
            },
            this.useCookieStorage = function () {
                return this.useStorage("$translateCookieStorage")
            },
            this.useStorage = function (e) {
                return f = e,
                    this
            },
            this.storagePrefix = function (e) {
                return e ? (c = e, this) : e
            },
            this.useMissingTranslationHandlerLog = function () {
                return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
            },
            this.useMissingTranslationHandler = function (e) {
                return h = e,
                    this
            },
            this.usePostCompiling = function (e) {
                return E = !! e,
                    this
            },
            this.determinePreferredLanguage = function (e) {
                var t = e && angular.isFunction(e) ? e() : x();
                return r.length ? n = T(t) : n = t,
                    this
            },
            this.registerAvailableLanguageKeys = function (e, t) {
                return e ? (r = e, t && (i = t), this) : r
            },
            this.$get = ["$log", "$injector", "$rootScope", "$q", function (e, r, i, c) {
                var S, x = r.get(p || "$translateDefaultInterpolation"),
                    A = !1,
                    O = {},
                    M = {},
                    _, D, P = function (e, t, r) {
                        if (angular.isArray(e)) {
                            var i = function (e) {
                                var n = {},
                                    i = [],
                                    s = function (e) {
                                        var i = c.defer(),
                                            s = function (t) {
                                                n[e] = t,
                                                    i.resolve([e, t])
                                            };
                                        return P(e, t, r).then(s, s),
                                            i.promise
                                    };
                                for (var o = 0, u = e.length; o < u; o++) i.push(s(e[o]));
                                return c.all(i).then(function () {
                                    return n
                                })
                            };
                            return i(e)
                        }
                        var o = c.defer();
                        e && (e = e.trim());
                        var a = function () {
                            var e = n ? M[n] : M[u];
                            _ = 0;
                            if (f && !e) {
                                var t = S.get(l);
                                e = M[t];
                                if (s && s.length) {
                                    var r = H(s, t);
                                    _ = r > -1 ? r += 1 : 0,
                                        s.push(n)
                                }
                            }
                            return e
                        }();
                        return a ? a.then(function () {
                                V(e, t, r).then(o.resolve, o.reject)
                            }, o.reject) : V(e, t, r).then(o.resolve, o.reject),
                            o.promise
                    },
                    H = function (e, t) {
                        for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                        return -1
                    },
                    B = function (e) {
                        return b && (e = [b, e].join(" ")),
                        w && (e = [e, w].join(" ")),
                            e
                    },
                    j = function (e) {
                        u = e,
                            i.$emit("$translateChangeSuccess"),
                        f && S.set(P.storageKey(), u),
                            x.setLocale(u),
                            angular.forEach(O, function (e, t) {
                                O[t].setLocale(u)
                            }),
                            i.$emit("$translateChangeEnd")
                    },
                    F = function (e) {
                        if (!e) throw "No language key specified for loading.";
                        var t = c.defer();
                        return i.$emit("$translateLoadingStart"),
                            A = !0,
                            r.get(m)(angular.extend(y, {
                                key: e
                            })).then(function (n) {
                                var r = {};
                                i.$emit("$translateLoadingSuccess"),
                                    angular.isArray(n) ? angular.forEach(n, function (e) {
                                            angular.extend(r, C(e))
                                        }) : angular.extend(r, C(n)),
                                    A = !1,
                                    t.resolve({
                                        key: e,
                                        table: r
                                    }),
                                    i.$emit("$translateLoadingEnd")
                            }, function (e) {
                                i.$emit("$translateLoadingError"),
                                    t.reject(e),
                                    i.$emit("$translateLoadingEnd")
                            }),
                            t.promise
                    };
                if (f) {
                    S = r.get(f);
                    if (!S.get || !S.set) throw new Error("Couldn't use storage '" + f + "', missing get() or set() method!")
                }
                angular.isFunction(x.useSanitizeValueStrategy) && x.useSanitizeValueStrategy(v),
                d.length && angular.forEach(d, function (e) {
                    var t = r.get(e);
                    t.setLocale(n || u),
                    angular.isFunction(t.useSanitizeValueStrategy) && t.useSanitizeValueStrategy(v),
                        O[t.getInterpolationIdentifier()] = t
                });
                var I = function (e) {
                        var n = c.defer();
                        return t.hasOwnProperty(e) ? (n.resolve(t[e]), n.promise) : (M[e].then(function (e) {
                                N(e.key, e.table),
                                    n.resolve(e.table)
                            }, n.reject), n.promise)
                    },
                    q = function (e, t, n, r) {
                        var i = c.defer();
                        return I(e).then(function (s) {
                            s.hasOwnProperty(t) ? (r.setLocale(e), i.resolve(r.interpolate(s[t], n)), r.setLocale(u)) : i.reject()
                        }, i.reject),
                            i.promise
                    },
                    R = function (e, n, r, i) {
                        var s, o = t[e];
                        return o.hasOwnProperty(n) && (i.setLocale(e), s = i.interpolate(o[n], r), i.setLocale(u)),
                            s
                    },
                    U = function (e, t, n, i) {
                        var o = c.defer();
                        if (e < s.length) {
                            var a = s[e];
                            q(a, t, n, i).then(function (e) {
                                o.resolve(e)
                            }, function () {
                                var r = U(e + 1, t, n, i);
                                o.resolve(r)
                            })
                        } else if (h) {
                            var f = r.get(h)(t, u);
                            f !== undefined ? o.resolve(f) : o.resolve(t)
                        } else o.resolve(t);
                        return o.promise
                    },
                    z = function (e, t, n, r) {
                        var i;
                        if (e < s.length) {
                            var o = s[e];
                            i = R(o, t, n, r),
                            i || (i = z(e + 1, t, n, r))
                        }
                        return i
                    },
                    W = function (e, t, n) {
                        return U(D > 0 ? D : _, e, t, n)
                    },
                    X = function (e, t, n) {
                        return z(D > 0 ? D : _, e, t, n)
                    },
                    V = function (e, n, i) {
                        var o = c.defer(),
                            a = u ? t[u] : t,
                            f = i ? O[i] : x;
                        if (a && a.hasOwnProperty(e)) {
                            var l = a[e];
                            l.substr(0, 2) === "@:" ? P(l.substr(2), n, i).then(o.resolve, o.reject) : o.resolve(f.interpolate(l, n))
                        } else h && !A && r.get(h)(e, u),
                            u && s && s.length ? W(e, n, f).then(function (e) {
                                    o.resolve(e)
                                }, function (e) {
                                    o.reject(B(e))
                                }) : o.reject(B(e));
                        return o.promise
                    },
                    $ = function (e, n, i) {
                        var o, a = u ? t[u] : t,
                            f = i ? O[i] : x;
                        if (a && a.hasOwnProperty(e)) {
                            var l = a[e];
                            l.substr(0, 2) === "@:" ? o = $(l.substr(2), n, i) : o = f.interpolate(l, n)
                        } else h && !A && r.get(h)(e, u),
                            u && s && s.length ? (_ = 0, o = X(e, n, f)) : o = B(e);
                        return o
                    };
                P.preferredLanguage = function () {
                    return n
                },
                    P.cloakClassName = function () {
                        return g
                    },
                    P.fallbackLanguage = function (e) {
                        if (e !== undefined && e !== null) {
                            k(e);
                            if (m && s && s.length) for (var t = 0, n = s.length; t < n; t++) M[s[t]] || (M[s[t]] = F(s[t]));
                            P.use(P.use())
                        }
                        return o ? s[0] : s
                    },
                    P.useFallbackLanguage = function (e) {
                        if (e !== undefined && e !== null) if (!e) D = 0;
                        else {
                            var t = H(s, e);
                            t > -1 && (D = t)
                        }
                    },
                    P.proposedLanguage = function () {
                        return a
                    },
                    P.storage = function () {
                        return S
                    },
                    P.use = function (e) {
                        if (!e) return u;
                        var n = c.defer();
                        i.$emit("$translateChangeStart");
                        var r = T(e);
                        return r && (e = r),
                            !t[e] && m ? (a = e, M[e] = F(e).then(function (t) {
                                    N(t.key, t.table),
                                        n.resolve(t.key),
                                    a === e && (j(t.key), a = undefined)
                                }, function (e) {
                                    a = undefined,
                                        i.$emit("$translateChangeError"),
                                        n.reject(e),
                                        i.$emit("$translateChangeEnd")
                                })) : (n.resolve(e), j(e)),
                            n.promise
                    },
                    P.storageKey = function () {
                        return L()
                    },
                    P.isPostCompilingEnabled = function () {
                        return E
                    },
                    P.refresh = function (e) {
                        function r() {
                            n.resolve(),
                                i.$emit("$translateRefreshEnd")
                        }
                        function o() {
                            n.reject(),
                                i.$emit("$translateRefreshEnd")
                        }
                        if (!m) throw new Error("Couldn't refresh translation table, no loader registered!");
                        var n = c.defer();
                        i.$emit("$translateRefreshStart");
                        if (!e) {
                            var a = [];
                            if (s && s.length) for (var f = 0, l = s.length; f < l; f++) a.push(F(s[f]));
                            u && a.push(F(u)),
                                c.all(a).then(function (e) {
                                    angular.forEach(e, function (e) {
                                        t[e.key] && delete t[e.key],
                                            N(e.key, e.table)
                                    }),
                                    u && j(u),
                                        r()
                                })
                        } else t[e] ? F(e).then(function (t) {
                                N(t.key, t.table),
                                e === u && j(u),
                                    r()
                            }, o) : o();
                        return n.promise
                    },
                    P.instant = function (e, i, o) {
                        if (e === null || angular.isUndefined(e)) return e;
                        if (angular.isArray(e)) {
                            var a = {};
                            for (var f = 0, l = e.length; f < l; f++) a[e[f]] = P.instant(e[f], i, o);
                            return a
                        }
                        if (angular.isString(e) && e.length < 1) return e;
                        e && (e = e.trim());
                        var c, p = [];
                        n && p.push(n),
                        u && p.push(u),
                        s && s.length && (p = p.concat(s));
                        for (var d = 0, v = p.length; d < v; d++) {
                            var m = p[d];
                            t[m] && typeof t[m][e] != "undefined" && (c = $(e, i, o));
                            if (typeof c != "undefined") break
                        }
                        return !c && c !== "" && (c = e, h && !A && r.get(h)(e, u)),
                            c
                    };
                if (m) {
                    angular.equals(t, {}) && P.use(P.use());
                    if (s && s.length) for (var J = 0, K = s.length; J < K; J++) M[s[J]] = F(s[J])
                }
                return P
            }]
    }]),
    angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", ["$interpolate", function (e) {
        var t = {},
            n, r = "default",
            i = null,
            s = {
                escaped: function (e) {
                    var t = {};
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = angular.element("<div></div>").text(e[n]).html());
                    return t
                }
            },
            o = function (e) {
                var t;
                return angular.isFunction(s[i]) ? t = s[i](e) : t = e,
                    t
            };
        return t.setLocale = function (e) {
            n = e
        },
            t.getInterpolationIdentifier = function () {
                return r
            },
            t.useSanitizeValueStrategy = function (e) {
                return i = e,
                    this
            },
            t.interpolate = function (t, n) {
                return i && (n = o(n)),
                    e(t)(n || {})
            },
            t
    }]),
    angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"),
    angular.module("pascalprecht.translate").directive("translate", ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope", function (e, t, n, r, i, s) {
        return {
            restrict: "AE",
            scope: !0,
            compile: function (t, o) {
                var u = o.translateValues ? o.translateValues : undefined,
                    a = o.translateInterpolation ? o.translateInterpolation : undefined,
                    f = t[0].outerHTML.match(/translate-value-+/i);
                return function (l, c, h) {
                    l.interpolateParams = {},
                        h.$observe("translate", function (e) {
                            angular.equals(e, "") || !angular.isDefined(e) ? l.translationId = n(c.text().replace(/^\s+|\s+$/g, ""))(l.$parent) : l.translationId = e
                        }),
                        h.$observe("translateDefault", function (e) {
                            l.defaultText = e
                        }),
                    u && h.$observe("translateValues", function (e) {
                        e && l.$parent.$watch(function () {
                            angular.extend(l.interpolateParams, i(e)(l.$parent))
                        })
                    });
                    if (f) {
                        var p = function (e) {
                            h.$observe(e, function (t) {
                                l.interpolateParams[angular.lowercase(e.substr(14, 1)) + e.substr(15)] = t
                            })
                        };
                        for (var d in h) h.hasOwnProperty(d) && d.substr(0, 14) === "translateValue" && d !== "translateValues" && p(d)
                    }
                    var v = function (t, n, i) {
                            !i && typeof n.defaultText != "undefined" && (t = n.defaultText),
                                c.html(t);
                            var s = e.isPostCompilingEnabled(),
                                u = typeof o.translateCompile != "undefined",
                                a = u && o.translateCompile !== "false";
                            (s && !u || a) && r(c.contents())(n)
                        },
                        m = function () {
                            return !u && !f ?
                                function () {
                                    var t = l.$watch("translationId", function (n) {
                                        l.translationId && n && e(n, {}, a).then(function (e) {
                                            v(e, l, !0),
                                                t()
                                        }, function (e) {
                                            v(e, l, !1),
                                                t()
                                        })
                                    }, !0)
                                } : function () {
                                    var t = function () {
                                        l.translationId && l.interpolateParams && e(l.translationId, l.interpolateParams, a).then(function (e) {
                                            v(e, l, !0)
                                        }, function (e) {
                                            v(e, l, !1)
                                        })
                                    };
                                    l.$watch("interpolateParams", t, !0),
                                        l.$watch("translationId", t)
                                }
                        }(),
                        g = s.$on("$translateChangeSuccess", m);
                    m(),
                        l.$on("$destroy", g)
                }
            }
        }
    }]),
    angular.module("pascalprecht.translate").directive("translateCloak", ["$rootScope", "$translate", function (e, t) {
        return {
            compile: function (n) {
                e.$on("$translateLoadingSuccess", function () {
                    n.removeClass(t.cloakClassName())
                }),
                    n.addClass(t.cloakClassName())
            }
        }
    }]),
    angular.module("pascalprecht.translate").filter("translate", ["$parse", "$translate", function (e, t) {
        return function (n, r, i) {
            return angular.isObject(r) || (r = e(r)(this)),
                t.instant(n, r, i)
        }
    }]);