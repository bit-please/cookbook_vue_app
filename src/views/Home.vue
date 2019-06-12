<template>
  <div class="home">

    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes">
    	<h3>Title: {{ recipe.title }}</h3>
    	<p>Ingredients: {{ recipe.ingredients }}</p>
    	<p>Directions: {{ recipe.directions }}</p>
    	<p>Prep Time: {{ recipe.prep_time }}</p>
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Hello World",
      recipes: []
    };
  },
  created: function() {
  	axios.get("/api/recipes").then(response => {
  		this.recipes = response.data;
  	});
  },
  methods: {}
};
</script>
