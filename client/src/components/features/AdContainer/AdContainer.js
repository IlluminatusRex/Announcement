import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { IMG_URL } from '../../../config';

const AdContainer = ({ _id, title, image, location }) => {
  return (
    <Card style={{ width: '33%' }}>
      <Card.Img variant="top" src={`${IMG_URL}/${image}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{location}</Card.Text>
        <Link to={'/ads/' + _id}>
          <Button variant="primary">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default AdContainer;
