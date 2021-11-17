import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

//  Bootstrap 
import "./main-view.scss";
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Components
import {ProfileView} from "../profile-view/profile-view"
import { LoginView } from '../login-view/login-view';
import { GenreView} from '../genre-view/genre-view';
import { NavBar } from '../navbar/navbar';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView }  from '../director-view/director-view';
import { Edit } from "../edit-view/edit";
import { RegistrationView } from "../registration-view/registration-view";
import MoviesList from '../movies-list/movies-list';

// #0
import { setMovies } from '../../actions/actions';

/* #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. */


// #2 export keyword removed from here
 class MainView extends React.Component {

  constructor(){
    super();
    // #3 All the states removed from here
    this.state = {
      user: null,
    };
  }
  
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
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

  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    }); 
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://moviexperts.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  getMovies(token) {
    axios.get('https://moviexperts.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('response', response )
      // #4
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

    // #5 movies,user is extracted from this.props rather than from the this.state
  render() {
    let { movies } = this.props
    const { user, username, email, password, birthday, favoriteMovies } = this.state;  
    return (
      <Container>
        <Router>
          {/* Main view */}
          <NavBar />
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
                console.log('login')
                
                 if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                
              if (movies.length === 0) return <div className="main-view">Loading....</div>  
              // #6
                return <MoviesList movies={movies}/>;
            }} />

            {/* Register view */}
            <Route exact path="/register" render={() => {
              if (user) return <Redirect to="/" />
              console.log('before register' );
              console.log('register' );
                return <Col>
                  <RegistrationView
                  />
                </Col>
              }} />

            {/* Director view */}
            <Route path="/directors/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
              </Col>
              }}  />

            {/* Path to Genre  (NAME) */}
            <Route path="/genres/:name" render={({ match, history }) => { 
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );

              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
              </Col>
              }}  />

            {/* Path to movie (TITLE) */}
            <Route path="/movies/:movieTitle" render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view">Loading....</div>
              return <Col md={8}>
                <MovieView movie={movies.find(m => m.title === match.params.movieTitle)} 
                onBackClick={() => history.goBack()}/>
              </Col>
            }} />

            {/* Path to Profile view  */}
            <Route  path="/profile" render={() => {
              if ( !user ) 
              return (
                <Col>
                  <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
              );
              if (movies.length === 0) return <div className="main-view" />;
              return (
              <>
              <Col>
                <ProfileView username={username} password={password} email={email} birthday={birthday} favoriteMovies={favoriteMovies} movies={movies} onBackClick={() => history.goBack()} removeMovie={(_id) => this.removeFromFavorites(_id)} />
              </Col>
              </>)
            }} /> 

            <Route exact path="/editProfile" render={({ history }) => {
                if (!user)
                  return 
                  <Col md={6}>
                      <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
                </Col>
                
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                    <Edit username={username} password={password} email={email} birthday={birthday} onBackClick={() => history.goBack()} />
                </Col>
            v}} />   
          </Row>
        </Router>
      </Container>
      );
    }}

    // #7
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #8
export default connect(mapStateToProps, { setMovies } )(MainView);
