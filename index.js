const API_KEY ="AIzaSyAOiREIj7OlVojdyYlEHSZXG5M28Z5WN64";
const DSNeighborhoodNY = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const DATASET_MuseumsNY = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
const DATASET_FarmersMarket ="https://data.cityofnewyork.us/api/views/j8gx-kc43/rows.json?accessType=DOWNLOAD";


var dBorders = 'https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson';

var map;
var ny_coordinates={lat: 40.7291, lng: -73.9965};
var bro_coordinates={lat: 40.837048, lng: -73.865433};
var brook_coordinates={lat: 40.650002, lng: -73.949997};
var man_coordinates={lat: 40.783060, lng: -73.971249};
var que_coordinates={lat: 40.742054, lng: -73.769417};
var StI_coordinates={lat: 40.579021, lng: -74.151535};
var universityCoordinates = {lat:40.7291,lng:-73.9965};

var u_marker;
var centroides = [];
var markers = [];
var latV=[];
var longV=[];
var alterable;
var nei_coordinates;
var mark_coordinates;
var bronx = [];
var brooklyn = [];
var manhattan = [];
var queens = [];
var stIsland = [];
var bronxNei = [];
var brooklynNei = [];
var manhattanNei = [];
var queensNei = [];
var stIslandNei = [];
var centerDistrictBronx=[];

var count2=1;
var count=0;
var bronxCount=1;
var brooklynCount=1;
var manhattanCount=1;
var queensCount=1;
var stIslandCount=1;
var ver;
var verBronx;
var verBrooklyn;
var verManhattan;
var verQueens;
var verStIsland;


var distanciaLonBro=[];
var distanciaLatBro=[];
var distanciaBr=[];
var distanciaLonBrook=[];
var distanciaLatBrook=[];
var distanciaBroo=[];
var distanciaMan=[];
var distanciaLonMan=[];
var distanciaLatMan=[];
var distanciaQue=[];
var distanciaLonQue=[];
var distanciaLatQue=[];
var distanciaStI=[];
var distanciaLonStI=[];
var distanciaLatStI=[];
var long=[];
var lat=[];


var markerBronx = [];
var markerBrooklyn = [];
var markHoodsBrooklyn;
var markerManhattan = [];
var markHoodsManhattan;
var markerQueens = [];
var markHoodsQueens;
var markerStIsland = [];
var markHoodsStIsland;

var ny_marker;
var bro_marker;
var directionsService;
var directionsRenderer;

var DISTRICT_INFORMATION = {
  101 : [],
  102 : [],
  103 : [],
  104 : [],
  105 : [],
  106 : [],
  107 : [],
  108 : [],
  109 : [],
  110 : [],
  111 : [],
  112 : [],
  201 : [],
  202 : [],
  203 : [],
  204 : [],
  205 : [],
  206 : [],
  207 : [],
  208 : [],
  209 : [],
  210 : [],
  211 : [],
  212 : [],
  301 : [],
  302 : [],
  303 : [],
  304 : [],
  305 : [],
  306 : [],
  307 : [],
  308 : [],
  309 : [],
  310 : [],
  311 : [],
  312 : [],
  313 : [],
  314 : [],
  315 : [],
  316 : [],
  317 : [],
  318 : [],
  401 : [],
  402 : [],
  403 : [],
  404 : [],
  405 : [],
  406 : [],
  407 : [],
  408 : [],
  409 : [],
  410 : [],
  411 : [],
  412 : [],
  413 : [],
  414 : [],
  501 : [],
  502 : [],
  503 : [],
};

var dis = Object.keys(DISTRICT_INFORMATION);

function initMap()
{
  var initialLocation = {lat: 40.7291, lng: -73.9965};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: ny_coordinates
  });

  var marker = new google.maps.Marker({
          position: universityCoordinates,
          map: map,
          title: 'University'
  });

  map.data.loadGeoJson(dBorders);

  google.maps.event.addListener(map.data,'addfeature', function(e){
    var path = [];
    e.feature.getGeometry().forEachLatLng(function(point){
      path.push(new google.maps.LatLng(point[0],point[1]));
    });

    var polygon = new google.maps.Polygon({
      paths:path
    });

    if(dis.includes(String(e.feature.getProperty('BoroCD')) ))
    {
      DISTRICT_INFORMATION[e.feature.getProperty('BoroCD')].push(polygon);
    }
    console.log(DISTRICT_INFORMATION[311][0]);
  });

  map.data.setStyle(function(feature){

    var color = '#66a61e';

    if(feature.getProperty('BoroCD')>=100 && feature.getProperty('BoroCD')<=120)
    {
      color = '#7570b3';
    }
    if(feature.getProperty('BoroCD')>=200 && feature.getProperty('BoroCD')<=220)
    {
      color = '#e7298a';
    }
    if(feature.getProperty('BoroCD')>=300 && feature.getProperty('BoroCD')<=320)
    {
      color = '#d95f02';
    }
    if(feature.getProperty('BoroCD')>=400 && feature.getProperty('BoroCD')<=420)
    {
      color = '#e6ab02';
    }
    if(feature.getProperty('BoroCD')>=501 && feature.getProperty('BoroCD')<=520)
    {
      color = '#1b9e77';
    }
    return ({
      fillColor: color,
      strokeWeight: 2,
      fillOpacity: 0.5
    });
  });
}


    function Manhattan() {
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center:man_coordinates
        });

        map.data.loadGeoJson(dBorders);
        map.data.setStyle(function(feature) {
          var color = 'white';
          var weight= 0.5;
          var opacity=0;
          if(feature.getProperty('BoroCD')>=100 && feature.getProperty('BoroCD')<=120)
          {
            color = '#7570b3';
            var weight= 2;
            var opacity=0.5;
          }
          return ({
            fillColor: color,
            strokeWeight: weight,
            fillOpacity: opacity
          });
  });
    }

    function Bronx() {
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center:bro_coordinates
        });

        map.data.loadGeoJson(dBorders);
        map.data.setStyle(function(feature) {
          var color = 'white';
          var weight= 0.5;
          var opacity=0;
          if(feature.getProperty('BoroCD')>=200 && feature.getProperty('BoroCD')<=220)
          {
            color = '#e7298a';
            var weight= 2;
            var opacity=0.5;
          }
          return ({
            fillColor: color,
            strokeWeight: weight,
            fillOpacity: opacity
          });


  });
    }


    function Brooklyn() {
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center:brook_coordinates
        });

        map.data.loadGeoJson(dBorders);
        map.data.setStyle(function(feature) {
          var color = 'white';
          var weight= 0.5;
          var opacity=0;
          if(feature.getProperty('BoroCD')>=300 && feature.getProperty('BoroCD')<=320)
          {
            color = '#d95f02';
            var weight= 2;
            var opacity=0.5;
          }
          return ({
            fillColor: color,
            strokeWeight: weight,
            fillOpacity: opacity
          });
  });
    }



    function Queens() {
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center:que_coordinates
        });

        map.data.loadGeoJson(dBorders);
        map.data.setStyle(function(feature) {
          var color = 'white';
          var weight= 0.5;
          var opacity=0;
          if(feature.getProperty('BoroCD')>=400 && feature.getProperty('BoroCD')<=420)
          {
            color = '#e6ab02';
            var weight= 2;
            var opacity=0.5;
          }
          return ({
            fillColor: color,
            strokeWeight: weight,
            fillOpacity: opacity
          });
  });
    }


