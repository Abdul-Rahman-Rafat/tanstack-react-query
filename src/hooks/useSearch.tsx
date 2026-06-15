import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { DataItem } from "../Types";

const getposts = async (q: string): Promise<DataItem[]> => {
  const response = await axios.get<DataItem[]>(
    `http://localhost:3000/posts?title:contains=${encodeURIComponent(q)}`,
  );
  console.log(response.data);
  return response.data;
};

const useSearch = (q: string): UseQueryResult<DataItem[]> => {
  //useQuery is a hook provided by react-query to fetch data and manage the state of the request.
  //  It takes an object as an argument with two properties: queryKey and queryFn.
  //  queryKey is a unique identifier for the query,
  //  and queryFn is a function that returns a promise which resolves to the data we want to fetch.
  const query = useQuery({
    queryKey: ["posts", { q }],
    queryFn: () => getposts(q),
    staleTime: 1000 * 5,
    enabled: q.length > 0,
  });
  return query;
};

export default useSearch;
