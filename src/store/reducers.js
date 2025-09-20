import { combineReducers } from "@reduxjs/toolkit";
import authoriseSlice from "./slices/authorise";
import flashMessageSlice from "./slices/flashMessage";
import quizSlice from "./slices/quiz";

const rootReducer = combineReducers({
  authorise: authoriseSlice.reducer,
  flashMessage: flashMessageSlice.reducer,
  quiz: quizSlice.reducer,
});

export default rootReducer;
