queue()
    .defer(d3.json, "/data")
    .await(initMap);


  function initMap(error,recordsJson) {
  // The location of Uluru

  console.log(recordsJson.length); 
  var records = recordsJson;
  var lat = records.latitude;
  var long  = records.longitude;
  //long  = JSON.parse(long);
  var uluru = {lat: 38.631913, lng: -121.434879}; 
  var map = new google.maps.Map(
  document.getElementById('map'), {zoom: 14, center: uluru});
  var zoomLevel =1;

  //var l = lat.length;
  //console.log(l);
  Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

// Get the size of an object
  var size = Object.size(lat);
  console.log(size);
  var icon = {
    url: "../static/images/location.png", // url
    scaledSize: new google.maps.Size(35, 35), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
};
var icon2 = {
	url: "../static/images/location2.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
}
    var markers=[];
    for(var i=0;i<size;i++){
    var marker_longitude = parseFloat(long[i]);
  	var marker_latitude = parseFloat(lat[i]);
    var location = {lat:marker_latitude ,lng: marker_longitude}	
    var z = map.getZoom();
    var marker = new google.maps.Marker({position: location, map: map , icon:icon,title:'Clock to zoom'});   
     i++;
     marker.addListener('click',function(){
          map.setZoom(map.getZoom()+2);
          map.setCenter(marker.getPosition());

     });
     markers.push(marker);
    // map_bounds.extend(location);
    }
    
    
    var zoomlevel = 1;
  	google.maps.event.addListener(map,'zoom_changed',function(){
    var z = map.getZoom();
    var image;
    if(z>14){
        image = icon2
        for(var j=0;j<markers.length;j++){
        	markers[j].setMap(null);
        }
        markers = [];
    }
    else {
    	image = icon;
        for(var j=0;j<markers.length;j++){
        	markers[j].setMap(null);
        } 
        markers = [];
    }
      for(var i=0;i<size;i++){
    var marker_longitude = parseFloat(long[i]);
  	var marker_latitude = parseFloat(lat[i]);
    var location = {lat:marker_latitude ,lng: marker_longitude}	

    var marker = new google.maps.Marker({position: location, map: map , icon:image,title:'Clock to zoom'});   
     i++;
     marker.addListener('click',function(){
          map.setZoom(map.getZoom()+1);
          map.setCenter(marker.getPosition());

     });
     markers.push(marker);
    // map_bounds.extend(location);
    }
  });
     
  
  
} 
