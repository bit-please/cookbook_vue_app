<template>
  <div class="recipes-show">

   <h2>{{ recipe.title }}</h2>
   <img v-bind:src="recipe.image_url" alt="">
   <p>Ingredients: {{ recipe.ingredients }}</p>
   <p>Directions: {{ recipe.directions }}</p>
   <p>Prep Time in minutes: {{ recipe.prep_time }}</p>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
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
  }
};
</script>