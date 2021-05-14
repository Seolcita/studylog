import axios from "axios";

export const createNote = async (note, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/note`, note, {
    headers: {
      authtoken,
    },
  });
};

export const getNotes = async (sort, order, page) => {
  return await axios.post(`${process.env.REACT_APP_API}/notes`, {
    sort,
    order,
    page,
  });
};

export const removeNote = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/note/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getNotesCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/notes/total`);
};
