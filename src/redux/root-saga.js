import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { novelSagas } from "./novel/novel.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(novelSagas)]);
}
