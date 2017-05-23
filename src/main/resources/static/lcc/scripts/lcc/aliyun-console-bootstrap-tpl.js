angular.module("aliyun.console.bootstrap.tpl", ["template/accordion/accordion-group.html", "template/accordion/accordion.html", "template/alert/alert.html", "template/carousel/carousel.html", "template/carousel/slide.html", "template/datepicker/datepicker.html", "template/datepicker/popup.html", "template/modal/backdrop.html", "template/modal/window.html", "template/pagination/pager.html", "template/pagination/pagination.html", "template/popover/popover.html", "template/progressbar/bar.html", "template/progressbar/progress.html", "template/progressbar/progressbar.html", "template/rating/rating.html", "template/tabs/tab.html", "template/tabs/tabset.html", "template/timepicker/timepicker.html", "template/tooltip/tooltip-html-unsafe-popup.html", "template/tooltip/tooltip-popup.html", "template/typeahead/typeahead-match.html", "template/typeahead/typeahead-popup.html"]),
    angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/accordion/accordion-group.html", '<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a class="accordion-toggle" ng-click="isOpen = !isOpen" accordion-transclude="heading">{{heading}}</a></h4></div><div class="panel-collapse" collapse="!isOpen"><div class="panel-body" ng-transclude></div></div></div>')
    }]),
    angular.module("template/accordion/accordion.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/accordion/accordion.html", '<div class="panel-group" ng-transclude></div>')
    }]),
    angular.module("template/alert/alert.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/alert/alert.html", '<div class="alert" ng-class="&quot;alert-&quot; + (type || &quot;warning&quot;)"><button ng-show="closeable" type="button" class="close" ng-click="close()">&times;</button><div ng-transclude></div></div>')
    }]),
    angular.module("template/carousel/carousel.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/carousel/carousel.html", '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel"><ol class="carousel-indicators" ng-show="slides().length > 1"><li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li></ol><div class="carousel-inner" ng-transclude></div><a class="left carousel-control" ng-click="prev()" ng-show="slides().length > 1"><span class="icon-prev"></span></a> <a class="right carousel-control" ng-click="next()" ng-show="slides().length > 1"><span class="icon-next"></span></a></div>')
    }]),
    angular.module("template/carousel/slide.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/carousel/slide.html", "<div ng-class=\"{\n    'active': leaving || (active && !entering),\n    'prev': (next || active) && direction=='prev',\n    'next': (next || active) && direction=='next',\n    'right': direction=='prev',\n    'left': direction=='next'\n  }\" class=\"item text-center\" ng-transclude></div>")
    }]),
    angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/datepicker/datepicker.html", '<div class="console-datepicker"><table><thead><tr><th><button type="button" class="btn btn-link btn-sm pull-left" ng-click="move(-1)"><i class="glyphicon glyphicon-chevron-left"></i></button></th><th colspan="{{rows[0].length - 2 + showWeekNumbers}}"><button type="button" class="btn btn-default btn-sm btn-block" ng-click="toggleMode()"><strong>{{title}}</strong></button></th><th><button type="button" class="btn btn-link btn-sm pull-right" ng-click="move(1)"><i class="glyphicon glyphicon-chevron-right"></i></button></th></tr><tr ng-show="labels.length > 0" class="h6"><th ng-show="showWeekNumbers" class="text-center"><em>#</em></th><th ng-repeat="label in labels" class="text-center">{{label}}</th></tr></thead><tbody><tr ng-repeat="row in rows"><td ng-show="showWeekNumbers" class="text-center"><em>{{ getWeekNumber(row) }}</em></td><td ng-repeat="dt in row" class="text-center"><button type="button" style="width:100%" class="btn btn-default btn-sm" ng-class="{\'active\': dt.selected}" ng-click="select(dt.date)" ng-disabled="dt.disabled"><span ng-class="{\'text-muted\': dt.secondary}">{{dt.label}}</span></button></td></tr></tbody></table></div>')
    }]),
    angular.module("template/datepicker/popup.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/datepicker/popup.html", '<ul class="dropdown-menu" ng-style="{display: (isOpen && \'block\') || \'none\', top: position.top+\'px\', left: position.left+\'px\'}"><li ng-transclude></li><li ng-show="showButtonBar" style="padding:4px 16px 8px"><!-- <span class="btn-group"> --><button type="button" class="btn btn-sm btn-default" ng-click="today()">{{currentText}}</button> <button type="button" class="btn btn-sm btn-default" ng-click="showWeeks = ! showWeeks" ng-class="{active: showWeeks}">{{toggleWeeksText}}</button> <button type="button" class="btn btn-sm btn-danger" ng-click="clear()">{{clearText}}</button><!-- </span> --> <button type="button" class="btn btn-sm btn-success pull-right" ng-click="isOpen = false">{{closeText}}</button></li></ul>')
    }]),
    angular.module("template/modal/backdrop.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/modal/backdrop.html", '<div class="modal-backdrop fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1040 + index*10}"></div>')
    }]),
    angular.module("template/modal/window.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/modal/window.html", '<div tabindex="-1" class="modal fade {{ windowClass }}" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)"><div class="modal-dialog"><div class="modal-content" ng-transclude></div></div></div>')
    }]),
    angular.module("template/pagination/pager.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/pagination/pager.html", '<ul class="pager"><li ng-repeat="page in pages" ng-class="{disabled: page.disabled, previous: page.previous, next: page.next}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li></ul>')
    }]),
    angular.module("template/pagination/pagination.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/pagination/pagination.html", '<ul class="pagination"><li ng-repeat="page in pages" ng-class="{active: page.active, disabled: page.disabled}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li></ul>')
    }]),
    angular.module("template/popover/popover.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/popover/popover.html", '<div class="popover {{placement}}" ng-class="{ in: isOpen(), fade: animation() }"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title" ng-bind="title" ng-show="title"></h3><div class="popover-content" ng-bind="content"></div></div></div>')
    }]),
    angular.module("template/progressbar/bar.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/progressbar/bar.html", '<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" ng-transclude></div>')
    }]),
    angular.module("template/progressbar/progress.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/progressbar/progress.html", '<div class="progress" ng-transclude></div>')
    }]),
    angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/progressbar/progressbar.html", '<div class="progress"><div class="progress-bar" ng-class="type && \'progress-bar-\' + type" ng-transclude></div></div>')
    }]),
    angular.module("template/rating/rating.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/rating/rating.html", '<span ng-mouseleave="reset()"><i ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < val && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')"></i></span>')
    }]),
    angular.module("template/tabs/tab.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/tabs/tab.html", '<li ng-class="{active: active, disabled: disabled}"><a ng-click="select()" tab-heading-transclude>{{heading}}</a></li>')
    }]),
    angular.module("template/tabs/tabset.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/tabs/tabset.html", '<div class="tabbable"><ul class="nav {{type && \'nav-\' + type}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul><div class="tab-content"><div class="tab-pane" ng-repeat="tab in tabs" ng-class="{active: tab.active}" tab-content-transclude="tab"></div></div></div>')
    }]),
    angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/timepicker/timepicker.html", '<div class="console-timepicker"><div class="console-number-spinner" ng-class="{\'has-error\': invalidHours}"><input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-disabled="readonlyInput" maxlength="" size="4"><div class="console-number-spinner-action"><button ng-disabled="readonlyInput" data-ng-click="incrementHours()" class="console-number-spinner-up"><span class="icon-up"></span></button> <button ng-disabled="readonlyInput" data-ng-click="decrementHours()" class="console-number-spinner-down"><span class="icon-down"></span></button></div></div><strong>&nbsp;:&nbsp;</strong><div class="console-number-spinner" ng-class="{\'has-error\': invalidMinutes}"><input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-disabled="readonlyInput" maxlength="2" size="4"><div class="console-number-spinner-action"><button ng-disabled="readonlyInput" data-ng-click="incrementMinutes()" class="console-number-spinner-up"><span class="icon-up"></span></button> <button ng-disabled="readonlyInput" data-ng-click="decrementMinutes()" class="console-number-spinner-down"><span class="icon-down"></span></button></div></div><span ng-show="showMeridian"><button type="button" class="btn btn-default text-center" ng-click="toggleMeridian()">{{meridian}}</button></span></div>')
    }]),
    angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }"><div class="tooltip-arrow"></div><div class="tooltip-inner" bind-html-unsafe="content"></div></div>')
    }]),
    angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" ng-class="{ in: isOpen(), fade: animation() }"><div class="tooltip-arrow"></div><div class="tooltip-inner" ng-bind="content"></div></div>')
    }]),
    angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/typeahead/typeahead-match.html", '<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')
    }]),
    angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function (e) {
        "use strict";
        e.put("template/typeahead/typeahead-popup.html", '<ul class="dropdown-menu" ng-style="{display: isOpen()&&\'block\' || \'none\', top: position.top+\'px\', left: position.left+\'px\'}"><li ng-repeat="match in matches" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)"><div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div></li></ul>')
    }]);