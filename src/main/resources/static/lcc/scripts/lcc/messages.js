define("common/nls/messages", [], function () {
    var e = {
        validator: {
            "validator.lb.char2to22": "只允许输入2到22个字符",
            "validator.lb.char2to15": "只允许输入2到15个字符",
            "validator.lb.preventHttpText": "不能以http://或https://开头。",
            "validator.lb.nameValidator": '以大小写字母、数字和中文开头，不支持字符@/:="<>{[]}和空格。'
        },
        sidebar: {
            "common.directive.sidebar.backToOld": "将回旧版",
            "common.directive.sidebarManage.pickedArea": "已选区域: ",
            "common.directive.sidebarManage.allItems": "可选区域: ",
            "common.directive.sidebarManage.errorTooltip": "请至少选择一个快捷入口"
        },
        "services.aliyunRiskService": {
            "break.title": "终止操作",
            "break.message": "检测到存在严重安全风险，该操作无法执行，请联系客服。",
            "verify.sms.title": "手机验证",
            "verify.sms.detailDescription": "您绑定的手机：",
            "verify.sms.changeDescription": "更换手机",
            "verify.sms.bindDescription": "未检测到手机号码,为了保障您的账户安全，请先设置手机绑定。",
            "verify.email.title": "邮箱验证",
            "verify.email.detailDescription": "您绑定的邮箱：",
            "verify.email.changeDescription": "更换邮箱",
            "verify.email.bindDescription": "未检测到邮箱,为了保障您的账户安全，请先设置邮箱绑定。",
            "verify.ga.title": "MFA验证",
            "verify.ga.detailDescription": "验证虚拟MFA设备：",
            "verify.ga.changeDescription": "解除MFA绑定",
            "verify.errorMsg": "校验码错误,请重新输入",
            "set.title": "设置",
            "set.message": "请到新开窗口完成设置！",
            "set.button.yes": "已完成设置",
            "set.button.no": "遇到问题",
            "verifyType.title": "设置验证方式",
            "verifyType.article": "系统没有检测到您的验证方式!",
            "verifyType.message": "为了保障您的账户安全，请先设置验证方式。",
            "verifyType.confirm": "前往设置",
            verifyCode: "校验码：",
            "verifyCode.required": "校验码不能为空。",
            "verifyCode.invalid": "校验码格式错误。",
            "verifyCode.resend": "秒后重发",
            "verifyCode.send": "点击获取",
            "close.message": "您的操作已取消。"
        },
        "services.aliyunHttpHandler": {
            "msg.timeoutTip.partOne": "您当前的会话已超时，请",
            "msg.timeoutTip.partTwo": "重新登录",
            "msg.response.error": "当前请求失败，建议您刷新页面或者稍后重试。"
        },
        selector: {
            "default.message.load": "正在载入,请稍候...",
            "default.message.error": "载入失败！",
            "default.message.retry": "请点击重试",
            "default.message.empty": "暂无数据",
            "default.message.more": "载入更多"
        },
        "modelSystem.simpleForm": {
            required: "不能为空"
        },
        "modelSystem.msChart": {
            dateFormat: "%Y年%m月%d日 %H:%M:%S"
        },
        "modelSystem.itemGrid": {
            successText: "完成"
        },
        "modelSystem.inlineCommand": {
            actionConfirm: "您确定要{0}吗？"
        },
        "directives.simpleGrid": {
            noneDataInfoMessage: "没有查询到符合条件的记录"
        },
        "directives.simpleForm": {
            select: "请选择"
        },
        "directives.simpleChart": {
            "lang.loading": "正在加载...",
            "lang.noData": "当前暂无监控数据",
            "lang.resetZoom": "重置"
        },
        "directives.searchBar": {
            week: "周",
            today: "今天",
            clear: "清除",
            close: "确定",
            search: "搜索"
        },
        "directives.guide": {
            dialog_title: "新功能引导",
            dialog_detail: "查看详情",
            dialog_ignore: "暂时忽略",
            dialog_noDisplay: "不再显示"
        },
        "directives.datetimePicker": {
            "datepicker.choose.range": "选择时间范围：",
            "datepicker.choose.startDate": "开始时间：",
            "datepicker.choose.endDate": "结束时间：",
            "datepicker.today": "今天",
            "datepicker.days": "天"
        },
        "directives.base": {
            "msg.save.fail": "保存失败，请重试",
            "msg.request.exception": "请求异常，请重试"
        },
        "directives.aliyunConsolePagination": {
            total: "共有",
            item: "条",
            perPage: "每页显示："
        },
        "directives.aliyunConsoleOperationAudit": {
            succeeded: "成功",
            failed: "失败",
            "undefined": "未设置"
        },
        "directives.aliyunClipCopy": {
            copy: "复制",
            copied: "已复制"
        },
        "cons.products": {
            ecs: "云服务器",
            slb: "负载均衡",
            vpc: "专有网络",
            ess: "弹性伸缩服务",
            "group.ec": "弹性计算",
            rds: "云数据库",
            ots: "开放结构化数据服务",
            ocs: "开放缓存服务",
            drds: "分布式关系型数据库",
            "group.database": "数据库",
            oss: "开放存储服务",
            cdn: "内容分发网络",
            oas: "开放归档服务",
            kvstore: "键值存储",
            "group.storageAndCdn": "存储与CDN",
            odps: "开放数据处理服务",
            dpc: "采云间",
            ads: "分析数据库服务",
            "group.largeScaleComputing": "大规模计算",
            ace: "云引擎",
            sls: "简单日志服务",
            mqs: "消息队列服务",
            opensearch: "开放搜索服务",
            pts: "性能测试服务",
            ons: "开放消息服务",
            edas: "企业级分布式应用服务",
            "group.appService": "应用服务",
            yundun: "云盾",
            yunjiankong: "云监控",
            "group.securityAndManagement": "安全与管理",
            ticket: "我的工单",
            "ticket.open": "提交工单",
            "group.technicalSupport": "工单服务",
            beian: "备案管理",
            faq: "新版FAQ",
            help: "帮助中心",
            docs: "文档中心",
            forum: "论坛",
            "group.help": "帮助",
            "notificationLink.text.nomsg": "您暂时没有公告消息",
            "notificationLink.text.more": "查看更多",
            "notificationLink.title": "站内消息通知",
            "productLink.text": "产品与服务",
            "searchLink.text": "搜索",
            "searchLink.placeholder": "搜索",
            "homeLink.text": "管理控制台",
            net: "去万网用户中心",
            signOut: "退出",
            "product.title": "云产品",
            "product.dialogTitle": "自定义云产品快捷入口",
            "product.popover": "自定义云产品",
            "service.title": "用户中心",
            "service.dialogTitle": "自定义用户中心快捷入口",
            "service.popover": "自定义用户中心",
            "service.account": "帐户管理",
            "service.expenseCenter": "费用中心",
            "service.renew": "续费管理",
            "service.msc": "消息中心",
            "service.workorder": "工单管理",
            "service.bsn": "备案管理",
            "qrcodeLink.text": "手机版",
            "qrcodeLink.title": "扫码下载手机阿里云",
            "helpLink.text": "帮助",
            "helpLink.title": "文档与帮助",
            "customHelpLink.text": "帮助与文档",
            "customHelpLink.title": "帮助与文档",
            switchRole: "切换角色",
            exitSwitchedRole: "返回登录身份",
            currentName: "当前身份",
            currentAlias: "企业别名",
            loginName: "登录身份",
            loginAlias: "企业别名",
            role: "角色",
            subaccount: "子账号"
        },
        commonController: {
            "dialog.title": "错误提示",
            "dialog.btn.ok": "确定",
            defaultErrorMsg: "当前请求失败，建议您刷新页面或者稍后重试。"
        },
        common: {
            "common.lb.confirm": "确定",
            "common.lb.cancel": "取消"
        },
        chart: {
            "config.tip.noData": "暂无数据"
        },
        aliyunValidator: {
            "aliyunValidator.lb.required": "该选项不能为空",
            "aliyunValidator.lb.maxlength": "该选项输入值长度不能大于{maxlength}",
            "aliyunValidator.lb.minlength": "该选项输入值长度不能小于{minlength}",
            "aliyunValidator.lb.email": "输入邮件的格式不正确",
            "aliyunValidator.lb.repeat": "两次输入不一致",
            "aliyunValidator.lb.pattern": "该选项输入格式不正确",
            "aliyunValidator.lb.number": "必须输入数字",
            "aliyunValidator.lb.uniquecheck": "该输入值已经存在，请重新输入"
        },
        aliyunSetReleaseTimeSetting: {
            "aliyunSetReleaseTimeSetting.lb.releaseAction": "释放行为：",
            "aliyunSetReleaseTimeSetting.lb.releaseSetTime": "设置自动释放：",
            "aliyunSetReleaseTimeSetting.lb.releaseDate": "释放日期：",
            "aliyunSetReleaseTimeSetting.lb.releaseTime": "释放时间：",
            "aliyunSetReleaseTimeSetting.lb.releaseNowValue": "立即释放",
            "aliyunSetReleaseTimeSetting.lb.releaseSetTimeValue": "定时释放",
            "aliyunSetReleaseTimeSetting.lb.releaseTimeError": "释放时间不能小于当前时间",
            "aliyunSetReleaseTimeSetting.lb.releaseTimeInvalidError": "请输入正确的时间",
            "aliyunSetReleaseTimeSetting.lb.tipTitle": "温馨提示",
            "aliyunSetReleaseTimeSetting.lb.tipReleaseTime": "系统执行释放时间是每整点和每半点，但系统会按您设置的释放时间停止计费。",
            "aliyunSetReleaseTimeSetting.lb.tipReleaseTimeZone": "设置的时间为北京时间"
        },
        aliyunInstanceSelector: {
            "aliyunInstanceSelector.btn.confirm": "确定",
            "aliyunInstanceSelector.lb.warning": "警告信息",
            "aliyunInstanceSelector.lb.placeholder": "请填写实例ID",
            "aliyunInstanceSelector.lb.instanceName": "实例名称：",
            "aliyunInstanceSelector.lb.noMatch": "没有找到实例"
        },
        $locale: {
            DATETIME_FORMATS: {
                AMPMS: ["上午", "下午"],
                DAY: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
                MONTH: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                SHORTDAY: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
                SHORTMONTH: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                fullDate: "y年M月d日EEEE",
                longDate: "y年M月d日",
                medium: "yyyy-M-d ah:mm:ss",
                mediumDate: "yyyy-M-d",
                mediumTime: "ah:mm:ss",
                "short": "yy-M-d ah:mm",
                shortDate: "yy-M-d",
                shortTime: "ah:mm"
            },
            NUMBER_FORMATS: {
                CURRENCY_SYM: "¥",
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [{
                    gSize: 3,
                    lgSize: 3,
                    macFrac: 0,
                    maxFrac: 3,
                    minFrac: 0,
                    minInt: 1,
                    negPre: "-",
                    negSuf: "",
                    posPre: "",
                    posSuf: ""
                },
                    {
                        gSize: 3,
                        lgSize: 3,
                        macFrac: 0,
                        maxFrac: 2,
                        minFrac: 2,
                        minInt: 1,
                        negPre: "(¤",
                        negSuf: ")",
                        posPre: "¤",
                        posSuf: ""
                    }]
            },
            id: "zh-cn"
        }
    };
    return e
});