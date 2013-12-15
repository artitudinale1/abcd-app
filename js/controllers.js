'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])
  .controller('MyCtrl2', [function() {

  }])

    .controller('MyCtrl3', [function() {

  }])
        .controller('MyCtrl4', [function() {


  }]);



function Cntl2($window, $scope, angularFire, filterFilter){
$scope.toggle = true;

$scope.removeUser = function(ref) {
  // Now we can get back to that item we just pushed via .child().
  ref.remove(function(error) {
    alert(error ? "Uh oh!" : "Successfully detele user!");
  });
}
 
  $scope.Delete_user = function(name) {

    var testRef = new Firebase("https://alex-jpcreative.firebaseio.com/users")
    var newRef = testRef.child(name);

  // Now we can get back to that item we just pushed via .child().
 $scope.removeUser(newRef);
}

   $scope.logout = function () {
  auth.logout();
  console.log('logout!!!')
}



var myDataRef = new Firebase('https://alex-jpcreative.firebaseio.com/');
var auth = new  FirebaseSimpleLogin(myDataRef, function(error, user) {
 
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {

var usersURL = new Firebase('https://alex-jpcreative.firebaseio.com/users');

usersURL.on('value', function(snapshot) {
$scope.users = snapshot.val();


});


var url = new Firebase('https://alex-jpcreative.firebaseio.com/votes');
url.on('value', function(snapshot) {
    var votes = snapshot.val();
    console.log(votes[1]);


      $scope.jsonVotes = {}

$scope.getImg = function (name) {
    
          for(var key in $scope.users) {
            console.log( $scope.users[key].name )
            
             if ( $scope.users[key].name == name) {
                      var x = $scope.users[key].pic;
                      console.log('match')
                      console.log(x)

                      }
            }
              return x


            }
      


var newJson = {}






  // for(var i = 0, l = votes.length; i < l; i++) {
var count=0;
    for( var b in $scope.users) {


//console.log($scope.users[b]);
    newJson[count] = {};
   
    newJson[count].name= $scope.users[b].name;
     newJson[count].pic= $scope.users[b].pic;
    newJson[count].vote= 0
    count++;


}
     
   console.log("this ...what is this..")

   console.log(newJson)

for( var c in votes) {
   for (var z in newJson) {
       if (newJson[z].name ==  votes[c].to) {
           newJson[z].vote++;
       }
   } 
}

var arreyM = []

 for (var i in newJson) {
    arreyM [i] = {}

      arreyM[i]['name']= newJson[i].name;
      arreyM[i]['pic']= newJson[i].pic
      arreyM[i]['vote'] =  newJson[i].vote; 
 } $scope.newJson = newJson 


   console.log(" AND ..THIS....this ...what is this..")

       console.log(arreyM);

       $scope.arreyM = arreyM;


var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

var current_month = new Date();
var month_value = current_month.getMonth();

$scope.month1 = months[month_value] ;
console.log($scope.month1)
$scope.votemonths = []






for(var i = 0, l = votes.length; i < l; i++) {

  console.log(typeof votes[i].date)

var from = votes[i].date.split("/");
var d = new Date(from[2], from[1] - 1, from[0]);
var m = d.getMonth();


  if (m >= month_value) {
   

$scope.votemonths.push(votes[i] )
  }
  else
  {
   

  }
}
  console.log( $scope.votemonths );
 var jsonVotesMonth = {}
 var y = 0

console.log($scope.votemonths )

    for( var d in $scope.users) {


//console.log($scope.users[b]);
   jsonVotesMonth[y] = {};

   console.log(   jsonVotesMonth[y] )
    jsonVotesMonth[y].name= $scope.users[d].name;
 jsonVotesMonth[y].pic= $scope.users[d].pic;
    jsonVotesMonth[y].vote= 0
    y++;


}
     

   console.log( jsonVotesMonth)



for( var e in $scope.votemonths) {
   for (var f in jsonVotesMonth) {
       if (jsonVotesMonth[f].name ==  $scope.votemonths[e].to) {
           jsonVotesMonth[f].vote++;
       }
   } 
}

 
 $scope.jsonVotesMonth = jsonVotesMonth
//console.log( $scope.jsonVotesMonth );

var arreyM2 = []

 for (var i in jsonVotesMonth) {
    arreyM2 [i] = {}

      arreyM2[i]['name']= jsonVotesMonth[i].name;
      arreyM2[i]['pic']= jsonVotesMonth[i].pic
      arreyM2[i]['vote'] =  jsonVotesMonth[i].vote; 
 }




$scope.arreyM2 = arreyM2










var c = 0;


  for( var x in $scope.votemonths) {

    for( var b1 in $scope.users) {

  


   
  if ( $scope.votemonths[x].from == $scope.users[b1].name) {
 $scope.votemonths[x].picfrom= $scope.users[b1].pic;
   // newJson[count1].vote= 0
   
}
   
  if ( $scope.votemonths[x].to == $scope.users[b1].name) {
 $scope.votemonths[x].picto= $scope.users[b1].pic;
   // newJson[count1].vote= 0
   
}
}

}



});





var promise = angularFire(url, $scope, 'votes', []);
  $scope.votes = [];

 
$scope.userlogged1 = user.username;

console.log(user.username);



var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

var current_month = new Date();
var month_value = current_month.getMonth();

$scope.month1 = months[month_value] ;





 } else {
    // user is logged out
  }
  return user;
});

}


  function Cntl5($location, $scope, angularFire, filterFilter){
var today = new Date();
$scope.m = today.getMonth()

  }



