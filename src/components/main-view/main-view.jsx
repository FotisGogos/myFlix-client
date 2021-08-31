import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  constructor(){
    super();
    this.state = {
      movies: [
        {   _id: 1, Title: 'Inception',
            Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            ImagePath: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i'},
        {   _id: 2, Title: 'The Shawshank Redemption', 
            Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            ImagePath: 'https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i'},
        {   _id: 3, Title: 'The Matrix', 
            Description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
            ImagePath: 'https://en.wikipedia.org/wiki/File:The_Matrix_Poster.jpg'}
      ],
      selectedMovie: null
    };
  }
  render() {
    const { movies, selectedMovie } = this.state;
    //if (selectedMovie) return <MovieView movie = {selectedMovie} />;
    //if (movies.length === 0) return <div className = "main-view">The list is empty!</div>;
  
    return (
        <div className="main-view">
          {selectedMovie
            ? <MovieView movie = {selectedMovie} onBackClick = {newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            : movies.map(movie => (
              <MovieCard key = {movie._id} movie = {movie} onMovieClick = {(movie) => { this.setSelectedMovie(movie) }}/>
            ))
          }
        </div>
      );
    }}
