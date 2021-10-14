import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./movie-view.scss";
export class MovieView extends React.Component {

  constructor(props) {
    super(props);

    
  }

  addFavoriteMovie(_id) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.post(`https://moviexperts.herokuapp.com/users/${user}/favorites/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST'
    })
      .then(response => {
        alert(`Added to Favorites`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  render(){
    const { movie, onBackClick } = this.props ;
    console.log(movie, 'movieView');



    return(
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} crossOrigin="anonymous" />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          
          <Link to={`/genres/${movie.Genre.Name}`}>
            <span className="value">{movie.Genre.Name}</span>
          </Link>
          
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          
          <Link to={`/directors/${movie.Director.Name}`}>
            <span className="value">{movie.Director.Name}</span>
          </Link>
        </div>
        <Button variant='danger' className="fav-button" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>
          Add to Favorites
        </Button>
        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}