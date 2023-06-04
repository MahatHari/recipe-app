import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../style/RecipeDetails.css";
import chickenCurry from "../assets/chicken-curry.jpeg";
import { fetchRecipes } from "../features/receipeSlice";

const RecipeDetails = () => {
  const dispatch= useDispatch()
  const { recipesData} = useSelector((state) => state.recipes);
  
  useEffect(()=>{
    if(recipesData.length==0){
      dispatch(fetchRecipes());
    }
  },[dispatch, recipesData])
  const { id } = useParams();
 const recipe = recipesData?.find((x) => String(x.id) === id);
  if(recipe){
    return ( 
      (<div className="recipe-details">
        <div className="recipe-image">
          <img src={chickenCurry} alt="Recipe" />
        </div>
        <div>
          <div className="recipe-info">
              <div className="recipe-info-shorts">
                <h2>{recipe.recipeName}</h2>
                  <ul className="recipe-info-name">
                    <li style={{listStyleType:"none"}}> <span>  Author:</span>{recipe.author}</li>
                    <li style={{listStyleType:"none"}}><span>Prep Time:</span> {recipe.prepTime}</li>
                    <li style={{listStyleType:"none"}}> <span>Cook Time: </span>{recipe.cookTime}</li>
                    <li style={{listStyleType:"none"}}> <span>Servings: </span>{recipe.servings}</li>
                    <li style={{listStyleType:"none"}}> <span>Category: </span>{recipe.category}</li>
                  </ul>
                
              </div>
            
              <div className="recipe-ingredients">
              <h3>Ingredients:</h3>
              <ul className="recipe-info-name">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} style={{listStyleType:"none"}}>  {ingredient}</li>
                  ))}
              </ul>
              </div>
                </div>
                  <div className="recipe-info-steps">
                  <h3>Instructions:</h3>
                  <ul className="recipe-info-name">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} style={{listStyleType:"none"}}>{index+1}.   {instruction}</li>
                      ))}
                  </ul>
                  <h3>Notes:</h3>
                  <p>{recipe.notes}</p>
                </div>
        </div>
      </div>)
  );}
  else{
    return <h2>Recipe not Found</h2>
  }
};

export default RecipeDetails;
