angular.module('aliyun.console.lcc.tpl', ['scripts/lcc/views/app/app.html', 'scripts/lcc/views/app/appLogs.html', 'scripts/lcc/views/app/basicInfo.html', 'scripts/lcc/views/app/basicMonitor.html', 'scripts/lcc/views/app/consumedService.html', 'scripts/lcc/views/app/consumerList.html', 'scripts/lcc/views/app/degradeRule.html', 'scripts/lcc/views/app/detail.html', 'scripts/lcc/views/app/flowControl.html', 'scripts/lcc/views/app/interface.html', 'scripts/lcc/views/app/methodList.html', 'scripts/lcc/views/app/opLogDetail.html', 'scripts/lcc/views/app/opLogs.html', 'scripts/lcc/views/app/publishedService.html', 'scripts/lcc/views/app/realLog.html', 'scripts/lcc/views/app/serviceList.html', 'scripts/lcc/views/app/softwareVersion.html', 'scripts/lcc/views/home.html', 'scripts/lcc/views/resource/dsConfig.html', 'scripts/lcc/views/resource/ecs.html', 'scripts/lcc/views/resource/group.html', 'scripts/lcc/views/resource/publisher.html', 'scripts/lcc/views/resource/rds.html', 'scripts/lcc/views/resource/resources.html', 'scripts/lcc/views/resource/serviceList.html', 'scripts/lcc/views/resource/slb.html', 'scripts/lcc/views/resource/subscriber.html', 'scripts/lcc/views/resource/vpc.html', 'scripts/lcc/partials/common/lccFormDialog.html', 'scripts/lcc/partials/common/lccRegionBar.html', 'scripts/lcc/partials/common/lccSingleChart.html', 'scripts/lcc/partials/common/lccSliderDiv.html', 'scripts/lcc/partials/common/lccTextDialog.html', 'scripts/lcc/partials/common/verifyCode.html', 'scripts/lcc/partials/resource/addEcs.html', 'scripts/lcc/partials/resource/agentInstall.html', 'scripts/lcc/partials/resource/bindEcs.html', 'scripts/lcc/partials/resource/bindSlb.html', 'scripts/lcc/partials/resource/createGroup.html', 'scripts/lcc/partials/resource/createSnapshot.html', 'scripts/lcc/partials/resource/ecsTip.html', 'scripts/lcc/partials/resource/editDs.html', 'scripts/lcc/partials/resource/servicePublish.html']);

angular.module("scripts/lcc/views/app/app.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/app.html",
    "<div ng-show=\"!appList.loadingState\"><div class=\"row\" bindonce ng-show=\"appList.isEdasUser\"><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\"><h5>应用列表</h5></div><div class=\"pull-right\"><a class=\"btn btn-primary\" ng-click=\"appList.createApp()\" ng-class=\"{disabled:appList.createApp === undefined}\">创建应用</a></div></div><div><div aliyun-simple-grid columns=\"appList.columns\" store=\"appList.itemList\" loading-state=\"appList.loadingState\" render-table=\"appList.updateTableData(data)\" pagination-info=\"appList.pageInfo\" config=\"appList.config\"></div></div><!-- <div>\n" +
    "        <table class=\"table table-hover\">\n" +
    "          <thead>\n" +
    "          <tr>\n" +
    "            <th>应用名称</th>\n" +
    "            <th>所在区域</th>\n" +
    "            <th>负责人</th>\n" +
    "            <th>最近运行时间</th>\n" +
    "            <th>运行/全部</th>\n" +
    "            <th>操作</th>\n" +
    "          </tr>\n" +
    "          </thead>\n" +
    "          <tbody>\n" +
    "          <tr bindonce ng-repeat=\"item in appList.apps\">\n" +
    "            <td>\n" +
    "              <a ui-sref=\"lccDetail.basicInfo({appId:item.appId,appName:item.appname})\">\n" +
    "                <span bo-text=\"item.appname\"></span>\n" +
    "              </a>\n" +
    "            </td>\n" +
    "            <td>{{appList.getRegionNameFromRegionNo(item.regionId)}}</td>\n" +
    "            <td bo-text=\"item.owner\"></td>\n" +
    "            <td bo-text=\"item.lastRunningTime\"></td>\n" +
    "            <td bo-text=\"item.runningInstances + '/' + item.instances\"></td>\n" +
    "            <td>\n" +
    "              <a ui-sref=\"lccDetail.basicInfo({appId:item.appId,appName:item.appname})\">\n" +
    "                <span>管理</span>\n" +
    "              </a>\n" +
    "            </td>\n" +
    "          </tr>\n" +
    "          </tbody>\n" +
    "        </table>\n" +
    "      </div> --></div></div><div class=\"row\" ng-show=\"!appList.isEdasUser\"><div class=\"console-not-service col-md-10 col-md-offset-1\"><div class=\"col-md-1 console-not-service-icon\"><span class=\"product-icons-48 product-icons-lcc-grey\"></span></div><div class=\"col-md-9\"><h2 class=\"console-not-service-title\">服务 LCC</h2><div class=\"console-not-service-text\"><p>你尚未开通服务LCC服务，请您：</p><p><a href=\"http://buy.aliyun.com/lcc\" class=\"btn btn-primary\">开通服务</a></p></div><div class=\"console-not-service-link\"><a href=\"http://lcc.console.aliyun.com\" target=\"_blank\">产品详情</a></div></div></div></div></div><div ng-hide=\"!appList.loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/appLogs.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/appLogs.html",
    "<div ng-if=\"!loadingState\"><div class=\"col-sm-12\"><div class=\"console-title\"><h5>运行日志</h5></div></div><div class=\"col-sm-12\"><form class=\"col-sm-8 form-inline\"><div class=\"form-group\"><label class=\"control-label\">ECS实例ID/名称/IP：</label><select class=\"form-control\" name=\"\" ng-model=\"appLogs.ecu\" ng-options=\"instance as (instance.instanceId + '/' + instance.instanceName + '/' + instance.instanceIp) for instance in appLogs.ecuList\"></select></div></form><div class=\"realLogButtons pull-right\"><a class=\"btn btn-danger\" ng-class=\"{disabled:!logtree.currentNode || logtree.currentNode.parent}\" ng-click=\"appLogs.deleteLogPath(logtree.currentNode.roleName)\">取消收藏选中路径</a> <a class=\"btn btn-success\" ng-click=\"appLogs.modifyAppLogPath()\">收藏路径</a></div></div><div class=\"col-sm-12\" style=\"margin-top: 10px\" data-angular-treeview=\"true\" data-tree-id=\"logtree\" data-tree-model=\"roleList\" data-node-id=\"roleId\" data-node-label=\"roleName\" data-node-children=\"children\"></div><div ng-if=\"roleList.length==0\" class=\"col-sm-12 text-center alert alert-warning\">当前没有日志路径，请添加日志路径</div></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/basicInfo.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/basicInfo.html",
    "<style>.popover-inner{\n" +
    "  max-width:260px;\n" +
    "}</style><div ng-if=\"!loadingState\" class=\"lcc-detail-basicinfo\"><div class=\"lcc-edtail-app-btns\"><a class=\"btn btn-success\" ng-class=\"{disabled:(basicInfo.hasLoading || !basicInfo.hasStopped || basicInfo.startApp === undefined || basicInfo.ecus.length == 0)}\" ng-click=\"basicInfo.startApp()\">启动应用</a> <a class=\"btn btn-warning\" ng-class=\"{disabled:!basicInfo.hasUnknow && (basicInfo.hasLoading || !basicInfo.hasRunning || basicInfo.stopApp === undefined || basicInfo.ecus.length == 0)}\" ng-click=\"basicInfo.stopApp()\">停止应用</a> <a class=\"btn btn-primary\" ng-class=\"{disabled:(basicInfo.hasLoading || basicInfo.deployApp === undefined) || basicInfo.ecus.length == 0}\" ng-click=\"basicInfo.deployApp()\">部署应用</a> <a class=\"btn btn-primary\" ng-class=\"{disabled:(basicInfo.hasLoading || basicInfo.rollbackApp === undefined) || basicInfo.ecus.length == 0}\" ng-click=\"basicInfo.rollbackApp()\">回滚应用</a> <a class=\"btn btn-primary\" ng-class=\"{disabled:(basicInfo.hasLoading || basicInfo.configJVM === undefined) || basicInfo.ecus.length == 0}\" ng-click=\"basicInfo.configJVM()\">配置JVM参数</a> <a class=\"btn btn-primary\" ng-class=\"{disabled:(basicInfo.hasLoading || basicInfo.scaleOutApp === undefined)}\" ng-click=\"basicInfo.scaleOutApp()\">应用扩容</a> <a class=\"btn btn-danger\" ng-class=\"{disabled:(basicInfo.hasRunning || basicInfo.deleteApp === undefined)}\" ng-click=\"basicInfo.deleteApp()\">删除应用</a></div><div class=\"row\"><div class=\"console-title\"><h5>应用信息</h5></div><div class=\"clearfix lcc-detail-app-info\" bindonce=\"basicInfo\"><div class=\"col-md-12 app-info-item\"><span class=\"text-muted\">应用ID：</span> <span>{{basicInfo.app.appId}}</span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">名称：</span> <span bo-text=\"basicInfo.app.name\"></span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">运行状态：</span> （运行{{basicInfo.app.runnings}}台/全部{{basicInfo.app.instances}}台）</div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">部署地域：</span> <span bo-text=\"basicInfo.app.regionId | lccDeployRegionFilter\"></span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">创建时间：</span> <span bo-text=\"basicInfo.app.createTime | date:'yyyy-MM-dd HH:mm:ss'\"></span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">负责人：</span> <span>{{basicInfo.app.owner}}</span></div><div class=\"col-md-4 app-info-item\" style=\"min-width:256px\"><span class=\"text-muted\">邮件地址：</span> <span>{{basicInfo.app.email}}</span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">电话：</span> <span>{{basicInfo.app.phone}}</span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">实例数：</span> <span>{{basicInfo.app.instances}}</span></div><div class=\"col-md-{{ basicInfo.app.extSlbName ? ((basicInfo.app.extSlbName.length>2)?8:4) : ((basicInfo.app.extSlbIp.length>2)?8:4) }} app-info-item\"><span class=\"text-muted\">均衡负载（公）：</span> <span ng-if=\"basicInfo.app.extSlbName && basicInfo.app.extSlbId\" aliyun-popover2=\"{{basicInfo.app.extSlbIp}}\" content-html=\"true\">{{basicInfo.app.extSlbName}}</span> <span ng-if=\"!basicInfo.app.extSlbName && basicInfo.app.extSlbId\" aliyun-popover2=\"此负载均衡无名称\" content-html=\"true\">{{basicInfo.app.extSlbIp}}</span> <span ng-if=\"!basicInfo.app.extSlbId\"><a ng-click=\"basicInfo.bindSlb('internet')\" ng-if=\"basicInfo.bindSlb != undefined\">添加</a></span> <span ng-if=\"basicInfo.app.extSlbId\"><a ng-click=\"basicInfo.bindSlb('internet', true)\" ng-if=\"basicInfo.bindSlb != undefined\">修改</a></span> <span ng-if=\"basicInfo.app.extSlbId\"><a ng-click=\"basicInfo.unbindSlb('internet')\" ng-if=\"basicInfo.unbindSlb != undefined\">解绑</a></span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">均衡负载（内）：</span> <span ng-if=\"basicInfo.app.slbName && basicInfo.app.slbId\" aliyun-popover2=\"{{basicInfo.app.slbIp}}\" content-html=\"true\">{{basicInfo.app.slbName}}</span> <span ng-if=\"!basicInfo.app.slbName && basicInfo.app.slbId\" aliyun-popover2=\"此负载均衡无名称\" content-html=\"true\">{{basicInfo.app.slbIp}}</span> <span ng-if=\"!basicInfo.app.slbId\"><a ng-if=\"basicInfo.bindSlb != undefined\" ng-click=\"basicInfo.bindSlb('intranet')\">添加</a></span> <span ng-if=\"basicInfo.app.slbId\"><a ng-if=\"basicInfo.bindSlb != undefined\" ng-click=\"basicInfo.bindSlb('intranet', true)\">修改</a></span> <span ng-if=\"basicInfo.app.slbId\"><a ng-if=\"basicInfo.unbindSlb != undefined\" ng-click=\"basicInfo.unbindSlb('intranet')\">解绑</a></span></div><div class=\"col-md-4 app-info-item\"><span class=\"text-muted\">应用程序包：</span> <span ng-if=\"basicInfo.lastestVersion.warFileStr.length < 14\" ng-class=\"{ 'text-danger':basicInfo.app.deployFailureState===true}\" aliyun-popover2=\"{{basicInfo.lastestVersion.warUrl}}\" content-html=\"true\">{{basicInfo.lastestVersion.warFileStr}}</span> <span ng-if=\"basicInfo.lastestVersion.warFileStr.length >= 14\" ng-class=\"{ 'text-danger':basicInfo.app.deployFailureState===true}\" aliyun-popover2=\"{{basicInfo.lastestVersion.warUrl}}\" content-html=\"true\">{{basicInfo.lastestVersion.warFileStr.substring(0,13)+ \"...\"}}</span><!--span ng-if=\"basicInfo.lastestVersion\"><a ng-click=\"basicInfo.app.copyWar()\">复制</a></span--> <span ng-if=\"!basicInfo.lastestVersion\">无</span></div><div class=\"col-md-{{(basicInfo.app.hcUrl&&basicInfo.app.hcUrl.length>=12)?8:4}} app-info-item\"><span class=\"text-muted\">健康检查URL：</span> <span ng-if=\"basicInfo.app.hcUrl.length >= 30\" aliyun-popover2=\"{{basicInfo.app.hcUrl}}\" content-html=\"false\">{{basicInfo.app.hcUrl.substring(0,30)+ \"...\"}}</span> <span ng-if=\"basicInfo.app.hcUrl.length < 30\">{{basicInfo.app.hcUrl}}</span> <a ng-if=\"basicInfo.modifyHcURL != undefined\" ng-click=\"basicInfo.modifyHcURL()\">修改</a></div><div class=\"col-md-5 app-info-item\"><span class=\"text-muted\">备注：</span> <span ng-if=\"basicInfo.app.description.length >= 30\" aliyun-popover2=\"{{basicInfo.app.description}}\" content-html=\"false\">{{basicInfo.app.description.substring(0,27)+ \"...\"}}</span> <span ng-if=\"basicInfo.app.description.length < 30\" bo-text=\"basicInfo.app.description || '无'\"></span></div></div></div><div class=\"row\" ng-show=\"basicInfo.ecus && basicInfo.ecus.length!=0\"><div class=\"console-title\"><h5>部署实例信息</h5></div><table class=\"table table-hover\"><thead><tr><th>实例名称</th><th>vpc</th><th>IP地址</th><th>CPU/内存</th><th>agent版本</th><th>实时状态</th><th>任务状态</th><th>操作</th></tr></thead><tbody><tr ng-repeat=\"item in basicInfo.ecus\"><td>{{item.ecs.instanceName}}</td><td>{{item.ecs.vpcId}}</td><td><span content-html=\"true\"><!--p bindonce ng-repeat=\"addr in item.ecs.innerIpAddress\">{{addr}}<span class=\"text-muted\">（内）</span></p>\n" +
    "            <p bindonce ng-repeat=\"addr in item.ecs.publicIpAddress\">{{addr}}<span class=\"text-muted\">（公）</span></p>\n" +
    "            <p bindonce ng-repeat=\"addr in item.ecs.privateIpAddress\">{{addr}}<span class=\"text-muted\">（私）</span></p--><p bindonce ng-if=\"item.ecs.innerIp\">{{item.ecs.innerIp}}<span class=\"text-muted\">（内）</span></p><p bindonce ng-if=\"item.ecs.publicIp\">{{item.ecs.publicIp}}<span class=\"text-muted\">（公）</span></p><p bindonce ng-if=\"item.ecs.privateIp\">{{item.ecs.privateIp}}<span class=\"text-muted\">（私）</span></p><p bindonce ng-if=\"item.ecs.eIp\">{{item.ecs.eIp}}<span class=\"text-muted\">（弹）</span></p></span></td><td>{{item.ecs.cpu + '核'}}/{{item.ecs.mem + ' MB'}}</td><td>{{item.ecu.agentVersion}}</td><td><span ng-bind-html=\"item.ecu.nodeState | lccAppStateFilter\"></span> <span ng-show=\"!basicInfo.app.hcUrl || item.ecu.nodeState!='OK'\" popover=\"{{item.ecu.nodeState | lccAppStateFilterTips}}\" popover-trigger=\"mouseenter\"><span class=\"icon-warning-2 text-warning\"></span></span></td><td><span ng-bind-html=\"item.ecu.state | lccAppStateFilter\"></span> <i ng-class=\"{'lcc-loading': item.isLoading}\"></i></td><td><a href=\"http://console.aliyun.com/ecs/index.htm#/server/{{item.ecs.instanceId}}/detail\" target=\"_blank\">管理</a> <a ng-if=\"item.ecu.state==='STOPPED' && basicInfo.startEcu != undefined\" href=\"javascript:;\" ng-click=\"basicInfo.startEcu(item)\"><span class=\"text-explode\">|</span>启动</a> <a ng-if=\"(item.ecu.state==='UNKNOW' || item.ecu.state==='RUNNING') && basicInfo.stopEcu != undefined\" ng-click=\"basicInfo.stopEcu(item)\"><span class=\"text-explode\">|</span>停止</a> <a ng-if=\"(item.ecu.state!='RUNNING')&&(true || basicInfo.ecus.length > 1) && basicInfo.scaleInApp != undefined\" ng-click=\"basicInfo.scaleInApp(item)\"><span class=\"text-explode\">|</span>下线</a> <a ui-sref=\"lccDetail.appLogs({ip:item.ecu.ipAddr,vpc:item.ecu.vpcId})\"><span class=\"text-explode\">|</span>日志</a><span class=\"text-explode\" ng-if=\"basicInfo.ecus.length > 1 && basicInfo.makeBeta != undefined\">|</span><a ng-if=\"basicInfo.ecus.length > 1 && !item.ecu.forBeta && basicInfo.makeBeta != undefined\" ng-click=\"basicInfo.makeBeta(item, true)\">设为Beta</a><a ng-if=\"basicInfo.ecus.length > 1 && item.ecu.forBeta && basicInfo.makeBeta != undefined\" ng-click=\"basicInfo.makeBeta(item, false)\">取消Beta</a><span class=\"text-explode\" ng-if=\"item.ecu.state!='RESETTING' && basicInfo.resetEcu != undefined\">|</span><a ng-if=\"item.ecu.state!='RESETTING' && basicInfo.resetEcu != undefined\" ng-click=\"basicInfo.resetEcu(item)\">重置</a></td></tr></tbody></table></div></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/basicMonitor.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/basicMonitor.html",
    "<div class=\"row\"><div class=\"console-title clearfix\"><div class=\"pull-left\"><h5>基础监控</h5></div></div><ul class=\"nav nav-tabs\"><li ng-repeat=\"tab in tabs\" ng-class=\"{active:$state.includes('lccDetail.basicMonitor.' + tab.state)}\"><a ui-sref=\"lccDetail.basicMonitor.{{tab.state}}\">{{tab.name}}</a></li></ul><div ui-view=\"monitor\"></div></div>");
}]);

