import React from "react";

//css
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateNoteForm = ({
  handleSubmit,
  handleChange,
  values,
  allSubjects,
}) => {
  //destructure
  const { title, note, reference } = values;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-5">
          <label className="h4">Subject</label>
          <select
            name="subject"
            className="form-control"
            onChange={handleChange}
            value={values.subject._id}
          >
            {values ? (
              <option value={values.subject._id}>{values.subject.name}</option>
            ) : (
              <option>"no subject"</option>
            )}

            {allSubjects.length > 0 &&
              allSubjects
                .filter((s) => s._id !== values.subject._id)
                .map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                  // setSelectedSubject()
                ))}
          </select>
        </div>

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
          <label className="h4">Reference</label>
          <input
            type="text"
            name="reference"
            className="form-control"
            value={reference}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-outline-info">Save</button>
      </form>
      {/* {JSON.stringify(subject)} */}
    </div>
  );
};

export default UpdateNoteForm;
