import { takeLatest, put, all, call, select } from "redux-saga/effects";

import { NovelActionTypes } from "./novel.types";
import {
  getGenresSuccess,
  getGenresFailure,
  getNovelsSuccess,
  getNovelsFailure,
  getNovelSuccess,
  getNovelFailure,
  createNovelSuccess,
  createNovelFailure,
  updateNovelSuccess,
  updateNovelFailure
} from "./novel.actions";
import {
  getGenresApi,
  getNovelsApi,
  getNovelApi,
  createNovelApi,
  updateNovelApi
} from "../api/novel.api";

const getToken = state => state.user.currentUser.token;

function* getNovel({ payload: { novelId } }) {
  try {
    const { data } = yield call(getNovelApi, novelId);
    yield put(getNovelSuccess(data));
  } catch (error) {
    yield put(getNovelFailure(error.response.data));
  }
}

function* getGenres() {
  try {
    const { data } = yield call(getGenresApi);
    yield put(getGenresSuccess(data));
  } catch (error) {
    yield put(getGenresFailure(error.response.data));
  }
}

function* getNovels({ payload: { urlParam } }) {
  try {
    const { data } = yield call(getNovelsApi, urlParam);
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

function* updateNovel({ payload: { lightNovelId, novel } }) {
  try {
    const token = yield select(getToken);
    const { data } = yield call(updateNovelApi, token, lightNovelId, novel);
    yield put(updateNovelSuccess(data));
  } catch (error) {
    yield put(updateNovelFailure(error.response.data));
  }
}

function* onGetGenresStart() {
  yield takeLatest(NovelActionTypes.GET_GENRES_START, getGenres);
}

function* onGetNovelsStart() {
  yield takeLatest(NovelActionTypes.GET_NOVELS_START, getNovels);
}

function* onGetNovelStart() {
  yield takeLatest(NovelActionTypes.GET_NOVEL_START, getNovel);
}

function* onCreateNovelStart() {
  yield takeLatest(NovelActionTypes.CREATE_NOVEL_START, createNovel);
}

function* onUpdateNovelStart() {
  yield takeLatest(NovelActionTypes.UPDATE_NOVEL_START, updateNovel);
}

export function* novelSagas() {
  yield all([
    call(onGetGenresStart),
    call(onGetNovelsStart),
    call(onGetNovelStart),
    call(onCreateNovelStart),
    call(onUpdateNovelStart)
  ]);
}