angular.module("scripts/lcc/views/app/consumedService.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/consumedService.html",
    "<div bindonce ng-show=\"!loadingState\"><table class=\"table table-hover\"><thead><tr><th>服务名称</th><th>版本号</th><th>组别</th><!-- <th>操作</th> --></tr></thead><tbody><tr ng-repeat=\"s in services\"><td>{{s.name}}</td><td>{{s.version}}</td><td><span ng-repeat=\"g in s.groups\"><span>{{g}}</span><span ng-if=\"!$last\">,</span></span></td><!-- <td>\n" +
    "                <span ng-repeat=\"g in s.groups\">\n" +
    "                    <a ui-sref=\"lccDetail.interface.methodList({appId:appId,serviceName:s.name+':'+s.version,serviceGroup:g})\" title=\"{{g}}\">查看详情</a>\n" +
    "                </span>\n" +
    "            </td> --></tr></tbody></table></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/consumerList.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/consumerList.html",
    "<table ng-show=\"!loadingState\" class=\"table table-hover\"><thead><tr><th>客户端列表</th><th>应用名</th><th>负责人</th></tr></thead><tbody><tr ng-repeat=\"consumer in consumers\"><td>{{consumer.clientId}}</td><td>{{consumer.clientApp}}</td><td>{{consumer.owner}}</td></tr></tbody></table><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/degradeRule.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/degradeRule.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\" data-width=\"100%\"><h5>降级规则</h5></div><div class=\"pull-right\"><a class=\"btn btn-success\" ng-click=\"degradeRule.showConfigMethod()\">&nbsp;&nbsp;应用配置说明</a> <a class=\"btn btn-primary\" aliyun-console-spm spm-id=\"2\" href=\"javascript:;\" ng-click=\"degradeRule.addFCRule()\">添加降级规则</a></div></div><div><div aliyun-simple-grid columns=\"degradeRule.columns\" store=\"degradeRule.itemList\" loading-state=\"degradeRule.loadingState\" render-table=\"degradeRule.updateTableData(data)\" pagination-info=\"degradeRule.pageInfo\" config=\"degradeRule.config\"></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/app/detail.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/detail.html",
    "<div class=\"row lcc-detail-navbar\"><div class=\"console-instance-head clearfix\"><div class=\"pull-left\"><h3 class=\"instance-id\"><span class=\"product-icons-32 product-icons-lcc\"></span> <span aliyun-truncate-text tooltip-placement=\"bottom\" source-text=\"{{appName}}\"></span></h3></div></div></div><div data-ng-if=\"!currentInstanceInvalid\"><div class=\"col-sm-12\"><div ui-view=\"lccDetail\"></div></div></div>");
}]);