//////
  function Cntl1($location, $scope, angularFire, filterFilter){

 $scope.login = function () {
  console.log("in scope login");
  auth.login('twitter');
}

 $scope.logout = function () {
  auth.logout();
}

 $scope.viewResults = function () {
   $location.url('/view4')

}


var myDataRef = new Firebase('https://alex-jpcreative.firebaseio.com/');
var auth = new  FirebaseSimpleLogin(myDataRef, function(error, user) {
 
  if (error) {
    // an error occurred while attempting login
       console.log("error if user not log in");
    console.log(error);
  } else if (user) {

   
  
   $location.url('/view2')
 if (user.username === 'artitudinale' ) {
      //var x =document.getElementById("JPacess")
console.log(document.getElementById("JPacess"))

setTimeout(function(){
  document.getElementById("JPacess").style.display='block';
},3000);
    }
$scope.userlogged = user.username;

var url = 'https://alex-jpcreative.firebaseio.com/votes';

var promise = angularFire(url, $scope, 'votes', []);

//DATA FORMAT
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
//END DATA FORMAT
$scope.date = today;

var months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

var current_month = new Date();
var month_value = current_month.getMonth();

$scope.month = months[month_value] ;






  $scope.votes = [];

promise.then(function() {
  // Add a new item by simply modifying the model directly.

  // Or, attach a function to $scope that will let a directive in markup manipulate the model.
  $scope.removeVotes = function() {
    $scope.votes.splice($scope.toRemove, 1);
    $scope.toRemove = null;
  };
});





$scope.checkifuvoted = function(username, date) {



for(var i = 0, l = $scope.votes.length; i < l; i++) {
      var temp = $scope.votes[i].date.split("/");
    var to2 = temp[1] + "-" + temp[0] + "-" + temp[2];
    $scope.newm = temp[0]
    console.log(   $scope.newm )
    var d = new Date(to2)
    var j = d.getMonth()+1;
    console.log(j);
    var current_month = new Date();
    var month_value = current_month.getMonth()+1;
    console.log(month_value)

  if (  $scope.votes[i].from == user.username  &&  j == month_value) {
   
         alert("nop")
    
    console.log($scope.votes[i].from)
return true
       }
else {
return false
alert("callme")
}
 

}

};


  $scope.addVote = function() {






//    else if ($scope.voteTo == user.username) {
 // alert("You cant vote for yourself!"/)
// auth.logout();
  //  $location.url('/view6')
//  break;

//}
 //   else {
//console.log("puched")
  //  $scope.votes.push({from:user.username, to:$scope.voteTo, motivation: $scope.voteMotivation, date:today });
    
//document.getElementById("form").reset();
  //   $location.url('/view3')
//  auth.logout();


//////////////////

if ( $scope.checkifuvoted(user.username, today) ) {
   alert("jjj")
$scope.votes.push({from:user.username, to:$scope.voteTo, motivation: $scope.voteMotivation, date:today });
 $location.url('/view3')
 auth.logout();

} else {
        alert("u alredy vote this month!")
}

 



  };

var usersURL = new Firebase('https://alex-jpcreative.firebaseio.com/users');
var myUser = usersURL.child(user.username) ;
var usersPromise = angularFire(usersURL, $scope, 'users', {});


 
var USERS_LOCATION = 'https://alex-jpcreative.firebaseio.com/users';

 
 $scope.userExistsCallback = function (userId, exists) {
  if (exists) {
    myUser.set({name: user.username, pic: user.profile_image_url })
  
  } else {
  
  myUser.set({name: user.username, pic: user.profile_image_url })
  }
}
 

 $scope.checkIfUserExists = function (userId) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    $scope.userExistsCallback(userId, exists);
    console.log(  usersRef.child(userId))
    console.log(exists)
  });
}







// Tests to see if /users/<userId> has any data. 
 $scope.checkIfUserExists(user.username);







   } else {
    // user is logged out
  }
  return user;
});

 
}
