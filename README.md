#<b>ABC - JPC internal voting app#

##<b>BRIEF/BACKGOUND PROJECT</b>##

I developed a Smartphone application for internal company use. 

Every month all employees nominate top performing colleagues who distinguished themselves for the hard work; a prize is assigned to the one with most votes. 

An end of year prize is given to the employee with the most votes in that year. 

##<b>DESCRIPTION</b>##

The app allows users to sign-in with their Twitter account and directly feature as a candidate to vote. A second interface makes it possible to vote for candidates listed and write their motivation. The app doesn't allow votes to occur twice in the same month and doesn't allow candidates to vote for themselves. 

An admin backdoor can be used to see the results, view the calculation of the results and who gained the most votes in that month and in the current year. 

The admin account can also see all Votes and motivations for the current month with the possibility to delete a candidate.

##<b>ACCESS TO THE PROJECT</b>##

App visible at http://artitudinale.org.uk/abcJpcApp
If you want to login to view the admin account I create an appositeve Twiteer account, please use responsibly:

usrn <i>abcjpctest@gmail.com</i>

pswrd <i>london2003</i>

##<b>CROSS-BROWSER TESTING</b>##

At the moment this project has been tested in : Chrome 38.0

##<b>TECHNOLOGIES USED</b>##

AngularJS, Firebase, Twitter API, HTML5, CSS, Bootsrap, Awesome Font

##<b>FUTURE IMPROVEMENT</b>##
<i>Those are bugs to fix and some ideas to improve the project</i>
  - There s a bug: when user first login they are actully allow to vote for themself, it shouldn't happen.
    A review to CheckifuVote function with an update to the snapshot of the Firebase data, should be enough to
    work around the issue - to be implemented asap.
  - Debug major JS error appearing on Results View : Uncaught SyntaxError: Illegal return statement
  - Clean console.logs
  - CSS review and tidy up code
  - Cross-browser testing on major browsers
  - Wrap project in Phonegap/Cordova
  - Test project on Smartphone
  - Insert an automatic reseting of Firebase data at end of solar year
  
<b>PLESE IF YOU EXPERIMENT ANY BUGS/ERRORS/PROBLEMS TESTiNG OR CHECKING OUT THIS PROJECT</b> report it though GITHUB or @ alex.garulli@gmail.com
