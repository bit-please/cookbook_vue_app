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
    		<button v-on:click="showRecipe(recipe)">More Info</button>
    	</div>
    	<div v-if="recipe === currentRecipe">
	    	<p>Ingredients: {{ currentRecipe.ingredients }}</p>
	    	<p>Directions: {{ currentRecipe.directions }}</p>
	    	<p>Prep Time: {{ currentRecipe.prep_time }}</p>
	    	<h4>Edit Recipe</h4>
	    	<div>
	    		Recipe object: {{ recipe }} <br>
	    		Title: <input type="text" v-model="recipe.title"><br>
	    		Prep Time: <input type="number" v-model="recipe.prep_time"><br>
	    		Ingredients: <input type="text" v-model="recipe.ingredients"><br>
	    		Directions: <input type="text" v-model="recipe.directions"><br>
	    		Image Url: <input type="text" v-model="recipe.image_url"><br>
	    		<button v-on:click="updateRecipe(recipe)">Update</button>
	    	</div>
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
  		};
  		axios.post("/api/recipes", params).then(response => {
  			console.log("Success!", response.data);
  			this.recipes.push(response.data);
  			this.newRecipeTitle = "";
  			this.newRecipePrepTime = "";
  			this.newRecipeIngredients = "";
  			this.newRecipeDirections = "";
  			this.newRecipeImageUrl = "";
  		});
  	},
  	showRecipe: function(recipe) {
  		if (this.currentRecipe === recipe) {
  			this.currentRecipe = null;
  		} else {
				this.currentRecipe = recipe;
  		}
  	},
  	updateRecipe: function(recipe) {
  		// send a patch request to the backend to update this recipe!
  		var params = {
  			title: recipe.title,
  			ingredients: recipe.ingredients,
  			directions: recipe.directions,
  			image_url: recipe.image_url,
  			prep_time: recipe.prep_time
  		};
  		axios.patch("/api/recipes/" + recipe.id, params).then(response => {
  			console.log("Success!", response.data);
  			// recipe = response.data;
  		});
  	}
  }
};
</script>
