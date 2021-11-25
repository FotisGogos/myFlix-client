import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";

export function DirectorView(props) {
  const { director } = props;

  return (
    <Container className=" director-container">
      <Card>
        <Card.Header>
          <span className="value">{director.Name}</span>
        </Card.Header>
        <Card.Header>
          <span className="label">Biography: </span>
          <Card.Text>
            <span className="value">{director.Bio}</span>
          </Card.Text>
        </Card.Header>
        <Card.Header>
          <span className="label">Year of Birth: </span>
          <Card.Text>
            <span className="value">{director.Born}</span>
          </Card.Text>
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
