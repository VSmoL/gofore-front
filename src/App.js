// client/src/App.js

import React from "react";
import MovieList from './MovieList';
import NewMovie from './NewMovie';
import "./App.css";
import MovieFilter from "./MovieFilter";

function App() {
  const [movieData, setMovieData] = React.useState(null);
  const [filterData, setfilterData] = React.useState({genre: "", rating: ""});

  function getMovies(){
    let params = [];

    if(filterData.genre){
      params.push("genre="+filterData.genre)
    }
    if(filterData.rating){
      params.push("rating="+filterData.rating)
    }
    fetch("/movies?"+params.join("&"))
      .then((res) => res.json())
      .then((data) => setMovieData(data.movies));
  }
  React.useEffect(() => {
    getMovies();
  }, [filterData]);

  return (
    <div className="App">
      <MovieFilter filterData={filterData} setfilterData={setfilterData}/>
      <MovieList movieData={movieData}/>
      <NewMovie /> 
    </div>
  );
}

export default App;