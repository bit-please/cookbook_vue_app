<template>
  <div class="recipes-show">

    <h4 v-if="$parent.isLoggedIn()">Logged in as: {{ $parent.user.name }}</h4>
    
    <h2>{{ recipe.title }}</h2>
    <img v-bind:src="recipe.image_url" alt="">
    <p>Ingredients: {{ recipe.ingredients }}</p>
    <p>Directions: {{ recipe.directions }}</p>
    <p>Prep Time in minutes: {{ recipe.prep_time }}</p>

    <router-link v-bind:to="'/recipes/' + recipe.id + '/edit'"><button class="btn btn-warning">Edit (go to edit route)</button></router-link>


    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#recipeEditModal">
      Edit Recipe (modal)
    </button>

    <!-- Modal -->
    <div class="modal fade" id="recipeEditModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit {{ recipe.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
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


          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      recipe: {},
      errors: [],
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
        // modal go away
        $('#myModal').modal('hide');
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    },
  }
};
</script>