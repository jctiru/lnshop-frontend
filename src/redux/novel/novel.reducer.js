import { NovelActionTypes } from "./novel.types";

const INITIAL_STATE = {
  novel: null,
  novels: { totalPages: 0, lightNovels: [] },
  genres: [],
  isNovelLoading: false,
  isNovelsLoading: false,
  isGenresLoading: false,
  isCrudNovelLoading: false,
  isCrudNovelSuccess: false,
  error: null
};

const novelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NovelActionTypes.GET_GENRES_START:
      return {
        ...state,
        isGenresLoading: true,
        error: null
      };
    case NovelActionTypes.GET_GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload,
        isGenresLoading: false,
        error: null
      };
    case NovelActionTypes.GET_GENRES_FAILURE:
      return {
        ...state,
        genres: [],
        isGenresLoading: false,
        error: action.payload
      };
    case NovelActionTypes.GET_NOVELS_START:
      return {
        ...state,
        isNovelsLoading: true,
        error: null
      };
    case NovelActionTypes.GET_NOVELS_SUCCESS:
      return {
        ...state,
        novels: action.payload,
        isNovelsLoading: false,
        error: null
      };
    case NovelActionTypes.GET_NOVELS_FAILURE:
      return {
        ...state,
        novels: { totalPages: 0, lightNovels: [] },
        isNovelsLoading: false,
        error: action.payload
      };
    case NovelActionTypes.GET_NOVEL_START:
      return {
        ...state,
        novel: null,
        isNovelLoading: true,
        error: null
      };
    case NovelActionTypes.GET_NOVEL_SUCCESS:
      return {
        ...state,
        novel: action.payload,
        isNovelLoading: false,
        error: null
      };
    case NovelActionTypes.GET_NOVEL_FAILURE:
      return {
        ...state,
        novel: null,
        isNovelLoading: false,
        error: action.payload
      };
    case NovelActionTypes.CREATE_NOVEL_START:
    case NovelActionTypes.UPDATE_NOVEL_START:
      return {
        ...state,
        isCrudNovelLoading: true,
        isCrudNovelSuccess: false,
        error: null
      };
    case NovelActionTypes.CREATE_NOVEL_SUCCESS:
    case NovelActionTypes.UPDATE_NOVEL_SUCCESS:
      return {
        ...state,
        isCrudNovelLoading: false,
        isCrudNovelSuccess: action.payload,
        error: null
      };
    case NovelActionTypes.CREATE_NOVEL_FAILURE:
    case NovelActionTypes.UPDATE_NOVEL_FAILURE:
      return {
        ...state,
        isCrudNovelLoading: false,
        isCrudNovelSuccess: false,
        error: action.payload
      };
    case NovelActionTypes.CRUD_NOVEL_STATUS_RESET:
      return {
        ...state,
        isCrudNovelSuccess: false,
        error: null
      };
    default:
      return state;
  }
};

export default novelReducer;
