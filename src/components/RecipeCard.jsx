import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteRecipe } from "../features/receipeSlice";
import chickenCurry from '../assets/chicken-curry.jpeg'
import '../style/RecipeCard.css'

const RecipeCard = ({recipe}) => {
    const {recipeName, author, prepTime, cookTime, category, servings, id }=recipe
    const navigate= useNavigate()
    const dispatch= useDispatch()
   

    const readMore=()=>{
     navigate(`recipe/${id}`)
   
    }

    const editRecipe=()=>{
        navigate(`update/${id}`)
    }
    const deleteRecipeFn=()=>{
      const result= window.confirm("Are you sure you want to delete ")
      result ?
        dispatch(deleteRecipe(id))
        :navigate("/")
      navigate("/")
    }


  return (
    <div className="card">
    <div className="card-header">
      <h2 className="card-logo"  alt="Logo" >{(author.split(' ')).length>1 ? author[0]+(author.split(' ')[1][0] ): author[0]+'.' }</h2>
      <div className="card-title">
      <h3 >{recipeName}</h3>
      <span className='card-subtitle'>By: {author}</span>
      </div> 
    </div>
    <div className="card-image-container">
      <img className="card-image" src={chickenCurry} alt={recipeName} />
    </div>
    <div className="card-content">
      <p className="card-description">
        Preparation Time: {prepTime}
        Cook Time: {cookTime}
        Servings: {servings}
      </p>
    </div>
    <div className="card-actions">
        <button className='button-more' onClick={readMore}>Read more</button>
        <button className='button-edit' onClick={editRecipe}>Edit</button>
        <button className='button-delete' onClick={deleteRecipeFn}>Delete</button>
    </div>
  </div>
  )
}

export default RecipeCard