angular.module("scripts/lcc/views/app/flowControl.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/flowControl.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\" data-width=\"100%\"><h5>限流规则</h5></div><div class=\"pull-right\"><a class=\"btn btn-success\" ng-click=\"flow.showConfigMethod()\">&nbsp;&nbsp;应用配置说明</a> <a class=\"btn btn-primary\" aliyun-console-spm spm-id=\"2\" href=\"javascript:;\" ng-click=\"flow.addFCRule()\">添加限流规则</a></div></div><div><table class=\"table table-hover\" ng-if=\"!flow.loadingState\"><thead><tr><th>需要降级的资源</th><th>被限流的应用</th><th>限流粒度</th><th>限流阀值</th><th>状态</th><th>操作</th></tr></thead><tbody ng-if=\"flow.ruleList.length === 0\"><tr><td colspan=\"6\" align=\"center\">没有查询到任何的规则</td></tr></tbody><tbody ng-if=\"flow.ruleList.length > 0\"><tr ng-repeat=\"item in flow.ruleList\"><td><span popover=\"{{item.resource}}\" popover-trigger=\"mouseenter\">{{flow.getShortName(item.resource) | limitTo : 50}} {{flow.getShortName(item.resource).length > 50 ? '...' : ''}}</span></td><td><span ng-if=\"item.consumerAppId == 'other'\">其他</span><span ng-if=\"item.consumerAppId == 'default'\">所有</span><a ng-if=\"item.consumerAppId != 'default' && item.consumerAppId != 'other'\" ui-sref=\"lccDetail.basicInfo({appId:item.consumerAppId,appName:item.consumerAppId})\">{{item.consumerAppId}}</a></td><td><span ng-if=\"item.granularity == '0'\">Thread限流</span><span ng-if=\"item.granularity == '1'\">QPS限流</span></td><td>{{item.threshold}}</td><td><div ng-switch=\"item.state\"><span ng-switch-when=\"CHANGING\" class=\"run-status-loading\" aliyun-loading size=\"16\"></span><span ng-switch-when=\"0\" class=\"text-success\">已启用</span><span ng-switch-when=\"1\" class=\"text-success\">已停用</span><span ng-switch-default class=\"text-success\">推送中</span></div></td><td><a href=\"javascript:;\" ng-click=\"flow.addFCRule(item)\">编辑</a><span class=\"text-explode\">|</span><a ng-if=\"item.state===0\" href=\"javascript:;\" ng-click=\"flow.stopFCRule(item)\">停用</a><a ng-if=\"item.state===1\" href=\"javascript:;\" ng-click=\"flow.enableFCRule(item)\">启用</a><a href=\"javascript:;\" ng-click=\"flow.deleteFCRule(item)\"><span class=\"text-explode\">|</span>删除</a></td></tr></tbody></table><div ng-hide=\"!flow.loadingState\" aliyun-loading size=\"48\" style=\"margin-top: 100px\"></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/app/interface.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/interface.html",
    "<div class=\"row\"><div class=\"console-title clearfix\"><div class=\"pull-left\"><h5>{{serviceGroup}} -> {{serviceName}} <a ui-sref=\"lccDetail.serviceList.consumed({appId:appId,appName:appName})\">返回服务列表</a></h5></div></div><ul class=\"nav nav-tabs\"><li ng-repeat=\"tab in tabs\" ng-class=\"{active:$state.includes('lccDetail.interface.' + tab.state)}\"><a ui-sref=\"lccDetail.interface.{{tab.state}}\">{{tab.name}}</a></li></ul><div ui-view=\"interface\"></div></div>");
}]);

angular.module("scripts/lcc/views/app/methodList.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/methodList.html",
    "<table ng-show=\"!loadingState\" class=\"table table-hover\"><thead><tr><th>方法名称</th><th>输入参数</th><th>输出类型</th></tr></thead><tbody><tr ng-repeat=\"method in methods\"><td>{{method.methodName}}</td><td>{{method.inputParams}}</td><td>{{method.output}}</td></tr></tbody></table><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/opLogDetail.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/opLogDetail.html",
    "<div class=\"row\" bindonce ng-if=\"!loadingState\"><div><div class=\"console-title clearfix\"><div class=\"pull-left\"><h5>操作任务详情</h5><a href=\"javascript:window.history.back()\">返回</a></div></div><div><table class=\"table table-hover\"><thead><tr><th>目标IP</th><th>开始时间</th><th>结束时间</th><th>当前状态</th><th>失败原因</th></tr></thead><tbody><tr bindonce ng-repeat=\"task in tasks\"><td bo-text=\"task.ip\"></td><td>{{task.startTime | date:'yyyy-MM-dd HH:mm:ss'}}</td><td>{{task.finishTime > 0 ? (task.finishTime | date:'yyyy-MM-dd HH:mm:ss') : ''}}</td><td>{{task.finished ? (task.success ? '成功':'失败') : ('处理中') }}</td><td style=\"width:250px\">{{task.response}}</td></tr></tbody></table></div></div></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/opLogs.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/opLogs.html",
    "<div class=\"row\" bindonce ng-if=\"!loadingState\"><div><div class=\"console-title clearfix\"><div class=\"pull-left\"><h5>操作记录</h5></div><div class=\"pull-right\"><button type=\"button\" ui-sref=\"lccDetail.opLogs({d:1})\" class=\"btn\" ng-class=\"d===1?'btn-primary':'btn-default'\">最近一天</button> <button type=\"button\" ui-sref=\"lccDetail.opLogs({d:7})\" class=\"btn\" ng-class=\"d===7?'btn-primary':'btn-default'\">最近七天</button> <button type=\"button\" ui-sref=\"lccDetail.opLogs({d:0})\" class=\"btn\" ng-class=\"d===0?'btn-primary':'btn-default'\">所有记录</button> <button type=\"button\" ng-click=\"exportExcel()\" class=\"btn btn-default\">导出Excel</button></div></div><div><table class=\"table table-hover\"><thead><tr><th>时间</th><th>类型</th><th>操作状态</th><th>操作人</th><th>操作详情</th></tr></thead><tbody ng-if=\"opLogs.length > 0\"><tr ng-repeat=\"log in opLogs | orderBy:'-createTime'\"><td>{{log.createTime | date:'yyyy-MM-dd HH:mm:ss'}}</td><td>{{log.actionType | lccAuditActionTypeFilter}}</td><td ng-if=\"log.finished && log.success\">成功</td><td ng-if=\"log.finished && !log.success\">失败</td><td ng-if=\"!log.finished\">处理中</td><td>{{log.operator}}</td><td><a ui-sref=\"lccDetail.opLogDetail({appId:appId,appName:appName,cid:log.cid})\">查看</a></td></tr></tbody><tbody ng-if=\"opLogs.length == 0\"><tr><td colspan=\"5\" align=\"center\">暂时没有任何操作日志</td></tr></tbody></table></div></div></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/publishedService.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/publishedService.html",
    "<div bindonce ng-show=\"!loadingState\"><table class=\"table table-hover\"><thead><tr><th>服务名称</th><th>版本号</th><th>组别</th><th>操作</th></tr></thead><tbody><tr ng-repeat=\"s in services\"><td>{{s.name}}</td><td>{{s.version}}</td><td><span ng-repeat=\"g in s.groups\"><a ui-sref=\"lccDetail.interface.methodList({appId:appId,serviceName:s.name+':'+s.version,serviceGroup:g})\" title=\"查看详情\">{{g}}</a><span ng-if=\"!$last\">,</span></span></td><td><a ng-click=\"showGroupManagerDialog(s.name+':'+s.version)\">分组管理</a></td></tr></tbody></table></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/app/realLog.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/realLog.html",
    "<div ng-app=\"app\" ng-if=\"!loadingState\"><div class=\"row\"><div class=\"console-title\"><h5>实时日志</h5><a ui-sref=\"lccDetail.appLogs({ip:stateParams.ip, vpc:stateParams.vpc})\" class=\"btn btn-xs btn-toinstlist\" href=\"javascript:;\"><span class=\"icon-goback\"></span>返回日志列表</a></div></div><div class=\"container-fluid well log\"><div lsf-alerts alerts=\"alerts\"></div><lsf-log-viewer source=\"source\" log=\"log\" pointer=\"pointer\" fix-top-element-selector=\".navbar-fixed-top\" init-tail=\"initTail\" search-wizards=\"scannerWizards\" full-height=\"true\" configured-viewer-fields=\"viewerFields\" default-viewer-fields=\"source.uiSettings.viewerFields\" viewer-fields-config-enabled=\"true\" highlight-pointer=\"highlightPointer\"></lsf-log-viewer></div></div>");
}]);

angular.module("scripts/lcc/views/app/serviceList.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/serviceList.html",
    "<div class=\"row\"><div class=\"console-title clearfix\"><div class=\"pull-left\"><h5>服务列表</h5></div></div><ul class=\"nav nav-tabs\"><li ng-repeat=\"tab in tabs\" ng-class=\"{active:$state.includes('lccDetail.serviceList.' + tab.state)}\"><a ui-sref=\"lccDetail.serviceList.{{tab.state}}\">{{tab.name}}</a></li></ul><div ui-view=\"serviceList\"></div></div>");
}]);

angular.module("scripts/lcc/views/app/softwareVersion.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/app/softwareVersion.html",
    "<div class=\"row\" bindonce ng-if=\"!softwareVersion.loadingState\"><div><div class=\"console-title clearfix\"><div class=\"pull-left\"><h5>容器版本</h5></div></div><div><table class=\"table table-hover\"><thead><tr><th>版本号</th><th>描述</th><th>发布日期</th><th style=\"width:100px\">操作</th></tr></thead><tbody ng-if=\"softwareVersion.buildPacks.length > 0\"><tr ng-repeat=\"config in softwareVersion.buildPacks\"><td>{{config.build_pack.packVersion}}</td><td>{{config.build_pack.tomcatDesc}}</td><td>{{config.build_pack.createTime | date:\"yyyy-MM-dd\"}}</td><td><span class=\"icon-yes\" ng-if=\"config.build_pack.packVersion === softwareVersion.currentBuild.packVersion\"></span><div ng-if=\"config.target_pack === true && softwareVersion.currentState === 'UPDATE_CONTAINER'\" class=\"update-status\"><span class=\"updating-status\" aliyun-loading size=\"16\"></span><span class=\"text-success\" ng-if=\"softwareVersion.targetBuild.packVersion > softwareVersion.currentBuild.packVersion\">正在升级...</span><span class=\"text-success\" ng-if=\"softwareVersion.targetBuild.packVersion < softwareVersion.currentBuild.packVersion\">正在降级...</span></div><a ng-if=\"config.build_pack.packVersion > softwareVersion.currentBuild.packVersion && config.target_pack != true\" ng-click=\"softwareVersion.updateContainer(config)\" ng-class=\"{'disabled': softwareVersion.currentState != 'STARTING'}\">升级到该版本</a><a ng-if=\"config.build_pack.packVersion < softwareVersion.currentBuild.packVersion && config.target_pack != true\" ng-click=\"softwareVersion.updateContainer(config)\" class=\"text-warning\" ng-class=\"{'disabled': softwareVersion.currentState != 'STARTING'}\">降级到该版本</a></td></tr></tbody><tbody ng-if=\"softwareVersion.buildPacks.length == 0\"><tr><td colspan=\"4\" align=\"center\">暂时没有任何数据</td></tr></tbody></table></div></div></div><div ng-hide=\"!softwareVersion.loadingState\" aliyun-loading size=\"48\" style=\"margin-top:100px\"></div>");
}]);

