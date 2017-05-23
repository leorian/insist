angular.module("ui.bootstrap", ["ui.bootstrap.transition", "ui.bootstrap.collapse", "ui.bootstrap.accordion", "ui.bootstrap.alert", "ui.bootstrap.bindHtml", "ui.bootstrap.buttons", "ui.bootstrap.carousel", "ui.bootstrap.position", "ui.bootstrap.datepicker", "ui.bootstrap.dropdownToggle", "ui.bootstrap.modal", "ui.bootstrap.pagination", "ui.bootstrap.tooltip", "ui.bootstrap.popover", "ui.bootstrap.progressbar", "ui.bootstrap.rating", "ui.bootstrap.tabs", "ui.bootstrap.timepicker", "ui.bootstrap.typeahead"]),
    angular.module("ui.bootstrap.transition", []).factory("$transition", ["$q", "$timeout", "$rootScope", function (e, t, n) {
        function u(e) {
            for (var t in e) if (i.style[t] !== undefined) return e[t]
        }
        var r = function (i, s, o) {
                o = o || {};
                var u = e.defer(),
                    a = r[o.animation ? "animationEndEventName" : "transitionEndEventName"],
                    f = function (e) {
                        n.$apply(function () {
                            i.unbind(a, f),
                                u.resolve(i)
                        })
                    };
                return a && i.bind(a, f),
                    t(function () {
                        angular.isString(s) ? i.addClass(s) : angular.isFunction(s) ? s(i) : angular.isObject(s) && i.css(s),
                        a || u.resolve(i)
                    }),
                    u.promise.cancel = function () {
                        a && i.unbind(a, f),
                            u.reject("Transition cancelled")
                    },
                    u.promise
            },
            i = document.createElement("trans"),
            s = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                transition: "transitionend"
            },
            o = {
                WebkitTransition: "webkitAnimationEnd",
                MozTransition: "animationend",
                OTransition: "oAnimationEnd",
                transition: "animationend"
            };
        return r.transitionEndEventName = u(s),
            r.animationEndEventName = u(o),
            r
    }]),
    angular.module("ui.bootstrap.collapse", ["ui.bootstrap.transition"]).directive("collapse", ["$transition", function (e, t) {
        return {
            link: function (t, n, r) {
                function o(t) {
                    function i() {
                        s === r && (s = undefined)
                    }
                    var r = e(n, t);
                    return s && s.cancel(),
                        s = r,
                        r.then(i, i),
                        r
                }
                function u() {
                    i ? (i = !1, a()) : (n.removeClass("collapse").addClass("collapsing"), o({
                            height: n[0].scrollHeight + "px"
                        }).then(a))
                }
                function a() {
                    n.removeClass("collapsing"),
                        n.addClass("collapse in"),
                        n.css({
                            height: "auto"
                        })
                }
                function f() {
                    if (i) i = !1,
                        l(),
                        n.css({
                            height: 0
                        });
                    else {
                        n.css({
                            height: n[0].scrollHeight + "px"
                        });
                        var e = n[0].offsetWidth;
                        n.removeClass("collapse in").addClass("collapsing"),
                            o({
                                height: 0
                            }).then(l)
                    }
                }
                function l() {
                    n.removeClass("collapsing"),
                        n.addClass("collapse")
                }
                var i = !0,
                    s;
                t.$watch(r.collapse, function (e) {
                    e ? f() : u()
                })
            }
        }
    }]),
    angular.module("ui.bootstrap.accordion", ["ui.bootstrap.collapse"]).constant("accordionConfig", {
        closeOthers: !0
    }).controller("AccordionController", ["$scope", "$attrs", "accordionConfig", function (e, t, n) {
        this.groups = [],
            this.closeOthers = function (r) {
                var i = angular.isDefined(t.closeOthers) ? e.$eval(t.closeOthers) : n.closeOthers;
                i && angular.forEach(this.groups, function (e) {
                    e !== r && (e.isOpen = !1)
                })
            },
            this.addGroup = function (e) {
                var t = this;
                this.groups.push(e),
                    e.$on("$destroy", function (n) {
                        t.removeGroup(e)
                    })
            },
            this.removeGroup = function (e) {
                var t = this.groups.indexOf(e);
                t !== -1 && this.groups.splice(this.groups.indexOf(e), 1)
            }
    }]).directive("accordion", function () {
        return {
            restrict: "EA",
            controller: "AccordionController",
            transclude: !0,
            replace: !1,
            templateUrl: "template/accordion/accordion.html"
        }
    }).directive("accordionGroup", ["$parse", function (e) {
        return {
            require: "^accordion",
            restrict: "EA",
            transclude: !0,
            replace: !0,
            templateUrl: "template/accordion/accordion-group.html",
            scope: {
                heading: "@"
            },
            controller: function () {
                this.setHeading = function (e) {
                    this.heading = e
                }
            },
            link: function (t, n, r, i) {
                var s, o;
                i.addGroup(t),
                    t.isOpen = !1,
                r.isOpen && (s = e(r.isOpen), o = s.assign, t.$parent.$watch(s, function (e) {
                    t.isOpen = !! e
                })),
                    t.$watch("isOpen", function (e) {
                        e && i.closeOthers(t),
                        o && o(t.$parent, e)
                    })
            }
        }
    }]).directive("accordionHeading", function () {
        return {
            restrict: "EA",
            transclude: !0,
            template: "",
            replace: !0,
            require: "^accordionGroup",
            compile: function (e, t, n) {
                return function (t, r, i, s) {
                    s.setHeading(n(t, function () {}))
                }
            }
        }
    }).directive("accordionTransclude", function () {
        return {
            require: "^accordionGroup",
            link: function (e, t, n, r) {
                e.$watch(function () {
                    return r[n.accordionTransclude]
                }, function (e) {
                    e && (t.html(""), t.append(e))
                })
            }
        }
    }),
    angular.module("ui.bootstrap.alert", []).controller("AlertController", ["$scope", "$attrs", function (e, t) {
        e.closeable = "close" in t
    }]).directive("alert", function () {
        return {
            restrict: "EA",
            controller: "AlertController",
            templateUrl: "template/alert/alert.html",
            transclude: !0,
            replace: !0,
            scope: {
                type: "=",
                close: "&"
            }
        }
    }),
    angular.module("ui.bootstrap.bindHtml", []).directive("bindHtmlUnsafe", function () {
        return function (e, t, n) {
            t.addClass("ng-binding").data("$binding", n.bindHtmlUnsafe),
                e.$watch(n.bindHtmlUnsafe, function (n) {
                    t.html(n || "")
                })
        }
    }),
    angular.module("ui.bootstrap.buttons", []).constant("buttonConfig", {
        activeClass: "active",
        toggleEvent: "click"
    }).controller("ButtonsController", ["buttonConfig", function (e) {
        this.activeClass = e.activeClass || "active",
            this.toggleEvent = e.toggleEvent || "click"
    }]).directive("btnRadio", function () {
        return {
            require: ["btnRadio", "ngModel"],
            controller: "ButtonsController",
            link: function (e, t, n, r) {
                var i = r[0],
                    s = r[1];
                s.$render = function () {
                    t.toggleClass(i.activeClass, angular.equals(s.$modelValue, e.$eval(n.btnRadio)))
                },
                    t.bind(i.toggleEvent, function () {
                        t.hasClass(i.activeClass) || e.$apply(function () {
                            s.$setViewValue(e.$eval(n.btnRadio)),
                                s.$render()
                        })
                    })
            }
        }
    }).directive("btnCheckbox", function () {
        return {
            require: ["btnCheckbox", "ngModel"],
            controller: "ButtonsController",
            link: function (e, t, n, r) {
                function o() {
                    return a(n.btnCheckboxTrue, !0)
                }
                function u() {
                    return a(n.btnCheckboxFalse, !1)
                }
                function a(t, n) {
                    var r = e.$eval(t);
                    return angular.isDefined(r) ? r : n
                }
                var i = r[0],
                    s = r[1];
                s.$render = function () {
                    t.toggleClass(i.activeClass, angular.equals(s.$modelValue, o()))
                },
                    t.bind(i.toggleEvent, function () {
                        e.$apply(function () {
                            s.$setViewValue(t.hasClass(i.activeClass) ? u() : o()),
                                s.$render()
                        })
                    })
            }
        }
    }),
    angular.module("ui.bootstrap.carousel", ["ui.bootstrap.transition"]).controller("CarouselController", ["$scope", "$timeout", "$transition", "$q", function (e, t, n, r) {
        function l() {
            c();
            var n = +e.interval;
            !isNaN(n) && n >= 0 && (u = t(h, n))
        }
        function c() {
            u && (t.cancel(u), u = null)
        }
        function h() {
            a ? (e.next(), l()) : e.pause()
        }
        var i = this,
            s = i.slides = [],
            o = -1,
            u, a;
        i.currentSlide = null;
        var f = !1;
        i.select = function (r, u) {
            function c() {
                if (f) return;
                if (i.currentSlide && angular.isString(u) && !e.noTransition && r.$element) {
                    r.$element.addClass(u);
                    var t = r.$element[0].offsetWidth;
                    angular.forEach(s, function (e) {
                        angular.extend(e, {
                            direction: "",
                            entering: !1,
                            leaving: !1,
                            active: !1
                        })
                    }),
                        angular.extend(r, {
                            direction: u,
                            active: !0,
                            entering: !0
                        }),
                        angular.extend(i.currentSlide || {}, {
                            direction: u,
                            leaving: !0
                        }),
                        e.$currentTransition = n(r.$element, {}),


                        function (t, n) {
                            e.$currentTransition.then(function () {
                                h(t, n)
                            }, function () {
                                h(t, n)
                            })
                        }(r, i.currentSlide)
                } else h(r, i.currentSlide);
                i.currentSlide = r,
                    o = a,
                    l()
            }
            function h(t, n) {
                angular.extend(t, {
                    direction: "",
                    active: !0,
                    leaving: !1,
                    entering: !1
                }),
                    angular.extend(n || {}, {
                        direction: "",
                        active: !1,
                        leaving: !1,
                        entering: !1
                    }),
                    e.$currentTransition = null
            }
            var a = s.indexOf(r);
            u === undefined && (u = a > o ? "next" : "prev"),
            r && r !== i.currentSlide && (e.$currentTransition ? (e.$currentTransition.cancel(), t(c)) : c())
        },
            e.$on("$destroy", function () {
                f = !0
            }),
            i.indexOfSlide = function (e) {
                return s.indexOf(e)
            },
            e.next = function () {
                var t = (o + 1) % s.length;
                if (!e.$currentTransition) return i.select(s[t], "next")
            },
            e.prev = function () {
                var t = o - 1 < 0 ? s.length - 1 : o - 1;
                if (!e.$currentTransition) return i.select(s[t], "prev")
            },
            e.select = function (e) {
                i.select(e)
            },
            e.isActive = function (e) {
                return i.currentSlide === e
            },
            e.slides = function () {
                return s
            },
            e.$watch("interval", l),
            e.$on("$destroy", c),
            e.play = function () {
                a || (a = !0, l())
            },
            e.pause = function () {
                e.noPause || (a = !1, c())
            },
            i.addSlide = function (t, n) {
                t.$element = n,
                    s.push(t),
                    s.length === 1 || t.active ? (i.select(s[s.length - 1]), s.length == 1 && e.play()) : t.active = !1
            },
            i.removeSlide = function (e) {
                var t = s.indexOf(e);
                s.splice(t, 1),
                    s.length > 0 && e.active ? t >= s.length ? i.select(s[t - 1]) : i.select(s[t]) : o > t && o--
            }
    }]).directive("carousel", [function () {
        return {
            restrict: "EA",
            transclude: !0,
            replace: !0,
            controller: "CarouselController",
            require: "carousel",
            templateUrl: "template/carousel/carousel.html",
            scope: {
                interval: "=",
                noTransition: "=",
                noPause: "="
            }
        }
    }]).directive("slide", ["$parse", function (e) {
        return {
            require: "^carousel",
            restrict: "EA",
            transclude: !0,
            replace: !0,
            templateUrl: "template/carousel/slide.html",
            scope: {},
            link: function (t, n, r, i) {
                if (r.active) {
                    var s = e(r.active),
                        o = s.assign,
                        u = t.active = s(t.$parent);
                    t.$watch(function () {
                        var n = s(t.$parent);
                        return n !== t.active && (n !== u ? u = t.active = n : o(t.$parent, n = u = t.active)),
                            n
                    })
                }
                i.addSlide(t, n),
                    t.$on("$destroy", function () {
                        i.removeSlide(t)
                    }),
                    t.$watch("active", function (e) {
                        e && i.select(t)
                    })
            }
        }
    }]),
    angular.module("ui.bootstrap.position", []).factory("$position", ["$document", "$window", function (e, t) {
        function n(e, n) {
            return e.currentStyle ? e.currentStyle[n] : t.getComputedStyle ? t.getComputedStyle(e)[n] : e.style[n]
        }
        function r(e) {
            return (n(e, "position") || "static") === "static"
        }
        var i = function (t) {
            var n = e[0],
                i = t.offsetParent || n;
            while (i && i !== n && r(i)) i = i.offsetParent;
            return i || n
        };
        return {
            position: function (t) {
                var n = this.offset(t),
                    r = {
                        top: 0,
                        left: 0
                    },
                    s = i(t[0]);
                s != e[0] && (r = this.offset(angular.element(s)), r.top += s.clientTop - s.scrollTop, r.left += s.clientLeft - s.scrollLeft);
                var o = t[0].getBoundingClientRect();
                return {
                    width: o.width || t.prop("offsetWidth"),
                    height: o.height || t.prop("offsetHeight"),
                    top: n.top - r.top,
                    left: n.left - r.left
                }
            },
            offset: function (n) {
                var r = n[0].getBoundingClientRect();
                return {
                    width: r.width || n.prop("offsetWidth"),
                    height: r.height || n.prop("offsetHeight"),
                    top: r.top + (t.pageYOffset || e[0].body.scrollTop || e[0].documentElement.scrollTop),
                    left: r.left + (t.pageXOffset || e[0].body.scrollLeft || e[0].documentElement.scrollLeft)
                }
            }
        }
    }]),
    angular.module("ui.bootstrap.datepicker", ["ui.bootstrap.position"]).constant("datepickerConfig", {
        dayFormat: "dd",
        monthFormat: "MMMM",
        yearFormat: "yyyy",
        dayHeaderFormat: "EEE",
        dayTitleFormat: "MMMM yyyy",
        monthTitleFormat: "yyyy",
        showWeeks: !0,
        startingDay: 0,
        yearRange: 20,
        minDate: null,
        maxDate: null
    }).controller("DatepickerController", ["$scope", "$attrs", "dateFilter", "datepickerConfig", function (e, t, n, r) {
        function u(t, n) {
            return angular.isDefined(t) ? e.$parent.$eval(t) : n
        }
        function a(e, t) {
            return (new Date(e, t, 0)).getDate()
        }
        function f(e, t) {
            var n = new Array(t),
                r = e,
                i = 0;
            while (i < t) n[i++] = new Date(r),
                r.setDate(r.getDate() + 1);
            return n
        }
        function l(e, t, r, i) {
            return {
                date: e,
                label: n(e, t),
                selected: !! r,
                secondary: !! i
            }
        }
        var i = {
                day: u(t.dayFormat, r.dayFormat),
                month: u(t.monthFormat, r.monthFormat),
                year: u(t.yearFormat, r.yearFormat),
                dayHeader: u(t.dayHeaderFormat, r.dayHeaderFormat),
                dayTitle: u(t.dayTitleFormat, r.dayTitleFormat),
                monthTitle: u(t.monthTitleFormat, r.monthTitleFormat)
            },
            s = u(t.startingDay, r.startingDay),
            o = u(t.yearRange, r.yearRange);
        this.minDate = r.minDate ? new Date(r.minDate) : null,
            this.maxDate = r.maxDate ? new Date(r.maxDate) : null,
            this.modes = [{
                name: "day",
                getVisibleDates: function (e, t) {
                    var r = e.getFullYear(),
                        o = e.getMonth(),
                        u = new Date(r, o, 1),
                        c = s - u.getDay(),
                        h = c > 0 ? 7 - c : -c,
                        p = new Date(u),
                        d = 0;
                    h > 0 && (p.setDate(-h + 1), d += h),
                        d += a(r, o + 1),
                        d += (7 - d % 7) % 7;
                    var v = f(p, d),
                        m = new Array(7);
                    for (var g = 0; g < d; g++) {
                        var y = new Date(v[g]);
                        v[g] = l(y, i.day, t && t.getDate() === y.getDate() && t.getMonth() === y.getMonth() && t.getFullYear() === y.getFullYear(), y.getMonth() !== o)
                    }
                    for (var b = 0; b < 7; b++) m[b] = n(v[b].date, i.dayHeader);
                    return {
                        objects: v,
                        title: n(e, i.dayTitle),
                        labels: m
                    }
                },
                compare: function (e, t) {
                    return new Date(e.getFullYear(), e.getMonth(), e.getDate()) - new Date(t.getFullYear(), t.getMonth(), t.getDate())
                },
                split: 7,
                step: {
                    months: 1
                }
            },
                {
                    name: "month",
                    getVisibleDates: function (e, t) {
                        var r = new Array(12),
                            s = e.getFullYear();
                        for (var o = 0; o < 12; o++) {
                            var u = new Date(s, o, 1);
                            r[o] = l(u, i.month, t && t.getMonth() === o && t.getFullYear() === s)
                        }
                        return {
                            objects: r,
                            title: n(e, i.monthTitle)
                        }
                    },
                    compare: function (e, t) {
                        return new Date(e.getFullYear(), e.getMonth()) - new Date(t.getFullYear(), t.getMonth())
                    },
                    split: 3,
                    step: {
                        years: 1
                    }
                },
                {
                    name: "year",
                    getVisibleDates: function (e, t) {
                        var n = new Array(o),
                            r = e.getFullYear(),
                            s = parseInt((r - 1) / o, 10) * o + 1;
                        for (var u = 0; u < o; u++) {
                            var a = new Date(s + u, 0, 1);
                            n[u] = l(a, i.year, t && t.getFullYear() === a.getFullYear())
                        }
                        return {
                            objects: n,
                            title: [n[0].label, n[o - 1].label].join(" - ")
                        }
                    },
                    compare: function (e, t) {
                        return e.getFullYear() - t.getFullYear()
                    },
                    split: 5,
                    step: {
                        years: o
                    }
                }],
            this.isDisabled = function (t, n) {
                var r = this.modes[n || 0];
                return this.minDate && r.compare(t, this.minDate) < 0 || this.maxDate && r.compare(t, this.maxDate) > 0 || e.dateDisabled && e.dateDisabled({
                        date: t,
                        mode: r.name
                    })
            }
    }]).directive("datepicker", ["dateFilter", "$parse", "datepickerConfig", "$log", function (e, t, n, r) {
        return {
            restrict: "EA",
            replace: !0,
            templateUrl: "template/datepicker/datepicker.html",
            scope: {
                dateDisabled: "&"
            },
            require: ["datepicker", "?^ngModel"],
            controller: "DatepickerController",
            link: function (e, i, s, o) {
                function h() {
                    e.showWeekNumbers = f === 0 && c
                }
                function p(e, t) {
                    var n = [];
                    while (e.length > 0) n.push(e.splice(0, t));
                    return n
                }
                function d(t) {
                    var n = null,
                        i = !0;
                    a.$modelValue && (n = new Date(a.$modelValue), isNaN(n) ? (i = !1, r.error('Datepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : t && (l = n)),
                        a.$setValidity("date", i);
                    var s = u.modes[f],
                        o = s.getVisibleDates(l, n);
                    angular.forEach(o.objects, function (e) {
                        e.disabled = u.isDisabled(e.date, f)
                    }),
                        a.$setValidity("date-disabled", !n || !u.isDisabled(n)),
                        e.rows = p(o.objects, s.split),
                        e.labels = o.labels || [],
                        e.title = o.title
                }
                function v(e) {
                    f = e,
                        h(),
                        d()
                }
                function m(e) {
                    var t = new Date(e);
                    t.setDate(t.getDate() + 4 - (t.getDay() || 7));
                    var n = t.getTime();
                    return t.setMonth(0),
                        t.setDate(1),
                    Math.floor(Math.round((n - t) / 864e5) / 7) + 1
                }
                var u = o[0],
                    a = o[1];
                if (!a) return;
                var f = 0,
                    l = new Date,
                    c = n.showWeeks;
                s.showWeeks ? e.$parent.$watch(t(s.showWeeks), function (e) {
                        c = !! e,
                            h()
                    }) : h(),
                s.min && e.$parent.$watch(t(s.min), function (e) {
                    u.minDate = e ? new Date(e) : null,
                        d()
                }),
                s.max && e.$parent.$watch(t(s.max), function (e) {
                    u.maxDate = e ? new Date(e) : null,
                        d()
                }),
                    a.$render = function () {
                        d(!0)
                    },
                    e.select = function (e) {
                        if (f === 0) {
                            var t = a.$modelValue ? new Date(a.$modelValue) : new Date(0, 0, 0, 0, 0, 0, 0);
                            t.setFullYear(e.getFullYear(), e.getMonth(), e.getDate()),
                                a.$setViewValue(t),
                                d(!0)
                        } else l = e,
                            v(f - 1)
                    },
                    e.move = function (e) {
                        var t = u.modes[f].step;
                        l.setMonth(l.getMonth() + e * (t.months || 0)),
                            l.setFullYear(l.getFullYear() + e * (t.years || 0)),
                            d()
                    },
                    e.toggleMode = function () {
                        v((f + 1) % u.modes.length)
                    },
                    e.getWeekNumber = function (t) {
                        return f === 0 && e.showWeekNumbers && t.length === 7 ? m(t[0].date) : null
                    }
            }
        }
    }]).constant("datepickerPopupConfig", {
        dateFormat: "yyyy-MM-dd",
        currentText: "Today",
        toggleWeeksText: "Weeks",
        clearText: "Clear",
        closeText: "Done",
        closeOnDateSelection: !0,
        appendToBody: !1,
        showButtonBar: !0
    }).directive("datepickerPopup", ["$compile", "$parse", "$document", "$position", "dateFilter", "datepickerPopupConfig", "datepickerConfig", function (e, t, n, r, i, s, o) {
        return {
            restrict: "EA",
            require: "ngModel",
            link: function (u, a, f, l) {
                function g(e) {
                    m ? m(u, !! e) : c.isOpen = !! e
                }
                function x(e) {
                    if (!e) return l.$setValidity("date", !0),
                        null;
                    if (angular.isDate(e)) return l.$setValidity("date", !0),
                        e;
                    if (angular.isString(e)) {
                        var t = new Date(e);
                        return isNaN(t) ? (l.$setValidity("date", !1), undefined) : (l.$setValidity("date", !0), t)
                    }
                    return l.$setValidity("date", !1),
                        undefined
                }
                function T(e, n, r) {
                    e && (u.$watch(t(e), function (e) {
                        c[n] = e
                    }), E.attr(r || n, n))
                }
                function N() {
                    c.position = d ? r.offset(a) : r.position(a),
                    r.offset(a).left + w.width() > angular.element(document).width() && (c.position.left = c.position.left - (r.offset(a).left + w.width() - angular.element(document).width()) - 4),
                        c.position.top = c.position.top + a.prop("offsetHeight")
                }
                var c = u.$new(),
                    h, p = angular.isDefined(f.closeOnDateSelection) ? u.$eval(f.closeOnDateSelection) : s.closeOnDateSelection,
                    d = angular.isDefined(f.datepickerAppendToBody) ? u.$eval(f.datepickerAppendToBody) : s.appendToBody;
                f.$observe("datepickerPopup", function (e) {
                    h = e || s.dateFormat,
                        l.$render()
                }),
                    c.showButtonBar = angular.isDefined(f.showButtonBar) ? u.$eval(f.showButtonBar) : s.showButtonBar,
                    u.$on("$destroy", function () {
                        L.remove(),
                            c.$destroy()
                    }),
                    f.$observe("currentText", function (e) {
                        c.currentText = angular.isDefined(e) ? e : s.currentText
                    }),
                    f.$observe("toggleWeeksText", function (e) {
                        c.toggleWeeksText = angular.isDefined(e) ? e : s.toggleWeeksText
                    }),
                    f.$observe("clearText", function (e) {
                        c.clearText = angular.isDefined(e) ? e : s.clearText
                    }),
                    f.$observe("closeText", function (e) {
                        c.closeText = angular.isDefined(e) ? e : s.closeText
                    });
                var v, m;
                f.isOpen && (v = t(f.isOpen), m = v.assign, u.$watch(v, function (t) {
                    c.isOpen = !! t
                })),
                    c.isOpen = v ? v(u) : !1;
                var y = function (e) {
                        c.isOpen && e.target !== a[0] && c.$apply(function () {
                            g(!1)
                        })
                    },
                    b = function () {
                        c.$apply(function () {
                            g(!0)
                        })
                    },
                    w = angular.element("<div datepicker-popup-wrap><div datepicker></div></div>");
                w.attr({
                    "ng-model": "date",
                    "ng-change": "dateSelection()"
                });
                var E = angular.element(w.children()[0]),
                    S = {};
                f.datepickerOptions && (S = u.$eval(f.datepickerOptions), E.attr(angular.extend({}, S))),
                    l.$parsers.unshift(x),
                    c.dateSelection = function (e) {
                        angular.isDefined(e) && (c.date = e),
                            l.$setViewValue(c.date),
                            l.$render(),
                        p && g(!1)
                    },
                    a.bind("input change keyup", function () {
                        c.$apply(function () {
                            c.date = l.$modelValue
                        })
                    }),
                    l.$render = function () {
                        var e = l.$viewValue ? i(l.$viewValue, h) : "";
                        a.val(e),
                            c.date = l.$modelValue
                    },
                    T(f.min, "min"),
                    T(f.max, "max"),
                    f.showWeeks ? T(f.showWeeks, "showWeeks", "show-weeks") : (c.showWeeks = "show-weeks" in S ? S["show-weeks"] : o.showWeeks, E.attr("show-weeks", "showWeeks")),
                f.dateDisabled && E.attr("date-disabled", f.dateDisabled);
                var C = !1,
                    k = !1;
                c.$watch("isOpen", function (e) {
                    e ? (N(), n.bind("click", y), k && a.unbind("focus", b), a[0].focus(), C = !0) : (C && n.unbind("click", y), a.bind("focus", b), k = !0),
                    m && m(u, e)
                }),
                    c.today = function () {
                        c.dateSelection(new Date)
                    },
                    c.clear = function () {
                        c.dateSelection(null)
                    };
                var L = e(w)(c);
                d ? n.find("body").append(L) : a.after(L)
            }
        }
    }]).directive("datepickerPopupWrap", function () {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            templateUrl: "template/datepicker/popup.html",
            link: function (e, t, n) {
                t.bind("click", function (e) {
                    e.preventDefault(),
                        e.stopPropagation()
                })
            }
        }
    }),
    angular.module("ui.bootstrap.dropdownToggle", []).directive("dropdownToggle", ["$document", "$location", function (e, t) {
        var n = null,
            r = angular.noop;
        return {
            restrict: "CA",
            link: function (t, i, s) {
                t.$watch("$location.path", function () {
                    r()
                }),
                    i.parent().bind("click", function () {
                        r()
                    }),
                    i.bind("click", function (t) {
                        var s = i === n;
                        t.preventDefault(),
                            t.stopPropagation(),
                        !n || r(),
                        !s && !i.hasClass("disabled") && !i.prop("disabled") && (i.parent().addClass("open"), n = i, r = function (t) {
                            t && t.stopPropagation(),
                                e.unbind("click", r),
                                i.parent().removeClass("open"),
                                r = angular.noop,
                                n = null
                        }, e.bind("click", r))
                    })
            }
        }
    }]),
    angular.module("ui.bootstrap.modal", ["ui.bootstrap.transition"]).factory("$$stackedMap", function () {
        return {
            createNew: function () {
                var e = [];
                return {
                    add: function (t, n) {
                        e.push({
                            key: t,
                            value: n
                        })
                    },
                    get: function (t) {
                        for (var n = 0; n < e.length; n++) if (t == e[n].key) return e[n]
                    },
                    keys: function () {
                        var t = [];
                        for (var n = 0; n < e.length; n++) t.push(e[n].key);
                        return t
                    },
                    top: function () {
                        return e[e.length - 1]
                    },
                    remove: function (t) {
                        var n = -1;
                        for (var r = 0; r < e.length; r++) if (t == e[r].key) {
                            n = r;
                            break
                        }
                        return e.splice(n, 1)[0]
                    },
                    removeTop: function () {
                        return e.splice(e.length - 1, 1)[0]
                    },
                    length: function () {
                        return e.length
                    }
                }
            }
        }
    }).directive("modalBackdrop", ["$timeout", function (e) {
        return {
            restrict: "EA",
            replace: !0,
            templateUrl: "template/modal/backdrop.html",
            link: function (t) {
                t.animate = !1,
                    e(function () {
                        t.animate = !0
                    })
            }
        }
    }]).directive("modalWindow", ["$modalStack", "$timeout", function (e, t) {
        return {
            restrict: "EA",
            scope: {
                index: "@",
                animate: "="
            },
            replace: !0,
            transclude: !0,
            templateUrl: "template/modal/window.html",
            link: function (n, r, i) {
                n.windowClass = i.windowClass || "",
                    t(function () {
                        n.animate = !0,
                            r[0].focus()
                    }),
                    n.close = function (t) {
                        var n = e.getTop();
                        n && n.value.backdrop && n.value.backdrop != "static" && t.target === t.currentTarget && (t.preventDefault(), t.stopPropagation(), e.dismiss(n.key, "backdrop click"))
                    }
            }
        }
    }]).factory("$modalStack", ["$transition", "$timeout", "$document", "$compile", "$rootScope", "$$stackedMap", function (e, t, n, r, i, s) {
        function c() {
            var e = -1,
                t = f.keys();
            for (var n = 0; n < t.length; n++) f.get(t[n]).value.backdrop && (e = n);
            return e
        }
        function h(e) {
            var t = n.find("body").eq(0),
                r = f.get(e).value;
            f.remove(e),
                d(r.modalDomEl, r.modalScope, 300, p),
                t.toggleClass(o, f.length() > 0)
        }
        function p() {
            if (u && c() == -1) {
                var e = a;
                d(u, a, 150, function () {
                    e.$destroy(),
                        e = null
                }),
                    u = undefined,
                    a = undefined
            }
        }
        function d(n, r, i, s) {
            function a() {
                if (a.done) return;
                a.done = !0,
                    n.remove(),
                s && s()
            }
            r.animate = !1;
            var o = e.transitionEndEventName;
            if (o) {
                var u = t(a, i);
                n.bind(o, function () {
                    t.cancel(u),
                        a(),
                        r.$apply()
                })
            } else t(a, 0)
        }
        var o = "modal-open",
            u, a, f = s.createNew(),
            l = {};
        return i.$watch(c, function (e) {
            a && (a.index = e)
        }),
            n.bind("keydown", function (e) {
                var t;
                e.which === 27 && (t = f.top(), t && t.value.keyboard && i.$apply(function () {
                    l.dismiss(t.key)
                }))
            }),
            l.open = function (e, t) {
                f.add(e, {
                    deferred: t.deferred,
                    modalScope: t.scope,
                    backdrop: t.backdrop,
                    keyboard: t.keyboard
                });
                var s = n.find("body").eq(0),
                    l = c();
                l >= 0 && !u && (a = i.$new(!0), a.index = l, u = r("<div modal-backdrop></div>")(a), s.append(u));
                var h = angular.element("<div modal-window></div>");
                h.attr("window-class", t.windowClass),
                    h.attr("index", f.length() - 1),
                    h.attr("animate", "animate"),
                    h.html(t.content);
                var p = r(h)(t.scope);
                f.top().value.modalDomEl = p,
                    s.append(p),
                    s.addClass(o)
            },
            l.close = function (e, t) {
                var n = f.get(e).value;
                n && (n.deferred.resolve(t), h(e))
            },
            l.dismiss = function (e, t) {
                var n = f.get(e).value;
                n && (n.deferred.reject(t), h(e))
            },
            l.dismissAll = function (e) {
                var t = this.getTop();
                while (t) this.dismiss(t.key, e),
                    t = this.getTop()
            },
            l.getTop = function () {
                return f.top()
            },
            l
    }]).provider("$modal", function () {
        var e = {
            options: {
                backdrop: !0,
                keyboard: !0
            },
            $get: ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function (t, n, r, i, s, o, u) {
                function f(e) {
                    return e.template ? r.when(e.template) : i.get(e.templateUrl, {
                            cache: s
                        }).then(function (e) {
                            return e.data
                        })
                }
                function l(e) {
                    var n = [];
                    return angular.forEach(e, function (e, i) {
                        (angular.isFunction(e) || angular.isArray(e)) && n.push(r.when(t.invoke(e)))
                    }),
                        n
                }
                var a = {};
                return a.open = function (t) {
                    var i = r.defer(),
                        s = r.defer(),
                        a = {
                            result: i.promise,
                            opened: s.promise,
                            close: function (e) {
                                u.close(a, e)
                            },
                            dismiss: function (e) {
                                u.dismiss(a, e)
                            }
                        };
                    t = angular.extend({}, e.options, t),
                        t.resolve = t.resolve || {};
                    if (!t.template && !t.templateUrl) throw new Error("One of template or templateUrl options is required.");
                    var c = r.all([f(t)].concat(l(t.resolve)));
                    return c.then(function (r) {
                        var s = (t.scope || n).$new();
                        s.$close = a.close,
                            s.$dismiss = a.dismiss;
                        var f, l = {},
                            c = 1;
                        t.controller && (l.$scope = s, l.$modalInstance = a, angular.forEach(t.resolve, function (e, t) {
                            l[t] = r[c++]
                        }), f = o(t.controller, l)),
                            u.open(a, {
                                scope: s,
                                deferred: i,
                                content: r[0],
                                backdrop: t.backdrop,
                                keyboard: t.keyboard,
                                windowClass: t.windowClass
                            })
                    }, function (t) {
                        i.reject(t)
                    }),
                        c.then(function () {
                            s.resolve(!0)
                        }, function () {
                            s.reject(!1)
                        }),
                        a
                },
                    a
            }]
        };
        return e
    }),
    angular.module("ui.bootstrap.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", "$interpolate", function (e, t, n, r) {
        var i = this,
            s = t.numPages ? n(t.numPages).assign : angular.noop;
        this.init = function (r) {
            t.itemsPerPage ? e.$parent.$watch(n(t.itemsPerPage), function (t) {
                    i.itemsPerPage = parseInt(t, 10),
                        e.totalPages = i.calculateTotalPages()
                }) : this.itemsPerPage = r
        },
            this.noPrevious = function () {
                return this.page === 1
            },
            this.noNext = function () {
                return this.page === e.totalPages
            },
            this.isActive = function (e) {
                return this.page === e
            },
            this.calculateTotalPages = function () {
                var t = this.itemsPerPage < 1 ? 1 : Math.ceil(e.totalItems / this.itemsPerPage);
                return Math.max(t || 0, 1)
            },
            this.getAttributeValue = function (t, n, i) {
                return angular.isDefined(t) ? i ? r(t)(e.$parent) : e.$parent.$eval(t) : n
            },
            this.render = function () {
                this.page = parseInt(e.page, 10) || 1,
                this.page > 0 && this.page <= e.totalPages && (e.pages = this.getPages(this.page, e.totalPages))
            },
            e.selectPage = function (t) {
                !i.isActive(t) && t > 0 && t <= e.totalPages && (e.page = t, e.onSelectPage({
                    page: t
                }))
            },
            e.$watch("page", function () {
                i.render()
            }),
            e.$watch("totalItems", function () {
                e.totalPages = i.calculateTotalPages()
            }),
            e.$watch("totalPages", function (t) {
                s(e.$parent, t),
                    i.page > t ? e.selectPage(t) : i.render()
            })
    }]).constant("paginationConfig", {
        itemsPerPage: 10,
        boundaryLinks: !1,
        directionLinks: !0,
        firstText: "First",
        previousText: "Previous",
        nextText: "Next",
        lastText: "Last",
        rotate: !0
    }).directive("pagination", ["$parse", "paginationConfig", function (e, t) {
        return {
            restrict: "EA",
            scope: {
                page: "=",
                totalItems: "=",
                onSelectPage: " &"
            },
            controller: "PaginationController",
            templateUrl: "template/pagination/pagination.html",
            replace: !0,
            link: function (n, r, i, s) {
                function d(e, t, n, r) {
                    return {
                        number: e,
                        text: t,
                        active: n,
                        disabled: r
                    }
                }
                var o, u = s.getAttributeValue(i.boundaryLinks, t.boundaryLinks),
                    a = s.getAttributeValue(i.directionLinks, t.directionLinks),
                    f = s.getAttributeValue(i.firstText, t.firstText, !0),
                    l = s.getAttributeValue(i.previousText, t.previousText, !0),
                    c = s.getAttributeValue(i.nextText, t.nextText, !0),
                    h = s.getAttributeValue(i.lastText, t.lastText, !0),
                    p = s.getAttributeValue(i.rotate, t.rotate);
                s.init(t.itemsPerPage),
                i.maxSize && n.$parent.$watch(e(i.maxSize), function (e) {
                    o = parseInt(e, 10),
                        s.render()
                }),
                    s.getPages = function (e, t) {
                        var n = [],
                            r = 1,
                            i = t,
                            v = angular.isDefined(o) && o < t;
                        v && (p ? (r = Math.max(e - Math.floor(o / 2), 1), i = r + o - 1, i > t && (i = t, r = i - o + 1)) : (r = (Math.ceil(e / o) - 1) * o + 1, i = Math.min(r + o - 1, t)));
                        for (var m = r; m <= i; m++) {
                            var g = d(m, m, s.isActive(m), !1);
                            n.push(g)
                        }
                        if (v && !p) {
                            if (r > 1) {
                                var y = d(r - 1, "...", !1, !1);
                                n.unshift(y)
                            }
                            if (i < t) {
                                var b = d(i + 1, "...", !1, !1);
                                n.push(b)
                            }
                        }
                        if (a) {
                            var w = d(e - 1, l, !1, s.noPrevious());
                            n.unshift(w);
                            var E = d(e + 1, c, !1, s.noNext());
                            n.push(E)
                        }
                        if (u) {
                            var S = d(1, f, !1, s.noPrevious());
                            n.unshift(S);
                            var x = d(t, h, !1, s.noNext());
                            n.push(x)
                        }
                        return n
                    }
            }
        }
    }]).constant("pagerConfig", {
        itemsPerPage: 10,
        previousText: "« Previous",
        nextText: "Next »",
        align: !0
    }).directive("pager", ["pagerConfig", function (e) {
        return {
            restrict: "EA",
            scope: {
                page: "=",
                totalItems: "=",
                onSelectPage: " &"
            },
            controller: "PaginationController",
            templateUrl: "template/pagination/pager.html",
            replace: !0,
            link: function (t, n, r, i) {
                function a(e, t, n, r, i) {
                    return {
                        number: e,
                        text: t,
                        disabled: n,
                        previous: u && r,
                        next: u && i
                    }
                }
                var s = i.getAttributeValue(r.previousText, e.previousText, !0),
                    o = i.getAttributeValue(r.nextText, e.nextText, !0),
                    u = i.getAttributeValue(r.align, e.align);
                i.init(e.itemsPerPage),
                    i.getPages = function (e) {
                        return [a(e - 1, s, i.noPrevious(), !0, !1), a(e + 1, o, i.noNext(), !1, !0)]
                    }
            }
        }
    }]),
    angular.module("ui.bootstrap.tooltip", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).provider("$tooltip", function () {
        function r(e) {
            var t = /[A-Z]/g,
                n = "-";
            return e.replace(t, function (e, t) {
                return (t ? n : "") + e.toLowerCase()
            })
        }
        var e = {
                placement: "top",
                animation: !0,
                popupDelay: 0
            },
            t = {
                mouseenter: "mouseleave",
                click: "click",
                focus: "blur"
            },
            n = {};
        this.options = function (e) {
            angular.extend(n, e)
        },
            this.setTriggers = function (n) {
                angular.extend(t, n)
            },
            this.$get = ["$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", function (i, s, o, u, a, f, l) {
                return function (c, h, p) {
                    function v(e) {
                        var n = e || d.trigger || p,
                            r = t[n] || n;
                        return {
                            show: n,
                            hide: r
                        }
                    }
                    var d = angular.extend({}, e, n),
                        m = r(c),
                        g = l.startSymbol(),
                        y = l.endSymbol(),
                        b = "<div " + m + "-popup " + 'title="' + g + "tt_title" + y + '" ' + 'content="' + g + "tt_content" + y + '" ' + 'placement="' + g + "tt_placement" + y + '" ' + 'animation="tt_animation" ' + 'is-open="tt_isOpen"' + ">" + "</div>";
                    return {
                        restrict: "EA",
                        scope: !0,
                        compile: function (e, t) {
                            var n = s(b);
                            return function (t, r, i) {
                                function E() {
                                    t.tt_isOpen ? x() : S()
                                }
                                function S() {
                                    if (b && !t.$eval(i[h + "Enable"])) return;
                                    t.tt_popupDelay ? (p = o(T, t.tt_popupDelay, !1), p.then(function (e) {
                                            e()
                                        })) : T()()
                                }
                                function x() {
                                    t.$apply(function () {
                                        N()
                                    })
                                }
                                function T() {
                                    return t.tt_content ? (C(), l && o.cancel(l), s.css({
                                            top: 0,
                                            left: 0,
                                            display: "block"
                                        }), m ? a.find("body").append(s) : r.after(s), w(), t.tt_isOpen = !0, t.$digest(), w) : angular.noop
                                }
                                function N() {
                                    t.tt_isOpen = !1,
                                        o.cancel(p),
                                        t.tt_animation ? l = o(k, 500) : k()
                                }
                                function C() {
                                    s && k(),
                                        s = n(t, function () {}),
                                        t.$digest()
                                }
                                function k() {
                                    s && (s.remove(), s = null)
                                }
                                var s, l, p, m = angular.isDefined(d.appendToBody) ? d.appendToBody : !1,
                                    g = v(undefined),
                                    y = !1,
                                    b = angular.isDefined(i[h + "Enable"]),
                                    w = function () {
                                        var e, n, i, o;
                                        e = m ? f.offset(r) : f.position(r),
                                            n = s.prop("offsetWidth"),
                                            i = s.prop("offsetHeight");
                                        switch (t.tt_placement) {
                                            case "right":
                                                o = {
                                                    top: e.top + e.height / 2 - i / 2,
                                                    left: e.left + e.width
                                                };
                                                break;
                                            case "bottom":
                                                o = {
                                                    top: e.top + e.height,
                                                    left: e.left + e.width / 2 - n / 2
                                                };
                                                break;
                                            case "left":
                                                o = {
                                                    top: e.top + e.height / 2 - i / 2,
                                                    left: e.left - n
                                                };
                                                break;
                                            default:
                                                o = {
                                                    top: e.top - i,
                                                    left: e.left + e.width / 2 - n / 2
                                                }
                                        }
                                        o.top += "px",
                                            o.left += "px",
                                            s.css(o)
                                    };
                                t.tt_isOpen = !1,
                                    i.$observe(c, function (e) {
                                        t.tt_content = e,
                                        !e && t.tt_isOpen && N()
                                    }),
                                    i.$observe(h + "Title", function (e) {
                                        t.tt_title = e
                                    }),
                                    i.$observe(h + "Placement", function (e) {
                                        t.tt_placement = angular.isDefined(e) ? e : d.placement
                                    }),
                                    i.$observe(h + "PopupDelay", function (e) {
                                        var n = parseInt(e, 10);
                                        t.tt_popupDelay = isNaN(n) ? d.popupDelay : n
                                    });
                                var L = function () {
                                    y && (r.unbind(g.show, S), r.unbind(g.hide, x))
                                };
                                i.$observe(h + "Trigger", function (e) {
                                    L(),
                                        g = v(e),
                                        g.show === g.hide ? r.bind(g.show, E) : (r.bind(g.show, S), r.bind(g.hide, x)),
                                        y = !0
                                });
                                var A = t.$eval(i[h + "Animation"]);
                                t.tt_animation = angular.isDefined(A) ? !! A : d.animation,
                                    i.$observe(h + "AppendToBody", function (e) {
                                        m = angular.isDefined(e) ? u(e)(t) : m
                                    }),
                                m && t.$on("$locationChangeSuccess", function () {
                                    t.tt_isOpen && N()
                                }),
                                    t.$on("$destroy", function () {
                                        o.cancel(l),
                                            o.cancel(p),
                                            L(),
                                            k()
                                    })
                            }
                        }
                    }
                }
            }]
    }).directive("tooltipPopup", function () {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                content: "@",
                placement: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/tooltip/tooltip-popup.html"
        }
    }).directive("tooltip", ["$tooltip", function (e) {
        return e("tooltip", "tooltip", "mouseenter")
    }]).directive("tooltipHtmlUnsafePopup", function () {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                content: "@",
                placement: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
        }
    }).directive("tooltipHtmlUnsafe", ["$tooltip", function (e) {
        return e("tooltipHtmlUnsafe", "tooltip", "mouseenter")
    }]),
    angular.module("ui.bootstrap.popover", ["ui.bootstrap.tooltip"]).directive("popoverPopup", function () {
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                title: "@",
                content: "@",
                placement: "@",
                animation: "&",
                isOpen: "&"
            },
            templateUrl: "template/popover/popover.html"
        }
    }).directive("popover", ["$tooltip", function (e) {
        return e("popover", "popover", "click")
    }]),
    angular.module("ui.bootstrap.progressbar", ["ui.bootstrap.transition"]).constant("progressConfig", {
        animate: !0,
        max: 100
    }).controller("ProgressController", ["$scope", "$attrs", "progressConfig", "$transition", function (e, t, n, r) {
        var i = this,
            s = [],
            o = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : n.max,
            u = angular.isDefined(t.animate) ? e.$parent.$eval(t.animate) : n.animate;
        this.addBar = function (e, t) {
            var n = 0,
                r = e.$parent.$index;
            angular.isDefined(r) && s[r] && (n = s[r].value),
                s.push(e),
                this.update(t, e.value, n),
                e.$watch("value", function (e, n) {
                    e !== n && i.update(t, e, n)
                }),
                e.$on("$destroy", function () {
                    i.removeBar(e)
                })
        },
            this.update = function (e, t, n) {
                var i = this.getPercentage(t);
                u ? (e.css("width", this.getPercentage(n) + "%"), r(e, {
                        width: i + "%"
                    })) : e.css({
                        transition: "none",
                        width: i + "%"
                    })
            },
            this.removeBar = function (e) {
                s.splice(s.indexOf(e), 1)
            },
            this.getPercentage = function (e) {
                return Math.round(100 * e / o)
            }
    }]).directive("progress", function () {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            controller: "ProgressController",
            require: "progress",
            scope: {},
            template: '<div class="progress" ng-transclude></div>'
        }
    }).directive("bar", function () {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            require: "^progress",
            scope: {
                value: "=",
                type: "@"
            },
            templateUrl: "template/progressbar/bar.html",
            link: function (e, t, n, r) {
                r.addBar(e, t)
            }
        }
    }).directive("progressbar", function () {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            controller: "ProgressController",
            scope: {
                value: "=",
                type: "@"
            },
            templateUrl: "template/progressbar/progressbar.html",
            link: function (e, t, n, r) {
                r.addBar(e, angular.element(t.children()[0]))
            }
        }
    }),
    angular.module("ui.bootstrap.rating", []).constant("ratingConfig", {
        max: 5,
        stateOn: null,
        stateOff: null
    }).controller("RatingController", ["$scope", "$attrs", "$parse", "ratingConfig", function (e, t, n, r) {
        this.maxRange = angular.isDefined(t.max) ? e.$parent.$eval(t.max) : r.max,
            this.stateOn = angular.isDefined(t.stateOn) ? e.$parent.$eval(t.stateOn) : r.stateOn,
            this.stateOff = angular.isDefined(t.stateOff) ? e.$parent.$eval(t.stateOff) : r.stateOff,
            this.createRateObjects = function (e) {
                var t = {
                    stateOn: this.stateOn,
                    stateOff: this.stateOff
                };
                for (var n = 0, r = e.length; n < r; n++) e[n] = angular.extend({
                    index: n
                }, t, e[n]);
                return e
            },
            e.range = angular.isDefined(t.ratingStates) ? this.createRateObjects(angular.copy(e.$parent.$eval(t.ratingStates))) : this.createRateObjects(new Array(this.maxRange)),
            e.rate = function (t) {
                e.value !== t && !e.readonly && (e.value = t)
            },
            e.enter = function (t) {
                e.readonly || (e.val = t),
                    e.onHover({
                        value: t
                    })
            },
            e.reset = function () {
                e.val = angular.copy(e.value),
                    e.onLeave()
            },
            e.$watch("value", function (t) {
                e.val = t
            }),
            e.readonly = !1,
        t.readonly && e.$parent.$watch(n(t.readonly), function (t) {
            e.readonly = !! t
        })
    }]).directive("rating", function () {
        return {
            restrict: "EA",
            scope: {
                value: "=",
                onHover: "&",
                onLeave: "&"
            },
            controller: "RatingController",
            templateUrl: "template/rating/rating.html",
            replace: !0
        }
    }),
    angular.module("ui.bootstrap.tabs", []).controller("TabsetController", ["$scope", function (t) {
        var n = this,
            r = n.tabs = t.tabs = [];
        n.select = function (e) {
            angular.forEach(r, function (e) {
                e.active = !1
            }),
                e.active = !0
        },
            n.addTab = function (t) {
                r.push(t),
                (r.length === 1 || t.active) && n.select(t)
            },
            n.removeTab = function (t) {
                var i = r.indexOf(t);
                if (t.active && r.length > 1) {
                    var s = i == r.length - 1 ? i - 1 : i + 1;
                    n.select(r[s])
                }
                r.splice(i, 1)
            }
    }]).directive("tabset", function () {
        return {
            restrict: "EA",
            transclude: !0,
            replace: !0,
            scope: {},
            controller: "TabsetController",
            templateUrl: "template/tabs/tabset.html",
            link: function (e, t, n) {
                e.vertical = angular.isDefined(n.vertical) ? e.$parent.$eval(n.vertical) : !1,
                    e.justified = angular.isDefined(n.justified) ? e.$parent.$eval(n.justified) : !1,
                    e.type = angular.isDefined(n.type) ? e.$parent.$eval(n.type) : "tabs"
            }
        }
    }).directive("tab", ["$parse", function (e) {
        return {
            require: "^tabset",
            restrict: "EA",
            replace: !0,
            templateUrl: "template/tabs/tab.html",
            transclude: !0,
            scope: {
                heading: "@",
                onSelect: "&select",
                onDeselect: "&deselect"
            },
            controller: function () {},
            compile: function (t, n, r) {
                return function (n, i, s, o) {
                    var u, a;
                    s.active ? (u = e(s.active), a = u.assign, n.$parent.$watch(u, function (t, r) {
                            t !== r && (n.active = !! t)
                        }), n.active = u(n.$parent)) : a = u = angular.noop,
                        n.$watch("active", function (e) {
                            a(n.$parent, e),
                                e ? (o.select(n), n.onSelect()) : n.onDeselect()
                        }),
                        n.disabled = !1,
                    s.disabled && n.$parent.$watch(e(s.disabled), function (e) {
                        n.disabled = !! e
                    }),
                        n.select = function () {
                            n.disabled || (n.active = !0)
                        },
                        o.addTab(n),
                        n.$on("$destroy", function () {
                            o.removeTab(n)
                        }),
                        n.$transcludeFn = r
                }
            }
        }
    }]).directive("tabHeadingTransclude", [function () {
        return {
            restrict: "A",
            require: "^tab",
            link: function (e, t, n, r) {
                e.$watch("headingElement", function (n) {
                    n && (t.html(""), t.append(n))
                })
            }
        }
    }]).directive("tabContentTransclude", function () {
        function e(e) {
            return e.tagName && (e.hasAttribute("tab-heading") || e.hasAttribute("data-tab-heading") || e.tagName.toLowerCase() === "tab-heading" || e.tagName.toLowerCase() === "data-tab-heading")
        }
        return {
            restrict: "A",
            require: "^tabset",
            link: function (t, n, r) {
                var i = t.$eval(r.tabContentTransclude);
                i.$transcludeFn(i.$parent, function (t) {
                    angular.forEach(t, function (t) {
                        e(t) ? i.headingElement = t : n.append(t)
                    })
                })
            }
        }
    }),
    angular.module("ui.bootstrap.timepicker", []).constant("timepickerConfig", {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: !0,
        meridians: null,
        readonlyInput: !1,
        mousewheel: !0
    }).directive("timepicker", ["$parse", "$log", "timepickerConfig", "$locale", function (e, t, n, r) {
        return {
            restrict: "EA",
            require: "?^ngModel",
            replace: !0,
            scope: {},
            templateUrl: "template/timepicker/timepicker.html",
            link: function (i, s, o, u) {
                function h() {
                    var e = parseInt(i.hours, 10),
                        t = i.showMeridian ? e > 0 && e < 13 : e >= 0 && e < 24;
                    return t ? (i.showMeridian && (e === 12 && (e = 0), i.meridian === f[1] && (e += 12)), e) : undefined
                }
                function p() {
                    var e = parseInt(i.minutes, 10);
                    return e >= 0 && e < 60 ? e : undefined
                }
                function d(e) {
                    return angular.isDefined(e) && e.toString().length < 2 ? "0" + e : e
                }
                function E(e) {
                    S(),
                        u.$setViewValue(new Date(a)),
                        x(e)
                }
                function S() {
                    u.$setValidity("time", !0),
                        i.invalidHours = !1,
                        i.invalidMinutes = !1
                }
                function x(e) {
                    var t = a.getHours(),
                        n = a.getMinutes();
                    i.showMeridian && (t = t === 0 || t === 12 ? 12 : t % 12),
                        i.hours = e === "h" ? t : d(t),
                        i.minutes = e === "m" ? n : d(n),
                        i.meridian = a.getHours() < 12 ? f[0] : f[1]
                }
                function T(e) {
                    var t = new Date(a.getTime() + e * 6e4);
                    a.setHours(t.getHours(), t.getMinutes()),
                        E()
                }
                if (!u) return;
                i.$parent.$watch(e(o.ngDisabled), function (e) {
                    i.readonlyInput = e
                });
                var a = new Date,
                    f = angular.isDefined(o.meridians) ? i.$parent.$eval(o.meridians) : n.meridians || r.DATETIME_FORMATS.AMPMS,
                    l = n.hourStep;
                o.hourStep && i.$parent.$watch(e(o.hourStep), function (e) {
                    l = parseInt(e, 10)
                });
                var c = n.minuteStep;
                o.minuteStep && i.$parent.$watch(e(o.minuteStep), function (e) {
                    c = parseInt(e, 10)
                }),
                    i.showMeridian = n.showMeridian,
                o.showMeridian && i.$parent.$watch(e(o.showMeridian), function (e) {
                    i.showMeridian = !! e;
                    if (u.$error.time) {
                        var t = h(),
                            n = p();
                        angular.isDefined(t) && angular.isDefined(n) && (a.setHours(t), E())
                    } else x()
                });
                var v = s.find("input"),
                    m = v.eq(0),
                    g = v.eq(1),
                    y = angular.isDefined(o.mousewheel) ? i.$eval(o.mousewheel) : n.mousewheel;
                if (y) {
                    var b = function (e) {
                        e.originalEvent && (e = e.originalEvent);
                        var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                        return e.detail || t > 0
                    };
                    m.bind("mousewheel wheel", function (e) {
                        if (i.readonlyInput) return;
                        i.$apply(b(e) ? i.incrementHours() : i.decrementHours()),
                            e.preventDefault()
                    }),
                        g.bind("mousewheel wheel", function (e) {
                            if (i.readonlyInput) return;
                            i.$apply(b(e) ? i.incrementMinutes() : i.decrementMinutes()),
                                e.preventDefault()
                        })
                }
                i.readonlyInput = angular.isDefined(o.readonlyInput) ? i.$eval(o.readonlyInput) : n.readonlyInput;
                if (!i.readonlyInput) {
                    var w = function (e, t) {
                        u.$setViewValue(null),
                            u.$setValidity("time", !1),
                        angular.isDefined(e) && (i.invalidHours = e),
                        angular.isDefined(t) && (i.invalidMinutes = t)
                    };
                    i.updateHours = function () {
                        var e = h();
                        angular.isDefined(e) ? (a.setHours(e), E("h")) : w(!0)
                    },
                        m.bind("blur", function (e) {
                            !i.validHours && i.hours < 10 && i.$apply(function () {
                                i.hours = d(i.hours)
                            })
                        }),
                        i.updateMinutes = function () {
                            var e = p();
                            angular.isDefined(e) ? (a.setMinutes(e), E("m")) : w(undefined, !0)
                        },
                        g.bind("blur", function (e) {
                            !i.invalidMinutes && i.minutes < 10 && i.$apply(function () {
                                i.minutes = d(i.minutes)
                            })
                        })
                } else i.updateHours = angular.noop,
                    i.updateMinutes = angular.noop;
                u.$render = function () {
                    var e = u.$modelValue ? new Date(u.$modelValue) : null;
                    isNaN(e) ? (u.$setValidity("time", !1), t.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')) : (e && (a = e), S(), x())
                },
                    i.incrementHours = function () {
                        T(l * 60)
                    },
                    i.decrementHours = function () {
                        T(-l * 60)
                    },
                    i.incrementMinutes = function () {
                        T(c)
                    },
                    i.decrementMinutes = function () {
                        T(-c)
                    },
                    i.toggleMeridian = function () {
                        T(720 * (a.getHours() < 12 ? 1 : -1))
                    }
            }
        }
    }]),
    angular.module("ui.bootstrap.typeahead", ["ui.bootstrap.position", "ui.bootstrap.bindHtml"]).factory("typeaheadParser", ["$parse", function (e) {
        var t = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;
        return {
            parse: function (n) {
                var r = n.match(t),
                    i, s, o;
                if (!r) throw new Error("Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_' but got '" + n + "'.");
                return {
                    itemName: r[3],
                    source: e(r[4]),
                    viewMapper: e(r[2] || r[1]),
                    modelMapper: e(r[1])
                }
            }
        }
    }]).directive("typeahead", ["$compile", "$parse", "$q", "$timeout", "$document", "$position", "typeaheadParser", function (e, t, n, r, i, s, o) {
        var u = [9, 13, 27, 38, 40];
        return {
            require: "ngModel",
            link: function (a, f, l, c) {
                var h = a.$eval(l.typeaheadMinLength) || 1,
                    p = a.$eval(l.typeaheadWaitMs) || 0,
                    d = a.$eval(l.typeaheadEditable) !== !1,
                    v = t(l.typeaheadLoading).assign || angular.noop,
                    m = t(l.typeaheadOnSelect),
                    g = l.typeaheadInputFormatter ? t(l.typeaheadInputFormatter) : undefined,
                    y = l.typeaheadAppendToBody ? t(l.typeaheadAppendToBody) : !1,
                    b = t(l.ngModel).assign,
                    w = o.parse(l.typeahead),
                    E, S = angular.element("<div typeahead-popup></div>");
                S.attr({
                    matches: "matches",
                    active: "activeIdx",
                    select: "select(activeIdx)",
                    query: "query",
                    position: "position"
                }),
                angular.isDefined(l.typeaheadTemplateUrl) && S.attr("template-url", l.typeaheadTemplateUrl);
                var x = a.$new();
                a.$on("$destroy", function () {
                    x.$destroy()
                });
                var T = function () {
                        x.matches = [],
                            x.activeIdx = -1
                    },
                    N = function (e, t) {
                        var r = {
                            $viewValue: e
                        };
                        v(a, !0),
                            n.when(w.source(a, r)).then(function (n) {
                                if ((e === c.$viewValue || t) && E) {
                                    if (n.length > 0) {
                                        x.activeIdx = 0,
                                            x.matches.length = 0;
                                        for (var i = 0; i < n.length; i++) r[w.itemName] = n[i],
                                            x.matches.push({
                                                label: w.viewMapper(x, r),
                                                model: n[i]
                                            });
                                        x.query = e,
                                            x.position = y ? s.offset(f) : s.position(f),
                                            x.position.top = x.position.top + f.prop("offsetHeight")
                                    } else T();
                                    v(a, !1)
                                }
                            }, function () {
                                T(),
                                    v(a, !1)
                            })
                    };
                T(),
                    x.query = undefined;
                var C;
                c.$parsers.unshift(function (e) {
                    return E = !0,
                        e && e.length >= h ? p > 0 ? (C && r.cancel(C), C = r(function () {
                                    N(e)
                                }, p)) : N(e) : (v(a, !1), T()),
                        d ? e : e ? (c.$setValidity("editable", !1), undefined) : (c.$setValidity("editable", !0), e)
                }),
                    c.$formatters.push(function (e) {
                        var t, n, r = {};
                        return g ? (r.$model = e, g(a, r)) : (r[w.itemName] = e, t = w.viewMapper(a, r), r[w.itemName] = undefined, n = w.viewMapper(a, r), t !== n ? t : e)
                    }),
                    x.select = function (e) {
                        var t = {},
                            n, r;
                        t[w.itemName] = r = x.matches[e].model,
                            n = w.modelMapper(a, t),
                            b(a, n),
                            c.$setValidity("editable", !0),
                            m(a, {
                                $item: r,
                                $model: n,
                                $label: w.viewMapper(a, t)
                            }),
                            T(),
                            f[0].focus()
                    },
                    f.bind("keydown", function (e) {
                        if (x.matches.length === 0 || u.indexOf(e.which) === -1) return;
                        e.preventDefault(),
                            e.which === 40 ? (x.activeIdx = (x.activeIdx + 1) % x.matches.length, x.$digest()) : e.which === 38 ? (x.activeIdx = (x.activeIdx ? x.activeIdx : x.matches.length) - 1, x.$digest()) : e.which === 13 || e.which === 9 ? x.$apply(function () {
                                            x.select(x.activeIdx)
                                        }) : e.which === 27 && (e.stopPropagation(), T(), x.$digest())
                    }),
                    f.bind("blur", function (e) {
                        E = !1
                    }),
                    f.bind("focus", function (e) {
                        E = !0,
                            N("", !0)
                    });
                var k = function (e) {
                    f[0] !== e.target && (T(), x.$digest())
                };
                i.bind("click", k),
                    a.$on("$destroy", function () {
                        i.unbind("click", k)
                    });
                var L = e(S)(x);
                y ? i.find("body").append(L) : f.after(L)
            }
        }
    }]).directive("typeaheadPopup", function () {
        return {
            restrict: "EA",
            scope: {
                matches: "=",
                query: "=",
                active: "=",
                position: "=",
                select: "&"
            },
            replace: !0,
            templateUrl: "template/typeahead/typeahead-popup.html",
            link: function (e, t, n) {
                e.templateUrl = n.templateUrl,
                    e.isOpen = function () {
                        return e.matches.length > 0
                    },
                    e.isActive = function (t) {
                        return e.active == t
                    },
                    e.selectActive = function (t) {
                        e.active = t
                    },
                    e.selectMatch = function (t) {
                        e.select({
                            activeIdx: t
                        })
                    }
            }
        }
    }).directive("typeaheadMatch", ["$http", "$templateCache", "$compile", "$parse", function (e, t, n, r) {
        return {
            restrict: "EA",
            scope: {
                index: "=",
                match: "=",
                query: "="
            },
            link: function (i, s, o) {
                var u = r(o.templateUrl)(i.$parent) || "template/typeahead/typeahead-match.html";
                e.get(u, {
                    cache: t
                }).success(function (e) {
                    s.replaceWith(n(e.trim())(i))
                })
            }
        }
    }]).filter("typeaheadHighlight", function () {
        function e(e) {
            return e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
        }
        return function (t, n) {
            return n ? t.replace(new RegExp(e(n), "gi"), "<strong>$&</strong>") : t
        }
    });