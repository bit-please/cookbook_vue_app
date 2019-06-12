<template>
  <div class="home">

		<h1>New Recipe</h1>
		<button v-on:click="createRecipe()">Create</button>

    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes">
    	<h3>Title: {{ recipe.title }}</h3>
    	<img v-bind:src="recipe.image_url" alt="">
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
      message: "Bit Please Cookbook",
      recipes: []
    };
  },
  created: function() {
  	axios.get("/api/recipes").then(response => {
  		this.recipes = response.data;
  	});
  },
  methods: {
  	createRecipe: function() {
  		// make a post request via axios to create a new recipe in our database!
  		var params = {
  			title: "Coffee",
  			ingredients: "Beans",
  			directions: "Brew",
  			image_url: "https://img.etimg.com/thumb/msid-67055775,width-643,imgsize-709079,resizemode-4/coffeebeans.jpg",
  			prep_time: 5
  		}
  		axios.post("/api/recipes", params).then(response => {
  			console.log("Success!", response.data);
  			this.recipes.push(response.data);
  		});
  	}
  }
};
</script>