angular.module("scripts/lcc/views/home.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/home.html",
    "<div><div class=\"row\"><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"row\" style=\"margin-bottom:16px\"><!--div aliyun-console-global-notice=\"\" product-id=\"ecs\" class=\"col-md-12\"></div--></div><div class=\"pull-left\"><h5>概览todo</h5></div></div><div ng-if=\"home.add_show\"><div class=\"summary-total\"><a ng-if=\"home.isPaid\" class=\"btn btn-default margin-right pull-right ng-scope\" target=\"_blank\" style=\"margin-top: 4px\" ng-click=\"home.buyLinkUpgrade()\"><span class=\"icon-renew-mgt\"></span> <span>升级管理</span></a> <a ng-if=\"home.isPaid\" class=\"btn btn-default margin-right pull-right ng-scope\" target=\"_blank\" style=\"margin-top: 4px\" ng-click=\"home.buyLinkRenew()\"><span class=\"icon-renew-mgt\"></span> <span>续费管理</span></a><div>套餐类型：<span style=\"color:#FF9900\">{{home.version}}</span><span ng-if=\"home.version&&home.version!='公测'\">，最大支持&nbsp;<span style=\"color:#00A2CA\">{{home.ordercount}}</span>&nbsp;个应用节点；<span style=\"color:#00A2CA\">{{home.endtime | date}}</span>&nbsp;到期</span><!--a class=\"btn btn-default margin-right pull-right\" style=\"margin:5px;\">\n" +
    "                            <span class=\"icon-setup\"></span> 变更配置\n" +
    "                        </a--></div><div>运行概况：您共有ECS资源 &nbsp; <span style=\"color:#00A2CA\">{{home.ecsNum}}</span>&nbsp; 台，其中&nbsp; <span style=\"color:#00A2CA\">{{home.ecsAgentNum}}</span>&nbsp;台已安装LCC Agent，共有应用 &nbsp; <span style=\"color:#00A2CA\">{{home.appNum}}</span>&nbsp; 个，共部署于 &nbsp; <span style=\"color:#00A2CA\">{{home.ecsDeployNum}}</span>&nbsp; 台 ECS实例上。<span style=\"color:#FF9900\"></span></div></div><div lcc-action-auth auth=\"15:2\"><div class=\"col-sm-6 rds-dashboard-chart ng-scope\" style=\"margin-top: 20px;padding-left: 0px\" ng-repeat=\"chart in home.charts\"><div class=\"simple-chart\"><div class=\"simple-chart-head\"><div class=\"simple-chart-head-title\"><a ui-sref=\"lccDetail.basicInfo({appId:chart.appId,appName:chart.appName})\">{{chart.appName}}</a></div><div class=\"simple-chart-operations\"><div class=\"simple-chart-btn\" ng-click=\"home.deleteCollect(chart)\"><span class=\"icon-no\"></span></div></div></div><div class=\"simple-chart-body\" ng-hide=\"settings.showNoData\" style=\"height: 241px\"><div class=\"simple-chart-body-inner\" ecs-chart chart-title=\"\" config=\"chart\"></div></div></div></div><div class=\"col-sm-6 rds-dashboard-chart ng-scope\" data-spm=\"92\" style=\"margin-top: 20px;padding-left: 0px\"><div class=\"rds-dashboard-add-container full-wrapper\" config-array=\"configArray\" rds-dashboard-add=\"\"><span class=\"rds-dashboard-add\" ng-click=\"home.addApp()\"></span> <span config-array=\"configArray\" rds-dashboard-left=\"\"><span class=\"rds-dashboard-add-tips text-muted\"><span text-plain=\"\" type=\"tips\" text=\"addChart.tip1\">您当前还可以添加个</span> <span class=\"text-warning\">{{home.quota}}</span> <span text-plain=\"\" type=\"tips\" text=\"addChart.tip2\">监控图。</span></span></span></div></div></div></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/dsConfig.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/dsConfig.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div><h5>配置列表</h5></div><form class=\"form-horizontal\"><div class=\"form-group col-sm-3\"><label class=\"col-sm-5 control-label\" style=\"padding-left: 0px;padding-right: 0px\">Group：</label><div class=\"col-sm-7\" style=\"padding-left: 0px;padding-right: 0px\"><input type=\"text\" ng-model=\"dsConfig.group\" class=\"form-control\" placeholder=\"\"></div></div><div class=\"form-group col-sm-3\"><label class=\"col-sm-5 control-label\" style=\"padding-left: 0px;padding-right: 0px\">DataId：</label><div class=\"col-sm-7\" style=\"padding-left: 0px;padding-right: 0px\"><input type=\"text\" ng-model=\"dsConfig.dataId\" class=\"form-control\" placeholder=\"\"></div></div><div class=\"form-group col-sm-6\"><button class=\"btn btn-primary\" ng-click=\"dsConfig.search()\" style=\"margin-left: 20px\">搜索</button> <a class=\"btn btn-danger\" ng-click=\"dsConfig.clear()\" style=\"margin-left: 20px\">清空</a> <a class=\"btn btn-danger\" ng-click=\"dsConfig.editDs()\" style=\"margin-left: 20px\">添加</a></div><div class=\"form-group col-sm-12\" ng-show=\"dsConfig.isInvalid()\" style=\"text-align:center\"><span class=\"text-danger\">{{dsConfig.errorTips}}</span></div></form></div><div><div aliyun-simple-grid columns=\"dsConfig.columns \" store=\"dsConfig.itemList \" loading-state=\"dsConfig.loadingState \" render-table=\"dsConfig.updateTableData(data) \" pagination-info=\"dsConfig.pageInfo \" config=\"dsConfig.config \"></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/ecs.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/ecs.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\" data-width=\"100%\"><div lcc-region-bar module-name=\"实例列表\" module-action=\"lccResources.ecs\"></div></div><div class=\"pull-right command_area\"><button lcc-action-auth auth=\"16:11\" class=\"btn btn-default\" data-ng-click=\"ecs.refreshTableList()\" aliyun-console-spm spm-id=\"1\"><span class=\"glyphicon glyphicon-refresh\"></span> {{ 'lcc.cm.lb.refresh' | translate}}</button> <a lcc-action-auth auth=\"16:15\" class=\"btn btn-success\" ng-disabled=\"ecs.isSyncEcsing\" ng-click=\"ecs.syncEcs()\">{{ecs.isSyncEcsing?'正在同步ECS':'同步ECS'}}</a> <a class=\"btn btn-success\" ng-click=\"ecs.showAgentInstall()\">安装Agent</a> <a lcc-action-auth auth=\"16:14\" class=\"btn btn-primary\" aliyun-console-spm spm-id=\"2\" target=\"_blank\" href=\"{{ecs.buyLink}}\">创建实例</a> <a lcc-action-auth auth=\"16:16\" class=\"btn btn-primary\" target=\"_blank\" ng-click=\"ecs.addCustomEcs()\">添加机器</a></div></div><div><div aliyun-simple-grid columns=\"ecs.columns\" store=\"ecs.itemList\" loading-state=\"ecs.loadingState\" render-table=\"ecs.updateTableData(data)\" pagination-info=\"ecs.pageInfo\" config=\"ecs.config\"></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/group.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/group.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\" data-width=\"100%\"><div lcc-region-bar module-name=\"实例列表\" module-action=\"lccResources.group\"></div></div><div class=\"pull-right\"><a lcc-action-auth auth=\"16:42\" class=\"btn btn-primary\" ng-click=\"resourceGroup.updateGroup()\" ng-hide=\"resourceGroup.groupList.length >= 20\">创建资源组</a> <span style=\"display: inline-block\" popover=\"您最多只能添加20个资源组\" popover-trigger=\"mouseenter\"><a lcc-action-auth auth=\"16:42\" class=\"btn btn-primary disabled\" ng-click=\"resourceGroup.updateGroup()\" ng-hide=\"resourceGroup.loadingState || resourceGroup.groupList.length < 20\">创建资源组</a></span></div></div><div><table class=\"table table-hover\" ng-if=\"!resourceGroup.loadingState\"><thead><tr><th>资源组名称</th><th style=\"min-width:40px\">描述</th><th style=\"width:180px\">ECS实例</th><th style=\"min-width:210px\">SLB实例</th><th style=\"width:200px\">操作</th></tr></thead><tbody ng-if=\"resourceGroup.groupList.length === 0\"><tr><td colspan=\"5\" align=\"center\">没有查询到任何的资源组</td></tr></tbody><tbody ng-if=\"resourceGroup.groupList.length > 0\"><tr ng-repeat=\"resGroupDO in resourceGroup.groupList\"><td><span popover=\"{{resGroupDO.name}}\" popover-trigger=\"mouseenter\">{{resGroupDO.name | limitTo : 20}}{{resGroupDO.name.length > 20 ? '...' : ''}}</span></td><td><span ng-hide=\"resGroupDO.description\">--</span><span popover=\"{{resGroupDO.description}}\" popover-trigger=\"mouseenter\">{{resGroupDO.description | limitTo : 20}}{{resGroupDO.description.length > 20 ? '...' : ''}}</span></td><td><span ng-hide=\"resGroupDO.ecs.length > 0 && resGroupDO.ecs[0] != null\">--</span><div style=\"width: 100%;float: left;padding-top:2px\" ng-repeat=\"ecsInstance in resGroupDO.ecs\"><div aliyun-popover2 popover-template-id=\"scripts/lcc/partials/resource/ecsTip.html\" popover-placement=\"top\" popover-template-data=\"ecsInstance\"><span ng-if=\"ecsInstance.innerIp\">{{ecsInstance.innerIp}}</span> <span ng-if=\"ecsInstance.innerIp\" class=\"text-muted\">（内）</span> <span ng-if=\"!ecsInstance.innerIp\">{{ecsInstance.privateIp}}</span> <span ng-if=\"!ecsInstance.innerIp\" class=\"text-muted\">（私）</span> <span ng-if=\"!ecsInstance.innerIp && !ecsInstance.privateIp\">{{ecsInstance.publicIp[0]}}</span> <span ng-if=\"!ecsInstance.innerIp && !ecsInstance.privateIp\" class=\"text-muted\">（公）</span></div></div></td><td><span ng-hide=\"resGroupDO.slbs.length > 0 && resGroupDO.slbs[0] != null\">--</span><div ng-repeat=\"instacne in resGroupDO.slbs\">{{instacne.slbId}}</div></td><td><a lcc-action-auth auth=\"16:42\" ng-click=\"resourceGroup.updateGroup(resGroupDO)\">编辑</a><span lcc-action-auth auth=\"16:42\" class=\"text-explode\">|</span><a lcc-action-auth auth=\"16:43\" ng-click=\"resourceGroup.bindEcs(resGroupDO)\">绑定ECS</a><span lcc-action-auth auth=\"16:43\" class=\"text-explode\">|</span><a lcc-action-auth auth=\"16:44\" ng-click=\"resourceGroup.bindSlb(resGroupDO)\">绑定SLB</a><span lcc-action-auth auth=\"16:44\" class=\"text-explode\">|</span><a lcc-action-auth auth=\"16:42\" ng-click=\"resourceGroup.deleteResGroup(resGroupDO)\">删除</a></td></tr></tbody></table><div ng-hide=\"!resourceGroup.loadingState\" aliyun-loading size=\"48\" style=\"margin-top: 100px\"></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/publisher.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/publisher.html",
    "<div ng-if=\"!loadingState\"><div on-finish-render><table class=\"table table-hover table-bordered\"><thead><tr><th>服务名</th><th>服务版本</th><th>服务分组</th><th>提供者IP</th><th>操作</th></tr></thead><tbody><tr ng-repeat=\"item in items\"><td>{{item.dataId.split(':')[0]}}</td><td>{{item.dataId.split(':')[1]}}</td><td>{{item.groups.join(',')}}</td><td>{{item.hostId.split(':')[0]}}</td><td><a href=\"javascript:;\" ng-click=\"openDetail(item)\">详情</a></td></tr></tbody></table></div><div ng-if=\"items.length == 0\" style=\"text-align:center;margin-top: 100px\">暂时没有信息</div></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top: 100px\"></div>");
}]);

