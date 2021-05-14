import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createNewSubject,
  getSubjects,
  removeSubject,
} from "../connections/subject";
import { toast } from "react-toastify";

// ant-design
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ManageSubject = () => {
  //useStates
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);

  //react-redux
  const { user } = useSelector((state) => ({ ...state }));

  //useEffect
  useEffect(() => {
    loadAllSubjects();
  }, []);

  const loadAllSubjects = () => {
    getSubjects().then((s) => {
      // console.log("all s-->", s);
      setSubjects(s.data);
    });
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createNewSubject({ name }, user.token)
      .then((res) => {
        console.log("response->>>>>>", res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadAllSubjects();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data);
      });
  };

  const handleRemove = (subjectSlug) => {
    console.log("clicked");
    removeSubject(subjectSlug, user.token)
      .then((res) => {
        console.log("Subject name deleted? --->", res);
        setLoading(false);
        toast.success(`${res.data.name} is successfully deleted!`);
        loadAllSubjects();
      })
      .catch((err) => {
        console.log("Error in deleting subject name --->", err);
        setLoading(false);
        toast.error(`Error deleting "${name}" subject`);
      });
  };

  return (
    <div className="container mt-5">
      <div>
        <h2>Create Subject</h2>
      </div>
      <form>
        <input className="form-control" value={name} onChange={handleChange} />
        <button className="btn btn-outline-primary mt-2" onClick={handleSubmit}>
          Save
        </button>
        <br />
        {/* {JSON.stringify(name)} // check whether subject name stored in name state */}
        <br />
        <div className="mt-5">
          <h2>Managing Subjects</h2>
        </div>
        {/*{JSON.stringify(subjects)} // check whether subject object is retrieved from DB */}
        {subjects.map((s) => (
          <div className="alert alert-secondary" key={s._id}>
            {s.name}
            <span
              onClick={() => handleRemove(s.slug)}
              className="btn btn-sm float-right"
            >
              <DeleteOutlined />
            </span>
            <Link to={`/edit/subject/${s.name}`}>
              <span className="btn btn-sm float-right">
                <EditOutlined />
              </span>
            </Link>
          </div>
        ))}
      </form>
    </div>
  );
};

export default ManageSubject;