function Staten_Island() {
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center:StI_coordinates
        });

        map.data.loadGeoJson(dBorders);
        map.data.setStyle(function(feature) {
          var color = 'white';
          var weight= 0.5;
          var opacity=0;
          if(feature.getProperty('BoroCD')>=500 && feature.getProperty('BoroCD')<=520)
          {
            color = '#1b9e77';
            var weight= 2;
            var opacity=0.5;
          }
          return ({
            fillColor: color,
            strokeWeight: weight,
            fillOpacity: opacity
          });
  });
    }



function getCenterData() {
  var data = $.get(CENTER_URL, function (){})
    .done(function (){
      console.log(data.responseJSON.data);
      for(var i=0; i< data.responseJSON.data.length; i++){
        centroides.push([data.responseJSON.data[i][16],data.responseJSON.data[i][10],data.responseJSON.data[i][9]]);
      }

      for (var j = 0; j < data.responseJSON.data.length; j++) {
        alterable=centroides[j][2];

        latV[j]=alterable.toString().slice(alterable.length-19,alterable.length-2);

        if (latV[j].charAt(0)=="0") {
          latV[j] = 4 + latV[j];
        }

        longV[j]=alterable.toString().substring(7,24);

        nei_coordinates="{lat:"+Number(latV)+", lng:"+Number(longV)+"}";

        markers.push(nei_coordinates);

        if (centroides[j][0]=="Bronx") {
          bronx.push(j);
          bronxNei.push(centroides[j][1]);

        }else if (centroides[j][0]=="Brooklyn") {
          brooklyn.push(j);
          brooklynNei.push(centroides[j][1]);

        }else if (centroides[j][0]=="Manhattan") {
          manhattan.push(j);
          manhattanNei.push(centroides[j][1]);

        }else if (centroides[j][0]=="Queens") {
          queens.push(j);
          queensNei.push(centroides[j][1]);

        }else if (centroides[j][0]=="Staten Island") {
          stIsland.push(j);
          stIslandNei.push(centroides[j][1]);

        }




      }

      for (var j = 0; j < brooklynNei.length; j++) {
        console.log(bronxNei[j]);
        console.log(brooklynNei[j]);
        console.log(manhattanNei[j]);
        console.log(queensNei[j]);
        console.log(stIslandNei[j]);
      }
      })
    .fail(function(error){
      console.log(error);
    })
}







function distancia2Puntos(lat1, lon1, lat2, lon2){
  rad = function (x) {
         return x * Math.PI / 180;
     }

   var R = 6378.137;//Radio de la tierra en km
   var dLat = rad(lat2 - lat1);
   var dLong = rad(lon2 - lon1);
   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   var d = R * c;
   return d.toFixed(3);//Retorna tres decimales
}


 function separarPunto(cadena){
   cadena=cadena.replace("POINT (", "");
   cadena=cadena.replace(")", "");
   return cadena;
 }





getDataDistrictsBronx(DSNeighborhoodNY);

function getDataDistrictsBronx(URL){
  var data = $.get(URL, function(){

  })
  .done( function(){
        var cont=[];
        for (var l = 0; l < 12; l++) {
            long[l]=0;
            lat[l]=0;
            distanciaBr[l]=0;
            cont[l]=0;
        }
        for (var i = 0; i < data.responseJSON.data.length; i++) {
              if(data.responseJSON.data[i][10]=="Mott Haven" || data.responseJSON.data[i][10]=="Port Morris" || data.responseJSON.data[i][10]=="Melrose" ){
                  cont[0]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[0]=Number(puntos[0])+long[0];
                  lat[0]=Number(puntos[1])+lat[0];
              }  
              if(data.responseJSON.data[i][10]=="Longwood" || data.responseJSON.data[i][10]=="Hunts Point"){
                  cont[1]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[1]=Number(puntos[0])+long[1];
                  lat[1]=Number(puntos[1])+lat[1];
              } 
              if(data.responseJSON.data[i][10]=="Claremont Village" || data.responseJSON.data[i][10]=="Concourse Village" || data.responseJSON.data[i][10]=="Morrisania" ){
                  cont[2]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[2]=Number(puntos[0])+long[2];
                  lat[2]=Number(puntos[1])+lat[2];
              } 
              if(data.responseJSON.data[i][10]=="Concourse" || data.responseJSON.data[i][10]=="High  Bridge"){
                  cont[3]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[3]=Number(puntos[0])+long[3];
                  lat[3]=Number(puntos[1])+lat[3];
              } 
              if(data.responseJSON.data[i][10]=="University Heights" || data.responseJSON.data[i][10]=="Morris Heights" || data.responseJSON.data[i][10]=="Mount Hope" || data.responseJSON.data[i][10]=="Fordham"){
                  cont[4]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[4]=Number(puntos[0])+long[4];
                  lat[4]=Number(puntos[1])+lat[4];
              } 
              if(data.responseJSON.data[i][10]=="Belmont" || data.responseJSON.data[i][10]=="West Farms" || data.responseJSON.data[i][10]=="East Tremont" ){
                  cont[5]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[5]=Number(puntos[0])+long[5];
                  lat[5]=Number(puntos[1])+lat[5];
              } 
              if(data.responseJSON.data[i][10]=="Norwood" || data.responseJSON.data[i][10]=="University Heights" || data.responseJSON.data[i][10]=="Bedford Park" ){
                  cont[6]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[6]=Number(puntos[0])+long[6];
                  lat[6]=Number(puntos[1])+lat[6];
              } 
              if(data.responseJSON.data[i][10]=="Riverdale" || data.responseJSON.data[i][10]=="Spuyten Duyvil" || data.responseJSON.data[i][10]=="Kingsbridge" || data.responseJSON.data[i][10]=="Fieldston" || data.responseJSON.data[i][10]=="Marble Hill"){
                  cont[7]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[7]=Number(puntos[0])+long[7];
                  lat[7]=Number(puntos[1])+lat[7];
              } 
              if(data.responseJSON.data[i][10]=="Parkchester" || data.responseJSON.data[i][10]=="Unionport" || data.responseJSON.data[i][10]=="Soundview" || data.responseJSON.data[i][10]=="Castle Hill" || data.responseJSON.data[i][10]=="Clason Point"){
                  cont[8]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[8]=Number(puntos[0])+long[8];
                  lat[8]=Number(puntos[1])+lat[8];
              } 
              if(data.responseJSON.data[i][10]=="Co-op City" || data.responseJSON.data[i][10]=="City Island" || data.responseJSON.data[i][10]=="Throgs Neck" || data.responseJSON.data[i][10]=="Westchester Square" || data.responseJSON.data[i][10]=="Pelham Bay"  ){
                  cont[9]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[9]=Number(puntos[0])+long[9];
                  lat[9]=Number(puntos[1])+lat[9];
              } 
              if(data.responseJSON.data[i][10]=="Morris Park" || data.responseJSON.data[i][10]=="Pelham Parkway" || data.responseJSON.data[i][10]=="Pelham Gardens" || data.responseJSON.data[i][10]=="Van Nest" ){
                  cont[10]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[10]=Number(puntos[0])+long[10];
                  lat[10]=Number(puntos[1])+lat[10];
              } 
              if(data.responseJSON.data[i][10]=="Edenwald" || data.responseJSON.data[i][10]=="Wakefield" || data.responseJSON.data[i][10]=="Williamsbridge" || data.responseJSON.data[i][10]=="Woodlawn" || data.responseJSON.data[i][10]=="Eastchester" || data.responseJSON.data[i][10]=="Olinville" || data.responseJSON.data[i][10]=="Baychester"){
                  cont[11]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[11]=Number(puntos[0])+long[11];
                  lat[11]=Number(puntos[1])+lat[11];
              }          
            }
          for (var m = 0; m < 12; m++) {
            distanciaLonBro[m]=long[m]/cont[m]; 
            distanciaLatBro[m]=lat[m]/cont[m];
            distanciaBr[m] = distancia2Puntos(40.729234,-73.996566,distanciaLatBro[m],distanciaLonBro[m]);
          }
      })
      .fail( function(error){
      console.error(error);
    })
}



