import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    }
  }
});

export const { changeSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;