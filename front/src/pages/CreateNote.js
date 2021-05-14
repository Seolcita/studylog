import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoteForm from "../components/forms/NoteForm";
import { toast } from "react-toastify";
import { getSubjects } from "../connections/subject";
import { createNote } from "../connections/note";
import FileUpload from "../components/forms/FileUpload";

import { useSelector } from "react-redux";

const init = {
  title: "",
  note: "",
  subjects: [],
  images: [],
  subject: "",
};

const CreateNote = ({ history }) => {
  //state
  const [values, setValues] = useState(init);
  const [loading, setLoading] = useState(false);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = () => {
    getSubjects()
      .then((res) => {
        console.log("all subject in create note---->", res);
        setValues({ ...values, subjects: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createNote(values, user.token)
      .then((res) => {
        console.log("get created note from back ", res);
        toast.success(`"${res.data.title}" is created`);
        history.push("/");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name, " ----- ", e.target.value);
  };

  return (
    <div className="container mt-5">
      <h1>Create Form</h1>
      {/* {JSON.stringify(values)} */}
      <div className="mb-4">
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>
      <NoteForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
      />
    </div>
  );
};

export default CreateNote;
