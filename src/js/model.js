import { API_URL } from './config.js';
import { getJSON } from './helper.js';
import { RES_PER_PAGE } from './config.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    RES_PER_PAGE:  RES_PER_PAGE
  },
  
};

export const loadRecipes = async id => {
  try {
    const data = await getJSON(id);
    const recipe = data.data.recipe;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadSearch = async query => {
  try {
    state.search.query = query;
    const data = await getJSON(`?search=${query}`);
    state.search.result = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResults = (page) => {
  const start = (page - 1) * state.search.RES_PER_PAGE;
  const end = page * state.search.RES_PER_PAGE;

  return state.search.result.slice(start, end);
}