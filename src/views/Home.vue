<template>
  <div class="home">

		<h1>New Recipe</h1>
		<div>
			Title: <input type="text" v-model="newRecipeTitle"><br>
			Prep Time: <input type="number" v-model="newRecipePrepTime"><br>
			Ingredients: <input type="text" v-model="newRecipeIngredients"><br>
			Directions: <input type="text" v-model="newRecipeDirections"><br>
			Image Url: <input type="text" v-model="newRecipeImageUrl">
		</div>
		<button v-on:click="createRecipe()">Create</button>

    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes">
    	<h3>Title: {{ recipe.title }}</h3>
    	<img v-bind:src="recipe.image_url" alt="">
    	<div>
    		<button v-on:click="currentRecipe = recipe">More Info</button>
    	</div>
    	<div v-if="recipe === currentRecipe">
	    	<p>Ingredients: {{ currentRecipe.ingredients }}</p>
	    	<p>Directions: {{ currentRecipe.directions }}</p>
	    	<p>Prep Time: {{ currentRecipe.prep_time }}</p>
    	</div>
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
      recipes: [],
      currentRecipe: {},
      newRecipeTitle: "",
      newRecipePrepTime: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipeImageUrl: ""
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
  			title: this.newRecipeTitle,
  			ingredients: this.newRecipeIngredients,
  			directions: this.newRecipeDirections,
  			image_url: this.newRecipeImageUrl,
  			prep_time: this.newRecipePrepTime
  		}
  		axios.post("/api/recipes", params).then(response => {
  			console.log("Success!", response.data);
  			this.recipes.push(response.data);
  			this.newRecipeTitle = "";
  			this.newRecipePrepTime = "";
  			this.newRecipeIngredients = "";
  			this.newRecipeDirections = "";
  			this.newRecipeImageUrl = "";
  		});
  	}
  }
};
</script>