angular.module("scripts/lcc/views/resource/rds.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/rds.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\" data-width=\"100%\"><div lcc-region-bar module-name=\"实例列表\" module-action=\"lccResources.rds\"></div></div><div class=\"pull-right command_area\"><button class=\"btn btn-default\" data-ng-click=\"rds.refreshTableList()\" aliyun-console-spm spm-id=\"1\"><span class=\"glyphicon glyphicon-refresh\"></span> {{ 'lcc.cm.lb.refresh' | translate}}</button> <a class=\"btn btn-primary\" aliyun-console-spm spm-id=\"2\" target=\"_blank\" href=\"http://buy.aliyun.com/?spm=5176.2020520101.105.6.zE7L7D\">创建实例</a></div></div><div><div aliyun-simple-grid columns=\"rds.columns\" store=\"rds.itemList\" loading-state=\"rds.loadingState\" render-table=\"rds.updateTableData(data)\" pagination-info=\"rds.pageInfo\" config=\"rds.config\"></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/resources.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/resources.html",
    "<div class=\"row\"><div class=\"col-sm-12\"><div ui-view=\"lccResource\"></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/serviceList.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/serviceList.html",
    "<div class=\"col-sm-12\"><div class=\"row\"><div class=\"console-title clearfix\"><div><h5>服务列表</h5></div><form class=\"form-horizontal\"><div class=\"form-group col-sm-3\" style=\"width: 260px\"><label class=\"col-sm-4 control-label\" style=\"padding-left: 0px;padding-right: 0px\">服务名：</label><div class=\"col-sm-8\" style=\"padding-left: 0px;padding-right: 0px\"><input type=\"text\" ng-model=\"dataId\" class=\"form-control\" placeholder=\"\"></div></div><div class=\"form-group col-sm-3\" style=\"width: 260px\"><label class=\"col-sm-4 control-label\" style=\"padding-left: 0px;padding-right: 0px\">服务分组：</label><div class=\"col-sm-8\" style=\"padding-left: 0px;padding-right: 0px\"><input type=\"text\" ng-model=\"groupId\" class=\"form-control\" placeholder=\"\"></div></div><div class=\"form-group col-sm-3\" style=\"width: 260px\"><label class=\"col-sm-4 control-label\" style=\"padding-left: 0px;padding-right: 0px\">IP地址：</label><div class=\"col-sm-8\" style=\"padding-left: 0px;padding-right: 0px\"><input type=\"text\" ng-model=\"ip\" class=\"form-control\" placeholder=\"\"></div></div><!--      <div class=\"form-group col-sm-3\" style=\"width: 120px;text-align:center\">\n" +
    "            \n" +
    "      </div> --><div class=\"form-group col-sm-3\" style=\"text-align:center\"><button class=\"btn btn-primary\" ng-click=\"search()\" style=\"margin-left: 20px\">搜索</button> <a class=\"btn btn-danger\" ng-click=\"clear()\" style=\"margin-left: 20px\">清空</a></div><div class=\"form-group col-sm-12\" ng-show=\"isInvalid()\" style=\"text-align:center\"><span class=\"text-danger\">{{errorTips}}</span></div></form></div><ul class=\"nav nav-tabs\"><li ng-repeat=\"tab in tabs\" ng-class=\"{active:$state.includes('serviceList.' + tab.state)}\"><a aliyun-popover2=\"{{tab.tips}}\" ui-sref=\"serviceList.{{tab.state}}\">{{tab.name}}</a></li></ul><div ui-view=\"serviceView\"></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/slb.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/slb.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\"><div lcc-region-bar module-name=\"实例列表\" module-action=\"lccResources.slb\"></div></div><div class=\"pull-right\"><button lcc-action-auth auth=\"16:21\" class=\"btn btn-default\" data-ng-click=\"slb.refreshTableList() \" aliyun-console-spm spm-id=\"1 \"><span classslb.html=\"glyphicon glyphicon-refresh \"></span> {{ 'lcc.cm.lb.refresh' | translate}}</button> <a lcc-action-auth auth=\"16:24\" class=\"btn btn-primary\" aliyun-console-spm spm-id=\"2 \" target=\"_blank \" href=\"http://buy.aliyun.com/slb\">创建实例</a></div></div><div><div aliyun-simple-grid columns=\"slb.columns \" store=\"slb.itemList \" loading-state=\"slb.loadingState \" render-table=\"slb.updateTableData(data) \" pagination-info=\"slb.pageInfo \" config=\"slb.config \"></div></div></div></div>");
}]);

angular.module("scripts/lcc/views/resource/subscriber.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/subscriber.html",
    "<div ng-if=\"!loadingState\"><div on-finish-render><table class=\"table table-hover table-bordered\"><thead><tr><th>服务名</th><th>服务版本</th><th>服务分组</th><th>调用者IP</th><th>操作</th></tr></thead><tbody><tr ng-repeat=\"item in items\"><td>{{item.dataId.split(':')[0]}}</td><td>{{item.dataId.split(':')[1]}}</td><td>{{item.groups.join(',')}}</td><td>{{item.hostId.split(\":\")[0]}}</td><td><a href=\"javascript:;\" ng-click=\"openDetail(item)\">详情</a></td></tr></tbody></table></div><div ng-if=\"items.length == 0\" style=\"text-align:center;margin-top: 100px\">暂时没有信息</div></div><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top: 100px\"></div>");
}]);

angular.module("scripts/lcc/views/resource/vpc.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/views/resource/vpc.html",
    "<div class=\"row\" bindonce><div class=\"col-sm-12\"><div class=\"console-title clearfix\"><div class=\"pull-left\"><div lcc-region-bar module-name=\"实例列表\" module-action=\"lccResources.vpc\"></div></div></div><div><div aliyun-simple-grid columns=\"vpc.columns \" store=\"vpc.itemList \" loading-state=\"vpc.loadingState \" render-table=\"vpc.updateTableData(data) \" pagination-info=\"vpc.pageInfo \" config=\"vpc.config \"></div></div></div></div>");
}]);

angular.module("scripts/lcc/partials/common/lccFormDialog.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/common/lccFormDialog.html",
    "<div><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" data-ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\">{{dialogTitle}}</h5></div><div class=\"modal-body\"><div simple-form name=\"dialogForm\" result=\"viewModel\" options=\"formOptions\" fields=\"formFields\"></div></div><div class=\"modal-footer\"><button class=\"btn btn-success\" ng-disabled=\"dialogForm.$invalid\" data-ng-click=\"doAction()\">确定</button> <button class=\"btn btn-default\" data-ng-click=\"close(false)\">取消</button></div></div>");
}]);

angular.module("scripts/lcc/partials/common/lccRegionBar.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/common/lccRegionBar.html",
    "<div class=\"clearfix\"><div class=\"pull-left\"><h5>{{regionBarConfig.moduleName}}</h5><ul class=\"nav nav-pills\"><li data-ng-class=\"{'active': regionItem.currentRegionActive}\" data-ng-repeat=\"regionItem in regionBarConfig.regionListConfig\"><a href=\"javascript:;\" data-ng-click=\"regionChangeHandler(regionItem.regionNo)\" aliyun-console-spm spm-id=\"{{regionItem.id}}\">{{regionItem.regionName}}</a></li></ul></div></div>");
}]);

angular.module("scripts/lcc/partials/common/lccSingleChart.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/common/lccSingleChart.html",
    "<div class=\"console-message-dialog\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\">{{title}}</h5></div><div class=\"modal-body clearfix\" ng-if=\"!loadingState\" style=\"height:477px\"><form class=\"form-horizontal\" role=\"form\"><div><div ecs-chart chart-title=\"\" config=\"chart\"></div></div><div><label class=\"col-sm-3 control-label\">时间间隔:</label><div class=\"col-sm-8\"><button ng-click=\"changeTimeRange(30)\">半小时</button> <button ng-click=\"changeTimeRange(360)\">六小时</button> <button ng-click=\"changeTimeRange(1440)\">一天</button> <button ng-click=\"changeTimeRange(10080)\">一周</button></div></div></form></div><div class=\"modal-body clearfix\" style=\"height:477px\" ng-hide=\"!loadingState\"><div aliyun-loading size=\"48\" style=\"margin:30% 50% 70% 50%\"></div></div><div class=\"modal-footer\"><button ng-click=\"close(false)\" class=\"btn btn-default\">取消</button></div></div>");
}]);

