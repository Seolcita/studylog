import React, { useState, useEffect } from "react";
import { getOneNote } from "../connections/note";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DetailNote = ({ match }) => {
  //states
  const [oneNote, setOneNote] = useState({});
  const [loading, setLoading] = useState(false);

  //destructure
  const { title, note, subject, images, reference } = oneNote;

  //match
  const { slug } = match.params;

  //useEffect
  useEffect(() => {
    loadOneNote();
  }, []);

  const loadOneNote = () => {
    getOneNote(slug)
      .then((res) => {
        console.log("get One Note", res.data);
        setOneNote(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("fail to fetch the note");
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5">Detail Note</h1>
      <div>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <p>No images</p>
        )}
      </div>

      {/* {JSON.stringify(oneNote)}
      {JSON.stringify(subject)} */}

      <div>
        <label className="form-group"> Subject </label>
        {subject ? (
          <p className="form-control mb-4">{subject.name}</p>
        ) : (
          <h1>"no subject"</h1>
        )}
        <label className="form-group"> Title </label>
        <p className="form-control mb-4"> {title}</p>

        <label className="form-group"> Note </label>
        <p className="form-control mb-4">{note}</p>
        <label className="form-group"> Reference </label>
        <p className="form-control mb-4">
          {reference ? (
            <a href={reference} target="_blank">
              {reference}
            </a>
          ) : (
            "No reference"
          )}
        </p>
      </div>
    </div>
  );
};

export default DetailNote;
