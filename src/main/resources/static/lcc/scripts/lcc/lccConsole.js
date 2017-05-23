define("jQuery", function (e) {
    return function () {
        var t, n;
        return t || e.jQuery
    }
}(this)),
!angular.$$csp() && angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-start{border-spacing:1px 1px;-ms-zoom:1.0001;}.ng-animate-active{border-spacing:0px 0px;-ms-zoom:1;}</style>'),
    define("angular", ["jQuery"], function (e) {
        return function () {
            var t, n;
            return t || e.angular
        }
    }(this)),
    define("angular-cookies", ["angular"], function () {
    }),
"undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "ui.router"),
    define("ui.router", ["angular"], function () {
    }),
    define("aliyun-console-bootstrap-tpl", ["angular"], function () {
    }),
    define("ui.bootstrap", ["aliyun-console-bootstrap-tpl"], function () {
    }),
    define("select2", ["jQuery"], function () {
    }),
    define("select2-locale-zh-cn", ["jQuery", "select2"], function () {
    }),
    define("ui.select2", ["angular", "select2", "select2-locale-zh-cn"], function () {
    }),
    define("common/directives/aliyunCommonDirectives", ["angular"], function (e) {
        "use strict";
        return e.module("aliyunCommonDirectives", [])
    }),
    define("common/services/services", ["angular"], function (e) {
        return e.module(["aliyunCommonServices"], [])
    }),
    define("common/services/i18nService", ["angular", "./services", "../helper/urlQueryStringHelper", "../nls/messages", "../nls/messages_en"], function (e, t, n, r, i) {
        function a(e) {
            if (!e) throw new Error('param "messageId" is needed to get i18n message');
            var t = {
                common: u.common,
                local: u[e] || null
            };
            return t
        }

        function f() {
            var e = arguments;
            if (e[0]) return e[0].replace(/\{\{|\}\}|\{(\d+)\}/g, function (t, n) {
                if (t == "{{") return "{";
                if (t == "}}") return "}";
                var r = parseInt(n, 10) + 1,
                    i = e[r];
                return i == undefined && (i = t),
                    i
            })
        }

        function l(e) {
            var t = a(e);
            (!t.common || !t.local) && console.error("get I18nService which resources type is [" + o + ']  failed ! Can not get message file "' + e + '", please check if you had add the file in folder "scripts/nls/' + o + '"'),
                this.localMessage = t.local,
                this.commonMessage = t.common
        }

        var s = e.element("html"),
            o = n.getQueryValue("lang") || (s ? s.attr("lang") : "") || window.LANG;
        o = o ? o : "zh";
        var u = null;
        switch (o) {
            case "zh":
            case "zh-cn":
                u = r;
                break;
            case "en":
                u = i;
                break;
            default:
                u = r
        }
        l.prototype = {
            constructor: l,
            formatter: f,
            f: f,
            i18n: function (e, t) {
                var n = arguments,
                    r = Array.prototype.slice.call(n, 1);
                typeof e == "string" ? t = e : r = Array.prototype.slice.call(n, 2);
                if (t) {
                    var i = e === !0 ? this.commonMessage[t] : this.localMessage[t] || this.commonMessage[t];
                    return i ? (r.unshift(i), this.formatter.apply(this, r)) : t
                }
            }
        };
        var c = new l("$locale");
        return t.value("$locale", c.localMessage),
            t.factory("aliyunCommonI18nService", function () {
                return {
                    getI18n: function (e) {
                        return new l(e)
                    },
                    getLangKey: function () {
                        return o
                    }
                }
            }),
            {
                getI18n: function (e) {
                    return new l(e)
                },
                getLangKey: function () {
                    return o
                }
            }
    }),
    define("common/directives/aliyunInstanceSelector", ["angular", "./aliyunCommonDirectives", "../cons/aliyunCons", "../services/i18nService"], function (e, t, n, r) {
        t.directive("aliyunInstanceSelector", ["$http", "aliyunDialog", function (t, i) {
            function a(e, t) {
                $(".bigdrop").select2("close");
                var n = [{
                    result: !1,
                    label: u.btn.confirm,
                    cssClass: "btn btn-primary"
                }];
                t.showMessageDialogSimple(u.lb.warning, e, n)
            }

            function f(e) {
                return e && (e = e.replace(/</g, "&lt;").replace(/>/g, "&gt;")),
                    e
            }

            function c(e) {
                e = f(e);
                var t = "";
                return e.length > l ? (t = e.substr(0, l), t.length < e.length && (t += "..."), t) : e
            }

            function h(e, t, n) {
                var r = {
                    params: e.data
                };
                r.params.__preventCache = (new Date).getTime();
                var i = t.get(e.url, r).success(function (t) {
                    t.code != o.SUCCESS ? a(t.message, n) : e.success(t)
                }).error(function (e) {
                    a(e, n)
                });
                return i.abort = function () {
                    return null
                },
                    i
            }

            var s = r.getI18n("aliyunInstanceSelector"),
                o = n.RESPONSE_CODE,
                u = {
                    btn: {
                        confirm: s.i18n("aliyunInstanceSelector.btn.confirm")
                    },
                    lb: {
                        warning: s.i18n("aliyunInstanceSelector.lb.warning"),
                        placeholder: s.i18n("aliyunInstanceSelector.lb.placeholder"),
                        instanceName: s.i18n("aliyunInstanceSelector.lb.instanceName"),
                        noMatch: s.i18n("aliyunInstanceSelector.lb.noMatch")
                    }
                },
                l = 8;
            return {
                restrict: "A",
                scope: {
                    options: "=",
                    select2Model: "="
                },
                controller: ["$scope", function (n) {
                    var r = n.options,
                        s = {
                            placeholder: u.lb.placeholder,
                            uniqueId: "instanceId",
                            quietMillis: 500,
                            fetchListHandler: function (e) {
                                h(e, t, i)
                            },
                            dataHandler: function (e, t) {
                                return {
                                    instanceId: e ? e : "",
                                    pageSize: 10,
                                    currentPage: t
                                }
                            },
                            resultsHandler: function (t, n) {
                                var r = n * 10 < t.count;
                                return e.forEach(t.data, function (e, t) {
                                    e.id = e.instanceId
                                }),
                                    {
                                        results: t.data,
                                        more: r
                                    }
                            },
                            formatResult: function (e) {
                                var t = "",
                                    n = e.instanceName || "-";
                                return t += "<span title='" + u.lb.instanceName + n + "'>" + e.instanceId + "</span>",
                                n !== undefined && (t += "<span title='" + u.lb.instanceName + n + "'> / " + c(n) + "</span>"),
                                    t
                            },
                            formatSelection: function (e) {
                                return e.instanceId
                            },
                            formatNoMatches: function () {
                                return u.lb.noMatch
                            },
                            initSelection: function (e, t) {
                            }
                        },
                        o = e.extend({}, s, r);
                    n.select2Model = n.select2Model || "",
                        n.select2Options = {
                            placeholder: o.placeholder,
                            id: o.id ||
                            function (e) {
                                return e[o.uniqueId]
                            },
                            ajax: {
                                url: o.url,
                                transport: o.fetchListHandler,
                                quietMillis: o.quietMillis,
                                data: o.dataHandler,
                                results: o.resultsHandler
                            },
                            formatResult: o.formatResult,
                            formatSelection: o.formatSelection,
                            formatNoMatches: o.formatNoMatches,
                            initSelection: o.initSelection,
                            escapeMarkup: function (e) {
                                return e
                            }
                        }
                }],
                templateUrl: "scripts/template/aliyunInstanceSelector.html"
            }
        }])
    }),
    define("angular-animate", ["angular"], function () {
    }),
    define("angular-growl", ["angular-animate"], function () {
    }),
    define("angular-ui-validate", ["angular"], function () {
    }),
    define("angular-sanitize", ["angular"], function () {
    }),
    define("angular-locale-zh-cn", ["angular"], function () {
    }),
    define("angular-translate", ["angular"], function () {
    }),
    define("aliyun-lcc-tpl", ["angular"], function () {
    }),
    define("bindonce", ["angular"], function () {
    }),
    define("common/cons/aliyunConsViewFramework", ["../services/i18nService"], function (e) {
        var t = function () {
                var e = window.location.host;
                if (!e.match(/^.+\.aliyun\.|^aliyun\./)) return ".com";
                var t = e.replace(/^.*\.aliyun|^aliyun/i, "");
                return t || (t = ".com"),
                    t
            }(),
            n = e.getI18n("cons.products"),
            r = {
                categories: [{
                    name: "弹性计算",
                    products: [{
                        helpCategoryId: "8314827",
                        icon: "icon-ecs",
                        link: "http://ecs.console.aliyun.com",
                        name: "云服务器ECS",
                        openStatus: !0,
                        productId: "ecs"
                    },
                        {
                            helpCategoryId: "",
                            icon: "icon-ace",
                            link: "http://ace.console.aliyun.com",
                            name: "云引擎ACE",
                            openStatus: !0,
                            productId: "ace"
                        },
                        {
                            icon: "icon-ess",
                            link: "http://ess.console.aliyun.com",
                            name: "弹性伸缩",
                            openStatus: !0,
                            productId: "ess"
                        }]
                },
                    {
                        name: "数据库",
                        products: [{
                            icon: "icon-rds",
                            link: "http://rdsnew.console.aliyun.com",
                            name: "云数据库RDS",
                            openStatus: !0,
                            productId: "rds"
                        },
                            {
                                helpCategoryId: "8315109",
                                icon: "icon-redisa",
                                link: "http://kvstore.console.aliyun.com",
                                name: "键值存储KVStore",
                                openStatus: !0,
                                productId: "kvstore"
                            },
                            {
                                helpCategoryId: "8315004",
                                icon: "icon-ots",
                                link: "http://ots.console.aliyun.com",
                                name: "开放结构化数据服务OTS",
                                openStatus: !0,
                                productId: "ots"
                            },
                            {
                                helpCategoryId: "8314987",
                                icon: "icon-ocs",
                                link: "http://ocs.console.aliyun.com",
                                name: "开放缓存服务OCS",
                                openStatus: !0,
                                productId: "ocs"
                            },
                            {
                                helpCategoryId: "8315081",
                                icon: "icon-ads",
                                link: "http://ads.console.aliyun.com",
                                name: "分析型数据库",
                                openStatus: !0,
                                productId: "ads"
                            },
                            {
                                icon: "icon-dts",
                                link: "http://dts.console.aliyun.com",
                                name: "数据传输",
                                openStatus: !0,
                                productId: "dts"
                            }]
                    },
                    {
                        name: "存储与CDN",
                        products: [{
                            helpCategoryId: "8314910",
                            icon: "icon-oss",
                            link: "http://oss.console.aliyun.com/index",
                            name: "对象存储OSS",
                            openStatus: !0,
                            productId: "oss"
                        },
                            {
                                helpCategoryId: "8314980",
                                icon: "icon-oas",
                                link: "http://oas.console.aliyun.com/console/index",
                                name: "归档存储",
                                openStatus: !0,
                                productId: "oas"
                            },
                            {
                                helpCategoryId: "8315016",
                                icon: "icon-mqs",
                                link: "http://mns.console.aliyun.com",
                                name: "消息服务",
                                openStatus: !0,
                                productId: "mns"
                            },
                            {
                                helpCategoryId: "8314936",
                                icon: "icon-cdn",
                                link: "http://cdn.console.aliyun.com",
                                name: "CDN",
                                openStatus: !0,
                                productId: "cdn"
                            }]
                    },
                    {
                        name: "网络",
                        products: [{
                            helpCategoryId: "8314871",
                            icon: "icon-slb",
                            link: "http://slbnew.console.aliyun.com",
                            name: "负载均衡",
                            openStatus: !0,
                            productId: "slb"
                        },
                            {
                                helpCategoryId: "",
                                icon: "icon-vpc",
                                link: "http://vpc.console.aliyun.com",
                                name: "专有网络VPC",
                                openStatus: !0,
                                productId: "vpc"
                            },
                            {
                                icon: "icon-logo2",
                                link: "http://ip.console.aliyun.com",
                                name: "弹性公网IP",
                                openStatus: !0,
                                productId: "ip"
                            }]
                    },
                    {
                        name: "大规模计算",
                        products: [{
                            helpCategoryId: "8314999",
                            icon: "icon-odps",
                            link: "http://odps.console.aliyun.com",
                            name: "开放数据处理服务ODPS",
                            openStatus: !0,
                            productId: "odps"
                        },
                            {
                                helpCategoryId: "9001010",
                                icon: "icon-batchcompute",
                                link: "http://batchcompute.console.aliyun.com",
                                name: "批量计算",
                                openStatus: !0,
                                productId: "batchcompute"
                            },
                            {
                                helpCategoryId: "",
                                icon: "icon-dpc",
                                link: "http://dpc.console.aliyun.com",
                                name: "采云间",
                                openStatus: !0,
                                productId: "dpc",
                                shortName: "DPC"
                            }]
                    },
                    {
                        name: "安全与管理",
                        products: [{
                            helpCategoryId: "8314941",
                            icon: "icon-yundun",
                            link: "http://yundun.console.aliyun.com",
                            name: "云盾",
                            openStatus: !0,
                            productId: "yundun"
                        },
                            {
                                helpCategoryId: "8314972",
                                icon: "icon-yunjiankong",
                                link: "http://cms.console.aliyun.com",
                                name: "云监控",
                                openStatus: !0,
                                productId: "cms"
                            },
                            {
                                helpCategoryId: "",
                                icon: "icon-ram",
                                link: "http://ram.console.aliyun.com",
                                name: "访问控制",
                                openStatus: !0,
                                productId: "ram"
                            }]
                    },
                    {
                        name: "应用服务",
                        products: [{
                            helpCategoryId: "8314976",
                            icon: "icon-sls",
                            link: "http://sls.console.aliyun.com",
                            name: "日志服务",
                            openStatus: !0,
                            productId: "sls"
                        },
                            {
                                helpCategoryId: "",
                                icon: "icon-opensearch",
                                link: "http://opensearch.console.aliyun.com",
                                name: "开放搜索",
                                openStatus: !0,
                                productId: "opensearch"
                            },
                            {
                                helpCategoryId: "",
                                icon: "icon-mts",
                                link: "http://mts.console.aliyun.com",
                                name: "媒体转码",
                                openStatus: !0,
                                productId: "mts"
                            },
                            {
                                helpCategoryId: "",
                                icon: "icon-pts",
                                link: "http://pts.aliyun.com/aliyun/",
                                name: "性能测试",
                                openStatus: !0,
                                productId: "pts"
                            },
                            {
                                helpCategoryId: "9005959",
                                icon: "icon-mas",
                                link: "http://man.console.aliyun.com/aliyun/masAppList.htm?login=true",
                                name: "移动数据分析",
                                openStatus: !0,
                                productId: "man"
                            }]
                    },
                    {
                        name: "互联网中间件",
                        products: [{
                            helpCategoryId: "",
                            icon: "icon-edas",
                            link: "http://edas.console.aliyun.com",
                            name: "企业级分布式应用服务EDAS",
                            openStatus: !0,
                            productId: "edas"
                        },
                            {
                                helpCategoryId: "",
                                icon: "icon-ons",
                                link: "http://ons.console.aliyun.com",
                                name: "消息队列",
                                openStatus: !0,
                                productId: "ons"
                            },
                            {
                                helpCategoryId: "8315099",
                                icon: "icon-drds",
                                link: "http://drds.console.aliyun.com",
                                name: "分布式关系型数据库DRDS",
                                openStatus: !0,
                                productId: "drds"
                            }]
                    },
                    {
                        name: "域名与网站（万网）",
                        products: [{
                            helpCategoryId: "9002814",
                            icon: "icon-yuming",
                            link: "http://netcn.console.aliyun.com/core/domain/list",
                            name: "域名",
                            openStatus: !0,
                            productId: "domain"
                        },
                            {
                                helpCategoryId: "9002814",
                                icon: "icon-yunjiexi",
                                link: "http://netcn.console.aliyun.com/core/domain/tclist",
                                name: "云解析",
                                openStatus: !0,
                                productId: "dns"
                            },
                            {
                                helpCategoryId: "9002853",
                                icon: "icon-yunxunizhuji",
                                link: "http://netcn.console.aliyun.com/core/host/list2",
                                name: "云虚拟主机",
                                openStatus: !0,
                                productId: "host"
                            },
                            {
                                helpCategoryId: "",
                                icon: "icon-qiyeyouxiang",
                                link: "http://netcn.console.aliyun.com/core/mail/list",
                                name: "企业邮箱",
                                openStatus: !0,
                                productId: "mail"
                            },
                            {
                                helpCategoryId: "",
                                icon: "icon-wo-sitebuild",
                                link: "http://netcn.console.aliyun.com/core/website/list",
                                name: "标准建站",
                                openStatus: !0,
                                productId: "website"
                            }]
                    },
                    {
                        name: "其他",
                        products: [{
                            icon: "icon-toolsimage",
                            link: "http://market.console.aliyun.com",
                            name: "云市场",
                            openStatus: !0,
                            productId: "market"
                        }]
                    }],
                categoryGroup: [2, 3, 2, 3],
                navLinks: {
                    accesskeys: {
                        href: "https://ak-console.aliyun.com/",
                        target: "_blank",
                        text: "AccessKeys",
                        id: "accesskeys",
                        show: !0
                    },
                    customHelp: {
                        icon: "",
                        href: "https://home.console.aliyun.com/common/navRedirect.html?typeId=customHelp",
                        navRedirect: !0,
                        text: n.i18n("customHelpLink.text"),
                        title: n.i18n("customHelpLink.title"),
                        show: !1,
                        showNew: !0,
                        id: "customHelp"
                    },
                    help: {
                        links: [{
                            href: "http://www.aliyun.com/act/aliyun/console/faq.html",
                            target: "_blank",
                            text: "FAQ",
                            id: "faq"
                        },
                            {
                                href: "http://help.aliyun.com",
                                target: "_blank",
                                text: n.i18n("help"),
                                id: "help"
                            },
                            {
                                href: "http://docs.aliyun.com",
                                target: "_blank",
                                text: n.i18n("docs"),
                                id: "docs"
                            },
                            {
                                href: "http://bbs.aliyun.com",
                                target: "_blank",
                                text: n.i18n("forum"),
                                id: "bbs"
                            }],
                        text: n.i18n("group.help"),
                        show: !0,
                        id: "help"
                    },
                    home: {
                        icon: "icon-home",
                        href: "http://home.console.aliyun.com",
                        text: n.i18n("homeLink.text"),
                        target: "_self",
                        show: !0
                    },
                    i18n: {
                        icon: "",
                        id: "i18n",
                        requestUrl: "",
                        show: !1,
                        showNew: !0
                    },
                    icp: {
                        href: "http://beian.aliyun.com/",
                        target: "_blank",
                        text: "备案",
                        id: "beian",
                        show: !0
                    },
                    logo: {
                        icon: "icon-logo1",
                        href: "http://www.aliyun.com",
                        target: "_blank",
                        show: !0
                    },
                    message: {
                        blankText: n.i18n("notificationLink.text.nomsg"),
                        messageUrl: "https://msc.console.aliyun.com/#/innerMsg/allDetail/",
                        href: "https://msc.console.aliyun.com/#/innerMsg/unread/0",
                        text: n.i18n("notificationLink.text.more"),
                        title: n.i18n("notificationLink.title"),
                        show: !0
                    },
                    product: {
                        text: n.i18n("productLink.text"),
                        show: !0
                    },
                    qrcode: {
                        icon: "icon-qrcode",
                        href: "http://www.aliyun.com/app",
                        text: n.i18n("qrcodeLink.text"),
                        image: "https://g.alicdn.com/aliyun/console/1.3.21/styles/images/qrcode.png",
                        title: n.i18n("qrcodeLink.title"),
                        show: !1
                    },
                    search: {
                        href: "http://www.aliyun.com/s?k=",
                        text: n.i18n("searchLink.text"),
                        placeholder: n.i18n("searchLink.placeholder"),
                        show: !0
                    },
                    user: {
                        links: [{
                            href: "https://account.aliyun.com/logout/logout.htm?oauth_callback=",
                            target: "_self",
                            text: n.i18n("signOut"),
                            id: "signOut"
                        }],
                        linkMap: {
                            switchRole: {
                                href: "https://signin.aliyun.com/switchRole.htm",
                                target: "_self",
                                text: n.i18n("switchRole"),
                                id: "switchRole"
                            },
                            exitSwitchedRole: {
                                href: "https://signin.aliyun.com/exitSwitchedRole.htm",
                                target: "_self",
                                text: n.i18n("exitSwitchedRole"),
                                id: "exitSwitchedRole"
                            },
                            signout: {
                                href: "https://account.aliyun.com/logout/logout.htm?oauth_callback=",
                                target: "_self",
                                text: n.i18n("signOut"),
                                id: "signOut"
                            }
                        },
                        labels: {
                            currentName: n.i18n("currentName"),
                            currentAlias: n.i18n("currentAlias"),
                            loginName: n.i18n("loginName"),
                            loginAlias: n.i18n("loginAlias"),
                            role: n.i18n("role"),
                            subaccount: n.i18n("subaccount")
                        },
                        tagLink: "http://ram.console.aliyun.com",
                        show: !0,
                        id: "user"
                    },
                    workorder: {
                        links: [{
                            href: "https://workorder.console.aliyun.com/#/ticket/list/",
                            target: "_blank",
                            text: n.i18n("ticket"),
                            id: "workorderOwn"
                        },
                            {
                                href: "https://home.console.aliyun.com/common/navRedirect.html?typeId=workorderAdd",
                                navRedirect: !0,
                                target: "_blank",
                                text: n.i18n("ticket.open"),
                                id: "workorderAdd"
                            }],
                        text: n.i18n("group.technicalSupport"),
                        id: "workorder",
                        show: !0
                    },
                    requestUrl: {
                        updateMessageInfo: "//home.console.aliyun.com/center/updateMessageInfo.js"
                    }
                }
            },
            i = {
                navConfig: {
                    product: {
                        title: n.i18n("product.title"),
                        popover: n.i18n("product.popover"),
                        dialogTitle: n.i18n("product.dialogTitle"),
                        folded: !1,
                        show: !0,
                        showManageButton: !0
                    },
                    service: {
                        title: n.i18n("service.title"),
                        popover: n.i18n("service.popover"),
                        dialogTitle: n.i18n("service.dialogTitle"),
                        folded: !1,
                        show: !0,
                        showManageButton: !0
                    },
                    requestUrl: {
                        setUserPreference: "//home.console.aliyun.com/center/setUserPreference.js"
                    }
                },
                products: [{
                    icon: "icon-ecs-3",
                    productId: "ecs",
                    name: n.i18n("ecs"),
                    link: "http://console.aliyun" + t + "/index.htm"
                },
                    {
                        icon: "icon-rds-3",
                        productId: "rds",
                        name: n.i18n("rds"),
                        link: "http://rds.console.aliyun" + t
                    },
                    {
                        icon: "icon-slb-3",
                        productId: "slb",
                        name: n.i18n("slb"),
                        link: "http://slb.console.aliyun" + t
                    },
                    {
                        icon: "icon-oss-3",
                        productId: "oss",
                        name: n.i18n("oss"),
                        link: "http://oss.console.aliyun" + t + "/index"
                    },
                    {
                        icon: "icon-cdn-3",
                        productId: "cdn",
                        name: n.i18n("cdn"),
                        link: "http://cdn.console.aliyun" + t
                    },
                    {
                        icon: "icon-ots-3",
                        productId: "ots",
                        name: n.i18n("ots"),
                        link: "http://ots.console.aliyun" + t
                    },
                    {
                        icon: "icon-ocs-3",
                        productId: "ocs",
                        name: n.i18n("ocs"),
                        link: "http://ocs.console.aliyun" + t
                    },
                    {
                        icon: "icon-odps-3",
                        productId: "odps",
                        name: n.i18n("odps"),
                        link: "http://odps.console.aliyun" + t
                    },
                    {
                        icon: "icon-ace-3",
                        productId: "ace",
                        name: n.i18n("ace"),
                        link: "http://ace.console.aliyun" + t
                    },
                    {
                        icon: "icon-yundun-3",
                        productId: "yundun",
                        name: n.i18n("yundun"),
                        link: "http://yundun.console.aliyun" + t
                    },
                    {
                        icon: "icon-sls-3",
                        productId: "sls",
                        name: n.i18n("sls"),
                        link: "http://sls.console.aliyun" + t
                    },
                    {
                        icon: "icon-mqs-3",
                        productId: "mqs",
                        name: n.i18n("mqs"),
                        link: "http://mqs.console.aliyun" + t
                    },
                    {
                        icon: "icon-opensearch-3",
                        productId: "opensearch",
                        name: n.i18n("opensearch"),
                        link: "http://opensearch.console.aliyun" + t
                    },
                    {
                        icon: "icon-pts-3",
                        productId: "pts",
                        name: n.i18n("pts"),
                        link: "http://pts.console.aliyun" + t
                    }],
                productPreference: ["ecs", "rds", "slb", "oss", "ocs"],
                services: [{
                    icon: "icon-account-2",
                    productId: "account",
                    name: n.i18n("service.account"),
                    link: "https://account.console.aliyun" + t
                },
                    {
                        icon: "icon-expense",
                        productId: "expenseCenter",
                        name: n.i18n("service.expenseCenter"),
                        link: "http://expense.console.aliyun" + t
                    },
                    {
                        icon: "icon-renew",
                        productId: "renew",
                        name: n.i18n("service.renew"),
                        link: "http://renew.console.aliyun" + t
                    },
                    {
                        icon: "icon-invite",
                        productId: "msc",
                        name: n.i18n("service.msc"),
                        link: "https://msc.console.aliyun" + t
                    },
                    {
                        icon: "icon-pen",
                        productId: "workorder",
                        name: n.i18n("service.workorder"),
                        link: "http://workorder.console.aliyun" + t
                    },
                    {
                        icon: "icon-bsn",
                        productId: "bsn",
                        name: n.i18n("service.bsn"),
                        link: "http://bsn.console.aliyun" + t
                    }],
                servicePreference: ["account", "expenseCenter", "renew", "msc", "workorder", "bsn"]
            },
            s = "sidebar-type",
            o = ".aliyun.com";
        CONSOLE_PRODUCT_NAME = window.CONSOLE_PRODUCT_NAME;
        if (CONSOLE_PRODUCT_NAME == "BUTLER") {
            var r = {
                    categories: "",
                    messages: "",
                    categoryGroup: [2, 3, 2, 3],
                    navLinks: {
                        accesskeys: {},
                        customHelp: {
                            icon: "",
                            href: "https://home.console.aliyun.com/common/navRedirect.html?typeId=customHelp",
                            navRedirect: !0,
                            text: n.i18n("customHelpLink.text"),
                            title: n.i18n("customHelpLink.title"),
                            show: !1,
                            showNew: !0,
                            id: "customHelp"
                        },
                        help: {},
                        home: {
                            icon: "icon-home",
                            text: "企业级互联网架构",
                            target: "_self",
                            show: !0
                        },
                        i18n: {
                            icon: "",
                            id: "i18n",
                            requestUrl: "",
                            show: !1,
                            showNew: !0
                        },
                        icp: {},
                        logo: {
                            icon: "icon-logo1",
                            target: "_blank",
                            show: !0
                        },
                        message: {
                            blankText: n.i18n("notificationLink.text.nomsg"),
                            messageUrl: "https://msc.console.aliyun.com/#/innerMsg/allDetail/",
                            href: "https://msc.console.aliyun.com/#/innerMsg/unread/0",
                            text: n.i18n("notificationLink.text.more"),
                            title: n.i18n("notificationLink.title"),
                            show: !0
                        },
                        product: {},
                        qrcode: {
                            icon: "icon-qrcode",
                            href: "http://www.aliyun.com/app",
                            text: n.i18n("qrcodeLink.text"),
                            image: "https://g.alicdn.com/aliyun/console/1.3.21/styles/images/qrcode.png",
                            title: n.i18n("qrcodeLink.title"),
                            show: !1
                        },
                        search: {},
                        user: {
                            links: [{
                                href: "/json/logout.htm?oauth_callback=",
                                target: "_self",
                                text: n.i18n("signOut"),
                                id: "signOut"
                            }],
                            linkMap: {
                                switchRole: {
                                    href: "https://signin.aliyun.com/switchRole.htm",
                                    target: "_self",
                                    text: n.i18n("switchRole"),
                                    id: "switchRole"
                                },
                                exitSwitchedRole: {
                                    href: "https://signin.aliyun.com/exitSwitchedRole.htm",
                                    target: "_self",
                                    text: n.i18n("exitSwitchedRole"),
                                    id: "exitSwitchedRole"
                                },
                                signout: {
                                    href: "https://account.aliyun.com/logout/logout.htm?oauth_callback=",
                                    target: "_self",
                                    text: n.i18n("signOut"),
                                    id: "signOut"
                                }
                            },
                            labels: {
                                currentName: n.i18n("currentName"),
                                currentAlias: n.i18n("currentAlias"),
                                loginName: n.i18n("loginName"),
                                loginAlias: n.i18n("loginAlias"),
                                role: n.i18n("role"),
                                subaccount: n.i18n("subaccount")
                            },
                            tagLink: "http://ram.console.aliyun.com",
                            show: !0,
                            id: "user"
                        },
                        workorder: {},
                        requestUrl: {
                            updateMessageInfo: "//home.console.aliyun.com/center/updateMessageInfo.js"
                        }
                    }
                },
                i = {
                    navConfig: {
                        product: {
                            title: "产品与服务",
                            popover: "自定义运维产品",
                            dialogTitle: "自定义运维产品快捷入口",
                            folded: !1,
                            show: !0,
                            showManageButton: !0
                        },
                        requestUrl: {
                            setUserPreference: "//home.console.aliyun.com/center/setUserPreference.js"
                        }
                    },
                    products: [{
                        icon: "icon-ecs-3",
                        productId: "ecs",
                        name: "企业级分布式应用服务",
                        link: "http://edas3.console.aliyun.sinopec" + t + "/"
                    }],
                    productPreference: ["ecs", "rds", "slb", "oss", "ocs"],
                    services: [{
                        icon: "icon-account-2",
                        productId: "account",
                        name: n.i18n("service.account"),
                        link: "https://account.console.aliyun" + t
                    },
                        {
                            icon: "icon-expense",
                            productId: "expenseCenter",
                            name: n.i18n("service.expenseCenter"),
                            link: "http://expense.console.aliyun" + t
                        },
                        {
                            icon: "icon-renew",
                            productId: "renew",
                            name: n.i18n("service.renew"),
                            link: "http://renew.console.aliyun" + t
                        },
                        {
                            icon: "icon-invite",
                            productId: "msc",
                            name: n.i18n("service.msc"),
                            link: "https://msc.console.aliyun" + t
                        },
                        {
                            icon: "icon-pen",
                            productId: "workorder",
                            name: n.i18n("service.workorder"),
                            link: "http://workorder.console.aliyun" + t
                        },
                        {
                            icon: "icon-bsn",
                            productId: "bsn",
                            name: n.i18n("service.bsn"),
                            link: "http://bsn.console.aliyun" + t
                        }],
                    servicePreference: ["account", "expenseCenter", "renew", "msc", "workorder", "bsn"]
                },
                s = "sidebar-type",
                o = ".aliyun.com";
            r.navLinks.user.links[0].href = "/logout.htm?oauth_callback=",
                i.products = [{
                    icon: "icon-ecs-3",
                    productId: "ecs",
                    name: "EDAS运维管控平台",
                    link: "http://butler.console.aliyun" + t + "/"
                }],
                i.navConfig.product = {
                    title: "监控与运维",
                    popover: "自定义运维产品",
                    dialogTitle: "自定义运维产品快捷入口",
                    folded: !1,
                    show: !0,
                    showManageButton: !0
                }
        }
        return {
            SUFFIX: t,
            TOPBAR_DEFAULT_CONS: r,
            SIDEBAR_DEFAULT_CONS: i,
            SIDEBAR_FOLD_COOKIENAME: s,
            SIDEBAR_FOLD_COOKIEDOMAIN: o
        }
    }),
    define("common/helper/viewFrameworkHelper", ["../cons/aliyunConsViewFramework"], function (e) {
        function r(e) {
            var r;
            e && (t = e.version, n = e.sidebar, r = u(), r && (e.sidebar = r, n = r))
        }

        function i(e) {
            return !0;
            var n, r, i, s, o, u, a
        }

        function s(e, t, n) {
            if (!e) return;
            var r = "";
            n && (r = ";domain=" + n),
                document.cookie = e + "=" + escape(t) + r + "; path=/"
        }

        function o(e) {
            if (!e) return;
            var t = document.cookie.split(";"),
                n;
            for (var r = 0; r < t.length; r++) {
                var i = t[r].split("=");
                i[0].trim() == e && (n = unescape(i[1]))
            }
            return n
        }

        function u() {
            return o(e.SIDEBAR_FOLD_COOKIENAME)
        }

        function a() {
            var e = u() || n;
            return e != "mini" && e != "full" && (e = "full"),
                e
        }

        function f() {
            return a() == "mini"
        }

        var t, n;
        return {
            init: r,
            versionGreaterThan: i,
            getCookie: o,
            setCookie: s,
            getSidebarType: a,
            isSidebarFold: f
        }
    }),
    define("common/directives/productNavBar", ["angular"], function () {
        var e = angular.module("aliyun.console.productNavBar", []);
        e.factory("productNavBarSetting", ["$rootScope", "$state", function (e, t) {
            function n(e) {
                var t = {};
                return angular.forEach(e, function (e) {
                    e.childs ? angular.forEach(e.childs, function (e) {
                            !e.outlet && e.state && (t[e.state] = e)
                        }) : e.state && !e.outlet && (t[e.state] = e)
                }),
                    t
            }

            function r(t) {
                e.productNavBarConfig.title = t
            }

            function i(t) {
                e.productNavBarConfig.mainNav = t
            }

            function s(t, n) {
                e.productNavBarConfig.backNav = n,
                    e.productNavBarConfig.subNav = t
            }

            function o() {
                return e.productNavBarConfig.subNav
            }

            function u(t) {
                e.productNavBarConfig.extend = t
            }

            function a() {
                return e.productNavBarConfig.transcludedHtml
            }

            function f(t) {
                e.productNavBarConfig.transcludedHtml = t
            }

            return e.productNavBarConfig || (e.productNavBarConfig = {
                title: "",
                mainNav: [],
                subNav: [],
                backNav: "",
                mainNavMapping: [],
                subNavMapping: [],
                extend: {},
                transcludedHtml: ""
            }),
                {
                    setTitle: r,
                    setMainNav: i,
                    setSubNav: s,
                    setTranscludedHtml: f,
                    updateExtend: u,
                    getSubNav: o,
                    getTranscludedHtml: a
                }
        }]),
            e.directive("customizedContent", ["productNavBarSetting", function (e) {
                return {
                    restrict: "A",
                    scope: {},
                    template: e.getTranscludedHtml()
                }
            }]),
            e.directive("productNav", function () {
                return {
                    restrict: "A",
                    replace: !0,
                    scope: !0,
                    templateUrl: "scripts/template/productNav.html",
                    controller: ["$rootScope", "$scope", "$state", "productNavBarSetting", "$timeout", function (e, t, n, r, i) {
                        e.$watch("productNavBarConfig", function (e) {
                            t.config = e
                        }),
                            t.navScene = !1;
                        var s = function (e) {
                            if (e.state && e.highlightConsiderParams && e.params && n.params && n.includes(e.state)) {
                                var t = !0;
                                return angular.forEach(e.params, function (e, r) {
                                    r && t && (t = n.params[r] == e)
                                }),
                                    t
                            }
                            if (!e.includes && e.state) return n.includes(e.state);
                            if (e.includes) {
                                var r = e.includes;
                                if (angular.isArray(r)) {
                                    for (var i = 0; i < r.length; i++) if (n.includes(r[i])) return !0;
                                    return !1
                                }
                                return n.includes(r)
                            }
                        };
                        t.checkActive = function (e, n) {
                            var r = s(e);
                            return r && t.navScene != n && i(function () {
                                t.navScene = n
                            }, 20),
                                r
                        },
                            t.backNav = function () {
                                n.go(e.productNavBarConfig.backNav)
                            }
                    }],
                    link: function (e, t, n) {
                    }
                }
            }),
            e.directive("productNavLink", ["$compile", function (e) {
                return {
                    restrict: "A",
                    scope: {
                        item: "="
                    },
                    replace: !0,
                    controller: ["$rootScope", "$scope", "$state", "productNavBarSetting", function (e, t, n, r) {
                        t.go = function (e, t) {
                            n.go(e, t || {})
                        },
                        t.extend || (t.extend = {})
                    }],
                    link: function (t, n, r) {
                        var i = "";
                        t.item.childs ? i += '<a href="" ng-click="item.showChild=!item.showChild">' : t.item.outlet && t.item.outlet.state ? i += '<a href="" ui-sref="{{item.outlet.state}}({{item.outlet.params||\'\'}})">' : t.item.outlet && t.item.outlet.url ? i += '<a href="{{item.outlet.url}}" target="{{item.outlet.target || \'_blank\'}}">' : t.item.state && (i += '<a href="" ui-sref="{{item.state}}({{item.params||\'\'}})">'),
                            i += '<div class="nav-icon">',
                        t.item.childs && (i += "<span ng-class=\"{'icon-arrow-down':item.showChild,'icon-arrow-right':!item.showChild}\"></span>"),
                            i += '</div><div class="nav-title" ng-bind="item.title"></div>',
                        t.item.extend && (i += '<div class="nav-extend">' + t.item.extend + "</div>"),
                            i += "</a>",
                            n.html(i),
                            e(n.contents())(t)
                    }
                }
            }])
    }),
    define("common/services/topicService", ["./services"], function (e) {
        var t = {};
        return e.factory("aliyunCommonTopicService", ["$rootScope", "$q", function (e, n) {
            function r(t, r, i) {
                if (i === !0) {
                    var s = n.defer();
                    return angular.isString(r) ? r = {
                            message: r,
                            modalResultDeferred: s
                        } : r.modalResultDeferred = s,
                        e.$emit(t, r),
                        s.promise
                }
                e.$emit(t, r)
            }

            function i(t, n) {
                return e.$on(t, n)
            }

            return t = {
                publish: r,
                subscribe: i
            },
                t
        }]),
            t
    }),
    define("common/helper/responsePreHandler", ["../cons/aliyunCons", "../services/topicService"], function (e) {
        var t = e.RESPONSE_CODE,
            n = e.SHOW_RESPONSE_ERROR_MESSAGE,
            r = function (e, r, i, s) {
                if (e.status == t.HTTP_SUCCESS) {
                    var o = e.data;
                    if (o.code == t.SUCCESS) return i == 1 ? o : o.data;
                    if (o.code == "606") return r && r.invoke(["aliyunCommonTopicService", function (e) {
                        u = e.publish(n, o, !0)
                    }]),
                        i == 1 ? o : o.data;
                    if (s == 1) return;
                    var u;
                    return r ? r.invoke(["aliyunCommonTopicService", function (e) {
                            u = e.publish(n, o, !0)
                        }]) : u = o.data,
                        u
                }
            },
            i = function (e, r, i, s, o) {
                if (e.status == t.HTTP_SUCCESS) {
                    var u = e.data;
                    if (u.code == t.SUCCESS) return i == 1 ? u : u.data;
                    if (s == 1) return;
                    var a;
                    return r ? r.invoke(["aliyunCommonTopicService", function (e) {
                            o && angular.isFunction(o) && o(u),
                                a = e.publish(n, u, !0)
                        }]) : a = u.data,
                        a
                }
            },
            s = function (e, n, r) {
                if (e.status == t.HTTP_SUCCESS) {
                    var i = e.data;
                    if (i.code == t.SUCCESS) return r == 1 ? i : i.data;
                    n && n.invoke(["$q", function (e) {
                        var t = e.defer();
                        return t.promise
                    }])
                }
            };
        return {
            responsePreHandler: r,
            responseHandler: i,
            responsePreHandlerNoDialog: s
        }
    }),
    define("common/directives/sideBar", ["../cons/aliyunConsViewFramework", "../helper/responsePreHandler", "../cons/aliyunCons", "angular", "../services/i18nService", "../helper/viewFrameworkHelper"], function (e, t, n, r, i, s) {
        "use strict";

        function d(e, t, n) {
            function i(e, t, n) {
                function i(t) {
                    if (!t || !e.productsMap) return;
                    e.productList = v(t, e.productsMap),
                        e.productHeight = b(t, e.productsMap)
                }

                function o(t) {
                    if (!t || !e.productsMap) return;
                    e.serviceList = v(t, e.servicesMap),
                        e.serviceHeight = b(t, e.servicesMap, e.serviceList.length)
                }

                function a(t) {
                    t && (e.navConfig = t)
                }

                function l(t) {
                    t && (e.productId = t, e.currentEntry = m(e))
                }

                function c(t) {
                    t && (e.type = t, e.isSidebarFold = t == "mini")
                }

                function h(t) {
                    t && (e.spmId = t)
                }

                function p(t) {
                    r.isDefined(t) && (e.version = t)
                }

                function d(t, n) {
                    if (!n || !n.type || !n.preference) return;
                    n.type === "product" ? e.productPreference = n.preference : n.type === "service" && (e.servicePreference = n.preference)
                }

                function g() {
                    e.isSidebarFold = !e.isSidebarFold;
                    var t = e.isSidebarFold ? "mini" : "full";
                    e.$emit("updateViewFrameworkConfigSidebar", t)
                }

                function y(e, t) {
                    t.folded = !t.folded
                }

                function b(t, n) {
                    var i = t.length,
                        s = e.currentEntry;
                    return t && s && r.isDefined(n[s.productId]) && t.indexOf(s.productId) == -1 && (i += 1),
                    i * f
                }

                u(e),
                    e.currentEntry = null,
                    e.loadingState = !0,
                    e.isSidebarFold = s.isSidebarFold(),
                    e.toggleFoldStatus = y,
                    e.toggleSidebarStatus = g,
                    e.versionGreaterThan1_3_21 = s.versionGreaterThan("1.3.21"),
                    e.$on("updatePreference", d),
                    e.$watch("productPreference", i),
                    e.$watch("servicePreference", o),
                    e.$watch("navConfig", a),
                    n.$observe("type", c),
                    n.$observe("productId", l),
                    n.$observe("spmId", h),
                    n.$observe("version", p)
            }

            function u(t) {
                e({
                    method: "jsonp",
                    url: p || "//home.console.aliyun" + o + "/nav/sidebar.js",
                    params: {
                        callback: "JSON_CALLBACK",
                        timestamp: (new Date).getTime()
                    }
                }).then(function (e) {
                    var n = e.data;
                    n && n.code == "200" ? l ? c(r.extend(n.data, a), t) : c(n.data, t) : c(a, t)
                }, function () {
                    c(a, t)
                })
            }

            function c(e, r) {
                if (!e) return;
                t(function () {
                    r.loadingState = !1,
                        r.navConfig = e.navConfig,
                        r.products = e.products,
                        r.services = e.services,
                        r.productsMap = h(r.products),
                        r.servicesMap = h(r.services),
                        r.currentEntry = m(r),
                        r.productPreference = d(e.productPreference, r.productsMap),
                        r.servicePreference = d(e.servicePreference, r.servicesMap),
                        r.locale = e.locale,
                        r.messages = y(r.locale || n.locale)
                }, 0)
            }

            function h(e) {
                var t = {};
                return r.forEach(e, function (e, n) {
                    e.productId && (t[e.productId] = e)
                }),
                    t
            }

            function d(e, t) {
                var n = [];
                return r.forEach(e, function (e, r) {
                    var i = t[e];
                    i && n.push(e)
                }),
                    n
            }

            function v(e, t) {
                var n = [];
                return r.forEach(e, function (e, r) {
                    var i = t[e];
                    i && n.push(i)
                }),
                    n
            }

            function m(e) {
                var t = null,
                    n = e.productId;
                return !e.currentEntry && n && r.forEach([e.productsMap, e.servicesMap], function (e, r) {
                    if (e) {
                        var i = e[n];
                        i && (t = i)
                    }
                }),
                    t
            }

            return {
                restrict: "A",
                replace: !0,
                scope: !0,
                templateUrl: "scripts/template/sideBar.html",
                link: i
            }
        }

        function v(e, n, i, s) {
            function o(o, f, l) {
                function h(e, t, n) {
                    var i = {};
                    return r.isArray(e) && e.length > 0 ? (r.forEach(e, function (e, r) {
                            n && e[n] && (e.arrayIndex = r, e.selected = t.indexOf(e[n]) !== -1, i[e[n]] = e)
                        }), i) : {}
                }

                function p(e) {
                    var f = e.pickedItems = r.copy(o.pickedItems),
                        l = e.allItems = r.copy(o.items),
                        c = e.allItemsMap = h(l, f, "productId");
                    e.title = o.title,
                        e.spmId = o.spmId,
                        e.messages = y(o.locale || s.locale),
                        e.clickHandler = function (e) {
                            var t = f.indexOf(e);
                            t !== -1 ? f.splice(t, 1) : f.push(e);
                            var n;
                            c[e] && (n = c[e].arrayIndex),
                                l[n].selected = !l[n].selected
                        },
                        e.setUserConfig = function () {
                            e.isLoadingState = !0,
                                n({
                                    method: "jsonp",
                                    url: o.requestUrl ? o.requestUrl : a.navConfig.requestUrl.setUserPreference,
                                    params: {
                                        callback: "JSON_CALLBACK",
                                        preference: r.toJson(f),
                                        type: o.type,
                                        timestamp: (new Date).getTime()
                                    }
                                }).then(function (n) {
                                    var s = t.responsePreHandler(n, i, !0);
                                    s && r.isFunction(s.then) == 0 && o.$emit("updatePreference", {
                                        preference: f,
                                        type: o.type
                                    }),
                                        e.isLoadingState = !1,
                                        e.close()
                                }, function (t) {
                                    e.isLoadingState = !1,
                                        i.invoke(["aliyunCommonTopicService", function (e) {
                                            e.publish(u, t, !0)
                                        }])
                                })
                        }
                }

                var c = 5;
                l.$observe("spmId", function (e) {
                    e && (o.spmId = e)
                }),
                    f.click(function (t) {
                        t.preventDefault(),
                            t.stopPropagation(),
                            e.showDialogByUrl("scripts/template/sidebarManage.html", p, {
                                windowClass: "viewFramework-sidebar-dialog"
                            })
                    })
            }

            return {
                restrict: "A",
                scope: {
                    pickedItems: "=",
                    items: "=",
                    requestUrl: "=",
                    type: "@",
                    title: "@",
                    locale: "@"
                },
                link: o
            }
        }

        function m(e) {
            return e("sidebarTooltip", "tooltip", "mouseenter")
        }

        function g() {
            return {
                restrict: "EA",
                replace: !0,
                scope: {
                    content: "@",
                    placement: "@",
                    animation: "&",
                    isOpen: "&"
                },
                templateUrl: "scripts/template/sidebarTooltipPopup.html"
            }
        }

        function y(e) {
            var t = i.getI18n("sidebar");
            return r.extend({}, t.localMessage, t.commonMessage)
        }

        r.module("aliyun.console.sidebar", []).directive("aliyunConsoleSidebar", d).directive("aliyunConsoleSidebarManage", v).directive("sidebarTooltip", m).directive("sidebarTooltipPopup", g);
        var o = n.SUFFIX,
            u = n.SHOW_RESPONSE_ERROR_MESSAGE,
            a = e.SIDEBAR_DEFAULT_CONS,
            f = 40,
            l = !1,
            c = window.CONSOLE_PRODUCT_NAME,
            h = window.EDAS_PRIVATE_CLOUD;
        if (c == "EDAS") h && (l = !0);
        else if (c == "BUTLER" || c == "MQ") l = !0;
        var p = "//home.console.aliyun" + o + "/nav/sidebar.js";
        if (l) {
            p = "/json/account/account.json";
            if (c == "EDAS") p = "/json/account/account.json";
            else if (c == "BUTLER" || c == "MQ") p = "/api/account.json?action=AccountAction&eventSubmitDoQueryAccount=1"
        }
        d.$inject = ["$http", "$timeout", "$rootScope"],
            v.$inject = ["aliyunDialog", "$http", "$injector", "$rootScope"],
            m.$inject = ["$tooltip"]
    }),
    define("common/directives/topbar", ["../cons/aliyunConsViewFramework", "../cons/aliyunCons", "../helper/viewFrameworkHelper", "angular"], function (e, t, n) {
        function l(e, t, s, u, l) {
            function p(e) {
                t({
                    method: "jsonp",
                    url: f || "//home.console.aliyun" + i + "/nav/topbar.js",
                    params: {
                        productId: e.productId,
                        callback: "JSON_CALLBACK",
                        timestamp: (new Date).getTime()
                    }
                }).then(function (t) {
                    var n = t.data;
                    n && n.code == "200" ? (console.log(n.data), a ? d(angular.extend(n.data, r), e) : d(n.data, e)) : d(r, e)
                }, function (t) {
                    d(r, e)
                })
            }

            function d(t, n) {
                e(function () {
                    w(t.categories, t.categoryGroup, n),
                        n.navLinks = m(t.navLinks, n, t.account),
                        n.messages = t.messages || null,
                        n.account = t.account || {},
                        n.requestUrl = n.navLinks && n.navLinks.requestUrl || r.requestUrl
                }, 0)
            }

            function v(e, t) {
                return e && e.length > t ? e.substring(0, t - 1) + "..." : e
            }

            function m(e, t, n) {
                t.topbarNavLinks && jQuery.extend(!0, e, t.topbarNavLinks);
                if (!e) return {};
                angular.forEach(e, function (e, n) {
                    e && (e.navRedirect && (e.href = g(e.href, t)), e.links && angular.isArray(e.links) && angular.forEach(e.links, function (e, n) {
                        e && e.navRedirect && (e.href = g(e.href, t))
                    }))
                });
                var r = e.user;
                r && (r.links && (angular.forEach(r.links, function (e, t) {
                    var n = e.href;
                    angular.isString(n) && /oauth_callback=$/.test(n) && (e.href = y(n), c = t, h = n)
                }), r.linkMap && h && n && n.currentStructure && r.links.splice(c, 1), l && l.config && l.config.ramTag && r.links.unshift({
                    href: r.tagLink ? r.tagLink : "",
                    target: "_self",
                    text: "TAG: " + v(l.config.ramTag, 20)
                })), r.linkMap && r.linkMap.signout && (r.linkMap.signout.href = y(r.linkMap.signout.href)));
                var i = e.qrcode;
                i && (i.text = u.trustAsHtml(i.text), i.title = u.trustAsHtml(i.title)),
                    x(e.i18n);
                var s = e.customHelp;
                if (!t.currentProduct || !t.currentProduct.helpCategoryId) s.show = !1;
                else if (s) {
                    t.helpConfig = {
                        title: s.title,
                        link: u.trustAsResourceUrl(s.href)
                    };
                    if (s.show) {
                        var o = e.help;
                        o && (o.show = !1)
                    }
                }
                return e
            }

            function g(e, t) {
                return e + "&productId=" + t.productId
            }

            function y(e) {
                return e + encodeURIComponent(window.location.href)
            }

            function b(e, t, n) {
                n || (n = "id");
                var r;
                return angular.isArray(e) && e.length > 0 && t && angular.forEach(e, function (e, i) {
                    !r && e[n] == t && (r = e)
                }),
                    r
            }

            function w(e, t, n) {
                var r = [],
                    i = [],
                    s, o = 0,
                    u = 2,
                    a = angular.isNumber(t[o]) ? t[o] : u;
                if (!t || !angular.isArray(t)) t = [];
                angular.isArray(e) && (s = e.length, angular.forEach(e, function (e, f) {
                    E(e, n),
                        i.push(e);
                    if (a == i.length || f == s - 1) r.push(i),
                        i = [],
                        o++,
                        a = angular.isNumber(t[o]) ? t[o] : u
                })),
                    n.categories = r
            }

            function E(e, t) {
                var n = t.productId;
                n && angular.forEach(e.products, function (e, r) {
                    t.currentProduct == undefined && e.productId == n && (t.currentProduct = e)
                })
            }

            function S(n) {
                t({
                    method: "jsonp",
                    url: n.requestUrl.updateMessageInfo,
                    params: {
                        callback: "JSON_CALLBACK",
                        timestamp: (new Date).getTime()
                    }
                }).then(function (t) {
                    var r = t.data;
                    r && r.code == "200" && r.data && e(function () {
                        n.messageInfo = r.data
                    }, 0)
                })
            }

            function x(e) {
                if (!e) return;
                e.show && e.requestUrl && t({
                    method: "jsonp",
                    url: e.requestUrl,
                    params: {
                        callback: "JSON_CALLBACK",
                        timestamp: (new Date).getTime()
                    }
                }).then(function (t) {
                    var n = t.data;
                    if (n && n.code == "200" && n.data) {
                        var r = n.data.currentLanguage,
                            i = n.data.supportedLanguages,
                            s, o = [];
                        angular.forEach(i, function (e, t) {
                            e && (e.value == r ? s = e : o.push(e))
                        }),
                        s || (s = i[0]),
                            e.currentLanguage = s,
                            e.languages = o
                    } else e.show = !1
                }, function () {
                    e.show = !1
                })
            }

            function T(e) {
                e && t({
                    method: "jsonp",
                    url: e,
                    params: {
                        callback: "JSON_CALLBACK",
                        timestamp: (new Date).getTime()
                    }
                }).then(function (e) {
                    window.location.reload()
                })
            }

            function N(t, i, u) {
                function a() {
                    t.topbarConfig.showHelpPanel = !t.topbarConfig.showHelpPanel
                }

                t.versionGreaterThan1_3_21 = n.versionGreaterThan("1.3.21"),
                    t.topbarConfig = {
                        showHelpPanel: !1
                    },
                    t.toggleHelpPanelStatus = a,
                    t.changeCurrentLanguage = T,
                    o == "LCC" ? (r.navLinks.notShowProd = !0, r.navLinks.home = {
                            icon: "icon-home",
                            href: "",
                            text: "INSIST-RPC管理平台",
                            target: "_self",
                            show: !0
                        }, d(r, t)) : p(t),
                    s.$on("topbarUpdateMessageInfo", function () {
                        S(t)
                    }),
                    s.$on("$stateChangeSuccess", function (n, r, i, s, o) {
                        e(function () {
                            if (!t.navLinks) return;
                            var e = t.navLinks.userLink;
                            if (e && e.links && c != undefined && h != undefined) {
                                var n = e.links[c];
                                n && (n.href = y(h))
                            }
                            e && e.linkMap && e.linkMap.signout && (e.linkMap.signout.href = y(h))
                        }, 0)
                    }),
                    t.readMessage = function () {
                        e(function () {
                            S(t)
                        }, 2e3)
                    }
            }

            var c, h;
            return {
                restrict: "A",
                replace: !0,
                scope: {
                    workorderId: "=",
                    productId: "=",
                    topbarNavLinks: "="
                },
                templateUrl: "scripts/template/topbar.html",
                link: N
            }
        }

        function c(e) {
            return {
                restrict: "AM",
                scope: {
                    searchLink: "="
                },
                templateUrl: "scripts/template/topbarSearch.html",
                transclude: !1,
                link: function (t, r, i, s) {
                    function o(n) {
                        $(n.target).closest(".aliyun-console-topbar-search-v1_3_21").length == 0 && e(function () {
                            t.dropdownOpen = !1
                        })
                    }

                    t.versionGreaterThan1_3_21 = n.versionGreaterThan("1.3.21"),
                        t.model = {
                            askInput: ""
                        },
                        i.$observe("searchUrl", function (e) {
                            e && (t.searchUrl = e)
                        }),
                        $(r).on("keypress", ".topbar-search-ask", function (e) {
                            e.keyCode == 13 && window.open(t.searchUrl + t.model.askInput, "_blank")
                        }),
                        t.isActive = !1,
                        t.activeInput = function () {
                            t.isActive = !0
                        },
                        t.inactiveInput = function () {
                            e(function () {
                                t.isActive = !1
                            }, 150)
                        },
                        t.searchClick = function (e) {
                            t.isActive || (t.isActive = !0, r.find(".topbar-search-ask").focus(), e.preventDefault())
                        },
                        t.dropdownOpen = !1,
                        t.toggleDropdownStatus = function (e) {
                            e.preventDefault(),
                                t.dropdownOpen = !t.dropdownOpen,
                            t.dropdownOpen || $(document).off("click", o)
                        },
                    t.versionGreaterThan1_3_21 && $(document).on("click", o),
                        t.$on("$destroy", function () {
                            $(document).off("click", o)
                        })
                }
            }
        }

        function h() {
            function e(e, t, n) {
                function r() {
                    e.show = !0
                }

                function i() {
                    e.show = !1
                }

                e.hidePanel = i
            }

            return {
                restrict: "A",
                replace: !0,
                scope: {
                    show: "=",
                    config: "="
                },
                templateUrl: "scripts/template/topbarHelp.html",
                link: e
            }
        }

        angular.module("aliyun.console.topbar", []).directive("aliyunConsoleTopbar", l).directive("aliyunConsoleTopbarSearch", c).directive("aliyunConsoleTopbarHelp", h);
        var r = e.TOPBAR_DEFAULT_CONS,
            i = t.SUFFIX,
            s = 32,
            o = window.CONSOLE_PRODUCT_NAME,
            u = window.EDAS_PRIVATE_CLOUD,
            a = !1;
        if (o == "EDAS") u && (a = !0);
        else if (o == "BUTLER" || o == "MQ") a = !0;
        var f = "//home.console.aliyun" + i + "/nav/topbar.js";
        if (a) {
            f = "/json/account/account.json";
            if (o == "EDAS") f = "/json/account/account.json";
            else if (o == "BUTLER" || o == "MQ") f = "/api/account.json?action=AccountAction&eventSubmitDoQueryAccount=1"
        }
        l.$inject = ["$timeout", "$http", "$rootScope", "$sce", "viewFrameworkSetting"],
            c.$inject = ["$timeout"]
    }),
    define("common/directives/viewFramework", ["../helper/viewFrameworkHelper", "../helper/urlQueryStringHelper", "../cons/aliyunConsViewFramework", "angular", "./productNavBar", "./sideBar", "./topbar"], function (e, t, n) {
        function i(e) {
            var n = t.getQueryValueMap(),
                r = ["hideTopbar", "hideSidebar", "disableNavigation", "embed", "sidebar", "productNavBar"];
            n && angular.forEach(r, function (t) {
                var r = n[t];
                angular.isDefined(r) && angular.isDefined(e[t]) && (r == "true" && (r = !0), r == "false" && (r = !1), e[t] = r)
            })
        }

        var r = angular.module("aliyun.console.viewFramework", ["aliyun.console.productNavBar", "aliyun.console.sidebar", "aliyun.console.topbar"]);
        r.factory("viewFrameworkSetting", ["$rootScope", "$state", "$q", function (t, n, r) {
            if (!t.viewFrameworkConfig) {
                var s = {
                    version: null,
                    hideTopbar: !1,
                    hideSidebar: !1,
                    disableNavigation: !1,
                    embed: !1,
                    sidebar: "mini",
                    productId: "",
                    productNavBar: "col-1",
                    workorderId: "",
                    topbarSpm: "101",
                    sidebarSpm: "102",
                    productNavSpm: "103",
                    topbarNavLinks: null,
                    ramTag: "",
                    exclusiveStates: []
                };
                i(s),
                    e.init(s),
                    window.viewFrameworkConfig = t.viewFrameworkConfig = s
            }
            var o = r.defer();
            return {
                promise: o,
                config: t.viewFrameworkConfig,
                setConfig: function (n, r) {
                    r ? t.viewFrameworkConfig = n : (t.viewFrameworkConfig = angular.extend(t.viewFrameworkConfig, n), e.init(t.viewFrameworkConfig))
                },
                setVersion: function (n) {
                    t.viewFrameworkConfig.version = n,
                        e.init(t.viewFrameworkConfig)
                },
                setShowTopbar: function (e) {
                    t.viewFrameworkConfig.hideTopbar = !e
                },
                setShowSidebar: function (e) {
                    t.viewFrameworkConfig.hideSidebar = !e
                },
                setHideTopbar: function (e) {
                    t.viewFrameworkConfig.hideTopbar = e
                },
                setHideSidebar: function (e) {
                    t.viewFrameworkConfig.hideSidebar = e
                },
                setDisableNavigation: function (e) {
                    t.viewFrameworkConfig.disableNavigation = e
                },
                setProductId: function (e) {
                    t.viewFrameworkConfig.productId = e
                },
                setSidebar: function (e) {
                    t.viewFrameworkConfig.sidebar = e
                },
                setProductNavBar: function (e) {
                    t.viewFrameworkConfig.productNavBar = e
                },
                setWorkorderId: function (e) {
                    t.viewFrameworkConfig.workorderId = e
                },
                setExclusiveStates: function (e) {
                    t.viewFrameworkConfig.exclusiveStates = e
                },
                setTopbarNavLinks: function (e) {
                    t.viewFrameworkConfig.topbarNavLinks = e
                },
                setRamTag: function (e) {
                    t.viewFrameworkConfig.ramTag = e
                },
                onReady: function (e) {
                    o.promise.then(function () {
                        e()
                    })
                },
                isExclusiveOperation: function (e) {
                    var r = t.viewFrameworkConfig.exclusiveStates,
                        i = !1;
                    return angular.forEach(r, function (e) {
                        !i && n.includes(e) && (i = !0)
                    }),
                        i
                }
            }
        }]),
            r.directive("viewFramework", ["$window", function (t) {
                return {
                    restrict: "A",
                    replace: !0,
                    scope: !0,
                    transclude: !0,
                    templateUrl: "scripts/template/viewFramework.html",
                    controller: ["$scope", "$rootScope", "viewFrameworkSetting", function (r, i, s) {
                        r.config = i.viewFrameworkConfig,
                            t.aliyunConsoleVersion = "1.3.38",
                            i.$on("$viewContentLoaded", function (e) {
                                s.promise.resolve()
                            }),
                            r.collapseProductNavbar = function () {
                                var e = r.config.productNavBar;
                                e == "col-1" ? e = "none" : e = "col-1",
                                    r.config.productNavBar = e
                            },
                            r.$watch("config", function (e, t) {
                                (e.productNavBar != t.productNavBar || e.sidebar != t.sidebar) && setTimeout(function () {
                                    angular.element(window).resize()
                                }, 500)
                            }, !0),
                            r.$on("updateViewFrameworkConfigSidebar", function (t, i) {
                                r.config && (r.config.sidebar = i, e.setCookie(n.SIDEBAR_FOLD_COOKIENAME, i, n.SIDEBAR_FOLD_COOKIEDOMAIN))
                            })
                    }],
                    link: function (e, t, n) {
                    }
                }
            }])
    }),
    define("common-tpl", ["angular"], function () {
    }),
    define("common/helper/objectHelper", [], function () {
        Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1
        }),
        typeof String.prototype.trim != "function" && (String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, "")
        }),
        Object.keys || (Object.keys = function () {
            "use strict";
            var e = Object.prototype.hasOwnProperty,
                t = !{
                    toString: null
                }.propertyIsEnumerable("toString"),
                n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                r = n.length;
            return function (i) {
                if (typeof i == "object" || typeof i == "function" && i !== null) {
                    var s = [],
                        o, u;
                    for (o in i) e.call(i, o) && s.push(o);
                    if (t) for (u = 0; u < r; u++) e.call(i, n[u]) && s.push(n[u]);
                    return s
                }
                throw new TypeError("Object.keys called on non-object")
            }
        }())
    }),
    !
        function () {
            angular.module("angularScreenfull", [])
        }(),


    function () {
        "use strict";

        function e(e) {
            function r(t, n, r, i) {
                if (r.ngsfFullscreen && "" !== r.ngsfFullscreen) {
                    var s = e(r.ngsfFullscreen);
                    s.assign(t, i)
                }
            }

            return {
                restrict: "A",
                require: "ngsfFullscreen",
                controller: t,
                link: r
            }
        }

        function t(e, t, n, r) {
            function i() {
                var i = function () {
                    r[c.isFullscreen() ? "addClass" : "removeClass"](n, "fullscreen"),
                        e.$emit("fullscreenchange"),
                        e.$apply()
                };
                t[0].addEventListener(screenfull.raw.fullscreenchange, i),
                    e.$on("$destroy", function () {
                        t[0].removeEventListener(screenfull.raw.fullscreenchange, i)
                    })
            }

            function s(t) {
                return e.$on("fullscreenchange", t)
            }

            function o() {
                return c.fullscreenEnabled() ? (screenfull.request(n[0]), e.$emit("fullscreenEnabled"), !0) : !1
            }

            function u() {
                c.fullscreenEnabled() && c.isFullscreen() && c.toggleFullscreen()
            }

            function a() {
                if (c.fullscreenEnabled()) {
                    var t = screenfull.isFullscreen;
                    return screenfull.toggle(n[0]),
                        e.$emit(t ? "fullscreenDisabled" : "fullscreenEnabled"),
                        !0
                }
                return !1
            }

            function f() {
                return c.fullscreenEnabled() ? screenfull.isFullscreen : !1
            }

            function l() {
                return "undefined" != typeof screenfull ? screenfull.enabled : !1
            }

            var c = this;
            c.onFullscreenChange = s,
                c.requestFullscreen = o,
                c.removeFullscreen = u,
                c.toggleFullscreen = a,
                c.isFullscreen = f,
                c.fullscreenEnabled = l,
            c.fullscreenEnabled() && i()
        }

        angular.module("angularScreenfull").directive("ngsfFullscreen", e),
            e.$inject = ["$parse"],
            t.$inject = ["$scope", "$document", "$element", "$animate"]
    }(),


    function () {
        "use strict";

        function e(e) {
            function t(t, n, r, i) {
                i.fullscreenEnabled() ? e.removeClass(n, "ng-hide") : e.addClass(n, "ng-hide")
            }

            return {
                restrict: "A",
                require: "^ngsfFullscreen",
                link: t
            }
        }

        angular.module("angularScreenfull").directive("showIfFullscreenEnabled", e),
            e.$inject = ["$animate"]
    }(),


    function () {
        "use strict";

        function e(e) {
            function t(t, n, r, i) {
                var s = function () {
                    var t = i.isFullscreen();
                    ("false" === r.showIfFullscreen || r.showIfFullscreen === !1) && (t = !t),
                        t ? e.removeClass(n, "ng-hide") : e.addClass(n, "ng-hide")
                };
                s();
                var o = i.onFullscreenChange(s);
                t.$on("$destroy", o)
            }

            return {
                restrict: "A",
                require: "^ngsfFullscreen",
                link: t
            }
        }

        angular.module("angularScreenfull").directive("showIfFullscreen", e),
            e.$inject = ["$animate"]
    }(),


    function () {
        "use strict";

        function e() {
            function e(e, t, n, r) {
                t.on("click", function () {
                    r.toggleFullscreen()
                })
            }

            return {
                restrict: "A",
                require: "^ngsfFullscreen",
                link: e
            }
        }

        angular.module("angularScreenfull").directive("ngsfToggleFullscreen", e)
    }(),
    define("angularScreenfull", ["angular"], function () {
    }),
    define("app", ["angular", "angular-cookies", "angular-file-upload", "ui.router", "ui.bootstrap", "ui.select2", "common/directives/aliyunInstanceSelector", "angular-animate", "angular-growl", "angular-ui-validate", "angular-sanitize", "aliyun-console-bootstrap-tpl", "angular-locale-zh-cn", "angular-translate", "aliyun-lcc-tpl", "bindonce", "common/directives/viewFramework", "common-tpl", "common/helper/objectHelper", "common/directives/aliyunCommonDirectives", "angularScreenfull"], function (e) {
        "use strict";
        return e.module("lccConsole", ["ui.router", "ui.bootstrap", "ui.select2", "angularFileUpload", "aliyun.console.common.tpl", "aliyun.console.bootstrap.tpl", "aliyun.console.lcc.tpl", "ui.validate", "ngSanitize", "ngAnimate", "ngCookies", "angular-growl", "pasvaz.bindonce", "pascalprecht.translate", "aliyunConsoleControllers", "aliyunCommonDirectives", "aliyunCommonServices", "lccControllers", "lccStates", "lccServices", "lccDirectives", "lccFilters", "aliyun.console.viewFramework", "angularScreenfull", "console.dateRangePicker"])
    }),
    define("common/controllers/controller", ["angular"], function (e) {
        return e.module(["aliyunConsoleControllers"], [])
    }),
    define("common/services/Dialog", ["app", "./services", "angular", "../services/i18nService"], function (e, t, n, r) {
        "use strict";
        if (!e || !e.provider) e = t;
        var i = r.getI18n("common"),
            s = i.i18n("common.lb.confirm"),
            o = i.i18n("common.lb.cancel");
        e.provider("aliyunDialogConfig", function () {
            var e = {
                defaultButtonConfig: [{
                    result: !0,
                    label: s,
                    cssClass: "btn-primary"
                },
                    {
                        result: !1,
                        label: o,
                        cssClass: "btn-default"
                    }]
            };
            return {
                setButtonLabels: function (t) {
                    n.forEach(e.defaultButtonConfig, function (e, n) {
                        e.label = t[n]
                    })
                },
                setProviderOptions: function (t) {
                    n.extend(e, t)
                },
                $get: function () {
                    return e
                }
            }
        }),
            e.factory("aliyunDialog", ["$rootScope", "$modal", "$modalStack", "aliyunDialogConfig", function (e, t, r, i) {
                var s = function (e) {
                        var r = {
                                backdrop: "static"
                            },
                            i = n.extend({}, r, e),
                            s = t.open(i);
                        return s
                    },
                    o = function (e, t, r) {
                        var i, o, u = {
                            templateUrl: e,
                            resolve: {
                                passedObject: function () {
                                    return r
                                }
                            },
                            controller: ["$scope", "$modalInstance", "$rootScope", "$modalStack", "passedObject", function (e, r, s, u, a) {
                                o = e.$on("$locationChangeSuccess", function () {
                                    i && e._dialogShow == 1 && e.close(!1)
                                });
                                var f = "icon-warning-2";
                                a != undefined && a.iconClass && (f = a.iconClass);
                                var l = "text-warning";
                                a != undefined && a.iconColor && (l = a.iconColor),
                                    e.iconClass = f + " " + l,
                                    e._passedObject = a,
                                    e._dialogShow = !0,
                                    e.close = function (t) {
                                        e._dialogShow = !1,
                                            r.close(t),
                                            i = null
                                    },
                                n.isFunction(t) && t(e)
                            }]
                        };
                        r && r.windowClass && (u.windowClass = r.windowClass),
                            i = s(u);
                        var a = function (e) {
                            return o && o(),
                                e
                        };
                        return i.result.then(function (e) {
                            return a(e)
                        }, function (e) {
                            return a(e)
                        }),
                            i
                    },
                    u = function (e, t, r) {
                        var s = "scripts/template/message.html",
                            u = i.defaultButtonConfig;
                        t = t || e.callback,
                            r = r || e.passedObject;
                        var a = e.buttons || u,
                            f = function (r) {
                                r.title = e.title,
                                    r.message = e.message,
                                    r.buttons = a,
                                    r.eventHandler = function (e) {
                                        r.close(e)
                                    },
                                n.isFunction(t) && t(r)
                            };
                        return o(s, f, r)
                    },
                    a = function (e, t, n, r) {
                        return u({
                            title: e,
                            message: t,
                            buttons: n,
                            passedObject: r
                        })
                    };
                return {
                    showDialog: s,
                    showDialogByUrl: o,
                    showMessageDialog: u,
                    showMessageDialogSimple: a
                }
            }])
    }),
    define("common/controllers/commonController", ["./controller", "angular", "app", "../cons/aliyunCons", "../services/i18nService", "../services/Dialog", "../services/topicService"], function (e, t, n, r, i) {
        var s = i.getI18n("commonController"),
            n = n || e;
        n.provider("commonControllerConfig", function () {
            var e = {
                labels: {
                    DIALOG_TITLE: s.i18n("dialog.title"),
                    BTN_OK: s.i18n("dialog.btn.ok")
                }
            };
            return {
                setGlobalLabels: function (t) {
                    e && (e.labels = t)
                },
                $get: function () {
                    return e
                }
            }
        }),
            e.controller("aliyunCommonController", ["$scope", "$rootScope", "aliyunCommonTopicService", "aliyunDialog", "commonControllerConfig", function (e, n, i, o, u) {
                function c(e) {
                    function c(t, n) {
                        t && t.resolve({
                            buttonResult: n,
                            messageOptions: e
                        }),
                            l = null
                    }

                    var n = e,
                        r = u.labels,
                        i, s;
                    t.isObject(e) && (n = e.message, n == "validerr" && t.isArray(e.data) && (n = [], t.forEach(e.data, function (e, t) {
                        var r = e.message;
                        "value" in e && r.indexOf("value") > -1 && (r = r.replace("value", e.value)),
                            n.push(t + 1 + "、" + e.propertyPath + r)
                    }), n = n.join("<br>")), n == undefined && (e.data && e.data.message ? n = e.data.message : n = a), i = e.modalResultDeferred, s = e.iconClass);
                    var f = [{
                            result: !0,
                            label: r.BTN_OK,
                            cssClass: "btn btn-primary"
                        }],
                        h = o.showMessageDialogSimple(r.DIALOG_TITLE, n, f, e);
                    return h.result.then(function (e) {
                        c(i, e)
                    }, function (e) {
                        c(i, e)
                    }),
                        l
                }

                var a = s.i18n("defaultErrorMsg"),
                    f = r.SHOW_RESPONSE_ERROR_MESSAGE,
                    l;
                i.subscribe(f, function (e, n) {
                    l != null && (l.close(!1), l = null),
                    t.isString(n) && (n = {
                        message: n
                    }),
                        n.iconClass = "icon-no-2",
                        c(n)
                })
            }])
    }),
    define("common/services/aliyunHttpHandler", ["angular", "./services", "../cons/aliyunCons", "../services/i18nService", "angular-growl", "../services/topicService"], function (e, t, n, r) {
        var i = r.getI18n("services.aliyunHttpHandler"),
            s = {
                timeoutTipPrefix: i.i18n("msg.timeoutTip.partOne"),
                timeoutTipSufix: i.i18n("msg.timeoutTip.partTwo"),
                error: i.i18n("msg.response.error")
            },
            o = n.RESPONSE_CODE,
            u = n.SHOW_RESPONSE_ERROR_MESSAGE,
            a = n.ALIYUN_CONSOLE_SESSION_TIMEOUT,
            f = "aliyunConsoleSessionNeedBuy",
            l = "aliyunConsoleSessionNeedNotice";
        t.constant("aliyunConsoleConf", {
            linkHandler: function (e) {
                return e
            },
            httpOptionInterceptor: function (e) {
                return e
            },
            httpOptionWrapper: function (e) {
                return e
            },
            httpResponseInterceptor: function (e) {
                return e
            },
            responseSuccessCode: o.SUCCESS,
            enableSessionTimeout: !0,
            sessionTimeoutCode: o.SESSION_TIMEOUT,
            sessionTimeoutLink: "",
            sessionTimeoutNeedCallbackFunc: !0,
            labels: {
                SESSION_TIMEOUT1: s.timeoutTipPrefix,
                SESSION_TIMEOUT2: s.timeoutTipSufix,
                RESPONSE_ERROR: s.error
            }
        }).provider("aliyunConsoleSetting", ["aliyunConsoleConf", function (t) {
            var n = t;
            return {
                setProviderOptions: function (t) {
                    e.extend(n, t)
                },
                setGlobalLabels: function (e) {
                    n && (n.labels = e)
                },
                $get: function () {
                    return n
                }
            }
        }]).config(["$httpProvider", function (e) {
            e.interceptors.push("aliyunConsoleHttpInterceptor")
        }]).config(["growlProvider", "$compileProvider", "$tooltipProvider", function (e, t, n) {
            e.onlyUniqueMessages(!0),
                e.globalTimeToLive(3e3),
                e.globalEnableHtml(!0),
                t.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/),
                n.options({
                    animation: !1
                })
        }]).factory("aliyun.console.request", ["aliyun.console.requestWrapper", "growl", "$q", "aliyunCommonTopicService", "aliyunConsoleSetting", function (t, n, r, i, s) {
            function a(a, f) {
                f = f || {};
                var a = s.linkHandler(a);
                if (f && f.method) {
                    var l = f.method.toUpperCase();
                    l == "POST" && (f.data == undefined && (f.data = {}), s.httpOptionInterceptor(f))
                } else f.method = "GET";
                return f && f.submitMessage && n.addSuccessMessage(f.submitMessage),
                    s.httpOptionWrapper(f),
                    t.sendRequestWithUrl(a, f).then(function (e) {
                        var t = e.data,
                            r = e.config;
                        return r && t && t.code && (t.code == o.SUCCESS || t.code.toString() && t.code.toString().indexOf("606") == 0) && r.successMessage != undefined && n.addSuccessMessage(r.successMessage),
                            e
                    }, function (t) {
                        if (f && f.ignoreErrorHandler && f.ignoreErrorHandler == 1) return r.reject(t);
                        console.log(t);
                        if (t.status !== o.HTTP_SUCCESS) {
                            var n = s.labels.RESPONSE_ERROR;
                            if (t.status == "500" && t.data.code == "607" && t.data.message == "validerr") if (e.isArray(t.data.data)) {
                                var a = [].concat(["参数错误"], t.data.data.map(function (e) {
                                    return e.propertyPath + " " + e.message
                                }));
                                n = a.join("<br />")
                            } else n = "参数错误";
                            i.publish(u, n)
                        }
                        return r.reject(t)
                    })
            }

            return {
                request: a
            }
        }]).factory("aliyunConsoleHttpInterceptor", ["$q", "$rootScope", "aliyunConsoleSetting", "$injector", function (e, t, n, r) {
            return {
                response: function (i) {
                    var s = i.data;
                    return n.enableSessionTimeout && s.code == n.sessionTimeoutCode ? (t.$emit(a, i), e.reject(i)) : n.enableSessionTimeout && n.sessionNeedBuyCode && s.code == n.sessionNeedBuyCode ? (t.$emit(f, i), e.reject(i)) : n.enableSessionTimeout && n.sessionNeedNoticeCode && s.code == n.sessionNeedNoticeCode ? (t.$emit(l, i), e.reject(i)) : n.httpResponseInterceptor(i, r) === !1 ? e.reject(i) : i || e.when(i)
                },
                responseError: function (t) {
                    return e.reject(t)
                }
            }
        }]).run(["$rootScope", "aliyunCommonTopicService", "aliyunConsoleSetting", function (e, t, n) {
            var r = n.labels;
            e.gConfig == undefined && (e.gConfig = {
                sessionTimeout: !1
            }),
                e.$on(a, function (i, s) {
                    var o;
                    n.sessionTimeoutNeedCallbackFunc ? o = n.sessionTimeoutLink + "?oauth_callback=" + encodeURIComponent(location.href) : o = n.sessionTimeoutLink + encodeURIComponent(location.href);
                    var a = r.SESSION_TIMEOUT1 + "<a href=" + o + ">" + r.SESSION_TIMEOUT2 + "</a>。";
                    e.gConfig.sessionTimeout == 0 && (e.gConfig.sessionTimeout = !0, setTimeout(function () {
                        var e = t.publish(u, a, !0);
                        e.then(function (e) {
                            window.location = o
                        })
                    }, 0))
                }),
                e.$on(f, function (e, t) {
                    debugger;
                    location.href = "http://www.aliyun.com/product/edas"
                }),
                e.$on(l, function (e, t) {
                    location.href = location.origin + "/#/notice"
                })
        }])
    }),
    define("common/directives/topbar-new", ["./aliyunCommonDirectives", "../cons/aliyunConsTopbar"], function (e, t) {
        e.constant("aliyunConsoleTopbarConf", {
            version: "beta",
            productId: "",
            dataSpm: "100",
            showGlobalSearch: !0,
            showLocaleButton: !1
        }).provider("aliyunConsoleTopbarSetting", ["aliyunConsoleTopbarConf", function (e) {
            var t = e;
            return {
                setProviderOptions: function (e) {
                    angular.extend(t, e)
                },
                $get: function () {
                    return t
                }
            }
        }]).directive("aliyunConsoleTopbarNew", ["$timeout", "$http", "aliyunConsoleTopbarSetting", function (e, n, r) {
            var i = function () {
                    function n(n, r) {
                        var i = function (e, t) {
                                var n = angular.copy(e);
                                return t && n ? n.href = n.href + t : n.href = n.hrefIndex || n.href,
                                    n
                            },
                            o = function (e, t) {
                                var r = [],
                                    i = [],
                                    s, o = 0;
                                angular.isArray(e) && (s = e.length, angular.forEach(e, function (e, n) {
                                    a(e.products, t),
                                        i.push(e);
                                    if (n % 2 == 1 || n == s - 1) r.push(i),
                                        i = [],
                                        o++
                                })),
                                    n.productsInfo = r,
                                    n.productsListWidth = u(o)
                            },
                            u = function (e) {
                                return {
                                    width: e * 190 + 20 + 2 + "px"
                                }
                            },
                            a = function (e, t) {
                                var r = s.options.productId;
                                angular.forEach(e, function (e, i) {
                                    angular.isObject(e.href) && (e.href = t ? e.href.jbp || e.href.aliyun : e.href.aliyun),
                                    e.id == r && (n.currentProduct = e)
                                })
                            },
                            f = function (e) {
                                e.link && (n.logoLink = e.link.logoLink, n.userLinks = t(e.link.userLinks), n.homeLink = e.link.homeLink, n.accessKeysLink = e.link.accessKeysLink, n.helpLink = i(e.link.helpLink, n.currentProduct && n.currentProduct.workorderId), n.searchLink = e.link.searchLink, n.notificationLink = e.link.notificationLink, n.productLink = e.link.productLink)
                            };
                        r ? e(function () {
                                n.account = r.account,
                                    n.isJBP = r.isJBP,
                                    o(r.categoryInfo, r.isJBP),
                                    n.notification = r.notice.notification,
                                    n.productStatus = r.product,
                                    f(r)
                            }) : (o(s.options.defaultData.categoryInfo), f(s.options.defaultData))
                    }

                    function r(n, r) {
                        var i = {
                                "zh-cn": 200,
                                en: 240
                            },
                            o = function (e, t) {
                                var n = angular.copy(e);
                                return angular.isDefined(n) && angular.forEach(n.links, function (e) {
                                    e.hrefIndex && (e.href = t ? e.href + t : e.hrefIndex)
                                }),
                                    n
                            },
                            u = function (e) {
                                var t = [],
                                    r = [],
                                    i, s = 0;
                                angular.isArray(e) && (i = e.length, angular.forEach(e, function (e, n) {
                                    f(e.products),
                                        r.push(e);
                                    if (n % 2 == 1 || n == i - 1) t.push(r),
                                        r = [],
                                        s++
                                })),
                                    n.productsInfo = t,
                                    n.productsListWidth = a(s)
                            },
                            a = function (e) {
                                var t = i[n.localeId] || i["zh-cn"];
                                return {
                                    width: e * t + 20 + 2 + "px"
                                }
                            },
                            f = function (e, t) {
                                var r = s.options.productId;
                                angular.forEach(e, function (e, t) {
                                    e.id == r && (n.currentProduct = e)
                                })
                            },
                            l = function (e) {
                                e.link && (n.logoLink = e.link.logoLink, n.userLinks = t(e.link.userLinks), n.homeLink = e.link.homeLink, n.accessKeysLink = e.link.accessKeysLink, n.helpLinks = o(e.link.helpLinks, n.currentProduct && n.currentProduct.workorderId), n.searchLink = e.link.searchLink, n.notificationLink = e.link.notificationLink, n.productLink = e.link.productLink)
                            },
                            c = function (e) {
                                n.locale = {},
                                    n.locale.options = s.options.locale.options,
                                    n.locale.show = s.options.locale.show,
                                    n.locale.current = h(e),
                                    n.changeLocale = function (e) {
                                        var t = window.location.search,
                                            n = s.options.locale.localeKey,
                                            r;
                                        if (t.indexOf("?") != -1) {
                                            t = t.substring(1),
                                                r = t.split("&");
                                            var i = !1;
                                            angular.forEach(r, function (t, s) {
                                                var o = t.indexOf(n);
                                                o != -1 && (r[s] = t.substring(0, t.indexOf("=")) + "=" + e.id, i = !0)
                                            }),
                                            i || r.push(n + "=" + e.id)
                                        } else r = [n + "=" + e.id];
                                        var o = window.location.origin + window.location.pathname + "?" + r.join("&") + window.location.hash;
                                        window.location = o
                                    }
                            },
                            h = function (e) {
                                var t = s.options.locale.options,
                                    n = t[0];
                                return angular.forEach(t, function (t, r) {
                                    t.id === e && (n = t)
                                }),
                                    n
                            };
                        r ? e(function () {
                                n.account = r.account,
                                    n.localeId = r.locale,
                                    u(r.categoryInfo),
                                    n.notification = r.notice.notification,
                                    n.productStatus = r.product,
                                    l(r),
                                    c(r.locale)
                            }) : (n.localeId = "zh-cn", u(s.options.defaultData.categoryInfo), l(s.options.defaultData), c("zh-cn"))
                    }

                    var t = function (e) {
                        return angular.forEach(e, function (e, t) {
                            var n = e.href;
                            angular.isString(n) && /oauth_callback=$/.test(n) && (e.href = n + encodeURIComponent(window.location.href))
                        }),
                            e
                    };
                    return {
                        formatInfoForAlpha: n,
                        formatInfoForBeta: r
                    }
                }(),
                s = {};
            return s.suffix = function () {
                var e = window.location.host;
                if (!e.match(/^.+\.aliyun\.|^aliyun\./)) return ".com";
                var t = e.replace(/^.*\.aliyun|^aliyun/i, "");
                return t || (t = ".com"),
                    t
            }(),
                s.defaultOptions = {
                    productId: "",
                    templateUrl: "scripts/template/topbarAlpha.html",
                    formatter: i.formatInfoForAlpha,
                    defaultData: t.ALPHA_CONS,
                    defaultFormatter: function (e) {
                        s.options.formatter(e)
                    },
                    topbarPortal: "//home.console.aliyun" + s.suffix + "/topbarInfo.js",
                    readNoticePortal: "//home.console.aliyun" + s.suffix + "/setNoticeStatus.js",
                    showGlobalSearch: !0
                },
                s.versionOptions = {
                    alpha: {},
                    beta: {
                        templateUrl: "scripts/template/topbarBeta.html",
                        formatter: i.formatInfoForBeta,
                        topbarPortal: "//home.console.aliyun" + s.suffix + "/topbar/info.js",
                        defaultData: t.BETA_CONS,
                        locale: {
                            options: [{
                                id: "zh-cn",
                                text: "CN"
                            },
                                {
                                    id: "en",
                                    text: "EN"
                                }],
                            localeKey: "lang",
                            show: r.showLocaleButton
                        }
                    }
                },
                s.options = function () {
                    var t = angular.copy(s.defaultOptions);
                    return s.versionOptions[r.version] && angular.extend(t, s.versionOptions[r.version]),
                        angular.extend(t, r),
                        t
                }(),
                {
                    restrict: "A",
                    replace: !0,
                    templateUrl: s.options.templateUrl,
                    transclude: !1,
                    link: function (t, r, i) {
                        i.dataSpm || i.$set("dataSpm", s.options.dataSpm),
                            angular.forEach(["productId"], function (e) {
                                angular.isDefined(i[e]) && (s.options[e] = i[e])
                            }),
                            angular.forEach(["showGlobalSearch"], function (e) {
                                angular.isDefined(s.options[e]) && (t[e] = s.options[e])
                            });
                        var o = function () {
                            n({
                                method: "jsonp",
                                url: s.options.topbarPortal,
                                params: {
                                    callback: "JSON_CALLBACK",
                                    timestamp: (new Date).getTime()
                                }
                            }).then(function (e) {
                                var n = e.data;
                                n && n.code == "200" && s.options.formatter(t, n.data)
                            }, function () {
                                s.options.defaultFormatter(t)
                            })
                        }();
                        t.readNoticeAction = function (r) {
                            r.read || n({
                                method: "jsonp",
                                url: s.options.readNoticePortal,
                                params: {
                                    id: r.id,
                                    read: !0,
                                    callback: "JSON_CALLBACK",
                                    timestamp: (new Date).getTime()
                                }
                            }).then(function (n) {
                                var i = n.data;
                                i.code == "200" && e(function () {
                                    t.notification.unread > 0 && t.notification.unread--,
                                        r.read = !0
                                })
                            })
                        }
                    }
                }
        }])
    }),
    define("common/directives/globalNotice", ["./aliyunCommonDirectives", "angular"], function (aliyunCommonDirectives, angular) {
        aliyunCommonDirectives.directive("aliyunConsoleGlobalNotice", ["$rootScope", "$http", "$timeout", "$sce", function ($rootScope, $http, $timeout, $sce) {
            return {
                restrict: "A",
                templateUrl: "scripts/template/globalNotice.html",
                link: function (scope, element, attrs) {
                    function getNoticeList() {
                        var noticeNotshow = eval("[" + localStorage.noticeNotshow + "]") || [],
                            requestOptions = {
                                method: "jsonp",
                                url: getNoticeUrl,
                                params: {
                                    id: attrs.productId,
                                    callback: "JSON_CALLBACK"
                                }
                            };
                        $http(requestOptions).then(function (e) {
                            e && e.data && e.data.code == "200" && e.data.data && (scope.notices = formatNoticeData(e.data.data), scope.notices = [].filter.call(scope.notices, function (e, t) {
                                return noticeNotshow.indexOf(e.id) > -1 ? !1 : !0
                            }), scope.notices.length > 1 ? sliderInit() : scope.notices.length == 1 && (scope.notices[0].active = !0))
                        })
                    }

                    function formatNoticeData(e) {
                        var t = angular.isFunction(scope.noticeDataHandler) ? scope.noticeDataHandler(e) || e : e;
                        return angular.forEach(t, function (e, t) {
                            e.className = ALERT_TYPE_MAP[e.alert_type] || ALERT_TYPE_MAP[0],
                                e.content = $sce.trustAsHtml(e.docName)
                        }),
                            t
                    }

                    function sliderInit() {
                        var e = scope.notices.length;
                        angular.forEach(scope.notices, function (e, t) {
                            e.active = t == 0
                        }),
                            scope.currentNotice = scope.notices[0],
                            scope.currentIndex = 0,
                            scope.innerPaddingLeft = getInnerPaddingLeft(e),
                            startNoticeInterval(),
                            element.on("mouseenter", function () {
                                startIntervalPromise && stopNoticeInterVal()
                            }),
                            element.on("mouseleave", function () {
                                startIntervalPromise || startNoticeInterval()
                            })
                    }

                    function changeCurrentNotice(e) {
                        angular.forEach(scope.notices, function (t, n) {
                            t.active = !1,
                            e.id == t.id && (scope.currentIndex = n)
                        }),
                            e.active = !0,
                            scope.currentNotice = e
                    }

                    function startNoticeInterval() {
                        if (scope.notices.length > 1 && angular.isDefined(scope.currentIndex) && angular.isDefined(scope.currentNotice)) {
                            var e = findNextNotice(scope.currentIndex);
                            startIntervalPromise = $timeout(function () {
                                changeCurrentNotice(e),
                                    startNoticeInterval()
                            }, sliderInterval)
                        }
                    }

                    function stopNoticeInterVal() {
                        startIntervalPromise && ($timeout.cancel(startIntervalPromise), startIntervalPromise = undefined)
                    }

                    function findNextNotice(e) {
                        var t = scope.notices.length;
                        if (!angular.isDefined(t) || e >= t || t == 0) return;
                        return e == t - 1 ? scope.notices[0] : scope.notices[e + 1]
                    }

                    function getInnerPaddingLeft(e) {
                        return e == 1 && (e = 0),
                            {
                                "padding-left": e * 15 + 15 + "px"
                            }
                    }

                    function resetSlide(e) {
                        var t = scope.notices.length;
                        if (t > 0) return scope.innerPaddingLeft = getInnerPaddingLeft(t),
                            e == t ? scope.notices[0].active = !0 : scope.notices[e].active = !0
                    }

                    var suffix = function () {
                            var e = window.location.host;
                            if (!e.match(/^.+\.aliyun\.|^aliyun\./)) return ".com";
                            var t = e.replace(/^.*\.aliyun|^aliyun/i, "");
                            return t || (t = ".com"),
                                t
                        }(),
                        readNoticUrl = location.origin + "/json/queryDocsJson.json?type=notice",
                        getNoticeUrl = location.origin + "/json/queryDocsJson.json?type=notice",
                        ALERT_TYPE_MAP = {
                            0: "alert-warning",
                            1: "alert-success",
                            2: "alert-danger",
                            3: "alert-info"
                        };
                    getNoticeList(),
                        scope.readNotice = function (notice) {
                            var noticeNotshow = eval("[" + localStorage.noticeNotshow + "]") || [];
                            noticeNotshow.push(notice.id),
                                localStorage.noticeNotshow = noticeNotshow;
                            var currentIndex;
                            $http({
                                method: "jsonp",
                                url: readNoticUrl,
                                params: {
                                    id: notice.id,
                                    show: !1,
                                    callback: "JSON_CALLBACK"
                                }
                            }),
                                angular.forEach(scope.notices, function (e, t) {
                                    e.id == notice.id && (scope.notices.splice(t, 1), currentIndex = t)
                                }),
                                resetSlide(currentIndex)
                        };
                    var sliderInterval = 1e4,
                        startIntervalPromise;
                    scope.changeCurrentNotice = changeCurrentNotice
                }
            }
        }])
    }),


    function () {
        define("common/directives/datetimePicker", ["angular", "../services/i18nService"], function (e, t) {
            var n = t.getI18n("directives.datetimePicker"),
                r = {
                    choose: n.i18n("datepicker.choose.range"),
                    start: n.i18n("datepicker.choose.startDate"),
                    end: n.i18n("datepicker.choose.endDate"),
                    confirm: n.i18n(!0, "common.lb.confirm"),
                    today: n.i18n("datepicker.today"),
                    days: n.i18n("datepicker.days")
                },
                i = e.module(["console.dateRangePicker"], ["ui.bootstrap.tooltip"]);
            return i.constant("dateRangePickerConfig", {
                endMax: new Date
            }).controller("DateRangePickerController", ["$scope", "$attrs", "dateRangePickerConfig", function (t, n, r) {
                return $.extend(this, {
                    getNewdayStart: function (t) {
                        return e.isUndefined(t) ? void 0 : (e.isNumber(t) && (t = new Date(t)), t)
                    },
                    getNewdayEnd: function (t) {
                        if (e.isNumber(t)) return t = new Date(t),
                            t
                    }
                }),
                    $.extend(t, {
                        dataTimePicker: {
                            hstep: 1,
                            mstep: 1,
                            setOptions: function () {
                            },
                            makeTo24Hour: function () {
                                return t.timeRange[0].setHours(0),
                                    t.timeRange[0].setMinutes(1),
                                    t.timeRange[1].setHours(23),
                                    t.timeRange[1].setMinutes(59)
                            }
                        }
                    }),
                    t.dataTimePicker.setOptions()
            }]).directive("dateRangePicker", ["$timeout", function (e) {
                return {
                    restrict: "AM",
                    replace: !0,
                    template: ['<div class="date-time">', '<div style="position: relative;display: inline-block">', '<div style="width:300px" class="input-group">', "<span style=\"background: #fff\" class=\"input-group-addon\">{{timeRange[0] | date : 'yyyy-MM-dd HH:mm'}}&nbsp;&nbsp;－&nbsp;&nbsp;{{timeRange[1] | date : 'yyyy-MM-dd HH:mm'}}</span>", '<span style="border-left: 1px solid #bababa" ng-click="dataTimePicker.show()" class="input-group-addon btn btn-default"><i class="glyphicon glyphicon-calendar"></i></span>', "</div>", '<div ng-show="dataTimePicker.popoverShowHide" style="top: 40px;left:-47px;max-width: inherit;position: absolute;z-index:1010;background-color: #ffffff;box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);border: 1px solid #ccc" class="domain-list">', '<table style="margin:20px">', '<tr style="height: 30px;border-bottom: 1px solid #DDD">', '<td colspan="3" style="padding-bottom: 18px">', '<div class="btn-group">', '<button type="button" ng-click="dataTimePicker.change(10)" class="btn btn-default btn-xs">最近10分钟</button>', '<button type="button" ng-click="dataTimePicker.change(20)" class="btn btn-default btn-xs">最近20分钟</button>', '<button type="button" ng-click="dataTimePicker.change(30)" class="btn btn-default btn-xs">最近30分钟</button>', "</div>", '<button ng-click="dataTimePicker.show(\'ok\')" class="pull-right btn btn-primary btn-xs">' + r.confirm + "</button><br>", "</td>", "</tr>", "<tr>", '<td style="padding-top: 10px">', '<label style="width:60px">' + r.start + "</label>", "</td>", '<td style="padding-top: 10px">', '<div style="width:130px" class="input-group">', '<input readonly="readonly" min="min" show-button-bar="false" show-weeks="false" datepicker-popup="{{format}}" ng-model="timeRange[0]" max="dataTimePicker.startMax" is-open="dataTimePicker.startDateOpend" style="background-color:#fff;color:#000;cursor: auto" class="form-control">', '<span class="input-group-btn">', '<button ng-click="dataTimePicker.open($event,\'startDateOpend\')" class="btn btn-default"><i class="glyphicon glyphicon-calendar"></i></button>', "</span>", "</div>", "</td>", '<td style="padding-top: 10px">', '<div ng-model="timeRange[0]">', '<div timepicker="timepicker" hour-step="dataTimePicker.hstep" minute-step="dataTimePicker.mstep" show-meridian="false"></div>', "</div>", "</td>", "</tr>", "<tr>", "<td>", '<label style="width:60px">' + r.end + "</label>", "</td>", "<td>", '<div style="width:130px" class="input-group">', '<input readonly="readonly" show-button-bar="false" show-weeks="false" datepicker-popup="{{format}}" ng-model="timeRange[1]" min="dataTimePicker.endMin" max="dataTimePicker.endMax" is-open="dataTimePicker.endDateOpend" style="background-color:#fff;color:#000;cursor: auto" class="form-control">', '<span class="input-group-btn">', '<button ng-click="dataTimePicker.open($event,\'endDateOpened\')" class="btn btn-default"><i class="glyphicon glyphicon-calendar"></i></button>', "</span>", "</div>", "</td>", "<td>", '<div ng-model="timeRange[1]">', '<div timepicker="timepicker" hour-step="dataTimePicker.hstep" minute-step="dataTimePicker.mstep" show-meridian="false"></div>', "</div>", "</td>", "</tr>", "</table>", "</div></div></div>"].join(""),
                    transclude: !1,
                    scope: {
                        timeRange: "=",
                        submit: "&submit",
                        min: "="
                    },
                    controller: "DateRangePickerController",
                    link: function (t, n, r, i) {
                        var s;
                        return s = new Date,
                            $.extend(!0, t, {
                                dataTimePicker: {
                                    open: function (e, n) {
                                        return e.preventDefault(),
                                            e.stopPropagation(),
                                            n === "startDateOpend" ? (t.dataTimePicker.endDateOpend = !1, t.dataTimePicker.startDateOpend = !0) : (t.dataTimePicker.endDateOpend = !0, t.dataTimePicker.startDateOpend = !1)
                                    },
                                    change: function (e) {
                                        return s = new Date,
                                            t.timeRange[0] = i.getNewdayStart(new Date(s.getTime() - e * 1e3 * 60)),
                                            t.timeRange[1] = i.getNewdayEnd(Date.parse(s)),
                                            t.submit(),
                                            t.dataTimePicker.show()
                                    },
                                    show: function () {
                                        return t.dataTimePicker.popoverShowHide = t.dataTimePicker.popoverShowHide ? !1 : !0
                                    }
                                }
                            }),
                            t.$watchCollection("timeRange", function (e) {
                                t.dataTimePicker.endMin = e[0],
                                    t.dataTimePicker.endMax = s,
                                    t.dataTimePicker.startMax = e[1];
                                if (e[0] > e[1]) return e[1] = e[0]
                            }),
                            t.$watch("dataTimePicker.popoverShowHide", function (e) {
                                if (e === !1) return t.submit()
                            }),
                            e(function () {
                                return n.find(".console-number-spinner input").attr({
                                    style: "background-color:#fff;color:#000;cursor: auto;"
                                })
                            }, 500)
                    }
                }
            }])
        })
    }.call(this),
    define("lcc/initConfig", ["angular", "app", "common/helper/i18nHelper", "lcc/cons/lccCons", "lcc/utils/lccVariablesService", "common/cons/aliyunConsTopbar", "common/controllers/commonController", "common/services/aliyunHttpHandler", "common/directives/topbar-new", "common/directives/globalNotice", "common/directives/datetimePicker"], function (e, t, n, r, i, s) {
        t.config(["aliyunConsoleSettingProvider", function (e) {
            e.setProviderOptions({
                linkHandler: function (e) {
                    return e
                },
                httpOptionInterceptor: function (e) {
                },
                httpResponseInterceptor: function (e, t) {
                },
                sessionTimeoutLink: i.getGlobalKey("LCC_CONSOLE_CONFIG").LOGIN || "",
                sessionTimeoutCode: "ConsoleNeedLogin",
                sessionNeedBuyLink: "http://www.aliyun.com/product/lcc",
                sessionNeedBuyCode: "ConsoleNeedBuy",
                sessionNeedNoticeLink: "http://" + location.host + "/#/notice/",
                sessionNeedNoticeCode: "ConsoleNeedNotice"
            })
        }]),
            t.config(["$tooltipProvider", function (e) {
                e.options({
                    appendToBody: !0
                })
            }]).run(["$rootScope", "$cookieStore", "viewFrameworkSetting", "productNavBarSetting", function (t, n, o, u) {
                o.setProductNavBar("col-1"),
                    o.setProductId("lccApp"),
                    o.setShowTopbar(!0),
                    o.setHideSidebar(!0),
                    o.setTopbarNavLinks({
                        accesskeys: {
                            show: !1
                        },
                        assist: {
                            show: !1
                        },
                        customHelp: {
                            show: !1
                        },
                        help: {
                            show: !1
                        },
                        home: {
                            show: !0
                        },
                        i18n: {
                            show: !1,
                            showNew: !1
                        },
                        icp: {
                            show: !1
                        },
                        logo: {
                            show: !1
                        },
                        message: {
                            show: !1
                        },
                        product: {
                            show: !1
                        },
                        qrcode: {
                            show: !1
                        },
                        search: {
                            show: !1
                        },
                        user: {
                            show: !1
                        },
                        workorder: {
                            show: !1
                        }
                    }),
                    o.onReady(function () {
                    }),
                    o.setVersion("1.3.27"),
                    u.setTitle("INSIST-RPC配置中心"),
                    u.setMainNav(r.NAVBAR_CONS.mainNav_NotLoggedIn),
                    s.BETA_CONS.link.userLinks[3].href = "/json/logout.htm";
                var a = i.getGlobalKey("REGION_LIST_CONFIG") || [],
                    f = r.LCC_COOKIE_SELECTED_REGION_NO;
                t.lccConfig = {
                    regionList: a,
                    selectedRegionNo: "",
                    lccAgentInstall: "",
                    lccAgentInstall_VPC: "",
                    selectedRegionName: "",
                    updateSelectedRegion: function (r) {
                        var i = !1;
                        return e.forEach(a, function (e) {
                            r == e.regionNo ? (i = !0, e.currentRegionActive = "active", t.lccConfig.selectedRegionNo = r, t.lccConfig.lccAgentInstall = e.agentInstall, t.lccConfig.lccAgentInstall_VPC = e.agentInstall4vpc || "", t.lccConfig.selectedRegionName = e.regionName, n.put(f, r)) : e.currentRegionActive = ""
                        }),
                            {
                                regionValid: i,
                                regionNo: r
                            }
                    }
                };
                var l = n.get(f);
                l == undefined && a && a.length > 0 && (l = a[0].regionNo),
                l && t.lccConfig.updateSelectedRegion(l)
            }]).config(["$translateProvider", function (e) {
                var t = window.ALIYUN_LCC_CONSOLE_MESSAGE || {};
                e.translations("zh", t),
                    e.preferredLanguage("zh"),
                    n.i18nConfig(t)
            }])
    }),
    define("common/modelSystem/modelSystemModule", ["angular"], function (e) {
        var t = e.module(["aliyunConsoleModelSystem"], []);
        return t.constant("aliyunConsoleDefaultModelConfig", {
            bizTypes: [],
            modelTypes: [],
            moduleModel: {},
            pageModel: {},
            bizComponentModel: {},
            bizModel: {},
            formModel: {},
            gridModel: {},
            toolBarModel: {}
        }).provider("aliyunConsoleModelSetting", ["aliyunConsoleDefaultModelConfig", function (t) {
            var n = t;
            return {
                setProviderOptions: function (t) {
                    e.extend(n, t)
                },
                setBizTypes: function (t) {
                    n && e.isArray(t) && (n.bizTypes = t)
                },
                setModelTypes: function (t) {
                    n && e.isArray(t) && (n.modelTypes = t)
                },
                $get: function () {
                    return n
                }
            }
        }]).run(["controllerInheritService", function (e) {
            e.init()
        }]),
            t
    }),
    define("common/modelSystem/modelSystemBaseController", ["angular", "./modelSystemModule", "../helper/responsePreHandler"], function (e, t, n) {
        function r(e, t) {
            return Array.prototype.slice.call(e, t || 0)
        }

        function i(t) {
            if (e.isArray(t)) for (var n = 0, r = null; r = t[n]; n++) if (r === "$scope") return !0;
            return !1
        }

        function s(e, t, r) {
            this.$rootScope = e,
                this.modelFactory = t,
                this.responsePreHandler = n,
                this.getScopeContext = function () {
                    return r
                }
        }

        t.controller("modelSystemBaseController", s).controller("$$baseController", s),
            s.$inject = ["$rootScope", "modelFactory", "modelSystemScopeContextService"],
            s.prototype = {
                constructor: s,
                $constructor: function (e) {
                    this.$scope = e
                },
                $on: function () {
                    if (this.$scope === undefined) throw new Error("父controller没有初始化，请在子controller中调用 this.$parent.$constructor.call(this,$scope)来完成父类的初始化");
                    var t = r(arguments),
                        n = this.$rootScope.$on.apply(this.$rootScope, t);
                    this.$scope.$on("$destroy", function () {
                        e.isFunction(n) && n()
                    })
                },
                $publish: function () {
                    var e = r(arguments);
                    this.$rootScope.$emit.apply(this.$rootScope, e)
                },
                $getModel: function () {
                    var e = r(arguments);
                    return this.modelFactory.getModel.apply(this.modelFactory, e)
                },
                $handleResponse: function (e) {
                    var t = Array.prototype.slice.call(arguments, 0);
                    return this.responsePreHandler.responsePreHandler.apply(this.responsePreHandler, t)
                }
            };
        var o = {
            cache: {},
            $rootScope: null,
            $controller: null,
            resolveSubController: function (t, n, r, i) {
                function h(e, t) {
                    if (!e || !t) return;
                    var n = e;
                    for (var r in t) n[r] = t[r];
                    return n
                }

                var s = t.parent;
                if (t.resolved === !1 && e.isString(s)) {
                    var u = n[s];
                    if (u === undefined || u.resolved === !0) {
                        var a = {
                            $scope: i.$new()
                        };
                        try {
                            var f = r(s, a);
                            t.constructor.$parent = {
                                $constructor: f.$constructor ||
                                function () {
                                }
                            },
                                t.constructor.prototype = h(f, t.constructor.prototype),
                            u || (t.constructor.prototype.$parent = f),
                                t.constructor.prototype.constructor = t.constructor,
                                t.constructor.prototype.$name = t.name
                        } catch (l) {
                            throw console.log(l),
                                new Error('modelSystem:BaseController:the controller "' + s + '" you want to inherit dose not exist or failed to instantiate, check if you had registed it or the services which it relies on are correct')
                        }
                        t.resolved = !0
                    } else {
                        var c = u;
                        o.resolveSubController(c, n, r, i)
                    }
                }
            },
            dynamicInherit: function (e, t, n) {
                this.inherit(e, t, n);
                var r = this.cache,
                    i = r[e];
                this.resolveSubController(i, r, this.$controller, this.$rootScope)
            },
            inherit: function (t, n, r) {
                if (!e.isString(t)) throw new Error("subControllerName must be the name of sub controller");
                if (!e.isFunction(n)) throw new Error("subController must be a function");
                if (!e.isString(r)) throw new Error("superController must be a name of a controller");
                var i = {
                        name: t,
                        parent: r,
                        constructor: n,
                        resolved: !1
                    },
                    s = this.cache[t];
                if (e.isObject(s) && s.parent !== r) throw new Error(t + 'has inherited "' + s.parent + '" , can not inherit from ' + r);
                this.cache[t] = i
            }
        };
        return t.factory("controllerInheritService", ["$controller", "$rootScope", function (e, t) {
            var n = !1;
            return o.$controller = e,
                o.$rootScope = t,
                {
                    init: function () {
                        if (n === !1) {
                            n = !0;
                            var r = o.cache,
                                i = null,
                                s = [];
                            for (var u in r) if (r.hasOwnProperty(u)) {
                                var a = r[u];
                                o.resolveSubController(a, r, e, t)
                            }
                        }
                    }
                }
        }]),
            {
                inherit: function (e, t, n, r) {
                    return r === !0 ? o.dynamicInherit(e, t, n) : o.inherit(e, t, n)
                },
                wrapController: function (t) {
                    var n = t,
                        r = n.controller,
                        i = this;
                    return function () {
                        var t = Array.prototype.slice.call(arguments, 0),
                            s = arguments.length === 3;
                        if (e.isObject(a) && s) console.log("the way to define a controller can not inherit the other controller");
                        else if (s) {
                            var o = arguments[1];
                            e.isArray(o) && (o = o[o.length - 1]);
                            var u = null,
                                a = null;
                            e.isFunction(o) && (a = arguments[0], u = arguments[2]),
                                n.$$isInLazyMod ? i.inherit(a, o, u, !0) : i.inherit(a, o, u)
                        }
                        return r.apply(n, t)
                    }
                }
            }
    }),
    define("lcc/controllers/controllers", ["angular", "common/modelSystem/modelSystemBaseController"], function (e, t) {
        var n = e.module("lccControllers", []);
        return n.controller = t.wrapController(n),
            n
    }),
    define("lcc/controllers/lccCommonController", ["angular", "./controllers", "../cons/lccCons", "common/helper/responsePreHandler"], function (e, t, n, r) {
        var i = ["$scope", "$controller", "$injector", "$state", "$stateParams", "lccAccountRequest", "$q", "productNavBarSetting", "aliyunDialog", function (t, r, i, s, o, u, a, f, l) {
            e.extend(this, r("aliyunCommonController", {
                $scope: t
            }));
            var c = this;
            f.setMainNav(n.NAVBAR_CONS.mainNav)
        }];
        t.controller("lccCommonController", i)
    });
