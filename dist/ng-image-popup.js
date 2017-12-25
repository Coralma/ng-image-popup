angular.module('ng-image-popup', [])
    .directive('ngImagePopup', ['$rootScope', 'ImagePopupService','$timeout', function ($rootScope,ImagePopupService, $timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                image: '@'
            },
            link: function (scope, element, attrs) {
                ImagePopupService.setLoadingInstance(function(status, msg) {
                    var item = angular.element("#popup-image");
                    var imageDiv = angular.element("#image-related-div");
                    if(status == 1) {
                        if(msg) {
                            scope.image = msg;
                        }
                        var leftSize = ($(window).width() - 700) / 2;
                        imageDiv.css('width', 700);
                        imageDiv.css("left", leftSize);
                        imageDiv.css("visibility", 'hidden');
                        angular.element("#popup-mask").css("display" , "block");
                        angular.element("#popup-image").css("display", "block");
                    }
                    if(status == 0) {
                        angular.element("#popup-mask").css("display" , "none");
                        angular.element("#popup-image").css("display", "none");
                    }
                    $timeout(function() {
                        var showImage = angular.element("#show-image");
                        var imageWidth = showImage.width();
                        var leftSize = ($(window).width() - imageWidth) / 2;
                        imageDiv.css('width', imageWidth);
                        imageDiv.css("left", leftSize);
                        imageDiv.css("visibility", 'visible');
                    },100);
                });
                scope.close = function() {
                    ImagePopupService.complete();
                };
            },
            template:
            '<div>' +
            '   <div id="popup-mask"></div>' +
            '   <div id="popup-image">' +
            '       <div class="image-related-div" id="image-related-div">' +
            '           <img ng-src="{{image}}" class="image-content animated slideInDown" id="show-image">' +
            '           <span class="popup-close-btn animated rotateInDownRight" ng-click="close()"></span>' +
            '       </div>' +
            '   </div>' +
            '</div>'
        }
    }])
    .factory('ImagePopupService', ['$timeout',function($timeout) {
        var status = 0;
        var loadingInstance;

        return {
            start : function(msg) {
                status = 1;
                loadingInstance(status, msg);
            },
            complete : function() {
                status = 0;
                loadingInstance(status);
                //$timeout.cancel(timer);
            },
            status : status,
            setLoadingInstance : function(instance) {
                loadingInstance = instance;
            }
        }
    }]);