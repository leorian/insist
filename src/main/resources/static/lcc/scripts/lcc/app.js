define([
  'angular',
  'angular-cookies',
  'angular-file-upload',
  'ui.router',
  'ui.bootstrap',
  'ui.select2',
  'common/directives/aliyunInstanceSelector',
  'angular-animate',
  'angular-growl',
  'angular-ui-validate',
  'angular-sanitize',
  'aliyun-console-bootstrap-tpl',
  'angular-locale-zh-cn',
  'angular-translate',
  'aliyun-lcc-tpl',
  'bindonce',
  'common/directives/viewFramework',
  'common-tpl',
  'common/helper/objectHelper',
  'common/directives/aliyunCommonDirectives',
  'angularScreenfull'
], function(angular){
  'use strict';

  return angular.module('lccConsole', ['ui.router', 'ui.bootstrap', 'ui.select2', 'angularFileUpload',
        'aliyun.console.common.tpl', 'aliyun.console.bootstrap.tpl', 'aliyun.console.lcc.tpl',
        'ui.validate', 'ngSanitize', 'ngAnimate', 'ngCookies', 'angular-growl', 'pasvaz.bindonce',  'pascalprecht.translate',
        'aliyunConsoleControllers','aliyunCommonDirectives', 'aliyunCommonServices',
        'lccControllers', 'lccStates', 'lccServices',
        'lccDirectives','lccFilters','aliyun.console.viewFramework', 'angularScreenfull', 'console.dateRangePicker'])
});
