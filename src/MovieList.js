// client/src/App.js

import React from "react";
import "./App.css";

function MovieList(props) {

  const movieData = props.movieData

  return (
    <div className="movieList">
      <div className="movieRow">
        <div>Name</div>
        <div>Year</div>
        <div>Genres</div>
        <div>Age limit</div>
        <div>Rating</div>
        <div>Actors</div>
        <div>Director</div>
        <div>Synopsis</div>
      </div>
      <div className="movieScroll">
        {!movieData ? "Loading..." : movieData.map((movie, key) => {
          return (
            <div key={key} className="movieRow">
              <div>{movie.name}</div>
              <div>{movie.year}</div>
              <div>{movie.genres.join("\r\n")}</div>
              <div>{movie.ageLimit}</div>
              <div>{movie.rating}</div>
              <div>{movie.actors.map(actor => actor.firstName + " " + actor.lastName).join("\n")}</div>
              <div>{movie.director.firstName + " " + movie.director.lastName}</div>
              <div>{movie.synopsis}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieList;