angular.module("ui.validate", []).directive("uiValidate", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (e, t, n, r) {
            function i(t) {
                return angular.isString(t) ? (e.$watch(t, function () {
                        angular.forEach(o, function (e) {
                            e(r.$modelValue)
                        })
                    }), void 0) : angular.isArray(t) ? (angular.forEach(t, function (t) {
                            e.$watch(t, function () {
                                angular.forEach(o, function (e) {
                                    e(r.$modelValue)
                                })
                            })
                        }), void 0) : (angular.isObject(t) && angular.forEach(t, function (t, n) {
                            angular.isString(t) && e.$watch(t, function () {
                                o[n](r.$modelValue)
                            }),
                            angular.isArray(t) && angular.forEach(t, function (t) {
                                e.$watch(t, function () {
                                    o[n](r.$modelValue)
                                })
                            })
                        }), void 0)
            }

            var s, o = {},
                u = e.$eval(n.uiValidate);
            u && (angular.isString(u) && (u = {
                validator: u
            }), angular.forEach(u, function (t, n) {
                s = function (i) {
                    var s = e.$eval(t, {
                        $value: i
                    });
                    return angular.isObject(s) && angular.isFunction(s.then) ? (s.then(function () {
                            r.$setValidity(n, !0)
                        }, function () {
                            r.$setValidity(n, !1)
                        }), i) : s ? (r.$setValidity(n, !0), i) : (r.$setValidity(n, !1), void 0)
                },
                    o[n] = s,
                    r.$formatters.push(s),
                    r.$parsers.push(s)
            }), n.uiValidateWatch && i(e.$eval(n.uiValidateWatch)))
        }
    }
});