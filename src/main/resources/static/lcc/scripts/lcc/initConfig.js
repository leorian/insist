'use strict';

define([
    'angular',
    'app',
    'common/helper/i18nHelper',
    'lcc/cons/lccCons',
    'lcc/utils/lccVariablesService',
    'common/cons/aliyunConsTopbar',
    'common/controllers/commonController',
    'common/services/aliyunHttpHandler',
    'common/directives/topbar-new',
    'common/directives/globalNotice',
    'common/directives/datetimePicker'
], function (angular, app, i18nHelper, lccCons, lccVariablesService, aliyunConsTopbar) {

  app.config([ 'aliyunConsoleSettingProvider', function(aliyunConsoleSettingProvider) {
    aliyunConsoleSettingProvider.setProviderOptions({
      /**
       * 自定义URl的映射规则
       * @param url
       * @returns {*}
       */
      linkHandler: function(url){
        return url;
      },
      /**
       * Http 请求参数的hook
       * @param options
       */
      httpOptionInterceptor: function(options){
        //options.data.secToken = lccVariablesService.getSecToken; 改成通过http header传csrf token
      },

      httpResponseInterceptor: function(response, $injector) {
        // if (response.data && response.data.code && response.data.code.toString().indexOf('60')==0 ) {
        //   var commonTopicService = $injector.get('aliyunCommonTopicService');
        //   commonTopicService.publish('showResponseErrorMessage',{
        //     message: response.data.message
        //   });
        //   //606则继续下面的业务，仅仅是提示
        //   if(response.data.code.toString() != "606"){
        //     return false;
        //   }
        // }
      },

      sessionTimeoutLink: lccVariablesService.getGlobalKey('LCC_CONSOLE_CONFIG').LOGIN || '',
      sessionTimeoutCode: 'ConsoleNeedLogin',

      sessionNeedBuyLink: "http://www.aliyun.com/product/lcc",
      sessionNeedBuyCode: 'ConsoleNeedBuy',

      sessionNeedNoticeLink: "http://" + location.host + "/#/notice/",
      sessionNeedNoticeCode: 'ConsoleNeedNotice'
    })
  }])
  app.config(['$tooltipProvider', function($tooltipProvider){
      $tooltipProvider.options({
        appendToBody: true
      })
    }])

  // app.constant('NAVBAR_CONS', lccCons.NAVBAR_CONS)
    .run(['$rootScope', '$cookieStore', 'viewFrameworkSetting', 'productNavBarSetting', 
      function($rootScope, $cookieStore, viewFrameworkSetting, productNavBarSetting) {
        viewFrameworkSetting.setProductNavBar('col-1'); //配置导航显示,可选[none|col-1|col-2]
        viewFrameworkSetting.setProductId('lccApp'); //配置产品id
        viewFrameworkSetting.setShowTopbar(true); //设置Topbar显示或隐藏(默认显示)
        viewFrameworkSetting.setHideSidebar(true); //设置左侧导航隐藏(默认显示)
        viewFrameworkSetting.setTopbarNavLinks({"accesskeys":{"show":false},"assist":{"show":false},"customHelp":{"show":false},"help":{"show":false},"home":{"show":true},"i18n":{"show":false,"showNew":false},"icp":{"show":false},"logo":{"show":false},"message":{"show":false},"product":{"show":false},"qrcode":{"show":false},"search":{"show":false},"user":{"show":false},"workorder":{"show":false}})
        viewFrameworkSetting.onReady(function(){
            //console.log('view framework ready!');
        });
        viewFrameworkSetting.setVersion("1.3.27");
        productNavBarSetting.setTitle('EDAS配置中心'); //配置主导航标题
        productNavBarSetting.setMainNav(lccCons.NAVBAR_CONS.mainNav_NotLoggedIn); //设置主导航数据


        aliyunConsTopbar.BETA_CONS.link.userLinks[3].href="/json/logout.htm";
        var regionList = lccVariablesService.getGlobalKey('REGION_LIST_CONFIG') || [];
        var cookieIdForRegionNo = lccCons.LCC_COOKIE_SELECTED_REGION_NO;

        $rootScope.lccConfig = {
          regionList: regionList,
          selectedRegionNo: '',
          lccAgentInstall: '',
          lccAgentInstall_VPC: '',
          selectedRegionName: '',
          updateSelectedRegion: function(regionNo){
            var regionValid = false;
            angular.forEach(regionList, function(region){
              if(regionNo == region.regionNo){
                regionValid = true;
                region.currentRegionActive = 'active';
                $rootScope.lccConfig.selectedRegionNo = regionNo;
                $rootScope.lccConfig.lccAgentInstall = region.agentInstall;
                $rootScope.lccConfig.lccAgentInstall_VPC = region.agentInstall4vpc||'';
                $rootScope.lccConfig.selectedRegionName = region.regionName;
                $cookieStore.put(cookieIdForRegionNo , regionNo);
              }else{
                region.currentRegionActive = '';
              }
            })

            return {
              regionValid: regionValid,
              regionNo: regionNo
            }
          }
        }


        var serverSelectedRegionNo = $cookieStore.get(cookieIdForRegionNo);
        if(serverSelectedRegionNo == undefined && regionList && regionList.length > 0){
          serverSelectedRegionNo = regionList[0].regionNo;
        }
        if(serverSelectedRegionNo){
          $rootScope.lccConfig.updateSelectedRegion(serverSelectedRegionNo) ;
        }
      }
    ])
  .config(['$translateProvider', function($translateProvider) {
      var messages = window.ALIYUN_LCC_CONSOLE_MESSAGE || {}
      $translateProvider.translations('zh', messages);
      $translateProvider.preferredLanguage('zh');
      i18nHelper.i18nConfig(messages);
  }]);
});