function showMarkBronx() {

  if (verBronx!=0) {
    for (var i = 0; i < 12; i++) {
      var markHoods = new google.maps.Marker({
      position: {lat:Number(distanciaLatBro[i]), lng:Number(distanciaLonBro[i])},
      map: map,
      title: 'District '+(i+1)
      })
      markerBronx.push(markHoods);
    }

  }
  else if (verBronx==0) {
    for (var i = 0; i < 12; i++) {
        markerBronx[i].setMap(null);
      }
    }

    bronxCount=bronxCount+1;
    verBronx=bronxCount%2;
}


getDataDistrictsBrooklyn(DSNeighborhoodNY);

function getDataDistrictsBrooklyn(URL){
  var data = $.get(URL, function(){

  })
  .done( function(){
        var cont=[];
        for (var l = 0; l < 18; l++) {
            long[l]=0;
            lat[l]=0;
            distanciaBroo[l]=0;
            cont[l]=0;
        }
        for (var i = 0; i < data.responseJSON.data.length; i++) {
              if(data.responseJSON.data[i][10]=="Williamsburg" || data.responseJSON.data[i][10]=="Greenpoint"){
                  cont[0]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[0]=Number(puntos[0])+long[0];
                  lat[0]=Number(puntos[1])+lat[0];
              }  
              if(data.responseJSON.data[i][10]=="Brooklyn Heights" || data.responseJSON.data[i][10]=="Vinegar Hill" || data.responseJSON.data[i][10]=="Dumbo" || data.responseJSON.data[i][10]=="Fort Greene" || data.responseJSON.data[i][10]=="Navy Yard" || data.responseJSON.data[i][10]=="Fulton Ferry" || data.responseJSON.data[i][10]=="Clinton Hill" || data.responseJSON.data[i][10]=="Boerum Hill"){
                  cont[1]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[1]=Number(puntos[0])+long[1];
                  lat[1]=Number(puntos[1])+lat[1];
              } 
              if(data.responseJSON.data[i][10]=="Bedford Stuyvesant"){
                  cont[2]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[2]=Number(puntos[0])+long[2];
                  lat[2]=Number(puntos[1])+lat[2];
              } 
              if(data.responseJSON.data[i][10]=="Bushwick"){
                  cont[3]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[3]=Number(puntos[0])+long[3];
                  lat[3]=Number(puntos[1])+lat[3];
              } 
              if(data.responseJSON.data[i][10]=="Cypress Hills" || data.responseJSON.data[i][10]=="City Line" || data.responseJSON.data[i][10]=="Highland Park" || data.responseJSON.data[i][10]=="Broadway Junction" || data.responseJSON.data[i][10]=="New Lots" || data.responseJSON.data[i][10]=="Spring Creek" || data.responseJSON.data[i][10]=="Starrett City" || data.responseJSON.data[i][10]=="East New York"){
                  cont[4]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[4]=Number(puntos[0])+long[4];
                  lat[4]=Number(puntos[1])+lat[4];
              } 
              if(data.responseJSON.data[i][10]=="Cobble Hill" || data.responseJSON.data[i][10]=="Carroll Gardens" || data.responseJSON.data[i][10]=="Red Hook" || data.responseJSON.data[i][10]=="Gowanus" || data.responseJSON.data[i][10]=="Park Slope" ){
                  cont[5]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[5]=Number(puntos[0])+long[5];
                  lat[5]=Number(puntos[1])+lat[5];
              } 
              if(data.responseJSON.data[i][10]=="Windsor Terrace" || data.responseJSON.data[i][10]=="Sunset Park"){
                  cont[6]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[6]=Number(puntos[0])+long[6];
                  lat[6]=Number(puntos[1])+lat[6];
              } 
              if(data.responseJSON.data[i][10]=="Prospect Heights" || data.responseJSON.data[i][10]=="Weeksville" || data.responseJSON.data[i][10]=="Crown Heights" ){
                  cont[7]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[7]=Number(puntos[0])+long[7];
                  lat[7]=Number(puntos[1])+lat[7];
              } 
              if(data.responseJSON.data[i][10]=="Wingate" || data.responseJSON.data[i][10]=="Prospect Lefferts Gardens" || data.responseJSON.data[i][10]=="Crown Heights"){
                  cont[8]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[8]=Number(puntos[0])+long[8];
                  lat[8]=Number(puntos[1])+lat[8];
              } 
              if(data.responseJSON.data[i][10]=="Bay Ridge" || data.responseJSON.data[i][10]=="Dyker Heights" || data.responseJSON.data[i][10]=="Fort Hamilton" ){
                  cont[9]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[9]=Number(puntos[0])+long[9];
                  lat[9]=Number(puntos[1])+lat[9];
              } 
              if(data.responseJSON.data[i][10]=="Bensonhurst" || data.responseJSON.data[i][10]=="Bath Beach"){
                  cont[10]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[10]=Number(puntos[0])+long[10];
                  lat[10]=Number(puntos[1])+lat[10];
              } 
              if(data.responseJSON.data[i][10]=="Kensington" || data.responseJSON.data[i][10]=="Borough Park" || data.responseJSON.data[i][10]=="Ocean Parkway" ){
                  cont[11]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[11]=Number(puntos[0])+long[11];
                  lat[11]=Number(puntos[1])+lat[11];
              }  
              if(data.responseJSON.data[i][10]=="Sea Gate" || data.responseJSON.data[i][10]=="Coney Island" || data.responseJSON.data[i][10]=="Brighton Beach" || data.responseJSON.data[i][10]=="Homecrest"){
                  cont[12]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[12]=Number(puntos[0])+long[12];
                  lat[12]=Number(puntos[1])+lat[12];
              } 
              if(data.responseJSON.data[i][10]=="Prospect Park South" || data.responseJSON.data[i][10]=="Ditmas Park" || data.responseJSON.data[i][10]=="Flatbush" || data.responseJSON.data[i][10]=="Midwood" || data.responseJSON.data[i][10]=="Manhattan Terrace"){
                  cont[13]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[13]=Number(puntos[0])+long[13];
                  lat[13]=Number(puntos[1])+lat[13];
              } 
              if(data.responseJSON.data[i][10]=="Gravesend" || data.responseJSON.data[i][10]=="Gerritsen Beach" || data.responseJSON.data[i][10]=="Sheepshead Bay" || data.responseJSON.data[i][10]=="Manhattan Beach"){
                  cont[14]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[14]=Number(puntos[0])+long[14];
                  lat[14]=Number(puntos[1])+lat[14];
              } 
              if(data.responseJSON.data[i][10]=="Ocean Hill" || data.responseJSON.data[i][10]=="Brownsville" ){
                  cont[15]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[15]=Number(puntos[0])+long[15];
                  lat[15]=Number(puntos[1])+lat[15];
              } 
              if(data.responseJSON.data[i][10]=="Rugby" || data.responseJSON.data[i][10]=="Remsen Village" || data.responseJSON.data[i][10]=="East Flatbush" ){
                  cont[16]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[16]=Number(puntos[0])+long[16];
                  lat[16]=Number(puntos[1])+lat[16];
              } 
              if(data.responseJSON.data[i][10]=="Canarsie" || data.responseJSON.data[i][10]=="Paerdegat Basin" || data.responseJSON.data[i][10]=="Flatlands" || data.responseJSON.data[i][10]=="Georgetown" || data.responseJSON.data[i][10]=="Mill Basin" || data.responseJSON.data[i][10]=="Bergen Beach" || data.responseJSON.data[i][10]=="Marine Park" || data.responseJSON.data[i][10]=="Mill Island"){
                  cont[17]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[17]=Number(puntos[0])+long[17];
                  lat[17]=Number(puntos[1])+lat[17];
              }         
            }
          for (var m = 0; m < 18; m++) {
            distanciaLonBrook[m]=long[m]/cont[m]; 
            distanciaLatBrook[m]=lat[m]/cont[m];
            distanciaBroo[m] = distancia2Puntos(40.729234,-73.996566,distanciaLatBrook[m],distanciaLonBrook[m]);
          }
      })
      .fail( function(error){
      console.error(error);
    })
}



