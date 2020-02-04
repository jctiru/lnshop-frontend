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

export const getNovelsStart = () => ({
  type: NovelActionTypes.GET_NOVELS_START
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

export const createNovelStart = tokenAndNovel => ({
  type: NovelActionTypes.CREATE_NOVEL_START,
  payload: tokenAndNovel
});

export const createNovelSuccess = novel => ({
  type: NovelActionTypes.CREATE_NOVEL_SUCCESS,
  payload: novel
});

export const createNovelFailure = error => ({
  type: NovelActionTypes.CREATE_NOVEL_FAILURE,
  payload: error
});
