import axios, { AxiosHeaders } from 'axios'


const baseUrl= "http://localhost:3001/recipes"

const getAll= async()=>{
    try {
        const response = await axios.get(baseUrl);
       
        return response.data 
    } catch (error) {
        throw new Error('Failed to fetch recipes')
    }
}
const createRecipe=async(data, rejectWithValue)=>{
    try {
        const response=await axios.post(baseUrl, data);
        return response.data
    } catch (error) {
        throw new Error("Failed to create Recipe")
    }
}

const updateRecipe=async(id, data)=>{
    try{
        const response= await axios.put(`${baseUrl}/${id}`, data);
        return response.data
    }catch(error){
        throw new Error("Failed to update Recipe");
    }
}

const deleteRecipe= async(id)=>{
    try{
      
        const response= await axios.delete(`${baseUrl}/${id}`);
        response.data["id"]=id
        return response.data
       
    }catch(error){
        throw new Error("Failed to delete Recipe");
    }
}

export default {getAll, createRecipe, updateRecipe, deleteRecipe} 
