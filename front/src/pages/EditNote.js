import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FileUpload from "../components/forms/FileUpload";
import EditNoteForm from "../components/forms/EditNoteForm";
import { getOneNote, updateNote } from "../connections/note";
import { getSubjects } from "../connections/subject";
import { toast } from "react-toastify";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const init = {
  title: "",
  note: "",
  images: [],
  subject: "",
};

const EditNote = ({ match, history }) => {
  //state
  const [values, setValues] = useState(init);
  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  //destructure
  const { title, note, subject, subjects, images } = values;

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  //match
  const { slug } = match.params;

  //useEffect
  useEffect(() => {
    loadOneNote();
    loadSubjects();
  }, []);

  // useEffect(() => {
  //   loadSubjects();
  // }, []);

  const loadOneNote = () => {
    getOneNote(slug)
      .then((res) => {
        console.log("Got one note?", res.data);
        setValues(res.data);
        // toast.success("Note is successfully updated");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Fail to update the note");
      });
  };

  const loadSubjects = () => {
    getSubjects()
      .then((res) => {
        console.log("all subject in create note---->", res);
        setAllSubjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateNote(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        toast.success("Note is successfully updated");
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Fail to update the note");
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Edit Note</h1>
      {/* {JSON.stringify(oneNote)} */}

      <div className="p-3">
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>
      <div>
        <EditNoteForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          allSubjects={allSubjects}
        />
      </div>
      {/* {allSubjects ? allSubjects.map((s) => <p key={s._id}>{s.name}</p>) : "no"} */}
      {/* {JSON.stringify(values.subjects)} */}

      {/* <div>
        <label className="form-group"> Title </label>
        <p className="form-control mb-4"> {title}</p>
        <label className="form-group"> Subject </label>
        {values ? (
          <p className="form-control mb-4">{values.subject.name}</p>
        ) : (
          <h1>"no subject"</h1>
        )}
        <label className="form-group"> Note </label>
        <p className="form-control mb-4">{note}</p>
      </div> */}
    </div>
  );
};

export default EditNote;