angular.module("scripts/lcc/partials/common/lccSliderDiv.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/common/lccSliderDiv.html",
    "<style>.slider {\n" +
    "    /*width: 600px;*/\n" +
    "    height: 100px;\n" +
    "    overflow: hidden;\n" +
    "    position: relative;\n" +
    "    /*background: #e6e6e6;*/\n" +
    "    border: 20px solid #FFF;\n" +
    "    margin-top: 20px;\n" +
    "}\n" +
    "\n" +
    ".slide {\n" +
    "    position: absolute;\n" +
    "    height: 50%;\n" +
    "    width: 100%;\n" +
    "    z-index: 1001;\n" +
    "    margin: auto;\n" +
    "    top: 0; left: 0; bottom: 0; right: 0;\n" +
    "    text-align: center;\n" +
    "}\n" +
    "\n" +
    ".arrow {\n" +
    "    font-size: 36px;\n" +
    "    position: absolute;\n" +
    "    z-index: 1002;\n" +
    "    display: block;\n" +
    "    top: 50%;\n" +
    "    margin-top: -20px;\n" +
    "    outline: none;\n" +
    "    cursor: pointer;\n" +
    "}\n" +
    "\n" +
    ".arrow.prev {\n" +
    "    opacity: 0.2;\n" +
    "    left: 20px;\n" +
    "    transition: 0.2s linear all;\n" +
    "}\n" +
    "\n" +
    ".arrow.next {\n" +
    "    opacity: 0.2;\n" +
    "    right: 20px;\n" +
    "    transition: 0.2s linear all;\n" +
    "}\n" +
    "\n" +
    ".arrow.prev:hover {\n" +
    "    opacity: 1;\n" +
    "}\n" +
    "\n" +
    ".arrow.next:hover {\n" +
    "    opacity: 1;\n" +
    "}\n" +
    "\n" +
    "\n" +
    "\n" +
    "/*---------------------------------------------------------\n" +
    "NAV\n" +
    "---------------------------------------------------------*/\n" +
    "\n" +
    ".nav {\n" +
    "    text-align: center;\n" +
    "    display: block;\n" +
    "    position: absolute;\n" +
    "    z-index: 1002;\n" +
    "    left: 0;\n" +
    "    bottom: -4px;\n" +
    "    right: 0;\n" +
    "    height: 36px;\n" +
    "}\n" +
    "\n" +
    ".nonDraggableImage{\n" +
    "    -webkit-user-drag: none;\n" +
    "}\n" +
    "\n" +
    ".nav .wrapper {\n" +
    "    margin: 0 auto;\n" +
    "    width: 100%;\n" +
    "    padding: 1em 0 .8em;\n" +
    "}\n" +
    "\n" +
    ".nav ul {\n" +
    "    margin: 0;\n" +
    "    width: 100%;\n" +
    "}\n" +
    "\n" +
    ".nav .dot, .nav .dot div {\n" +
    "    display: inline-block;\n" +
    "    zoom: 1;\n" +
    "}\n" +
    "\n" +
    ".dots .dot {\n" +
    "    position: relative;\n" +
    "    margin: 0 8px;\n" +
    "    width: 12px;\n" +
    "    height: 12px;\n" +
    "}\n" +
    "\n" +
    ".dots .dot div {\n" +
    "    position: absolute;\n" +
    "    top: 2px;\n" +
    "    left: 2px;\n" +
    "    width: 12px;\n" +
    "    height: 12px;\n" +
    "    text-indent: 100%;\n" +
    "    white-space: nowrap;\n" +
    "    overflow: hidden;\n" +
    "    background: #FFF;\n" +
    "    background-color: #F5F5F5;\n" +
    "    border: 1px solid transparent;\n" +
    "    outline: none;\n" +
    "    -webkit-box-shadow: none;\n" +
    "    -moz-box-shadow: none;\n" +
    "    box-shadow: none;\n" +
    "    -webkit-border-radius: 50%;\n" +
    "    -moz-border-radius: 50%;\n" +
    "    border-radius: 50%;\n" +
    "    -webkit-transition: background-color 0.25s, border-color 0.25s;\n" +
    "    -moz-transition: background-color 0.25s, border-color 0.25s;\n" +
    "    transition: background-color 0.25s, border-color 0.25s;\n" +
    "}\n" +
    "\n" +
    ".dots .dot div.active {\n" +
    "    border-color: #FFF;\n" +
    "    background-color: #e8e8e8;\n" +
    "}</style><div class=\"clearfix\"><div class=\"slider\"><div ng-repeat=\"slide in slides\" class=\"slide slide-animation text-warning\" ng-swipe-right=\"nextSlide()\" ng-swipe-left=\"prevSlide()\" ng-hide=\"!isCurrentSlideIndex($index)\" ng-bind-html=\"slide.text\"></div><!--div class=\"arrow prev icon-arrow-left\" ng-click=\"nextSlide()\"></div>\n" +
    "    <div class=\"arrow next icon-arrow-right\" ng-click=\"prevSlide()\"></div--><nav class=\"nav\"><div class=\"wrapper\"><ul class=\"dots\"><li class=\"dot\" ng-repeat=\"slide in slides\"><div ng-class=\"{'active':isCurrentSlideIndex($index)}\" ng-click=\"setCurrentSlideIndex($index);\">{{slide.description}}</div></li></ul></div></nav></div></div>");
}]);

angular.module("scripts/lcc/partials/common/lccTextDialog.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/common/lccTextDialog.html",
    "<div><div class=\"console-message-dialog\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" data-ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\">{{ title }}</h5></div><div class=\"modal-body clearfix\"><div class=\"col-sm-11 breakall\" style=\"padding-bottom: 0\"><p ng-bind-html=\"message\"></p></div></div><div class=\"modal-footer\"><button ng-repeat=\"btn in buttons\" ng-click=\"eventHandler(btn.result)\" class=\"btn\" ng-class=\"btn.cssClass\">{{ btn.label }}</button></div></div></div>");
}]);

angular.module("scripts/lcc/partials/common/verifyCode.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/common/verifyCode.html",
    "<div><div class=\"console-message-dialog\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" data-ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\">短信校验</h5></div><div class=\"modal-body clearfix\"><div class=\"col-sm-11 breakall\" style=\"padding-bottom: 0\"><form id=\"login_submit_form\" method=\"post\"><!--表单内自动生成input，其id一定为\"UA_InputId\" 提交表单时 同步调用提交ua  --><div class=\"form-group\"><label class=\"col-sm-3 control-label\"></label><div class=\"col-sm-7\"><input class=\"form-control\" id=\"verifyCode\" type=\"text\" placeholder=\"请输入短信校验码\" required=\"true\" ng-model=\"validation.verifyCode\"> 检测到您的账号存在异常。校验码已发送到您{{phone}}的手机 <a ng-click=\"sendVerifyCode()\">重新发送</a><p class=\"text-danger\">{{validation.error}}</p></div></div></form><script type=\"text/javascript\">var ua = null;\n" +
    "        if (!window.UA_Opt) {\n" +
    "          var UA_Opt = new Object();\n" +
    "          UA_Opt.SendMethod = 9;\n" +
    "          // 9保存到指定表单和指定js变量，1只保存到表单，8只保存到js变量中\n" +
    "          UA_Opt.FormId = \"login_submit_form\";\n" +
    "          //可选，保存ua到表单时，必须指定\n" +
    "          //UA_Opt.ExTarget = ['password'];\n" +
    "          //可选，不需要记录事件的元素id\n" +
    "          UA_Opt.LogVal = \"ua\";\n" +
    "          //可选，保存ua到变量时，必须指定，对应变量名要先声明;在浏览器console里面可查询\n" +
    "          UA_Opt.Token = new Date().getTime() + \":\" + Math.random();\n" +
    "          UA_Opt.MaxMCLog = 10;\n" +
    "          //鼠标点击事件最大获取个数，可选，默认50\n" +
    "          UA_Opt.MaxKSLog = 10;\n" +
    "          //键盘事件最大获取个数，可选，默认50\n" +
    "          UA_Opt.MaxMPLog = 10;\n" +
    "          //鼠标移动事件最大获取个数，可选，默认50\n" +
    "          //UA_Opt.MaxGPLog = 10; //默认选择5，ua中记录陀螺仪事件的最⼤大个数。 （移动端有需要可配置）\n" +
    "          //UA_Opt.MaxTCLog = 10; //默认选择150，ua中记录WAP页面touch事件的最⼤大个数。（移动端）\n" +
    "          UA_Opt.MaxFocusLog = 10;\n" +
    "          //默认选择150，ua中记录焦点切换事件的最⼤大个数。\n" +
    "          //UA_Opt.isSendError = 1; // 报告执⾏异常，默认为1，⽆线应⽤慎⽤\n" +
    "          UA_Opt.Flag = 621710;\n" +
    "          //PC，无线通用。需要捕获陀螺仪事件用883854\n" +
    "        }\n" +
    "        if (!window.getUA) {\n" +
    "          function getUA() {\n" +
    "            var tmp_ua = window[UA_Opt.LogVal];\n" +
    "            try {\n" +
    "              UA_Opt.Token = new Date().getTime() + \":\" + Math.random();\n" +
    "              UA_Opt.reload();\n" +
    "            } catch (err) {}\n" +
    "            return tmp_ua;\n" +
    "          }\n" +
    "        }</script></div></div><div class=\"modal-footer\"><button ng-click=\"validateCode(false)\" class=\"btn btn-primary\" ng-disabled=\"!validation.verifyCode || validation.verifyCode === ''\">确定</button></div></div></div><script type=\"text/javascript\" charset=\"utf-8\" src=\"http://uaction.alicdn.com/js/uab.js\"></script>");
}]);

angular.module("scripts/lcc/partials/resource/addEcs.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/addEcs.html",
    "<div class=\"console-message-dialog\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" ng-class=\"{disabled: uploader.progress >= 100}\" ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\">{{ title }}</h5></div><div ng-if=\"uploader.isHTML5\"><div class=\"modal-body clearfix\"><form class=\"form-horizontal\" role=\"form\"><div class=\"progress\" ng-if=\"uploader.queue.length\"><div class=\"progress-bar progress-bar-success progress-bar-striped\" role=\"progressbar\" aria-valuenow=\"{{uploader.progress}}\" aria-valuemin=\"0\" aria-valuemax=\"100\" ng-style=\"{'width': uploader.progress + '%'}\">{{uploader.progress + '%'}}</div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span>添加方式：</label><div class=\"col-sm-3\"><select class=\"form-control\" ng-model=\"selectedDeployType\" ng-options=\"t.text for t in deployTypes\"></select></div><div class=\"col-sm-3\" style=\"margin-top:8px\"><a class=\"inline-block lcc-helper-link ng-scope ng-binding\" href=\"{{IMPORT_ECS_URL}}\" target=\"_blank\" muse_scanned=\"true\">点击下载Excel文件模板</a></div></div><div class=\"form-group\" ng-show=\"selectedDeployType.type == 'upload'\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span>Excel文件上传：</label><div class=\"col-sm-6\"><input class=\"form-control\" readonly=\"readonly\" value=\"{{uploader.queue[uploader.queue.length-1].file.name}}\"></div><div class=\"col-sm-2\" ng-show=\"selectedDeployType.type == 'upload'\"><div class=\"btn btn-default lcc-file-uploade-btn\" style=\"position:relative\" ng-class=\"{disabled: uploader.isUploading}\">选择文件<input type=\"file\" nv-file-select uploader=\"uploader\"></div></div></div><div class=\"form-group\" ng-show=\"selectedDeployType.type == 'direct'\"><div class=\"col-sm-1\"></div><div class=\"col-sm-10\"><table class=\"table table-hover\"><thead><tr><th><span class=\"text-danger\">*</span>机器IP</th><th><span class=\"text-danger\">*</span>机器序列号</th><th>机器名称</th><th>CPU</th><th>内存</th><th>操作</th></tr></thead><tbody id=\"create_alarm_list\"><tr class=\"alarm_item\" ng-repeat=\"target in ecsList\"><td style=\"width: 100px\"><input type=\"text\" name=\"innerIp\" class=\"form-control\" ng-model=\"target.innerIp\" required></td><td style=\"width: 150px\"><input type=\"text\" name=\"serialNum\" class=\"form-control\" ng-model=\"target.serialNum\" required></td><td style=\"width: 100px\"><input type=\"text\" name=\"instanceName\" class=\"form-control\" ng-model=\"target.instanceName\" required></td><td style=\"width: 60px\"><input type=\"text\" name=\"cpu\" class=\"form-control\" ng-model=\"target.cpu\" required style=\"display: inline-block;width: 50%\"> <span class=\"control-label unit\">核</span></td><td style=\"width: 100px\"><input type=\"text\" name=\"mem\" class=\"form-control\" ng-model=\"target.mem\" required style=\"display: inline-block;width: 50%\"> <span class=\"control-label unit\">MB</span></td><td class=\"ta-r\" style=\"width:50px\"><nobr><a href=\"javascript:;\" ng-click=\"deleteItem(target)\" ng-show=\"$index > 0\" class=\"cmd_del error\">移除</a><span ng-show=\"$index == 0\" class=\"cmd_del error\"></span></nobr></td></tr></tbody></table><a href=\"javascript:;\" ng-click=\"addItem()\" id=\"add_alarm_item_command\">+ 添加机器</a></div></div><div class=\"form-group\" ng-class=\"{'has-error':errorMsg}\"><label class=\"col-sm-3 control-label\"></label><div class=\"col-sm-6\"><span class=\"help-block\" ng-if=\"errorMsg\">{{errorMsg}}</span> <span class=\"text-success\" ng-if=\"finishedMsg\">{{finishedMsg}}</span></div></div></form></div><div class=\"modal-footer\"><span ng-show=\"selectedDeployType.type == 'direct'\" style=\"float:left;color:red;margin-left:40px;text-align:left\">警告：</span> <span ng-show=\"selectedDeployType.type == 'direct'\" style=\"float:left;color:red;text-align:left\">1.请确保Excel的格式和模板一致,否则无法导入<br>2.请确保添加的机器有效,否则无法操作</span> <button ng-click=\"addOperation(selectedDeployType.type,ecsList)\" class=\"btn btn-primary\" ng-class=\"{disabled: uploader.isUploading}\">添加</button> <button ng-class=\"{disabled: uploader.progress >= 100}\" ng-click=\"close(false)\" class=\"btn btn-default\">取消</button></div></div><div ng-if=\"!uploader.isHTML5\"><div class=\"modal-body clearfix\"><div class=\"alert alert-warning\">提示：您的浏览器不支持HTML5文件上传，赶紧升级！</div></div><div class=\"modal-footer\"><button ng-click=\"close(false)\" class=\"btn btn-primary\">确认</button></div></div></div>");
}]);

