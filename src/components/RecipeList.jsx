import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchRecipes} from '../features/receipeSlice'
import RecipeCard from './RecipeCard'

import '../style/RecipeList.css'
import { useNavigate } from 'react-router-dom'

const RecipeList = () => {
    const{loading, error, searchData, recipesData}=useSelector((state)=>state.recipes)
    const [radioData, setRadioData]=useState("")
    console.log(radioData)

    if(loading){
        return <h2>Loading ... </h2>
    }
    
  return (
    <div className='container'>
        <div className='conainter-filter'>
           
            <div className='content-category'>
                <div className='inline-content'>
                    <label className='input-label'>all</label>
                    <input className='inputfield' name="category" type="radio" checked={radioData===""} value="" onChange={(e)=>setRadioData(e.target.value)}></input>
                </div>
                <div className="inline-content">
                    <label className='input-label'>Vegetarian</label>
                    <input className='inputfield ' name="category" type="radio" value={"vegetarian"} checked={radioData==="vegetarian"} onChange={(e)=>setRadioData(e.target.value)}></input>
                </div>
                <div className="inline-content">
                    <label className='input-label'>Non-veg</label>
                    <input className='inputfield' name="category" type="radio" value="non-vegetarian"  checked={radioData==="non-vegetarian"} onChange={(e)=>setRadioData(e.target.value)} ></input>
                </div>
            </div>
        </div>
        <div className='container-cards'>

        
        {
            recipesData&&
            recipesData
            .filter(recipe=>{
                if(searchData.length===0){
                    return recipe 
                }else{
                    return recipe.recipeName.toLowerCase().includes(searchData.toLowerCase())
                }
            })
            .filter(recipe=>{
                if(radioData===""){
                    return recipe
                }else{
                    return recipe.category===radioData
                }
            })
            .map((recipe)=>
            <RecipeCard key={recipe.id} recipe={recipe}/>
            )
        }
        </div>
    </div>
  )
}

export default RecipeList