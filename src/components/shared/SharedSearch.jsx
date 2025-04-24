import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function SharedSearch({ onGets, onSuccess }) {
  const onSearch = (e) => {
    e.preventDefault();
    const params = { search: e?.target?.search?.value };
    onGets(null, params);
    onSuccess && onSuccess(params);
  };

  return (
    <Form onSubmit={onSearch} className="w-100">
      <InputGroup>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control name="search" />
        <Button variant="outline-secondary">Search</Button>
      </InputGroup>
    </Form>
  );
}
