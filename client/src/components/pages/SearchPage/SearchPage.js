import { Card, Button } from 'react-bootstrap';
import { IMG_URL } from '../../../config';
import { useParams, Link } from 'react-router-dom';
import { getAdBySearch } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';

const SearchPage = () => {
  const activeUser = useSelector(getUser);
  const { searchPhrase } = useParams();
  const getBySearch = useSelector((state) =>
    getAdBySearch(state, searchPhrase)
  );

  console.log(getBySearch);
  return (
    <section>
      {getBySearch.map((ad) => (
        <Card style={{ width: '100%' }}>
          <Card.Img variant="top" src={`${IMG_URL}/${ad.image}`} />
          <Card.Body>
            <Card.Title>Title: {ad.title}</Card.Title>
            <Card.Text>
              <p>Loction: {ad.location}</p>
              <p>Description: {ad.text}</p>
              <p>Date: {ad.date}</p>
              <p>Price: {ad.price}</p>
              <p>User: {ad.user.login}</p>
              {activeUser !== null && activeUser._id === ad.user._id && (
                <Link to={'/ads/edit/' + ad._id}>
                  <Button variant="primary">Edit</Button>
                </Link>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
  console.log(getBySearch);
};

export default SearchPage;
