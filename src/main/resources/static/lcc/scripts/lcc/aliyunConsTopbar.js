define("common/cons/aliyunConsTopbar", [], function () {
    var e = {
            categoryInfo: [{
                text: "弹性计算",
                products: [{
                    id: "ecs",
                    "short": "ECS",
                    text: "云服务器",
                    href: {
                        aliyun: "http://console.aliyun.com/ecs/index.htm",
                        jbp: "http://jbp.console.aliyun.com/ecs/index.htm"
                    },
                    target: "_self",
                    className: "icon-ecs",
                    workorderId: 12
                },
                    {
                        id: "slb",
                        "short": "SLB",
                        text: "负载均衡",
                        href: {
                            aliyun: "http://slb.console.aliyun.com",
                            jbp: "http://slb.jbp.console.aliyun.com"
                        },
                        target: "_self",
                        className: "icon-slb",
                        workorderId: 86
                    }]
            },
                {
                    text: "数据库",
                    products: [{
                        id: "rds",
                        text: "关系型数据库",
                        "short": "RDS",
                        href: {
                            aliyun: "http://rds.console.aliyun.com",
                            jbp: "http://rds.jbp.console.aliyun.com"
                        },
                        target: "_self",
                        className: "icon-rds",
                        workorderId: 10
                    },
                        {
                            id: "ots",
                            "short": "OTS",
                            text: "开放结构化数据服务",
                            href: "http://ots.console.aliyun.com",
                            target: "_self",
                            className: "icon-ots",
                            workorderId: 29
                        },
                        {
                            id: "ocs",
                            "short": "OCS",
                            text: "开放缓存服务",
                            href: "http://ocs.console.aliyun.com/",
                            target: "_self",
                            className: "icon-ocs",
                            workorderId: 91
                        }]
                },
                {
                    text: "存储与CDN",
                    products: [{
                        id: "oss",
                        "short": "OSS",
                        text: "开放存储服务",
                        href: {
                            aliyun: "http://oss.console.aliyun.com/console/index",
                            jbp: "http://oss.jbp.console.aliyun.com/console/index"
                        },
                        target: "_self",
                        className: "icon-oss",
                        workorderId: 22
                    },
                        {
                            id: "cdn",
                            "short": "CDN",
                            text: "内容分发网络",
                            href: "http://cdn.console.aliyun.com/",
                            target: "_self",
                            className: "icon-cdn",
                            workorderId: 92
                        },
                        {
                            className: "icon-oas",
                            href: "http://oas.console.aliyun.com/console/index",
                            id: "oas",
                            "short": "OAS",
                            target: "_self",
                            text: "开放归档服务",
                            workorderId: 1211
                        }]
                },
                {
                    text: "大规模计算",
                    products: [{
                        id: "odps",
                        "short": "ODPS",
                        text: "开放数据处理服务",
                        href: "http://odps.console.aliyun.com/console/index",
                        target: "_self",
                        className: "icon-odps",
                        workorderId: 47
                    }]
                },
                {
                    text: "应用服务",
                    products: [{
                        id: "ace",
                        text: "云引擎",
                        "short": "ACE",
                        href: "http://ace.console.aliyun.com",
                        target: "_self",
                        className: "icon-ace",
                        workorderId: 18
                    },
                        {
                            id: "sls",
                            "short": "SLS",
                            text: "简单日志服务",
                            href: "http://sls.console.aliyun.com",
                            target: "_self",
                            className: "icon-sls",
                            workorderId: 1210
                        },
                        {
                            className: "icon-mqs",
                            href: "http://mqs.console.aliyun.com",
                            id: "mqs",
                            "short": "MQS",
                            target: "_self",
                            text: "消息队列服务",
                            workorderId: 1212
                        },
                        {
                            className: "icon-opensearch",
                            href: "http://opensearch.console.aliyun.com/",
                            id: "opensearch",
                            "short": "",
                            target: "_self",
                            text: "开放搜索服务",
                            workorderId: 1213
                        },
                        {
                            className: "icon-pts",
                            href: "http://pts.aliyun.com/aliyun",
                            id: "pts",
                            "short": "PTS",
                            target: "_self",
                            text: "性能测试服务",
                            workorderId: 1216
                        }]
                },
                {
                    text: "安全与管理",
                    products: [{
                        id: "yundun",
                        "short": "",
                        text: "云盾",
                        href: "http://console.aliyun.com/yundun/",
                        target: "_self",
                        className: "icon-yundun",
                        workorderId: 80
                    },
                        {
                            id: "jiankong",
                            "short": "",
                            text: "云监控",
                            href: "http://console.aliyun.com/jiankong/",
                            target: "_self",
                            className: "icon-yunjiankong",
                            workorderId: 90
                        }]
                }],
            link: {
                userLinks: [{
                    text: "用户中心",
                    href: "http://i.aliyun.com/",
                    target: "_blank"
                },
                    {
                        text: "我的订单",
                        href: "http://i.aliyun.com/order",
                        target: "_blank"
                    },
                    {
                        text: "账户管理",
                        href: "http://i.aliyun.com/amount",
                        target: "_blank"
                    },
                    {
                        text: "退出",
                        href: "https://account.aliyun.com/logout/logout.htm?oauth_callback=",
                        target: "_self"
                    }],
                helpLink: {
                    text: "提交工单",
                    href: "http://workorder.aliyun.com/add.htm?productId=",
                    hrefIndex: "http://workorder.aliyun.com/addIndex.htm",
                    target: "_blank"
                },
                logoLink: {
                    href: "http://www.aliyun.com",
                    target: "_blank",
                    imgLink: "http://www.aliyun.com/favicon.ico"
                },
                homeLink: {
                    href: {
                        aliyun: "http://console.aliyun.com/index.html?noredirect",
                        jbp: "http://jbp.console.aliyun.com/index.html?noredirect"
                    },
                    text: "控制台首页",
                    target: "_self"
                },
                accessKeysLink: {
                    text: "AccessKeys",
                    href: "http://i.aliyun.com/access_key/",
                    target: "_blank"
                },
                searchLink: {
                    text: "全局搜索",
                    href: "http://www.aliyun.com/s?k="
                }
            }
        },
        t = {
            categoryInfo: [{
                products: [{
                    className: "icon-ecs",
                    href: "http://console.aliyun.com/ecs/index.htm",
                    id: "ecs",
                    "short": "ECS",
                    spm: 1,
                    status: !0,
                    target: "_self",
                    text: "云服务器",
                    workorderId: "12"
                },
                    {
                        className: "icon-slb",
                        href: "http://slb.console.aliyun.com",
                        id: "slb",
                        "short": "SLB",
                        spm: 2,
                        status: !0,
                        target: "_self",
                        text: "负载均衡",
                        workorderId: "86"
                    }],
                text: "弹性计算"
            },
                {
                    products: [{
                        className: "icon-rds",
                        href: "http://rds.console.aliyun.com",
                        id: "rds",
                        "short": "RDS",
                        spm: 3,
                        status: !0,
                        target: "_self",
                        text: "关系型数据库",
                        workorderId: "10"
                    },
                        {
                            className: "icon-ots",
                            href: "http://ots.console.aliyun.com",
                            id: "ots",
                            "short": "OTS",
                            spm: 6,
                            status: !0,
                            target: "_self",
                            text: "开放结构化数据服务",
                            workorderId: "29"
                        },
                        {
                            className: "icon-ocs",
                            href: "http://ocs.console.aliyun.com/",
                            id: "ocs",
                            "short": "OCS",
                            spm: 7,
                            status: !0,
                            target: "_self",
                            text: "开放缓存服务",
                            workorderId: "91"
                        }],
                    text: "数据库"
                },
                {
                    products: [{
                        className: "icon-oss",
                        href: "http://oss.console.aliyun.com/console/index",
                        id: "oss",
                        "short": "OSS",
                        spm: 4,
                        status: !0,
                        target: "_self",
                        text: "开放存储服务",
                        workorderId: "22"
                    },
                        {
                            className: "icon-cdn",
                            href: "http://cdn.console.aliyun.com/",
                            id: "cdn",
                            "short": "CDN",
                            spm: 5,
                            status: !0,
                            target: "_self",
                            text: "内容分发网络",
                            workorderId: "92"
                        },
                        {
                            className: "icon-oas",
                            href: "http://oas.console.aliyun.com/console/index",
                            id: "oas",
                            "short": "OAS",
                            spm: 14,
                            status: !0,
                            target: "_self",
                            text: "开放归档服务",
                            workorderId: "1211"
                        }],
                    text: "存储与CDN"
                },
                {
                    products: [{
                        className: "icon-odps",
                        href: "http://odps.console.aliyun.com/console/index",
                        id: "odps",
                        "short": "ODPS",
                        spm: 8,
                        status: !0,
                        target: "_self",
                        text: "开放数据处理服务",
                        workorderId: "47"
                    }],
                    text: "大规模计算"
                },
                {
                    products: [{
                        className: "icon-ace",
                        href: "http://ace.console.aliyun.com",
                        id: "ace",
                        "short": "ACE",
                        spm: 9,
                        status: !0,
                        target: "_self",
                        text: "云引擎",
                        workorderId: "18"
                    },
                        {
                            className: "icon-sls",
                            href: "http://sls.console.aliyun.com",
                            id: "sls",
                            "short": "SLS",
                            spm: 12,
                            status: !0,
                            target: "_self",
                            text: "简单日志服务",
                            workorderId: "1210"
                        },
                        {
                            className: "icon-mqs",
                            href: "http://mqs.console.aliyun.com",
                            id: "mqs",
                            "short": "MQS",
                            spm: 13,
                            status: !1,
                            target: "_self",
                            text: "消息队列服务",
                            workorderId: "1212"
                        },
                        {
                            className: "icon-opensearch",
                            href: "http://opensearch.console.aliyun.com",
                            id: "opensearch",
                            "short": "",
                            spm: 15,
                            status: !1,
                            target: "_self",
                            text: "开放搜索服务",
                            workorderId: "1213"
                        },
                        {
                            className: "icon-pts",
                            href: "http://pts.aliyun.com/aliyun",
                            id: "pts",
                            "short": "PTS",
                            spm: 16,
                            status: !0,
                            target: "_self",
                            text: "性能测试服务",
                            workorderId: "1216"
                        }],
                    text: "应用服务"
                },
                {
                    products: [{
                        className: "icon-yundun",
                        href: "http://yundun.console.aliyun.com/",
                        id: "yundun",
                        "short": "",
                        spm: 10,
                        status: !0,
                        target: "_self",
                        text: "云盾",
                        workorderId: "80"
                    },
                        {
                            className: "icon-yunjiankong",
                            href: "http://console.aliyun.com/jiankong/",
                            id: "jiankong",
                            "short": "",
                            spm: 11,
                            status: !0,
                            target: "_self",
                            text: "云监控",
                            workorderId: "90"
                        }],
                    text: "安全与管理"
                }],
            link: {
                accessKeysLink: {
                    href: "http://i.aliyun.com/access_key/",
                    target: "_blank",
                    text: "AccessKeys"
                },
                helpLink: {
                    href: "http://workorder.aliyun.com/add.htm?productId=",
                    hrefIndex: "http://workorder.aliyun.com/addIndex.htm",
                    target: "_blank",
                    text: "提交工单"
                },
                helpLinks: {
                    text: "管理工单",
                    links: [{
                        href: "http://workorder.aliyun.com/",
                        target: "_blank",
                        text: "我的工单"
                    },
                        {
                            href: "http://workorder.aliyun.com/add.htm?productId=",
                            hrefIndex: "http://workorder.aliyun.com/addIndex.htm",
                            target: "_blank",
                            text: "提交工单"
                        }]
                },
                homeLink: {
                    href: "http://console.aliyun.com/index.html?noredirect",
                    target: "_self",
                    text: "控制台首页"
                },
                logoLink: {
                    href: "http://www.aliyun.com",
                    imgLink: "http://www.aliyun.com/favicon.ico",
                    target: "_blank"
                },
                notificationLink: {
                    blankText: "您暂时没有公告消息",
                    href: "http://bbs.aliyun.com/thread/103.html?type=907&type=907#tabA",
                    text: "查看更多",
                    title: "公告"
                },
                productLink: {
                    text: "产品与服务"
                },
                searchLink: {
                    href: "http://www.aliyun.com/s?k=",
                    text: "全局搜索"
                },
                userLinks: [{
                    href: "http://i.aliyun.com/",
                    target: "_blank",
                    text: "用户中心"
                },
                    {
                        href: "http://i.aliyun.com/order",
                        target: "_blank",
                        text: "我的订单"
                    },
                    {
                        href: "http://i.aliyun.com/amount",
                        target: "_blank",
                        text: "账户管理"
                    },
                    {
                        href: "https://account.aliyun.com/logout/logout.htm?oauth_callback=",
                        target: "_self",
                        text: "退出"
                    }]
            }
        };
    return {
        ALPHA_CONS: e,
        BETA_CONS: t
    }
});