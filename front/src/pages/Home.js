import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotes,
  removeNote,
  getNotesCount,
  fetchNotesByFilter,
} from "../connections/note";
import { getSubjects } from "../connections/subject";

// ant-design
import {
  EditOutlined,
  DeleteOutlined,
  DownSquareOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";
import { Menu, Checkbox } from "antd";
const { SubMenu } = Menu;

const Home = () => {
  //state
  const [notes, setNotes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [notesCount, setNotesCount] = useState(0);
  const [subjectIds, setSubjectIds] = useState([]); //for filter

  //redux
  let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  // search & filter by arguments
  const fetchNotes = (arg) => {
    fetchNotesByFilter(arg).then((res) => {
      console.log("fetched note ==> ", res.data);
      setNotes(res.data);
    });
  };

  const loadSubjects = () => {
    getSubjects().then((res) => {
      setSubjects(res.data);
    });
  };

  // load notes based on args
  // 1. load notes by default on page load
  useEffect(() => {
    loadNotes();
    loadSubjects();
  }, [page]);

  // 2. load notes based on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchNotes({ query: text });
      if (!text) {
        loadNotes();
      }
    }, 300);
    return () => {
      clearTimeout(delayed);
    };
  }, [text]);

  // 3. load notes based on subjects
  const handleCheck = (e) => {
    //reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    let inTheState = [...subjectIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setSubjectIds(inTheState);
    fetchNotes({ subject: inTheState });
  };

  //for pagination
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
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-2 pt-2 mt-5">
            {/* <h4 className="text-center"> Filter / Search</h4> */}
            <Menu defaultOpenKeys={["1"]} mode="inline">
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Subject Filters
                  </span>
                }
              >
                {subjects ? (
                  subjects.map((s) => (
                    <div key={s._id}>
                      <Checkbox
                        onChange={handleCheck}
                        className="pb-2 pl-4 "
                        value={s._id}
                        name="subject"
                        checked={subjectIds.includes(s._id)}
                      >
                        <h6>{s.name}</h6>
                      </Checkbox>
                    </div>
                  ))
                ) : (
                  <h1>"no"</h1>
                )}
              </SubMenu>
            </Menu>
          </div>

          <div className="col-9">
            {/* {JSON.stringify(notes)} */}
            <h2 className="text-center">Study Log List</h2>
            <table className="table table-hover mt-4">
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
                      <td width="50%">
                        <Link to={`/note/${n.slug}`}>{n.title}</Link>
                      </td>
                      <td width="20%">{n.subject.name}</td>
                      {user && user.role === "admin" ? null : (
                        <td width="20%" scope="col">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </td>
                      )}

                      {user && user.role === "admin" && (
                        <td width="10%">
                          <Link to={`/note/edit/${n.slug}`}>
                            <span className="btn btn-sm">
                              <EditOutlined />
                            </span>
                          </Link>
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
              <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                <Pagination
                  current={page}
                  total={(notesCount / 3) * 10}
                  onChange={(value) => setPage(value)}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
