var states = [];
var markers = [];
  var   photoArray,visibleArray= [];
var count =0;
var index = 0;
var current,state,nav,li,a,latlng,myOptions,map,btn = null;
//var baseURL = "http://localhost:5000";
//var baseURL = "http://localhost:61445";

var baseURL = "http://ec2-52-64-133-102.ap-southeast-2.compute.amazonaws.com:80"
//var baseURL = "http://192.168.1.108:81";

function initialize(){
  // current = window.location.href.slice(window.location.href.indexOf("=")+1);
  // states.push({name:"California",id:"CA",lat:40.053470,long:-123.290159,zoom:6});
  // states.push({name:"Oregan",id:"OR",lat:44.233013,long: -120.416607,zoom:5});
  // states.push({name:"Alabama",id:"AL",lat:32.806671,long: -86.791130,zoom:6});
  // states.push({name:"Arizona",id:"AZ",lat:33.729759,long:-111.431221,zoom:6});
  // states.push({name:"Colorado",id:"CO",lat:	39.059811,long:-105.311104,zoom:6});
  // states.push({name:"District of Columbia",id:"DC",lat:	38.897438,long:-77.026817,zoom:6});
  // states.push({name:"Idaho",id:"ID",lat:44.240459,long:-114.478828,zoom:6});
  // states.push({name:"Louisiana",id:"LA",lat:	31.169546,long:	-91.867805,zoom:6});
  // states.push({name:"Mississippi",id:"MS",lat:32.741646,long:-89.678696,zoom:6});
  // states.push({name:"Montana",id:"MT",lat:46.921925,long:	-110.454353,zoom:6});
  // states.push({name:"Nebraska",id:"NE",lat:41.125370,long:-98.268082,zoom:6});
  // states.push({name:"Nevada",id:"NV",lat:38.313515,long:	-117.055374,zoom:6});
  // states.push({name:"New Mexico",id:"NM",lat:	34.840515,long:-106.248482,zoom:6});
  // states.push({name:"New York",id:"NY",lat:	42.165726,long:-74.948051,zoom:6});
  // states.push({name:"South Dakota",id:"SD",lat:	44.299782,long:	-99.438828,zoom:6});
  // states.push({name:"Tennessee",id:"TN",lat:	35.747845,long:	-86.692345,zoom:6});
  // states.push({name:"Texas",id:"TX",lat:	31.054487,long:	-97.563461,zoom:6});
  // states.push({name:"Utah",id:"UT",lat:	40.150032,long:	-111.862434,zoom:6});
  // states.push({name:"Virginia",id:"VA",lat:	37.769337,long:-78.169968,zoom:6});
  // states.push({name:"Washington",id:"WA",lat:	47.400902,long:-121.490494,zoom:6});
  // states.push({name:"Wyoming",id:"WY",lat:42.755966,long:-107.302490,zoom:6});
  //  state = states.find(x=>x.id ==="");


// setup array to store highlight points a user can scroll through.
  states.push({name:"West Coast",id:"WC",lat:38.960348,long: -123.678060,zoom:11});
  states.push({name:"Painted Hills",id:"PH",lat:44.661526,long:  -120.273142,zoom:11});
  states.push({name:"Crater Lake",id:"CL",lat:42.927875,long: -122.092319,zoom:11});
  states.push({name:"Cascades",id:"CA",lat:48.583804,long:-121.098859,zoom:10});
  states.push({name:"Grand Canyon",id:"GC",lat:36.004957,long:-111.912024,zoom:12});
  states.push({name:"Monument Valley",id:"MV",lat:36.952682,long:-110.078076,zoom:11});
  states.push({name:"New York",id:"NY",lat:	40.796118,long:	-73.959653,zoom:11});
  states.push({name:"Texas A & M",id:"AM",lat:30.610486,long:	-96.340349,zoom:12});
  states.push({name:"Badlands",id:"BL",lat:43.831600,long: -102.342254,zoom:11});
  states.push({name:"Crazy Horse",id:"CH",lat:43.859333,long:-103.551254,zoom:11});
  states.push({name:"Devils Tower",id:"DT",lat:	44.582100,long:-104.706774,zoom:11});
  states.push({name:"Yellowstone",id:"YS",lat:	44.733251,long:-110.574159,zoom:9});
  states.push({name:"Grand Tetons",id:"GT",lat:	43.755525,long:	-110.701326,zoom:10});
  states.push({name:"NASA",id:"NA",lat:	29.556017,long:	-95.090565,zoom:13});
  states.push({name:"Vegas",id:"VG",lat:	36.193108,long:	-115.258090,zoom:11});


   state = states[Math.floor(Math.random()*states.length)]
  nav = document.getElementById("navList");

btn = document.getElementById("cycleFoward");
btn.setAttribute("onclick",`nextState("${current}")`);
// btn.setAttribute("style","z-index:50;");

  states.forEach(function(state){
     li = document.createElement("li");


    li.setAttribute("id",state.id);
    li.setAttribute("onclick",`changeState("${state.id}")`);
    li.appendChild(document.createTextNode(state.name));
    a = document.createElement("a");
    // a.setAttribute("href","#")
    a.appendChild(li);
    nav.appendChild(a);
  });


   latlng=new google.maps.LatLng(state.lat, state.long);
   myOptions={center:latlng,zoom:state.zoom,fullscreenControl:false};

  map=new google.maps.Map(document.getElementById("stateMap"),myOptions);

  google.maps.event.addListener(map, "idle", function(){
         google.maps.event.trigger(map, 'resize');
fetchImages();
     });

};



