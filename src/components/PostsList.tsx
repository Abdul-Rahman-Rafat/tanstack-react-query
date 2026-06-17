import { Link } from "react-router-dom";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useGetPosts from "../hooks/useGetPosts";
import { DataItem, postStatusType } from "../Types";
import useSearch from "../hooks/useSearch";
import useUpdateRate from "../hooks/useUpdateRate";
import { useState } from "react";

//prefetch
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getposts } from "../hooks/useGetPosts";

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


  const updateRate = useUpdateRate();
  //prefetch should be before isLoading to prevent this error  " Rendered more hooks than during the previous render."
  const queryClient = useQueryClient();
  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage > 3) return; // work until page 3 only
    queryClient.prefetchQuery({
      queryKey: ["posts", { filterstatus: "all", paginate: nextPage }], // bring the queryKey  from useQuery or the tanStack devtool
      queryFn: () => getposts(filterstatus, nextPage),
    });
  }, [paginate, queryClient]);

  // console.log("searchData", searchData.data);

  console.log("f,d", filterstatus, data?.data);

  if (isLoading || searchData.isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (searchData.error) {
    return <div>Error: {searchData.error.message}</div>;
  }
  function handleTopRateChange(id: number, topRate: boolean) {
    console.log("id : ", id, "topRate : ", topRate);
    updateRate.mutate({post_id: id , rateValue: topRate , pageNumber: paginate});
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
            data?.data?.map((post: DataItem) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>
                  <Link to={`/info?id=${post.id}&type=paginate&key=${paginate}`}>{post.title}</Link>
                </td>
                <td>{post.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={post.topRate}
                    onChange={() => handleTopRateChange(post.id, !post.topRate)}
                    disabled={filterstatus !== "all" || searchquery.length > 0}
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
                  <Link to={`/info?id=${post.id}&type=search&key=${searchquery}`}>{post.title}</Link>
                </td>
                <td>{post.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={post.topRate}
                    onChange={() => handleTopRateChange(post.id, !post.topRate)}
                    disabled={filterstatus !== "all" || searchquery.length > 0}
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
