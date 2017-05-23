define("LogSniffer", [], function () {
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

    (function () {
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

        function r(e, n, r, o, u) {
            var a = "",
                f = t(e, n),
                l = f.length;
            for (var c = 0; c < r.length; c++) {
                var h = r[c];
                if (l > 0) {
                    a += '<tr class="severity ' + i(h.lf_severity) + "\" sof='" + h.lf_endOffset.sof + "' start='" + JSON.stringify(h.lf_startOffset.json) + "' eof='" + h.lf_endOffset.eof + "' end='" + JSON.stringify(h.lf_endOffset.json) + "' onclick=\"$(this).toggleClass('selected')\">",
                    o && (a += o(e, h));
                    for (var p = 0; p < f.length; p++) {
                        var d = f[p];
                        a += '<td class="text ' + e[d] + '">',
                            h[d] == null && h.lf_unformatted ? a += "- parsing error -" : a += h[d] != null ? s(e[d], h[d]) : "",
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

        function i(e) {
            return typeof e != "undefined" && e && typeof e.c != "undefined" ? "sc-" + e.c : ""
        }

        function s(e, t) {
            if (typeof t != "undefined") {
                var r = "";
                switch (e) {
                    case "SEVERITY":
                        r = '<span class="label label-default severity sc-' + t.c + '">' + t.n + "</span>";
                        break;
                    case "DATE":
                        r = n.ng.dateFilter(t, "medium");
                        break;
                    case "OBJECT":
                        r = JSON.stringify(t);
                        break;
                    default:
                        r = t
                }
                return '<span class="' + e + '">' + r + "</span>"
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
            entriesRows: r,
            printFieldValue: s
        }
    })();
    var n = n || $.LogSniffer;
    return n.ng = {},
        n.config = {},
        n.DataTableBinder = function (e, t) {
            var n = function (e, t) {
                    return e[t]
                },
                r = function (e, t) {
                    return e ? e.split(".").reduce(n, t) : t
                };
            this.rowsPath = e,
                this.cols = $.extend([], t),
                this.rows = function (e) {
                    return this.rowsPath = e,
                        this
                },
                this.col = function (e, t) {
                    return this.cols.push({
                        path: e,
                        options: t
                    }),
                        this
                },
                this.bind = function (e) {
                    e || (e = new google.visualization.DataTable);
                    for (var t = 0; t < this.cols.length; t++) {
                        var n = this.cols[t];
                        e.addColumn(n.options)
                    }
                    var i = this;
                    return function (t) {
                        return $.each(r(i.rowsPath, t), function (t, n) {
                            var s = [];
                            for (var t = 0; t < i.cols.length; t++) {
                                var o = i.cols[t],
                                    u = r(o.path, n);
                                u = typeof u != "undefined" ? u : null;
                                if (u != null) if (o.options.type != "date" && o.options.type != "datetime" || u instanceof Date) {
                                    if (o.options.type == "timeofday") {
                                        var a = new Date(u);
                                        u = [a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds()]
                                    }
                                } else u = new Date(u);
                                s[t] = u
                            }
                            e.addRow(s)
                        }),
                            e
                    }
                }
        },
        n.objSize = function (e) {
            var t = 0,
                n;
            for (n in e) e.hasOwnProperty(n) && t++;
            return t
        },
        n.moveUp = function (e, t) {
            var n = e[t],
                r = t - 1;
            r < 0 && (r = 0),
                e.splice(t, 1),
                e.splice(r, 0, n)
        },
        n.moveDown = function (e, t) {
            var n = e[t],
                r = t + 1;
            r >= e.length && (r = e.length),
                e.splice(t, 1),
                e.splice(r, 0, n)
        },
        n.DataSourceBuilder = function (e) {
            $.extend(this, {
                builders: [],
                joinMethod: "full",
                joinKeys: [
                    [0, 0]
                ]
            }, e);
            for (var t = 0; t < this.builders.length; t++) {
                var r = this.builders[t];
                this.builders[t] = new n.DataSourceBuilder[r._type](r)
            }
            this.build = function (e) {
                if (this.builders.length > 0) {
                    var t = [];
                    for (var r = 0; r < this.builders.length; r++) {
                        var i = this.builders[r];
                        t[r] = i.build(e)
                    }
                    return n.DataSourceBuilder.joinDataTables(t, this.joinMethod, this.joinKeys)
                }
                return console.log("No builders defined, return empty data table"),
                    new google.visualization.DataTable
            }
        },
        n.DataSourceBuilder.ElasticRequestBuilder = function (e) {
            $.extend(this, {
                _type: "ElasticRequestBuilder",
                request: {
                    facets: {},
                    aggs: {},
                    size: 0
                },
                requestParts: [],
                joinMethod: "full",
                joinKeys: [
                    [0, 0]
                ]
            }, e);
            for (var t = 0; t < this.requestParts.length; t++) {
                var r = this.requestParts[t];
                this.requestParts[t] = new n.DataSourceBuilder.ElasticRequestBuilder[r._type](r)
            }
            this.build = function (e) {
                var t = angular.copy(this.request),
                    r = this.requestParts;
                $.each(r, function (e, n) {
                    n.prepareRequest(e, t)
                });
                var i = JSON.stringify(t);
                console.log("Executing datSource events search: " + i);
                var s = [];
                return $.ajax($.extend({
                    type: "POST",
                    contentType: "application/json",
                    async: !1,
                    data: i
                }, e.ajax)).success(function (e) {
                    $.each(r, function (t, n) {
                        var r = n.bindResponse(t, e);
                        r && s.push(r)
                    })
                }),
                    n.DataSourceBuilder.joinDataTables(s, this.joinMethod, this.joinKeys)
            }
        },
        n.DataSourceBuilder.ElasticRequestBuilder.DateHistogramFacet = function (e) {
            $.extend(!0, this, {
                _type: "DateHistogramFacet",
                name: "",
                request: {
                    date_histogram: {},
                    facet_filter: {}
                },
                cols: [{},
                    {}]
            }, e),
                this.prepareRequest = function (e, t) {
                    t.facets["f" + e] = this.request
                },
                this.bindResponse = function (e, t) {
                    var r = new google.visualization.DataTable,
                        i = new n.DataTableBinder(null, this.cols);
                    return i.bind(r)(t.facets["f" + e].entries),
                        r
                }
        },
        n.DataSourceBuilder.ElasticRequestBuilder.StatsAgg = function (e) {
            $.extend(!0, this, {
                _type: "StatsAgg",
                name: "",
                request: {
                    filter: {
                        match_all: {}
                    },
                    aggs: {
                        statistics: {
                            stats: {}
                        }
                    }
                },
                cols: []
            }, e),
                this.prepareRequest = function (e, t) {
                    t.aggs["a" + e] = this.request
                },
                this.bindResponse = function (e, t) {
                    var r = new google.visualization.DataTable,
                        i = new n.DataTableBinder(null, this.cols);
                    return i.bind(r)(t.aggregations["a" + e].statistics),
                        r
                }
        },
        n.DataSourceBuilder.ElasticRequestBuilder.TermsAgg = function (e) {
            $.extend(!0, this, {
                _type: "TermsAgg",
                name: "",
                request: {
                    filter: {
                        match_all: {}
                    },
                    aggs: {
                        terms: {
                            terms: {}
                        }
                    }
                },
                cols: [{
                    options: {
                        label: "Term",
                        type: "string"
                    },
                    path: "key"
                },
                    {
                        options: {
                            label: "Count",
                            type: "number"
                        },
                        path: "doc_count"
                    }]
            }, e),
                this.prepareRequest = function (e, t) {
                    t.aggs["a" + e] = this.request
                },
                this.bindResponse = function (e, t) {
                    var r = new google.visualization.DataTable,
                        i = new n.DataTableBinder(null, this.cols);
                    return i.bind(r)(t.aggregations["a" + e].terms.buckets),
                        r
                }
        },
        n.DataSourceBuilder.joinDataTables = function (e, t, n) {
            var r = e[0];
            for (var i = 1; i < e.length; i++) {
                var s = e[i],
                    o = [];
                for (var u = 0; u < r.getNumberOfColumns(); u++) for (var a = 0; a < n.length; a++) n[a][0] != u && o.push(u);
                var f = [];
                for (var u = 0; u < s.getNumberOfColumns(); u++) for (var a = 0; a < n.length; a++) n[a][1] != u && f.push(u);
                r = google.visualization.data.join(r, s, t, n, o, f)
            }
            return r
        },
        n.objToFormFields = function (e, t) {
            var n = function (e, t, r) {
                    if (angular.isArray(r)) for (var i = 0; i < r.length; i++) n(e, t + "[" + i + "]", r[i]);
                    else if (angular.isObject(r)) for (var i in r) n(e, (t ? t + "." : "") + i, r[i]);
                    else e[t] = r
                },
                r = {};
            return n(r, t, e),
                r
        },
        n.ng.BeanWizardController = function (e) {
            e.selectedWizard = null,
                e.templateLoading = !1;
            var t = function (t, n) {
                e.bean = t.length > 0 ? t[0] : {};
                var r = e.bean ? e.bean["@type"] : null;
                if (n && r) for (var i = 0; i < e.wizards.length; i++) {
                    var s = e.wizards[i];
                    if (s.beanType == r) {
                        e.selectedWizard = s;
                        break
                    }
                }
            };
            t(e.beanWrapper, !0),
                e.$watch("bean", function (t, n) {
                    e.selectedWizard && (e.beanWrapper[0] = t)
                }),
                e.$watch("selectedWizard", function (n, r) {
                    n != r && n && t(angular.copy([n.template])),
                    n || t({}),
                    n && (e.bean["@type"] = n.beanType, e.beanWrapper[0] = e.bean, e.templateLoading = !0)
                }),
                e.templateLoaded = function () {
                    e.templateLoading = !1
                }
        },
        n.stripPrefix = function (e, t) {
            var n = {};
            if (e) for (var r in e) r.indexOf(t) == 0 && r.length > t.length && (n[r.substr(t.length)] = e[r]);
            return n
        },
        n.containsKey = function (e, t, n) {
            if (!e) return !1;
            angular.isArray(t) || (t = [t]);
            for (var r = 0; r < t.length; r++) {
                var i = t[r];
                for (var s in e) if (s == i || n && s.indexOf(i) == 0) return !0
            }
            return !1
        },
        n.hasKeysExpectOf = function (e, t, n) {
            if (!e) return !1;
            angular.isArray(t) || (t = [t]);
            var r = 0,
                i = 0;
            for (var s in e) {
                r++;
                for (var o = 0; o < t.length; o++) {
                    var u = t[o];
                    if (s == u || n && s.indexOf(u) == 0) {
                        i++;
                        break
                    }
                }
            }
            return r > i
        },
        n.getFieldType = function (e, t) {
            return e && e["@types"] && e["@types"][t] ? e["@types"][t] : null
        },
        n
});