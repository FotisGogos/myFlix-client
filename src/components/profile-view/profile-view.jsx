import React, { useState } from "react";
import axios from "axios";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
  }

  removeFavouriteMovie(_id) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    console.log(_id, "_id");
    axios
      .delete(
        `https://moviexperts.herokuapp.com/users/${user}/favorites/${_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Favorite was removed");
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteUser() {
    const answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      axios
        .delete(`https://moviexperts.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert(user + " has been deleted.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    const {
      movies,
      user,
      username,
      email,
      password,
      birthday,
      favoriteMovies,
    } = this.props;
    return (
      <Container>
        <Row className="mt-5">
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg"
          >
            <h6>Username: {username}</h6>
            <h6>Password: *******</h6>
            <p>Email: {email}</p>
            <p>Birthday: {birthday}</p>
          </Col>
        </Row>
        <Row>
          <Card.Body>
            {favoriteMovies && favoriteMovies.length === 0 && (
              <h5 className=" text-center">Your Favorites</h5>
            )}
            <Row className="favorites-movies ">
              {favoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (
                    movie._id ===
                    favoriteMovies.find((fav) => fav === movie._id)
                  ) {
                    return (
                      <Col lg={4} key={movie._id}>
                        <Card className="favorites-item card-content">
                          <Card.Img
                            className="movieCard"
                            variant="top"
                            src={movie.ImagePath}
                            crossOrigin="anonymous"
                          />
                          <Card.Body>
                            <Card.Title className="movie-card-title">
                              {movie.title}
                            </Card.Title>
                            <Button
                              size="sm"
                              className="profile-button remove-favorite"
                              variant="outline-danger"
                              value={movies.title}
                              onClick={() =>
                                this.removeFavouriteMovie(movie._id)
                              }
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  }
                })}
            </Row>
          </Card.Body>
        </Row>
        <Row>
          <Col className="acc-btns mt-5 text-center">
            <Button
              size="md"
              variant="outline-danger"
              type="submit"
              ml="4"
              onClick={() => this.deleteUser()}
            >
              Delete Account
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
