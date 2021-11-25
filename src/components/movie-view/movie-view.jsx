import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./movie-view.scss";
import { Container, Button, Row, Col, Card } from "react-bootstrap";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
  }

  addFavoriteMovie(_id) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .post(
        `https://moviexperts.herokuapp.com/users/${user}/favorites/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
        }
      )
      .then((response) => {
        alert(`Added to Favorites`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    console.log(movie, "movieView");

    return (
      <Container>
        <Row className="movie-view">
          <Col className="movie-poster" sm={7} text-white>
            <img src={movie.ImagePath} crossOrigin="anonymous" />
          </Col>
          <Card className="text-center">
            <Card.Header className="card-description">
              <Button
                variant="outline-warning"
                className="fav-button"
                value={movie._id}
                onClick={(e) => this.addFavoriteMovie(e, movie)}
              >
                Add to Favorites
              </Button>
              <h5 className="movie-description">Movie description</h5>
            </Card.Header>
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>Description: </Card.Text>
              <div className="value">{movie.Description}</div>

              <Card.Text>
                <span className="label-genre">Genre: </span>
              </Card.Text>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <span className="value">{movie.Genre.Name}</span>
              </Link>

              <Card.Text>
                <span className="label-director">Director: </span>
              </Card.Text>
              <Link to={`/directors/${movie.Director.Name}`}>
                <span className="value">{movie.Director.Name}</span>
              </Link>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    );
  }
}
