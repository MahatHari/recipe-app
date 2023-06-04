import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../features/receipeSlice";

import "../style/CreateRecipe.css";

const CreateRecipe = () => {
  const recipes = useSelector((state) => state.recipes.recipesData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialData = {
    recipeName: "",
    author: "",
    prepTime: "",
    cookTime: "",
    ingredients: "",
    instructions: "",
    servings: "",
    tags: "",
    notes: "",
    category: "vegetarian",
  };
  const [newRecipe, setNewRecipe] = useState(initialData);
  const [Recipe, setRecipe] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkIfNoValues = (obj) => {
    let empty = false;
    for (let key in obj) {
      if (obj[key] === null || obj[key] === "") empty = true;
    }
    return empty;
  };
  const onCancel = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
   let instructions = newRecipe.instructions.split(", ");
   let ingredients = newRecipe.ingredients.split(", ");
   let tags = newRecipe.tags.split(" ");

    setRecipe((prev) => {
      const obj = { ...newRecipe };
      obj["id"]=recipes.length +1;
      obj["ingredients"] = ingredients;
      obj["instructions"] = instructions;
      obj["tags"] = tags;
      return obj;
    });
    if(Recipe!==undefined){
      dispatch(createRecipe(Recipe))
      navigate("/")
    }
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <div className="group-sub">
            <div>
              <label htmlFor="recipeName">Recipe Name</label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={newRecipe.recipeName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={newRecipe.author}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="group-sub">
            <div>
              <label htmlFor="prepTime">Preparation Time</label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={newRecipe.prepTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="cookTime">Cooking Time</label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={newRecipe.cookTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="group-sub">
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={newRecipe.category}
                onChange={handleInputChange}
              >
                <option value="vegetarian" defaultValue="vegetarian">
                  Vegetarian
                </option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            </div>
            <div>
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={newRecipe.tags}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="group-sub">
            <div>
              <label htmlFor="Serving">Servings</label>
              <input
                type="text"
                id="cookTime"
                name="servings"
                value={newRecipe.servings}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={newRecipe.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="group">
          <div>
            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              type="text"
              id="ingredients"
              name="ingredients"
              value={newRecipe.ingredients}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              type="text"
              id="instructions"
              name="instructions"
              value={newRecipe.instructions}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button type="submit">
          "Add Recipe"
        </button>
       
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
       
      </form>
    </div>
  );
};

export default CreateRecipe;
