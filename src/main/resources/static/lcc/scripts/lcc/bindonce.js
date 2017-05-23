(function () {
    "use strict";
    var e = angular.module("pasvaz.bindonce", []);
    e.directive("bindonce", function () {
        var e = function (e) {
                if (e && e.length !== 0) {
                    var t = angular.lowercase("" + e);
                    e = t !== "f" && t !== "0" && t !== "false" && t !== "no" && t !== "n" && t !== "[]"
                } else e = !1;
                return e
            },
            t = parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
        isNaN(t) && (t = parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10));
        var n = {
            restrict: "AM",
            controller: ["$scope", "$element", "$attrs", "$interpolate", function (n, r, i, s) {
                var o = function (t, n, r) {
                        var i = n === "show" ? "" : "none",
                            s = n === "hide" ? "" : "none";
                        t.css("display", e(r) ? i : s)
                    },
                    u = function (e, t) {
                        if (angular.isObject(t) && !angular.isArray(t)) {
                            var n = [];
                            angular.forEach(t, function (e, t) {
                                e && n.push(t)
                            }),
                                t = n
                        }
                        t && e.addClass(angular.isArray(t) ? t.join(" ") : t)
                    },
                    a = {
                        watcherRemover: undefined,
                        binders: [],
                        group: i.boName,
                        element: r,
                        ran: !1,
                        addBinder: function (e) {
                            this.binders.push(e),
                            this.ran && this.runBinders()
                        },
                        setupWatcher: function (e) {
                            var t = this;
                            this.watcherRemover = n.$watch(e, function (e) {
                                if (e === undefined) return;
                                t.removeWatcher(),
                                    t.runBinders()
                            }, !0)
                        },
                        removeWatcher: function () {
                            this.watcherRemover !== undefined && (this.watcherRemover(), this.watcherRemover = undefined)
                        },
                        runBinders: function () {
                            while (this.binders.length > 0) {
                                var n = this.binders.shift();
                                if (this.group && this.group != n.group) continue;
                                var r = n.scope.$eval(n.interpolate ? s(n.value) : n.value);
                                switch (n.attr) {
                                    case "boIf":
                                        e(r) && n.transclude(n.scope.$new(), function (e) {
                                            var t = n.element.parent(),
                                                r = n.element && n.element[n.element.length - 1],
                                                i = t && t[0] || r && r.parentNode,
                                                s = r && r.nextSibling || null;
                                            angular.forEach(e, function (e) {
                                                i.insertBefore(e, s)
                                            })
                                        });
                                        break;
                                    case "boSwitch":
                                        var i, a = n.controller[0];
                                        if (i = a.cases["!" + r] || a.cases["?"]) n.scope.$eval(n.attrs.change),
                                            angular.forEach(i, function (e) {
                                                e.transclude(n.scope.$new(), function (t) {
                                                    var n = e.element.parent(),
                                                        r = e.element && e.element[e.element.length - 1],
                                                        i = n && n[0] || r && r.parentNode,
                                                        s = r && r.nextSibling || null;
                                                    angular.forEach(t, function (e) {
                                                        i.insertBefore(e, s)
                                                    })
                                                })
                                            });
                                        break;
                                    case "boSwitchWhen":
                                        var f = n.controller[0];
                                        f.cases["!" + n.attrs.boSwitchWhen] = f.cases["!" + n.attrs.boSwitchWhen] || [],
                                            f.cases["!" + n.attrs.boSwitchWhen].push({
                                                transclude: n.transclude,
                                                element: n.element
                                            });
                                        break;
                                    case "boSwitchDefault":
                                        var f = n.controller[0];
                                        f.cases["?"] = f.cases["?"] || [],
                                            f.cases["?"].push({
                                                transclude: n.transclude,
                                                element: n.element
                                            });
                                        break;
                                    case "hide":
                                    case "show":
                                        o(n.element, n.attr, r);
                                        break;
                                    case "class":
                                        u(n.element, r);
                                        break;
                                    case "text":
                                        n.element.text(r);
                                        break;
                                    case "html":
                                        n.element.html(r);
                                        break;
                                    case "style":
                                        n.element.css(r);
                                        break;
                                    case "src":
                                        n.element.attr(n.attr, r),
                                        t && n.element.prop("src", r);
                                        break;
                                    case "attr":
                                        angular.forEach(n.attrs, function (e, t) {
                                            var r, i;
                                            t.match(/^boAttr./) && n.attrs[t] && (r = t.replace(/^boAttr/, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), i = n.scope.$eval(n.attrs[t]), n.element.attr(r, i))
                                        });
                                        break;
                                    case "href":
                                    case "alt":
                                    case "title":
                                    case "id":
                                    case "value":
                                        n.element.attr(n.attr, r)
                                }
                            }
                            this.ran = !0
                        }
                    };
                return a
            }],
            link: function (e, t, n, r) {
                var i = n.bindonce ? e.$eval(n.bindonce) : !0;
                i !== undefined ? i.then && typeof i.then == "function" ? i.then(function () {
                            r.runBinders()
                        }) : r.runBinders() : (r.setupWatcher(n.bindonce), t.bind("$destroy", r.removeWatcher))
            }
        };
        return n
    }),
        angular.forEach([{
            directiveName: "boShow",
            attribute: "show"
        },
            {
                directiveName: "boHide",
                attribute: "hide"
            },
            {
                directiveName: "boClass",
                attribute: "class"
            },
            {
                directiveName: "boText",
                attribute: "text"
            },
            {
                directiveName: "boBind",
                attribute: "text"
            },
            {
                directiveName: "boHtml",
                attribute: "html"
            },
            {
                directiveName: "boSrcI",
                attribute: "src",
                interpolate: !0
            },
            {
                directiveName: "boSrc",
                attribute: "src"
            },
            {
                directiveName: "boHrefI",
                attribute: "href",
                interpolate: !0
            },
            {
                directiveName: "boHref",
                attribute: "href"
            },
            {
                directiveName: "boAlt",
                attribute: "alt"
            },
            {
                directiveName: "boTitle",
                attribute: "title"
            },
            {
                directiveName: "boId",
                attribute: "id"
            },
            {
                directiveName: "boStyle",
                attribute: "style"
            },
            {
                directiveName: "boValue",
                attribute: "value"
            },
            {
                directiveName: "boAttr",
                attribute: "attr"
            },
            {
                directiveName: "boIf",
                transclude: "element",
                terminal: !0,
                priority: 1e3
            },
            {
                directiveName: "boSwitch",
                require: "boSwitch",
                controller: function () {
                    this.cases = {}
                }
            },
            {
                directiveName: "boSwitchWhen",
                transclude: "element",
                priority: 800,
                require: "^boSwitch"
            },
            {
                directiveName: "boSwitchDefault",
                transclude: "element",
                priority: 800,
                require: "^boSwitch"
            }], function (t) {
            var n = 200;
            return e.directive(t.directiveName, function () {
                var e = {
                    priority: t.priority || n,
                    transclude: t.transclude || !1,
                    terminal: t.terminal || !1,
                    require: ["^bindonce"].concat(t.require || []),
                    controller: t.controller,
                    compile: function (e, n, r) {
                        return function (e, n, i, s) {
                            var o = s[0],
                                u = i.boParent;
                            if (u && o.group !== u) {
                                var a = o.element.parent();
                                o = undefined;
                                var f;
                                while (a[0].nodeType !== 9 && a.length) {
                                    if ((f = a.data("$bindonceController")) && f.group === u) {
                                        o = f;
                                        break
                                    }
                                    a = a.parent()
                                }
                                if (!o) throw new Error("No bindonce controller: " + u)
                            }
                            o.addBinder({
                                element: n,
                                attr: t.attribute || t.directiveName,
                                attrs: i,
                                value: i[t.directiveName],
                                interpolate: t.interpolate,
                                group: u,
                                transclude: r,
                                controller: s.slice(1),
                                scope: e
                            })
                        }
                    }
                };
                return e
            })
        })
})();