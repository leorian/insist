/**
 * bootstrap file for application.
 */
define([
  'angular',
  'app',
  'lcc/initConfig',
  'lcc/controllers/_base',
  'lcc/states/_base',
  'lcc/services/_base',
  'lcc/directives/_base',
  'lcc/filters/_base',
  'common/services/_base',
  'common/services/topicService',
  'common/directives/_base',
  'common/directives/tooltip',
  'common/directives/simpleGrid'
], function(angular){
  'use strict';

	angular.element(document).ready(function(){
		angular.bootstrap(document, ['lccConsole']);
	});
});
