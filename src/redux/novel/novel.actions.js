import { NovelActionTypes } from "./novel.types";

export const getGenresStart = () => ({
  type: NovelActionTypes.GET_GENRES_START
});

export const getGenresSuccess = genres => ({
  type: NovelActionTypes.GET_GENRES_SUCCESS,
  payload: genres
});

export const getGenresFailure = error => ({
  type: NovelActionTypes.GET_GENRES_FAILURE,
  payload: error
});

export const getNovelsStart = searchQueryAndGenresQueryAndPage => ({
  type: NovelActionTypes.GET_NOVELS_START,
  payload: searchQueryAndGenresQueryAndPage
});

export const getNovelsSuccess = novels => ({
  type: NovelActionTypes.GET_NOVELS_SUCCESS,
  payload: novels
});

export const getNovelsFailure = error => ({
  type: NovelActionTypes.GET_NOVELS_FAILURE,
  payload: error
});

export const getNovelStart = novelId => ({
  type: NovelActionTypes.GET_NOVEL_START,
  payload: novelId
});

export const getNovelSuccess = novel => ({
  type: NovelActionTypes.GET_NOVEL_SUCCESS,
  payload: novel
});

export const getNovelFailure = error => ({
  type: NovelActionTypes.GET_NOVEL_FAILURE,
  payload: error
});

export const createNovelStart = novel => ({
  type: NovelActionTypes.CREATE_NOVEL_START,
  payload: novel
});

export const createNovelSuccess = novel => ({
  type: NovelActionTypes.CREATE_NOVEL_SUCCESS,
  payload: novel
});

export const createNovelFailure = error => ({
  type: NovelActionTypes.CREATE_NOVEL_FAILURE,
  payload: error
});

export const updateNovelStart = NovelIdAndNovel => ({
  type: NovelActionTypes.UPDATE_NOVEL_START,
  payload: NovelIdAndNovel
});

export const updateNovelSuccess = novel => ({
  type: NovelActionTypes.UPDATE_NOVEL_SUCCESS,
  payload: novel
});

export const updateNovelFailure = error => ({
  type: NovelActionTypes.UPDATE_NOVEL_FAILURE,
  payload: error
});

export const deleteNovelStart = novelId => ({
  type: NovelActionTypes.DELETE_NOVEL_START,
  payload: novelId
});

export const deleteNovelSuccess = response => ({
  type: NovelActionTypes.DELETE_NOVEL_SUCCESS,
  payload: response
});

export const deleteNovelFailure = error => ({
  type: NovelActionTypes.DELETE_NOVEL_FAILURE,
  payload: error
});

export const removeNovel = novelId => ({
  type: NovelActionTypes.REMOVE_NOVEL,
  payload: novelId
});

export const crudNovelStatusReset = () => ({
  type: NovelActionTypes.CRUD_NOVEL_STATUS_RESET
});
