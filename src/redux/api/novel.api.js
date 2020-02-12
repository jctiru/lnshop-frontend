import axios from "axios";

export const getGenresApi = () => {
  return axios({
    url: "/lightnovels/genres",
    method: "get"
  });
};

export const getNovelsApi = urlParams => {
  return axios({
    url: `/lightnovels${urlParams ? urlParams : ""}`,
    method: "get"
  });
};

export const getNovelApi = novelId => {
  return axios({
    url: `/lightnovels/${novelId}`,
    method: "get"
  });
};

export const createNovelApi = (token, novel) => {
  return axios({
    url: "/lightnovels",
    method: "post",
    data: novel,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  });
};
