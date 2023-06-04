import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import './App.css'
import CreateRecipe from './components/CreatRecipe';
import NavBar from './components/NavBar';
import RecipeDetails from './components/RecipeDetails';
import UpdateRecipeForm from './components/UpdateRecipeForm';

import RecipeList from './components/RecipeList';
import { fetchRecipes } from './features/receipeSlice';
import ErrorPage from './components/ErrorPage';
function App() {
  const dispatch= useDispatch()
  useEffect(()=>{
      dispatch(fetchRecipes())
  },[dispatch])

  const error =useSelector(state=>state.recipes.error)
  
  return (
    <>
      <BrowserRouter>
      <NavBar />
      <div className='container'>
        {error?(
          <ErrorPage message={error}/>
        ):
        <Routes>
          <Route exact path='/' element={<RecipeList/>}/>
          <Route path='create' element ={<CreateRecipe />} />
          <Route path='update/:id' element={<UpdateRecipeForm />}/>
          <Route path='recipe/:id' element={<RecipeDetails />}/>
        </Routes>
      }
      </div>
      </BrowserRouter>
    </>
  )
}

export default App
