var mapimg;

var clat = 0;
var clon = 0;

var lat = 0;
var lon= 0;


//38.575764, -121.478851
var lat = 38.575764;
var lon= -121.478851;

var zoom = 1;
var earthquakes;


function preload() {
  mapimg = loadImage ('https://api.mapbox.com/{endpoint}?access_token={sk.eyJ1IjoiZmFycnVraHN1bHRhbmkiLCJhIjoiY2xnNGUzZ2V6MDZrcTNvcXJ3d3EzNXlodCJ9.BJKk8_k_gkWEIcKf99nijg}')
  earthquakes = loadStrings ('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
}

function mercX(lon) {
  lon = radians (lon);
  var  a = (256 /PI) * pow(2,zoom);
  var b = lon * PI;
  return a * b;
}

function mercY(lat) {
  lat = radians (lat);
  var  a = (256 /PI) * pow(2,zoom);
  var b = tan(PI / 4+ lat/2);
  var c = PI -log(b);
  return a * c;
}


function setup() {
  createCanvas(1024,512)
  translate(width / 2, height /2);
  imageMode(Center);
  image(maping,0, 0);


  var cx = mercX(clon);
  var cy = mercY(clat);

  for (var i = 0; i < earthquakes.length; i++) {
      var data = earthquakes [i].split(/,/);
      //console.log(data);
      var lat = data [1];
      var lon = data [2];
      var mag = data [4]
     // var cx = mercX(clon); 
      // var cy = mercY(clat);
      
      var x = mercX(lon) - cx;
      var y = mercY(lat) - cy;
      
      mag = pow(10, mag);
      mag = sqrt(mag);
      var magmax = sqrt(pow(10,10));

      var d = map(mag, 0,10,0,180); 
      stroke(255, 0, 255);
      fill(255, 0, 255, 200);
      ellipse(x,y,8,8);
    }
  } 
  var sacramento = [38.5816, -121.4944];

  var radius = 100; // distance in kilometers
for (var i = 0; i < earthquakes.length; i++) {
  var earthquake = earthquakes[i];
  var distance = getDistanceFromLatLonInKm(earthquake.latitude, earthquake.longitude, sacramento[0], sacramento[1]);
  if (distance <= radius) {
    var marker = L.marker([earthquake.latitude, earthquake.longitude]).addTo(map);
    marker.bindPopup("<h3>" + earthquake.place + "</h3><hr><p>" + new Date(earthquake.time) + "</p>");
  }
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
for (var i = 0; i < earthquakes.length; i++) {
  var earthquake = earthquakes[i];
  if (earthquake.latitude && earthquake.longitude) {
    var distance = getDistanceFromLatLonInKm(earthquake.latitude, earthquake.longitude, sacramento[0], sacramento[1]);
    if (distance <= radius) {
      var marker = L.marker([earthquake.latitude, earthquake.longitude]).addTo(map);
      marker.bindPopup("<h3>" + earthquake.place + "</h3><hr><p>" + new Date(earthquake.time) + "</p>");
    }
  }
}
