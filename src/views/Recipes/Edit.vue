<template>
	<div class="recipes-edit">
		
		<h1 class="text-center">Edit Recipe</h1>

		<ul>
		  <li v-for="error in errors">{{ error }}</li>
		</ul>

		<form v-on:submit.prevent="submit()">
		  <div class="form-row">
		    <div class="form-group col-md-6">
		      <label for="title">Title</label>
		      <input type="text" class="form-control" id="title" placeholder="Cookies" v-model="recipe.title">
		    </div>
		    <div class="form-group col-md-6">
		      <label for="prepTime">Prep Time</label>
		      <input type="number" class="form-control" id="prepTime" placeholder="20" v-model="recipe.prep_time">
		    </div>
		  </div>
		  <div class="form-group col-md-12">
		    <label for="ingredients">Ingredients</label>
		    <input type="text" class="form-control" id="ingredients" placeholder="Sugar, water, butter, eggs..." v-model="recipe.ingredients">
		  </div>
		  <div class="form-group col-md-12">
		    <label for="directions">Directions</label>
		    <input type="text" class="form-control" id="directions" placeholder="Mix in bowl and bake at 350 for 10 mins..." v-model="recipe.directions">
		  </div>
		  <div class="form-group col-md-12">
		    <label for="imageUrl">Image</label>
		    <input type="text" class="form-control" id="imageUrl" placeholder="Paste image link" v-model="recipe.image_url">
		  </div>
		  <div class="form-group col-md-12 text-center">
		  	<button type="submit" class="btn btn-primary">Update</button>
		  </div>
		  
		</form>

		<div class="text-center">
			<button class="btn btn-danger" v-on:click="destroyRecipe()">Destroy</button>
		</div>

	</div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      errors: [],
      recipe: {}
    };
  },
  created: function() {
  	axios.get("/api/recipes/" + this.$route.params.id).then(response => {
      this.recipe = response.data;
      console.log(this.recipe);
    });
  },
  methods: {
  	submit: function() {
  		// send a patch request to the backend to update this recipe
  		var params = {
  			title: this.recipe.title,
  			ingredients: this.recipe.ingredients,
  			directions: this.recipe.directions,
  			image_url: this.recipe.image_url,
  			prep_time: this.recipe.prep_time
  		};
  		axios.patch("/api/recipes/" + this.recipe.id, params).then(response => {
  			console.log("Success!", response.data);
  			this.$router.push("/recipes/" + this.recipe.id);
  		}).catch(error => {
  			this.errors = error.response.data.errors;
  		});
  	},
  	destroyRecipe: function() {
  		// send an axios delete request to the backend to remove recipe from database
  		if(confirm("Do you really want to delete " + this.recipe.title + "?"))
  		axios.delete("/api/recipes/" + this.recipe.id).then(response => {
  			console.log("Success!", response.data);
  			this.$router.push("/");
  		});
  	}
  }
};
</script>