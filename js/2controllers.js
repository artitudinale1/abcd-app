'use strict';

/* Controllers */
var app = angular.module('JpcAbcApp.controllers', ['firebase'])
//FIRST CONTROLLER FOR VIEW - CONNECT FIREBASE WITH SERVICE 
app.controller('Cntl1', function($location, $scope, $rootScope, filterFilter, firebaseConnection){
    $scope.login = function () {
         $rootScope.myDataRef = new Firebase('https://alex-jpcreative.firebaseio.com/');
         $rootScope.myDataRef.authWithOAuthPopup("twitter",  function (e, user) {
            if (e) { 
              throw e 
            }
            firebaseConnection.getUser(user.twitter.cachedUserProfile)
            //DECLARE MY USER LOGIN IN ROOTSCOPE SO VISIBLE THOUGH THE APP
            $scope.CheckUser($rootScope.user)
          })
     }
     $scope.CheckUser = function (user){
     //CHECK IF WE HAVE USER GO TO SECOND APP PAGE
      if (user != null){
          $rootScope.$apply(function() {
             $location.path("/view2");
          });
        }
      }
   
});//END CONTROLLER 1


// SECOND CTRL FOR VIEW2 - VOTING PAGE
app.controller('Cntl2', function($firebase, $location, $scope,$rootScope,  filterFilter, firebaseConnection){
  //QUICK CHECK IF WE HAVE USER OTHERWISE GO TO LOGIN PAGE
  if (!$rootScope.user){
       $location.path('/view1').replace(); 
    }else{
      //SET SOME VARIABLES

      //DATA FORMAT
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      if(dd<10)
        {dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
      $scope.date = today;
      $rootScope.months = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];
      //ALL VARIABLE IN ROOTSCOPE CAUSE WE NEED THEM THOUGH ALL APP
      $rootScope.current_month = new Date();
      $rootScope.month_value = $rootScope.current_month.getMonth() + 1;
      $rootScope.month_name = $rootScope.current_month.getMonth() ;
      $rootScope.month = $rootScope.months[$rootScope.month_name] ;

      //VOTES
      $rootScope.userlogged = $rootScope.user.screen_name;
      $scope.VotesUrl = new Firebase("https://alex-jpcreative.firebaseio.com/votes");
      var sync = $firebase($scope.VotesUrl);
      //RETRIVE ALL VOTES FROM FIREBASE
      $scope.votes = sync.$asArray();

      //USERS
      var usersURL = new Firebase('https://alex-jpcreative.firebaseio.com/users');
      var myUser = usersURL.child($rootScope.user.screen_name) ;
      var syncUser = $firebase(usersURL);
      $rootScope.usersURL = usersURL;       
      //RETRIVE ALL USERS FROM FIREBAS
      $scope.users = syncUser.$asObject();

      //FUNCTIONS
      $rootScope.logout = function () {
        $rootScope.myDataRef.unauth()
      }
   
      //CHECK IF USER EXIST IN FIREBASE OTHERWISE PUSH AS NEW USER
      $scope.userExistsCallback = function (userId, exists) {
        if (exists) {
              myUser.set({name: $rootScope.user.screen_name, pic: $rootScope.user.profile_image_url })
          } else {
            myUser.set({name: $rootScope.user.screen_name, pic: $rootScope.user.profile_image_url })
          }
        }

      $scope.checkIfUserExists = function (userId) {
        $scope.usersURL.child(userId).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            $scope.userExistsCallback(userId, exists);
         });
      }

      //ACTUALLY CHECK IF USER EXIST ALREADY IN FIREBASE
      $scope.checkIfUserExists($rootScope.user.screen_name);
alert('gg')

      //CHECK IF USER ALREADY VOTE THIS MONTH
      $scope.checkifuvoted = function(username, date) {
        $scope.alreadyVoted = false;
        //TEMP JSON OF VOTES
       var TempVotesObjs =[]
       for(var key in $scope.votes) { //GOING THOUGH FIREBASE SNAPSHOT OF VOTES
          if ($scope.votes[key].hasOwnProperty('date')) { //IF DOES HAVE PROPRETY DATA SO IS A VOTE
            TempVotesObjs.push($scope.votes[key]) //PUSH IT TEMP JSON VOTES   
          }
        }
        //GO THOUGH TEMP JSON VOTE LOOKING FOR DATE PROPRETY
        for (var date in TempVotesObjs){

              var DateAsArrey = TempVotesObjs[date]['date'].split("/");
              //FORMAT DATA TO COMPARE WITH CURRENT DATA
              var FormattingVotingData = DateAsArrey[1] + "-" + DateAsArrey[0] + "-" + DateAsArrey[2];
              var VotingData = new Date(FormattingVotingData);
              var VotingMonth = VotingData.getMonth()+1;
              var VotingYear = VotingData.getFullYear();
               console.log('vvv')
              //COMPARE VOTING MONTH WITH CURRENT MONTH
              if(TempVotesObjs[date]["from"] === $rootScope.user.screen_name && VotingMonth === $rootScope.month_value){
                //THAT MEANS USER AREADY VOTE THI MONTH
                console.log('USER CANnot VOTE')
                 console.log(TempVotesObjs[date]["from"] )
                  console.log($rootScope.user.screen_name)
                  console.log(VotingMonth)
                  console.log($rootScope.month_value)
                  $scope.alreadyVoted = false
                
                }else{
                   console.log(TempVotesObjs[date]["from"] )
                  console.log($rootScope.user.screen_name)
                  console.log(VotingMonth)
                  console.log($rootScope.month_value)
                  console.log('USER CAN VOTE'); 
                   $scope.alreadyVoted = true
                }
                 // MY RETURN TRUE OUTSIDE THE LOOP OTHERWISE THE LOOP IS INTERUPTED
              } //END OF LOOP THOUGH THIS MONTHS VOTES                  
           
          };

          //FUNCTION TO ADD VOTE
          $scope.addVote = function() {
            console.log($scope.voteTo )
            console.log($rootScope.user.screen_name )
            $scope.checkifuvoted($rootScope.user.screen_name, today)
              if ($scope.alreadyVoted) {
                //IF USER DIDN'T VOTE THIS MONTH PUSH THE VOTE ON FIREBASE AND THANK U PAGE
                $scope.VotesUrl.push({from:$rootScope.user.screen_name, to:$scope.voteTo, motivation: $scope.voteMotivation, date:today });
                $location.path('/view3').replace();

                //USER ARE NOT ALLOW TO VOTE FOR THEMSELF
              } else if ($rootScope.user.screen_name == $scope.voteTo ){
                console.log('cheat')
                 $location.url('/view6').replace();

              //TELL USER ALREADY VOTE THIS MONTH
              }else {   
               $location.url('/view5').replace();
              }
            };
      
         //DISPLAY JUST ON VOTING PAGE LINK TO VIEW RESULTS FOR SPECIAL USER AND ADRESS TO IT
         if ($rootScope.user.screen_name === 'abcjpctester' && $location.path() === "/view2" ) {
              setTimeout(function(){
                  document.getElementById("JPacess").style.display='block';
              },300);
            }
          
          $scope.viewResults = function () {
              $location.path('/view4').replace();
            }
    } //CLOSE ELSE THAT CHECK IF WE GOT USER
}); //END CONTROLLER 2




