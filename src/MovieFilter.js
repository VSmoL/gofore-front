// client/src/App.js

import React from "react";
import "./App.css";

function MovieFilter({filterData, setfilterData}) {

  const [genreData, setGenreData] = React.useState(null);

  function handleFilterData(name, val){
    setfilterData({...filterData, [name]: val})
  }

  React.useEffect(() => {
    fetch("/genres")
      .then((res) => res.json())
      .then((data) => setGenreData(data.genres));
  }, []);

  return (
    <div className="App">
      <select name="genre" onChange={(event) => handleFilterData(event.target.name, event.target.value)}>
        <option value=""></option>
        {!genreData ? "Loading..." : genreData.map((genre, key) => {
          return (
            <option value={genre} key={key}>{genre}</option>
          );
        })}
      </select>
      <input name="rating" type="number" onChange={(event) => handleFilterData(event.target.name, event.target.value)}></input>
    </div>
  );
}

export default MovieFilter;