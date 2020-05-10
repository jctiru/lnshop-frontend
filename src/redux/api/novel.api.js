import axios from "axios";
import config from "../config";

export const getGenresApi = () => {
  return axios({
    url: `${config.apiUrl}/lightnovels/genres`,
    method: "get",
  });
};

export const getNovelsApi = (urlParams) => {
  return axios({
    url: `${config.apiUrl}/lightnovels${urlParams ? urlParams : ""}`,
    method: "get",
  });
};

export const getNovelApi = (novelId) => {
  return axios({
    url: `${config.apiUrl}/lightnovels/${novelId}`,
    method: "get",
  });
};

export const createNovelApi = (token, novel) => {
  return axios({
    url: `${config.apiUrl}/lightnovels`,
    method: "post",
    data: novel,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateNovelApi = (token, lightNovelId, novel) => {
  return axios({
    url: `${config.apiUrl}/lightnovels/${lightNovelId}`,
    method: "put",
    data: novel,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteNovelApi = (token, lightNovelId) => {
  return axios({
    url: `${config.apiUrl}/lightnovels/${lightNovelId}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
