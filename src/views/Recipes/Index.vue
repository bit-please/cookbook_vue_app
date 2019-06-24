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



          <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div v-for="recipe in orderBy(filterBy(recipes, titleFilter, 'title'), sortAttribute, sortAscending)" class="col-md-6 col-sm-6" v-bind:key="recipe.id">

              <router-link class="item-grid" v-bind:to="'/recipes/' + recipe.id">
                <div class="image"><img v-bind:src="recipe.image_url" alt=""></div>
                <div class="v-align">
                  <div class="v-align-middle">
                    <h3 class="title">{{ recipe.title }}</h3>
                    <h5 class="date"><span>Prep time: {{ recipe.prep_time }}</span> | <span>Last modified: {{ relativeDate(recipe.updated_at) }}</span></h5>
                    <p>{{ recipe.ingredients }}</p>
                  </div>
                </div>
              </router-link>

              <!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#recipeDetailsModal" v-on:click="currentRecipe = recipe">
                See More
              </button>

            </div>
          </transition-group>

        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="recipeDetailsModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ currentRecipe.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Ingredients: {{ currentRecipe.ingredients }}</p>
            <p>Directions: {{ currentRecipe.directions }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style>
  .modal-backdrop {
    z-index: 1;
  }
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";
import moment from 'moment';

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      message: "Bit Please Cookbook",
      recipes: [],
      errors: [],
      titleFilter: "",
      sortAttribute: "title",
      sortAscending: 1,
      currentRecipe: {}
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
    },
    relativeDate: function(date) {
      return moment(date).fromNow();
    }
  }
};
</script>
