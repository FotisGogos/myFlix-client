import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from "../registration-view/registration-view";
import "./main-view.scss";
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export class MainView extends React.Component {

  

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user',authData.user.Username);
    this.getMovies(authData.token);

  }

  

  onRegistration(register) {
    console.log(register);
    this.setState({
      register,
    });
  }

  getMovies(token) {
    axios.get('https://moviexperts.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('response', response )
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const { movies, selectedMovie, user  } = this.state;
    
    //if (!register)return (<RegistrationView onRegistration={register => this.onRegistration(register)}  />);  
    //if (selectedMovie) return <MovieView movie = {selectedMovie} />;
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    

    if (movies.length === 0) return <div className="main-view">Loading....</div>  
  
    return (
      <Container>
        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView  movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col md={4}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            ))
          }
      </Row>
      </Container>
      );
    }}
