import { takeLatest, put, all, call, select } from "redux-saga/effects";

import { NovelActionTypes } from "./novel.types";
import {
  getGenresSuccess,
  getGenresFailure,
  getNovelsSuccess,
  getNovelsFailure,
  createNovelSuccess,
  createNovelFailure
} from "./novel.actions";
import { getGenresApi, getNovelsApi, createNovelApi } from "../api/novel.api";

const getToken = state => state.user.currentUser.token;

function* getGenres() {
  try {
    const { data } = yield call(getGenresApi);
    yield put(getGenresSuccess(data));
  } catch (error) {
    yield put(getGenresFailure(error.response.data));
  }
}

function* getNovels() {
  try {
    const { data } = yield call(getNovelsApi);
    yield put(getNovelsSuccess(data));
  } catch (error) {
    yield put(getNovelsFailure(error.response.data));
  }
}

function* createNovel({ payload: { novel } }) {
  try {
    const token = yield select(getToken);
    const { data } = yield call(createNovelApi, token, novel);
    yield put(createNovelSuccess(data));
  } catch (error) {
    yield put(createNovelFailure(error.response.data));
  }
}

function* onGetGenresStart() {
  yield takeLatest(NovelActionTypes.GET_GENRES_START, getGenres);
}

function* onGetNovelsStart() {
  yield takeLatest(NovelActionTypes.GET_NOVELS_START, getNovels);
}

function* onCreateNovelStart() {
  yield takeLatest(NovelActionTypes.CREATE_NOVEL_START, createNovel);
}

export function* novelSagas() {
  yield all([
    call(onGetGenresStart),
    call(onGetNovelsStart),
    call(onCreateNovelStart)
  ]);
}
