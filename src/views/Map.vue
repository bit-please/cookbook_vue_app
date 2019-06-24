<template>
  <div class="map">
		<div id='map'></div>
  </div>
</template>

<style>
/*  body { 
  	margin:0; 
  	padding:0; 
  }*/
  #map { 
  	height: 700px;
  	top:0; 
  	bottom:0; 
  	width:100%; 
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