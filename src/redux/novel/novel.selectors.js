import { createSelector } from "reselect";

const selectNovel = state => state.novel;

export const selectGenres = createSelector(
  [selectNovel],
  novel => novel.genres
);

export const selectNovels = createSelector(
  [selectNovel],
  novel => novel.novels.lightNovels
);

export const selectTotalPages = createSelector(
  [selectNovel],
  novel => novel.novels.totalPages
);

export const selectLightNovel = createSelector(
  [selectNovel],
  novel => novel.novel
);

export const selectIsGenresLoading = createSelector(
  [selectNovel],
  novel => novel.isGenresLoading
);

export const selectIsNovelLoading = createSelector(
  [selectNovel],
  novel => novel.isNovelLoading
);

export const selectIsNovelsLoading = createSelector(
  [selectNovel],
  novel => novel.isNovelsLoading
);

export const selectAreInitialNovelsLoaded = createSelector(
  [selectNovel],
  novel => !!novel.novels.lightNovels.length
);

export const selectIsCrudNovelLoading = createSelector(
  [selectNovel],
  novel => novel.isCrudNovelLoading
);

export const selectIsCrudNovelSuccess = createSelector(
  [selectNovel],
  novel => novel.isCrudNovelSuccess
);

export const selectError = createSelector([selectNovel], novel => novel.error);
