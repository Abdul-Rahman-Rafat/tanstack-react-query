import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useGetPosts from "../hooks/useGetPosts";
import { DataItem, postStatusType } from "../Types";
import useSearch from "../hooks/useSearch";
import { useState } from "react";

interface filterPropspostlist {
  filterstatus: postStatusType;
  searchquery: string;
}

export default function PostsList({
  filterstatus,
  searchquery,
}: filterPropspostlist) {
  const [paginate, setPaginate] = useState(1);
  const { data, isLoading, error } = useGetPosts(filterstatus, paginate); // descrturing
  const searchData = useSearch(searchquery); // without descrturing

  console.log(data?.data);

  if (isLoading || searchData.isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (searchData.error) {
    return <div>Error: {searchData.error.message}</div>;
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchquery.length === 0 &&
            data?.data.map((post: DataItem) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <Link to="/info">{post.title}</Link>
                </td>
                <td>{post.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}

          {searchquery.length > 0 &&
            searchData.data?.map((post: DataItem) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <Link to="/info">{post.title}</Link>
                </td>
                <td>{post.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {searchquery.length === 0 && filterstatus === "all" ? (
        <ButtonGroup>
          <button onClick={() => setPaginate(1)}>1</button>
          <button onClick={() => setPaginate(2)}>2</button>
          <button onClick={() => setPaginate(3)}>3</button>
        </ButtonGroup>
      ) : (
        ""
      )}
    </>
  );
}
