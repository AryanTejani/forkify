import icons from 'url:../img/icons.svg';
import * as model from './model.js';
import recipeView from './view/viewRecipe.js';
import searchView from "./view/searchView.js"
import resultView from "./view/resultView.js"
import paginationView from './view/paginationView.js';

console.log(icons);

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // Show spinner before loading data
    recipeView.renderSpinner();

    await model.loadRecipes(id);

    const recipe = model.state.recipe;
    console.log(recipe.ingredients);

    // Render the recipe (this will replace the spinner)
    recipeView.render(recipe);
  } catch (error) {
    // console.error('Error fetching recipe:', error);
    recipeView.renderError(error.message);
  }
};

const pagination = (goToPage) => {
  console.log("Going to page:", goToPage);
  model.state.search.page = goToPage;
  
  // Re-render results and pagination
  resultView.render(model.getSearchResults(goToPage));
  paginationView.render({
    result: model.state.search.result,
    page: model.state.search.page
  });
};

const controlSearchResults = async ()=>{
  resultView.renderSpinner()
  try {
    const query = searchView.getQuery();

    if(!query) return;

    await model.loadSearch(`${query}`);
    console.log(model.state.search.result)
    
    // Render the search results
    resultView.render(model.getSearchResults(model.state.search.page));
    paginationView.render({
      result: model.state.search.result,
      page: model.state.search.page
    })
  } catch (error) {
    console.log(error)
  }
}



const init = ()=>{
  recipeView.addHandlerRenderer(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandleClick(pagination)
}
init()