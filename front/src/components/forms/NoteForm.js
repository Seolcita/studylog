import React from "react";

//css
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NoteForm = ({ handleSubmit, handleChange, values }) => {
  //destructure
  const { title, note, subjects } = values;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-5">
          <label className="h4">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-5">
          <label className="h4">Note</label>
          <textarea
            type="text"
            name="note"
            className="form-control"
            value={note}
            onChange={handleChange}
            rows="10"
          />
        </div>

        <div className="form-group mb-5">
          <label className="h4">Subject</label>
          <select
            name="subject"
            className="form-control"
            onChange={handleChange}
          >
            <option>- Please select -</option>
            {subjects.length > 0 &&
              subjects.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
        <button className="btn btn-outline-info">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
