import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getSubject, updateSubject } from "../connections/subject";

const EditSubject = ({ match, history }) => {
  //state
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadSubject();
  }, []);

  const loadSubject = () => {
    setLoading(true);
    getSubject(match.params.slug)
      .then((res) => {
        console.log("subject Name ----->", res);
        setSubject(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
        toast.error(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSubject(match.params.slug, { subject }, user.token)
      .then((res) => {
        console.log("updated? ==>", res);
        toast.success(`"${res.data.name}" is updated`);
        history.push("/manage/subjects");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Edit Subject</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          autoFocus
          required
        />
        <button className="btn btn-sm btn-outline-primary mt-2">Save</button>
      </form>
      {/* {JSON.stringify(subject)} */}
    </div>
  );
};

export default EditSubject;
