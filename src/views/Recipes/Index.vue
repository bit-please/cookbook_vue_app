<template>
  <div class="recipes-index">

    <div id="fh5co-blog-section">
      <div class="container">
        <div class="row">

          <div class="form-group">
            <label for="title">Search</label>
            <input type="text" class="form-control" placeholder="Enter title..." v-model="titleFilter" list="titles">
          </div><br>

          <div class="form-group">
            <button class="btn btn-primary" v-on:click="setSortAttribute('title')">Sort by title 

              <i v-if="sortAttribute === 'title' && sortAscending === 1" class="icon-arrow-up"></i>
              <i v-if="sortAttribute === 'title' && sortAscending === -1" class="icon-arrow-down"></i>

            </button>
            <button class="btn btn-primary" v-on:click="setSortAttribute('prep_time')">Sort by prep time 

              <i v-if="sortAttribute === 'prep_time' && sortAscending === 1" class="icon-arrow-up"></i>
              <i v-if="sortAttribute === 'prep_time' && sortAscending === -1" class="icon-arrow-down"></i>

            </button>
          </div><br>

          <datalist id="titles">
            <option v-for="recipe in recipes">{{ recipe.title }}</option>
          </datalist>

          <div v-for="recipe in orderBy(filterBy(recipes, titleFilter, 'title'), sortAttribute, sortAscending)" class="col-md-6 col-sm-6">

            <router-link class="item-grid" v-bind:to="'/recipes/' + recipe.id">
              <div class="image"><img v-bind:src="recipe.image_url" alt=""></div>
              <div class="v-align">
                <div class="v-align-middle">
                  <h3 class="title">{{ recipe.title }}</h3>
                  <h5 class="date"><span>Prep time: {{ recipe.prep_time }}</span></h5>
                  <p>{{ recipe.ingredients }}</p>
                </div>
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters"

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Bit Please Cookbook",
      recipes: [],
      currentRecipe: {},
      errors: [],
      titleFilter: "",
      sortAttribute: "title",
      sortAscending: 1
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
			this.currentRecipe = recipe;
  	},
    setSortAttribute: function(attribute) {
      if (this.sortAttribute === attribute) {
        // if i click on the same button, toggle the value of sortAcending
        this.sortAscending = this.sortAscending * -1;
      } else {
        this.sortAscending = 1;
      }
      this.sortAttribute = attribute;
    }
  }
};
</script>
