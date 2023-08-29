import { useSelector } from 'react-redux';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
const Search = () => {
  let defaultSearch = useSelector((state) => state.search);
  const [search, setSearch] = useState(defaultSearch);

  return (
    <Form className="my-4">
      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Search Ad</Form.Label>
        <Form.Control
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter title"
        />
      </Form.Group>
      <Link to={`/search/` + search}>
        <Button type="submit">Search</Button>
      </Link>
    </Form>
  );
};

export default Search;
