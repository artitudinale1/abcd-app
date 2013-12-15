console.log(document);
var selectmenu=document.getElementById("userslist")
selectmenu.onchange=function(){ //run some code when "onchange" event fires
console.log("in change function");
 var chosenoption=this.options[this.selectedIndex] //this refers to "selectmenu"
 if (chosenoption.value!="nothing"){

  document.getElementById('personeTo')
    .innerHTML = '<p>' + 'You are voting for '+ '<i>' + chosenoption.label + '</i>' + '</p>' + '<img id="voted-pic" src=" '+ chosenoption.id  + '"/>'
    console.log(chosenoption.id)