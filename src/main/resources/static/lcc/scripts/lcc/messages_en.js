define("common/nls/messages_en", [], function () {
    var e = {
        validator: {
            "validator.lb.char2to22": "Only allowed to enter 2 to 22 characters.",
            "validator.lb.char2to15": "Only allowed to enter 2 to 15 characters.",
            "validator.lb.preventHttpText": "Value cannot start with http:// or https://.",
            "validator.lb.nameValidator": 'Should begin with upper and lower case letter or Chinese. Space and characters of @/:="<>{[]} are not supported.'
        },
        sidebar: {
            "common.directive.sidebar.backToOld": "Old",
            "common.directive.sidebarManage.pickedArea": "Selected: ",
            "common.directive.sidebarManage.allItems": "Selectable Entrances: ",
            "common.directive.sidebarManage.errorTooltip": "Please choose at least one entrance."
        },
        "services.aliyunRiskService": {
            "break.title": "Termination",
            "break.message": "Detecting the presence of a serious security risk, the operation can not be performed, please contact customer service.",
            "verify.sms.title": "Phone Verification",
            "verify.sms.detailDescription": "Phone Number:",
            "verify.sms.changeDescription": "Replace",
            "verify.sms.bindDescription": "The Phone Number is not detected, in order to protect your account security, please set.",
            "verify.email.title": "Email Verification",
            "verify.email.detailDescription": "Email Address:",
            "verify.email.changeDescription": "Replace",
            "verify.email.bindDescription": "The Email Address is not detected, in order to protect your account security, please set.",
            "verify.ga.title": "MFA Verification",
            "verify.ga.detailDescription": "MFA Verification:",
            "verify.ga.changeDescription": "Lift MFA binding",
            "verify.errorMsg": "Verification code error, please try again.",
            "set.title": "Setting",
            "set.message": "Go to the newly opened window to complete the setting！",
            "set.button.yes": "Completed",
            "set.button.no": "Have problems",
            "verifyType.title": "Set Authentication Type",
            "verifyType.article": "The system does not detect your authentication type!",
            "verifyType.message": "To protect your account security, please set the authentication type.",
            "verifyType.confirm": "Go to Settings",
            verifyCode: "Verification code:",
            "verifyCode.required": "Verification code can not be empty.",
            "verifyCode.invalid": "Verification code has wrong format.",
            "verifyCode.resend": "second resend",
            "verifyCode.send": "Send",
            "close.message": "Your operation has been canceled."
        },
        "services.aliyunHttpHandler": {
            "msg.timeoutTip.partOne": "Your session is timeout, please ",
            "msg.timeoutTip.partTwo": "relogin",
            "msg.response.error": "request is failed, please refresh current page or try again later"
        },
        selector: {
            "default.message.load": "loading...",
            "default.message.error": "Loading data failed",
            "default.message.retry": "Click to try again",
            "default.message.empty": "No data",
            "default.message.more": "Load more data"
        },
        "modelSystem.simpleForm": {
            required: "Value of the field is required"
        },
        "modelSystem.msChart": {
            dateFormat: "%Y-%m-%d %H:%M:%S"
        },
        "modelSystem.itemGrid": {
            successText: "successfully"
        },
        "modelSystem.inlineCommand": {
            actionConfirm: "Are you sure you want to {0} ?"
        },
        "directives.simpleGrid": {
            noneDataInfoMessage: "Could not find any record that met the condition."
        },
        "directives.simpleForm": {
            select: "Please select an item"
        },
        "directives.simpleChart": {
            "lang.loading": "Loading...",
            "lang.noData": "No data yet.",
            "lang.resetZoom": "Reset Zoom"
        },
        "directives.searchBar": {
            week: "Week",
            today: "Today",
            clear: "Clear",
            close: "Close",
            search: "Search"
        },
        "directives.guide": {
            dialog_title: "Recent New Features",
            dialog_detail: "View Details",
            dialog_ignore: "Ignore",
            dialog_noDisplay: "No Longer Display"
        },
        "directives.datetimePicker": {
            "datepicker.choose.range": "Select Range: ",
            "datepicker.choose.startDate": "Start Time: ",
            "datepicker.choose.endDate": "End Time: ",
            "datepicker.today": "Today",
            "datepicker.days": "Days"
        },
        "directives.base": {
            "msg.save.fail": "Save failed, please try again later",
            "msg.request.exception": "request failed, please try again later"
        },
        "directives.aliyunConsolePagination": {
            total: "Total: ",
            item: " item(s)",
            perPage: "Per Page: "
        },
        "directives.aliyunConsoleOperationAudit": {
            succeeded: "succeeded",
            failed: "failed",
            "undefined": "undefined"
        },
        "directives.aliyunClipCopy": {
            copy: "Copy",
            copied: "Copied"
        },
        "cons.products": {
            ecs: "Elastic Compute Service",
            slb: "Server Load Balancer",
            vpc: "Virtual Private Cloud",
            ess: "Elastic Scaling Service",
            "group.ec": "Elastic Computing",
            rds: "Relational Database Service",
            ots: "Open Table Service",
            ocs: "Open Cache Service",
            drds: "Distribute Relational Database Service",
            "group.database": "Database",
            oss: "Open Storage Service",
            cdn: "Content Delivery Network",
            oas: "Open Archive Service",
            kvstore: "Key-Value Store",
            "group.storageAndCdn": "Storage & Content Delivery",
            odps: "Open Data Processing Service",
            dpc: "Data Process Center",
            ads: "Analytic Database Service",
            "group.largeScaleComputing": "Large Scale Computing",
            ace: "Aliyun Cloud Engine",
            sls: "Simple Log Service",
            mqs: "Message Queue Service",
            opensearch: "OpenSearch",
            pts: "Performance Test Service",
            ons: "Open Notification Service",
            edas: "Enterprise Distributed Application Service",
            "group.appService": "Application Service",
            yundun: "Cloud Security Service",
            yunjiankong: "Cloud Monitor System",
            "group.securityAndManagement": "Security & Management",
            ticket: "My Tickets",
            "ticket.open": "Open a new ticket",
            "group.technicalSupport": "Technical Support",
            beian: "Beian",
            faq: "FAQ",
            help: "Help",
            docs: "Docs",
            forum: "Forum",
            "group.help": "Help",
            "notificationLink.text.nomsg": "There's no messages for you",
            "notificationLink.text.more": "More >>",
            "notificationLink.title": "Notice",
            "productLink.text": "Products & Services",
            "searchLink.text": "Search",
            "searchLink.placeholder": "Search",
            "homeLink.text": "Home",
            net: "Net.cn Account Center",
            signOut: "Sign Out",
            "product.title": "Products",
            "product.dialogTitle": "Products Entrances Config",
            "product.popover": "Products Config",
            "service.title": "Services",
            "service.dialogTitle": "Services Entrances Config",
            "service.popover": "Services Config",
            "service.account": "Account",
            "service.expenseCenter": "Expense Center",
            "service.renew": "Renew",
            "service.msc": "Message",
            "service.workorder": "Workorder",
            "service.bsn": "Beian",
            "qrcodeLink.text": "APP",
            "qrcodeLink.title": "Scan QR code to download",
            "helpLink.text": "Help",
            "helpLink.title": "Docs & Help",
            "customHelpLink.text": "Help & Docs",
            "customHelpLink.title": "Help & Docs",
            switchRole: "SwitchRole",
            exitSwitchedRole: "ExitSwitchedRole",
            currentName: "C urrentName",
            currentAlias: "Alias",
            loginName: "Login Name",
            loginAlias: "Alias",
            role: "Role",
            subaccount: "Subaccount"
        },
        commonController: {
            "dialog.title": "Error",
            "dialog.btn.ok": "OK",
            defaultErrorMsg: "The request is failed, please refresh current page or try again later"
        },
        common: {
            "common.lb.confirm": "Confirm",
            "common.lb.cancel": "Cancel"
        },
        chart: {
            "config.tip.noData": "No data"
        },
        aliyunValidator: {
            "aliyunValidator.lb.required": "This field is required.",
            "aliyunValidator.lb.maxlength": "The length of the inputed value should not more than {maxlength}.",
            "aliyunValidator.lb.minlength": "The length of the inputed value should not less than {minlength}.",
            "aliyunValidator.lb.email": "Incorrect email format.",
            "aliyunValidator.lb.repeat": "The value of two fields are not same.",
            "aliyunValidator.lb.pattern": "The input value format is not correct.",
            "aliyunValidator.lb.number": "Number only.",
            "aliyunValidator.lb.uniquecheck": "The input value is already exist, please enter another value."
        },
        aliyunSetReleaseTimeSetting: {
            "aliyunSetReleaseTimeSetting.lb.releaseAction": "Release Action: ",
            "aliyunSetReleaseTimeSetting.lb.releaseSetTime": "Auto-release Setting: ",
            "aliyunSetReleaseTimeSetting.lb.releaseDate": "Release Date: ",
            "aliyunSetReleaseTimeSetting.lb.releaseTime": "Release Time: ",
            "aliyunSetReleaseTimeSetting.lb.releaseNowValue": "Release Now",
            "aliyunSetReleaseTimeSetting.lb.releaseSetTimeValue": "Timed Release",
            "aliyunSetReleaseTimeSetting.lb.releaseTimeError": "Release time cannot be earlier than the current time.",
            "aliyunSetReleaseTimeSetting.lb.releaseTimeInvalidError": "Please enter the correct time.",
            "aliyunSetReleaseTimeSetting.lb.tipTitle": "Note: ",
            "aliyunSetReleaseTimeSetting.lb.tipReleaseTime": "The time for system to execute release is every hour and every half hour, but the system will stop billing according to the setted release time.",
            "aliyunSetReleaseTimeSetting.lb.tipReleaseTimeZone": "The setted time is Beijing Time"
        },
        aliyunInstanceSelector: {
            "aliyunInstanceSelector.btn.confirm": "OK",
            "aliyunInstanceSelector.lb.warning": "Warning",
            "aliyunInstanceSelector.lb.placeholder": "please enter the instanceId",
            "aliyunInstanceSelector.lb.instanceName": "Instance Name: ",
            "aliyunInstanceSelector.lb.noMatch": "No data was found"
        },
        $locale: {
            id: "en-us",
            NUMBER_FORMATS: {
                DECIMAL_SEP: ".",
                GROUP_SEP: ",",
                PATTERNS: [{
                    minInt: 1,
                    minFrac: 0,
                    maxFrac: 3,
                    posPre: "",
                    posSuf: "",
                    negPre: "-",
                    negSuf: "",
                    gSize: 3,
                    lgSize: 3
                },
                    {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                CURRENCY_SYM: "$"
            },
            DATETIME_FORMATS: {
                MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                AMPMS: ["AM", "PM"],
                medium: "MMM d, y h:mm:ss a",
                "short": "M/d/yy h:mm a",
                fullDate: "EEEE, MMMM d, y",
                longDate: "MMMM d, y",
                mediumDate: "MMM d, y",
                shortDate: "M/d/yy",
                mediumTime: "h:mm:ss a",
                shortTime: "h:mm a"
            }
        }
    };
    return e
});