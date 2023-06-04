import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import apiService from "../services/apiService"

const initialState={
    recipesData:[],
    loading:false,
    error:'',
    searchData:''
}

export const fetchRecipes= createAsyncThunk("showRecipe", async(_,{rejectWithValue})=>{
    try{
        const response= await apiService.getAll();
        return response;
    }catch(error){
        return rejectWithValue(error.message)
    }
}  )

export const createRecipe=createAsyncThunk("createRecipe", async(data, {rejectWithValue})=>{
  try {
     const response= await apiService.createRecipe(data, {rejectWithValue});
      return response;
  } catch (error) {
        return rejectWithValue(error.message)
  }
})
export const updateRecipe=createAsyncThunk("updateRecipe", async ({id, recipeData}, {rejectWithValue})=>{
   try {
     const response = await apiService.updateRecipe(id, recipeData);
     return response;
   } catch (error) {
    return rejectWithValue(error.message)
   }
})

export const deleteRecipe=createAsyncThunk("deleteRecipe", async(id, {rejectWithValue})=>{
    try {
        const response=await apiService.deleteRecipe(id);
        return response;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const recipes=createSlice({
    name:'recipes',
    initialState,
    reducers:{
        searchRecipe:(state,action)=>{
            state.searchData=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchRecipes.pending,(state)=>{
            state.loading=true;

        })
        .addCase(fetchRecipes.fulfilled,(state, action)=>{
            state.loading=false;
            state.recipesData=action.payload
            
        })
        .addCase(fetchRecipes.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        builder
        .addCase(createRecipe.pending,(state)=>{
            state.loading=true;
        })
        .addCase(createRecipe.fulfilled, (state,action)=>{
            state.loading=false;
            const savedProduct=action.payload;
            console.log("FullFilled", savedProduct);
            state.recipesData.push(savedProduct)
        })
        .addCase(createRecipe.rejected, (state, action)=>{
            state.loading=false;
            state.error=action.payload
        })
        
        builder
        .addCase(updateRecipe.pending, (state)=>{
            state.loading=true;
        })
        .addCase(updateRecipe.fulfilled,(state, action)=>{
            state.loading=false;
            const updatedRecipe=action.payload;
            const index= state.recipesData.findIndex((product)=>product.id===updatedRecipe.id)
            if(index!==-1){
                state.recipesData[index]=updatedRecipe
            }
        })
        .addCase(updateRecipe.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        builder
        .addCase(deleteRecipe.pending, (state)=>{
            state.loading=true;
        })
        .addCase(deleteRecipe.fulfilled, (state, action)=>{
            state.loading=false;
            const {id}= action.payload
            state.recipesData= state.recipesData.filter((recipe)=> (recipe.id!==id))
        
        })
        .addCase(deleteRecipe.rejected, (state, action)=>{
            state.loading=false;
            state.error=action.payload
        })
        

    }

})

export default recipes.reducer
export const {searchRecipe}=recipes.actions