function showMarkBrooklyn() {

  if (verBrooklyn!=0) {
    for (var i = 0; i < 18; i++) {
      markHoodsBrooklyn = new google.maps.Marker({
      position: {lat:Number(distanciaLatBrook[i]), lng:Number(distanciaLonBrook[i])},
      map: map,
      title: 'District '+(i+1)
      })
      markerBrooklyn.push(markHoodsBrooklyn);
    }

  }
  else if (verBrooklyn==0) {
    for (var i = 0; i < 12; i++) {
        markerBrooklyn[i].setMap(null);
      }
    }

    brooklynCount=brooklynCount+1;
    verBrooklyn=brooklynCount%2;
}


getDataDistrictsManhattan(DSNeighborhoodNY);

function getDataDistrictsManhattan(URL){
  var data = $.get(URL, function(){

  })
  .done( function(){
        var cont=[];
        var prueba=[];
        for (var l = 0; l < 12; l++) {
            long[l]=0;
            lat[l]=0;
            distanciaMan[l]=0;
            cont[l]=0;
        }
        for (var i = 0; i < data.responseJSON.data.length; i++) {
              if(data.responseJSON.data[i][10]=="Tribeca" || data.responseJSON.data[i][10]=="Civic Center" || data.responseJSON.data[i][10]=="Battery Park City" || data.responseJSON.data[i][10]=="Financial District"){
                  cont[0]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[0]=Number(puntos[0])+long[0];
                  lat[0]=Number(puntos[1])+lat[0];
              }  
              if(data.responseJSON.data[i][10]=="West Village" || data.responseJSON.data[i][10]=="Greenwich Village" || data.responseJSON.data[i][10]=="Soho" || data.responseJSON.data[i][10]=="Little Italy"){
                  cont[1]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[1]=Number(puntos[0])+long[1];
                  lat[1]=Number(puntos[1])+lat[1];
              } 
              if(data.responseJSON.data[i][10]=="East Village" || data.responseJSON.data[i][10]=="Noho" || data.responseJSON.data[i][10]=="Lower East Side" || data.responseJSON.data[i][10]=="Chinatown" ){
                  cont[2]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[2]=Number(puntos[0])+long[2];
                  lat[2]=Number(puntos[1])+lat[2];
              } 
              if((data.responseJSON.data[i][10]=="Chelsea" && data.responseJSON.data[i][16]=="Manhattan") || data.responseJSON.data[i][10]=="Clinton"){
                  cont[3]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[3]=Number(puntos[0])+long[3];
                  lat[3]=Number(puntos[1])+lat[3];
              } 
              if(data.responseJSON.data[i][10]=="Midtown" || data.responseJSON.data[i][10]=="Midtown South" || data.responseJSON.data[i][10]=="Flatiron"){
                  cont[4]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[4]=Number(puntos[0])+long[4];
                  lat[4]=Number(puntos[1])+lat[4];
              } 
              if(data.responseJSON.data[i][10]=="Stuyvesant Town" || data.responseJSON.data[i][10]=="Gramercy" || (data.responseJSON.data[i][10]=="Murray Hill" && data.responseJSON.data[i][16]=="Manhattan")  || data.responseJSON.data[i][10]=="Tudor City" || data.responseJSON.data[i][10]=="Turtle Bay" || data.responseJSON.data[i][10]=="Sutton Place" ){
                  cont[5]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[5]=Number(puntos[0])+long[5];
                  lat[5]=Number(puntos[1])+lat[5];
              } 
              if(data.responseJSON.data[i][10]=="Lincoln Square" || data.responseJSON.data[i][10]=="Upper West Side" || data.responseJSON.data[i][10]=="Manhattan Valley" ){
                  cont[6]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[6]=Number(puntos[0])+long[6];
                  lat[6]=Number(puntos[1])+lat[6];
              } 
              if(data.responseJSON.data[i][10]=="Lenox Hill" || data.responseJSON.data[i][10]=="Upper East Side" || data.responseJSON.data[i][10]=="Yorkville" || data.responseJSON.data[i][10]=="Roosevelt Island" || data.responseJSON.data[i][10]=="Carnegie Hill"){
                  cont[7]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[7]=Number(puntos[0])+long[7];
                  lat[7]=Number(puntos[1])+lat[7];
              } 
              if(data.responseJSON.data[i][10]=="Morningside Heights" || data.responseJSON.data[i][10]=="Manhattanville" || data.responseJSON.data[i][10]=="Hamilton Heights"){
                  cont[8]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[8]=Number(puntos[0])+long[8];
                  lat[8]=Number(puntos[1])+lat[8];
              } 
              if(data.responseJSON.data[i][10]=="Central Harlem" ){
                  cont[9]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[9]=Number(puntos[0])+long[9];
                  lat[9]=Number(puntos[1])+lat[9];
              } 
              if(data.responseJSON.data[i][10]=="East Harlem"){
                  cont[10]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[10]=Number(puntos[0])+long[10];
                  lat[10]=Number(puntos[1])+lat[10];
              } 
              if(data.responseJSON.data[i][10]=="Washington Heights" || data.responseJSON.data[i][10]=="Inwood"){
                  cont[11]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[11]=Number(puntos[0])+long[11];
                  lat[11]=Number(puntos[1])+lat[11];
              }          
            }
          for (var m = 0; m < 12; m++) {
            distanciaLonMan[m]=long[m]/cont[m]; 
            distanciaLatMan[m]=lat[m]/cont[m];
            distanciaMan[m] = distancia2Puntos(40.729234,-73.996566,distanciaLatMan[m],distanciaLonMan[m]);
          }
      })
      .fail( function(error){
      console.error(error);
    })
}



