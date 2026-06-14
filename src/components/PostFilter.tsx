import { Form } from "react-bootstrap";
import { postStatusType } from "../Types";
import React from "react";

interface filterPropspostfilter {
  filterstatus: postStatusType;
  setFilterStatus: (value: postStatusType) => void;
}

export default function PostFilter({
  filterstatus,
  setFilterStatus,
}: filterPropspostfilter) {
  function changeHandle(e: React.ChangeEvent<HTMLSelectElement>) {
    setFilterStatus(e.target.value as postStatusType);
  }
  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={filterstatus} onChange={changeHandle}>
        <option value="all">Select Status</option>
        <option value="published">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Blocked</option>
      </Form.Select>
    </>
  );
}
