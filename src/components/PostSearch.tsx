import { Form } from "react-bootstrap";
import React from "react";
import { useState } from "react";

interface PostSearchProps {
  setSearchquery: (value: string) => void;
}

export default function PostSearch({ setSearchquery }: PostSearchProps) {
  const [query, setQuery] = useState("");
  function querySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchquery(query);
  }
  return (
    <div className="mb-3">
      <h5>Search</h5>
      <form onSubmit={querySubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></Form.Control>
        </Form.Group>
      </form>
    </div>
  );
}