function showMarkManhattan() {

  if (verManhattan!=0) {
    for (var i = 0; i < 12; i++) {
      var markHoodsManhattan = new google.maps.Marker({
      position: {lat:Number(distanciaLatMan[i]), lng:Number(distanciaLonMan[i])},
      map: map,
      title: 'District '+(i+1)
      })
      markerManhattan.push(markHoodsManhattan);
    }

  }
  else if (verManhattan==0) {
    for (var i = 0; i < 12; i++) {
        markerManhattan[i].setMap(null);
      }
    }

    manhattanCount=manhattanCount+1;
    verManhattan=manhattanCount%2;
}


getDataDistrictsQueens(DSNeighborhoodNY);

function getDataDistrictsQueens(URL){
  var data = $.get(URL, function(){

  })
  .done( function(){
        var cont=[];
        for (var l = 0; l < 14; l++) {
            long[l]=0;
            lat[l]=0;
            distanciaQue[l]=0;
            cont[l]=0;
        }
        for (var i = 0; i < data.responseJSON.data.length; i++) {
              if(data.responseJSON.data[i][10]=="Steinway" || data.responseJSON.data[i][10]=="Astoria Heights" || data.responseJSON.data[i][10]=="Astoria" || data.responseJSON.data[i][10]=="Ravenswood" || data.responseJSON.data[i][10]=="Long Island City"){
                  cont[0]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[0]=Number(puntos[0])+long[0];
                  lat[0]=Number(puntos[1])+lat[0];
              }  
              if(data.responseJSON.data[i][10]=="Hunters Point" ||(data.responseJSON.data[i][10]=="Sunnyside" && data.responseJSON.data[i][16]=="Queens")|| data.responseJSON.data[i][10]=="Blissville" || data.responseJSON.data[i][10]=="Sunnyside Gardens" || data.responseJSON.data[i][10]=="Woodside" ){
                  cont[1]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[1]=Number(puntos[0])+long[1];
                  lat[1]=Number(puntos[1])+lat[1];
              } 
              if(data.responseJSON.data[i][10]=="East Elmhurst" || data.responseJSON.data[i][10]=="North Corona" || data.responseJSON.data[i][10]=="Jackson Heights"){
                  cont[2]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[2]=Number(puntos[0])+long[2];
                  lat[2]=Number(puntos[1])+lat[2];
              } 
              if(data.responseJSON.data[i][10]=="Elmhurst" || data.responseJSON.data[i][10]=="South Corona" || data.responseJSON.data[i][10]=="Lefrak City"){
                  cont[3]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[3]=Number(puntos[0])+long[3];
                  lat[3]=Number(puntos[1])+lat[3];
              } 
              if(data.responseJSON.data[i][10]=="Maspeth" || data.responseJSON.data[i][10]=="Middle Village" || data.responseJSON.data[i][10]=="Glendale" || data.responseJSON.data[i][10]=="Ridgewood" ){
                  cont[4]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[4]=Number(puntos[0])+long[4];
                  lat[4]=Number(puntos[1])+lat[4];
              } 
              if(data.responseJSON.data[i][10]=="Rego Park" || data.responseJSON.data[i][10]=="Forest Hills Gardens" || data.responseJSON.data[i][10]=="Forest Hills" ){
                  cont[5]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[5]=Number(puntos[0])+long[5];
                  lat[5]=Number(puntos[1])+lat[5];
              } 
              if(data.responseJSON.data[i][10]=="College Point" || data.responseJSON.data[i][10]=="Malba" || data.responseJSON.data[i][10]=="Beechhurst" || (data.responseJSON.data[i][10]=="Bay Terrace" && data.responseJSON.data[i][16]=="Queens") || data.responseJSON.data[i][10]=="Whitestone" || (data.responseJSON.data[i][10]=="Murray Hill" && data.responseJSON.data[i][16]=="Queens") || data.responseJSON.data[i][10]=="Downtown Flushing" || data.responseJSON.data[i][10]=="Queensboro Hill" ){
                  cont[6]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[6]=Number(puntos[0])+long[6];
                  lat[6]=Number(puntos[1])+lat[6];
              } 
              if(data.responseJSON.data[i][10]=="Pomonok" || data.responseJSON.data[i][10]=="Utopia" || data.responseJSON.data[i][10]=="Fresh Meadows" || data.responseJSON.data[i][10]=="Kew Gardens Hills" || data.responseJSON.data[i][10]=="Hillcrest" || data.responseJSON.data[i][10]=="Holliswood" || data.responseJSON.data[i][10]=="Briarwood" || data.responseJSON.data[i][10]=="Jamaica Hills" || data.responseJSON.data[i][10]=="Jamaica Estates" ){
                  cont[7]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[7]=Number(puntos[0])+long[7];
                  lat[7]=Number(puntos[1])+lat[7];
              } 
              if(data.responseJSON.data[i][10]=="Kew Gardens" || data.responseJSON.data[i][10]=="Richmond Hill" || data.responseJSON.data[i][10]=="Woodhaven"){
                  cont[8]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[8]=Number(puntos[0])+long[8];
                  lat[8]=Number(puntos[1])+lat[8];
              } 
              if(data.responseJSON.data[i][10]=="Ozone Park" || data.responseJSON.data[i][10]=="Lindenwood" || data.responseJSON.data[i][10]=="South Ozone Park" || data.responseJSON.data[i][10]=="Howard Beach" ){
                  cont[9]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[9]=Number(puntos[0])+long[9];
                  lat[9]=Number(puntos[1])+lat[9];
              } 
              if(data.responseJSON.data[i][10]=="Auburndale" || data.responseJSON.data[i][10]=="Bayside"  || data.responseJSON.data[i][10]=="Little Neck" || data.responseJSON.data[i][10]=="Douglaston" || data.responseJSON.data[i][10]=="Oakland Gardens"){
                  cont[10]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[10]=Number(puntos[0])+long[10];
                  lat[10]=Number(puntos[1])+lat[10];
              } 
              if(data.responseJSON.data[i][10]=="Hollis" || data.responseJSON.data[i][10]=="Jamaica Center" || data.responseJSON.data[i][10]=="South Jamaica" || data.responseJSON.data[i][10]=="St. Albans"  || data.responseJSON.data[i][10]=="Rochdale" ){
                  cont[11]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[11]=Number(puntos[0])+long[11];
                  lat[11]=Number(puntos[1])+lat[11];
              }  
              if(data.responseJSON.data[i][10]=="Glen Oaks" || data.responseJSON.data[i][10]=="Floral Park" || data.responseJSON.data[i][10]=="Bellaire" || data.responseJSON.data[i][10]=="Bellerose" || data.responseJSON.data[i][10]=="Queens Village" || data.responseJSON.data[i][10]=="Cambria Heights" || data.responseJSON.data[i][10]=="Laurelton"  || data.responseJSON.data[i][10]=="Springfield Gardens" || data.responseJSON.data[i][10]=="Rosedale" || data.responseJSON.data[i][10]=="Brookville"){
                  cont[12]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[12]=Number(puntos[0])+long[12];
                  lat[12]=Number(puntos[1])+lat[12];
              } 
              if(data.responseJSON.data[i][10]=="Broad Channel" || data.responseJSON.data[i][10]=="Far Rockaway" || data.responseJSON.data[i][10]=="Edgemere" || data.responseJSON.data[i][10]=="Somerville" || data.responseJSON.data[i][10]=="Arverne" || data.responseJSON.data[i][10]=="Seaside" || data.responseJSON.data[i][10]=="Rockaway Park" || data.responseJSON.data[i][10]=="Belle Harbor"  || data.responseJSON.data[i][10]=="Neponsit" || data.responseJSON.data[i][10]=="Breezy Point"){
                  cont[13]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[13]=Number(puntos[0])+long[13];
                  lat[13]=Number(puntos[1])+lat[13];
              } 
            }
          for (var m = 0; m < 14; m++) {
            distanciaLonQue[m]=long[m]/cont[m]; 
            distanciaLatQue[m]=lat[m]/cont[m];
            distanciaQue[m] = distancia2Puntos(40.729234,-73.996566,distanciaLatQue[m],distanciaLonQue[m]);
          }
      })
      .fail( function(error){
      console.error(error);
    })
}



