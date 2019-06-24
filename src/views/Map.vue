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
  	mapboxgl.accessToken = '<your access token here>';
  	var map = new mapboxgl.Map({
  	    container: 'map', // container id
  	    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  	    center: [-122.41, 37.77], // starting position [lng, lat]
  	    zoom: 12 // starting zoom
  	});
  }
};
</script>