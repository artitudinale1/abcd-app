'use strict';

/* Directives */


angular.module('myApp.directives', []).directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);





    };




  }]);




angular.module('myApp.directives', []).directive('getPic',  function () {
 return {
        restrict: 'A',
          transclude: true,
        
        //templateUrl: '/partials/template.html',
        link: function (scope, iterStartElement, attr) {




          console.log(document);
         
 
console.log(document);
var selectmenu=document.getElementById("userslist")

var x =document.getElementById("userlogged")



//results()


selectmenu.onchange=function(){ //run some code when "onchange" event fires
console.log("in change function");
 var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
 if (chosenoption.value!="nothing"){

  document.getElementById('personeTo')
    .innerHTML = '<p style="text-align:left;">' + 'You are voting for  '+ '<i>' + chosenoption.label + '</i>' + '</p>' + '<img id="voted-pic" src=" '+ chosenoption.id  + '"/>'
    console.log(chosenoption.id)
     console.log(document.getElementById("userlogged").textContent)
}   





}


   




        }
      }
    }
    
)


  // gia dwvo far la spesa ....nn vado da nessuna parte...alla tesco..that s it 

