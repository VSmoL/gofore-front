// client/src/App.js

import React, { useState } from "react";
import "./App.css";

function NewMovie() {

    const [formData, setFormData] = useState({ name: "", year : "", genres: [], ageLimit: "", rating: "", actors: [], director: {}, synopsis: "" });
    const [genreList, setGenreList] = useState([{ genre: "" }]);
    const [actorList, setActorList] = useState([{ firstName: "", lastName: "" }]);
    const [director, setDirector] = useState({ firstName: "", lastName: "" });

    function handleMovieSubmit(event){
        fetch('/add-movie', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            // We convert the React state to JSON and send it as the POST body
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
        })
        
        event.preventDefault();
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleDirectorChange = (e) => {
        const { name, value } = e.target;
        director[name] = value
        setDirector(director);
        setFormData({
            ...formData,
            director: director
        });
    };
 
    const handleActorListChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...actorList];
        list[index][name] = value;
        setActorList(list);
        setFormData({
            ...formData,
            actors: list
        });
    };

    // handle click event of the Add button
    const handleAddActorClick = () => {
        setActorList([...actorList, { firstName: "", lastName: "" }]);
    };

    // handle click event of the Remove button
    const handleRemoveActorClick = index => {
        const list = [...actorList];
        list.splice(index, 1);
        setActorList(list);
    };

    const handleGenreListChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...genreList];
        list[index] = value;
        setGenreList(list);
        setFormData({
            ...formData,
            genres: list
        });
    };
 
    // handle click event of the Add button
    const handleAddGenreClick = () => {
        setGenreList([...genreList, {}]);
    };

    // handle click event of the Remove button
    const handleRemoveGenreClick = index => {
        const list = [...genreList];
        list.splice(index, 1);
        setGenreList(list);
    };

  return (
    <div className="newMovie">
        <form onSubmit={handleMovieSubmit}>
            <div className="inputList">
                <div className="newMovieName">
                    <div>Name</div>
                    <input id="newMovieName" name="name" type="text" onChange={handleChange}></input>
                </div>
                <div className="newMovieYear">
                    <div>Year</div>
                    <input id="newMovieYear" name="year" type="number" onChange={handleChange}></input>
                </div>
                <div className="newMovieGenres">
                    <div>Genres</div>
                    {genreList.map((x, i) => {
                        return(
                            <div key={i}>
                                <input type="text"
                                name="genre" 
                                value={x.genre}
                                onChange={e => handleGenreListChange(e, i)}></input>
                                {genreList.length !== 1 && <button
                                    onClick={() => handleRemoveGenreClick(i)}>
                                    Remove
                                </button>}
                            </div>
                        )
                    })}
                    <button type="button" onClick={() => handleAddGenreClick()}>Lisää genre</button>
                </div>
                <div className="newMovieAgeLimit">
                    <div>Age limit</div>
                    <input id="newMovieAgeLimit" name="ageLimit" type="number" onChange={handleChange}></input>
                </div>
                <div className="newMovieRating">
                    <div>Rating</div>
                    <input id="newMovieRating" name="rating" type="number" onChange={handleChange}></input>
                </div>
                <div className="newMovieActors">
                    <div>Actors</div>
                    {actorList.map((x, i) => {
                        return(
                            <div key={i}>
                                <input type="text" name="firstName" value={x.firstName}
                                onChange={e => handleActorListChange(e, i)}></input>
                                <input type="text" name="lastName" value={x.lastName}
                                onChange={e => handleActorListChange(e, i)}></input>
                                {actorList.length !== 1 && <button
                                    onClick={() => handleRemoveActorClick(i)}>
                                    Remove
                                </button>}
                            </div>
                        )
                    })}
                    <button type="button" onClick={() => handleAddActorClick()}>Lisää näyttelijä</button>
                </div>
                <div className="newMovieDirector">
                    <div>Director</div>
                    <input name="firstName" type="text" onChange={handleDirectorChange}></input>
                    <input name="lastName" type="text" onChange={handleDirectorChange}></input>
                </div>
                <div className="newMovieSynopsis">
                    <div>Synopsis</div>
                    <input id="newMovieSynopsis" name="synopsis" type="text" onChange={handleChange}></input>
                </div>
            </div>
            <button className="button submit" type="submit">Lisää leffa</button>
        </form>
    </div>
  );
}

export default NewMovie;