angular.module("scripts/lcc/partials/resource/agentInstall.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/agentInstall.html",
    "<div><div class=\"console-message-dialog\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" data-ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\">LCC Agent 安装</h5></div><div ng-hide=\"tpl.isDoing\" class=\"col-sm-12\"><div ng-hide=\"tpl.ecus&&tpl.ecus.length\" class=\"modal-body clearfix\"><div class=\"col-sm-11 breakall\" style=\"padding-bottom: 0\"><p><div class=\"alert alert-warning\" ng-class=\"{'alert-danger': selected.none}\" style=\"margin-bottom:20px\"><span ng-hide=\"tpl.ecusSelectedAll&&tpl.ecusSelectedAll.length\" class=\"text-danger\">您尚未勾选任何ECS，请至少勾选一台待安装的ECS</span> <span ng-show=\"tpl.ecusSelectedAll.length-tpl.ecus.length\" class=\"text-danger\">您勾选的ECS机器中包含 [{{tpl.ecusSelectedAll.length-tpl.ecus.length}}] 台已过期的机器，无法安装Agent</span></div></p></div></div><form ng-show=\"tpl.ecus&&tpl.ecus.length\" novalidate=\"\" class=\"form-horizontal ng-scope ng-pristine ng-invalid ng-invalid-required\" role=\"form\" name=\"udpInstallForm\"><div class=\"modal-body clearfix\"><div class=\"col-sm-12 breakall\" style=\"padding-bottom: 0\"><p><div class=\"alert alert-warning\" ng-class=\"{'alert-danger': selected.none}\" style=\"margin-bottom:20px\"><div class=\"text-danger\">1. 目前支持Centos 6.5 64位 和 Ali-Linux 5.7 64位</div><div>2. 请确保勾选的ECS机器的用户名和密码一致</div></div></p></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> <span>JAVA版本</span>：</label><div class=\"col-sm-7\"><select ng-model=\"tpl.javaVersion\" ng-options=\"a for a in tpl.javaOptions\"></select><span class=\"help-block\"></span></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> <span>用户名</span>：</label><div class=\"col-sm-7\"><input name=\"username\" ng-required=\"true\" false=\"\" ng-model=\"tpl.username\" class=\"form-control ng-pristine ng-invalid ng-invalid-required\" id=\"\" required=\"required\"> <span class=\"help-block\"></span></div><div class=\"help-block col-sm-2 ng-hide\" ng-show=\"udpInstallForm.username.$dirty &amp;&amp; udpInstallForm.username.$invalid\"><div class=\"error text-danger\" ng-show=\"udpInstallForm.username.$error.required\"><span class=\"icon-no-2 rds-database-icon\"></span> <span>不能为空</span></div></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> <span>密码</span>：</label><div class=\"col-sm-7\"><input type=\"password\" name=\"pwd\" ng-required=\"true\" false=\"\" ng-model=\"tpl.pwd\" class=\"form-control ng-pristine ng-invalid ng-invalid-required\" id=\"\" required=\"required\"> <span class=\"help-block\"></span></div><div class=\"help-block col-sm-2 ng-hide\" ng-show=\"udpInstallForm.pwd.$dirty &amp;&amp; udpInstallForm.pwd.$invalid\"><div class=\"error text-danger\" ng-show=\"udpInstallForm.pwd.$error.required\"><span class=\"icon-no-2 rds-database-icon\"></span> <span>不能为空</span></div></div></div><!--div class=\"form-group\">\n" +
    "          <label class=\"col-sm-3 control-label\" ng-if=\"tpl.showManual === '1'\">点击隐藏手动脚本\n" +
    "          </label>\n" +
    "          <label class=\"col-sm-3 control-label\" ng-if=\"tpl.showManual != '1'\">点击展开手动脚本\n" +
    "          </label>\n" +
    "          <div class=\"col-sm-7\">\n" +
    "            <div class=\"form-control-static\">\n" +
    "              <div aliyun-on-off ng-model=\"tpl.showManual\" ng-true-value=\"1\" ng-false-value=\"0\"></div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div--><div class=\"form-group\"><div class=\"col-sm-12\"><span class=\"pull-right\">不想提供用户名密码？试试<a class=\"ng-scope\" target=\"_blank\" ng-click=\"tpl.toggle(tpl,'showManual')\">手动安装</a>吧 >>&nbsp;&nbsp;&nbsp;&nbsp;</span></div></div></form><div class=\"modal-body clearfix\" ng-show=\"tpl.showManual\"><div class=\"col-sm-11 breakall\" style=\"padding-bottom: 0\"><p><!--div class=\"alert alert-warning\" ng-class=\"{'alert-danger': selected.none}\" style=\"margin-bottom:20px;\">请在{{tpl.regionName}}区域的ECS上以root身份运行下列脚本\n" +
    "              <span class=\"text-danger\">(目前支持centos 6.5 64 bit, ali-linux 5.7 64bit)</span>：\n" +
    "            </div--><div class=\"table-viewer-header clearfix ng-scope\"><span class=\"table-viewer-topbar-title\">非vpc环境</span></div><pre>{{tpl.strEdasAgentInstall}}</pre><div class=\"table-viewer-header clearfix ng-scope\"><span class=\"table-viewer-topbar-title\">vpc环境</span></div><pre>{{tpl.strEdasAgentInstall_VPCrp}}</pre><br><div ng-show=\"!LCC_PRIVATE_CLOUD\"><div class=\"table-viewer-header clearfix ng-scope\"><span class=\"table-viewer-topbar-title\">批量安装LCC Agent(非vpc环境)</span> <span simple-table-toggle=\"\" class=\"toggle-drop-down-icon toggle-drop-down-icon1 ng-isolate-scope\" ng-hide=\"hideToggle\" toggle-show=\"toggleShow\"><span class=\"table-viewer-dropdown table-viewer-dropdown1 icon-up\" ng-class=\"{false:'icon-down',true:'icon-up'}[ !!toggleShow ]\"></span></span></div><pre class=\"toggleContent toggleContent1\" style=\"display:none\">\n" +
    "第一步：wget {{tpl.strEdasAgentGroupInstall}}\n" +
    "第二步：tar -zxvf lcc-agent-install.tar.gz && cd lcc-agent-install \n" +
    "第三步：编辑文件lcc-hosts.ini，将目标机器写到[lcc-agent]下面，例如：\n" +
    "···\n" +
    "$cat lcc-hosts.ini \n" +
    "[lcc-agent]\n" +
    "192.168.0.1\n" +
    "192.168.0.2\n" +
    "192.168.0.3\n" +
    "···\n" +
    "第四步： ./pre-install.sh （提示输入目标机器密码）\n" +
    "第五步： ./install.sh -ak {{tpl.AK}} -sk {{tpl.sk}} （提示输入目标机器密码）\n" +
    "              </pre><div class=\"table-viewer-header clearfix ng-scope\"><span class=\"table-viewer-topbar-title\">批量安装LCC Agent(vpc环境)</span> <span simple-table-toggle=\"\" class=\"toggle-drop-down-icon toggle-drop-down-icon2 ng-isolate-scope\" ng-hide=\"hideToggle\" toggle-show=\"toggleShow\"><span class=\"table-viewer-dropdown table-viewer-dropdown2 icon-up\" ng-class=\"{false:'icon-down',true:'icon-up'}[ !!toggleShow ]\"></span></span></div><pre class=\"toggleContent toggleContent2\" style=\"display:none\">\n" +
    "第一步：wget {{tpl.strEdasAgentGroupInstall_VPC}}\n" +
    "第二步：tar -zxvf lcc-agent-install_vpc.tar.gz && cd lcc-agent-install\n" +
    "第三步：编辑文件lcc-hosts.ini，将目标机器写到[lcc-agent]下面，例如：\n" +
    "···\n" +
    "$cat lcc-hosts.ini \n" +
    "[lcc-agent]\n" +
    "192.168.0.1\n" +
    "192.168.0.2\n" +
    "192.168.0.3\n" +
    "···\n" +
    "第四步： ./pre-install.sh （提示输入目标机器密码）\n" +
    "第五步： ./install.sh -ak {{tpl.AK}} -sk {{tpl.SK}} （提示输入目标机器密码）\n" +
    "              </pre></div></p></div></div></div><div class=\"col-sm-11 breakall\"><div ng-hide=\"!tpl.isDoing\" aliyun-loading size=\"48\" style=\"margin-top:0px;position:relative;left:50%;padding:40px 0\"></div></div><div class=\"col-sm-11 breakall\"><p ng-hide=\"!tpl.isDoing\" align=\"center\">正在部署...</p><div ng-hide=\"!tpl.isDoing\" lcc-slider-div slides=\"slides\"></div></div><div class=\"modal-footer\"><button ng-repeat=\"btn in buttons\" ng-disabled=\"(btn.result=='udpInstall'&&tpl.isDoing) || (btn.result=='udpInstall'&&udpInstallForm.$invalid)\" ng-click=\"eventHandler(btn.result)\" class=\"btn\" ng-class=\"btn.cssClass\">{{ btn.label }}</button></div></div></div>");
}]);

angular.module("scripts/lcc/partials/resource/bindEcs.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/bindEcs.html",
    "<div class=\"modal-content console-message-dialog\"><div class=\"modal-header\"><h5 class=\"modal-title\">{{resGroup.title}}</h5></div><div class=\"modal-body clearfix\"><form class=\"form-horizontal\" role=\"form\" name=\"createServiceGroupForm\"><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> 资源组名称：</label><div class=\"col-sm-7\"><label class=\"col-sm-7 form-control-static\">{{resGroup.groupName}}</label></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">ECS实例列表({{regionName}})：</label><div class=\"col-sm-7\" style=\"height:300px; overflow:auto\"><table class=\"table table-hover\" ng-if=\"!loadingState\"><thead><tr><th><input type=\"checkbox\" ng-model=\"isSelectAll\" ng-click=\"selectAll()\"></th><th>实例ID/名称</th><th>IP地址</th></tr></thead><tbody ng-if=\"ecsList.length === 0\"><tr><td colspan=\"5\" align=\"center\">没有查询到任何的ECS</td></tr></tbody><tbody ng-if=\"ecsList.length > 0\"><tr ng-repeat=\"ecs in ecsList\"><td><input type=\"checkbox\" ng-model=\"ecs.selected\"></td><td>{{ecs.instanceId}}/{{ecs.instanceName}}</td><td><p ng-if=\"ecs.innerIp\">{{ecs.innerIp}}<span class=\"text-muted\">（内）</span></p><p ng-if=\"ecs.publicIp\">{{ecs.publicIp}}<span class=\"text-muted\">（公）</span></p><p ng-if=\"ecs.privateIp\">{{ecs.privateIp}}<span class=\"text-muted\">（私）</span></p></td></tr></tbody></table><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top: 20px;margin-left:50%\"></div></div></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-success\" ng-disabled=\"createServiceGroupForm.$invalid\" data-ng-click=\"create()\">确定</button> <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"close(false)\">关闭</button></div></div>");
}]);