function showMarkQueens() {

  if (verQueens!=0) {
    for (var i = 0; i < 18; i++) {
      markHoodsQueens = new google.maps.Marker({
      position: {lat:Number(distanciaLatQue[i]), lng:Number(distanciaLonQue[i])},
      map: map,
      title: 'District '+(i+1)
      })
      markerQueens.push(markHoodsQueens);
    }

  }
  else if (verQueens==0) {
    for (var i = 0; i < 12; i++) {
        markerQueens[i].setMap(null);
      }
    }

    queensCount=queensCount+1;
    verQueens=queensCount%2;
}


getDataDistrictsStIsland(DSNeighborhoodNY);

function getDataDistrictsStIsland(URL){
  var data = $.get(URL, function(){

  })
  .done( function(){
        var cont=[];
        for (var l = 0; l < 3; l++) {
            long[l]=0;
            lat[l]=0;
            distanciaStI[l]=0;
            cont[l]=0;
        }
        for (var i = 0; i < data.responseJSON.data.length; i++) {
              
              if(data.responseJSON.data[i][10]=="Howland Hook" || data.responseJSON.data[i][10]=="Port Ivory" || data.responseJSON.data[i][10]=="Arlington" || data.responseJSON.data[i][10]=="Mariner's Harbor"  || data.responseJSON.data[i][10]=="Elm Park" || data.responseJSON.data[i][10]=="Graniteville" || data.responseJSON.data[i][10]=="Westerleigh"  || data.responseJSON.data[i][10]=="Port Richmond" || data.responseJSON.data[i][10]=="Castleton Corners" || data.responseJSON.data[i][10]=="West Brighton" || data.responseJSON.data[i][10]=="Randall Manor"  || data.responseJSON.data[i][10]=="Silver Lake" || (data.responseJSON.data[i][10]=="Sunnyside" && data.responseJSON.data[i][16]=="Staten Island") || data.responseJSON.data[i][10]=="New Brighton" || data.responseJSON.data[i][10]=="St. George" || data.responseJSON.data[i][10]=="Tompkinsville"  || data.responseJSON.data[i][10]=="Stapleton" || data.responseJSON.data[i][10]=="Grymes Hill" || data.responseJSON.data[i][10]=="Clifton"  || data.responseJSON.data[i][10]=="Rosebank" || data.responseJSON.data[i][10]=="Shore Acres" || data.responseJSON.data[i][10]=="Park Hill" ){
                  cont[0]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[0]=Number(puntos[0])+long[0];
                  lat[0]=Number(puntos[1])+lat[0];
              }  
              if(data.responseJSON.data[i][10]=="Bloomfield" ||(data.responseJSON.data[i][10]=="Chelsea" && data.responseJSON.data[i][16]=="Staten Island") || data.responseJSON.data[i][10]=="Travis" || data.responseJSON.data[i][10]=="Bulls Head"  || data.responseJSON.data[i][10]=="New Springville" || data.responseJSON.data[i][10]=="Heartland Village" || data.responseJSON.data[i][10]=="Lighthouse Hill"  || data.responseJSON.data[i][10]=="New Dorp" || data.responseJSON.data[i][10]=="Todt Hill" || data.responseJSON.data[i][10]=="Grant City" || data.responseJSON.data[i][10]=="New Dorp Beach"  || data.responseJSON.data[i][10]=="Midland Beach" || data.responseJSON.data[i][10]=="Dongan Hills"|| data.responseJSON.data[i][10]=="Old Town" || data.responseJSON.data[i][10]=="South Beach" || data.responseJSON.data[i][10]=="Arrochar"  || data.responseJSON.data[i][10]=="Grasmere" || data.responseJSON.data[i][10]=="Concord" || data.responseJSON.data[i][10]=="Emerson Hill" ){
                  cont[1]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[1]=Number(puntos[0])+long[1];
                  lat[1]=Number(puntos[1])+lat[1];
              } 
              if(data.responseJSON.data[i][10]=="Tottenville" || data.responseJSON.data[i][10]=="Butler Manor" || data.responseJSON.data[i][10]=="Richmond Valley" || data.responseJSON.data[i][10]=="Charleston"  || data.responseJSON.data[i][10]=="Pleasant Plains" || data.responseJSON.data[i][10]=="Woodrow" || data.responseJSON.data[i][10]=="Rossville"  || data.responseJSON.data[i][10]=="Prince's Bay" || data.responseJSON.data[i][10]=="Huguenot" || data.responseJSON.data[i][10]=="Greenridge" || data.responseJSON.data[i][10]=="Arden Heights"  || data.responseJSON.data[i][10]=="Annadale" || data.responseJSON.data[i][10]=="Eltingville"  || data.responseJSON.data[i][10]=="Great Kills" || (data.responseJSON.data[i][10]=="Bay Terrace" && data.responseJSON.data[i][16]=="Staten Island") || data.responseJSON.data[i][10]=="Richmond Town"  || data.responseJSON.data[i][10]=="Oakwood" ){
                  cont[2]+=1;
                  var punto = separarPunto(data.responseJSON.data[i][9]);
                  var puntos= punto.split (" ");
                  long[2]=Number(puntos[0])+long[2];
                  lat[2]=Number(puntos[1])+lat[2];
              } 
            }
          for (var m = 0; m < 3; m++) {
            distanciaLonStI[m]=long[m]/cont[m]; 
            distanciaLatStI[m]=lat[m]/cont[m];
            distanciaStI[m] = distancia2Puntos(40.729234,-73.996566,distanciaLatStI[m],distanciaLonStI[m]);
          }
      })
      .fail( function(error){
      console.error(error);
    })
}



