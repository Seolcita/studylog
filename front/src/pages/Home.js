import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getNotes, removeNote, getNotesCount } from "../connections/note";

// ant-design
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Pagination } from "antd";

const Home = () => {
  //state
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [notesCount, setNotesCount] = useState(0);

  //redux
  const { user } = useSelector((state) => ({ ...state }));

  //useEffect
  useEffect(() => {
    loadNotes();
  }, [page]);

  useEffect(() => {
    getNotesCount()
      .then((res) => {
        console.log("how many notes in db?", res.data);
        setNotesCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const loadNotes = () => {
    setLoading(true);
    getNotes("createdAt", "desc", page)
      .then((res) => {
        console.log("got all notes from back ===>", res);
        setLoading(false);
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
    removeNote(slug, user.token)
      .then((res) => {
        console.log("deleted note title", res.data.title);
        toast.success(`"${res.data.title}" is deleted`);
        loadNotes();
      })
      .catch((err) => {
        console.log("delete note err", err);
        toast.error("fail to delete the note");
      });
  };

  return (
    <>
      <div className="container mt-5">
        <h1>Study Log</h1>

        {/* {JSON.stringify(notes)} */}
        <table className="table table-hover mt-5">
          <thead>
            <tr>
              <th width="10%" scope="col">
                #
              </th>
              <th width="50%" scope="col">
                Title
              </th>
              <th width="20%" scope="col">
                Category
              </th>
              {/* regular users see note create date */}
              {user && user.role === "admin" ? null : (
                <th width="20%" scope="col">
                  Created At
                </th>
              )}
              {/* only admin can edit and delete notes */}
              {user && user.role === "admin" && (
                <th width="10%" scope="col">
                  Edit
                </th>
              )}
              {user && user.role === "admin" && (
                <th width="10%" scope="col">
                  Delete
                </th>
              )}
            </tr>
          </thead>
          {notes.length > 0 &&
            notes.map((n, i) => (
              <tbody className="table table-hover" key={i}>
                <tr>
                  <td width="10%">{i + 1}</td>
                  <td width="50%">{n.title}</td>
                  <td width="20%">{n.subject.name}</td>
                  {user && user.role === "admin" ? null : (
                    <td width="20%" scope="col">
                      {new Date(n.subject.createdAt).toLocaleDateString()}
                    </td>
                  )}
                  {user && user.role === "admin" && (
                    <td width="10%">
                      <span className="btn btn-sm">
                        <EditOutlined />
                      </span>
                    </td>
                  )}

                  {user && user.role === "admin" && (
                    <td width="10%">
                      <span
                        className="btn btn-sm"
                        onClick={() => handleRemove(n.slug)}
                      >
                        <DeleteOutlined />
                      </span>
                    </td>
                  )}
                </tr>
              </tbody>
            ))}
        </table>
        <div className="row">
          {/* {JSON.stringify(notesCount)} */}

          <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
            <Pagination
              current={page}
              total={(notesCount / 3) * 10}
              onChange={(value) => setPage(value)}
            />
          </nav>
        </div>
      </div>
    </>
  );
};

export default Home;
