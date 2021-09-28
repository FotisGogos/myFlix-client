import React from 'react';
import "./movie-view.scss";
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
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
          <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}