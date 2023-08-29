import { getUser } from '../../../redux/usersRedux';
import { Card, Button } from 'react-bootstrap';
import { IMG_URL } from '../../../config';
import { useParams, Link } from 'react-router-dom';
import { getAdById } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';

const Ad = () => {
  const activeUser = useSelector(getUser);
  const { id } = useParams();
  const adById = useSelector((state) => getAdById(state, id));

  return (
    <Card style={{ width: '100%' }}>
      <Card.Img variant="top" src={`${IMG_URL}/${adById.image}`} />
      <Card.Body>
        <Card.Title>Title: {adById.title}</Card.Title>
        <Card.Text>
          <p>Loction: {adById.location}</p>
          <p>Description: {adById.text}</p>
          <p>Date: {adById.date}</p>
          <p>Price: {adById.price}</p>
          <p>User: {adById.user.login}</p>
          {activeUser !== null && activeUser._id === adById.user._id && (
            <Link to={'/ads/edit/' + adById._id}>
              <Button variant="primary">Edit</Button>
            </Link>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Ad;
