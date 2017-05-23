define("lcc/cons/lccCons", [], function () {
    var e = ".htm",
        t = window.REGION_LIST_CONFIG || [],
        n = {
            "cn-hangzhou": "杭州",
            "cn-qingdao": "青岛",
            "cn-beijing": "北京",
            "cn-shenzhen": "深圳",
            "cn-hongkong": "香港"
        };
    return t.forEach(function (e) {
        n[e.regionNo] = e.regionName
    }),
        {
            VIEW_PATH: "scripts/lcc/views/",
            AUTO_REFRESH_INTERVAL: 3e4,
            PARTIALS_PATH: "scripts/lcc/partials/",
            RESPONSE_CODE: {
                SUCCESS: "200",
                SESSION_TIMEOUT: "-99",
                NEED_LOGIN: "-100",
                REQUEST_DATA_NOT_EXISTED: "-101",
                SERVER_STATUS_ILLEGAL: "-107",
                SEND_VERIFY_CODE_FIRST: "-2000",
                VERIFY_CODE_ERROR: "-2003",
                VERIFY_CODE_SEND_ERROR: "-2002",
                DUPLICATE_IMAGE_ID: "-303",
                ROLLBACK_RUNNING_ECS: "-1206",
                SNAPSHOT_USED_IMAGE_CANNOT_DEL: "-916",
                SNAPSHOT_USED_DISK_CANNOT_DEL: "-917",
                IMAGE_USED_CANNOT_DEL: "-3010"
            },
            INSTANCE_STATUS: {
                available: "运行中",
                stopping: "停止中"
            },
            LCC_COOKIE_SELECTED_REGION_NO: "lcc_selected_region",
            SERVICE_LIST_MENUS: [{
                state: "publisher",
                name: "提供者列表"
            },
                {
                    state: "subscriber",
                    name: "调用者列表"
                }],
            RESOURCES_MENUS: [{
                state: "ecs",
                name: "云服务器ECS"
            },
                {
                    state: "slb",
                    name: "负载均衡SLB"
                },
                {
                    state: "vpc",
                    masterOnly: !0,
                    name: "专有网络VPC"
                },
                {
                    state: "group",
                    masterOnly: !0,
                    name: "资源组管理"
                }],
            ACCOUNT_MGMT_MENUS: [{
                state: "userMgmt",
                name: "用户管理"
            },
                {
                    state: "roleMgmt",
                    name: "角色管理"
                },
                {
                    state: "rightMgmt",
                    name: "所有权限"
                },
                {
                    state: "userInfo",
                    name: "个人资料"
                },
                {
                    state: "login",
                    name: "帐号切换"
                }],
            CHILD_ACCOUNT_MGMT_MENUS: [{
                state: "userInfo",
                name: "个人资料"
            },
                {
                    state: "login",
                    name: "帐号切换"
                }],
            SYS_MONITOR_ITEMS: [{
                id: "cpu",
                name: "cpu",
                title: "CPU数据统计汇总",
                tips: "CPU数据的详细趋势图",
                metrics: [{
                    name: "cpu",
                    tips: "CPU"
                }]
            },
                {
                    id: "memory",
                    name: "memory",
                    title: "内存数据统计汇总",
                    tips: "内存数据的详细趋势图",
                    metrics: [{
                        name: "memoryTotal",
                        tips: "内存总数"
                    },
                        {
                            name: "memoryUsed",
                            tips: "内存使用"
                        }]
                },
                {
                    id: "load",
                    name: "load",
                    title: "负载数据统计汇总",
                    tips: "负载数据的详细趋势图",
                    metrics: [{
                        name: "load",
                        tips: "负载"
                    }]
                },
                {
                    id: "net",
                    name: "net",
                    title: "网络速度数据统计汇总",
                    tips: "网络速度数据的详细趋势图",
                    metrics: [{
                        name: "netTran",
                        tips: "发送速度"
                    },
                        {
                            name: "netRecv",
                            tips: "接收速度"
                        }]
                },
                {
                    id: "disk1",
                    name: "disk",
                    title: "磁盘数据统计汇总",
                    tips: "磁盘数据的详细趋势图",
                    metrics: [{
                        name: "diskTotal",
                        tips: "磁盘总大小"
                    },
                        {
                            name: "diskUsed",
                            tips: "磁盘使用大小"
                        }]
                },
                {
                    id: "disk2",
                    name: "disk",
                    title: "磁盘读写速度数据统计汇总",
                    tips: "磁盘读写速度数据的详细趋势图",
                    metrics: [{
                        name: "diskRead",
                        tips: "磁盘读速度"
                    },
                        {
                            name: "diskWrite",
                            tips: "磁盘写速度"
                        }]
                },
                {
                    id: "disk3",
                    name: "disk",
                    title: "磁盘读写次数数据统计汇总",
                    tips: "磁盘读写次数数据的详细趋势图",
                    metrics: [{
                        name: "diskIopsRead",
                        tips: "磁盘读次数"
                    },
                        {
                            name: "diskIopsWrite",
                            tips: "磁盘写次数"
                        }]
                }],
            SYS_MONITOR_DETAIL_ITEMS: [{
                id: "cpu",
                name: "cpu",
                title: "CPU数据",
                tips: "CPU数据的详细趋势图",
                metrics: [{
                    name: "cpu",
                    tips: "CPU"
                }]
            },
                {
                    id: "memory",
                    name: "memory",
                    title: "内存数据",
                    tips: "内存数据的详细趋势图",
                    metrics: [{
                        name: "memoryTotal",
                        tips: "内存总数"
                    },
                        {
                            name: "memoryUsed",
                            tips: "内存使用"
                        }]
                },
                {
                    id: "load",
                    name: "load",
                    title: "负载数据",
                    tips: "负载数据的详细趋势图",
                    metrics: [{
                        name: "load",
                        tips: "负载"
                    }]
                },
                {
                    id: "net",
                    name: "net",
                    title: "网络速度数据",
                    tips: "网络速度数据的详细趋势图",
                    metrics: [{
                        name: "netTran",
                        tips: "发送速度"
                    },
                        {
                            name: "netRecv",
                            tips: "接收速度"
                        }]
                },
                {
                    id: "disk1",
                    name: "disk",
                    title: "磁盘数据",
                    tips: "磁盘数据的详细趋势图",
                    metrics: [{
                        name: "diskTotal",
                        tips: "磁盘总大小"
                    },
                        {
                            name: "diskUsed",
                            tips: "磁盘使用大小"
                        }]
                },
                {
                    id: "disk2",
                    name: "disk",
                    title: "磁盘读写速度数据统计汇总",
                    tips: "磁盘读写速度数据的详细趋势图",
                    metrics: [{
                        name: "diskRead",
                        tips: "磁盘读速度"
                    },
                        {
                            name: "diskWrite",
                            tips: "磁盘写速度"
                        }]
                },
                {
                    id: "disk3",
                    name: "disk",
                    title: "磁盘读写次数数据统计汇总",
                    tips: "磁盘读写次数数据的详细趋势图",
                    metrics: [{
                        name: "diskIopsRead",
                        tips: "磁盘读次数"
                    },
                        {
                            name: "diskIopsWrite",
                            tips: "磁盘写次数"
                        }]
                }],
            MEMORY_MONITOR_ITEMS: [{
                id: "memory",
                name: "heap",
                title: "堆内存数据统计汇总",
                tips: "堆内存数据的详细趋势图",
                metrics: [{
                    name: "conMemCommitted",
                    tips: "申请的大小"
                },
                    {
                        name: "conMemInit",
                        tips: "初始值"
                    },
                    {
                        name: "conMemMax",
                        tips: "最大能使用"
                    },
                    {
                        name: "conMemUsed",
                        tips: "当前使用"
                    },
                    {
                        name: "conMemUsedPercent",
                        tips: "使用比率"
                    }]
            },
                {
                    id: "memory2",
                    name: "non_heap",
                    title: "非堆内存数据统计汇总",
                    tips: "非堆内存数据的详细趋势图",
                    metrics: [{
                        name: "conMemCommitted",
                        tips: "申请的大小"
                    },
                        {
                            name: "conMemInit",
                            tips: "初始值"
                        },
                        {
                            name: "conMemMax",
                            tips: "最大能使用"
                        },
                        {
                            name: "conMemUsed",
                            tips: "当前使用"
                        },
                        {
                            name: "conMemUsedPercent",
                            tips: "使用比率"
                        }]
                }],
            UNIT_TRANSLATE: {
                "Bytes/Second": "Bytes/秒",
                Count: "次/秒",
                None: "",
                Kilobytes: "KB",
                Percent: "%",
                Megabits: "M"
            },
            SERVER_STATUS_TRANSLATE: {
                Pending: "待启动",
                Starting: "启动中",
                StartFailure: "启动失败",
                Stopped: "已停止",
                Shutting: "停止中",
                ShutFailure: "停止失败",
                Running: "运行中",
                Resetting: "初始化中",
                ResetFailure: "重置失败",
                Released: "已释放",
                ChangePasswd: "重置密码中",
                Rollbacking: "快照回滚中",
                Updating: "配置更新中",
                Creating: "创建中",
                Expired: "已过期",
                CreateFailure: "创建失败",
                ChangeOS: "更换系统盘中",
                ChangePasswdFailure: "重置密码失败",
                RollbackFailure: "快照回滚失败",
                UpdateFailure: "配置升级失败",
                ChangeOSFailure: "更换系统失败",
                HouyiUpdating: "后羿升级中",
                ExpiredFailure: "到期失败",
                Locked: "已锁定",
                UnLocking: "解锁中",
                Created: "已创建"
            },
            UNSTABLE_SERVER_STATUS: {
                Starting: !0,
                Pending: !0,
                Shutting: !0,
                Resetting: !0,
                Rollbacking: !0,
                Updating: !0,
                Creating: !0,
                UnLocking: !0,
                ChangeOS: !0
            },
            APP_STATES: {
                OK: "正常",
                AGENT_OFF: "AGENT异常",
                CONTAINER_OFF: "容器退出",
                APP_OFF: "应用异常",
                RESETTING: "重置中",
                CONFIGING: "配置中",
                DELETED: "已删除",
                DELETING: "正在删除",
                DEPLOYING: "部署中",
                FAILED: "失败",
                INITING: "初始化中",
                RUNNING: "运行中",
                SCALING_OUT: "扩容中",
                SCALING_IN: "缩容中",
                STARTING: "应用启动中",
                STOPPED: "应用停止",
                STOPPING: "应用正在停止",
                UNKNOW: "正常状态",
                PROVISION_FAILED: "准备失败",
                START_FAILED: "启动失败",
                STOP_FAILED: "停止失败",
                DEPLOY_FAILED: "部署失败",
                CONFIG_FAILED: "配置失败",
                DELETE_FAILED: "删除失败",
                RESET_FAILED: "重置失败"
            },
            APP_STATES_WITH_STYLE: {
                OK: '<span class="text-success">正常</span>',
                AGENT_OFF: '<span class="text-danger">AGENT异常</span>',
                CONTAINER_OFF: '<span class="text-danger">容器退出</span>',
                APP_OFF: '<span class="text-danger">应用异常</span>',
                RESETTING: "重置中",
                CONFIGING: "配置中",
                DELETED: "已删除",
                DELETING: "正在删除",
                DEPLOYING: "部署中",
                FAILED: "失败",
                INITING: "初始化中",
                RUNNING: "运行中",
                SCALING_OUT: "扩容中",
                SCALING_IN: "缩容中",
                STARTING: "应用启动中",
                STOPPED: "应用停止",
                STOPPING: "应用正在停止",
                UNKNOW: "正常状态",
                PROVISION_FAILED: '<span class="text-danger">准备失败</span>',
                START_FAILED: '<span class="text-danger">启动失败</span>',
                STOP_FAILED: '<span class="text-danger">停止失败</span>',
                DEPLOY_FAILED: '<span class="text-danger">部署失败</span>',
                CONFIG_FAILED: '<span class="text-danger">配置失败</span>',
                DELETE_FAILED: '<span class="text-danger">删除失败</span>',
                RESET_FAILED: '<span class="text-danger">重置失败</span>'
            },
            APP_STATES_TIPS: {
                OK: "",
                AGENT_OFF: "Agent已退出或运行异常，请检查机器上Agent的运行状态。",
                CONTAINER_OFF: "Tomcat已退出或运行异常，请检查Tomcat的运行状态。",
                APP_OFF: "健康检查URL探测失败，请检查健康检查URL正确性和应用运行状态。"
            },
            DEPLOY_REGIONS: n,
            NAVBAR_CONS: {
                title: "INSIST-RPC配置中心",
                mainNav: [{
                    title: "配置列表",
                    state: "dsConfig"
                },
                    {
                        title: "服务列表",
                        state: "serviceList.publisher",
                        includes: ["serviceList.publisher", "serviceList.subscriber"]
                    }]
            }
        }
});