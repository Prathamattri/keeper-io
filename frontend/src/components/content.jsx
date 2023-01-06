import axios from "axios";
import React from "react";

import Note from "../components/note";
import "../assets/styles/content.css";

function Content() {
  const [notes, setNote] = React.useState([]);
  const [change, setChange] = React.useState(true);

  //Form management
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const getData = () => {
    axios.get("http://localhost:5000/").then((res) => {
      const notes = res.data;
      setNote(notes);
    });
  };

  React.useEffect(
    function () {
      getData();
    },
    [change]
  );

  ////////////////////////HANDLING NOTES/////////////////////////////////////////////
  const createNote = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/", {
        title: title,
        content: content,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
      
    setChange((prevState) => !prevState);
    toggleAddNoteWindow(e);
  };

  const deleteNote = async (e) => {
    e.preventDefault();
    const id = e.currentTarget.value;
    await axios
      .post("http://localhost:5000/note/delete", { id: id })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    setChange((prevState) => !prevState);
    
  };
  ///////////////////////////////////TO RENDER NOTES FROM KEEPER-API/////////////////////////////////////////////
  const Notes = notes.map((note) => (
    <Note
      deleteNote={deleteNote}
      key={note._id}
      id={note._id}
      title={note.title}
      content={note.content}
    />
  ));

  const toggleAddNoteWindow = (e) => {
    e.preventDefault();
    document.querySelector(".section--right").classList.toggle("open");
  };

  return (
    <div className="content">
      <div className="section--left">
        {Notes}
        <button onClick={toggleAddNoteWindow} className="btn btn-addNote">
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
      </div>

      <div className="section--right">
        <form encType="application/x-www-form-urlencoded">
          <button
            onClick={toggleAddNoteWindow}
            className="btn btn-deleteNote btn-close"
          >
            <ion-icon name="close"></ion-icon>
          </button>
          <h2 className="heading">Add a Note</h2>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="TITLE GOES HERE..."
          />
          <textarea
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            cols="30"
            rows="5"
            placeholder="CONTENT GOES HERE..."
          ></textarea>

          <button
            onClick={createNote}
            type="submit"
            className="btn btn-sv-note btn-signup"
          >
            SAVE NOTE
          </button>
        </form>
      </div>
    </div>
  );
}

export default Content;
