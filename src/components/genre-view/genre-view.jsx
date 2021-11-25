import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";

export function GenreView(props) {
  const { genre } = props;

  return (
    <Container className="genre-container">
      <Card>
        <Card.Header>
          <span className="value">{genre.Name}</span>
        </Card.Header>

        <Card.Header>
          <span className="value">{genre.Description}</span>
        </Card.Header>
        <Link to={`/`}>
          <Button className="returnButton" variant="outline-secondary">
            Return to Movie List
          </Button>
        </Link>
      </Card>
    </Container>
  );
}
