import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: { showResult: false, showReview: false, selectedAnswers: {} },
  reducers: {
    toggleShowResult: (state, action) => {
      state.showResult = action.payload;
    },

    setShowReview: (state, action) => {
      state.showReview = action.payload;
    },

    setSelectedAnswers: (state, action) => {
      state.selectedAnswers = {
        ...state.selectedAnswers,
        [action.payload.questionId]: action.payload.index,
      };
    },

    clearSelectedAnswers: (state) => {
      state.selectedAnswers = {};
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice;
