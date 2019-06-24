<template>
  <div class="map">
		<div id='map'></div>
  </div>
</template>

<style>
  #map { 
  	height: 700px;
  }
  .marker {
    background-image: url('http://www.myiconfinder.com/uploads/iconsets/256-256-73af4456d48391a40f64a3da3ec7ab6f.png');
    background-size: cover;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
</style>

<script>

export default {
	data: function() {
    return {
      places: [
				{
					lat: 37.974728,
					long: -122.03711,
					description: "Alpine Bakery in Concord, delicious pastries!"
				},
				{
					lat: 36.973804,
					long: -122.02575,
					description: "Marinis is my favorite ice cream in Santa Cruz"
				},
				{
					lat: 37.791852,
					long: -122.42127,
					description: "Bob's Donuts in SF makes gigantic donuts, good for sharing (or eating alone!)"
				}
			]
    };
  },
  mounted: function() {
  	mapboxgl.accessToken = 'pk.eyJ1IjoiZHphZ2hpYW4iLCJhIjoiY2pzbnF0NmV0MGY2czQzbXBpMjcwMzRmNiJ9.Jei4-17Vu7hJSerisjPCEg';
  	var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });

  	mapboxClient.geocoding.forwardGeocode({
	  	query: 'San Francisco, CA',
	  	autocomplete: false,
	  	limit: 1
  	})
	  	.send()
	  	.then(function (response) {
		  	if (response && response.body && response.body.features && response.body.features.length) {
			  	var feature = response.body.features[0];
			  	 
			  	// create the map
			  	var map = new mapboxgl.Map({
			  	    container: 'map', // container id
			  	    style: 'mapbox://styles/dzaghian/cjxaqxm273umk1cqz0saddk4t', // stylesheet location
			  	    center: feature.center, // starting position [lng, lat]
			  	    zoom: 8 // starting zoom
			  	});

	  	  	this.places.forEach(function(place) {
	  	  		var el = document.createElement('div');
	  	  		el.className = 'marker';
	  	  		// create the popup
	  	  		var popup = new mapboxgl.Popup({ offset: 25 })
	  	  		.setText(place.description);
	  	  		// create the marker
	  		  	var marker = new mapboxgl.Marker(el)
	  		  	  .setLngLat([place.long, place.lat])
	  		  	  .setPopup(popup)
	  		  	  .addTo(map);
	  	  	});
		  	}
	  	}.bind(this));

  }
};
</script>