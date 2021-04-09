import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { deleteSavedCode, getSavedCodes } from "../others/apiCalls";
import { Code } from "../redux/reducers/savedCodes";

interface Props {
  code: Code;
  idx: number;
}

const SavedCodeCard: React.FC<Props> = ({ code, idx }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e: any) => {
    const res = await deleteSavedCode(code._id);
    if (res.status) {
      const res = await getSavedCodes();
      dispatch({ type: "GET_SAVED_CODES", payload: res.reverse() });
    } else {
      alert("Try again later");
    }
  };

  return (
    <Row
      className="saved-code-row"
    >
      <Col sm="10" className="saved-code-col" onClick={() => history.push(`/saved-codes/${idx}`)}>
        <p className="saved-code-title">Title: {" " + code.codeName}</p>
        <p className="saved-code-lang">Language:{" " + code.lang}</p>
        <pre
          style={{
            marginBottom: 0,
            color: "white",
            fontFamily: "Josefin Sans",
            fontSize: "1.1rem",
            border: "1.5px solid white",
            borderRadius: "10px",
            padding: "1% 2%",
          }}
        >
          {code.code.length < 100 ? code.code : code.code.substring(0, 100)}
        </pre>
      </Col>
      <Col sm="2" className="saved-code-delete">
        <Button
          style={{ zIndex: 2 }}
          variant="outline-danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Col>
    </Row>
  );
};

export default SavedCodeCard;
