import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function FoundationSearch({ onList }) {
  const onSearch = (e) => {
    e.preventDefault();
    const params = { search: e?.target?.search?.value };
    onList(null, params);
  };

  return (
    <Form onSubmit={onSearch} data-bs-theme="light">
      <InputGroup>
        <Form.Control name="search" placeholder="Search..." className="" />
        <Button type="submit">
          <FaSearch /> Search
        </Button>
      </InputGroup>
    </Form>
  );
}
