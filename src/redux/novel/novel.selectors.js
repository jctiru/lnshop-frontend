import { createSelector } from "reselect";

const selectNovel = state => state.novel;

export const selectIsGenresLoading = createSelector(
  [selectNovel],
  novel => novel.isGenresLoading
);

export const selectIsCreateNovelLoading = createSelector(
  [selectNovel],
  novel => novel.isCreateNovelLoading
);

export const selectIsCreateNovelSuccess = createSelector(
  [selectNovel],
  novel => novel.isCreateNovelSuccess
);

export const selectGenres = createSelector(
  [selectNovel],
  novel => novel.genres
);

export const selectLightNovel = createSelector(
  [selectNovel],
  novel => novel.novel
);

export const selectError = createSelector([selectNovel], novel => novel.error);
