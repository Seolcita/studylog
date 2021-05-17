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

export const getOneNote = async (slug) => {
  console.log("did I get slug from front?", slug);
  return await axios.get(`${process.env.REACT_APP_API}/note/${slug}`);
};

export const updateNote = async (slug, values, authtoken) => {
  console.log("values", values);

  return await axios.put(`${process.env.REACT_APP_API}/note/${slug}`, values, {
    headers: {
      authtoken,
    },
  });
};

export const fetchNotesByFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};