function showMarkStIsland() {

  if (verQueens!=0) {
    for (var i = 0; i < 18; i++) {
      markHoodsStIsland = new google.maps.Marker({
      position: {lat:Number(distanciaLatStI[i]), lng:Number(distanciaLonStI[i])},
      map: map,
      title: 'District '+(i+1)
      })
      markerStIsland.push(markHoodsStIsland);
    }

  }
  else if (verStIsland==0) {
    for (var i = 0; i < 12; i++) {
        markerStIsland[i].setMap(null);
      }
    }

    stIslandCount=stIslandCount+1;
    verStIsland=stIslandCount%2;
}


$("document").ready(function(){

  $("#Bronx").on("click",Bronx)
  $("#Brooklyn").on("click",Brooklyn)
  $("#Manhattan").on("click",Manhattan)
  $("#Queens").on("click",Queens)
  $("#StatenIsland").on("click",Staten_Island)
  var button = $(document.createElement('div')).css({ padding: "1em 3em", margin: "1em 35%" });
var container = $(document.createElement('div')).css({  
background:"white", padding: "5px", margin: "20px", width: "900px", border: "1px dashed", 
borderTopColor: "#999", borderBottomColor: "#999",
borderLeftColor: "#999", borderRightColor: "#999"
});

$("#Bronx").click(function(){

  $(button).empty();
  $(button).remove();
  $(button).append('<button style="border-radius: 20%; width: 100px" id="ShowMark"> Show Mark </button>');
  $('#map').before(button);
  $("#ShowMark").on("click",showMarkBronx)
  $(container).empty();
  $(container).remove();
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">Bronx Districts</td><td style=" width: 400px;text-align:center">Distance (Km)</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">1</td><td style=" width: 400px;text-align:center">'+distanciaBr[0]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">2</td><td style=" width: 400px;text-align:center">'+distanciaBr[1]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">3</td><td style=" width: 400px;text-align:center">'+distanciaBr[2]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">4</td><td style=" width: 400px;text-align:center">'+distanciaBr[3]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">5</td><td style=" width: 400px;text-align:center">'+distanciaBr[4]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">6</td><td style=" width: 400px;text-align:center">'+distanciaBr[5]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">7</td><td style=" width: 400px;text-align:center">'+distanciaBr[6]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">8</td><td style=" width: 400px;text-align:center">'+distanciaBr[7]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">9</td><td style=" width: 400px;text-align:center">'+distanciaBr[8]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">10</td><td style=" width: 400px;text-align:center">'+distanciaBr[9]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">11</td><td style=" width: 400px;text-align:center">'+distanciaBr[10]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">12</td><td style=" width: 400px;text-align:center">'+distanciaBr[11]+'</td></tr>');
  $('#map').after(container);
  

  

})
$("#Brooklyn").click(function(){

  $(button).empty();
  $(button).remove();
  $(button).append('<button style="border-radius: 20%; width: 100px" id="ShowMark"> Show Mark </button>');
  $('#map').before(button);
  $("#ShowMark").on("click",showMarkBrooklyn)
  $(container).empty();
  $(container).remove();
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">Brooklyn Districts</td><td style=" width: 400px;text-align:center">Distance (Km)</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">1</td><td style=" width: 400px;text-align:center">'+distanciaBroo[0]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">2</td><td style=" width: 400px;text-align:center">'+distanciaBroo[1]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">3</td><td style=" width: 400px;text-align:center">'+distanciaBroo[2]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">4</td><td style=" width: 400px;text-align:center">'+distanciaBroo[3]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">5</td><td style=" width: 400px;text-align:center">'+distanciaBroo[4]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">6</td><td style=" width: 400px;text-align:center">'+distanciaBroo[5]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">7</td><td style=" width: 400px;text-align:center">'+distanciaBroo[6]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">8</td><td style=" width: 400px;text-align:center">'+distanciaBroo[7]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">9</td><td style=" width: 400px;text-align:center">'+distanciaBroo[8]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">10</td><td style=" width: 400px;text-align:center">'+distanciaBroo[9]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">11</td><td style=" width: 400px;text-align:center">'+distanciaBroo[10]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">12</td><td style=" width: 400px;text-align:center">'+distanciaBroo[11]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">13</td><td style=" width: 400px;text-align:center">'+distanciaBroo[12]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">14</td><td style=" width: 400px;text-align:center">'+distanciaBroo[13]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">15</td><td style=" width: 400px;text-align:center">'+distanciaBroo[14]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">16</td><td style=" width: 400px;text-align:center">'+distanciaBroo[15]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">17</td><td style=" width: 400px;text-align:center">'+distanciaBroo[16]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">18</td><td style=" width: 400px;text-align:center">'+distanciaBroo[17]+'</td></tr>');
  $('#map').after(container);
  

  

})
$("#Manhattan").click(function(){

  $(button).empty();
  $(button).remove();
  $(button).append('<button style="border-radius: 20%; width: 100px" id="ShowMark"> Show Mark </button>');
  $('#map').before(button);
  $("#ShowMark").on("click",showMarkManhattan)
  $(container).empty();
  $(container).remove();
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">Manhattan Districts</td><td style=" width: 400px;text-align:center">Distance (Km)</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">1</td><td style=" width: 400px;text-align:center">'+distanciaMan[0]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">2</td><td style=" width: 400px;text-align:center">'+distanciaMan[1]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">3</td><td style=" width: 400px;text-align:center">'+distanciaMan[2]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">4</td><td style=" width: 400px;text-align:center">'+distanciaMan[3]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">5</td><td style=" width: 400px;text-align:center">'+distanciaMan[4]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">6</td><td style=" width: 400px;text-align:center">'+distanciaMan[5]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">7</td><td style=" width: 400px;text-align:center">'+distanciaMan[6]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">8</td><td style=" width: 400px;text-align:center">'+distanciaMan[7]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">9</td><td style=" width: 400px;text-align:center">'+distanciaMan[8]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">10</td><td style=" width: 400px;text-align:center">'+distanciaMan[9]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">11</td><td style=" width: 400px;text-align:center">'+distanciaMan[10]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">12</td><td style=" width: 400px;text-align:center">'+distanciaMan[11]+'</td></tr>');
  $('#map').after(container);
  

  

})
$("#Queens").click(function(){

  $(button).empty();
  $(button).remove();
  $(button).append('<button style="border-radius: 20%; width: 100px" id="ShowMark"> Show Mark </button>');
  $('#map').before(button);
  $("#ShowMark").on("click",showMarkQueens)
  $(container).empty();
  $(container).remove();
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">Queens Districts</td><td style=" width: 400px;text-align:center">Distance (Km)</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">1</td><td style=" width: 400px;text-align:center">'+distanciaQue[0]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">2</td><td style=" width: 400px;text-align:center">'+distanciaQue[1]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">3</td><td style=" width: 400px;text-align:center">'+distanciaQue[2]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">4</td><td style=" width: 400px;text-align:center">'+distanciaQue[3]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">5</td><td style=" width: 400px;text-align:center">'+distanciaQue[4]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">6</td><td style=" width: 400px;text-align:center">'+distanciaQue[5]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">7</td><td style=" width: 400px;text-align:center">'+distanciaQue[6]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">8</td><td style=" width: 400px;text-align:center">'+distanciaQue[7]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">9</td><td style=" width: 400px;text-align:center">'+distanciaQue[8]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">10</td><td style=" width: 400px;text-align:center">'+distanciaQue[9]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">11</td><td style=" width: 400px;text-align:center">'+distanciaQue[10]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">12</td><td style=" width: 400px;text-align:center">'+distanciaQue[11]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">13</td><td style=" width: 400px;text-align:center">'+distanciaQue[12]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">14</td><td style=" width: 400px;text-align:center">'+distanciaQue[13]+'</td></tr>');
  $('#map').after(container);
  

  

})
$("#StatenIsland").click(function(){
  $(button).empty();
  $(button).remove();
  $(button).append('<button style="border-radius: 20%; width: 100px" id="ShowMark"> Show Mark </button>');
  $('#map').before(button);
  $("#ShowMark").on("click",showMarkStIsland)
  $(container).empty();
  $(container).remove();
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">Staten Island Districts</td><td style=" width: 400px;text-align:center">Distance</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">1</td><td style=" width: 400px;text-align:center">'+distanciaStI[0]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">2</td><td style=" width: 400px;text-align:center">'+distanciaStI[1]+'</td></tr>');
  $(container).append('<tr style=" width: 900px"><td style=" width: 400px;text-align:center">3</td><td style=" width: 400px;text-align:center">'+distanciaStI[2]+'</td></tr>');

  $('#map').after(container);
  

  

})


})