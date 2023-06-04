import {configureStore} from '@reduxjs/toolkit'

import recipes from './features/receipeSlice'

export const store= configureStore({
    reducer:{
        recipes:recipes,
    }
})