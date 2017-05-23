angular.module("angular-growl", []),
    angular.module("angular-growl").directive("growl", ["$rootScope", function (e) {
        "use strict";
        return {
            restrict: "A",
            template: '<div class="growl">	<div class="growl-item alert" ng-repeat="message in messages" ng-class="computeClasses(message)">		<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>       <div ng-switch="message.enableHtml">           <div ng-switch-when="true" ng-bind-html="message.text"></div>           <div ng-switch-default ng-bind="message.text"></div>       </div>	</div></div>',
            replace: !1,
            scope: !0,
            controller: ["$scope", "$timeout", "growl", function (t, n, r) {
                function i(e) {
                    t.messages.push(e),
                    e.ttl && -1 !== e.ttl && n(function () {
                        t.deleteMessage(e)
                    }, e.ttl)
                }

                var s = r.onlyUnique();
                t.messages = [],
                    e.$on("growlMessage", function (e, n) {
                        var r;
                        s ? (angular.forEach(t.messages, function (e) {
                                n.text === e.text && n.severity === e.severity && (r = !0)
                            }), r || i(n)) : i(n)
                    }),
                    t.deleteMessage = function (e) {
                        var n = t.messages.indexOf(e);
                        n > -1 && t.messages.splice(n, 1)
                    },
                    t.computeClasses = function (e) {
                        return {
                            "alert-success": "success" === e.severity,
                            "alert-error": "error" === e.severity,
                            "alert-danger": "error" === e.severity,
                            "alert-info": "info" === e.severity,
                            "alert-warning": "warn" === e.severity
                        }
                    }
            }]
        }
    }]),
    angular.module("angular-growl").provider("growl", function () {
        "use strict";
        var e = null,
            t = !1,
            n = "messages",
            r = "text",
            i = "severity",
            s = !0;
        this.globalTimeToLive = function (t) {
            e = t
        },
            this.globalEnableHtml = function (e) {
                t = e
            },
            this.messagesKey = function (e) {
                n = e
            },
            this.messageTextKey = function (e) {
                r = e
            },
            this.messageSeverityKey = function (e) {
                i = e
            },
            this.onlyUniqueMessages = function (e) {
                s = e
            },
            this.serverMessagesInterceptor = ["$q", "growl", function (e, t) {
                function r(e) {
                    e.data[n] && e.data[n].length > 0 && t.addServerMessages(e.data[n])
                }

                function i(e) {
                    return r(e),
                        e
                }

                function s(t) {
                    return r(t),
                        e.reject(t)
                }

                return function (e) {
                    return e.then(i, s)
                }
            }],
            this.$get = ["$rootScope", "$filter", function (n, o) {
                function u(e) {
                    y && (e.text = y(e.text)),
                        n.$broadcast("growlMessage", e)
                }

                function l(n, r, i) {
                    var s, o = r || {};
                    s = {
                        text: n,
                        severity: i,
                        ttl: o.ttl || e,
                        enableHtml: o.enableHtml || t
                    },
                        u(s)
                }

                function c(e, t) {
                    l(e, t, "warn")
                }

                function h(e, t) {
                    l(e, t, "error")
                }

                function p(e, t) {
                    l(e, t, "info")
                }

                function v(e, t) {
                    l(e, t, "success")
                }

                function m(e) {
                    var t, n, s, o;
                    for (o = e.length, t = 0; o > t; t++) if (n = e[t], n[r] && n[i]) {
                        switch (n[i]) {
                            case "warn":
                                s = "warn";
                                break;
                            case "success":
                                s = "success";
                                break;
                            case "info":
                                s = "info";
                                break;
                            case "error":
                                s = "error"
                        }
                        l(n[r], void 0, s)
                    }
                }

                function g() {
                    return s
                }

                var y;
                try {
                    y = o("translate")
                } catch (w) {
                }
                return {
                    addWarnMessage: c,
                    addErrorMessage: h,
                    addInfoMessage: p,
                    addSuccessMessage: v,
                    addServerMessages: m,
                    onlyUnique: g
                }
            }]
    });

