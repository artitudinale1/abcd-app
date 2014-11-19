'use strict';

/* Directives */


angular.module('JpcAbcApp.directives', []).directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

angular.module('JpcAbcApp.directives', []).directive('getPic',  function () {
 return {
        restrict: 'A',          
        transclude: true,
        link: function (scope, iterStartElement, attr) {
        var selectmenu=document.getElementById("userslist")
        var x =document.getElementById("userlogged")
        selectmenu.onchange=function(){ //run some code when "onchange" event fires
            var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
            if (chosenoption.value!="nothing"){
                document.getElementById('personeTo')
                .innerHTML = '<p style="text-align:left;">' + 'You are voting for  '+ '<i>' + chosenoption.label + '</i>' + '</p>' + '<img id="voted-pic" src=" '+ chosenoption.id  + '"/>'
              }
            }
          }
        }
      });

