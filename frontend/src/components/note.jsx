import React from "react";
import "../assets/styles/note.css"

function Note(params) {
  return (
    <div className="note">
      <h2 className="title">{params.title}</h2>
      <p className="body">{params.content.length < 50 ? params.content : `${params.content.slice(0,50)}.....`}</p>
      <form encType="application/x-www-form-urlencoded">
        <button onClick={params.deleteNote} className="btn btn-deleteNote" value={params.id} >
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
      </form>
    </div>
  );
}

export default Note;
