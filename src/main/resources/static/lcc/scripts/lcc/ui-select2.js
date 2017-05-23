angular.module("ui.select2", []).value("uiSelect2Config", {}).directive("uiSelect2", ["uiSelect2Config", "$timeout", function (e, t) {
    var n = {};
    return e && angular.extend(n, e),
        {
            require: "ngModel",
            priority: 1,
            compile: function (e, r) {
                var i, s, o, u = e.is("select"),
                    a = angular.isDefined(r.multiple);
                return e.is("select") && (s = e.find("option[ng-repeat], option[data-ng-repeat]"), s.length && (o = s.attr("ng-repeat") || s.attr("data-ng-repeat"), i = jQuery.trim(o.split("|")[0]).split(" ").pop())),


                    function (e, s, o, f) {
                        var l = angular.extend({}, n, e.$eval(o.uiSelect2)),
                            c = function (e) {
                                var t;
                                return l.simple_tags ? (t = [], angular.forEach(e, function (e, n) {
                                        t.push(e.id)
                                    })) : t = e,
                                    t
                            },
                            h = function (e) {
                                var t = [];
                                return e ? (l.simple_tags ? (t = [], angular.forEach(e, function (e, n) {
                                            t.push({
                                                id: e,
                                                text: e
                                            })
                                        })) : t = e, t) : t
                            };
                        u ? (delete l.multiple, delete l.initSelection) : a && (l.multiple = !0);
                        if (f) {
                            e.$watch(r.ngModel, function (e, t) {
                                if (!e) return;
                                if (e === t) return;
                                f.$render()
                            }, !0),
                                f.$render = function () {
                                    if (u) s.select2("val", f.$viewValue);
                                    else if (l.multiple) {
                                        var e = f.$viewValue;
                                        angular.isString(e) && (e = e.split(",")),
                                            s.select2("data", h(e))
                                    } else angular.isObject(f.$viewValue) ? s.select2("data", f.$viewValue) : f.$viewValue ? s.select2("val", f.$viewValue) : s.select2("data", null)
                                },
                            i && e.$watch(i, function (e, n, r) {
                                if (angular.equals(e, n)) return;
                                t(function () {
                                    s.select2("val", f.$viewValue),
                                        s.trigger("change"),
                                    e && !n && f.$setPristine && f.$setPristine(!0)
                                })
                            }),
                                f.$parsers.push(function (e) {
                                    var t = s.prev();
                                    return t.toggleClass("ng-invalid", !f.$valid).toggleClass("ng-valid", f.$valid).toggleClass("ng-invalid-required", !f.$valid).toggleClass("ng-valid-required", f.$valid).toggleClass("ng-dirty", f.$dirty).toggleClass("ng-pristine", f.$pristine),
                                        e
                                });
                            if (!u) {
                                s.bind("change", function (t) {
                                    t.stopImmediatePropagation();
                                    if (e.$$phase || e.$root.$$phase) return;
                                    e.$apply(function () {
                                        f.$setViewValue(c(s.select2("data")))
                                    })
                                });
                                if (l.initSelection) {
                                    var p = l.initSelection;
                                    l.initSelection = function (e, t) {
                                        p(e, function (e) {
                                            f.$setViewValue(c(e)),
                                                t(e)
                                        })
                                    }
                                }
                            }
                        }
                        s.bind("$destroy", function () {
                            s.select2("destroy")
                        }),
                            o.$observe("disabled", function (e) {
                                s.select2("enable", !e)
                            }),
                            o.$observe("readonly", function (e) {
                                s.select2("readonly", !! e)
                            }),
                        o.ngMultiple && e.$watch(o.ngMultiple, function (e) {
                            o.$set("multiple", !! e),
                                s.select2(l)
                        }),
                            t(function () {
                                s.select2(l),
                                    s.val(f.$viewValue),
                                    f.$render(),
                                !l.initSelection && !u && f.$setViewValue(c(s.select2("data")))
                            })
                    }
            }
        }
}]);