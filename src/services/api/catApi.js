import { GET } from "../http";

export const catApi = {
  getSearchImageCat: (params) => {
    return GET({
      path: "/images/search",
      params,
    });
  },
  getInfoBreeds: (id) => {
    return GET({
      path: `/breeds/${id}`,
    });
  },
  getImagesCat: (id) => {
    return GET({
      path: `/images/${id}`,
    });
  },
  getImagesBreeds: (id) => {
    return GET({
      path: `/images/${id}/breeds`,
    });
  },
};
