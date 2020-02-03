import { NovelActionTypes } from "./novel.types";

const INITIAL_STATE = {
  novel: null,
  genres: [],
  isGenresLoading: false,
  isCreateNovelLoading: false,
  isCreateNovelSuccess: false,
  error: null
};

const novelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NovelActionTypes.GET_GENRES_START:
      return {
        ...state,
        genres: [],
        isGenresLoading: true,
        error: null
      };
    case NovelActionTypes.CREATE_NOVEL_START:
      return {
        ...state,
        isCreateNovelLoading: true,
        isCreateNovelSuccess: false,
        error: null
      };
    case NovelActionTypes.GET_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload,
        isGenresLoading: false,
        error: null
      };
    case NovelActionTypes.CREATE_NOVEL_SUCCESS:
      return {
        ...state,
        isCreateNovelLoading: false,
        isCreateNovelSuccess: action.payload,
        error: null
      };
    case NovelActionTypes.GET_GENRES_FAILURE:
      return {
        ...state,
        genres: [],
        isGenresLoading: false,
        error: action.payload
      };
    case NovelActionTypes.CREATE_NOVEL_FAILURE:
      return {
        ...state,
        isCreateNovelLoading: false,
        isCreateNovelSuccess: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default novelReducer;
