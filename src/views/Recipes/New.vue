<template>
  <div class="recipes-new">

    <h1 class="text-center">New Recipe</h1>

    <div v-if="status" class="text-center">
      <img v-bind:src="'https://http.cat/' + status" alt="">
    </div>

    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="title">Title</label>
          <input type="text" class="form-control" placeholder="Cookies" v-model="newRecipeTitle">
        </div>
        <div class="form-group col-md-6">
          <label for="prepTime">Prep Time</label>
          <input type="number" class="form-control" id="prepTime" placeholder="20" v-model="newRecipePrepTime">
        </div>
      </div>
      <div class="form-group col-md-12">
        <label for="ingredients">Ingredients</label>
        <input type="text" class="form-control" placeholder="Sugar, water, butter, eggs..." v-model="newRecipeIngredients">
      </div>
      <div class="form-group col-md-12">
        <label for="directions">Directions</label>
        <input type="text" class="form-control" placeholder="Mix in bowl and bake at 350 for 10 mins..." v-model="newRecipeDirections">
      </div>
      <div class="form-group col-md-12">
        <label for="imageUrl">Image</label>
        <input type="text" class="form-control" placeholder="Paste image link" v-model="newRecipeImageUrl">
      </div>
      <div class="form-group col-md-12 text-center">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
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
      errors: [],
      status: ""
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
        this.status = error.response.status;
      });
  	}
  }
};
</script>