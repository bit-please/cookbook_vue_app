<template>
  <div class="home">

    <h1>{{ message }}</h1>

    <div v-for="recipe in recipes">
    	<h3>Title: {{ recipe.title }}</h3>
      <router-link v-bind:to="'/recipes/' + recipe.id">
    	  <img v-bind:src="recipe.image_url" alt="">
      </router-link>
    	<div>
    		<button class="btn btn-success" v-on:click="showRecipe(recipe)">More Info</button>
    	</div>
    	<div v-if="recipe === currentRecipe">
	    		<button class="btn btn-danger" v-on:click="destroyRecipe(recipe)">Destroy</button>
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
      errors: []
    };
  },
  created: function() {
  	axios.get("/api/recipes").then(response => {
  		this.recipes = response.data;
      console.log(this.recipes);
  	});
  },
  methods: {
  	showRecipe: function(recipe) {
  		if (this.currentRecipe === recipe) {
  			this.currentRecipe = null;
  		} else {
				this.currentRecipe = recipe;
  		}
  	},
  	destroyRecipe: function(recipe) {
  		// send an axios delete request to the backend to remove recipe from database
  		axios.delete("/api/recipes/" + recipe.id).then(response => {
  			console.log("Success!", response.data);
  			// find index of recipe in recipes array
  			var index = this.recipes.indexOf(recipe);
  			// splice recipes array at index
  			this.recipes.splice(index, 1);
  		});
  	}
  }
};
</script>
