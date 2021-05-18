import React from "react";

//text editor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const UpdateNoteForm = ({
  handleSubmit,
  handleChange,
  values,
  allSubjects,
  handleText,
  handleSubject,
  selectedSubject,
  originalSubject,
  subjectName,
}) => {
  //destructure
  const { title, note, reference, subject } = values;

  return (
    <div>
      {JSON.stringify(subject)}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-5">
          <label className="h4">Subject</label>
          <select
            name="subject"
            className="form-control"
            onChange={handleSubject}
            value={selectedSubject ? selectedSubject : originalSubject}
          >
            {allSubjects.length > 0 &&
              allSubjects
                // .filter((s) => s._id !== originalSubject)
                .map((s) => (
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
      {/* {JSON.stringify(subject)} */}
    </div>
  );
};

export default UpdateNoteForm;
