import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { searchRecipe } from '../features/receipeSlice'
import '../style/NavBar.css'



const NavBar = () => {
    const [searchBar, setSearchBar]=useState(false)
    const [search, setSearch]=useState("")
    
    const dispatch= useDispatch();
    let location= useLocation();
    const recipes =useSelector((state)=>state.recipes.recipesData)
    useEffect(()=>{
        location.pathname==='/'? setSearchBar(true):setSearchBar(false);
    },[location])

    useEffect(()=>{
        dispatch(searchRecipe(search))
    },[search])
    
  return (
    <nav className="navbar ">
            <div className='navbar-container-menu'>
                <h4 className="navbar-brand">HK-Recipe</h4>
                <ul className="navbar-nav ">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to={"/create"}>Create Recipe</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={"/"}>All Recipes({recipes.length})</Link>
                    </li>
                </ul>
            </div>

        {searchBar && <input className="navbar-search" type="search" placeholder="Search for recipe" aria-label="Search"  onChange={(event)=>setSearch(event.target.value)}/> }   
    </nav>
  )
}

export default NavBar