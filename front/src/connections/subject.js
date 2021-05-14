import axios from "axios";

//create new subject
export const createNewSubject = async (subject, authtoken) => {
  console.log(subject, authtoken);
  return await axios.post(
    `${process.env.REACT_APP_API}/create/subject`,
    subject,
    {
      headers: {
        authtoken,
      },
    }
  );
};

//get all subjects
export const getSubjects = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subjects`);
};

//get one specific subject
export const getSubject = async (slug) => {
  console.log("front slug-->", slug);
  return await axios.get(`${process.env.REACT_APP_API}/subject/${slug}`);
};

//remove subject
export const removeSubject = async (slug, authtoken) => {
  console.log(slug);
  return await axios.delete(`${process.env.REACT_APP_API}/subject/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

//update subject
export const updateSubject = async (slug, subject, authtoken) => {
  console.log("front slug to update", subject, slug, authtoken);
  return await axios.put(
    `${process.env.REACT_APP_API}/subject/${slug}`,
    subject,
    {
      headers: {
        authtoken,
      },
    }
  );
};
