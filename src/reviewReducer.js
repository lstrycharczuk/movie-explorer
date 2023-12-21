import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
 name: "reviews",
 initialState: {
    list: [],
 },
 reducers: {
    addReviewAction: (state, action) => {
      state.list.push({reviewText: action.payload});
    },
 },
});

export const { addReviewAction } = reviewSlice.actions;
export default reviewSlice.reducer;
