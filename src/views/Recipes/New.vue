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
        <input type="file" class="form-control" v-on:change="setFile($event)" ref="fileInput">
      </div>
      <div class="form-group col-md-12">
        <label for="categories">Categories</label><br>

        <span v-for="category in categories">
          <input type="checkbox" :value="category.id" v-model="categoryIds"> {{ category.name }}
        </span>
        <br>
        <span>categoryIds: {{ categoryIds }}</span>

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
      status: "",
      categories: [],
      categoryIds: []
    };
  },
  created: function() {
    axios.get("/api/categories").then(response => {
      this.categories = response.data;
      console.log(this.categories);
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.newRecipeImageUrl = event.target.files[0];
      }
    },
  	submit: function() {
  		// make a post request via axios to create a new recipe in our database!
      var formData = new FormData();
      formData.append("title", this.newRecipeTitle);
      formData.append("ingredients", this.newRecipeIngredients);
      formData.append("directions", this.newRecipeDirections);
      formData.append("image_url", this.newRecipeImageUrl);
      formData.append("prep_time", this.newRecipePrepTime);
      formData.append("category_ids", this.categoryIds);
  		axios.post("/api/recipes", formData).then(response => {
  			this.$router.push("/");
  		}).catch(error => {
        this.errors = error.response.data.errors;
        this.status = error.response.status;
      });
  	}
  }
};
</script>