var genChart = function (e, t, n, r, i) {
    return {
        appId: r,
        appName: i,
        chart: {
            type: "column",
            height: 290
        },
        title: {
            text: e + " 运行情况"
        },
        subtitle: {
            text: ""
        },
        xAxis: {
            categories: ["提供服务", "消费服务", "URL调用"]
        },
        yAxis: {
            min: 0,
            minRange: .1,
            title: {
                text: "调用 (次)"
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: "</table>",
            shared: !0,
            useHTML: !0,
            formatter: function () {
                var e = this.points.map(function (e) {
                    if (e.series.name != "hackNoneData") return e.series.name + ": " + e.y
                });
                return e.join("<br />")
            }
        },
        plotOptions: {
            column: {
                pointPadding: .2,
                borderWidth: 0
            }
        },
        series: [{
            name: "调用次数",
            data: t,
            color: "#009900"
        },
            {
                name: "出错次数",
                data: n,
                color: "#7cb5ec"
            },
            {
                name: "hackNoneData",
                data: [0, 0, 0],
                showInLegend: !1
            }]
    }
};
define("lcc/cons/lccEventCons", [], function () {
    return {
        EVENT_OPERATION_READY: "server_operation_ready"
    }
}),
    define("lcc/helpers/lccTableHelper", ["angular", "common/helper/responsePreHandler", "../cons/lccEventCons"], function (e, t, n) {
        var r = {
            initTableDef: function (e, t) {
                this.$injector = e,
                    this.options = t,
                    this.lastParams = {},
                t.columns && t.config && (this.columns = t.columns, this.config = t.config),
                    this.searchParams = {}
            },
            operationReadyRefreshHandler: function (t, r, i) {
                var s = this,
                    o = t.subscribe(n.EVENT_OPERATION_READY, function (t, n) {
                        i(function () {
                            e.isFunction(s.refreshTableList) && s.refreshTableList()
                        }, 200)
                    });
                r.$on("$destroy", function () {
                    o()
                })
            },
            actionCallback: function (e) {
            },
            updateRequestParams: function (e, t) {
                return e
            },
            refreshTableList: function () {
                this.config.refreshCurrentView ? this.config.refreshCurrentView() : this.updateList(this.options, !0)
            },
            refreshInBack: function () {
                this.updateList(this.options, !1)
            },
            updateList: function (e, t, n) {
                var e = e || {};
                this.lastParams = e.params;
                var r = this.updateRequestParams(e, t);
                if (r && r.notReadyForQuery == 1) return;
                !n && (this.loadingState = !0),
                    this.filterItems = e.params || {};
                var i = this;
                this.getRequestService()(r).then(function (e) {
                    !n && (i.loadingState = !1),
                    e.data && e.data.data && $.isArray(e.data.data) && i.filterItems && (e.data.data = i._filterInClient(e.data.data, i.filterItems)),
                        i._actionInnerCallback(e)
                })
            },
            _filterInClient: function (e, t) {
                return e.filter(function (e, n) {
                    var r = !0;
                    return $.each(t, function (t, n) {
                        typeof e[t] != "undefined" && e[t] != n && (r = r && !1)
                    }),
                        r
                })
            },
            getRequestService: function () {
                if (this.options && this.options.requestService) return this.options.requestService
            },
            _actionInnerCallback: function (e) {
                var n = this.$injector,
                    r = this;
                if (this.$injector) {
                    var i = t.responsePreHandler(e, n, !0);
                    r.actionCallback(i)
                } else r.actionCallback(e)
            },
            updateTableData: function (e) {
                this.updateList({
                    params: e.params
                }, !e.isInitTableRequest)
            },
            pageHandler: function (e, t) {
                var n = this.config.pageInfo.pageSize,
                    r = this.config.pageInfo.currentPage,
                    i = t,
                    s = this.config.pageInfo.showPageGoto;
                return {
                    pageSize: n,
                    page: r,
                    total: i,
                    showPageGoto: s
                }
            }
        };
        return r
    }),
    define("lcc/helpers/lccRegionHelper", ["angular", "../cons/lccCons"], function (e, t) {
        function n(t, n, r) {
            var i = n.lccConfig,
                s = i.regionList,
                o = t.regionNo,
                u = !1;
            e.forEach(s, function (e) {
                o == e.regionNo && (u = !0)
            }),
            u == 0 && s.length > 0 && (o = s[0].regionNo, n.lccConfig.updateSelectedRegion(o), r.go(r.current.name, {
                regionNo: o
            }))
        }

        function r(e) {
            var t = window.REGION_LIST_CONFIG;
            if (t) for (var n = 0; n < t.length; n++) {
                var r = t[n];
                if (r.regionNo == e) return r.regionName
            }
        }

        return {
            validateRegionNo: n,
            getRegionNameFromRegionNo: r
        }
    }),
    define("lcc/models/common/commonGridModel", ["angular"], function (e) {
        var t = {
            useBindOnce: !0,
            paginationSupport: !1,
            clientSort: !1,
            checkboxSupport: !1,
            tfootPositionFixed: !0,
            paginationInfo: {
                pageSize: 20,
                page: 1,
                showPageGoto: !0
            }
        };
        return {
            config: t
        }
    }),
    define("lcc/models/resource/dsConfigModel", ["angular", "../common/commonGridModel"], function (e, t) {
        var n = {
                paginationSupport: !0,
                paginationInfo: {
                    pageSize: 20,
                    page: 1,
                    showPageGoto: !0
                }
            },
            r = e.extend({}, t.config, n),
            i = [{
                name: "Group",
                field: "group"
            },
                {
                    name: "DataId",
                    field: "dataId"
                },
                {
                    name: "操作",
                    fieldDirective: '<a href="javascript:;" ng-click="store.editDs(item, true)">查看</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:;" ng-click="store.editDs(item)">更新</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="javascript:;" class="text-warning"  ng-click="store.delDs(item)">删除</a>'
                }];
        return {
            columns: i,
            config: r
        }
    }),
    define("lcc/controllers/resource/dsConfigController", ["angular", "./../controllers", "../../cons/lccCons", "../../helpers/lccTableHelper", "../../helpers/lccRegionHelper", "common/helper/responsePreHandler", "../../models/resource/dsConfigModel", "common/services/topicService"], function (e, t, n, r, i, s, o) {
        function u(t, i, s, u, a, f, l, c, h) {
            var p = this;
            p.errorTips = "",
                p.group = "",
                p.dataId = "",
                e.extend(p, r),
                p.operationReadyRefreshHandler(u, s, a);
            var d = e.copy(o.config);
            p.actionCallback = function (t) {
                p.itemList = t.data.result || [],
                    p.pageInfo = d.paginationInfo,
                    p.pageInfo.total = t.data.totalSize,
                    e.forEach(p.itemList, function (e) {
                        typeof e.backendServers == "string" && (e.backendServers = e.backendServers.split(","))
                    }),
                    p.itemList.editDs = p.editDs,
                    p.itemList.delDs = p.delDs
            },
                p.initTableDef(t, {
                    requestService: i.restDsConfigs,
                    columns: o.columns,
                    config: d
                }),
                p.updateRequestParams = function (e, t) {
                    return e.params.method = "listConfig",
                        e.params.group = p.group,
                        e.params.dataId = p.dataId,
                        e
                },
                p.clear = function () {
                    p.errorTips = "",
                        p.group = "",
                        p.dataId = "",
                        p.refreshTableList()
                },
                p.search = function () {
                    p.pageInfo.page = 1,
                        p.refreshTableList()
                },
                p.viewDs = function (e) {
                    h.showDialogByUrl(n.PARTIALS_PATH + "resource/editDs.html", function (t) {
                        t.title = "查看配置",
                            t.ds = e || {},
                            t.isView = !0
                    })
                },
                p.editDs = function (e, t) {
                    h.showDialogByUrl(n.PARTIALS_PATH + "resource/editDs.html", function (n) {
                        n.title = e ? "编辑配置" : "创建配置",
                            n.ds = e || {},
                            n.isEdit = !!e,
                        t === !0 && (n.title = "查看配置", n.isView = !0),
                            n.saveDs = function () {
                                var e = {
                                    method: "publishConfig",
                                    dataId: n.ds.dataId,
                                    group: n.ds.group,
                                    content: n.ds.content
                                };
                                i.restDsConfigs({
                                    method: "POST",
                                    params: e
                                }).then(function (e) {
                                    var t = e.data;
                                    t && t.success && p.refreshTableList()
                                }),
                                    n.close()
                            }
                    })
                },
                p.delDs = function (e) {
                    h.showMessageDialog({
                        title: "删除",
                        message: '<p>您确定要删除<span class="text-warning">[' + e.group + "|" + e.dataId + "]</span>吗？</p>",
                        buttons: [{
                            result: !0,
                            label: "删除",
                            cssClass: "btn-danger"
                        },
                            {
                                result: !1,
                                label: "取消",
                                cssClass: "btn-default"
                            }]
                    }).result.then(function (t) {
                        if (t) {
                            var n = {
                                method: "removeConfig",
                                dataId: e.dataId,
                                group: e.group
                            };
                            i.restDsConfigs({
                                method: "POST",
                                params: n
                            }).then(function (e) {
                                var t = e.data;
                                t && t.success && p.refreshTableList()
                            })
                        }
                    })
                }
        }

        t.controller("dsConfigController", u),
            u.$inject = ["$injector", "lccResourceRequest", "$scope", "aliyunCommonTopicService", "$timeout", "$stateParams", "$state", "$rootScope", "aliyunDialog"]
    }),
    define("lcc/models/resource/slbModel", ["angular", "../common/commonGridModel"], function (e, t) {
        var n = {
                paginationSupport: !0,
                paginationInfo: {
                    pageSize: 20,
                    page: 1,
                    showPageGoto: !0
                },
                checkboxSupport: !0,
                batchOperationBarDirective: '<div lcc-action-auth auth="16:22" lcc-server-batch-actions selected-items="$parent.selectedItems" resource-type="slb"></div>'
            },
            r = e.extend({}, t.config, n),
            i = [{
                name: "实例ID/名称",
                fieldDirective: "<p>{{item.slbId}}</p><p ng-if=\"item.slbName == '' || item.slbName ==undefined\" >无实例名称</p><p ng-if=\"item.slbName != ''\" >{{item.slbName}}</p>"
            },
                {
                    name: "所在可用区",
                    field: "regionId"
                },
                {
                    name: "服务地址",
                    fieldDirective: '{{item.address}}<span class="text-muted" ng-show="item.addressType == \'intranet\'" >（内）</span><span class="text-muted" ng-show="item.addressType != \'intranet\'" >（外）</span>'
                },
                {
                    name: "后端服务器",
                    fieldDirective: '<p bindonce ng-repeat="addr in item.backendServers">{{addr}}</p>'
                },
                {
                    name: "状态",
                    fieldDirective: '<span ng-if="item.slbStatus == \'active\'" class="text-success">运行中</span><span ng-if="item.slbStatus ==\'inactive\'" class="text-danger">已停止</span><span ng-if="item.slbStatus == \'Expired\'" class="text-danger">已过期</span>'
                }];
        return {
            columns: i,
            config: r
        }
    }),
    define("lcc/controllers/resource/serviceListController", ["angular", "./../controllers", "../../cons/lccCons", "../../helpers/lccTableHelper", "../../helpers/lccRegionHelper", "common/helper/responsePreHandler", "../../models/resource/slbModel", "common/services/topicService"], function (e, t, n, r, i, s, o) {
        var u = function () {
            },
            a = null,
            f = ["lccResourceRequest", "$scope", "aliyunCommonTopicService", "$timeout", "$stateParams", "$state", "$rootScope", function (e, t, r, i, s, o, u) {
                a = t,
                    t.tabs = n.SERVICE_LIST_MENUS,
                    t.dataId = s.dataId || "",
                    t.groupId = s.groupId || "",
                    t.ip = s.ip || "",
                    t.search = function () {
                        o.go(o.current.name, {
                            dataId: t.dataId,
                            groupId: t.groupId,
                            ip: t.ip
                        })
                    },
                    t.clear = function () {
                        t.dataId = "",
                            t.groupId = "",
                            t.ip = "",
                            t.search()
                    }
            }],
            l = ["lccResourceRequest", "$scope", "aliyunCommonTopicService", "$timeout", "$stateParams", "$state", "$rootScope", "aliyunDialog", function (t, r, i, s, o, u, a, f) {
                r.loadingState = !0,
                    r.items = [],
                    t.restPublishers({
                        params: {
                            dataIdPattern: r.dataId,
                            groupIdPattern: r.groupId,
                            ipPattern: r.ip
                        }
                    }).then(function (e) {
                        r.loadingState = !1,
                        e.data.code == "200" && (r.items = e.data.data)
                    }, function (e) {
                        r.loadingState = !1
                    }),
                    r.openDetail = function (t) {
                        f.showDialogByUrl(n.PARTIALS_PATH + "resource/servicePublish.html", function (n) {
                            n.title = "服务提供者详情",
                                n.data = t || {};
                            var r = t.data;
                            t.details = [],
                            e.isArray(r) && r.length > 0 && e.forEach(r, function (n, r) {
                                var i = n.split("?"),
                                    s = i[0],
                                    o = (i[1] || "").split("&"),
                                    u = {},
                                    a = s.split(":");
                                a.length === 2 && (u.port = a[1]),
                                    u.data = n,
                                    e.forEach(o, function (e) {
                                        var t = e.split("=");
                                        t.length === 2 && (u[t[0]] = t[1])
                                    }),
                                    t.details.push(u)
                            })
                        })
                    }
            }],
            c = ["lccResourceRequest", "$scope", "aliyunCommonTopicService", "$timeout", "$stateParams", "$state", "$rootScope", "aliyunDialog", function (e, t, n, r, i, s, o, u) {
                t.loadingState = !0,
                    t.items = [],
                    e.restSubscribers({
                        params: {
                            dataIdPattern: t.dataId,
                            groupIdPattern: t.groupId,
                            ipPattern: t.ip
                        }
                    }).then(function (e) {
                        t.loadingState = !1,
                        e.data.code == "200" && (t.items = e.data.data)
                    }, function (e) {
                        t.loadingState = !1
                    }),
                    t.openDetail = function (e) {
                        u.showMessageDialog({
                            title: "提示",
                            message: "<p>确定要跳转到服务提供者列表查看详情吗？</p>",
                            buttons: [{
                                result: !0,
                                label: "确定",
                                cssClass: "btn-danger"
                            },
                                {
                                    result: !1,
                                    label: "取消",
                                    cssClass: "btn-default"
                                }]
                        }).result.then(function (t) {
                            t && s.go("serviceList.publisher", {
                                dataId: e.dataId,
                                groupId: e.groups[0]
                            })
                        })
                    }
            }];
        t.controller("serviceListController", f),
            t.controller("publisherController", l),
            t.controller("subscriberController", c)
    }),
    define("lcc/controllers/_base", ["./controllers", "./lccCommonController", "./resource/dsConfigController", "./resource/serviceListController"], function () {
        return {}
    }),
    define("lcc/states/states", ["angular"], function (e) {
        return e.module(["lccStates"], [])
    }),
    define("lcc/states/app", ["./states", "../cons/lccCons"], function (e, t) {
        e.config(["$stateProvider", "$urlRouterProvider", function (e, t) {
            t.otherwise("/dsConfig")
        }])
    }),
    define("lcc/states/resources", ["./states", "../cons/lccCons"], function (e, t) {
        e.config(["$stateProvider", "$urlRouterProvider", function (e, n) {
            e.state("dsConfig", {
                url: "/dsConfig",
                controller: "dsConfigController as dsConfig",
                templateUrl: t.VIEW_PATH + "resource/dsConfig.html"
            }).state("serviceList", {
                url: "/serviceList?dataId&groupId&ip",
                controller: "serviceListController as serviceList",
                templateUrl: t.VIEW_PATH + "resource/serviceList.html"
            }).state("serviceList.publisher", {
                url: "/publisher",
                views: {
                    "serviceView@serviceList": {
                        templateUrl: t.VIEW_PATH + "resource/publisher.html",
                        controller: "publisherController"
                    }
                }
            }).state("serviceList.subscriber", {
                url: "/subscriber",
                views: {
                    "serviceView@serviceList": {
                        templateUrl: t.VIEW_PATH + "resource/subscriber.html",
                        controller: "subscriberController"
                    }
                }
            })
        }])
    }),
    define("lcc/states/_base", ["./states", "./app", "./resources"], function () {
    }),
    define("lcc/services/services", ["angular"], function (e) {
        return e.module(["lccServices"], [])
    }),
    define("lcc/services/accountServices", ["./services", "angular", "../cons/lccCons", "common/services/aliyunHttpHandler"], function (e, t, n) {
        e.factory("lccAccountRequest", ["aliyun.console.request", function (e) {
            var t = e.request,
                n = {
                    QueryActionGroupListJson: function (e) {
                        return t("/json/account/queryActionGroupListJson.htm", e)
                    },
                    QueryRoleListJson: function (e) {
                        return t("/json/account/queryRoleListJson.htm", e)
                    },
                    CreateRoleJson: function (e) {
                        return t("/json/account/createRoleJson.htm", e)
                    },
                    DeleteRoleJson: function (e) {
                        return t("/json/account/deleteRoleJson.htm", e)
                    },
                    UpdateRoleJson: function (e) {
                        return t("/json/account/updateRoleJson.htm", e)
                    },
                    QueryAccountListJson: function (e) {
                        return t("/json/account/queryAccountListJson.htm", e)
                    },
                    BindAccountJson: function (e) {
                        return t("/json/account/bindAccountJson.htm", e)
                    },
                    CheckAliyunUserIdJson: function (e) {
                        return t("/json/account/checkAliyunUserIdJson.htm", e)
                    },
                    CheckRoleNameJson: function (e) {
                        return t("/json/account/checkRoleNameJson.htm", e)
                    },
                    UnbindAccountJson: function (e) {
                        return t("/json/account/unbindAccountJson.htm", e)
                    },
                    UpdateAccountJson: function (e) {
                        return t("/json/account/updateAccountJson.htm", e)
                    },
                    AccountInfoJson: function (e) {
                        return t("/json/account/accountInfoJson.htm", e)
                    },
                    EditAccountInfoJson: function (e) {
                        return t("/json/account/editAccountInfoJson.htm", e)
                    },
                    PreLoginJson: function (e) {
                        return t("/json/account/preLoginJson.htm", e)
                    },
                    LoginJson: function (e) {
                        return t("/json/account/loginJson.htm", e)
                    },
                    QueryUserKeyJson: function (e) {
                        return t("/json/account/QueryUserKeyJson.htm", e)
                    },
                    QueryLoginInfoJson: function (e) {
                        return t("/json/account/QueryLoginInfoJson.htm", e)
                    },
                    QueryTotalSubAccountListJson: function (e) {
                        return t("/json/account/QueryTotalSubAccountListJson.htm", e)
                    },
                    CreateSubAccountJson: function (e) {
                        return t("/json/account/CreateSubAccountJson.htm", e)
                    },
                    actionAuthJson: function (e) {
                        return t("/json/account/actionAuthJson.htm", e)
                    },
                    sendVerifyCode: function (e) {
                        return t("/json/audit/sendVerifyCode.htm", e)
                    },
                    validateVerifyCode: function (e) {
                        return t("/json/audit/validateVerifyCode.htm", e)
                    },
                    findRisk: function (e) {
                        return t("/json/audit/findRisk.htm", e)
                    },
                    paidAccountList: function (e) {
                        return t("/json/buy.json?action=PayAccountAction&eventSubmitDoPaidAccountList=1", e)
                    },
                    getEdition: function (e) {
                        return t("/json/buy.json?action=PayAccountAction&eventSubmitDoGetEdition=1", e)
                    },
                    bindAccount: function (e) {
                        return t("/json/buy.json?action=PayAccountAction&eventSubmitDoBindAccount=1", e)
                    },
                    getNoticeContent: function (e) {
                        return t("/json/buy/buy.json?action=PayAccountAction&eventSubmitDoGetNoticeContent=1", e)
                    },
                    acceptOrNot: function (e) {
                        return t("/json/buy/buy.json?action=PayAccountAction&eventSubmitDoAcceptOrNot=1", e)
                    },
                    QueryMenuJson: function (e) {
                        return t("/json/account/QueryMenuJson.htm", e)
                    }
                };
            return n
        }])
    }),
    define("lcc/services/resourceServices", ["./services", "angular", "../cons/lccCons", "common/services/aliyunHttpHandler"], function (e, t, n) {
        e.factory("lccResourceRequest", ["aliyun.console.request", function (e) {
            var t = e.request,
                n = {
                    restDsConfigs: function (e) {
                        return t("/config-center/admin.do", e)
                    },
                    restSubscribers: function (e) {
                        return t("/config-center/registry/subscribers.do", e)
                    },
                    restPublishers: function (e) {
                        return t("/config-center/registry/publishers.do", e)
                    }
                };
            return n
        }])
    }),
    define("lcc/services/_base", ["./services", "./accountServices", "./resourceServices"], function () {
    }),
    define("lcc/directives/directives", ["angular"], function (e) {
        return e.module(["lccDirectives"], [])
    }),
    define("lcc/directives/lccRegionBar", ["./directives", "angular", "../cons/lccCons"], function (e, t, n) {
        e.directive("lccRegionBar", ["$compile", "$injector", "aliyunDialog", "$state", "$rootScope", function (e, t, r, i, s) {
            return {
                restrict: "A",
                templateUrl: n.PARTIALS_PATH + "common/lccRegionBar.html",
                link: function (e, t, n) {
                    var r = n.moduleAction;
                    e.regionBarConfig = {
                        moduleName: n.moduleName,
                        regionListConfig: s.lccConfig.regionList
                    },
                        e.regionChangeHandler = function (e) {
                            s.lccConfig.updateSelectedRegion(e),
                                i.go(r, {
                                    regionNo: e
                                })
                        }
                }
            }
        }])
    }),
    define("lcc/directives/lccActionAuth", ["./directives", "angular", "../cons/lccCons", "common/helper/responsePreHandler"], function (e, t, n, r) {
        e.directive("lccActionAuth", ["$compile", "$injector", "aliyunDialog", "$state", "$rootScope", "lccAccountRequest", function (e, t, n, r, i, s) {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    var r = n.auth || "1:1",
                        i = r.split(":")[0],
                        s = r.split(":")[1]
                }
            }
        }])
    });
    define("TweenMax", function (e) {
        return function () {
            var t, n;
            return t || e.TweenMax
        }
    }(this)),
    define("lcc/directives/lccSliderDiv", ["./directives", "angular", "../cons/lccCons", "TweenMax"], function (e, t, n, r) {
        e.directive("lccSliderDiv", ["$compile", "$injector", "aliyunDialog", "$state", "$rootScope", function (e, t, r, i, s) {
            return {
                restrict: "A",
                scope: {
                    slides: "="
                },
                templateUrl: n.PARTIALS_PATH + "common/lccSliderDiv.html",
                link: function (e, t, n) {
                    e.isFirst = !0,
                        e.durationTime = 0,
                        e.direction = "left",
                        e.currentIndex = 0,
                        e.setCurrentSlideIndex = function (t) {
                            e.direction = t > e.currentIndex ? "left" : "right",
                                e.currentIndex = t
                        },
                        e.isCurrentSlideIndex = function (t) {
                            return e.currentIndex === t
                        },
                        e.prevSlide = function () {
                            e.direction = "left",
                                e.currentIndex = e.currentIndex < e.slides.length - 1 ? ++e.currentIndex : 0
                        },
                        e.nextSlide = function () {
                            e.direction = "right",
                                e.currentIndex = e.currentIndex > 0 ? --e.currentIndex : e.slides.length - 1
                        },
                        setInterval(function () {
                            e.durationTime = .5,
                                e.prevSlide(),
                                e.$apply()
                        }, 8e3)
                }
            }
        }]).animation(".slide-animation", function () {
            return {
                beforeAddClass: function (e, t, n) {
                    var i = e.scope();
                    if (t == "ng-hide") {
                        var s = e.parent().width();
                        i.direction !== "right" && (s = -2 * s),
                            r.to(e, i.durationTime, {
                                left: s,
                                onComplete: n
                            })
                    } else n()
                },
                removeClass: function (e, t, n) {
                    var i = e.scope();
                    if (t == "ng-hide") {
                        e.removeClass("ng-hide");
                        var s = e.parent().width();
                        i.direction === "right" && (s = -s),
                            r.fromTo(e, i.durationTime, {
                                left: s
                            }, {
                                left: 0,
                                onComplete: n
                            })
                    } else n()
                }
            }
        })
    }),
    define("lcc/directives/lccTableSearch", ["app", "angular", "common/helper/i18nHelper"], function (e, t, n) {
        e.directive("lccTableSearch", ["$compile", function (e) {
            function r(e, t) {
                for (var n = e.length - 1; n >= 0; n--) if (e[n].id === t) return e[n];
                return null
            }

            return {
                restrict: "AM",
                scope: {
                    searchParams: "=",
                    selectedItem: "="
                },
                replace: !1,
                template: '<div ng-if="showDropdown" class="dropdown ecs-table-search-wrap"><a href="#" class="dropdown-toggle" data-toggle="dropdown" ng-show="!selectedItem"><span ng-transclude></span><span>({{selectItem.text}})</span><span class="caret"></span></a><span ng-transclude ng-show="selectedItem"></span><ul  class="dropdown-menu" style="min-width:100px;"><li ng-repeat="item in items"><a href="javascript:" ng-click="search(item)" aliyun-console-spm spm-id="{{spmPrefix}}{{$index+1}}"><span>{{item.text}}</span></a></li></ul></div><span ng-if="!showDropdown" ng-transclude>',
                transclude: !0,
                controller: ["$scope", "$state", "$stateParams", function (e, t, n) {
                }],
                link: function (e, i, s) {
                    var o = s.eventId,
                        u = s.columnName,
                        a = s.hideMe,
                        f = [{
                            id: "all",
                            text: n.i18n("lcc.cons.var.all")
                        }];
                    t.forEach(e.searchParams, function (e) {
                        var t = {};
                        t.id = e,
                            t.text = e,
                            f.push(t)
                    });
                    var l = f.length;
                    e.items = f,
                        e.showDropdown = l > 1 && !a ? !0 : !1,
                        e.spmPrefix = s.spmPrefix,
                        e.$watch("searchParams", function (t) {
                            if (t) {
                                var n = t[u];
                                n != undefined ? e.selectItem = r(f, n) : e.selectItem = r(f, "all")
                            }
                        }),
                        e.$watch("selectedItem", function (t) {
                            console.log(t),
                            t && e.search(t)
                        }),
                    e.selectItem || (e.selectItem = r(f, "all")),
                        e.search = function (t) {
                            e.selectItem = t,
                                e.$emit("searchParamsChange", {
                                    eventId: o,
                                    itemId: t.id
                                })
                        }
                }
            }
        }])
    }),
    define("lcc/directives/ecsStatus", ["./directives", "angular", "../cons/lccCons"], function (e, t, n) {
        e.directive("ecsStatus", ["$compile", "$injector", "aliyunDialog", "$state", "$rootScope", "$timeout", function (e, t, r, i, s, o) {
            return {
                scope: {
                    status: "=",
                    toExpire: "="
                },
                restrict: "AM",
                controller: ["$scope", function (e) {
                    e.runStatus = n.SERVER_STATUS_TRANSLATE,
                        e.unstable_status = n.UNSTABLE_SERVER_STATUS
                }],
                link: function (t, n, r) {
                    var i = t.runStatus,
                        s = t.unstable_status;
                    t.$watchCollection("[status, toExpire]", function (r) {
                        if (r) {
                            var u = r[1],
                                a = r[0];
                            a && (n.attr("class", "run-status run-status-" + a.toLowerCase()), s[a] ? (n.html('<span class="run-status-loading" aliyun-loading size="16"></span> ' + i[a]), o(function () {
                                    e(n.contents())(t)
                                })) : n.html("<i></i> " + i[a]))
                        }
                    })
                }
            }
        }])
    }),
    define("lcc/helpers/DataHelper", ["app", "angular", "../cons/lccCons"], function (e, t, n) {
        return {
            dateFormat: function (e, t) {
                var n = {
                    "M+": e.getMonth() + 1,
                    "d+": e.getDate(),
                    "h+": e.getHours(),
                    "m+": e.getMinutes(),
                    "s+": e.getSeconds()
                };
                /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (var r in n)(new RegExp("(" + r + ")")).test(t) && (t = t.replace(RegExp.$1, RegExp.$1.length == 1 ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
                return t
            },
            getDateFromTimeStamp: function (e) {
                var t = parseInt(e);
                return this.dateFormat(new Date(t), "yyyy-MM-dd")
            },
            getDateObjectFromTimeStamp: function (e) {
                var t = parseInt(e);
                return new Date(t)
            },
            getTimeFromTimeStamp: function (e) {
                var e = parseInt(e);
                return (new Date(e)).getTime()
            },
            getNextDay: function () {
                return (new Date).getTime() + 864e5
            },
            getTimeStampFromDate: function (e, t) {
                var n = new Date(t),
                    r = n.getHours(),
                    i = n.getMinutes(),
                    e = new Date(e),
                    s = e.setHours(r);
                return s = e.setMinutes(i),
                    (new Date(s)).getTime()
            },
            getEcsReleaseDate: function (e) {
                return e == 0 ? new Date(this.getNextDay()) : this.getDateObjectFromTimeStamp(e)
            },
            getEcsReleaseTime: function (e) {
                return e == 0 ? this.getNextDay() : this.getTimeFromTimeStamp(e)
            },
            dateOptions: {
                "year-format": "yy",
                "starting-day": 1
            },
            indexOfFunctionForArray: function () {
                Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
                    var t = this.length >>> 0,
                        n = Number(arguments[1]) || 0;
                    n = n < 0 ? Math.ceil(n) : Math.floor(n),
                    n < 0 && (n += t);
                    for (; n < t; n++) if (n in this && this[n] === e) return n;
                    return -1
                })
            },
            findReleaseTimeByInstanceId: function (e, t) {
                var n = 0;
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (i.instanceId === e) {
                        n = i.autoDeleteDate;
                        break
                    }
                }
                return n
            },
            findItemByInstanceId: function (e, t) {
                var n;
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (i.instanceId === e) {
                        n = i;
                        break
                    }
                }
                return n
            },
            isParentChildAccount: function (e) {
                var t = window.aliUid;
                return e != t
            },
            sortBy: function (e, t, n) {
                var r = e.split("."),
                    i = n ?
                        function (t) {
                            var i = r.length;
                            if (i === 1) return n(t[e]);
                            if (i === 2) return n(t[r[0]][r[1]])
                        } : function (t) {
                            var n = r.length;
                            if (n === 1) return t[e];
                            if (n === 2) return t[r[0]][r[1]]
                        };
                return t = t ? -1 : 1,


                    function (e, n) {
                        return e = i(e),
                            n = i(n),
                        t * ((e > n) - (n > e))
                    }
            }
        }
    }),
    define("lcc/helpers/EcsOperationDialogHelper", ["app", "angular", "../utils/lccVariablesService", "../cons/lccCons", "./DataHelper", "common/helper/i18nHelper"], function (e, t, n, r, i, s) {
        function f(e, t, n) {
            return {
                dialogOptions: {
                    title: e.title,
                    message: e.message,
                    callback: function (e) {
                        e.eventHandler = function (r) {
                            r == 0 ? e.close(!1) : l(t, "ecsOperateForm", e, n)
                        }
                    }
                }
            }
        }

        function l(e, t, r, i) {
            var s = n.getFormDefinition(t, e),
                u = e.type;
            i != undefined && i.actionType != undefined && (u = i.actionType);
            if (u != undefined && c(u) === !0) if (u == "RESTART") console.log(lccResourceRequest);
            else {
                var f = i.ecsCommonRequest,
                    l = i.ecsTopicService;
                f.getVerifyAuthStatus().then(function (e) {
                    var t = e.data;
                    if (RESPONSE_CODE.SUCCESS === t.code) {
                        var n = t.data,
                            i = a[u];
                        if (n[i] === !0) r.close(s);
                        else {
                            var f = l.publishShowAuthDialog({
                                actionType: u,
                                result: n
                            }, !0);
                            f.then(function (e) {
                                e == 1 && r.close(s)
                            })
                        }
                    } else setTimeout(function () {
                        l.publish(o.SHOW_RESPONSE_ERROR_MESSAGE, t)
                    }, 0)
                })
            } else r.close(s)
        }

        function c(e) {
            return !1
        }

        function h(e, t, n, r, i, s, o) {
            var u = r.defer();
            return t.result.then(function (t) {
                p(t, e, n, i, u, s, o)
            }),
                u.promise
        }

        function p(e, n, r, i, s, u, a) {
            if (t.isObject(e)) {
                var f = {
                    params: e
                };
                i != undefined && (f.successMessage = i),
                u == 1 && (f.ignoreErrorHandler = u);
                if (e.type == "DELETE") {
                    console.log(n, e),
                        f = {
                            method: "DELETE",
                            successMessage: "删除成功",
                            params: {
                                ecsIds: e.instanceId
                            }
                        };
                    var l = n.restEcss;
                    e.resourceType == "SLB" ? (l = n.restSlbs, f = {
                            method: "DELETE",
                            successMessage: "删除成功",
                            params: {
                                slbIds: e.instanceId
                            }
                        }) : e.resourceType == "VPC" && (l = n.restVpcs, f = {
                            method: "DELETE",
                            successMessage: "删除成功",
                            params: {
                                vpcIds: e.instanceId
                            }
                        }),
                        l(f).then(function (t) {
                            var n = t.data;
                            if (n.code != "200") {
                                var i = ecsConsSimple.errorMessageHelper(n);
                                i != undefined && (n.message = i),
                                u != 1 && setTimeout(function () {
                                    r.publish(o.SHOW_RESPONSE_ERROR_MESSAGE, t)
                                }, 0)
                            } else setTimeout(function () {
                                r.publish(o.ECS_SERVER_OPERATION_READY, {
                                    response: t,
                                    formData: e,
                                    options: a
                                })
                            }, 0);
                            s && setTimeout(function () {
                                s.resolve(t)
                            }, 0)
                        })
                } else n.ecsOperateActions(f).then(function (t) {
                    var n = t.data;
                    if (n.code != RESPONSE_CODE.SUCCESS) {
                        var i = ecsConsSimple.errorMessageHelper(n);
                        i != undefined && (n.message = i),
                        u != 1 && setTimeout(function () {
                            r.publish(o.SHOW_RESPONSE_ERROR_MESSAGE, t)
                        }, 0)
                    } else setTimeout(function () {
                        r.publish(o.ECS_SERVER_OPERATION_READY, {
                            response: t,
                            formData: e,
                            options: a
                        })
                    }, 0);
                    s && setTimeout(function () {
                        s.resolve(t)
                    }, 0)
                }, function (e) {
                    console.log(e),
                    s && setTimeout(function () {
                        s.reject(e)
                    }, 0)
                })
            }
        }

        function d(e, n, r, i, s, o) {
            if (t.isFunction(n)) {
                var u = n(e, s, o);
                return i != undefined ? r.showDialogByUrl(i, u.callback) : r.showMessageDialog(u.dialogOptions)
            }
        }

        function v(e, r) {
            var s = function (r) {
                r.dialogForm = {
                    releaseDate: "",
                    releaseTime: "",
                    releaseDisable: !0,
                    opened: !1,
                    dateErrInfo: !1,
                    showVpcMessage: e.showVpcMessage
                },
                    r.translateData = {
                        instanceId: e.isNextHopInSwitchIds && e.isNextHopInSwitchIds.join(",")
                    },
                    r.result = {
                        errInfo: ""
                    };
                var s = r.dialogForm;
                s.minDate = s.minDate ? null : new Date,
                    r.dateOptions = i.dateOptions,
                    r.open = function (e) {
                        e.preventDefault(),
                            e.stopPropagation(),
                            s.opened = !0
                    };
                var o = e.autoDeleteDate || 0;
                o == 0 || o == undefined ? s.releaseDisable = !1 : s.releaseDisable = !0,
                    s.releaseDate = i.getEcsReleaseDate(o),
                    s.releaseTime = i.getEcsReleaseTime(o),
                    r.onOffHandler = function () {
                        s.releaseDisable = !s.releaseDisable
                    },
                    r.setReleaseHandler = function (o) {
                        var a = u.set_delete_time,
                            f = 0;
                        s.releaseDisable ? f = i.getTimeStampFromDate(s.releaseDate, s.releaseTime) : a = u.del_delete_time;
                        var l = (new Date).getTime();
                        if (f < l && s.releaseDisable) return s.dateErrInfo = !0,
                            !1;
                        var c = t.isArray(e.instanceId),
                            h = {
                                action: "ecs,EcsOperateAction",
                                eventSubmitDoOperate: !0,
                                instanceId: e.instanceId,
                                type: a,
                                endTime: f
                            };
                        if (c) {
                            delete h.eventSubmitDoOperate,
                                h.eventSubmitDoBatchOperate = !0;
                            var p = [];
                            t.forEach(e.instanceId, function (e, t) {
                                p.push(f)
                            }),
                                h.endTime = p
                        }
                        var d = n.getFormDefinition("ecsOperateForm", h);
                        r.close(d)
                    }
            };
            return s
        }

        function m(e, n, r) {
            var i = function (e, t, n, r, i, s) {
                    var o, u, a, f, l, c;
                    return o = s || t <= 0,
                        u = t > 0,
                        a = r == undefined || t <= 0,
                        f = !1,
                        l = r == "later" && n == 1 && !i || r == undefined,
                        c = r == "later" && n == 1 && !i,
                        {
                            btnPreHide: o,
                            btnNextHide: u,
                            btnOperateHide: a,
                            btnPreDisable: f,
                            btnNextDisable: l,
                            btnOperateDisable: c
                        }
                },
                s = function (n) {
                    var s = t.isArray(e.instanceId),
                        o = e.lockedInstanceIds || [],
                        a = o.length > 0,
                        f = e.showVpcMessage,
                        c = s ? e.instanceId : [e.instanceId],
                        h = r.dateFilter;
                    n.dialogForm = {
                        showVpcMessage: f,
                        lockedInstanceIds: o,
                        releaseTimeSettings: {
                            autoDeleteDate: e.autoDeleteDate || 0,
                            actionType: a && "now" || undefined,
                            afterActionTypeChange: function (e) {
                                p.buttonStatus = i(n, n.step, d.releaseDisable, e, d.valid, a)
                            },
                            afterReleaseDisableChange: function (e) {
                                p.buttonStatus = i(n, n.step, e, d.actionType, d.valid, a)
                            }
                        },
                        instanceIds: c
                    },
                        n.translateData = {
                            instanceId: e.isNextHopInSwitchIds,
                            lockedInstanceIds: o.join(",")
                        },
                        n.$watch("dialogForm.releaseTimeSettings.releaseTimeStamp", function (e) {
                            e && (n.translateData.releaseTime = h(e, "yyyy-MM-dd HH:mm:ss"))
                        });
                    var p = n.dialogForm,
                        d = p.releaseTimeSettings;
                    n.step = a ? 1 : 0,
                        n.preStep = function () {
                            n.step ? n.step-- : 0,
                                p.buttonStatus = i(n, n.step, d.releaseDisable, d.actionType, d.valid, a)
                        },
                        n.nextStep = function () {
                            n.step++,
                                p.buttonStatus = i(n, n.step, d.releaseDisable, d.actionType, d.valid, a)
                        },
                        n.$watch("dialogForm.releaseTimeSettings.valid", function (e) {
                            e != undefined && (p.buttonStatus = i(n, n.step, d.releaseDisable, d.actionType, e, a))
                        }),
                        p.buttonStatus = i(n, n.step, d.releaseDisable, d.actionType, d.valid, a),
                        n.setReleaseHandler = function (i) {
                            var o, a = d.actionType == "now" ? !0 : !1,
                                f = d.actionType == "delete" ? !0 : !1;
                            e.actionType = d.actionType;
                            if (a) o = u.release;
                            else {
                                o = u.set_delete_time;
                                var c = 0;
                                f ? o = u.del_delete_time : c = d.releaseTimeStamp
                            }
                            var h = {
                                action: "ecs,EcsOperateAction",
                                eventSubmitDoOperate: !0,
                                instanceId: e.instanceId,
                                type: o
                            };
                            a || (h.endTime = c);
                            if (s) {
                                delete h.eventSubmitDoOperate,
                                    h.eventSubmitDoBatchOperate = !0;
                                var p = [];
                                t.forEach(e.instanceId, function (e, t) {
                                    p.push(c)
                                }),
                                a || (h.endTime = p)
                            }
                            l(h, "ecsOperateForm", n, r)
                        }
                };
            return s
        }

        function g(e, t, n) {
            var r = {
                    restart: "restart",
                    stop: "stop"
                },
                i = function (t) {
                    t.viewModel = e,
                        t.viewModel.isForceStop = !1,
                        t.viewModel.formIsInvalid = !1;
                    var i = r[e.actionTypeName];
                    t.translateData = {
                        actionName: s.i18n("ecs.vm.act.dlg." + i + "_action_name"),
                        actionTypeName: s.i18n("ecs.vm.act.dlg." + i + "_action_type_name"),
                        forceActionTypeName: s.i18n("ecs.vm.act.dlg." + i + "_force_action_type_name"),
                        forceActionMessage: s.i18n("ecs.vm.act.dlg." + i + "_force_action_message"),
                        instanceName: t.viewModel.instanceName,
                        instanceId: t.viewModel.instanceId,
                        dlgTitle: s.i18n("ecs.vm.act.dlg." + i + "_title")
                    },
                        t.onIsForceStopChanged = function () {
                            var e = t.viewModel.isForceStop,
                                n = t.viewModel.confirmForceStop,
                                r = t.viewModel.formIsInvalid;
                            e ? (n = !1, r = !0) : r = !1,
                                t.viewModel.formIsInvalid = r,
                                t.viewModel.confirmForceStop = n
                        },
                        t.onConfirmForceStopChanged = function () {
                            var e = t.viewModel.confirmForceStop;
                            t.viewModel.formIsInvalid = e ? !1 : !0
                        },
                        t.doAction = function (e) {
                            var r = t.viewModel.instanceId,
                                s = {
                                    instanceId: r,
                                    type: i == "restart" ? u.restart : u.stop,
                                    isForceStop: t.viewModel.isForceStop
                                };
                            n && n.batchUpdate ? s.eventSubmitDoBatchOperate = !0 : s.eventSubmitDoOperate = !0,
                                l(s, "ecsOperateForm", t, n)
                        }
                };
            return i
        }

        function y(e, t, n) {
            var r = {
                    "delete": "delete",
                    stop: "stop"
                },
                i = function (t) {
                    t.viewModel = e,
                        t.viewModel.isForceStop = !1,
                        t.viewModel.formIsInvalid = !1;
                    var i = r[e.actionTypeName];
                    t.translateData = {
                        actionName: s.i18n("ecs.vm.act.dlg." + i + "_action_name"),
                        actionTypeName: s.i18n("ecs.vm.act.dlg." + i + "_action_type_name"),
                        forceActionTypeName: s.i18n("ecs.vm.act.dlg." + i + "_force_action_type_name"),
                        forceActionMessage: s.i18n("ecs.vm.act.dlg." + i + "_force_action_message"),
                        instanceName: t.viewModel.instanceName,
                        instanceId: t.viewModel.instanceId,
                        dlgTitle: s.i18n("ecs.vm.act.dlg." + i + "_title")
                    },
                        t.onIsForceStopChanged = function () {
                            var e = t.viewModel.isForceStop,
                                n = t.viewModel.confirmForceStop,
                                r = t.viewModel.formIsInvalid;
                            e ? (n = !1, r = !0) : r = !1,
                                t.viewModel.formIsInvalid = r,
                                t.viewModel.confirmForceStop = n
                        },
                        t.onConfirmForceStopChanged = function () {
                            var e = t.viewModel.confirmForceStop;
                            t.viewModel.formIsInvalid = e ? !1 : !0
                        },
                        t.doAction = function (r) {
                            var s = t.viewModel.instanceId,
                                o = e.resourceType,
                                a = {
                                    instanceId: s,
                                    resourceType: o,
                                    type: i == "delete" ? u.delete : u.stop,
                                    isForceStop: t.viewModel.isForceStop
                                };
                            n && n.batchUpdate ? a.eventSubmitDoBatchOperate = !0 : a.eventSubmitDoOperate = !0,
                                l(a, "ecsOperateForm", t, n)
                        }
                };
            return i
        }

        function b(e, n, r) {
            var i = function (n) {
                var i = e.instanceId;
                n.server = {
                    name: e.hostname || "",
                    description: e.description || ""
                },
                    n.updateButtonDisabled = !1,
                    n.updateServerInfoHandler = function (e) {
                        var s = n.server,
                            o = {
                                action: "ecs,EcsOperateAction",
                                instanceId: i,
                                hostname: s.name,
                                description: s.description,
                                type: u.modify_hostname
                            };
                        if (r.batchUpdate) {
                            var a = [],
                                f = [];
                            t.forEach(i, function (e, t) {
                                a.push(s.name),
                                    f.push(s.description)
                            }),
                                o.hostname = a,
                                o.description = f,
                                o.eventSubmitDoBatchOperate = !0
                        } else o.eventSubmitDoOperate = !0;
                        l(o, "ecsOperateForm", n, r)
                    }
            };
            return i
        }

        function w(e, t, n) {
            var r = function (t) {
                t.viewModel = e,
                    t.translateData = {
                        actionName: s.i18n("ecs.vm.list.bt.start"),
                        itemCount: t.viewModel.instanceId.length,
                        dlgTitle: s.i18n("ecs.vm.act.dlg.start_title")
                    },
                    t.doAction = function (e) {
                        var r = t.viewModel.instanceId,
                            i = t.viewModel.instanceName,
                            s = {
                                instanceId: r,
                                type: u.start
                            };
                        n && n.batchUpdate ? s.eventSubmitDoBatchOperate = !0 : s.eventSubmitDoOperate = !0,
                            l(s, "ecsOperateForm", t, n)
                    }
            };
            return r
        }

        var o = {
                ECS_SERVER_OPERATION_READY: "ecsServerOperationReady",
                SHOW_VALIDATION_AUTH_INFO_DIALOG: "showValidationAuthInfoDialog",
                SHOW_RESPONSE_ERROR_MESSAGE: "showResponseErrorMessage"
            },
            u = {
                start: "START",
                stop: "STOP",
                restart: "RESTART",
                "delete": "DELETE",
                release: "RELEASE",
                reset_passwd: "RESET_PASSWD",
                modify_hostname: "MODIFY_HOSTNAME",
                set_delete_time: "SET_DELETE_TIME",
                del_delete_time: "DEL_DELETE_TIME",
                unlock: "UNLOCK",
                reset: "RESET",
                releasedisk: "RELEASEDISK",
                attach: "ATTACH",
                detach: "DETACH"
            },
            a = {
                RELEASE: "release",
                DEL_DELETE_TIME: "delDeleteTime",
                SET_DELETE_TIME: "setDeleteTime",
                RESET: "reset",
                RESET_PASSWD: "resetPasswd",
                UNLOCK: "unLock",
                RELEASEDISK: "releasedisk"
            };
        return {
            basicEcsServerOperation: f,
            showDialogAction: d,
            dialogFormApplyHandler: l,
            serverOperationHandler: p,
            ecsServerOperationRequestHandler: h,
            restartAndStopServer: g,
            deleteAndStopServer: y,
            updateServerInfo: b,
            startServer: w
        }
    }),
    define("lcc/directives/ecsRestartServer", ["./directives", "angular", "../cons/lccCons", "../helpers/EcsOperationDialogHelper", "common/helper/i18nHelper", "common/services/topicService"], function (e, t, n, r, i) {
        var s = r.ecsServerOperationRequestHandler,
            o = r.showDialogAction,
            u = function (e, t, n) {
                e.actionTypeName = "restart";
                var i = r.restartAndStopServer(e, t, n);
                return {
                    callback: i
                }
            };
        e.directive("ecsRestartServer", ["lccResourceRequest", "aliyunDialog", "$state", "$rootScope", "aliyunCommonTopicService", "$q", function (e, t, r, a, f, l) {
            return {
                restrict: "AC",
                link: function (r, a, c, h) {
                    a.on("click", function (r) {
                        var a = {
                                instanceId: c.instanceId,
                                instanceName: c.instanceName
                            },
                            h = n.VIEW_PATH + "common/restartAndStopServer.html";
                        r.preventDefault();
                        var p = o(a, u, t, h, e),
                            d = i.i18n("ecs.vm.act.rst.restart", a.instanceId);
                        s(e, p, f, l, d)
                    })
                }
            }
        }])
    }),
    define("lcc/directives/ecsChart", ["app"], function (e) {
        e.directive("ecsChart", ["$timeout", function (e) {
            return {
                restrict: "AM",
                scope: {
                    config: "=",
                    chartTitle: "="
                },
                template: '<div class="ecs-chart-wapper"><h5>{{chartTitle}}</h5><table style="width:100%;table-layout:fixed;"><tr><td><div aliyun-console-chart config="chartConfig" chart-created="onChartCreated(chart)"></div></td></tr></table></div>',
                link: function (t, n, r, i) {
                    t.$watch(function () {
                        return t.config
                    }, function (e) {
                        t.chartConfig = e
                    }),
                        t.onChartCreated = function (t) {
                            e(function () {
                                t.reflow()
                            }, 250)
                        }
                }
            }
        }])
    }),
    define("lcc/models/models", ["angular"], function (e) {
        return e.module(["lccModels"], [])
    }),
    define("lcc/models/container/connector/connectorDetailGridModel", ["angular", "../../models", "../../common/commonGridModel"], function (e, t, n) {
        var r = e.copy(n.config),
            i = [{
                name: "来源地址",
                field: "remoteAddr"
            },
                {
                    name: "URL",
                    field: "url"
                },
                {
                    name: "查询参数",
                    field: "queryString"
                },
                {
                    name: "HTTP方法",
                    field: "method"
                },
                {
                    name: "处理时间",
                    field: "processTime"
                },
                {
                    name: "处理线程",
                    field: "threadId"
                },
                {
                    name: "处理阶段",
                    field: "stage"
                }],
            s = {
                columns: i,
                config: r
            };
        return t.provider("connectorDetailGridModel", function () {
            this.gridModel = s,
                this.$get = function () {
                    return this.gridModel
                }
        }),
            s
    }),
    define("lcc/models/container/connector/threadpoolModel", ["angular", "../../common/commonGridModel"], function (e, t) {
        var n = e.copy(t.config),
            r = [{
                name: "连接器",
                field: "name"
            },
                {
                    name: "活跃线程数",
                    fieldDirective: "<span>{{threadCount>0?threadCount:0}}</span>"
                },
                {
                    name: "忙碌线程数",
                    fieldDirective: "<span>{{threadBusy>0?threadBusy:0}}</span>"
                },
                {
                    name: "线程池最小值",
                    field: "minPoolSize"
                },
                {
                    name: "线程池最大值",
                    field: "maxPoolSize"
                }];
        return {
            columns: r,
            config: n
        }
    }),
    define("lcc/directives/gridDialog", ["./directives", "angular", "../helpers/lccTableHelper", "../cons/lccCons", "../models/container/connector/connectorDetailGridModel", "../models/container/connector/threadpoolModel", "common/helper/responsePreHandler", "common/services/topicService"], function (e, t, n, r, i, s, o) {
        function u(e, n, u, a, f) {
            function l(e, a, f) {
                a.on("click", function (a) {
                    function b(e) {
                        function n(e) {
                        }

                        var t = r.VIEW_PATH + "common/gridDialog.html";
                        u.showDialogByUrl(t, n, e)
                    }

                    a.preventDefault();
                    var l = {};
                    l.params = {};
                    var c = f.requestService,
                        h = f.gridModel,
                        p = f.queryFields,
                        d = f.title,
                        v = e.item,
                        m = {};
                    p && (m = p.split(",")),
                        t.forEach(m, function (e, t) {
                            l.params[e] = v[e]
                        });
                    var g = i,
                        y = n.connectorDetail(l);
                    c === "lccContainerRequest.connectorThreadpool" && (g = s, y = n.connectorThreadpool(l)),
                        y.then(function (e) {
                            value = o.responsePreHandler(e, this.injector, !0);
                            if (value && t.isFunction(value.then) == 0) {
                                var n = value.data;
                                n.title = d,
                                    n.itemList = value.data || [],
                                    n.pageInfo = value.pageInfo,
                                    n.columns = g.columns,
                                    n.config = g.config,
                                    b(value.data)
                            }
                        })
                })
            }

            return {
                restrict: "AM",
                link: l
            }
        }

        e.directive("gridDialog", u),
            u.$inject = ["$injector", "lccContainerRequest", "aliyunDialog", "aliyunCommonTopicService", "$stateParams"]
    }),
    define("lcc/directives/checkAliyunAccount", ["app"], function (e) {
        e.directive("checkAliyunAccount", ["lccAccountRequest", function (e) {
            return {
                require: "ngModel",
                link: function (t, n, r, i) {
                    i.$parsers.unshift(function (n) {
                        return e.CheckAliyunUserIdJson({
                            params: {
                                targetUserId: n
                            }
                        }).then(function (e) {
                            e && e.data && e.data.code === "200" ? (i.$setValidity("checkAliyunAccount", !0), t.account.invalid = 1) : (e.data.code === "500" ? t.account.error = "该阿里云账号不存在" : t.account.error = e.data.message, t.account.invalid = -1, i.$setValidity("checkAliyunAccount", !1))
                        }),
                            n
                    }),
                        i.$formatters.unshift(function (t) {
                            var n = -1;
                            return e.CheckAliyunUserIdJson({
                                params: {
                                    targetUserId: t
                                }
                            }).then(function (e) {
                                e && e.data && e.data.code == "200" && (n = 1),
                                    i.$setValidity("checkAliyunAccount", n)
                            }),
                                t
                        })
                }
            }
        }])
    }),
    define("lcc/directives/checkRoleName", ["app"], function (e) {
        e.directive("checkRoleName", ["lccAccountRequest", function (e) {
            return {
                require: "ngModel",
                link: function (t, n, r, i) {
                    i.$parsers.unshift(function (n) {
                        return e.CheckRoleNameJson({
                            params: {
                                roleName: n
                            }
                        }).then(function (e) {
                            e && e.data && e.data.code == "200" ? i.$setValidity("roleName", !0) : (e.data.code === "500" ? t.error = "该角色已存在" : t.error = e.data.message, i.$setValidity("roleName", !1))
                        }),
                            n
                    }),
                        i.$formatters.unshift(function (e) {
                            return e
                        })
                }
            }
        }])
    }),
    define("lcc/directives/checkResgroupName", ["app"], function (e) {
        e.directive("checkResgroupName", ["lccResourceRequest", function (e) {
            return {
                require: "ngModel",
                link: function (t, n, r, i) {
                    i.$parsers.unshift(function (n) {
                        return e.CheckResGroupName({
                            params: {
                                groupName: n
                            }
                        }).then(function (e) {
                            e && e.data && e.data.code == "200" ? i.$setValidity("groupName", !0) : (t.error = {}, e.data.code === "500" ? (t.error.groupName = !0, t.error.message = "该资源组已存在") : t.error.groupName = !1, i.$setValidity("groupName", !1))
                        }),
                            n
                    }),
                        i.$formatters.unshift(function (e) {
                            return e
                        })
                }
            }
        }])
    }),
    define("lcc/directives/lccServerBatchActions", ["app", "../cons/lccCons"], function (e, t) {
        e.directive("lccServerBatchActions", ["$compile", function (e) {
            var t = {
                batchStartServer: {
                    url: "simpleActionMessageDialog.html",
                    operateType: "start"
                },
                batchStopServer: {
                    url: "restartAndStopServer.html",
                    operateType: "stop"
                },
                batchRestartServer: {
                    url: "restartAndStopServer.html",
                    operateType: "restart"
                },
                batchUpdateServerInfo: {
                    url: "updateEcsInfo.html",
                    operateType: "modify_hostname"
                },
                batchChangePassword: {
                    url: "changePassword.html",
                    operateType: "reset_passwd"
                },
                batchChangeVncPassword: {
                    url: "changeVncPassword.html",
                    operateType: "modifyVncPassword"
                },
                batchSetReleaseTime: {
                    url: "ecsReleaseSettings.html",
                    operateType: "set_delete_time"
                },
                batchDeleteServer: {
                    url: "deleteAndStopServer.html",
                    operateType: "delete"
                }
            };
            return {
                restrict: "A",
                scope: {
                    selectedItems: "="
                },
                template: '<div><button ng-class="{\'disabled\': !expiredAll}" ecs-delete-server class="btn btn-default" instance-id="{{instanceId}}" resource-type="{{resourceType}}">删除{{resourceType}}</button></div>',
                link: function (e, t, n) {
                    e.resourceType = n.resourceType.toUpperCase(),
                        e.expiredAll = !1,
                        e.$watch("selectedItems", function (t) {
                            e.expiredAll = !1,
                                e.resourceType == "ECS" ? (e.expiredAll = t && t.length && t.every(function (e) {
                                            return e.status == "Expired"
                                        }) || !1, e.instanceId = t && t.length && t.map(function (e) {
                                            return e.instanceId
                                        }).join(",") || "") : e.resourceType == "SLB" ? (e.expiredAll = t && t.length && t.every(function (e) {
                                                return e.slbStatus == "Expired"
                                            }) || !1, e.instanceId = t && t.length && t.map(function (e) {
                                                return e.slbId
                                            }).join(",") || "") : e.resourceType == "VPC" && (e.expiredAll = t && t.length && t.every(function (e) {
                                                return e.status == "Expired"
                                            }) || !1, e.instanceId = t && t.length && t.map(function (e) {
                                                return e.vpcId
                                            }).join(",") || "");
                            var n = window.LCC_PRIVATE_CLOUD;
                            n && (e.expiredAll = !0)
                        })
                }
            }
        }])
    }),
    define("lcc/directives/ecsDeleteServer", ["./directives", "angular", "../cons/lccCons", "../helpers/EcsOperationDialogHelper", "common/helper/i18nHelper", "common/services/topicService"], function (e, t, n, r, i) {
        var s = r.ecsServerOperationRequestHandler,
            o = r.showDialogAction,
            u = function (e, t, n) {
                e.actionTypeName = "delete";
                var i = r.deleteAndStopServer(e, t, n);
                return {
                    callback: i
                }
            };
        e.directive("ecsDeleteServer", ["lccResourceRequest", "aliyunDialog", "$state", "$rootScope", "aliyunCommonTopicService", "$q", function (e, t, r, a, f, l) {
            return {
                restrict: "AC",
                link: function (r, a, c, h) {
                    a.on("click", function (r) {
                        var a = {
                                instanceId: c.instanceId,
                                instanceName: c.instanceName,
                                resourceType: c.resourceType
                            },
                            h = n.VIEW_PATH + "common/deleteAndStopServer.html";
                        r.preventDefault();
                        var p = o(a, u, t, h, e),
                            d = i.i18n("ecs.vm.act.rst.delete", a.instanceId);
                        s(e, p, f, l, d)
                    })
                }
            }
        }])
    }),
    define("lcc/directives/whenScrollEnds", ["app"], function (e) {
        e.directive("whenScrollEnds", ["$compile", function (e) {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    var r = !1,
                        i = t.height(),
                        s = 1;
                    t.scroll(function () {
                        var r = t.prop("scrollHeight"),
                            s = t.prop("scrollTop"),
                            o = r - i;
                        o - t.scrollTop() <= 0 && e.sync && (e.param = "down", e.$apply(n.whenScrollEnds)),
                        t.scrollTop() <= 0 && e.sync && (e.param = "up", e.$apply(n.whenScrollEnds))
                    })
                }
            }
        }])
    }),
    define("lcc/directives/treeModel", ["app"], function (e) {
        e.directive("treeModel", ["$compile", function (e) {
            return {
                restrict: "A",
                link: function (t, n, r) {
                    var i = r.treeId,
                        s = r.treeModel,
                        o = r.nodeLabel || "label",
                        u = r.nodeChildren || "children",
                        o = '<ul>    <li data-ng-repeat="node in ' + s + '">        <i class="collapsed" data-ng-show="node.' + u + '.length && node.collapsed" data-ng-dblclick="' + i + '.selectNodeHead(node)">        </i>        <i class="collapsed" data-ng-show=" node.roleId == \'parent\' && !node.' + u + '.length" data-ng-dblclick="' + i + '.selectNodeHead(node)">        </i>        <i class="expanded" data-ng-show="node.' + u + '.length && !node.collapsed" data-ng-dblclick="' + i + '.selectNodeHead(node)">        </i>        <i class="normal" data-ng-hide="node.roleId == \'parent\' || node.' + u + '.length"></i>        <span data-ng-class="node.selected" data-ng-dblclick="' + i + '.selectNodeLabel(node)" data-ng-click="' + i + '.selectNodeLabelSingle(node)">{{node.' + o + '}}</span>        <div data-ng-hide="node.collapsed" data-tree-id="' + i + '" data-tree-model="node.' + u + '" data-node-id=' + (r.nodeId || "id") + " data-node-label=" + o + " data-node-children=" + u + ">        </div>    </li></ul>";
                    i && s && (r.angularTreeview && (t[i] = t[i] || {}, t[i].selectNodeHead = t[i].selectNodeHead ||
                        function (e) {
                            e.collapsed = !e.collapsed
                        }, t[i].selectNodeLabel = t[i].selectNodeLabel ||
                        function (e) {
                            e.selectNodeLabelCustom && e.selectNodeLabelCustom(e),
                            t[i].currentNode && t[i].currentNode.selected && (t[i].currentNode.selected = void 0),
                                e.selected = "selected",
                                t[i].currentNode = e
                        }, t[i].selectNodeLabelSingle = t[i].selectNodeLabelSingle ||
                        function (e) {
                            t[i].currentNode && t[i].currentNode.selected && (t[i].currentNode.selected = void 0),
                                e.selected = "selected",
                                t[i].currentNode = e
                        }), n.html("").append(e(o)(t)))
                }
            }
        }])
    }),


    function (e, t) {
        typeof exports == "object" ? module.exports = t() : typeof define == "function" && define.amd ? define("spinjs", t) : e.Spinner = t()
    }(this, function () {
        "use strict";

        function r(e, t) {
            var n = document.createElement(e || "div"),
                r;
            for (r in t) n[r] = t[r];
            return n
        }

        function i(e) {
            for (var t = 1, n = arguments.length; t < n; t++) e.appendChild(arguments[t]);
            return e
        }

        function o(e, r, i, o) {
            var u = ["opacity", r, ~~(e * 100), i, o].join("-"),
                a = .01 + i / o * 100,
                f = Math.max(1 - (1 - e) / r * (100 - a), e),
                l = n.substring(0, n.indexOf("Animation")).toLowerCase(),
                c = l && "-" + l + "-" || "";
            return t[u] || (s.insertRule("@" + c + "keyframes " + u + "{" + "0%{opacity:" + f + "}" + a + "%{opacity:" + e + "}" + (a + .01) + "%{opacity:1}" + (a + r) % 100 + "%{opacity:" + e + "}" + "100%{opacity:" + f + "}" + "}", s.cssRules.length), t[u] = 1),
                u
        }

        function u(t, n) {
            var r = t.style,
                i, s;
            n = n.charAt(0).toUpperCase() + n.slice(1);
            for (s = 0; s < e.length; s++) {
                i = e[s] + n;
                if (r[i] !== undefined) return i
            }
            if (r[n] !== undefined) return n
        }

        function a(e, t) {
            for (var n in t) e.style[u(e, n) || n] = t[n];
            return e
        }

        function f(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) e[r] === undefined && (e[r] = n[r])
            }
            return e
        }

        function l(e) {
            var t = {
                x: e.offsetLeft,
                y: e.offsetTop
            };
            while (e = e.offsetParent) t.x += e.offsetLeft,
                t.y += e.offsetTop;
            return t
        }

        function c(e, t) {
            return typeof e == "string" ? e : e[t % e.length]
        }

        function p(e) {
            if (typeof this == "undefined") return new p(e);
            this.opts = f(e || {}, p.defaults, h)
        }

        function d() {
            function e(e, t) {
                return r("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
            }

            s.addRule(".spin-vml", "behavior:url(#default#VML)"),
                p.prototype.lines = function (t, n) {
                    function o() {
                        return a(e("group", {
                            coordsize: s + " " + s,
                            coordorigin: -r + " " + -r
                        }), {
                            width: s,
                            height: s
                        })
                    }

                    function h(t, s, u) {
                        i(f, i(a(o(), {
                            rotation: 360 / n.lines * t + "deg",
                            left: ~~s
                        }), i(a(e("roundrect", {
                            arcsize: n.corners
                        }), {
                            width: r,
                            height: n.width,
                            left: n.radius,
                            top: -n.width >> 1,
                            filter: u
                        }), e("fill", {
                            color: c(n.color, t),
                            opacity: n.opacity
                        }), e("stroke", {
                            opacity: 0
                        }))))
                    }

                    var r = n.length + n.width,
                        s = 2 * r,
                        u = -(n.width + n.length) * 2 + "px",
                        f = a(o(), {
                            position: "absolute",
                            top: u,
                            left: u
                        }),
                        l;
                    if (n.shadow) for (l = 1; l <= n.lines; l++) h(l, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                    for (l = 1; l <= n.lines; l++) h(l);
                    return i(t, f)
                },
                p.prototype.opacity = function (e, t, n, r) {
                    var i = e.firstChild;
                    r = r.shadow && r.lines || 0,
                    i && t + r < i.childNodes.length && (i = i.childNodes[t + r], i = i && i.firstChild, i = i && i.firstChild, i && (i.opacity = n))
                }
        }

        var e = ["webkit", "Moz", "ms", "O"],
            t = {},
            n, s = function () {
                var e = r("style", {
                    type: "text/css"
                });
                return i(document.getElementsByTagName("head")[0], e),
                e.sheet || e.styleSheet
            }(),
            h = {
                lines: 12,
                length: 7,
                width: 5,
                radius: 10,
                rotate: 0,
                corners: 1,
                color: "#000",
                direction: 1,
                speed: 1,
                trail: 100,
                opacity: .25,
                fps: 20,
                zIndex: 2e9,
                className: "spinner",
                top: "auto",
                left: "auto",
                position: "relative"
            };
        p.defaults = {},
            f(p.prototype, {
                spin: function (e) {
                    this.stop();
                    var t = this,
                        i = t.opts,
                        s = t.el = a(r(0, {
                            className: i.className
                        }), {
                            position: i.position,
                            width: 0,
                            zIndex: i.zIndex
                        }),
                        o = i.radius + i.length + i.width,
                        u, f;
                    e && (e.insertBefore(s, e.firstChild || null), f = l(e), u = l(s), a(s, {
                        left: (i.left == "auto" ? f.x - u.x + (e.offsetWidth >> 1) : parseInt(i.left, 10) + o) + "px",
                        top: (i.top == "auto" ? f.y - u.y + (e.offsetHeight >> 1) : parseInt(i.top, 10) + o) + "px"
                    })),
                        s.setAttribute("role", "progressbar"),
                        t.lines(s, t.opts);
                    if (!n) {
                        var c = 0,
                            h = (i.lines - 1) * (1 - i.direction) / 2,
                            p, d = i.fps,
                            v = d / i.speed,
                            m = (1 - i.opacity) / (v * i.trail / 100),
                            g = v / i.lines;
                        (function y() {
                            c++;
                            for (var e = 0; e < i.lines; e++) p = Math.max(1 - (c + (i.lines - e) * g) % v * m, i.opacity),
                                t.opacity(s, e * i.direction + h, p, i);
                            t.timeout = t.el && setTimeout(y, ~~(1e3 / d))
                        })()
                    }
                    return t
                },
                stop: function () {
                    var e = this.el;
                    return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = undefined),
                        this
                },
                lines: function (e, t) {
                    function l(e, n) {
                        return a(r(), {
                            position: "absolute",
                            width: t.length + t.width + "px",
                            height: t.width + "px",
                            background: e,
                            boxShadow: n,
                            transformOrigin: "left",
                            transform: "rotate(" + ~~(360 / t.lines * s + t.rotate) + "deg) translate(" + t.radius + "px" + ",0)",
                            borderRadius: (t.corners * t.width >> 1) + "px"
                        })
                    }

                    var s = 0,
                        u = (t.lines - 1) * (1 - t.direction) / 2,
                        f;
                    for (; s < t.lines; s++) f = a(r(), {
                        position: "absolute",
                        top: 1 + ~(t.width / 2) + "px",
                        transform: t.hwaccel ? "translate3d(0,0,0)" : "",
                        opacity: t.opacity,
                        animation: n && o(t.opacity, t.trail, u + s * t.direction, t.lines) + " " + 1 / t.speed + "s linear infinite"
                    }),
                    t.shadow && i(f, a(l("#000", "0 0 4px #000"), {
                        top: "2px"
                    })),
                        i(e, i(f, l(c(t.color, s), "0 0 1px rgba(0,0,0,.1)")));
                    return e
                },
                opacity: function (e, t, n) {
                    t < e.childNodes.length && (e.childNodes[t].style.opacity = n)
                }
            });
        var v = a(r("group"), {
            behavior: "url(#default#VML)"
        });
        return !u(v, "transform") && v.adj ? d() : n = u(v, "animation"),
            p
    }),
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
    }),
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
var EndlessScroll;
EndlessScroll = function () {
    function t(t, n) {
        var r = this;
        this.options = $.extend({}, e, n),
            this.pagesStack = [0],
            this.scrollDirection = "next",
            this.firing = !0,
            this.fired = !1,
            this.fireSequence = 0,
            this.pageSequence = 0,
            this.nextSequence = 1,
            this.prevSequence = -1,
            this.lastScrollTop = 0,
            this.insertLocation = this.options.insertAfter,
            this.didScroll = !1,
            this.isScrollable = !0,
            this.target = t,
            this.targetId = "",
            this.content = "",
            this.lastContent = "dummy",
            this.innerWrap = $(".endless_scroll_inner_wrap", this.target),
            this.handleDeprecatedOptions(),
            this.setInsertPositionsWhenNecessary(),
            $(t).scroll(function () {
                return r.detectTarget(t),
                    r.detectScrollDirection()
            })
    }

    var e;
    return t.name = "EndlessScroll",
        e = {
            pagesToKeep: null,
            inflowPixels: 50,
            fireOnce: !0,
            fireDelay: 150,
            loader: "Loading...",
            content: "",
            insertBefore: null,
            insertAfter: null,
            intervalFrequency: 250,
            ceaseFireOnEmpty: !0,
            resetCounter: function () {
                return !1
            },
            callback: function () {
                return !0
            },
            ceaseFire: function () {
                return !1
            }
        },
        t.prototype.run = function () {
            var e = this;
            return setInterval(function () {
                if (!e.shouldTryFiring()) return;
                if (e.ceaseFireWhenNecessary()) return;
                if (!e.shouldBeFiring()) return;
                return e.resetFireSequenceWhenNecessary(),
                    e.acknowledgeFiring(),
                    e.insertLoader(),
                e.hasContent() && (e.showContent(), e.fireCallback(), e.cleanUpPagesWhenNecessary(), e.delayFiringWhenNecessary()),
                    e.removeLoader(),
                    e.lastContent = e.content
            }, this.options.intervalFrequency)
        },
        t.prototype.handleDeprecatedOptions = function () {
            this.options.data && (this.options.content = this.options.data);
            if (this.options.bottomPixels) return this.options.inflowPixels = this.options.bottomPixels
        },
        t.prototype.setInsertPositionsWhenNecessary = function () {
            var t;
            t = "" + this.target.selector + " div.endless_scroll_inner_wrap",
            e.insertBefore === null && (this.options.insertBefore = "" + t + " div:first");
            if (e.insertAfter === null) return this.options.insertAfter = "" + t + " div:last"
        },
        t.prototype.detectTarget = function (e) {
            return this.target = e,
                this.targetId = $(this.target).attr("id")
        },
        t.prototype.detectScrollDirection = function () {
            var e;
            return this.didScroll = !0,
                e = $(this.target).scrollTop(),
                e > this.lastScrollTop ? this.scrollDirection = "next" : this.scrollDirection = "prev",
                this.lastScrollTop = e
        },
        t.prototype.shouldTryFiring = function () {
            var e;
            return e = this.didScroll && this.firing === !0,
            e && (this.didScroll = !1),
                e
        },
        t.prototype.ceaseFireWhenNecessary = function () {
            return this.options.ceaseFireOnEmpty === !0 && this.lastContent === "" || this.options.ceaseFire.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]) ? (this.firing = !1, !0) : !1
        },
        t.prototype.wrapContainer = function (e) {
            if (this.innerWrap.length === 0) return this.innerWrap = $(e).wrapInner('<div class="endless_scroll_content" data-page="0" />').wrapInner('<div class="endless_scroll_inner_wrap" />').find(".endless_scroll_inner_wrap")
        },
        t.prototype.scrollableAreaMargin = function (e, t) {
            var n;
            switch (this.scrollDirection) {
                case "next":
                    n = e.height() - $(t).height() <= $(t).scrollTop() + this.options.inflowPixels,
                        n;
                    break;
                case "prev":
                    n = $(t).scrollTop() <= this.options.inflowPixels,
                        n
            }
            return n
        },
        t.prototype.calculateScrollableCanvas = function () {
            return this.target[0] === document || this.target[0] === window ? (this.wrapContainer("body"), this.isScrollable = this.scrollableAreaMargin($(document), $(window))) : (this.wrapContainer(this.target), this.isScrollable = this.innerWrap.length > 0 && this.scrollableAreaMargin(this.innerWrap, this.target))
        },
        t.prototype.shouldBeFiring = function () {
            return this.calculateScrollableCanvas(),
            this.isScrollable && (this.options.fireOnce === !1 || this.options.fireOnce === !0 && this.fired !== !0)
        },
        t.prototype.resetFireSequenceWhenNecessary = function () {
            if (this.options.resetCounter.apply(this.target) === !0) return this.fireSequence = 0
        },
        t.prototype.acknowledgeFiring = function () {
            this.fired = !0,
                this.fireSequence++;
            switch (this.scrollDirection) {
                case "next":
                    return this.pageSequence = this.nextSequence++;
                case "prev":
                    return this.pageSequence = this.prevSequence--
            }
        },
        t.prototype.insertContent = function (e) {
            switch (this.scrollDirection) {
                case "next":
                    return $(this.options.insertAfter).after(e);
                case "prev":
                    return $(this.options.insertBefore).before(e)
            }
        },
        t.prototype.insertLoader = function () {
            return this.insertContent('<div class="endless_scroll_loader_' + this.targetId + '      endless_scroll_loader">' + this.options.loader + "</div>")
        },
        t.prototype.removeLoader = function () {
            return $(".endless_scroll_loader_" + this.targetId).fadeOut(function () {
                return $(this).remove()
            })
        },
        t.prototype.hasContent = function () {
            return typeof this.options.content == "function" ? this.content = this.options.content.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection]) : this.content = this.options.content,
            this.content !== !1
        },
        t.prototype.showContent = function () {
            return $("#endless_scroll_content_current").removeAttr("id"),
                this.insertContent('<div id="endless_scroll_content_current"      class="endless_scroll_content" data-page="' + this.pageSequence + '">' + this.content + "</div>")
        },
        t.prototype.fireCallback = function () {
            return this.options.callback.apply(this.target, [this.fireSequence, this.pageSequence, this.scrollDirection])
        },
        t.prototype.cleanUpPagesWhenNecessary = function () {
            var e;
            if (this.options.pagesToKeep >= 1) {
                switch (this.scrollDirection) {
                    case "next":
                        this.pagesStack.push(this.pageSequence);
                        break;
                    case "prev":
                        this.pagesStack.unshift(this.pageSequence)
                }
                if (this.pagesStack.length > this.options.pagesToKeep) switch (this.scrollDirection) {
                    case "next":
                        e = this.prevSequence = this.pagesStack.shift();
                        break;
                    case "prev":
                        e = this.nextSequence = this.pagesStack.pop()
                }
                return this.removePage(e),
                    this.calculateScrollableCanvas()
            }
            return
        },
        t.prototype.removePage = function (e) {
            return $(".endless_scroll_content[data-page='" + e + "']", this.target).remove()
        },
        t.prototype.delayFiringWhenNecessary = function () {
            var e = this;
            return this.options.fireDelay > 0 ? ($("body").after('<div id="endless_scroll_marker"></div>'), $("#endless_scroll_marker").fadeTo(this.options.fireDelay, 1, function () {
                    return $("#endless_scroll_marker").remove(),
                        e.fired = !1
                })) : this.fired = !1
        },
        t
}(),


    function (e) {
        return e.fn.endlessScroll = function (e) {
            return (new EndlessScroll(this, e)).run()
        }
    }(jQuery),
    define("EndlessScroll", ["jQuery"], function () {
    }),
    !
        function () {
            "use strict";
            var e = "undefined" != typeof module && module.exports,
                t = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
                n = function () {
                    for (var e, t, n = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], r = 0, i = n.length, s = {}; i > r; r++) if (e = n[r], e && e[1] in document) {
                        for (r = 0, t = e.length; t > r; r++) s[n[0][r]] = e[r];
                        return s
                    }
                    return !1
                }(),
                r = {
                    request: function (e) {
                        var r = n.requestFullscreen;
                        e = e || document.documentElement,
                            /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? e[r]() : e[r](t && Element.ALLOW_KEYBOARD_INPUT)
                    },
                    exit: function () {
                        document[n.exitFullscreen]()
                    },
                    toggle: function (e) {
                        this.isFullscreen ? this.exit() : this.request(e)
                    },
                    raw: n
                };
            return n ? (Object.defineProperties(r, {
                    isFullscreen: {
                        get: function () {
                            return Boolean(document[n.fullscreenElement])
                        }
                    },
                    element: {
                        enumerable: !0,
                        get: function () {
                            return document[n.fullscreenElement]
                        }
                    },
                    enabled: {
                        enumerable: !0,
                        get: function () {
                            return Boolean(document[n.fullscreenEnabled])
                        }
                    }
                }), void(e ? module.exports = r : window.screenfull = r)) : void(e ? module.exports = !1 : window.screenfull = !1)
        }(),
    define("screenfull", function () {
    }),
    !
        function (e) {
            var t = function (t, n) {
                this.element = e(t),
                    this.picker = e('<div class="' + (n.sliderClass ? n.sliderClass : "slider") + '">' + '<div class="' + (n.sliderTrackClass ? n.sliderTrackClass : "slider-track") + '">' + '<div class="' + (n.sliderSelectionClass ? n.sliderSelectionClass : "slider-selection") + '"></div>' + '<div class="slider-handle"></div>' + '<div class="slider-handle"></div>' + "</div>" + '<div class="tooltip ' + n.tooltipPlacement + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' + "</div>").insertBefore(this.element).append(this.element),
                    this.id = this.element.data("slider-id") || n.id,
                this.id && (this.picker[0].id = this.id),
                typeof Modernizr != "undefined" && Modernizr.touch && (this.touchCapable = !0);
                var r = this.element.data("slider-tooltip") || n.tooltip;
                this.tooltip = this.picker.find(".tooltip"),
                    this.tooltipInner = this.tooltip.find("div.tooltip-inner"),
                    this.orientation = this.element.data("slider-orientation") || n.orientation;
                switch (this.orientation) {
                    case "vertical":
                        this.picker.addClass("slider-vertical"),
                            this.stylePos = "top",
                            this.mousePos = "pageY",
                            this.sizePos = "offsetHeight",
                            this.tooltip.addClass("right")[0].style.left = "100%";
                        break;
                    default:
                        this.picker.addClass("slider-horizontal"),
                            this.orientation = "horizontal",
                            this.stylePos = "left",
                            this.mousePos = "pageX",
                            this.sizePos = "offsetWidth",
                            n.tooltipPlacement == "top" ? this.tooltip.addClass("top")[0].style.top = -this.tooltip.outerHeight() - 14 + "px" : this.tooltip.addClass("top")[0].style.top = this.tooltip.outerHeight() - 8 + "px"
                }
                this.min = typeof this.element.data("slider-min") != "undefined" ? this.element.data("slider-min") : n.min,
                    this.max = typeof this.element.data("slider-max") != "undefined" ? this.element.data("slider-max") : n.max,
                    this.step = typeof this.element.data("slider-step") != "undefined" ? this.element.data("slider-step") : n.step,
                    this.value = typeof this.element.data("slider-value") != "undefined" ? this.element.data("slider-value") : n.value,
                this.value[1] && (this.range = !0),
                    this.selection = this.element.data("slider-selection") || n.selection,
                    this.selectionEl = this.picker.find(".slider-selection"),
                this.selection === "none" && this.selectionEl.addClass("hide"),
                    this.selectionElStyle = this.selectionEl[0].style,
                    this.handle1 = this.picker.find(".slider-handle:first"),
                    this.handle1Stype = this.handle1[0].style,
                    this.handle2 = this.picker.find(".slider-handle:last"),
                    this.handle2Stype = this.handle2[0].style;
                var i = this.element.data("slider-handle") || n.handle;
                switch (i) {
                    case "round":
                        this.handle1.addClass("round"),
                            this.handle2.addClass("round");
                        break;
                    case "triangle":
                        this.handle1.addClass("triangle"),
                            this.handle2.addClass("triangle")
                }
                this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.selection == "after" ? this.value[1] = this.max : this.value[1] = this.min),
                    this.diff = this.max - this.min,
                    this.percentage = [(this.value[0] - this.min) * 100 / this.diff, (this.value[1] - this.min) * 100 / this.diff, this.step * 100 / this.diff],
                    this.offset = this.picker.offset(),
                    this.size = this.picker[0][this.sizePos],
                    this.formater = n.formater,
                    this.layout(),
                    this.touchCapable ? this.picker.on({
                            touchstart: e.proxy(this.mousedown, this)
                        }) : this.picker.on({
                            mousedown: e.proxy(this.mousedown, this)
                        }),
                    r === "show" ? this.picker.on({
                            mouseenter: e.proxy(this.showTooltip, this),
                            mouseleave: e.proxy(this.hideTooltip, this)
                        }) : this.tooltip.addClass("hide")
            };
            t.prototype = {
                constructor: t,
                over: !1,
                inDrag: !1,
                showTooltip: function () {
                    this.tooltip.addClass("in"),
                        this.over = !0
                },
                hideTooltip: function () {
                    this.inDrag === !1 && this.tooltip.removeClass("in"),
                        this.over = !1
                },
                layout: function () {
                    this.handle1Stype[this.stylePos] = this.percentage[0] + "%",
                        this.handle2Stype[this.stylePos] = this.percentage[1] + "%",
                        this.orientation == "vertical" ? (this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) + "%", this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) + "%") : (this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) + "%", this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) + "%"),
                        this.range ? (this.tooltipInner.text(this.formater(this.value[0]) + " : " + this.formater(this.value[1])), this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0]) / 2) / 100 - (this.orientation === "vertical" ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px") : (this.tooltipInner.text(this.formater(this.value[0])), this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0] / 100 - (this.orientation === "vertical" ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + "px")
                },
                mousedown: function (t) {
                    this.touchCapable && t.type === "touchstart" && (t = t.originalEvent),
                        this.offset = this.picker.offset(),
                        this.size = this.picker[0][this.sizePos];
                    var n = this.getPercentage(t);
                    if (this.range) {
                        var r = Math.abs(this.percentage[0] - n),
                            i = Math.abs(this.percentage[1] - n);
                        this.dragged = r < i ? 0 : 1
                    } else this.dragged = 0;
                    this.percentage[this.dragged] = n,
                        this.touchCapable ? e(document).on({
                                touchmove: e.proxy(this.mousemove, this),
                                touchend: e.proxy(this.mouseup, this)
                            }) : e(document).on({
                                mousemove: e.proxy(this.mousemove, this),
                                mouseup: e.proxy(this.mouseup, this)
                            }),
                        this.inDrag = !0;
                    var s = this.calculateValue();
                    return this.layout(),
                        this.element.trigger({
                            type: "slideStart",
                            value: s
                        }).trigger({
                            type: "slide",
                            value: s
                        }),
                        !1
                },
                mousemove: function (e) {
                    this.touchCapable && e.type === "touchmove" && (e = e.originalEvent);
                    var t = this.getPercentage(e);
                    this.range && (this.dragged === 0 && this.percentage[1] < t ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : this.dragged === 1 && this.percentage[0] > t && (this.percentage[1] = this.percentage[0], this.dragged = 0)),
                        this.percentage[this.dragged] = t;
                    var n = this.calculateValue();
                    return this.layout(),
                        this.element.trigger({
                            type: "slide",
                            value: n
                        }).data("value", n).prop("value", n),
                        !1
                },
                mouseup: function (t) {
                    this.touchCapable ? e(document).off({
                            touchmove: this.mousemove,
                            touchend: this.mouseup
                        }) : e(document).off({
                            mousemove: this.mousemove,
                            mouseup: this.mouseup
                        }),
                        this.inDrag = !1,
                    this.over == 0 && this.hideTooltip(),
                        this.element;
                    var n = this.calculateValue();
                    return this.element.trigger({
                        type: "slideStop",
                        value: n
                    }).data("value", n).prop("value", n),
                        !1
                },
                calculateValue: function () {
                    var e;
                    return this.range ? (e = [this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, this.min + Math.round(this.diff * this.percentage[1] / 100 / this.step) * this.step], this.value = e) : (e = this.min + Math.round(this.diff * this.percentage[0] / 100 / this.step) * this.step, this.value = [e, this.value[1]]),
                        e
                },
                getPercentage: function (e) {
                    this.touchCapable && (e = e.touches[0]);
                    var t = (e[this.mousePos] - this.offset[this.stylePos]) * 100 / this.size;
                    return t = Math.round(t / this.percentage[2]) * this.percentage[2],
                        Math.max(0, Math.min(100, t))
                },
                getValue: function () {
                    return this.range ? this.value : this.value[0]
                },
                setValue: function (e) {
                    this.value = e,
                        this.range ? (this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0])), this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]))) : (this.value = [Math.max(this.min, Math.min(this.max, this.value))], this.handle2.addClass("hide"), this.selection == "after" ? this.value[1] = this.max : this.value[1] = this.min),
                        this.diff = this.max - this.min,
                        this.percentage = [(this.value[0] - this.min) * 100 / this.diff, (this.value[1] - this.min) * 100 / this.diff, this.step * 100 / this.diff],
                        this.layout()
                }
            },
                e.fn.slider = function (n, r) {
                    return this.each(function () {
                        var i = e(this),
                            s = i.data("slider"),
                            o = typeof n == "object" && n;
                        s || i.data("slider", s = new t(this, e.extend({}, e.fn.slider.defaults, o))),
                        typeof n == "string" && s[n](r)
                    })
                },
                e.fn.slider.defaults = {
                    min: 0,
                    max: 10,
                    step: 1,
                    orientation: "horizontal",
                    value: 5,
                    selection: "before",
                    tooltip: "show",
                    tooltipPlacement: "top",
                    handle: "round",
                    formater: function (e) {
                        return e
                    }
                },
                e.fn.slider.Constructor = t
        }(window.jQuery),
    define("Slider", ["jQuery"], function () {
    }),
    define("lcc/directives/logSniffer", ["./directives", "angular", "../cons/lccCons", "spinjs", "LogSniffer", "LogPosition", "EndlessScroll", "screenfull", "Slider"], function (e, t, n, r, i, s, o, u, a) {
        e.filter("fileName", function () {
            return function (e) {
                return e.replace(/^.*[\\\/]/, "")
            }
        }).directive("lsfLogPosition", ["$timeout", function (e) {
            return {
                restrict: "AE",
                replace: !0,
                transclude: !1,
                scope: {
                    pointer: "=",
                    log: "=",
                    name: "@",
                    disabled: "&",
                    active: "&",
                    pointerTpl: "&"
                },
                controller: ["$scope", function (t) {
                    t.$on("updateCurrentPosition", function (e, n) {
                        t.pointer = n.newPointer,
                            console.log("Updating control position: ", t.pointer),
                        t.initialized && t.logPosition.changePosition(t.pointer)
                    }),
                        t.changedRollingLog = function () {
                            console.log("Changed rolling log"),
                                e(function () {
                                    t.logPosition.updateAfterRollingPartChange()
                                })
                        }
                }],
                link: function (t, n, r) {
                    t.initialized = !1,
                        t.logPosition = new s(t.name, t.disabled(), t.active(), t.log["@type"] == "rolling", t.pointerTpl(), function (e) {
                            console.log("Changing log pos from control for " + t.name + ": ", e),
                                t.$apply(function () {
                                    t.pointer = e,
                                        t.$emit("controlPositionChanged", {
                                            newPointer: e
                                        })
                                })
                        }),
                        e(function () {
                            t.logPosition.init(t.pointer),
                                t.initialized = !0
                        })
                },
                templateUrl: n.PARTIALS_PATH + "logSniffer/logPosition.html"
            }
        }]).directive("lsfLogViewer", ["$timeout", "$location", "$anchorScroll", "$log", "$http", "$modal", "$q", "$stateParams", function (e, s, o, u, a, f, l, c) {
            var h = 3e3,
                p = 1500,
                d = 50,
                v = 250;
            return {
                restrict: "AE",
                replace: !0,
                transclude: !1,
                scope: {
                    source: "=",
                    log: "=",
                    mark: "=pointer",
                    configuredViewerFields: "&",
                    defaultViewerFields: "&",
                    viewerFieldsConfigEnabled: "&",
                    fixTopElementSelector: "@",
                    pointerTpl: "&",
                    initTail: "&",
                    searchWizards: "&",
                    searchScanner: "&",
                    searchFound: "&",
                    followDisabled: "&",
                    searchExpanded: "&",
                    onError: "&",
                    fullHeight: "@",
                    highlightPointer: "&"
                },
                controller: ["$scope", function (e) {
                    e.searchSettings = {
                        dir: 1,
                        expanded: e.searchExpanded() === !0
                    },
                        e.isFollowEnabled = e.followDisabled() === !0 ? !1 : !0,
                        e.wizardScannerEnabled = t.isArray(e.searchWizards()) && e.searchWizards().length > 0,
                        e.wizardScanner = {
                            bean: {}
                        },
                        e.searchStatus = "none",
                        e.searchStatusText = null,
                        e.searchSpeed = 0,
                        e.searchLogPositionerOriginPointer = null,
                        e.searchBindErrors = [],
                        e.searchEnabled = e.wizardScannerEnabled || t.isObject(e.searchScanner()),
                        e.sharedScope = e;
                    var r = null,
                        i;
                    e.cancel = function () {
                        e.searchStatus = "cancelled",
                            console.log("Cancelled search"),
                        i && e.setPointer(i),
                            r(null),
                            e.backdropOverlay.hide()
                    },
                        e.search = function (n) {
                            e.disableTailFollow(),
                                e.backdropOverlay.show(),
                                e.cancelled = !1,
                                e.searchStatus = "searching",
                                e.searchStatusText = null,
                                r = e.getEntriesUpdateCallback();
                            var s = e.wizardScannerEnabled ? e.wizardScanner.bean : e.searchScanner(),
                                o = e.getTopLogPointer(e.searchSettings.dir > 0 ? "end" : "start");
                            i = e.mark;
                            var f = function (n) {
                                u.info("Search for entries from " + JSON.stringify(n) + " using scanner: " + JSON.stringify(s)),
                                    a({
                                        url: e.getLoadLogEntriesUrl(n ? JSON.stringify(n) : "", e.searchSettings.dir * h, "search"),
                                        method: "POST",
                                        data: s
                                    }).success(function (n, s, o, a) {
                                        u.info("Search finished with lastPointer=" + JSON.stringify(n.lastPointer));
                                        if (e.searchStatus == "cancelled") {
                                            u.info("Dismiss serach result due to cancellation");
                                            return
                                        }
                                        n.scannedTime > 0 && (e.searchSpeed = bytesToSize(Math.round(n.scannedSize / n.scannedTime * 1e3), 2)),
                                            e.setPointer(n.lastPointer.json),
                                            n.entries ? (e.backdropOverlay.hide(), e.searchStatus = "hit", $("#search-progress-modal").modal("hide"), r(n.entries.entries), $("#log-entries-frame tbody tr:eq(0)").addClass("selected"), document.location.hash != "search-control" && (document.location.hash = "search-control"), t.isFunction(e.searchFound) && e.searchFound({
                                                    searchResult: n
                                                })) : (r(null), n.lastPointer.sof || n.lastPointer.eof ? (e.backdropOverlay.hide(), e.searchStatus = "miss", u.info("End of log reached without matching"), e.setPointer(i)) : (console.log("Continue search from new pointer: " + JSON.stringify(n.lastPointer)), f(n.lastPointer.json)))
                                    }).error(function (t, n, r, s, o) {
                                        e.backdropOverlay.hide(),
                                            e.searchStatus = "error",
                                            e.searchStatusText = "An error occurred during search: " + n,
                                            u.error("Error occurred during searching", n),
                                            e.setPointer(i),
                                            e.handleHttpError(e.searchStatusText, t, n, r, s, o)
                                    })
                            };
                            f(o)
                        },
                        e.configureFields = function () {
                            f.open({
                                templateUrl: n.PARTIALS_PATH + "logSniffer/viewerFieldsConfig.html",
                                controller: "ViewerFieldsConfigCtrl",
                                size: "lg",
                                scope: e,
                                resolve: {
                                    viewerFields: function () {
                                        return u.info("Inject fields to configure visibility: ", e.viewerFields),
                                            e.viewerFields ? t.copy(e.viewerFields) : null
                                    },
                                    defaultViewerFields: function () {
                                        return e.defaultViewerFields ? t.copy(e.defaultViewerFields()) : null
                                    },
                                    fieldTypes: function () {
                                        return e.source.reader.fieldTypes
                                    }
                                }
                            })
                        },
                        e.$on("viewerFieldsChanged", function (t, n) {
                            u.info("Changed viewer fields, reloading viewer content from current position", n);
                            var r = e.getTopLogPointer();
                            e.viewerFields = n,
                                e.loadRandomAccessEntries(r)
                        })
                }],
                link: function (n, s, o) {
                    function y() {
                        m = {}
                    }

                    function b(e) {
                        n.fieldTypes = e;
                        var t = $.LogSniffer.entriesHead(e, n.viewerFields, function () {
                            return '<th style="width:18px"></th>'
                        });
                        $(s).find(".log-entries thead").html(t)
                    }

                    function w(e) {
                        $(s).find(".log-entries tbody tr:first").attr("sof") == "true" ? $(s).find("a.start").addClass("disabled") : $(s).find("a.start").removeClass("disabled")
                    }

                    function L(e) {
                        return e.replace(C, function (e, t) {
                            return k[e]
                        })
                    }

                    function A(e, t, n) {
                        var r = e.data && e.data.fileBegin || 0,
                            i = e.data && e.data.fileBegin + e.data.fetchSize || 0;
                        E = Math.min(E, r),
                            S = Math.max(S, i),
                            N = e.data.wholeFileSize;
                        var s = e.data && e.data.content || "",
                            o = [];
                        s && (o = s.split("\n"), o = o.map(function (e) {
                            return L(e)
                        }));
                        var u = o[0],
                            a = o[o.length - 1];
                        !s || (t == 0 ? (E = r, S = i, T = a, x = u) : t < 0 ? (o[o.length - 1] = "".concat(o[o.length - 1], x), x = u) : (o[0] = "".concat(T, o[0]), T = a)),
                            console.log("987654321987654321", T),
                        n && t != 0 && s && n.remove();
                        var f = r,
                            l = o.map(function (e, t) {
                                var n = {
                                    "@types": {
                                        lf_timestamp: "DATE",
                                        lf_severity: "SEVERITY",
                                        message: "STRING",
                                        lf_startOffset: "LPOINTER",
                                        lf_raw: "STRING",
                                        lf_endOffset: "LPOINTER"
                                    },
                                    lf_timestamp: 1458632604529,
                                    lf_severity: {
                                        o: 4,
                                        c: 6,
                                        n: "INFO"
                                    },
                                    message: e,
                                    lf_startOffset: {
                                        eof: !1,
                                        sof: !1,
                                        json: {
                                            p: "/Users/Smart/logsniffer/logs/logsniffer.log.2016-03-22",
                                            l: !1,
                                            f: !0,
                                            h: 1550902671,
                                            u: {
                                                o: Math.min(f, N),
                                                s: N
                                            }
                                        }
                                    },
                                    lf_raw: e,
                                    lf_endOffset: {
                                        eof: !1,
                                        sof: !1,
                                        json: {
                                            p: "/Users/Smart/logsniffer/logs/logsniffer.log.2016-03-22",
                                            l: !1,
                                            f: !0,
                                            h: 1550902671,
                                            u: {
                                                o: Math.min(f + e.length, N),
                                                s: N
                                            }
                                        }
                                    }
                                };
                                return f += e.length,
                                    n
                            }),
                            c = {
                                fieldTypes: {
                                    lf_raw: "STRING",
                                    message: "STRING",
                                    lf_timestamp: "DATE",
                                    lf_severity: "SEVERITY"
                                },
                                entries: l,
                                highlightEntry: 0
                            };
                        return c
                    }

                    function O(e) {
                        for (var t in e) return !1;
                        return !0
                    }

                    function M(e, t, n) {
                        var r = {
                            appId: c.appId,
                            ip: c.ip,
                            start: S,
                            end: S + t,
                            path: c.node
                        };
                        if (e && !O(e) && e != "{}") {
                            t < 0 && (r.start = E + t, r.end = E);
                            if (n) {
                                var i = JSON.parse(e);
                                r.start = i.u && i.u.o || 0,
                                    r.end = r.start + t
                            }
                        } else t < 0 ? (r.start = 0, r.end = -t) : (r.start = N - t, r.end = N);
                        r.start = Math.max(r.start, 0),
                            console.log("1234567890123456789", r);
                        var s = "/json/v5/log/GetLogContent.json",
                            o = !0;
                        for (var u in r) o ? (s += "?" + u + "=" + r[u], o = !1) : s += "&" + u + "=" + r[u];
                        return s
                    }

                    function _() {
                        return $(s).find(".log-entries tbody tr:last").attr("eof") == "true"
                    }

                    function D(e, t) {
                        console.log("Setting new pointer position after forwardMove: ", e, n.mark),
                            n.skipPositioning = !0;
                        var r = function () {
                            var e = n.getTopLogPointer();
                            e && n.setPointer(e)
                        };
                        t ? r() : n.$apply(r),
                            n.skipPositioning = !1
                    }

                    function P() {
                        return (new r).spin($(s).find("#log-entries-frame .spinner.bottom")[0])
                    }

                    function H() {
                        return (new r).spin($(s).find("#log-entries-frame .spinner.top")[0])
                    }

                    function B(e, t) {
                        g++;
                        var r = "entry-" + g;
                        m[r] = t;
                        var s = null;
                        return n.source.id && n.log.path && t.lf_startOffset && (s = i.config.contextPath + "/c/sources/" + n.source.id + "/show?log=" + encodeURIComponent(n.log.path) + "#?highlight=true&pointer=" + encodeURIComponent(JSON.stringify(t.lf_startOffset.json))),
                            '<td class="zoom">'
                    }

                    function j(e, t) {
                        var n = $(s).find("#log-entries-frame").scrollTop(),
                            r = $(s).find(".log-entries tbody")[0],
                            i = r.rows.length - v;
                        if (i > 0) {
                            var o = new Date;
                            u.debug("Truncating overflow entries from sliding window", i);
                            var a = $(r).height();
                            for (var f = 0; f < i; f++) {
                                var l = e ? 0 : r.rows.length - 1,
                                    c = $(r.rows[l]),
                                    h = c.find("td.zoom a");
                                if (h.length > 0) {
                                    var p = h.attr("id");
                                    delete m[p]
                                }
                                r.deleteRow(l)
                            }
                            a -= $(r).height();
                            if (t && e && a > 0) {
                                var d = Math.max(10, n - a);
                                u.debug("Scrolling after truncation of sliding window from/to", n, d),
                                    $(s).find("#log-entries-frame").scrollTop(d)
                            }
                            u.debug("Truncated overflow entries from sliding window in ms", i, (new Date).getTime() - o.getTime())
                        }
                    }

                    function F(e, t) {
                        n.disableTailFollow();
                        var r = n.getEntriesUpdateCallback(),
                            i = "";
                        n.setPointer(e),
                        e && (i = JSON.stringify(e)),
                            u.debug("Loading random entries from mark for source: ", i, n.source);
                        var s = null;
                        n.source.id ? s = a({
                                url: M(i, h, !0),
                                method: "GET"
                            }) : s = a({
                                url: M(i, h, !0),
                                method: "POST",
                                data: n.source
                            }),
                            s.success(function (e, n, i, s) {
                                y(),
                                    e = A(e, 0),
                                    b(e.fieldTypes),
                                    r(e.entries, t ? e.highlightEntry : -1)
                            }).error(function (e, t, i, s, o) {
                                r(null),
                                    n.handleHttpError("Failed to load entries", e, t, i, s, o)
                            })
                    }

                    function I(e, t, r) {
                        r || n.disableTailFollow();
                        var i = P(),
                            o = "";
                        !t && e && (o = JSON.stringify(e)),
                            console.log("Loading entries from " + (t ? "tail" : "mark: " + o));
                        var u = null,
                            a = {
                                success: function (e) {
                                    u = e
                                }
                            };
                        return n.getLoadLogEntriesHttpCall(o, (t ? 1 : -1) * h).success(function (e) {
                            y(),
                                e = A(e, 0),
                                b(e.fieldTypes),
                                $(s).find(".log-entries tbody").empty().append($.LogSniffer.entriesRows(e.fieldTypes, n.viewerFields, e.entries, B)),
                                t ? $(s).find("#log-entries-frame").scrollTop($(s).find("#log-entries-frame")[0].scrollHeight) : $(s).find("#log-entries-frame").scrollTop(10),
                                w(),
                                i.stop(),
                                D(!0, !0),
                            u && u()
                        }).error(function (e, t, r, s, o) {
                            i.stop(),
                                n.handleHttpError("Failed to load entries", e, t, r, s, o)
                        }),
                            a
                    }

                    function W(e, t) {
                        if (e && (t || n.tailFollowEnabled)) {
                            z || (z = P());
                            var r = $(s).find(".log-entries tbody tr:last").attr("end");
                            console.log("Following tail from mark: " + r),
                                n.getLoadLogEntriesHttpCall(r, h).success(function (e) {
                                    e = A(e, h, $(s).find(".log-entries tbody tr:last"));
                                    var r = $(s).find("#log-entries-frame"),
                                        i = r.scrollTop(),
                                        o = r[0].scrollHeight,
                                        u = i + r.outerHeight() >= o;
                                    $(s).find(".log-entries tbody").append($.LogSniffer.entriesRows(n.fieldTypes, n.viewerFields, e.entries, B)),
                                        console.log("Jump to log tail: " + u);
                                    if (u || t || n.forceScrollToBottom) n.forceScrollToBottom = !1,
                                        j(!0, !1),
                                        r.scrollTop(r[0].scrollHeight),
                                        D(!0, !0);
                                    w(!0);
                                    var a;
                                    $(s).find(".log-entries tbody tr:last").attr("eof") != "true" ? ($(s).find("#slow-following-popup").next("div.popover:visible").length == 0, a = d) : e.length > 0 ? a = Math.max(d, Math.min(p, p / (e.length / h))) : a = p,
                                        console.log("Going to follow tail the next time in [ms]: " + a),
                                        U = setTimeout(function () {
                                            W(!0)
                                        }, a)
                                }).error(function (e, t, r, i, s) {
                                    n.handleHttpError("Failed to load entries", e, t, r, i, s),
                                        n.disableTailFollow()
                                })
                        } else U && (z && (z.stop(), z = null), clearTimeout(U), console.log("Disable following tail"), U = null)
                    }

                    var f = !1,
                        m = {},
                        g = 0;
                    n.backdropOverlay = $(s).find(".backdrop-overlay"),
                        n.fieldTypes = {},
                        n.fullscreen = !1,
                        n.frameHeightBeforeFullscreen = null,
                        n.viewerFields = n.configuredViewerFields(),
                        n.resizeViewerToFullHeight = function (t, r) {
                            e(function () {
                                var e = $(s).find(".viewer-search .panel-body:visible").outerHeight(!0);
                                e == null && (e = 0);
                                var i = $(s).find(".lsf-viewer").height(),
                                    o = $(t).height();
                                if (o == null) {
                                    if (r > 3) {
                                        u.error("Failed to resize viewer, because window reference not found");
                                        return
                                    }
                                    n.resizeViewerToFullHeight(t, r + 1);
                                    return
                                }
                                !n.fullscreen && n.fixTopElementSelector && (o -= $(n.fixTopElementSelector).height() + 1);
                                var a = $(s).find(".lsf-viewer").offset();
                                o -= a.top;
                                var f = $(s).find("#log-entries-frame").height();
                                u.debug("Fullscreen metrics: window, viewer, searchPanel, entriesFrameHeight height: ", o, i, e, f);
                                if (o < i - e) {
                                    var l = Math.max(450, f - (i - e - o)) + (n.fullscreen ? 20 : 0);
                                    u.debug("Reduce entries frame after resizing to:", l),
                                        $(s).find("#log-entries-frame").height(l)
                                } else {
                                    var c = Math.max(450, f + (o - i + e)) - (n.fullscreen ? 20 : 0);
                                    u.debug("Increase entries frame after resizing to:", c),
                                        $(s).find("#log-entries-frame").height(c)
                                }
                            }, 100)
                        },
                        n.$on("fullscreenEnabled", function () {
                            n.forceScrollToBottom = n.isTailFollowOnHead(),
                                n.fullscreen = !0,
                                u.debug("Viewer switched to fullscreen"),
                                n.frameHeightBeforeFullscreen = $(s).find("#log-entries-frame").height(),
                                n.resizeViewerToFullHeight(".viewer-fullscreen.fullscreen", 1)
                        }),
                        n.$on("fullscreenDisabled", function () {
                            n.fullscreen = !1,
                                n.forceScrollToBottom = n.isTailFollowOnHead(),
                                u.debug("Viewer switched to normal screen"),
                            n.frameHeightBeforeFullscreen && (u.debug("Set entries frame height back to:", n.frameHeightBeforeFullscreen), $(s).find("#log-entries-frame").height(n.frameHeightBeforeFullscreen), n.frameHeightBeforeFullscreen = null)
                        }),
                        n.getLoadLogEntriesUrl = function (e, t, n) {
                            return M(e, t)
                        },
                        n.handleHttpError = function (e, r, i, s, o, u) {
                            t.isFunction(n.onError()) && n.onError()(e)
                        },
                        n.getLoadLogEntriesHttpCall = function (e, t) {
                            return u.debug("Loading entries for mark/count/source: ", e, t, n.source),
                                n.source.id ? a({
                                        url: n.getLoadLogEntriesUrl(e, t),
                                        method: "GET"
                                    }) : a({
                                        url: M(pStr, h),
                                        method: "POST",
                                        data: n.source
                                    })
                        };
                    var E = 0,
                        S = 0,
                        x = "",
                        T = "",
                        N = 0,
                        C = /&|\\|<|>/g,
                        k = {
                            "&": "&amp",
                            '"': "&quot",
                            "<": "&lt",
                            ">": "&gt"
                        };
                    n.getTopLogPointer = function (e) {
                        var t = $(s).find("#log-entries-frame").outerHeight(!0) - $(s).find("#log-entries-frame").innerHeight(),
                            r = $(s).find("#log-entries-frame").offset(),
                            i = r.left + 50,
                            o = 3 + Math.max(!n.fullscreen && n.fixTopElementSelector ? $(n.fixTopElementSelector).height() + 1 : 0, r.top + t / 2 - (n.fullscreen ? 0 : $(window).scrollTop())),
                            u = document.elementFromPoint(i, o);
                        !u || $(u).parents("table").length == 0 ? u = $(s).find("#log-entries-frame tbody td:eq(0)") : $(u).parents("thead").length > 0 && (u = $($(u).parent().parent().parent("table")[0]).find("tbody td:eq(0)"));
                        if (u && $(u).parents("tr").length > 0) {
                            var a = $(u).parents("tr").attr(e ? e : "start");
                            console.log("Top entry pointer: " + a);
                            if (a) return $.parseJSON(a)
                        }
                        return null
                    },
                        n.setPointer = function (e) {
                            n.mark = e,
                                n.$broadcast("updateCurrentPosition", {
                                    newPointer: n.mark
                                })
                        },
                        n.zoomViewerEntry = function (e) {
                            var t = function (n, r, i) {
                                var o = l.defer();
                                r.id || (r.id = e);
                                var a = $(s).find("#log-entries-frame tr td.zoom a#" + r.id).parent().parent("tr"),
                                    f = null,
                                    c = null;
                                n > 0 ? c = $(a).next() : c = $(a).prev();
                                if (c.length > 0) f = c.find("td a.zoom").attr("id");
                                else if (n < 0 && !i) return q(0, 0, "prev", function () {
                                    t(n, r, !0).then(function (e) {
                                        o.resolve(e)
                                    }, function (e) {
                                        o.reject()
                                    })
                                }, function () {
                                    o.reject()
                                }),
                                    o.promise;
                                return a.hasClass("fromzoom") && a.hasClass("selected") && a.removeClass("selected").removeClass("fromzoom"),
                                    u.debug("Next id to switch to", f),
                                    f && m[f] ? (c.hasClass("selected") || c.addClass("selected").addClass("fromzoom"), $(c).scrollintoview(), r.id = f, o.resolve(m[f])) : o.reject(),
                                    o.promise
                            };
                            $.LogSniffer.zoomLogEntry({
                                entry: m[e],
                                sourceId: n.source.id,
                                logPath: n.log.path,
                                entryLoader: t
                            })
                        },
                        n.loadRandomAccessEntries = F,
                        n.getEntriesUpdateCallback = function () {
                            f = !0;
                            var e = (new r).spin($(s).find("#log-entries-frame")[0]);
                            return function (t, r) {
                                t != null && (y(), $(s).find(".log-entries tbody").empty(), $(s).find(".log-entries tbody").append($.LogSniffer.entriesRows(n.fieldTypes, n.viewerFields, t, B)), r >= 0 && $(s).find(".log-entries tbody tr:eq(" + r + ")").addClass("selected"), $(s).find("#log-entries-frame").scrollTop(10), t.length > 0 && n.setPointer(t[0].lf_startOffset.json)),
                                    w(!0),
                                    e.stop();
                                var i = $(s).find("#log-entries-frame"),
                                    o = i.find("table");
                                console.log("Table height " + o.height() + " vs. scroll area height " + i.innerHeight()),
                                    t != null && o.height() < i.innerHeight() ? (f = !1, $(s).find("#log-entries-frame").scrollTop(0)) : setTimeout(function () {
                                            f = !1
                                        }, 500)
                            }
                        },
                        n.disableTailFollow = function () {
                            n.tailFollowEnabled = !1,
                                W(!1, !0)
                        },
                        n.reset = function (e) {
                            t.isObject(n.mark) && i.objSize(n.mark) > 0 ? F(n.mark, e && n.highlightPointer() === !0) : I(n.mark, n.initTail())
                        },
                        n.$on("resetLogViewer", function (e, t) {
                            u.info("Reseting viewer"),
                                n.reset()
                        }),
                        n.reset(!0);
                    var q = function (e, r, i, o, u) {
                            if (f) return !0;
                            if (i == "next" && $(s).find(".log-entries tbody tr:last").attr("eof") != "true" && !n.tailFollowEnabled) {
                                f = !0;
                                var a = P(),
                                    l = $(s).find(".log-entries tbody tr:last").attr("end");
                                console.log("Tailing forward " + h + " entries from mark: " + l);
                                var c = function () {
                                    w(!0),
                                        a.stop(),
                                        f = !1,
                                    n.tailFollowEnabled || j(!0, !0)
                                };
                                return n.getLoadLogEntriesHttpCall(l, h).success(function (e) {
                                    e = A(e, h, $(s).find(".log-entries tbody tr:last")),
                                        $(s).find(".log-entries tbody").append($.LogSniffer.entriesRows(n.fieldTypes, n.viewerFields, e.entries, B)),
                                        c(),
                                    t.isFunction(o) && o()
                                }).error(function (e, r, i, s, o) {
                                    c(),
                                        n.handleHttpError("Failed to load entries", e, r, i, s, o),
                                    t.isFunction(u) && u()
                                }),
                                    !0
                            }
                            if (i != "next" && $(s).find(".log-entries tbody tr:first").attr("sof") != "true") {
                                f = !0;
                                var a = H(),
                                    p = $(s).find("#log-entries-frame"),
                                    l = $(s).find(".log-entries tbody tr:first").attr("start");
                                console.log("Loading backward " + h + " entries from mark: " + l);
                                var d = $(p).scrollTop(),
                                    v = $(p)[0].scrollHeight,
                                    c = function () {
                                        w(!0),
                                            a.stop(),
                                            f = !1,
                                        n.tailFollowEnabled || j(!1, !0)
                                    };
                                n.getLoadLogEntriesHttpCall(l, -h).success(function (e) {
                                    e = A(e, -h, $(s).find(".log-entries tbody tr:first")),
                                        $(s).find(".log-entries tbody").prepend($.LogSniffer.entriesRows(n.fieldTypes, n.viewerFields, e.entries, B));
                                    var r = $(p)[0].scrollHeight - v;
                                    $(p).scrollTop(d + r),
                                        c(),
                                    t.isFunction(o) && o()
                                }).error(function (e, r, i, s, o) {
                                    c(),
                                        n.handleHttpError("Failed to load entries", e, r, i, s, o),
                                    t.isFunction(u) && u()
                                })
                            }
                            return !0
                        },
                        R = -1;
                    $(s).find("#log-entries-frame").scroll(function () {
                        var e = $(this).scrollTop();
                        D(e >= R),
                            R = e
                    }),
                        $(s).find("#log-entries-frame").endlessScroll({
                            fireOnce: !1,
                            fireDelay: !1,
                            loader: "",
                            ceaseFireOnEmpty: !1,
                            inflowPixels: 300,
                            callback: q,
                            ceaseFire: function (e, t, n) {
                                return !1
                            }
                        });
                    var U, z;
                    n.forceScrollToBottom = !1,
                        n.isTailFollowOnHead = function () {
                            if (n.tailFollowEnabled) {
                                var e = $(s).find("#log-entries-frame"),
                                    t = e.scrollTop(),
                                    r = e[0].scrollHeight,
                                    i = t + e.outerHeight() >= r;
                                return i
                            }
                            return !1
                        },
                        n.$on("controlPositionChanged", function (e, t) {
                            n.mark = t.newPointer,
                                console.log("Changed log pointer, has to load entries from: ", n.mark),
                                F(n.mark)
                        }),
                        n.fromStart = function () {
                            I(null, !1)
                        },
                        n.fromTail = function () {
                            I(null, !0)
                        },
                        n.tailFollowEnabled = !1,
                        n.toggleTailFollow = function () {
                            n.tailFollowEnabled = !n.tailFollowEnabled,
                                u.info("Follow tail ", n.tailFollowEnabled ? "enabled" : "disabled"),
                                n.tailFollowEnabled && !_() ? (u.info("Jump first to tail before following"), I(null, !0, !0).success(function () {
                                        W(!0, !0)
                                    })) : W(n.tailFollowEnabled, !0)
                        },
                    n.fullHeight == "true" && n.resizeViewerToFullHeight(window, 1)
                },
                templateUrl: n.PARTIALS_PATH + "logSniffer/logViewer.html"
            }
        }])
    }),
    define("lcc/directives/_base", ["./directives", "./lccRegionBar", "./lccActionAuth", "./lccSliderDiv", "./lccTableSearch", "./ecsStatus", "./ecsRestartServer", "./ecsChart", "./gridDialog", "./checkAliyunAccount", "./checkRoleName", "./checkResgroupName", "./lccServerBatchActions", "./ecsDeleteServer", "./whenScrollEnds", "./treeModel", "./logSniffer"], function () {
    }),
    define("lcc/filters/filters", ["angular"], function (e) {
        return e.module(["lccFilters"], [])
    }),
    define("lcc/filters/lccFilters", ["./filters", "../cons/lccCons"], function (e, t) {
        e.filter("lccAppStateFilter", ["$sce", function (e) {
            var n = t.APP_STATES_WITH_STYLE;
            return function (t) {
                return e.trustAsHtml(n[t] || n.UNKNOW)
            }
        }]).filter("lccAppStateFilterTips", ["$sce", function (e) {
            var n = t.APP_STATES_TIPS;
            return function (t) {
                return e.trustAsHtml(n[t] || "请配置应用健康检查URL，以便更精准的反映应用运行状态。")
            }
        }]).filter("lccDeployRegionFilter", function () {
            var e = t.DEPLOY_REGIONS;
            return function (t) {
                return e[t] || t
            }
        }).filter("lccServiceNameFilter", function () {
            return function (e, t) {
                var n = e.split(":")[0];
                return !t && n.length > 50 && (n = n.substring(0, 50) + "..."),
                    n
            }
        }).filter("lccServiceVersionFilter", function () {
            return function (e) {
                return e.split(":")[1]
            }
        }).filter("lccRpcTypeFilter", function () {
            return function (e) {
                return e == "0" ? "HTTP" : e == "1" ? "HSF" : e == "13" ? "MQ" : e == "4" ? "DB" : "UNKNOW"
            }
        }).filter("lccAuditActionTypeFilter", function () {
            return function (e) {
                return e == "START" ? "启动应用" : e == "DEPLOY" ? "部署应用" : e == "PROVISION" ? "创建应用并且初始化" : e == "STOP" ? "停止应用" : e == "CONFIG" ? "配置应用" : e == "SCALE_IN" ? "缩容" : e == "SCALE_OUT" ? "扩容" : e == "DELETE" ? "删除应用" : e == "RELEASE_TOKEN" ? "更新安全令牌" : e == "UPDATE_CONTAINER" ? "更新容器" : e
            }
        }).filter("lccDefaultFilter", function () {
            return function (e, t) {
                return e || t
            }
        })
    }),
    define("lcc/filters/_base", ["./filters", "./lccFilters"], function () {
    }),
    define("common/services/bootstrap", ["app", "angular", "ui.router", "ui.bootstrap"], function (e, t) {
        "use strict";

        function r() {
            Array.prototype.indexOf || (Array.prototype.indexOf = function (e) {
                var t = this.length >>> 0,
                    n = Number(arguments[1]) || 0;
                n = n < 0 ? Math.ceil(n) : Math.floor(n),
                n < 0 && (n += t);
                for (; n < t; n++) if (n in this && this[n] === e) return n;
                return -1
            })
        }

        var n = function (e) {
            var t = "",
                r, i, s, o, u, a, f;
            for (r in e) {
                i = e[r];
                if (i instanceof Array) for (f = 0; f < i.length; ++f) u = i[f],
                    a = {},
                    a[r] = u,
                    t += n(a) + "&";
                else if (i instanceof Object) for (o in i) u = i[o],
                    s = r + "[" + o + "]",
                    a = {},
                    a[s] = u,
                    t += n(a) + "&";
                else i !== undefined && i !== null && (t += encodeURIComponent(r) + "=" + encodeURIComponent(i) + "&")
            }
            return t.length ? t.substr(0, t.length - 1) : t
        };
        r(),
            e.run(["$rootScope", "$state", "$stateParams", function (e, t, n) {
                e.$state = t,
                    e.$stateParams = n,
                    e.$on("$stateChangeSuccess", function (e, t, n, r, i) {
                    }),
                    e.$on("$stateChangeError", function (e, t, n, r, i, s) {
                        console.log("ERROR " + s + " . From state: " + r.name + " to state: " + t.name)
                    })
            }]).factory("aliyunHttpInterceptor", ["$q", function (e) {
                return {
                    requestError: function (t) {
                        return console.log("request error: " + t),
                            e.reject(t)
                    },
                    request: function (t) {
                        return t || e.when(t)
                    },
                    response: function (t) {
                        return t || e.when(t)
                    },
                    responseError: function (t) {
                        return console.log("response error: ", t),
                            e.reject(t)
                    }
                }
            }]).config(["$httpProvider", function (e) {
                e.interceptors.push("aliyunHttpInterceptor")
            }]).config(["$provide", function (e) {
                e.decorator("$exceptionHandler", ["$delegate", function (e) {
                    return function (t, n) {
                        e(t, n),
                            console.log(t.message || t)
                    }
                }])
            }]).factory("aliyun.console.requestWrapper", ["$http", function (e) {
                var r = function (r) {
                        var i = {
                                method: "GET"
                            },
                            s = t.extend({}, i, r),
                            o = s.method.toUpperCase();
                        o == "POST" ? (s.headers = s.headers || {}, s.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8", s.data == undefined && s.params ? (s.data = n(s.params), delete s.params) : s.data = n(s.data)) : o == "GET" && (s.params = s.params || {}, s.params.__preventCache = (new Date).getTime());
                        var u = e(s).success(function (e, t, n, r) {
                        }).error(function (e, t, n, r) {
                        });
                        return t.isFunction(s.dataFormatter) && u.then(function (e) {
                            return s.dataFormatter.apply(null, [e])
                        }),
                            u
                    },
                    i = function (e, t) {
                        return t = t || {},
                            t.url = e,
                            r(t)
                    };
                return {
                    sendRequest: r,
                    sendRequestWithUrl: i
                }
            }])
    }),
    define("common/services/_base", ["app", "./bootstrap", "./Dialog", "./i18nService"], function (e, t, n) {
    }),
    define("common/directives/base", ["app", "../services/i18nService"], function (ng, i18nService) {
        var i18nInstance = i18nService.getI18n("directives.base"),
            okText = i18nInstance.i18n(!0, "common.lb.confirm"),
            cancelText = i18nInstance.i18n(!0, "common.lb.cancel");
        ng.directive("textTrimmer", ["$compile", "$timeout", function ($compile, $timeout) {
            var manager = [];
            return angular.element(document).on("click", function () {
                $timeout(function () {
                    if (manager.length > 0) {
                        var e = manager.splice(0, 1)[0];
                        e.showPanel = !1
                    }
                })
            }),
                {
                    scope: !0,
                    restrict: "AC",
                    controller: ["$rootScope", "$modal", "$animate", "$timeout", "aliyun.console.requestWrapper", function (e, t, n, r, i) {
                        return {
                            $rootScope: e,
                            $modal: t,
                            $animate: n,
                            $timeout: r,
                            requestWrapper: i
                        }
                    }],
                    link: function (scope, el, attrs, svcs) {
                        attrs.$observe("text", function (e) {
                            scope._oldText = scope.text = e
                        }),
                            scope.title = attrs.title,
                            scope.cAlwaysShow = attrs.cAlwaysShow === "true",
                            angular.forEach(["cFrom", "cDirectives"], function (e) {
                                scope[e] = attrs[e]
                            });
                        var pen = angular.element(scope.cFrom ? scope.cFrom : '<a class="ecs-texttrimmer-pen btn btn-default btn-xs c-texttrimmer-pen" href="#"><span class="icon-pen"></span></a>').attr({
                            "ng-show": "showPen"
                        });
                        if (!scope.cAlwaysShow) {
                            scope.showPen = !1;
                            var hoverHandler = function hover(e) {
                                    scope.showPen = e.type === "mouseover";
                                    try {
                                        hover._thandler.cancel()
                                    } catch (e) {
                                    }
                                    scope.showPen ? scope.$apply() : hover._thandler = svcs.$timeout(function () {
                                            scope.$apply()
                                        }, 200)
                                },
                                trigger = el;
                            attrs.cTriggerSource && (trigger = eval("el." + attrs.cTriggerSource)),
                                trigger.on("mouseover mouseout", function hover(e) {
                                    hover._inited || (hover._inited = !0, el.after(pen), scope.showPen = !0, pen.on("mouseover mouseout", function (e) {
                                        hoverHandler(e)
                                    })),
                                        hoverHandler(e)
                                })
                        } else scope.showPen = !0,
                        !scope.cFrom && el.after(pen);
                        $compile(pen)(scope);
                        var show = function (e) {
                            if (e === undefined) return scope.showPanel === undefined ? !1 : scope.showPanel;
                            svcs.$timeout(function () {
                                scope.disabled = !1,
                                    scope.showPanel = e
                            })
                        };
                        pen.on("click", function (t) {
                            t.preventDefault();
                            if (!show()) {
                                if (!manager.length || !manager[0].showPanel) t.stopPropagation(),
                                    manager.splice(0, 1);
                                manager.push(scope);
                                var n = ['<div ng-show="showPanel" class="c-texttrimmer-box"><p>{{title}}：</p><form name="textTrimmer">', '   <p><input name="editor" size="32" class="form-control" ng-model="text" type="text" ng-disabled="disabled"' + scope.cDirectives + "/></p>", '   <p class="c-texttrimmer-tip" ng-show="textTrimmer.$invalid || error" ng-bind="msg"></p>', '   <div class="c-texttrimmer-btnbox">', '     <a class="btn btn-primary" href="#" ng-disabled="textTrimmer.$invalid || disabled" ng-click="handler($event, true);">' + okText + "</a>", '     <a class="btn btn-default" href="#" ng-disabled="disabled" ng-click="handler($event, false);">' + cancelText + "</a>", "   </div>", "</form></div>"],
                                    r = function (e, t) {
                                        var n = angular.element(window),
                                            r = e.offset(),
                                            i = n.scrollLeft() + n.width(),
                                            s = n.scrollTop() + n.height(),
                                            o = r.left + t[0].offsetWidth,
                                            u = t[0].offsetHeight,
                                            a = e[0].offsetHeight,
                                            f = r.top + a,
                                            l = f + u,
                                            f = s >= l ? f + 5 : r.top - a - u,
                                            c = i >= o ? r.left : r.left + i - o;
                                        return t.css({
                                            top: f,
                                            left: c
                                        })
                                    },
                                    i = angular.element(n.join("")).on("click", function (e) {
                                        e.stopPropagation()
                                    });
                                i.appendTo(document.body),
                                    r(el, i),
                                    scope.handler = function (e, t) {
                                        e.preventDefault();
                                        if (t) {
                                            scope.error = !1,
                                                scope.disabled = !0,
                                                scope._oldText = scope.text;
                                            if (scope.btnHandler) {
                                                var n = scope.btnHandler(t);
                                                svcs.requestWrapper.sendRequestWithUrl(n.url, {
                                                    method: n.type,
                                                    data: angular.extend({}, n.data)
                                                }).then(function (e) {
                                                    var t = e.data;
                                                    t.code >= 200 ? (show(!1), angular.isFunction(scope.updateItemNameCallback) && scope.updateItemNameCallback(scope.item, scope.text), el.text(scope.text)) : (show(!0), scope.error = !0, scope.msg = t.message || i18nInstance.i18n("msg.save.fail"))
                                                }, function (e) {
                                                    show(!0),
                                                        scope.error = !0,
                                                        scope.msg = i18nInstance.i18n("msg.request.exception")
                                                })
                                            } else el.text(scope.text),
                                                show(!1)
                                        } else scope.text = scope._oldText,
                                            show(!1)
                                    },
                                    $compile(i)(scope),
                                    scope.$watch("showPanel", function (e) {
                                        !e && i.remove()
                                    }),
                                    svcs.$rootScope.$on("$locationChangeStart", function () {
                                        i.remove()
                                    })
                            }
                            show(!show())
                        })
                    }
                }
        }])
    }),
    define("common/directives/navbar", ["app", "angular"], function (e, t) {
        e.directive("aliyunConsoleNavbar", ["$http", "$templateCache", "$q", "$compile", function (e, n, r, i) {
            var s = String.prototype.trim ||
                function () {
                    return this.replace(/^\s+|\s+$/g, "")
                };
            return {
                restrict: "AM",
                templateUrl: "scripts/template/navbar.html",
                transclude: !1,
                controller: ["$scope", "$rootScope", "$state", function (e, n, r) {
                    n.$watch("aliyunNavDef", function (n) {
                        t.isDefined(n) && (e.config = n)
                    }),
                        e.checkIfActive = function (e) {
                            var t = e.module;
                            if (t instanceof Array) {
                                for (var n = 0; n < t.length; n++) if (r.includes(t[n])) return !0;
                                return !1
                            }
                            return r.includes(t) ? !0 : !1
                        }
                }],
                link: function (o, u, a, f) {
                    function l(i) {
                        return r.when(n.get(i) || e.get(i)).then(function (e) {
                            return t.isObject(e) ? (n.put(i, e.data), e.data) : e
                        })
                    }

                    function c(e) {
                        var t = l(e);
                        t.then(function (e) {
                            e = s.apply(e),
                                u.find(".console-navbar-links").append(e),
                                i(u.find(".console-navbar-links"))(o)
                        })
                    }

                    o.$watch(function () {
                        return o.config
                    }, function () {
                        o.config && o.config.templateUrl && c(o.config.templateUrl)
                    }),
                        a.$observe("templateUrl", function (e) {
                            e && c(e)
                        })
                }
            }
        }])
    }),
    define("highcharts", ["jQuery"], function () {
    }),
    define("common/directives/chart", ["app", "highcharts", "../services/i18nService"], function (e, t, n) {
        e.directive("aliyunConsoleChart", function () {
            var e = n.getI18n("chart");
            return {
                restrict: "A",
                scope: {
                    config: "=",
                    chartCreated: "&"
                },
                template: '<div class="console-chart"><div style="width:100%;"></div></div>',
                replace: !0,
                link: function (t, n, r, i) {
                    Highcharts.setOptions({
                        global: {
                            useUTC: r.useUtc && r.useUtc == "true"
                        }
                    });
                    var s = {
                        lang: {
                            noData: e.i18n("config.tip.noData")
                        },
                        title: {
                            text: ""
                        },
                        chart: {
                            renderTo: n[0].childNodes[0],
                            type: "spline"
                        },
                        xAxis: {
                            title: "",
                            lineWidth: 1,
                            gridLineWidth: 0,
                            gridLineColor: "#EEE",
                            lineColor: "#DDD",
                            type: "datetime",
                            maxPadding: 0,
                            minPadding: 0,
                            showFirstLabel: !0,
                            showLastLabel: !0,
                            dateTimeLabelFormats: {
                                second: "%H:%M:%S",
                                minute: "%H:%M",
                                hour: "%H:%M",
                                day: "%m - %e",
                                week: "%m - %e",
                                month: "%b '%y",
                                year: "%Y"
                            },
                            labels: {
                                overflow: "justify",
                                y: 20,
                                style: {
                                    color: "#666"
                                }
                            }
                        },
                        yAxis: {
                            title: "",
                            gridLineColor: "#EEE",
                            gridLineWidth: 1,
                            lineColor: "#DDD",
                            min: 0,
                            labels: {
                                style: {
                                    color: "#666"
                                },
                                overflow: "justify"
                            },
                            endOnTick: !0
                        },
                        tooltip: {
                            enabled: !0,
                            shadow: !0,
                            shared: !1,
                            borderWidth: 1,
                            borderColor: "#000",
                            backgroundColor: "rgba(0,0, 0, .85)",
                            crosshairs: {
                                width: 1,
                                color: "#BCD",
                                dashStyle: "shortdot"
                            },
                            style: {
                                color: "#FFF",
                                padding: 6
                            },
                            formatter: function () {
                                return "<strong>" + Highcharts.dateFormat("%Y-%m-%d %H:%M:%S", this.x) + "</strong><br />" + this.series.name + ": " + this.y
                            }
                        },
                        plotOptions: {
                            series: {
                                lineWidth: 1,
                                shadow: !1,
                                fillOpacity: .1,
                                enableMouseTracking: !0,
                                marker: {
                                    enabled: !1,
                                    symbol: "circle"
                                },
                                states: {
                                    hover: {
                                        enabled: !0,
                                        lineWidth: 1.2
                                    }
                                }
                            }
                        },
                        legend: {
                            x: 0,
                            y: 0,
                            borderWidth: 0,
                            margin: 20,
                            align: "center",
                            verticalAlign: "bottom",
                            symbolWidth: 16,
                            symbolPadding: 3,
                            itemStyle: {
                                color: "#666"
                            },
                            backgroundColor: "#FAFAFA"
                        },
                        colors: ["#00ccff", "#ffBB33", "#00cc00", "#ff5c45", "#656ff5", "#ff6699", "#c38b54", "#a270cd", "#33cccc", "#aaaa22"],
                        credits: {
                            enabled: !1
                        }
                    };
                    t.$watch(function () {
                        return t.config
                    }, function (e) {
                        if (!e) return;
                        var n = {};
                        jQuery.extend(!0, n, s, t.config);
                        var r = new Highcharts.Chart(n);
                        t.chartCreated({
                            chart: r
                        })
                    })
                }
            }
        })
    }),
    define("common/directives/validator", ["app", "../services/i18nService"], function (e, t) {
        "use strict";
        var n = t.getI18n("validator");
        e.directive("char2to22", function () {
            return {
                require: "ngModel",
                link: function (e, t, r, i) {
                    i.$parsers.unshift(function (t) {
                        var r = t.length,
                            s = 2 <= r && r <= 22;
                        return i.$setValidity("char2to22", s),
                            e.msg = s ? "" : n.i18n("validator.lb.char2to22"),
                            t
                    })
                }
            }
        }).directive("char2to15", function () {
            return {
                require: "ngModel",
                link: function (e, t, r, i) {
                    i.$parsers.unshift(function (t) {
                        var r = t.length,
                            s = 2 <= r && r <= 15;
                        return i.$setValidity("char2to15", s),
                            e.msg = s ? "" : n.i18n("validator.lb.char2to15"),
                            t
                    })
                }
            }
        }).directive("preventHttpText", function () {
            return {
                require: "ngModel",
                link: function (e, t, r, i) {
                    i.$parsers.unshift(function (t) {
                        if (t == "") return i.$setValidity("startWithHttp", !0),
                            t;
                        var r = "^((https|http)?://)",
                            s = new RegExp(r),
                            o = !s.test(t);
                        i.$setValidity("startWithHttp", o),
                            e.message = o ? "" : n.i18n("validator.lb.preventHttpText");
                        if (o) return t
                    })
                }
            }
        }).directive("nameValidator", function () {
            return {
                require: "ngModel",
                priority: 2e3,
                link: function (e, t, r, i) {
                    i.$parsers.push(function (t) {
                        if (t == undefined || t == "") {
                            i.$setValidity("nameValidator", !0);
                            return
                        }
                        var r = /^[a-zA-Z\u4e00-\u9fa50-9][^\s"@\/:=<>{\[\]}]{0,}$/.test(t);
                        return i.$setValidity("nameValidator", r),
                            e.message = r ? "" : n.i18n("validator.lb.nameValidator"),
                            r ? t : undefined
                    })
                }
            }
        })
    }),
    define("common/directives/numberSpinner", ["app"], function (e) {
        e.directive("aliyunNumberSpinner", ["$parse", function (e) {
            return {
                restrict: "AM",
                require: "?^ngModel",
                scope: {
                    modelValue: "="
                },
                replace: !0,
                templateUrl: "scripts/template/numberSpinner.html",
                link: function (t, n, r) {
                    var i = function (e) {
                        e.originalEvent && (e = e.originalEvent);
                        var t = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                        return e.detail || t > 0
                    };
                    t.readonlyInput = angular.isDefined(r.ngDisabled) ? t.$parent.$eval(r.ngDisabled) : !1,
                        t.$parent.$watch(e(r.ngDisabled), function (e) {
                            t.readonlyInput = e
                        }),
                        t.modelValue = parseInt(t.modelValue || r.value, 10);
                    var s = t.modelValue;
                    t.min = parseInt(r.min, 10),
                        t.max = parseInt(r.max, 10),
                        t.stepper = parseInt(r.stepper, 10),
                        t.inputSize = parseInt(r.inputSize, 10) || t.max.toString().length,
                        t.decrease = function () {
                            if (t.modelValue <= t.min || t.modelValue - t.stepper < t.min) return;
                            t.modelValue -= t.stepper
                        },
                        t.increase = function () {
                            if (t.modelValue >= t.max || t.modelValue + t.stepper > t.max) return;
                            t.modelValue += t.stepper
                        };
                    var o = n.find("input"),
                        u = o.eq(0);
                    u.bind("mousewheel wheel", function (e) {
                        if (t.readonlyInput) return;
                        e.preventDefault(),
                            t.$apply(i(e) ? t.increase() : t.decrease())
                    });
                    var a = /^\-?\d*$/;
                    t.$watch("modelValue", function (e, n) {
                        var r = e,
                            i = a.test(r),
                            s = /^\-/.test(t.min) || /^\-/.test(t.max);
                        i && (r < t.min || r > t.max) && (i = !1),
                            s ? t.modelValue = i ? e : n : /^\-/.test(r) ? t.modelValue = t.min : t.modelValue = parseInt(i ? e : n, 10)
                    })
                }
            }
        }])
    }),
    define("common/directives/onoff", ["app"], function (e) {
        e.directive("aliyunOnOff", function () {
            return {
                restrict: "A",
                replace: !0,
                scope: {
                    ngModel: "=",
                    change: "&",
                    loading: "="
                },
                require: "?ngModel",
                template: '<div ng-click="switchOnOff()" ng-class="thisClass"><div class="onoff-handle"><div class="onoff-loading" ng-show="loading"></div></div></div>',
                link: function (e, t, n, r) {
                    n.ngTrueValue = n.ngTrueValue || !0,
                        n.ngFalseValue = n.ngFalseValue || !1,
                        n.defaultClass = n["class"] || "console-onoff",
                        n.onClass = n.onClass || "console-onoff-on",
                        n.offClass = n.offClass || "console-onoff-off",
                    n.ngModel && (e.ngModel = e.ngModel ? n.ngTrueValue : n.ngFalseValue, e.$watch(function () {
                        return e.ngModel
                    }, function () {
                        e._checked = e.ngModel == n.ngTrueValue ? !0 : !1
                    })),
                        e.switchOnOff = function () {
                            if (n.disabled) return !1;
                            n.loading == undefined && (e._checked = e._checked == 1 ? !1 : !0, n.ngModel && (e.ngModel = e._checked ? n.ngTrueValue : n.ngFalseValue)),
                                e.change(e.ngModel)
                        },
                        e.$watch("_checked", function () {
                            e.thisClass = n.defaultClass + " " + (e._checked ? n.onClass : n.offClass)
                        })
                }
            }
        })
    }),
    define("common/directives/post-require", ["app"], function (e) {
        e.directive("postRequire", function () {
            return {
                restrict: "A",
                require: "?ngModel",
                link: function (e, t, n, r) {
                    if (!r) return;
                    var i = function (e) {
                        if (r.$isEmpty(e)) {
                            r.$setValidity("required", !1);
                            return
                        }
                        return r.$setValidity("required", !0),
                            e
                    };
                    t.bind("blur", function () {
                        r.$dirty && (i(r.$viewValue), e.$apply())
                    })
                }
            }
        })
    }),
    define("common/directives/search", ["app"], function (e) {
        e.directive("aliyunConsoleGlobalSearch", function () {
            return {
                restrict: "AM",
                scope: !0,
                replace: !0,
                templateUrl: "scripts/template/globalSearch.html",
                transclude: !1,
                controller: ["$scope", "$timeout", function (e, t) {
                    e.isActive = !1,
                        e.searchUrl = "http://www.aliyun.com/s?k=",
                        e.activeInput = function () {
                            e.isActive = !0
                        },
                        e.inactiveInput = function () {
                            t(function () {
                                e.isActive = !1
                            }, 100)
                        }
                }],
                link: function (e, t, n, r) {
                    var i = t.find(".console-search-ask-input")[0];
                    n.$observe("searchUrl", function (t) {
                        t && (e.searchUrl = t)
                    }),
                        n.$observe("placeholderText", function (t) {
                            angular.isDefined(t) && (e.placeholderText = t)
                        }),
                        $(i).on("keypress", function (t) {
                            t.keyCode == 13 && window.open(e.searchUrl + e.askInput, "_blank")
                        })
                }
            }
        })
    }),
    define("common/directives/loading", ["app", "spinjs"], function (e, t) {
        e.directive("aliyunLoading", function () {
            return {
                restrict: "A",
                replace: !0,
                link: function (e, n, r) {
                    var i = {
                            12: {
                                lines: 8,
                                length: 1,
                                width: 2,
                                radius: 3
                            },
                            16: {
                                lines: 8,
                                length: 2,
                                width: 2,
                                radius: 4
                            },
                            24: {
                                lines: 9,
                                length: 3,
                                width: 3,
                                radius: 6
                            },
                            32: {
                                lines: 9,
                                length: 4,
                                width: 4,
                                radius: 8
                            },
                            40: {
                                lines: 10,
                                length: 6,
                                width: 4,
                                radius: 10
                            },
                            48: {
                                lines: 10,
                                length: 6,
                                width: 5,
                                radius: 13
                            },
                            64: {
                                lines: 12,
                                length: 10,
                                width: 5,
                                radius: 16
                            }
                        },
                        s = i[r.size] || i[16];
                    s.zIndex = 99;
                    if (n[0] && n[0].children && n[0].children[0] && n[0].children[0].className == "spinner") return;
                    var o = (new t(s)).spin(n[0])
                }
            }
        })
    }),
    define("common/directives/truncateText", ["app", "angular"], function (e, t) {
        function n(e) {
            return t.element("<div/>").html(e).text()
        }

        function r(e) {
            return t.element("<div/>").text(e).html()
        }

        e.provider("aliyunTruncateTextConfig", function () {
            var e = {
                copyText: !1,
                textLength: 12
            };
            return {
                config: function (t) {
                    t && (e.copyText = t.copyText, e.textLength = t.textLength)
                },
                $get: function () {
                    return e
                }
            }
        }).directive("aliyunTruncateText", ["$compile", "$sanitize", "aliyunTruncateTextConfig", function (e, t, i) {
            return {
                restrict: "A",
                link: function (t, s, o) {
                    var u = o.textLength || 12;
                    o.textLength || (u = i.textLength);
                    var a = o.copyText || !1;
                    if (a != 1 && a != "true") {
                        var f = i.copyText;
                        a = f
                    }
                    var l = o.trigger || "mouseenter",
                        c = o.tooltipPlacement || "top";
                    o.$observe("sourceText", function (i) {
                        if (i) {
                            i = i.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                            var o = n(i);
                            if (o.length > u) {
                                var f = o.substr(0, u);
                                f.length < o.length && (f += "..."),
                                    f = r(f),
                                    i = i.replace(/["]/g, "&quot;"),
                                    a ? s.html('<span tooltip-trigger="' + l + '" tooltip-placement="' + c + '"  aliyun-tooltip2="' + i + '" content-html="false">' + f + "</span>") : s.html('<span tooltip-trigger="' + l + '" tooltip-placement="' + c + '"  tooltip="' + i + '">' + f + "</span>"),
                                    e(s.contents())(t)
                            } else s.text(o)
                        }
                    })
                }
            }
        }])
    }),
    define("common/directives/spm", ["app", "angular"], function (e, t) {
        "use strict";

        function n() {
            var e = window.location.hash;
            return e = e.replace(/^#\//, "").replace(/\//g, "_"),
                e
        }

        e.directive("aliyunConsoleSpm", function () {
            return {
                link: function (e, r, i) {
                    var s = t.isDefined(i.spmId) ? i.spmId : i.aliyunConsoleSpm || 0,
                        o = i.spmDefaultUri || i.spmUri && i.spmUri.length > 0,
                        u = i.needConvert,
                        a = t.isDefined(i.extraParams) ? i.extraParams : "",
                        f = "";
                    if (o) {
                        var l = t.isDefined(i.spmUri) ? i.spmUri : n() || "";
                        f = l && l.length > 0 ? "uri=" + l : ""
                    }
                    u && (s = (s + "").split(".").join("_")),
                        i.$set("data-spm-click", "gostr=/aliyun;locaid=d" + s + ";" + f + ";" + a)
                }
            }
        })
    }),
    define("common/directives/tableFixed", ["app"], function (e) {
        e.directive("aliyunTableFixed", function () {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    function o() {
                        i = t,
                            r = t.parents("table.table");
                        var n = r.css("margin-bottom") || "0px";
                        r.siblings("table.table-fixed").length ? s = r.siblings("table.table-fixed") : (s = angular.element('<table  class="table table-fixed"></table>'), s.css({
                                margin: "0px",
                                "z-index": "99"
                            })),
                            i.appendTo(s),
                            r.after(s),
                            e.$on("$destroy", function () {
                                s.remove(),
                                    r.css("margin-bottom", n)
                            }),
                            setTimeout(function () {
                                l(),
                                    r.css("margin-bottom", i.outerHeight() + "px")
                            }),
                            angular.element(window).bind("resize", l),
                            angular.element(window).bind("scroll", c)
                    }

                    function l() {
                        i.find("td").eq(0).css("width", r.find("th").eq(0).outerWidth() + "px");
                        var e = r.offset().top + r.outerHeight() + i.outerHeight() - 1,
                            n = document.documentElement.clientHeight;
                        n = t.parents(".console-message-dialog") && t.parents(".console-message-dialog").outerHeight() || n,
                            e > n ? (s.css({
                                    width: r.outerWidth() + "px"
                                }), a()) : (s.css({
                                    width: "100%"
                                }), f())
                    }

                    function c(e) {
                        var n = angular.element(window).scrollTop() < 0 ? 0 : angular.element(window).scrollTop(),
                            s = r.offset().top + r.outerHeight() + i.outerHeight(),
                            o = n + document.documentElement.clientHeight;
                        el.parents(".console-message-dialog") && (o = n + t.parents(".console-message-dialog").outerHeight()),
                            s < o ? f() : a()
                    }

                    var r, i, s, u, a = function () {
                            u = !0,
                                s.css({
                                    position: "fixed",
                                    "margin-top": "0px",
                                    bottom: "0px"
                                })
                        },
                        f = function () {
                            u = !1,
                                s.css({
                                    position: "relative",
                                    "margin-top": -i.outerHeight() - 1,
                                    bottom: "auto"
                                })
                        };
                    o(),
                        e.$on("$destroy", function () {
                            angular.element(window).unbind("resize", l),
                                angular.element(window).unbind("scroll", c)
                        })
                }
            }
        })
    }),
    define("common/directives/textEditor", ["app", "angular", "../services/i18nService"], function (e, t, n) {
        "use strict";
        var r = n.getI18n("directives.base"),
            i = {
                confirm: r.i18n(!0, "common.lb.confirm"),
                cancel: r.i18n(!0, "common.lb.cancel"),
                fail: r.i18n("msg.save.fail")
            };
        e.provider("textEditorConfig", function () {
            var e = {
                buttonLabel: {
                    apply: i.confirm,
                    cancel: i.cancel
                }
            };
            return {
                setButtonLabels: function (t) {
                    e.buttonLabel = t
                },
                setProviderOptions: function (n) {
                    t.extend(e, n)
                },
                $get: function () {
                    return e
                }
            }
        }).filter("htmlParser", function () {
            var e = t.element("<div></div>");
            return function (t) {
                return t = e.html(t).html(),
                    t
            }
        }).directive("textEditor", ["$compile", "$timeout", "$sce", "textEditorConfig", function (e, n, r, s) {
            function u(e) {
                return e ? e.replace(/</g, "&lt;").replace(/>/g, "&gt;") : e
            }

            var o = [];
            return t.element(document).on("click", function () {
                n(function () {
                    if (o.length > 0) {
                        var e = o.splice(0, 1)[0];
                        e.showPanel = !1,
                            e.reject = !1,
                            e.text = e._oldText
                    }
                })
            }),
                {
                    scope: !0,
                    restrict: "AC",
                    require: "?ngModel",
                    controller: ["$rootScope", "$scope", "$q", function (e, t, n) {
                        t.q$ = n,
                            t.rootScope$ = e
                    }],
                    link: function (a, f, l, c) {
                        function d(e) {
                            if (e && e.length !== 0) {
                                var t = ("" + e).toLowerCase();
                                e = t != "f" && t != "0" && t != "false" && t != "no" && t != "n" && t != "[]"
                            } else e = !1;
                            return e
                        }

                        a.inputSize = l.cInputSize || 32;
                        var h = l.ngModel !== undefined,
                            p = t.element("<div></div>");
                        h ? a.$watch(l.ngModel, function (e) {
                                e = u(e),
                                    a._oldText = a.text = p.html(e).text()
                            }) : l.$observe("cText", function (e) {
                                e = u(e),
                                    a._oldText = a.text = p.html(e).text()
                            }),
                            l.$observe("cNotEditable", function (e) {
                                a.notEditable = d(e)
                            });
                        var v = !0;
                        l.$observe("cAutoUpdate", function (e) {
                            v = e === undefined ? !0 : d(e)
                        }),
                            a.title = l.cTitle,
                            a.cAlwaysShow = l.cAlwaysShow === "true",
                            t.forEach(["cFrom", "cDirectives", "cTip", "cTipClass", "cUnit"], function (e) {
                                a[e] = l[e]
                            }),
                            a.cTip = r.trustAsHtml(a.cTip);
                        var m = t.element(a.cFrom ? a.cFrom : '<a class="ecs-texttrimmer-pen btn btn-default btn-xs c-texttrimmer-pen" href="#"><span class="icon-pen"></span></a>').attr({
                            "ng-show": "!notEditable && showPen"
                        });
                        if (!a.cAlwaysShow) {
                            a.showPen = !1;
                            var g = function w(e) {
                                    a.showPen = e.type === "mouseover";
                                    try {
                                        w._thandler.cancel()
                                    } catch (e) {
                                    }
                                    a.showPen ? a.$apply() : w._thandler = n(function () {
                                            a.$apply()
                                        }, 200)
                                },
                                y = f;
                            l.cTriggerSelector && (y = f.parents(l.cTriggerSelector), y.length || (y = f)),
                                y.on("mouseover mouseout", function E(e) {
                                    E._inited || (E._inited = !0, f.after(m), a.showPen = !0, m.on("mouseover mouseout", function (e) {
                                        g(e)
                                    })),
                                        g(e)
                                })
                        } else a.showPen = !0,
                        !a.cFrom && f.after(m);
                        e(m)(a);
                        var b = function (e) {
                            if (e === undefined) return a.showPanel === undefined ? !1 : a.showPanel;
                            n(function () {
                                a.disabled = !1,
                                    a.showPanel = e
                            })
                        };
                        a.handler = function (e, t) {
                            e.preventDefault();
                            if (t) {
                                a.reject = !1,
                                    a.disabled = !0;
                                if (a.callback) {
                                    var n = a.q$.defer();
                                    n.promise.then(function (e) {
                                        e.success ? (a._oldText = a.text, b(!1), v && (h ? c.$setViewValue(a.text) : f.text(a.text))) : (b(!0), a.reject = !0, a.message = e.message || i.fail)
                                    }, function (e) {
                                        e && (a.message = e.message || i.fail),
                                            b(!0),
                                            a.reject = !0
                                    }),
                                        a.callback(n)
                                } else a._oldText = a.text,
                                    b(!1),
                                v && (h ? c.$setViewValue(a.text) : f.text(a.text))
                            } else a.reject = !1,
                                a.text = a._oldText,
                                b(!1)
                        },
                            m.on("click", function (r) {
                                r.preventDefault();
                                if (!b()) {
                                    if (!o.length || !o[0].showPanel) r.stopPropagation(),
                                        o.splice(0, 1);
                                    o.push(a);
                                    var i = s.buttonLabel,
                                        u = ['<div ng-show="showPanel" class="c-texttrimmer-box"><p ng-if="title">{{title}}：</p><form name="textEditor">', '   <p><input name="editor" size="{{inputSize}}" class="form-control" ng-model="text" type="text" ng-disabled="disabled" ' + a.cDirectives + ' style="display:inline-block;" /> <span data-ng-if="cUnit" ng-bind="cUnit"></span></p>', '   <p class="c-texttrimmer-tip" ng-show="textEditor.$invalid || reject" ng-bind="message"></p>', '   <p class="{{cTipClass}}" ng-if="cTip" ng-bind-html="cTip"></p>', '   <div class="c-texttrimmer-btnbox">', '     <a class="btn btn-primary" href="#" ng-disabled="textEditor.$invalid || disabled" ng-click="handler($event, true);">' + i.apply + "</a>", '     <a class="btn btn-default" href="#" ng-disabled="disabled" ng-click="handler($event, false);">' + i.cancel + "</a>", "   </div>", "</form></div>"],
                                        l = function (e, n) {
                                            var r = t.element(window),
                                                i = e.offset(),
                                                s = r.scrollLeft() + r.width(),
                                                o = r.scrollTop() + r.height(),
                                                u = i.left + n[0].offsetWidth,
                                                a = n[0].offsetHeight,
                                                f = e[0].offsetHeight,
                                                l = i.top + f,
                                                c = l + a,
                                                l = o >= c ? l + 5 : i.top - f - a,
                                                h = s >= u ? i.left : i.left + s - u;
                                            return n.css({
                                                top: l,
                                                left: h
                                            })
                                        },
                                        c = t.element(u.join("")).on("click", function (e) {
                                            e.stopPropagation()
                                        });
                                    c.appendTo(document.body),
                                        l(f, c),
                                        e(c)(a),
                                        a.$watch("showPanel", function (e) {
                                            !e && c.remove()
                                        }),
                                        a.$on("$destroy", function () {
                                            c && c.remove()
                                        }),
                                        a.rootScope$.$on("$locationChangeStart", function () {
                                            c.remove()
                                        })
                                }
                                b(!b())
                            })
                    }
                }
        }])
    }),
    define("common/directives/selector", ["app", "../services/i18nService"], function (e, t) {
        e.directive("aliyunSelector", function () {
            var e = t.getI18n("selector");
            return {
                restrict: "AE",
                replace: !1,
                scope: {
                    value: "=",
                    list: "=",
                    status: "=",
                    loadMore: "&",
                    filterBy: "="
                },
                template: '</a><ul ng-show="!showloading" class="selector-list" ><li ng-repeat="item in _selectorDataList | filter:filterBy"  ng-class="{disabled:item.disabled,active:item._active}" tooltip="{{item.tips}}" tooltip-placement="bottom" tooltip-trigger="mouseenter" tooltip-append-to-body="true" class="selector-item" ng-click="change($index)">{{item.label}}</li></ul><div ng-show="showMsg" ng-click="load()" class="selector-msg" ng-bind-html="message"></div>',
                link: function (t, n, r) {
                    var i = {
                        load: r.messageLoad || '<span class="text-muted">' + e.i18n("default.message.load") + "</span>",
                        error: r.messageError || '<span class="text-danger">' + e.i18n("default.message.error") + '</span><span class="text-primary">' + e.i18n("default.message.retry") + "</span>",
                        empty: r.messageEmpty || '<span class="text-muted">' + e.i18n("default.message.empty") + "</span>",
                        hasmore: r.messageHasmore || '<span class="text-primary">' + e.i18n("default.message.more") + "</a>"
                    };
                    t.multi = r.multi || !1,
                        t.load = function () {
                            if (t.status == "load" || t.status == "empty") return;
                            t.loadMore()
                        },
                        t.change = function (e) {
                            var n = t._selectorDataList[e];
                            if (n.disabled) return;
                            t.multi = r.multi == "true" || !1,
                                t._selectorDataList[e]._active = !t._selectorDataList[e]._active,
                                t.value = [],
                                t.multi ? (angular.forEach(t._selectorDataList, function (e, n) {
                                        e._active && t.value.push(t.list[n])
                                    }), t.value.length < 1 && (t.value = null)) : (angular.forEach(t._selectorDataList, function (e, r) {
                                        n != e && (t._selectorDataList[r]._active = !1)
                                    }), n._active ? t.value = t.list[e] : t.value = null)
                        };
                    var s = function () {
                        t._selectorDataList = angular.copy(t.list),
                        (!t.list || t.list.length == 0) && t.status == "empty" && (t.value = null),
                        t.statusClass && n.hasClass(t.statusClass) && n.removeClass(t.statusClass),
                            t.statusClass = "selector-status-" + t.status,
                            n.addClass(t.statusClass),
                            t.message = i[t.status],
                            t.list && t.list.length > 0 && t.status == "empty" ? t.showMsg = !1 : t.showMsg = !0
                    };
                    t.$watchCollection("[status,list]", function (e) {
                        s()
                    }),
                    r.listwatch == "true" && t.$watchCollection("list", function (e) {
                        s()
                    });
                    var o = function () {
                        t.value && angular.isArray(t.value) ? angular.forEach(t.list, function (e, n) {
                                t._selectorDataList[n]._active = !1,
                                    angular.forEach(t.value, function (r, i) {
                                        if (r == e) return t._selectorDataList[n]._active = !0,
                                            !1
                                    })
                            }) : t.value && angular.forEach(t.list, function (e, n) {
                                t._selectorDataList[n]._active = t.value == e
                            })
                    };
                    t.$watch("value", function (e) {
                        o()
                    }),
                        s(),
                        o(),
                        n.addClass("selector")
                }
            }
        })
    }),
    define("common/directives/_base", ["app", "./base", "./navbar", "./chart", "./validator", "./numberSpinner", "./onoff", "./post-require", "./search", "./loading", "./truncateText", "./spm", "./tableFixed", "./textEditor", "./selector"], function (e) {
    }),
    define("common/directives/tooltip", ["app"], function (e) {
        e.provider("$tooltip2", function () {
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
                    popupDelay: 0,
                    contentHtml: !0
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
                            b = "<div " + m + "-popup " + 'title="' + g + "tt_title" + y + '" ' + 'content="' + g + "tt_content" + y + '" ' + 'placement="' + g + "tt_placement" + y + '" ' + 'animation="' + g + "tt_animation" + y + '" ' + 'is-open="' + g + "tt_isOpen" + y + '"' + 'template-id="' + g + "tt_templateId" + y + '" ' + 'content-html="' + g + "tt_contentHtml" + y + '" ' + 'template-data="tt_templateData" ' + ">" + "</div>";
                        return {
                            restrict: "EA",
                            scope: !0,
                            compile: function (e, t) {
                                var n = s(b);
                                return function (t, r, i) {
                                    function x() {
                                        t.tt_isOpen ? N() : T()
                                    }

                                    function T() {
                                        o.cancel(w);
                                        if (b && !t.$eval(i[h + "Enable"])) return;
                                        t.tt_popupDelay ? (p = o(C, t.tt_popupDelay, !1), p.then(function (e) {
                                                e()
                                            })) : C()()
                                    }

                                    function N() {
                                        t.$apply(function () {
                                            w = o(k, 100)
                                        })
                                    }

                                    function C() {
                                        return !t.tt_content && !t.tt_templateId ? angular.noop : (L(), l && o.cancel(l), s.css({
                                                top: 0,
                                                left: 0,
                                                display: "block"
                                            }), m ? a.find("body").append(s) : r.after(s), S(), t.tt_isOpen = !0, t.$digest(), S)
                                    }

                                    function k() {
                                        t.tt_isOpen = !1,
                                            o.cancel(p),
                                            t.tt_animation ? l = o(_, 0) : _()
                                    }

                                    function L() {
                                        s && _(),
                                            s = n(t, function () {
                                            }),
                                            t.$digest(),
                                            M()
                                    }

                                    function A() {
                                        o.cancel(w)
                                    }

                                    function O() {
                                        w = o(N, 50)
                                    }

                                    function M() {
                                        s && E && (s.bind("mouseenter", A), s.bind("mouseleave", O))
                                    }

                                    function _() {
                                        s && (s.remove(), s = null)
                                    }

                                    var s, l, p, m = angular.isDefined(d.appendToBody) ? d.appendToBody : !1,
                                        g = v(undefined),
                                        y = !1,
                                        b = angular.isDefined(i[h + "Enable"]),
                                        w, E = !0,
                                        S = function () {
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
                                            !e && t.tt_isOpen && k()
                                        }),
                                        i.$observe(h + "Title", function (e) {
                                            t.tt_title = e
                                        }),
                                        i.$observe(h + "Placement", function (e) {
                                            t.tt_placement = angular.isDefined(e) ? e : d.placement
                                        }),
                                    i[h + "TemplateData"] && t.$watch(i[h + "TemplateData"], function (e) {
                                        e && (t.tt_templateData = e)
                                    }),
                                        i.$observe(h + "TemplateId", function (e) {
                                            t.tt_templateId = angular.isDefined(e) ? e : d.templateId
                                        }),
                                        i.$observe(h + "PopupDelay", function (e) {
                                            var n = parseInt(e, 10);
                                            t.tt_popupDelay = isNaN(n) ? d.popupDelay : n
                                        }),
                                        i.$observe("contentHtml", function (e) {
                                            t.tt_contentHtml = angular.isDefined(e) ? u(e)(t) : d.contentHtml
                                        });
                                    var D = function () {
                                        y && (r.unbind(g.show, T), r.unbind(g.hide, N))
                                    };
                                    i.$observe(h + "Trigger", function (e) {
                                        D(),
                                            g = v(e),
                                            g.show === g.hide ? (r.bind(g.show, x), g.show != "mouseenter" && (E = !1)) : (r.bind(g.show, T), r.bind(g.hide, N)),
                                            y = !0
                                    });
                                    var P = t.$eval(i[h + "Animation"]);
                                    t.tt_animation = angular.isDefined(P) ? !!P : d.animation,
                                        i.$observe(h + "AppendToBody", function (e) {
                                            m = angular.isDefined(e) ? u(e)(t) : m
                                        }),
                                    m && t.$on("$locationChangeSuccess", function () {
                                        t.tt_isOpen && k()
                                    }),
                                        t.$on("$destroy", function () {
                                            o.cancel(l),
                                                o.cancel(p),
                                                D(),
                                                _()
                                        })
                                }
                            }
                        }
                    }
                }]
        });
        var t = function (e, t, n, r) {
            function s(t) {
                return n.when(e.get(t) || r.get(t)).then(function (n) {
                    return angular.isObject(n) ? (e.put(t, n.data), n.data) : n
                })
            }

            function o(e, n, r) {
                e.$watch("templateId", function (o) {
                    if (o) {
                        var u = s(e.templateId);
                        u.then(function (s) {
                            s = i.apply(s),
                                n.find("." + r + "-content").append(s),
                                t(n.find("." + r + "-content"))(e)
                        })
                    }
                }),
                    e.$watch("templateData", function (i) {
                        i && t(n.find("." + r + "-content"))(e)
                    })
            }

            var i = String.prototype.trim ||
                function () {
                    return this.replace(/^\s+|\s+$/g, "")
                };
            return {
                init: o
            }
        };
        e.directive("aliyunTooltip2Popup", ["$templateCache", "$compile", "$q", "$http", function (e, n, r, i) {
            var s = t(e, n, r, i);
            return {
                restrict: "EA",
                replace: !0,
                scope: {
                    content: "@",
                    placement: "@",
                    templateId: "@",
                    templateData: "=",
                    contentHtml: "@"
                },
                templateUrl: "scripts/template/tooltip2.html",
                link: function (e, t, n, r) {
                    s.init(e, t, "tooltip")
                }
            }
        }]).directive("aliyunTooltip2", ["$tooltip2", function (e) {
            return e("aliyunTooltip2", "tooltip", "mouseenter")
        }]).directive("aliyunPopover2Popup", ["$templateCache", "$compile", "$q", "$http", function (e, n, r, i) {
            var s = t(e, n, r, i);
            return {
                restrict: "EA",
                replace: !0,
                scope: {
                    content: "@",
                    placement: "@",
                    templateId: "@",
                    templateData: "=",
                    contentHtml: "@"
                },
                templateUrl: "scripts/template/popover2.html",
                link: function (e, t, n, r) {
                    s.init(e, t, "popover")
                }
            }
        }]).directive("aliyunPopover2", ["$tooltip2", function (e) {
            return e("aliyunPopover2", "popover", "mouseenter")
        }])
    }),
    define("common/directives/aliyunNumberRange", ["./aliyunCommonDirectives", "angular"], function (e, t) {
        e.directive("aliyunNumberRange", function () {
            return {
                require: "ngModel",
                link: function (e, t, n, r) {
                    var i = n.valueMin * 1 || 0,
                        s = n.valueMax * 1 || Number.MAX_VALUE,
                        o = n.rangeEnabled || !0;
                    n.$observe("valueMin", function (e) {
                        i = n.valueMin * 1 || 0
                    }),
                        n.$observe("valueMax", function (e) {
                            s = n.valueMax * 1 || Number.MAX_VALUE
                        }),
                        r.$parsers.push(function (e) {
                            if (e == undefined) return "";
                            var t;
                            if (typeof e == "string") {
                                var n = "";
                                /^-\d*/g.test(e) && (n = "-"),
                                    t = n + e.replace(/[^0-9]/g, ""),
                                t != e && (r.$setViewValue(t), r.$render())
                            }
                            var u = !0,
                                a = t;
                            return t !== "-" ? (t = t && parseInt(t, 10), o && t !== "" && (t < i || t > s) && (u = !1)) : u = !1,
                                r.$setValidity("aliyunNumberRange", u),
                                a
                        })
                }
            }
        })
    }),
    define("common/directives/aliyunConsolePagination", ["./aliyunCommonDirectives", "angular", "../services/i18nService", "./aliyunNumberRange"], function (e, t, n) {
        var r = 5,
            i = n.getI18n("directives.aliyunConsolePagination");
        e.directive("aliyunConsolePagination", ["$compile", function (e) {
            return {
                restrict: "AM",
                scope: {
                    paginationInfo: "=",
                    maxSize: "=",
                    onSelectPage: "&"
                },
                replace: !0,
                templateUrl: "scripts/template/consolePagination.html",
                transclude: !1,
                link: function (e, t, n, s) {
                    var o = n.showPageGoto == 1 || n.showPageGoto == "true";
                    e.$watch("paginationInfo", function (t) {
                        if (t && o) {
                            var n = t.total,
                                i = t.pageSize,
                                s = Math.ceil(n / i);
                            t.totalPage = s,
                                t.showPageGoto = s >= r,
                                e.pageGoto = ""
                        }
                    }),
                        e.$watch("pageGoto", function (t) {
                            t && t != "0" && t > 0 ? e.gotoPageBtnDisabled = t > e.paginationInfo.totalPage : e.gotoPageBtnDisabled = !0
                        }),
                        e.gotoPage = function () {
                            e.pageChangedHandler(e.pageGoto)
                        },
                        e.pageChangedHandler = function (t) {
                            e.onSelectPage({
                                page: t
                            })
                        },
                        e.i18nMessage = i.localMessage
                }
            }
        }])
    }),
    define("common/directives/searchBar", ["./aliyunCommonDirectives", "angular", "../services/i18nService"], function (e, t, n) {
        var r = n.getI18n("directives.searchBar");
        e.directive("aliyunConsoleSearchBar", function () {
            return {
                restrict: "AM",
                scope: {
                    dimensions: "=",
                    initConfig: "&",
                    searchAction: "&",
                    searchText: "=",
                    preSelection: "@",
                    filterList: "=",
                    filterSelect: "=",
                    filterKey: "="
                },
                templateUrl: "scripts/template/searchBar.html",
                link: function (e, n, i) {
                    function u(n) {
                        if (o) {
                            var r;
                            t.forEach(n, function (e) {
                                e.value == o.key && (r = e)
                            }),
                            r && (s = !0, e.selectItem = r)
                        }
                    }

                    function f() {
                        e.selectItem = e.dimensions[0],
                            e.inputType = e.selectItem && e.selectItem.type || a,
                            e.maxDate = new Date
                    }

                    e.searchForm = {};
                    var s = !1,
                        o;
                    e.preSelection && (o = t.fromJson(e.preSelection));
                    var a = "text";
                    e.$watch("dimensions", function (n) {
                        n && t.isArray(n) && (f(), e.initConfig({
                            data: e
                        }), u(n))
                    }),
                        e.$watch("searchForm.searchText", function (t) {
                            e.searchText != t && (e.searchText = t)
                        }),
                        e.$watch("searchText", function (t) {
                            e.searchForm.searchText != t && (e.searchForm.searchText = t),
                            t || (e.searchForm.subSelectSearchText = "")
                        }),
                        e.$watch("filterSelect", function (t) {
                            t && e.search()
                        }),
                        e.$watch("selectItem", function (n) {
                            n && (e.inputType = n.type || a, s ? (s = !1, e.searchForm.searchText = o && o.value || "") : e.searchForm.searchText = "", n && n.type == "date" && (e.searchForm.searchText = n.defaultValue || new Date), n.type == "subSelect" && n && n.subSelectDimensions && (e.searchForm.subSelectSearchText = n.subSelectDimensions[0], t.forEach(n.subSelectDimensions, function (t, n) {
                                t.isDefault == 1 && (e.searchForm.subSelectSearchText = t)
                            })))
                        }),
                        e.search = function () {
                            var n = e.selectItem,
                                r = t.copy(e.searchForm.searchText) || "";
                            e.inputType == "date" && r != "" && (r = (new Date(r)).getTime()),
                            e.inputType == "select" && n && n.defaultValue && (r = n.defaultValue),
                            e.inputType == "subSelect" && e.searchForm.subSelectSearchText && (r = e.searchForm.subSelectSearchText.value),
                                e.filterKey ? e.searchAction({
                                        data: {
                                            key: n && n.value || "",
                                            value: r,
                                            filterSearchData: [{
                                                key: e.filterKey,
                                                value: e.filterSelect
                                            },
                                                {
                                                    key: n && n.value || "",
                                                    value: r
                                                }]
                                        }
                                    }) : e.searchAction({
                                        data: {
                                            key: n && n.value || "",
                                            value: r
                                        }
                                    })
                        },
                        e.open = function (t) {
                            t.preventDefault(),
                                t.stopPropagation(),
                                e.opened = !e.opened
                        },
                        e.i18nMessage = r.localMessage
                }
            }
        })
    }),
    define("common/directives/tableSearch", ["./aliyunCommonDirectives", "angular"], function (e, t) {
        e.directive("aliyunConsoleTableSearch", function () {
            return {
                restrict: "AM",
                scope: {
                    initAction: "&",
                    clickAction: "&",
                    preSelectedId: "=",
                    items: "=",
                    selectItem: "=?"
                },
                replace: !1,
                templateUrl: "scripts/template/tableSearch.html",
                transclude: !0,
                link: function (e, n, r) {
                    var i = r.filterField;
                    e.spmPrefix = r.spmPrefix || 67,
                        e.$watch("items", function (n) {
                            n && t.isArray(n) && (e.showDropdown = e.items.length > 1 ? !0 : !1, e.selectItem = e.items[0], t.isFunction(e.initAction) && e.initAction({
                                data: e.items
                            }))
                        }),
                        e.$watch("selectItem", function (n) {
                            n == undefined && t.isArray(e.items) && (e.selectItem = e.items[0])
                        }),
                        e.$watch("preSelectedId", function (n) {
                            if (!t.isArray(e.items)) return;
                            if (n == undefined) {
                                e.selectItem = e.items[0];
                                return
                            }
                            t.forEach(e.items, function (t) {
                                t.id == n && (e.selectItem = t)
                            })
                        }),
                        e.search = function (n) {
                            e.selectItem = n,
                            t.isFunction(e.clickAction) && (i != undefined ? e.clickAction({
                                    data: {
                                        item: n,
                                        filterField: i
                                    }
                                }) : e.clickAction({
                                    data: n
                                }))
                        }
                }
            }
        })
    }),
    define("common/directives/noneDataInfo", ["./aliyunCommonDirectives"], function (e) {
        e.directive("aliyunNoneDataInfoTip", [function () {
            return {
                restrict: "A",
                scope: !0,
                replace: !0,
                transclude: !0,
                template: '<div class="row-padding row-margin text-center"><span class="text-size-16 text-success icon-info-1" style="vertical-align: middle"></span><div class="text-size-16 tip-text inline-block" data-ng-transclude></div></div>'
            }
        }])
    }),
    define("common/directives/simpleGrid", ["./aliyunCommonDirectives", "angular", "../services/i18nService", "./aliyunConsolePagination", "bindonce", "./loading", "./searchBar", "./tableSearch", "./noneDataInfo", "./tableFixed"], function (e, t, n) {
        function i(e, t) {
            if (e.filterSearchSupport) {
                var n = '<div aliyun-console-search-bar search-text="searchParams.value" dimensions="searchItems" search-action="searchAction(data)" search-text="searchParams.searchCondition" filter-list="filterList" filter-select="filterSelect" filter-key="filterKey"></div>';
                t.find(".searchSection").html(n)
            } else if (e.searchSupport) {
                var r = "";
                e.preSelectionSearch && (r = ' pre-selection="{{searchParams}}"');
                var n = '<div aliyun-console-search-bar search-text="searchParams.value" dimensions="searchItems" search-action="searchAction(data)" search-text="searchParams.searchCondition" ' + r + "></div>";
                t.find(".searchSection").html(n)
            }
        }

        function s(e, t) {
            var n = a(e, t),
                r = f(e, t),
                i = u(e, t);
            return '<table class="table table-hover">' + n + r + i + "</table>"
        }

        function o(e) {
            var t = e ? "th" : "td";
            return "<" + t + ' width="10"><input type="checkbox" data-ng-model="tableState.selectAll" ng-change="changeSelectionAll()"/></' + t + ">"
        }

        function u(e, t) {
            var n = "";
            t.checkboxSupport && (n = o(!1));
            var r = e.length,
                i = "";
            if (t.paginationInfo) {
                var s = t.paginationInfo.showPageGoto;
                s && (i = ' show-page-goto="' + t.paginationInfo.showPageGoto + '" ')
            }
            var u = '<div data-ng-if="paginationSupport && showNoneDataInfoTip != true && !loadingState"><div class="pull-right" aliyun-console-pagination pagination-info="paginationInfo" ' + i + ' max-size="maxSize"' + ' on-select-page="pageChanged(page)"></div></div>',
                a = t.batchOperationBarDirective || "",
                f = '<div class="pull-left">' + a + "</div>",
                l = '<td colspan=" ' + r + '" >' + f + u + "</td>",
                c = "",
                h = t.tfootPositionFixed;
            return h == 1 && (c = " aliyun-table-fixed "),
                a != "" || t.paginationSupport ? "<tfoot " + c + ' ng-if="!showNoneDataInfoTip"><tr>' + n + l + "</tr></tfoot>" : ""
        }

        function a(e, n) {
            var r = "";
            return n.checkboxSupport && (r = o(!0)),
                t.forEach(e, function (e) {
                    var t = e.cssProperty ? ' class="' + e.cssProperty + '" ' : "",
                        i = e.filterOptionKey,
                        s = "",
                        o = "",
                        u = "";
                    n.preSelectionFilter && (o = ' pre-selected-id="filterParams.' + i + '"'),
                        i ? s = " aliyun-console-table-search " + o + ' select-item="filterItemMap.' + i + '"   filter-field="' + i + '" items="filterItems.' + i + '" click-action="changeTheadFilter(data)" ' : (n.clientSort && e.field && e.disableSort != 1 && (u = '<span class="icon-updown btn-link" data-ng-click="clientSortHandler(\'' + e.field + "', sortReverse)\"></span>"), n.serverSort && e.field && e.serverSortEnabled == 1 && (u = '<span class="icon-updown btn-link" data-ng-click="serverSortHandler(\'' + e.field + "', sortReverse)\"></span>")),
                        r += "<th" + t + s + ">" + e.name + u + "</th>"
                }),
            "<thead><tr>" + r + "</tr></thead>"
        }

        function f(e, n) {
            var r = n.useBindOnce ? "bindonce" : "",
                i = n.rowItemName ? n.rowItemName : "item",
                s = n.itemList || "store",
                o = "";
            if (n.checkboxSupport) {
                n.selectedScopeProperty = n.selectedScopeProperty || "selectedItems";
                var u = i + "." + n.selectedProperty,
                    a = n.checkboxDisabledProperty,
                    f = "";
                a && (f = ' data-ng-disabled="' + i + "." + a + '" '),
                    o = '<td width="10"><input type="checkbox" ' + f + ' data-ng-model="' + u + '" ng-change="changeSelection({data: ' + i + '})"/></td>'
            }
            return t.forEach(e, function (e) {
                var t = l(e, i, r),
                    n = e.cssProperty ? ' class="' + e.cssProperty + '" ' : "";
                o += "<td" + n + ">" + t + "</td>"
            }),
            '<tbody><tr text-editor-trigger-target data-ng-if="!loadingState" ' + r + ' data-ng-repeat="' + i + " in " + s + '">' + o + "</tr></tbody>"
        }

        function l(e, t, n) {
            var r = "",
                i = e.filter,
                s = e.field,
                o = t + "." + s,
                u = e.filedDirective || e.fieldDirective;
            if (u) return u;
            if (s) {
                i && (o += "|" + i);
                if (e.truncateText) {
                    var a = e.truncateTextLegnth || e.truncateTextLength,
                        f = a ? " text-length=" + a : "",
                        l = e.copyText ? " copy-text=" + e.copyText : "",
                        c = e.tooltipPlacement ? " tooltip-placement=" + e.tooltipPlacement : "";
                    r = '<span aliyun-truncate-text source-text="{{' + o + '}}" ' + f + l + c + "></span>"
                } else if (e.bindable == 1 || n == 0) e.htmlField ? r = "<span ng-bind-html=" + o + " ></span>" : r = "{{" + o + "}}";
                else {
                    var h = e.htmlField ? "bo-html" : "bo-text";
                    r = "<span " + h + '="' + o + '"></span>'
                }
            }
            return r
        }

        function c(e) {
            var n = {};
            t.extend(n, e.pageInfo),
                t.extend(n, e.filterParams);
            var r = e.searchParams;
            if (r && r.filterSearchData) r.filterSearchData.forEach(function (e) {
                var r = {};
                e.key && e.value && (r[e.key] = e.value),
                    t.extend(n, r)
            });
            else if (r) {
                var i = {};
                r.key && r.value && (i[r.key] = r.value),
                    t.extend(n, i)
            }
            return n
        }

        var r = n.getI18n("directives.simpleGrid");
        e.directive("aliyunSimpleGrid", ["$compile", "$filter", function (e, n) {
            return {
                restrict: "A",
                scope: {
                    columns: "=",
                    store: "=",
                    config: "=",
                    paginationInfo: "=",
                    loadingState: "=",
                    renderTable: "&",
                    searchPreHandler: "&",
                    selectionChange: "&"
                },
                templateUrl: "scripts/template/simpleGrid.html",
                controller: ["$scope", function (e) {
                    e.initTableRequestSend = !1,
                        e._searchPreHandler = function (n, r) {
                            t.isFunction(e.searchPreHandler) && e.searchPreHandler({
                                data: {
                                    data: n,
                                    scope: e,
                                    isTableFilter: r
                                }
                            })
                        },
                        e.changeSelectionAll = function () {
                            var n = e.config,
                                r = n.selectedProperty,
                                i = n.checkboxDisabledProperty,
                                s = e.tableState.selectAll,
                                o = [];
                            t.forEach(e.store, function (e, t) {
                                if (!i || !e[i]) e[r] = s,
                                s && o.push(e)
                            }),
                                e.selectionChangeHandler(o)
                        },
                        e.clientSortHandler = function (r) {
                            e.reserves = !e.reserves;
                            var i;
                            t.forEach(e.columns, function (e) {
                                e && e.field && e.field == r && (i = e)
                            });
                            if (i && t.isFunction(i.sortFunction)) i.sortFunction.call(null, e.store, r, e.reserves);
                            else {
                                var s = n("orderBy");
                                e.store = s(e.store, r, e.reserves)
                            }
                        },
                        e.serverSortHandler = function (n) {
                            var r;
                            t.forEach(e.columns, function (e) {
                                e && e.field && e.field == n && (r = e)
                            }),
                            r && (r.asc = !r.asc),
                                e.updateList(!1, {
                                    sortField: n,
                                    isAsc: r.asc
                                })
                        },
                        e.changeSelection = function (n) {
                            var r = e.config.selectedProperty;
                            n[r] = !n[r];
                            var i, s = !0,
                                o = [];
                            t.forEach(e.store, function (e, t) {
                                var n = e[r];
                                t == 0 && (i = n),
                                i != n && (s = !1),
                                n && o.push(e)
                            }),
                                s == 1 ? e.tableState.selectAll = i : e.tableState.selectAll = !1,
                                e.selectionChangeHandler(o)
                        },
                        e.selectionChangeHandler = function (t) {
                            var n = e.config.selectedScopeProperty;
                            e[n] = t,
                                e.config.selectedItems = t,
                                e.selectionChange({
                                    data: t
                                })
                        },
                        e.refreshCurrentView = function () {
                            var t = e.config.selectedScopeProperty;
                            e[t] = [],
                                e.initSearchAndFilterCondition(),
                                e.updateList()
                        },
                        e.initSearchAndFilterCondition = function () {
                            e.clearFilterCondition(),
                                e.searchParams = {}
                        },
                        e.clearFilterCondition = function () {
                            e.filterItemMap = {},
                                e.filterParams = {}
                        }
                }],
                link: function (n, o, u) {
                    n.tableState = {
                        selectAll: !1
                    },
                        n.initSearchAndFilterCondition(),
                        n.changeTheadFilter = function (e) {
                            n._searchPreHandler(e, !0);
                            var t = e.filterField,
                                r = e.item;
                            n.filterItemMap[t] = r;
                            var i = n.filterParams || {};
                            t && (r.id == "all" ? delete i[t] : i[t] = r.id),
                                n.filterParams = i,
                                n.paginationInfo.page = 1,
                                n.searchParams = {},
                                n.updateList()
                        },
                        n.pageChanged = function (e) {
                            n.paginationInfo.page = e,
                                n.selectionChangeHandler([]);
                            var t = n.config;
                            t.serverSort && t.sortSetting ? n.updateList(!1, t.sortSetting, "pageChanged") : n.updateList(undefined, undefined, "pageChanged")
                        },
                        n.searchAction = function (e) {
                            n._searchPreHandler(e, !1),
                            n.config.paginationSupport && n.paginationInfo && (n.paginationInfo.page = 1),
                                n.clearFilterCondition(),
                                n.searchParams = e,
                                n.updateList(undefined, undefined, "search")
                        },
                        n.updateList = function (e, t, r) {
                            e && (n.initTableRequestSend = !0);
                            var i = n.config,
                                s = n.paginationInfo,
                                o = {};
                            i.paginationSupport && (s == undefined && (s = i.paginationInfo), n.maxSize = i.paginationInfo.maxSize || 3, o.pageInfo = {
                                pageSize: s.pageSize,
                                currentPage: s.page
                            }),
                            i.filterItems && (o.filterParams = n.filterParams),
                            i.searchItems && (o.searchParams = n.searchParams),
                            i.filterSearchItems && (o.searchParams = n.searchParams),
                            t && (i.sortSetting = t),
                                n.ajaxOptions = c(o),
                                n.renderTable({
                                    data: {
                                        params: c(o),
                                        isInitTableRequest: e,
                                        sortSetting: t,
                                        actionType: r,
                                        orginalParams: o
                                    }
                                })
                        },
                        n.updateSelectionExternal = function (e) {
                            n.selectionChangeHandler(e)
                        },
                        n.$watchCollection("[config, columns]", function (u) {
                            if (u && u[0]) {
                                var a = u[0];
                                a.filterItems && (n.filterItems = a.filterItems),
                                a.searchItems && (n.searchItems = a.searchItems),
                                a.filterSearchItems && (n.searchItems = [a.filterSearchItems.searchItem], n.filterKey = a.filterSearchItems.filterKey, n.filterList = a.filterSearchItems.filterList, n.filterSelect = a.filterSearchItems.filterSelect),
                                a.preSelectionFilter && (n.filterParams = a.preSelectionFilter),
                                a.preSelectionSearch && (n.searchParams = a.preSelectionSearch),
                                a.checkboxSupport && a.selectedProperty == undefined && (a.selectedProperty = "selected"),
                                a.clientSort == 1 && a.serverSort == 1 && (a.serverSort = !1),
                                    a.refreshCurrentView = n.refreshCurrentView,
                                t.isFunction(a.updateSelectionExternal) || (a.updateSelectionExternal = n.updateSelectionExternal);
                                var f = u[1],
                                    l;
                                a.noneDataInfoDirective ? l = '<div class="simple-grid-none-data text-center" ' + a.noneDataInfoDirective + ' ajax-options="ajaxOptions"  data-ng-if="showNoneDataInfoTip && !loadingState" ></div>' : l = '<div class="simple-grid-none-data "  aliyun-none-data-info-tip  data-ng-if="showNoneDataInfoTip && !loadingState"><span class="margin-left" ng-bind-html="noneDataInfoMessage"></span></div>',
                                    l = t.element(l),
                                    o.find(".simple-grid-none-data-wrap").html(l),
                                    n.noneDataInfoMessage = r.i18n("noneDataInfoMessage"),
                                    n.paginationSupport = a.paginationSupport;
                                var c = i(a, o),
                                    h = s(f, a);
                                o.find(".gridSection").html(h),
                                    e(o.contents())(n),
                                n.initTableRequestSend == 0 && n.updateList(!0)
                            }
                        }),
                        n.$watchCollection("[store, paginationInfo]", function (e) {
                            if (e) {
                                var t = e[0] || [];
                                n.showNoneDataInfoTip = t.length == 0 ? !0 : !1,
                                    n.tableState.selectAll = !1;
                                var r = e[1];
                                t.length == 0 && r && r.page > 1 && (n.paginationInfo.page -= 1, n.updateList())
                            }
                        })
                }
            }
        }])
    }),
    define("lcc/bootstrap", ["angular", "app", "lcc/initConfig", "lcc/controllers/_base", "lcc/states/_base", "lcc/services/_base", "lcc/directives/_base", "lcc/filters/_base", "common/services/_base", "common/services/topicService", "common/directives/_base", "common/directives/tooltip", "common/directives/simpleGrid"], function (e) {
        "use strict";
        e.element(document).ready(function () {
            e.bootstrap(document, ["lccConsole"])
        })
    });