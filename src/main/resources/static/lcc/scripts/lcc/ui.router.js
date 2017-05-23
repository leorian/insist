(function (e, t, n) {
    "use strict";

    function r(e, t) {
        return O(new (O(function () {
        }, {
            prototype: e
        })), t)
    }

    function i(e) {
        return A(arguments, function (t) {
            t !== e && A(t, function (t, n) {
                e.hasOwnProperty(n) || (e[n] = t)
            })
        }),
            e
    }

    function s(e, t) {
        var n = [];
        for (var r in e.path) if ("" !== e.path[r]) {
            if (!t.path[r]) break;
            n.push(e.path[r])
        }
        return n
    }

    function o(e, t) {
        if (Array.prototype.indexOf) return e.indexOf(t, Number(arguments[2]) || 0);
        var n = e.length >>> 0,
            r = Number(arguments[2]) || 0;
        for (r = 0 > r ? Math.ceil(r) : Math.floor(r), 0 > r && (r += n); n > r; r++) if (r in e && e[r] === t) return r;
        return -1
    }

    function u(e, t, n, r) {
        var i, u = s(n, r),
            a = {},
            f = [];
        for (var l in u) if (u[l].params && u[l].params.length) {
            i = u[l].params;
            for (var c in i) o(f, i[c]) >= 0 || (f.push(i[c]), a[i[c]] = e[i[c]])
        }
        return O({}, a, t)
    }

    function a(e, t) {
        var n = {};
        return A(e, function (e) {
            var r = t[e];
            n[e] = null != r ? String(r) : null
        }),
            n
    }

    function f(e, t, n) {
        if (!n) {
            n = [];
            for (var r in e) n.push(r)
        }
        for (var i = 0; i < n.length; i++) {
            var s = n[i];
            if (e[s] != t[s]) return !1
        }
        return !0
    }

    function l(e, t) {
        var n = {};
        return A(e, function (e) {
            n[e] = t[e]
        }),
            n
    }

    function c(e, t) {
        var r = 1,
            s = 2,
            o = {},
            u = [],
            a = o,
            f = O(e.when(o), {
                $$promises: o,
                $$values: o
            });
        this.study = function (o) {
            function l(e, n) {
                if (d[n] !== s) {
                    if (p.push(n), d[n] === r) throw p.splice(0, p.indexOf(n)),
                        new Error("Cyclic dependency: " + p.join(" -> "));
                    if (d[n] = r, C(e)) h.push(n, [function () {
                        return t.get(e)
                    }], u);
                    else {
                        var i = t.annotate(e);
                        A(i, function (e) {
                            e !== n && o.hasOwnProperty(e) && l(o[e], e)
                        }),
                            h.push(n, e, i)
                    }
                    p.pop(),
                        d[n] = s
                }
            }

            function c(e) {
                return k(e) && e.then && e.$$promises
            }

            if (!k(o)) throw new Error("'invocables' must be an object");
            var h = [],
                p = [],
                d = {};
            return A(o, l),
                o = p = d = null,


                function (r, s, o) {
                    function u() {
                        --y || (b || i(g, s.$$values), v.$$values = g, v.$$promises = !0, d.resolve(g))
                    }

                    function l(e) {
                        v.$$failure = e,
                            d.reject(e)
                    }

                    function p(n, i, s) {
                        function a(e) {
                            c.reject(e),
                                l(e)
                        }

                        function f() {
                            if (!T(v.$$failure)) try {
                                c.resolve(t.invoke(i, o, g)),
                                    c.promise.then(function (e) {
                                        g[n] = e,
                                            u()
                                    }, a)
                            } catch (e) {
                                a(e)
                            }
                        }

                        var c = e.defer(),
                            h = 0;
                        A(s, function (e) {
                            m.hasOwnProperty(e) && !r.hasOwnProperty(e) && (h++, m[e].then(function (t) {
                                g[e] = t,
                                --h || f()
                            }, a))
                        }),
                        h || f(),
                            m[n] = c.promise
                    }

                    if (c(r) && o === n && (o = s, s = r, r = null), r) {
                        if (!k(r)) throw new Error("'locals' must be an object")
                    } else r = a;
                    if (s) {
                        if (!c(s)) throw new Error("'parent' must be a promise returned by $resolve.resolve()")
                    } else s = f;
                    var d = e.defer(),
                        v = d.promise,
                        m = v.$$promises = {},
                        g = O({}, r),
                        y = 1 + h.length / 3,
                        b = !1;
                    if (T(s.$$failure)) return l(s.$$failure),
                        v;
                    s.$$values ? (b = i(g, s.$$values), u()) : (O(m, s.$$promises), s.then(u, l));
                    for (var w = 0, E = h.length; E > w; w += 3) r.hasOwnProperty(h[w]) ? u() : p(h[w], h[w + 1], h[w + 2]);
                    return v
                }
        },
            this.resolve = function (e, t, n, r) {
                return this.study(e)(t, n, r)
            }
    }

    function h(e, t, n) {
        this.fromConfig = function (e, t, n) {
            return T(e.template) ? this.fromString(e.template, t) : T(e.templateUrl) ? this.fromUrl(e.templateUrl, t) : T(e.templateProvider) ? this.fromProvider(e.templateProvider, t, n) : null
        },
            this.fromString = function (e, t) {
                return N(e) ? e(t) : e
            },
            this.fromUrl = function (n, r) {
                return N(n) && (n = n(r)),
                    null == n ? null : e.get(n, {
                            cache: t
                        }).then(function (e) {
                            return e.data
                        })
            },
            this.fromProvider = function (e, t, r) {
                return n.invoke(e, null, r || {
                        params: t
                    })
            }
    }

    function p(e) {
        function t(t) {
            if (!/^\w+(-+\w+)*$/.test(t)) throw new Error("Invalid parameter name '" + t + "' in pattern '" + e + "'");
            if (s[t]) throw new Error("Duplicate parameter name '" + t + "' in pattern '" + e + "'");
            s[t] = !0,
                f.push(t)
        }

        function n(e) {
            return e.replace(/[\\\[\]\^$*+?.()|{}]/g, "\\$&")
        }

        var r, i = /([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,
            s = {},
            o = "^",
            u = 0,
            a = this.segments = [],
            f = this.params = [];
        this.source = e;
        for (var l, c, h;
             (r = i.exec(e)) && (l = r[2] || r[3], c = r[4] || ("*" == r[1] ? ".*" : "[^/]*"), h = e.substring(u, r.index), !(h.indexOf("?") >= 0));) o += n(h) + "(" + c + ")",
            t(l),
            a.push(h),
            u = i.lastIndex;
        h = e.substring(u);
        var p = h.indexOf("?");
        if (p >= 0) {
            var d = this.sourceSearch = h.substring(p);
            h = h.substring(0, p),
                this.sourcePath = e.substring(0, u + p),
                A(d.substring(1).split(/[&?]/), t)
        } else this.sourcePath = e,
            this.sourceSearch = "";
        o += n(h) + "$",
            a.push(h),
            this.regexp = new RegExp(o),
            this.prefix = a[0]
    }

    function d() {
        this.compile = function (e) {
            return new p(e)
        },
            this.isMatcher = function (e) {
                return k(e) && N(e.exec) && N(e.format) && N(e.concat)
            },
            this.$get = function () {
                return this
            }
    }

    function v(e) {
        function t(e) {
            var t = /^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(e.source);
            return null != t ? t[1].replace(/\\(.)/g, "$1") : ""
        }

        function n(e, t) {
            return e.replace(/\$(\$|\d{1,2})/, function (e, n) {
                return t["$" === n ? 0 : Number(n)]
            })
        }

        function r(e, t, n) {
            if (!n) return !1;
            var r = e.invoke(t, t, {
                $match: n
            });
            return T(r) ? r : !0
        }

        var i = [],
            s = null;
        this.rule = function (e) {
            if (!N(e)) throw new Error("'rule' must be a function");
            return i.push(e),
                this
        },
            this.otherwise = function (e) {
                if (C(e)) {
                    var t = e;
                    e = function () {
                        return t
                    }
                } else if (!N(e)) throw new Error("'rule' must be a function");
                return s = e,
                    this
            },
            this.when = function (i, s) {
                var o, u = C(s);
                if (C(i) && (i = e.compile(i)), !u && !N(s) && !L(s)) throw new Error("invalid 'handler' in when()");
                var a = {
                        matcher: function (t, n) {
                            return u && (o = e.compile(n), n = ["$match", function (e) {
                                return o.format(e)
                            }]),
                                O(function (e, i) {
                                    return r(e, n, t.exec(i.path(), i.search()))
                                }, {
                                    prefix: C(t.prefix) ? t.prefix : ""
                                })
                        },
                        regex: function (e, i) {
                            if (e.global || e.sticky) throw new Error("when() RegExp must not be global or sticky");
                            return u && (o = i, i = ["$match", function (e) {
                                return n(o, e)
                            }]),
                                O(function (t, n) {
                                    return r(t, i, e.exec(n.path()))
                                }, {
                                    prefix: t(e)
                                })
                        }
                    },
                    f = {
                        matcher: e.isMatcher(i),
                        regex: i instanceof RegExp
                    };
                for (var l in f) if (f[l]) return this.rule(a[l](i, s));
                throw new Error("invalid 'what' in when()")
            },
            this.$get = ["$location", "$rootScope", "$injector", function (e, t, n) {
                function r(t) {
                    function r(t) {
                        var r = t(n, e);
                        return r ? (C(r) && e.replace().url(r), !0) : !1
                    }

                    if (!t || !t.defaultPrevented) {
                        var o, u = i.length;
                        for (o = 0; u > o; o++) if (r(i[o])) return;
                        s && r(s)
                    }
                }

                return t.$on("$locationChangeSuccess", r),
                    {
                        sync: function () {
                            r()
                        }
                    }
            }]
    }

    function m(e, i, s) {
        function o(e) {
            return 0 === e.indexOf(".") || 0 === e.indexOf("^")
        }

        function c(e, t) {
            var r = C(e),
                i = r ? e : e.name,
                s = o(i);
            if (s) {
                if (!t) throw new Error("No reference point given for path '" + i + "'");
                for (var u = i.split("."), a = 0, f = u.length, l = t; f > a; a++) if ("" !== u[a] || 0 !== a) {
                    if ("^" !== u[a]) break;
                    if (!l.parent) throw new Error("Path '" + i + "' not valid for state '" + t.name + "'");
                    l = l.parent
                } else l = t;
                u = u.slice(a).join("."),
                    i = l.name + (l.name && u ? "." : "") + u
            }
            var c = w[i];
            return !c || !r && (r || c !== e && c.self !== e) ? n : c
        }

        function h(e, t) {
            E[e] || (E[e] = []),
                E[e].push(t)
        }

        function p(t) {
            t = r(t, {
                self: t,
                resolve: t.resolve || {},
                toString: function () {
                    return this.name
                }
            });
            var n = t.name;
            if (!C(n) || n.indexOf("@") >= 0) throw new Error("State must have a valid name");
            if (w.hasOwnProperty(n)) throw new Error("State '" + n + "'' is already defined");
            var i = -1 !== n.indexOf(".") ? n.substring(0, n.lastIndexOf(".")) : C(t.parent) ? t.parent : "";
            if (i && !w[i]) return h(i, t.self);
            for (var s in x) N(x[s]) && (t[s] = x[s](t, x.$delegates[s]));
            if (w[n] = t, !t[S] && t.url && e.when(t.url, ["$match", "$stateParams", function (e, n) {
                    b.$current.navigable == t && f(e, n) || b.transitionTo(t, e, {
                        location: !1
                    })
                }]), E[n]) for (var o = 0; o < E[n].length; o++) p(E[n][o]);
            return t
        }

        function d(e, t) {
            return C(e) && !T(t) ? x[e] : N(t) && C(e) ? (x[e] && !x.$delegates[e] && (x.$delegates[e] = x[e]), x[e] = t, this) : this
        }

        function v(e, t) {
            return k(e) ? t = e : t.name = e,
                p(t),
                this
        }

        function m(e, i, o, h, p, d, v) {
            function m() {
                v.url() !== P && (v.url(P), v.replace())
            }

            function E(e, n, r, s, u) {
                var a = r ? n : l(e.params, n),
                    f = {
                        $stateParams: a
                    };
                u.resolve = p.resolve(e.resolve, f, u.resolve, e);
                var c = [u.resolve.then(function (e) {
                    u.globals = e
                })];
                return s && c.push(s),
                    A(e.views, function (n, r) {
                        var i = n.resolve && n.resolve !== e.resolve ? n.resolve : {};
                        i.$template = [function () {
                            return o.load(r, {
                                    view: n,
                                    locals: f,
                                    params: a,
                                    notify: !1
                                }) || ""
                        }],
                            c.push(p.resolve(i, f, u.resolve, e).then(function (s) {
                                if (N(n.controllerProvider) || L(n.controllerProvider)) {
                                    var o = t.extend({}, i, f);
                                    s.$$controller = h.invoke(n.controllerProvider, null, o)
                                } else s.$$controller = n.controller;
                                s.$$state = e,
                                    u[r] = s
                            }))
                    }),
                    i.all(c).then(function () {
                        return u
                    })
            }

            var x = i.reject(new Error("transition superseded")),
                C = i.reject(new Error("transition prevented")),
                k = i.reject(new Error("transition aborted")),
                _ = i.reject(new Error("transition failed")),
                P = v.url();
            return y.locals = {
                resolve: null,
                globals: {
                    $stateParams: {}
                }
            },
                b = {
                    params: {},
                    current: y.self,
                    $current: y,
                    transition: null
                },
                b.reload = function () {
                    b.transitionTo(b.current, d, {
                        reload: !0,
                        inherit: !1,
                        notify: !1
                    })
                },
                b.go = function (e, t, n) {
                    return this.transitionTo(e, t, O({
                        inherit: !0,
                        relative: b.$current
                    }, n))
                },
                b.transitionTo = function (t, n, s) {
                    n = n || {},
                        s = O({
                            location: !0,
                            inherit: !1,
                            relative: null,
                            notify: !0,
                            reload: !1,
                            $retry: !1
                        }, s || {});
                    var o, l = b.$current,
                        p = b.params,
                        w = l.path,
                        N = c(t, s.relative);
                    if (!T(N)) {
                        var L = {
                            to: t,
                            toParams: n,
                            options: s
                        };
                        if (o = e.$broadcast("$stateNotFound", L, l.self, p), o.defaultPrevented) return m(),
                            k;
                        if (o.retry) {
                            if (s.$retry) return m(),
                                _;
                            var A = b.transition = i.when(o.retry);
                            return A.then(function () {
                                return A !== b.transition ? x : (L.options.$retry = !0, b.transitionTo(L.to, L.toParams, L.options))
                            }, function () {
                                return k
                            }),
                                m(),
                                A
                        }
                        if (t = L.to, n = L.toParams, s = L.options, N = c(t, s.relative), !T(N)) throw s.relative ? new Error("Could not resolve '" + t + "' from state '" + s.relative + "'") : new Error("No such state '" + t + "'")
                    }
                    if (N[S]) throw new Error("Cannot transition to abstract state '" + t + "'");
                    s.inherit && (n = u(d, n || {}, b.$current, N)),
                        t = N;
                    var D, I, R = t.path,
                        U = y.locals,
                        z = [];
                    for (D = 0, I = R[D]; I && I === w[D] && f(n, p, I.ownParams) && !s.reload; D++, I = R[D]) U = z[D] = I.locals;
                    if (g(t, l, U, s)) return t.self.reloadOnSearch !== !1 && m(),
                        b.transition = null,
                        i.when(b.current);
                    if (n = a(t.params, n || {}), s.notify && (o = e.$broadcast("$stateChangeStart", t.self, n, l.self, p), o.defaultPrevented)) return m(),
                        C;
                    for (var W = i.when(U), X = D; X < R.length; X++, I = R[X]) U = z[X] = r(U),
                        W = E(I, n, I === t, W, U);
                    var V = b.transition = W.then(function () {
                        var r, i, o;
                        if (b.transition !== V) return x;
                        for (r = w.length - 1; r >= D; r--) o = w[r],
                        o.self.onExit && h.invoke(o.self.onExit, o.self, o.locals.globals),
                            o.locals = null;
                        for (r = D; r < R.length; r++) i = R[r],
                            i.locals = z[r],
                        i.self.onEnter && h.invoke(i.self.onEnter, i.self, i.locals.globals);
                        if (b.transition !== V) return x;
                        b.$current = t,
                            b.current = t.self,
                            b.params = n,
                            M(b.params, d),
                            b.transition = null;
                        var u = t.navigable;
                        return s.location && u && (v.url(u.url.format(u.locals.globals.$stateParams)), "replace" === s.location && v.replace()),
                        s.notify && e.$broadcast("$stateChangeSuccess", t.self, n, l.self, p),
                            P = v.url(),
                            b.current
                    }, function (r) {
                        return b.transition !== V ? x : (b.transition = null, e.$broadcast("$stateChangeError", t.self, n, l.self, p, r), m(), i.reject(r))
                    });
                    return V
                },
                b.is = function (e, r) {
                    var i = c(e);
                    return T(i) ? b.$current !== i ? !1 : T(r) ? t.equals(d, r) : !0 : n
                },
                b.includes = function (e, r) {
                    var i = c(e);
                    if (!T(i)) return n;
                    if (!T(b.$current.includes[i.name])) return !1;
                    var s = !0;
                    return t.forEach(r, function (e, t) {
                        T(d[t]) && d[t] === e || (s = !1)
                    }),
                        s
                },
                b.href = function (e, t, n) {
                    n = O({
                        lossy: !0,
                        inherit: !1,
                        absolute: !1,
                        relative: b.$current
                    }, n || {});
                    var r = c(e, n.relative);
                    if (!T(r)) return null;
                    t = u(d, t || {}, b.$current, r);
                    var i = r && n.lossy ? r.navigable : r,
                        o = i && i.url ? i.url.format(a(r.params, t || {})) : null;
                    return !s.html5Mode() && o && (o = "#" + s.hashPrefix() + o),
                    n.absolute && o && (o = v.protocol() + "://" + v.host() + (80 == v.port() || 443 == v.port() ? "" : ":" + v.port()) + (!s.html5Mode() && o ? "/" : "") + o),
                        o
                },
                b.get = function (e, t) {
                    if (!T(e)) {
                        var n = [];
                        return A(w, function (e) {
                            n.push(e.self)
                        }),
                            n
                    }
                    var r = c(e, t);
                    return r && r.self ? r.self : null
                },
                b
        }

        function g(e, t, n, r) {
            return e !== t || (n !== t.locals || r.reload) && e.self.reloadOnSearch !== !1 ? void 0 : !0
        }

        var y, b, w = {},
            E = {},
            S = "abstract",
            x = {
                parent: function (e) {
                    if (T(e.parent) && e.parent) return c(e.parent);
                    var t = /^(.+)\.[^.]+$/.exec(e.name);
                    return t ? c(t[1]) : y
                },
                data: function (e) {
                    return e.parent && e.parent.data && (e.data = e.self.data = O({}, e.parent.data, e.data)),
                        e.data
                },
                url: function (e) {
                    var t = e.url;
                    if (C(t)) return "^" == t.charAt(0) ? i.compile(t.substring(1)) : (e.parent.navigable || y).url.concat(t);
                    if (i.isMatcher(t) || null == t) return t;
                    throw new Error("Invalid url '" + t + "' in state '" + e + "'")
                },
                navigable: function (e) {
                    return e.url ? e : e.parent ? e.parent.navigable : null
                },
                params: function (e) {
                    if (!e.params) return e.url ? e.url.parameters() : e.parent.params;
                    if (!L(e.params)) throw new Error("Invalid params in state '" + e + "'");
                    if (e.url) throw new Error("Both params and url specicified in state '" + e + "'");
                    return e.params
                },
                views: function (e) {
                    var t = {};
                    return A(T(e.views) ? e.views : {
                            "": e
                        }, function (n, r) {
                        r.indexOf("@") < 0 && (r += "@" + e.parent.name),
                            t[r] = n
                    }),
                        t
                },
                ownParams: function (e) {
                    if (!e.parent) return e.params;
                    var t = {};
                    A(e.params, function (e) {
                        t[e] = !0
                    }),
                        A(e.parent.params, function (n) {
                            if (!t[n]) throw new Error("Missing required parameter '" + n + "' in state '" + e.name + "'");
                            t[n] = !1
                        });
                    var n = [];
                    return A(t, function (e, t) {
                        e && n.push(t)
                    }),
                        n
                },
                path: function (e) {
                    return e.parent ? e.parent.path.concat(e) : []
                },
                includes: function (e) {
                    var t = e.parent ? O({}, e.parent.includes) : {};
                    return t[e.name] = !0,
                        t
                },
                $delegates: {}
            };
        y = p({
            name: "",
            url: "^",
            views: null,
            "abstract": !0
        }),
            y.navigable = null,
            this.decorator = d,
            this.state = v,
            this.$get = m,
            m.$inject = ["$rootScope", "$q", "$view", "$injector", "$resolve", "$stateParams", "$location", "$urlRouter"]
    }

    function g() {
        function e(e, t) {
            return {
                load: function (n, r) {
                    var i, s = {
                        template: null,
                        controller: null,
                        view: null,
                        locals: null,
                        notify: !0,
                        async: !0,
                        params: {}
                    };
                    return r = O(s, r),
                    r.view && (i = t.fromConfig(r.view, r.params, r.locals)),
                    i && r.notify && e.$broadcast("$viewContentLoading", r),
                        i
                }
            }
        }

        this.$get = e,
            e.$inject = ["$rootScope", "$templateFactory"]
    }

    function y(e, n, r, i, s) {
        var o = i.has("$animator") ? i.get("$animator") : !1,
            u = !1,
            a = {
                restrict: "ECA",
                terminal: !0,
                priority: 1e3,
                transclude: !0,
                compile: function (i, f, l) {
                    return function (i, f, c) {
                        function h(t) {
                            var o = e.$current && e.$current.locals[v];
                            if (o !== d) {
                                var u = b(g && t);
                                if (u.remove(f), p && (p.$destroy(), p = null), !o) return d = null,
                                    E.state = null,
                                    u.restore(y, f);
                                d = o,
                                    E.state = o.$$state;
                                var a = n(u.populate(o.$template, f));
                                if (p = i.$new(), o.$$controller) {
                                    o.$scope = p;
                                    var l = r(o.$$controller, o);
                                    f.children().data("$ngControllerController", l)
                                }
                                a(p),
                                    p.$emit("$viewContentLoaded"),
                                m && p.$eval(m),
                                    s()
                            }
                        }

                        var p, d, v = c[a.name] || c.name || "",
                            m = c.onload || "",
                            g = o && o(i, c),
                            y = l(i),
                            b = function (e) {
                                return {
                                    "true": {
                                        remove: function (e) {
                                            g.leave(e.contents(), e)
                                        },
                                        restore: function (e, t) {
                                            g.enter(e, t)
                                        },
                                        populate: function (e, n) {
                                            var r = t.element("<div></div>").html(e).contents();
                                            return g.enter(r, n),
                                                r
                                        }
                                    },
                                    "false": {
                                        remove: function (e) {
                                            e.html("")
                                        },
                                        restore: function (e, t) {
                                            t.append(e)
                                        },
                                        populate: function (e, t) {
                                            return t.html(e),
                                                t.contents()
                                        }
                                    }
                                }[e.toString()]
                            };
                        f.append(y);
                        var w = f.parent().inheritedData("$uiView");
                        v.indexOf("@") < 0 && (v = v + "@" + (w ? w.state.name : ""));
                        var E = {
                            name: v,
                            state: null
                        };
                        f.data("$uiView", E);
                        var S = function () {
                            if (!u) {
                                u = !0;
                                try {
                                    h(!0)
                                } catch (e) {
                                    throw u = !1,
                                        e
                                }
                                u = !1
                            }
                        };
                        i.$on("$stateChangeSuccess", S),
                            i.$on("$viewContentLoading", S),
                            h(!1)
                    }
                }
            };
        return a
    }

    function b(e) {
        var t = e.replace(/\n/g, " ").match(/^([^(]+?)\s*(\((.*)\))?$/);
        if (!t || 4 !== t.length) throw new Error("Invalid state ref '" + e + "'");
        return {
            state: t[1],
            paramExpr: t[3] || null
        }
    }

    function w(e) {
        var t = e.parent().inheritedData("$uiView");
        return t && t.state && t.state.name ? t.state : void 0
    }

    function E(e, t) {
        return {
            restrict: "A",
            require: "?^uiSrefActive",
            link: function (n, r, i, s) {
                var o = b(i.uiSref),
                    u = null,
                    a = w(r) || e.$current,
                    f = "FORM" === r[0].nodeName,
                    l = f ? "action" : "href",
                    c = !0,
                    h = function (t) {
                        if (t && (u = t), c) {
                            var n = e.href(o.state, u, {
                                relative: a
                            });
                            if (!n) return c = !1,
                                !1;
                            r[0][l] = n,
                            s && s.$$setStateInfo(o.state, u)
                        }
                    };
                o.paramExpr && (n.$watch(o.paramExpr, function (e) {
                    e !== u && h(e)
                }, !0), u = n.$eval(o.paramExpr)),
                    h(),
                f || r.bind("click", function (r) {
                    var i = r.which || r.button;
                    0 !== i && 1 != i || r.ctrlKey || r.metaKey || r.shiftKey || (t(function () {
                        n.$apply(function () {
                            e.go(o.state, u, {
                                relative: a
                            })
                        })
                    }), r.preventDefault())
                })
            }
        }
    }

    function S(e, t, n) {
        return {
            restrict: "A",
            controller: function (r, i, s) {
                function o() {
                    e.$current.self === a && u() ? i.addClass(c) : i.removeClass(c)
                }

                function u() {
                    return !l || f(l, t)
                }

                var a, l, c;
                c = n(s.uiSrefActive || "", !1)(r),
                    this.$$setStateInfo = function (t, n) {
                        a = e.get(t, w(i)),
                            l = n,
                            o()
                    },
                    r.$on("$stateChangeSuccess", o)
            }
        }
    }

    function x(e, t) {
        function i(e) {
            this.locals = e.locals.globals,
                this.params = this.locals.$stateParams
        }

        function s() {
            this.locals = null,
                this.params = null
        }

        function o(n, o) {
            if (null != o.redirectTo) {
                var u, f = o.redirectTo;
                if (C(f)) u = f;
                else {
                    if (!N(f)) throw new Error("Invalid 'redirectTo' in when()");
                    u = function (e, t) {
                        return f(e, t.path(), t.search())
                    }
                }
                t.when(n, u)
            } else e.state(r(o, {
                parent: null,
                name: "route:" + encodeURIComponent(n),
                url: n,
                onEnter: i,
                onExit: s
            }));
            return a.push(o),
                this
        }

        function u(e, t, r) {
            function i(e) {
                return "" !== e.name ? e : n
            }

            var s = {
                routes: a,
                params: r,
                current: n
            };
            return t.$on("$stateChangeStart", function (e, n, r, s) {
                t.$broadcast("$routeChangeStart", i(n), i(s))
            }),
                t.$on("$stateChangeSuccess", function (e, n, r, o) {
                    s.current = i(n),
                        t.$broadcast("$routeChangeSuccess", i(n), i(o)),
                        M(r, s.params)
                }),
                t.$on("$stateChangeError", function (e, n, r, s, o, u) {
                    t.$broadcast("$routeChangeError", i(n), i(s), u)
                }),
                s
        }

        var a = [];
        i.$inject = ["$$state"],
            this.when = o,
            this.$get = u,
            u.$inject = ["$state", "$rootScope", "$routeParams"]
    }

    var T = t.isDefined,
        N = t.isFunction,
        C = t.isString,
        k = t.isObject,
        L = t.isArray,
        A = t.forEach,
        O = t.extend,
        M = t.copy;
    t.module("ui.router.util", ["ng"]),
        t.module("ui.router.router", ["ui.router.util"]),
        t.module("ui.router.state", ["ui.router.router", "ui.router.util"]),
        t.module("ui.router", ["ui.router.state"]),
        t.module("ui.router.compat", ["ui.router"]),
        c.$inject = ["$q", "$injector"],
        t.module("ui.router.util").service("$resolve", c),
        h.$inject = ["$http", "$templateCache", "$injector"],
        t.module("ui.router.util").service("$templateFactory", h),
        p.prototype.concat = function (e) {
            return new p(this.sourcePath + e + this.sourceSearch)
        },
        p.prototype.toString = function () {
            return this.source
        },
        p.prototype.exec = function (e, t) {
            var n = this.regexp.exec(e);
            if (!n) return null;
            var r, i = this.params,
                s = i.length,
                o = this.segments.length - 1,
                u = {};
            if (o !== n.length - 1) throw new Error("Unbalanced capture group in route '" + this.source + "'");
            for (r = 0; o > r; r++) u[i[r]] = n[r + 1];
            for (; s > r; r++) u[i[r]] = t[i[r]];
            return u
        },
        p.prototype.parameters = function () {
            return this.params
        },
        p.prototype.format = function (e) {
            var t = this.segments,
                n = this.params;
            if (!e) return t.join("");
            var r, i, s, o = t.length - 1,
                u = n.length,
                a = t[0];
            for (r = 0; o > r; r++) s = e[n[r]],
            null != s && (a += encodeURIComponent(s)),
                a += t[r + 1];
            for (; u > r; r++) s = e[n[r]],
            null != s && (a += (i ? "&" : "?") + n[r] + "=" + encodeURIComponent(s), i = !0);
            return a
        },
        t.module("ui.router.util").provider("$urlMatcherFactory", d),
        v.$inject = ["$urlMatcherFactoryProvider"],
        t.module("ui.router.router").provider("$urlRouter", v),
        m.$inject = ["$urlRouterProvider", "$urlMatcherFactoryProvider", "$locationProvider"],
        t.module("ui.router.state").value("$stateParams", {}).provider("$state", m),
        g.$inject = [],
        t.module("ui.router.state").provider("$view", g),
        y.$inject = ["$state", "$compile", "$controller", "$injector", "$anchorScroll"],
        t.module("ui.router.state").directive("uiView", y),
        E.$inject = ["$state", "$timeout"],
        S.$inject = ["$state", "$stateParams", "$interpolate"],
        t.module("ui.router.state").directive("uiSref", E).directive("uiSrefActive", S),
        x.$inject = ["$stateProvider", "$urlRouterProvider"],
        t.module("ui.router.compat").provider("$route", x).directive("ngView", y)
})(window, window.angular)