import { createSelector } from "reselect";

const selectNovel = state => state.novel;

export const selectGenres = createSelector(
  [selectNovel],
  novel => novel.genres
);

export const selectNovels = createSelector(
  [selectNovel],
  novel => novel.novels
);

export const selectLightNovel = createSelector(
  [selectNovel],
  novel => novel.novel
);

export const selectIsGenresLoading = createSelector(
  [selectNovel],
  novel => novel.isGenresLoading
);

export const selectIsNovelsLoading = createSelector(
  [selectNovel],
  novel => novel.isNovelsLoading
);

export const selectIsCreateNovelLoading = createSelector(
  [selectNovel],
  novel => novel.isCreateNovelLoading
);

export const selectIsCreateNovelSuccess = createSelector(
  [selectNovel],
  novel => novel.isCreateNovelSuccess
);

export const selectError = createSelector([selectNovel], novel => novel.error);