function fetchImages(){

photoArray=[];
visibleArray=[];


  var bounds = map.getBounds();

  var metaData = {};



  metaData.url = `${baseURL}/api/pic/${bounds.getSouthWest().lat()}/${bounds.getSouthWest().lng()}/${bounds.getNorthEast().lat()}/${bounds.getNorthEast().lng()}`;
  metaData.type = "GET";
  metaData.dataType = "JSON"


  metaData.success = function(data){

//obtain width and get count which records the number of photos can display on screen and fetchs
// smaller image if mobile/tablet.

  var w = $(window).width();
    data.forEach(function(mark){


      if( w < 961){

photoArray.push({id:mark.id,url:mark.urlt,large:mark.urll})
      }else{

photoArray.push({id:mark.id,url:mark.urls,large:mark.urll});
}


var co =  new google.maps.LatLng(mark.lat,mark.lng)
if(!markers.find(x=>x.id == mark.id))

  {
    var dot =  new google.maps.Marker({position:co,map:map,icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'});

    dot.set("id",mark.id);



  markers.push(dot);
  }



    });


    if( w < 961){
count =  Math.floor((w-30)/150)

    }else{
count =  Math.floor((w-60)/267)

}
console.log(photoArray.length)
  createWheel();


};

  metaData.error = function(error){
    console.log("Error fetching Data")
  }
$.ajax(metaData)

};



// uses photo metadata obtained to setup a div at the bottom of the screen
// containing thumbnail wheen for user to scroll through

  function createWheel(){

index = 0;
var cnt = $('.bottomWheel');
cnt.empty();
var left = document.createElement('div');
var right = document.createElement('div');
  left.setAttribute('class','arrow-left')
    right.setAttribute('class','arrow-right')
    right.setAttribute("onclick","photoRight()");
        left.setAttribute("onclick","photoLeft()");

  // for(let i = 0;i<visibleArray.length;i++){
  if(photoArray.length < 2){
    count = photoArray.length
  }
  if(photoArray.length > 0){
   for(let i = 0;i<count;i++){

    var myDiv = document.createElement('div');
    //li.appendChild(document.createTextNode(visableArray[i]));
    var img = document.createElement('img');
    img.setAttribute('class','wheelImage')
    img.setAttribute('id',photoArray[i].id)


    img.setAttribute('src',photoArray[i].url)
          if(i < count){
       myDiv.style.display = "block";
          }
          else{
      myDiv.style.display = "none";
          }
      myDiv.setAttribute('class','flexItem')
      myDiv.setAttribute('alt',i)

      myDiv.append(img);

    cnt.prepend(myDiv);

    img.onclick = function(){
      var modal = document.getElementById('myModal');
        modal.style.display = "block";
        var modalImg =  document.getElementById('largeImage');
            modalImg.src = photoArray[i].large;
          modal.style.display = "block";
          var span = document.getElementsByClassName("close")[0];

          span.onclick = function() {


               modal.style.display = "none";

          }
    }



 };
 }
 if(photoArray.length > count)
 {

   cnt.append(right);
   cnt.prepend(left);
   $('.arrow-left').first().css("display","none");

}


};


function photoRight(){
  var cnt = $('.bottomWheel');
  cnt.empty();
  var left = document.createElement('div');

      left.setAttribute('class','arrow-left')
      left.setAttribute("onclick","photoLeft()");



  //init already sorts if photo right is needed:
index = index + count
  //after first click right. is photo right valid.
  var a =  $('.arrow-right').first();
  //set new index( 0 + count)

//search count(N) places ahead and confirm there is data.
var wheel = $('.flexItem');
if(photoArray[index + count]){

  var right = document.createElement('div');

      right.setAttribute('class','arrow-right')
      right.setAttribute("onclick","photoRight()");
 cnt.append(right);


}

     for(let i = 0;i<photoArray.length;i++){
   if(i >= index && i < (index + count) ){
//create div element add to document
var div = document.createElement('div');
//li.appendChild(document.createTextNode(visableArray[i]));
var img = document.createElement('img');
img.setAttribute('class','wheelImage')
img.setAttribute('id',photoArray[i].id)


img.setAttribute('src',photoArray[i].url)
  //
  div.setAttribute('class','flexItem')
  div.setAttribute('alt',i)

  div.append(img);

cnt.prepend(div);

img.onclick = function(){
  var modal = document.getElementById('myModal');
    modal.style.display = "block";
    var modalImg =  document.getElementById('largeImage');
        modalImg.src = photoArray[i].large;
      modal.style.display = "block";
      var span = document.getElementsByClassName("close")[0];

      span.onclick = function() {


           modal.style.display = "none";

      }
}


   }
}


 cnt.prepend(left);






}

//toDo. - refactor photoleft/right/create wheel
function photoLeft(){
  var cnt = $('.bottomWheel');
  cnt.empty();
  var right = document.createElement('div');

      right.setAttribute('class','arrow-right')
      right.setAttribute("onclick","photoRight()");



  //init already sorts if photo right is needed:
index = index - count
  //after first click right. is photo right valid.
  var a =  $('.arrow-left').first();
  //set new index( 0 + count)

//search count(N) places ahead and confirm there is data.
var wheel = $('.flexItem');


     for(let i = 0;i<photoArray.length;i++){
   if(i >= index && i < (index + count) ){
//create div element add to document
var div = document.createElement('div');
//li.appendChild(document.createTextNode(visableArray[i]));
var img = document.createElement('img');
img.setAttribute('class','wheelImage')
img.setAttribute('id',photoArray[i].id)


img.setAttribute('src',photoArray[i].url)
  //
  div.setAttribute('class','flexItem')
  div.setAttribute('alt',i)

  div.append(img);

cnt.prepend(div);

img.onclick = function(){
  var modal = document.getElementById('myModal');
    modal.style.display = "block";
    var modalImg =  document.getElementById('largeImage');
        modalImg.src = photoArray[i].large;
      modal.style.display = "block";
      var span = document.getElementsByClassName("close")[0];

      span.onclick = function() {


           modal.style.display = "none";

      }
}












   }
}

if(photoArray[index - count]){

  var left = document.createElement('div');

      left.setAttribute('class','arrow-left')
      left.setAttribute("onclick","photoLeft()");
  cnt.prepend(left);


}
 cnt.append(right);







}
//map moves through highlights on mobile view.
function nextState(param){



var index = states.findIndex(x=>x.id === param)
if(index == states.length-1)
{
  document.getElementById(states[0].id).setAttribute("style","z-index:1;");
  changeState(states[0].id)
}
else{
changeState(states[index+1].id);
document.getElementById(states[index+1].id).setAttribute("style","z-index:1;");

}
}

function changeState(data){

  var passedState = states.find(x=>x.id === data);
btn.setAttribute("onclick",`nextState("${passedState.id}")`);
  map.setCenter(new google.maps.LatLng(passedState.lat,passedState.long));
    map.setZoom(passedState.zoom);
$("#stateName").text(passedState.name)
fetchImages();


}
