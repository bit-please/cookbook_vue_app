<template>
  <div class="recipes-new">

    <h1>New Recipe</h1>

    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" placeholder="Cookies" v-model="newRecipeTitle">
        </div>
        <div class="form-group col-md-6">
          <label for="prepTime">Prep Time</label>
          <input type="number" class="form-control" id="prepTime" placeholder="20" v-model="newRecipePrepTime">
        </div>
      </div>
      <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <input type="text" class="form-control" id="ingredients" placeholder="Sugar, water, butter, eggs..." v-model="newRecipeIngredients">
      </div>
      <div class="form-group">
        <label for="directions">Directions</label>
        <input type="text" class="form-control" id="directions" placeholder="Mix in bowl and bake at 350 for 10 mins..." v-model="newRecipeDirections">
      </div>
      <div class="form-group">
        <label for="imageUrl">Image</label>
        <input type="text" class="form-control" id="imageUrl" placeholder="Paste image link" v-model="newRecipeImageUrl">
      </div>
      <button type="submit" class="btn btn-success">Create</button>
    </form>
    
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
  	submit: function() {
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