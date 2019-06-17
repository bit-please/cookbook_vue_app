<template>
  <div class="recipes-new">

    <h1>New Recipe</h1>

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

		<div>
			Title: <input type="text" v-model="newRecipeTitle"><br>
			Prep Time: <input type="number" v-model="newRecipePrepTime"><br>
			Ingredients: <input type="text" v-model="newRecipeIngredients"><br>
			Directions: <input type="text" v-model="newRecipeDirections"><br>
			Image Url: <input type="text" v-model="newRecipeImageUrl">
		</div>
		<button class="btn btn-success" v-on:click="createRecipe()">Create</button>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newRecipeTitle: "",
      newRecipePrepTime: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipeImageUrl: "",
      errors: []
    };
  },
  created: function() {
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
  			this.$router.push("/");
  		}).catch(error => {
        this.errors = error.response.data.errors;
      });
  	}
  }
};
</script>