angular.module("scripts/lcc/partials/resource/bindSlb.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/bindSlb.html",
    "<div class=\"modal-content console-message-dialog\"><div class=\"modal-header\"><h5 class=\"modal-title\">{{resGroup.title}}</h5></div><div class=\"modal-body clearfix\"><form class=\"form-horizontal\" role=\"form\" name=\"createServiceGroupForm\"><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> 资源组名称：</label><div class=\"col-sm-7\"><label class=\"col-sm-7 form-control-static\">{{resGroup.groupName}}</label></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">SLB实例列表({{regionName}})：</label><div class=\"col-sm-7\" style=\"height:300px; overflow:auto\"><table class=\"table table-hover\" ng-if=\"!loadingState\"><thead><tr><th><input type=\"checkbox\" ng-model=\"isSelectAll\" ng-click=\"selectAll()\"></th><th>实例名称</th><th>服务地址</th></tr></thead><tbody ng-if=\"slbList.length === 0\"><tr><td colspan=\"5\" align=\"center\">没有查询到任何的SLB</td></tr></tbody><tbody ng-if=\"slbList.length > 0\"><tr ng-repeat=\"slb in slbList\"><td><input type=\"checkbox\" ng-model=\"slb.selected\"></td><td>{{slb.slbId}}</td><td>{{slb.address}}<span class=\"text-muted\" ng-show=\"slb.addressType == 'intranet'\">（内）</span><span class=\"text-muted\" ng-show=\"slb.addressType != 'intranet'\">（外）</span></td></tr></tbody></table><div ng-hide=\"!loadingState\" aliyun-loading size=\"48\" style=\"margin-top: 20px;margin-left:50%\"></div></div></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-success\" ng-disabled=\"createServiceGroupForm.$invalid\" data-ng-click=\"create()\">确定</button> <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"close(false)\">关闭</button></div></div>");
}]);

angular.module("scripts/lcc/partials/resource/createGroup.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/createGroup.html",
    "<div class=\"modal-content console-message-dialog\"><div class=\"modal-header\"><h5 class=\"modal-title\">{{resGroup.title}}</h5></div><div class=\"modal-body clearfix\"><form class=\"form-horizontal\" role=\"form\" name=\"createServiceGroupForm\"><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> 资源组名称：</label><div class=\"col-sm-7\"><input type=\"text\" id=\"groupName\" required ng-model=\"resGroup.groupName\" class=\"form-control\" placeholder=\"请输入资源组名称\" ng-pattern=\"/^[0-9A-Za-z_\\u4e00-\\u9fa5]+$/\" name=\"groupName\" ng-minlength=\"2\" ng-maxlength=\"32\" check-resgroup-name> <span ng-show=\"createServiceGroupForm.groupName.$error.groupName\" class=\"text-danger\">{{error.message}}</span> <span class=\"text-danger\" ng-show=\"createServiceGroupForm.groupName.$error.pattern\">资源组名称由数字，字母或下划线组成。</span><p class=\"help-block\">长度限制为2-32个字符。</p></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\">资源组描述：</label><div class=\"col-sm-7\"><input type=\"text\" ng-model=\"resGroup.description\" class=\"form-control\" placeholder=\"请输入资源组描述\" ng-maxlength=\"64\"><p class=\"help-block\">您最多可以输入64个字符。</p></div></div></form><div class=\"alert alert-warning\" ng-if=\"warnMessage\">{{warnMessage}}</div></div><div class=\"modal-footer\"><button class=\"btn btn-success\" ng-disabled=\"createServiceGroupForm.$invalid\" data-ng-click=\"create()\">确定</button> <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"close(false)\">关闭</button></div></div>");
}]);

angular.module("scripts/lcc/partials/resource/createSnapshot.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/createSnapshot.html",
    "<div bindonce><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" data-ng-click=\"close(false)\" aria-hidden=\"true\">&times;</button><h5 class=\"modal-title\" bo-text=\" 'ecs.diskcs.dl.lb.title' | translate\"></h5></div><div class=\"modal-body\"><form class=\"form-horizontal\" role=\"form\" name=\"form\" novalidate><div class=\"form-group\"><label class=\"col-sm-3 control-label\" bo-text=\" 'ecs.disk.dt.lb.disk_id' | translate\"></label><div class=\"col-sm-7\"><div class=\"form-control-static\"><span>{{disk.deviceNo}}</span></div></div></div><div class=\"form-group\" ng-if=\"disk.instanceId\"><label class=\"col-sm-3 control-label\" bo-text=\" 'ecs.disk.list.lb.instance_id' | translate\"></label><div class=\"col-sm-7\"><div class=\"form-control-static\"><span>{{disk.instanceId}}</span></div></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\" bo-text=\" 'ecs.disk.dt.lb.disk_attr' | translate\"></label><div class=\"col-sm-7\"><div class=\"form-control-static\"><span>{{disk.deviceCategory | ecsDeviceCategoryFilter : disk.portable}}</span></div></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span>{{ 'ecs.diskcs.dl.lb.snapshot_name' | translate}}</label><div class=\"col-sm-7\"><input type=\"text\" class=\"form-control\" ng-minlength=\"2\" ng-maxlength=\"128\" ng-required=\"true\" ecs-name-prefix-validator data-ng-model=\"disk.snapshotName\" id=\"snapshotName\" ng-pattern=\"/^(?!auto)/\" name=\"snapshotName\"> <span class=\"help-block\" bo-html=\" 'ecs.diskcs.dl.lb.msg_name_length' | translate\"></span><div class=\"error help-block\" ng-show=\"form.snapshotName.$dirty && form.snapshotName.$invalid\"><small class=\"error text-danger\" ng-show=\"form.snapshotName.$error.required || form.snapshotName.$error.minlength ||\n" +
    "                              form.snapshotName.$error.maxlength || form.snapshotName.$error.ecsNamePrefixValidator\" bo-text=\" 'ecs.cm.validator.lb.name_2_128' | translate\"></small> <small class=\"error text-danger\" ng-show=\"form.snapshotName.$error.pattern\" bo-html=\" 'ecs.diskcs.dl.lb.err_msg_name' | translate\"></small></div></div></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-disabled=\"form.$invalid\" data-ng-click=\"createSnapshot()\" bo-text=\" 'ecs.common.dlg.bt.submit' | translate\"></button> <button class=\"btn btn-default\" data-ng-click=\"close(false)\" bo-text=\" 'ecs.common.dlg.bt.cancel' | translate\"></button></div></div>");
}]);

angular.module("scripts/lcc/partials/resource/ecsTip.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/ecsTip.html",
    "<p>实例ID： {{templateData.instanceId}}</p><p>实例名称： {{templateData.instanceName}}</p><p bindonce ng-if=\"templateData.innerIpAddress\">{{templateData.innerIpAddress}}<span class=\"text-muted\">（内）</span></p><p bindonce ng-if=\"templateData.publicIpAddress\">{{templateData.publicIpAddress}}<span class=\"text-muted\">（公）</span></p><p bindonce ng-if=\"templateData.privateIpAddress\">{{templateData.privateIpAddress}}<span class=\"text-muted\">（私）</span></p>");
}]);

angular.module("scripts/lcc/partials/resource/editDs.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/editDs.html",
    "<div class=\"modal-content console-message-dialog\"><div class=\"modal-header\"><h5 class=\"modal-title\">{{title}}</h5></div><div class=\"modal-body clearfix\"><form class=\"form-horizontal\" role=\"form\" name=\"createServiceGroupForm\"><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> Group：</label><div class=\"col-sm-7\"><input type=\"text\" required ng-model=\"ds.group\" class=\"form-control\" placeholder=\"Group\" ng-pattern=\"/^.[A-Za-z0-9\\_\\-\\.\\:]{1,128}$/\" ng-disabled=\"isEdit || isView\"><p class=\"help-block\">长度为1-128，特殊字符只支持[._:-]四种。</p></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> DataId：</label><div class=\"col-sm-7\"><input type=\"text\" required ng-model=\"ds.dataId\" class=\"form-control\" placeholder=\"DataId\" ng-pattern=\"/^.[A-Za-z0-9\\_\\-\\.\\:]{1,255}$/\" ng-disabled=\"isEdit || isView\"><p class=\"help-block\">长度为1-255，特殊字符只支持[._:-]四种。</p></div></div><div class=\"form-group\"><label class=\"col-sm-3 control-label\"><span class=\"text-danger\">*</span> Content：</label><div class=\"col-sm-7\"><!-- <input type=\"text\" required ng-model='ds.content' class=\"form-control\" placeholder=\"Content\" ng-minlength=\"1\"> --><textarea required ng-model=\"ds.content\" class=\"form-control\" placeholder=\"Content\" ng-minlength=\"1\" ng-disabled=\"isView\" style=\"resize: none; height: 150px\"></textarea><p class=\"help-block\">&nbsp;</p></div></div></form><div class=\"alert alert-warning\" ng-if=\"warnMessage\">{{warnMessage}}</div></div><div class=\"modal-footer\"><button class=\"btn btn-success\" ng-disabled=\"isView || createServiceGroupForm.$invalid\" data-ng-click=\"saveDs()\">确定</button> <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"close(false)\">关闭</button></div></div>");
}]);

angular.module("scripts/lcc/partials/resource/servicePublish.html", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("scripts/lcc/partials/resource/servicePublish.html",
    "<div class=\"modal-content console-message-dialog\"><div class=\"modal-header\"><h5 class=\"modal-title\">服务名：{{data.dataId.split(\":\")[0]}}</h5></div><div class=\"modal-body clearfix\"><table ng-repeat=\"d in data.details\" class=\"table table-hover table-bordered\"><tbody><tr><td>源数据：</td><td style=\"width: 450px;word-break: break-all\">{{d.data}}</td></tr><tr><td>服务端口：</td><td>{{d.port}}</td></tr><tr><td>协议版本：</td><td>{{d.v}}</td></tr><tr><td>请求超时时间：</td><td>{{d._TIMEOUT}}ms</td></tr><tr><td>空闲超时时间：</td><td>{{d._IDLETIMEOUT*1000}}ms</td></tr><tr><td>序列化协议：</td><td>{{d._SERIALIZETYPE}}</td></tr></tbody></table></div><div class=\"modal-footer\"><button class=\"btn btn-success\" data-ng-click=\"close(false)\">确定</button></div></div>");
}]);
