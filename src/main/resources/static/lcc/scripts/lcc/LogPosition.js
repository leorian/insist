define("LogPosition", [], function () {
    function e(e, t) {
        var n = 1024,
            r = n * 1024,
            i = r * 1024,
            s = i * 1024;
        return e >= 0 && e < n ? e + " B" : e >= n && e < r ? (e / n).toFixed(t) + " KB" : e >= r && e < i ? (e / r).toFixed(t) + " MB" : e >= i && e < s ? (e / i).toFixed(t) + " GB" : e >= s ? (e / s).toFixed(t) + " TB" : e + " B"
    }

    function t(e) {
        return typeof e == "undefined" || e == null ? [0, 0] : typeof e.u != "undefined" && typeof e.u.o != "undefined" ? [e.u.o, e.u.s] : typeof e.o != "undefined" ? [e.o, e.s] : [0, 0]
    }

    function n(t, n, r, i, s, o) {
        this.name = t,
            this.disabled = n,
            this.active = r,
            this.isRolling = i,
            this.templatePointer = s,
            this.changeListener = o,
            this.listenerMuted = !1;
        var u = this;
        this.currentFile = {
            fileSize: 0,
            filePos: 0,
            reset: function (e, t) {
                this.filePos = e,
                    this.fileSize = t,
                u.disabled || (u.currentSlider.max = this.fileSize - 1),
                    this.update()
            },
            setPos: function (e) {
                this.filePos = e,
                    this.update()
            },
            update: function () {
                u.disabled || u.currentSlider.setValue(this.filePos);
                if (u.disabled) {
                    var t = 0;
                    this.fileSize > 0 && (t = (this.filePos + 1) / this.fileSize * 100),
                        $("#" + u.name + "current .progress .bar").css("width", t + "%")
                }
                var n = "";
                this.filePos == 0 ? n = "Start" : this.filePos + 1 >= this.fileSize ? n = "End" : n = e(this.filePos, 2),
                    $("#" + u.name + "current .info").html(n + " of " + e(this.fileSize, 2))
            }
        }
    }

    return n.prototype.getCurrentPointer = function () {
        var e = this.templatePointer;
        if (typeof e != "undefined") {
            var t = e;
            if (this.isRolling) {
                var n = $("#" + this.name + "part select");
                e.p = n.val(),
                    t = {
                        s: $(n[0].options[n[0].selectedIndex]).data("size")
                    },
                    e.u = t
            } else t.s = this.currentFile.fileSize;
            t.o = this.currentSlider.getValue()
        }
        return e
    },
        n.prototype.initLogPartOption = function (e, n) {
            var r = e.options.length - 1;
            if ($.isNumeric(n)) for (; r > 0 && n >= 0; r--) {
                var i = $(e.options[r]).data("size");
                if (n - i < 0) break;
                n -= i
            } else if (typeof n != "undefined" && n != null) {
                for (r = 0; r < e.options.length - 1; r++) if (e.options[r].value == n.p) break;
                n.u && n.u.s && $(e.options[r]).data("size", n.u.s)
            }
            return this.currentFile.reset($.isNumeric(n) ? n : t(n)[0], $(e.options[r]).data("size")),
                e.selectedIndex = r,
            this.disabled || this.partSlider.setValue(e.options.length - 1 - e.selectedIndex),
                r
        },
        n.prototype.initLogPart = function (e) {
            if (!this.disabled) {
                var t = this,
                    n = $("#" + t.name + "part select")[0];
                this.partSlider = $("#" + this.name + "part input.part-slider").slider({
                    formater: function (e) {
                        var n = $("#" + t.name + "part select")[0].options;
                        return n[n.length - e - 1].label
                    },
                    sliderClass: "slider progress" + (t.active ? " progress-striped active" : ""),
                    sliderTrackClass: "none",
                    sliderSelectionClass: "slider-selection bar",
                    value: 0
                }).on("slide", function (e) {
                    var r = t.partSlider.getValue();
                    this.value = r,
                        n.selectedIndex = n.options.length - r - 1;
                    try {
                        t.listenerMuted = !0
                    } finally {
                        t.listenerMuted = !1
                    }
                }).on("slideStop", function (e) {
                    $(n).change()
                }).data("slider")
            }
            this.changeLogPartPosition(e)
        },
        n.prototype.changeLogPartPosition = function (e) {
            var t = $("#" + this.name + "part select")[0];
            this.initLogPartOption(t, e);
            var n = t.options.length - t.selectedIndex - 1;
            this.disabled && $("#" + this.name + "part .progress .bar").css("width", (n + 1) / t.options.length * 100 + "%")
        },
        n.prototype.updateAfterRollingPartChange = function () {
            var e = $("#" + this.name + "part select")[0],
                t = e.selectedIndex;
            this.partSlider.setValue(e.options.length - 1 - t),
                this.currentFile.reset(0, $(e.options[t]).data("size")),
                this.fireChangeListener()
        },
        n.prototype.fireChangeListener = function () {
            typeof this.changeListener != "undefined" && !this.listenerMuted && this.changeListener.call(this, this.getCurrentPointer())
        },
        n.prototype.init = function (n, r) {
            if (!this.disabled) {
                var i = this;
                this.currentSlider = $("#" + i.name + "current input.filepos-slider").slider({
                    formater: function (t) {
                        return t == 0 ? "Start" : t >= this.max ? "End" : e(t, 1)
                    },
                    sliderClass: "slider progress" + (i.active ? " progress-striped active" : ""),
                    sliderTrackClass: "none",
                    sliderSelectionClass: "slider-selection bar",
                    value: i.currentFile.filePos,
                    min: 0,
                    max: i.currentFile.fileSize - 1,
                    tooltipPlacement: i.isRolling ? "bottom" : "top"
                }).on("slide", function (e) {
                    var t = i.currentSlider.getValue();
                    i.currentFile.setPos(t)
                }).on("slideStop", function (e) {
                    i.fireChangeListener()
                }).data("slider")
            }
            if (this.isRolling) this.initLogPart(n);
            else if ($.isNumeric(n)) this.currentFile.reset(n, r ? r : n);
            else {
                var s;
                n ? s = t(n) : (s = t(this.templatePointer), s[0] = 0),
                    this.currentFile.reset(s[0], r ? r : s[1])
            }
            this.currentFile.update()
        },
        n.prototype.changePosition = function (e) {
            e && !this.templatePointer && (this.templatePointer = e);
            if (this.isRolling) this.changeLogPartPosition(e),
                this.currentFile.update();
            else {
                var n = t(e);
                this.currentFile.reset(n[0], n[1])
            }
        },
        n.prototype.resetToStart = function () {
            this.isRolling ? this.changeLogPartPosition(0) : this.currentFile.setPos(0),
                this.fireChangeListener()
        },
        n.prototype.resetToEnd = function () {
            if (this.isRolling) {
                var e = $("#" + this.name + "part select")[0];
                e.selectedIndex = 0;
                var t = $(e.options[0]).data("size");
                this.currentFile.reset(t, t),
                    this.partSlider.setValue(this.partSlider.max)
            } else this.currentFile.setPos(this.currentFile.fileSize);
            this.fireChangeListener()
        },


        function () {
            function e(e, n, r, i) {
                var s = '<tr class="entries capitalized">';
                r && (s += r(e));
                var o = t(e, n);
                for (var u = 0; u < o.length; u++) {
                    var a = o[u];
                    s += "<th>" + a + "</th>"
                }
                return i && (s += i(e)),
                    s += "</tr>",
                    s
            }

            function t(e, t) {
                var n = [];
                if (angular.isArray(t) && t.length > 0) {
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r];
                        i.enabled && n.push(i.key)
                    }
                    if (n.length > 0) return n
                }
                for (var s in e) {
                    if ($.LogSniffer.entriesIgnoreFields[s]) continue;
                    n.push(s)
                }
                return n
            }

            function n(e, n, s, o, u) {
                var a = "",
                    f = t(e, n),
                    l = f.length;
                for (var c = 0; c < s.length; c++) {
                    var h = s[c];
                    if (l > 0) {
                        a += '<tr class="severity ' + r(h.lf_severity) + "\" sof='" + h.lf_endOffset.sof + "' start='" + JSON.stringify(h.lf_startOffset.json) + "' eof='" + h.lf_endOffset.eof + "' end='" + JSON.stringify(h.lf_endOffset.json) + "' onclick=\"$(this).toggleClass('selected')\">",
                        o && (a += o(e, h));
                        for (var p = 0; p < f.length; p++) {
                            var d = f[p];
                            a += '<td class="text ' + e[d] + '">',
                                h[d] == null && h.lf_unformatted ? a += "- parsing error -" : a += h[d] != null ? i(e[d], h[d]) : "",
                                a += "</td>"
                        }
                    } else a += '<tr sof="' + h.lf_startOffset.sof + "\" start='" + JSON.stringify(h.lf_startOffset.json) + "' eof=\"" + h.lf_endOffset.eof + "\" end='" + JSON.stringify(h.lf_endOffset.json) + "'>",
                    o && (a += o(e, h)),
                        a += '<td colspan="' + l + '" class="text">' + h.lf_raw + "</td>";
                    u && (a += u(e, h)),
                        a += "</tr>"
                }
                return a
            }

            function r(e) {
                return typeof e != "undefined" && e && typeof e.c != "undefined" ? "sc-" + e.c : ""
            }

            function i(e, t) {
                if (typeof t != "undefined") {
                    var n = "";
                    switch (e) {
                        case "SEVERITY":
                            n = '<span class="label label-default severity sc-' + t.c + '">' + t.n + "</span>";
                            break;
                        case "DATE":
                            n = LogSniffer.ng.dateFilter(t, "medium");
                            break;
                        case "OBJECT":
                            n = JSON.stringify(t);
                            break;
                        default:
                            n = t
                    }
                    return '<span class="' + e + '">' + n + "</span>"
                }
                return null
            }

            $.LogSniffer = {
                entriesIgnoreFields: {
                    lf_raw: !0,
                    lf_timestamp: !0,
                    lf_severity: !0,
                    lf_startOffset: !0,
                    lf_endOffset: !0
                },
                entriesHead: e,
                entriesRows: n,
                printFieldValue: i
            }
        }(),
        n
});