import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateRecipe } from "../features/receipeSlice";

import "../style/UpdateRecipeForm.css";

const UpdateRecipeForm = () => {
  const recipesData = useSelector((state) => state.recipes.recipesData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id}= useParams();

  const recipe = recipesData?.find((x) => String(x.id) === id);
  
  const [recipeData, setRecipeData] = useState(recipe);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [instructions, setInstructions]= useState(recipe.instructions)
  const [tags, setTags]= useState(recipe.tags)
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange=(index, value)=>{
    const updatedIngredients= [...ingredients];
    updatedIngredients[index]=value;
    setIngredients(updatedIngredients);
    setRecipeData((prev)=>({
      ...prev,
      ingredients:updatedIngredients,
    }))
  }
  const handleInstructionChange= (index, value)=>{
    const updatedInstructions= [...instructions];
    updatedInstructions[index]=value;
    setInstructions(updatedInstructions);
    setRecipeData((prev)=>({
      ...prev,
      instructions:updatedInstructions,
    }))
  }

  const handleTagChange=(index, value)=>{
    const updatedTags= [...tags];
    updatedTags[index]=value;
    setTags(updatedTags);
    setRecipeData((prev)=>({
      ...prev,
      tags:updatedTags,
    }))
  }

  const checkIfNoValues = (obj) => {
    let empty = false;
    for (let key in obj) {
      if (obj[key] === null || obj[key] === "") empty = true;
    }
    return empty;
  };
  const onCancel = () => {
    navigate("/")
  };

  const handleSubmit = (e) => {
   e.preventDefault()
    dispatch(updateRecipe({id, recipeData}))
   navigate("/")
  }
    
  return (
    <div className="update-form">
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <div className="group-sub">
            <div>
              <label htmlFor="recipeName">Recipe Name</label>
              <input
                type="text"
                id="recipeName"
                name="recipeName"
                value={recipeData.recipeName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={recipeData.author}
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
                value={recipeData.prepTime}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="cookTime">Cooking Time</label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={recipeData.cookTime}
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
                value={recipeData.category}
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
              {tags.map((ing, index)=>(
                <input 
                type="text"
                key={index}
                value={ing}
                onChange={(e)=>handleTagChange(index, e.target.value)}
                />
              
            ))}
            </div>
          </div>
          <div className="group-sub">
            <div>
              <label htmlFor="Serving">Servings</label>
              <input
                type="text"
                id="cookTime"
                name="servings"
                value={recipeData.servings}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={recipeData.notes}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="ingredients">
            <label htmlFor="ingredients">Ingredients</label>

            <div className="destructured-inputs" >
              {ingredients.map((ing, index)=>(
                <div key={index}>
                  <input 
                  type="text"
                  value={ing}
                  onChange={(e)=>handleIngredientChange(index, e.target.value)}
                  />
                  </div>
              ))}
              </div>
          </div>
          <div className="instructions">
            <label htmlFor="instructions">Instructions</label>
            <div className="destructured-instructions" >
            {instructions.map((ing, index)=>(
              <div className="instruction-input" key={index}>
                <input 
                type="text"
                value={ing}
                onChange={(e)=>handleInstructionChange(index, e.target.value)}
                />
              </div>
            ))}
            </div>
          </div>
        </div>
        <button type="submit" >
          Save Changes
        </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
      
      </form>
    </div>
  );
};

export default UpdateRecipeForm;
