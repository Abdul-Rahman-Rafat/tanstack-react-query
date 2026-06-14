import { Row, Col } from "react-bootstrap";
import PostsList from "../components/PostsList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { postStatusType } from "../Types";
import PostSearch from "../components/PostSearch";
const Home = () => {
  const [filterstatus, setFilterStatus] = useState<postStatusType>("all");
  const [searchquery, setSearchquery] = useState<string>("");
  return (
    <Row>
      <Col xs={9}>
        <PostsList filterstatus={filterstatus} searchquery={searchquery} />
      </Col>

      <Col>
        <PostSearch setSearchquery={setSearchquery} />
        <PostFilter
          filterstatus={filterstatus}
          setFilterStatus={setFilterStatus}
        />
      </Col>
    </Row>
  );
};

export default Home;
