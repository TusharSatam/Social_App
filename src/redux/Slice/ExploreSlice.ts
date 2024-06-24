import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Define types for state and action payloads
interface ExploreState {
    allExplores: any[] | null; 
  
}

// Define initial state
const initialState: ExploreState = {
    allExplores: null,
   
};

const ExploreSlice = createSlice({
    name: "exploreSlice",
    initialState,
    reducers: {
        setAllExplores(state, action: PayloadAction<any[]>) {
            state.allExplores = action.payload;
        },
        
    },
});

// Export action creators with explicit types
export const {setAllExplores} =
    ExploreSlice.actions;

// Export reducer with inferred type based on initialState
export default ExploreSlice.reducer;
