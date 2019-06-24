<template>
  <div class="map">
		<div id='map'></div>
  </div>
</template>

<style>
  #map { 
  	height: 700px;
  }
</style>

<script>

export default {
  mounted: function() {
  	mapboxgl.accessToken = '<your access token here';
  	// create the map
  	var map = new mapboxgl.Map({
  	    container: 'map', // container id
  	    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  	    center: [-122.41, 37.77], // starting position [lng, lat]
  	    zoom: 12 // starting zoom
  	});
  	// create the popup
  	var popup = new mapboxgl.Popup({ offset: 25 })
  	.setText('The awesome Chinatown district of the historic city of San Francisco');
  	// create the marker
  	var marker = new mapboxgl.Marker()
  	  .setLngLat([-122.406380, 37.794300])
  	  .setPopup(popup)
  	  .addTo(map);
  }
};
</script>