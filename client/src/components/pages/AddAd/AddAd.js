import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import { addAdRequest } from '../../../redux/adsRedux';
import Spinner from 'react-bootstrap/Spinner';

const AddAd = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);

  const activeUser = useSelector(getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser === null) return navigate('/');
  }, [activeUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append('title', title);
    fd.append('text', text);
    fd.append('date', date);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('image', image);

    const options = {
      method: 'POST',
      body: fd,
    };

    console.log(fd);
    setStatus('loading');
    fetch(`${API_URL}/api/ads`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(addAdRequest(fd));
          setTimeout(() => {
            return navigate('/');
          }, 2000);
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };
  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className="my-4">Add an advert</h1>

      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have successfully added your advert.</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Login or password are incorrect</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formText">
        <Form.Label>Text</Form.Label>
        <Form.Control
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="avatar">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddAd;