//CONTROLLER 3 CALLED ON VIEW 4 - SHOW THE RESULTS ACCESSABLE JUST TO SPECIAL USER

app.controller('Cntl3', function($firebase, $location, $scope,$rootScope,  filterFilter){
  //CHECK IF USER IS LOGIN - NEVER KNOW
   if (!$rootScope.user){
    
   $location.path('/view1').replace();
    }else{
        
    $scope.toggle = true; //CLIKKABLE LINK TO SHOW DETAILS OF VOTES IN CURRENT MONTH 
    var mounth = $rootScope.mounth;
  
    //FUNCTION REMOVE USER VISIBLE FROM VIEW4
    $scope.Delete_user = function(name) {
      var testRef = new Firebase("https://alex-jpcreative.firebaseio.com/users")
      var newRef = testRef.child(name);
      newRef.remove(function(error) {
    //  consol.log(error ? "Uh oh!" : "Successfully detele user!");
      });
    }
  
    //RETRIVE FIREBASE USERS JSON
      $rootScope.usersURL.on('value', function(snapshot) {
        $scope.users = snapshot.val();
      });

    //RETRIVE FIREBASE VOTES JSON
       var url = new Firebase('https://alex-jpcreative.firebaseio.com/votes');
          url.on('value', function(snapshot) {
          $scope.votes = snapshot.val();
        })

    //DECLARE NEW JSON and populate it with UNSERNAME PIC AND VOTE ASSIGNED TO USERS
        var UsersAssets = {}
        var count=0;
        for( var b in $scope.users) {
            UsersAssets[count] = {};
            UsersAssets[count].name= $scope.users[b].name;
            UsersAssets[count].pic= $scope.users[b].pic;
            UsersAssets[count].vote= 0
            count++;
          }

      //GO THOUGHT VOTES OBJ POPULATIONG HOW MANY VOTES HAS BEEN ASSIGN TO EACH USERS
        for( var c in $scope.votes) {
           for (var z in UsersAssets) {
             if (UsersAssets[z].name ==  $scope.votes[c].to) {
               UsersAssets[z].vote++;
            }
          } 
        }
 
      // SET VOTE OBJ FOR THE ALL YEAR
        var VotesForTheYear = []
        for (var i in UsersAssets) {
           VotesForTheYear[i] = {}
           VotesForTheYear[i]['name']= UsersAssets[i].name;
           VotesForTheYear[i]['pic']= UsersAssets[i].pic
           VotesForTheYear[i]['vote'] = UsersAssets[i].vote; 
        } 
      
      //TO MAKE IT VISIBLE FROM THE VIEW
     $scope.VotesForTheYear = VotesForTheYear;

      //CALCOLATE VOTES FOR THE CURRENT MOUTH
        var voteNamePic = {} //OBTAIN A JSON WITH NAME USER VOTE RECIVED AND TWITTER PIC
        var count=0;

      //POPULATIN JSON WITH NAME USER AND PIC
        for( var b in $scope.users) {
      //console.log($scope.users[b]);
        voteNamePic[count] = {};
        voteNamePic[count].name= $scope.users[b].name;
        voteNamePic[count].pic= $scope.users[b].pic;
        voteNamePic[count].vote= 0
        count++;
      }

     //POPULATE JSON WITH HOW MANY VOTES USER RECEIVED
      for( var c in $scope.votes) {
         for (var z in voteNamePic) {
           if (voteNamePic[z].name ==  $scope.votes[c].to) {
               voteNamePic[z].vote++;
           }
         } 
      }

      //TO DISPAY IN VIEW I NEED ARREY
      var arreyVotesYear = []
      for (var i in voteNamePic) {
          arreyVotesYear[i] = {}
          arreyVotesYear[i]['name']= voteNamePic[i].name;
          arreyVotesYear[i]['pic']= voteNamePic[i].pic
          arreyVotesYear[i]['vote'] =  voteNamePic[i].vote; 
      } 
      //TO BE VISIBLE FORM VIEW
     $scope.arreyVotesYear  = arreyVotesYear ;
      
      //CALCULATE VOTES FOR CORRENT MONTH
      $scope.votemonths = []
      var counterVotesMonth = 0

      //GO THOUGH VOTES AND POPULATE VOTES OF MOUTH
      for(var i  in $scope.votes) {
          var from =  $scope.votes[i].date.split("/");
          var d = new Date(from[2], from[1] - 1, from[0]);
          var m = d.getMonth();
          if (m >= $rootScope.month_value) {
            $scope.votemonths[counterVotesMonth] =( $scope.votes[i] )
            counterVotesMonth ++
          }
        }

      //CREATE JSON FOR MONTH VOTE - SAME STRUCTURE NAME USER VOTE RECIVED AND TWITTER PIC
      var jsonVotesMonth = {}
      var y = 0
    
      for( var d in $scope.users) {
         //console.log($scope.users[b]);
         jsonVotesMonth[y] = {};
         jsonVotesMonth[y].name= $scope.users[d].name;
         jsonVotesMonth[y].pic= $scope.users[d].pic;
         jsonVotesMonth[y].vote= 0
         y++;
      }
   
      for( var e in $scope.votemonths) {
       for (var f in jsonVotesMonth) {
           if (jsonVotesMonth[f].name ==  $scope.votemonths[e].to) {
               jsonVotesMonth[f].vote++;
           }
         } 
      }


      $scope.jsonVotesMonth = jsonVotesMonth
    
      var arreyVotesMonth = []
      for (var i in jsonVotesMonth) {
          arreyVotesMonth[i] = {}
          arreyVotesMonth[i]['name']= jsonVotesMonth[i].name;
          arreyVotesMonth[i]['pic']= jsonVotesMonth[i].pic
          arreyVotesMonth[i]['vote'] =  jsonVotesMonth[i].vote; 
      }

      $scope.arreyVotesMonth = arreyVotesMonth

      //GET PICS OF VOTERS AND VOTED TO SHOW IN DETTAILS
      var c = 0;
      for( var x in $scope.votemonths) {
        for( var b1 in $scope.users) {
            if ( $scope.votemonths[x].from == $scope.users[b1].name) {
              $scope.votemonths[x].picfrom= $scope.users[b1].pic;
            }
        if ($scope.votemonths[x].to == $scope.users[b1].name) {
            $scope.votemonths[x].picto= $scope.users[b1].pic;
          }
        }
      }
      console.log($scope.votemonths)
} //END ELSE THAT CHECK FOR USERS LOGGED
       
}); //END CONTROLLER 3

      

//CONTROLLER 5 CALLED ON VIEW5
function Cntl5($location, $scope, $rootScope, filterFilter){
var mounth = $rootScope.mounth;

}

