import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import EditFileUpload from "../components/forms/EditFileUpload";
import EditNoteForm from "../components/forms/EditNoteForm";
import { getOneNote, updateNote } from "../connections/note";
import { getSubjects } from "../connections/subject";
import { toast } from "react-toastify";

//img-carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";

const EditNote = ({ match, history }) => {
  //state
  const [values, setValues] = useState({});
  const [allSubjects, setAllSubjects] = useState([]);
  const [originalSubject, setOriginalSubject] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  //destructure
  //const { title, note, subject, subjects, images } = values;

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  //match
  const { slug } = match.params;

  //useEffect
  useEffect(() => {
    loadOneNote();
    loadSubjects();
  }, []);

  const loadOneNote = () => {
    getOneNote(slug)
      .then((res) => {
        console.log("Got one note?", res);
        setValues(res.data);
        setOriginalSubject(res.data.subject._id);
        setSubjectName(res.data.subject._id);
        setImages(res.data.images);
        console.log("images======>", res.data.images);
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

    values.subject = selectedSubject ? selectedSubject : originalSubject;
    values.images = selectedSubject ? images : values.images;

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

  const handleText = (e, editor) => {
    const data = editor.getData();
    setValues({ ...values, note: data });
  };

  const handleSubject = (e) => {
    console.log("selected subject", e.target.value);
    setSelectedSubject(e.target.value);
  };

  return (
    <div className="container">
      <h1>Edit Note</h1>

      {JSON.stringify(values)}
      {JSON.stringify(images)}

      <div className="p-3">
        <EditFileUpload
          images={images}
          setImages={setImages}
          setLoading={setLoading}
        />
      </div>
      <div>
        <EditNoteForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          values={values}
          handleText={handleText}
          allSubjects={allSubjects}
          originalSubject={originalSubject}
          handleSubject={handleSubject}
          selectedSubject={selectedSubject}
          subjectName={subjectName}
        />
      </div>
    </div>
  );
};

export default EditNote;
