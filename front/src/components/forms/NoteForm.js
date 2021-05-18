import React from "react";

//text editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//css
import "react-quill/dist/quill.snow.css";

const NoteForm = ({ handleSubmit, handleChange, values, handleText }) => {
  //destructure
  const { title, note, subjects, reference } = values;

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          {/* <textarea
            type="text"
            name="note"
            className="form-control"
            value={note}
            onChange={handleChange}
            rows="10"
          /> */}
          <CKEditor editor={ClassicEditor} data={note} onChange={handleText} />
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
    </div>
  );
};

export default NoteForm;
