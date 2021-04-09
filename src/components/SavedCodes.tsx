import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SavedCodeCard from "./SavedCodeCard";
import { useSelector } from "../redux/hooks";
import { Code } from "../redux/reducers/savedCodes";

const SavedCodes: React.FC = () => {
  const savedCodes = useSelector((state) => state.savedCodes);

  if (savedCodes.length === 0) {
    return (
      <Container>
        <Row>
          <Col>
            <h3 className="text-center">You didn't save any codes.</h3>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container>
        {savedCodes.map((code: Code, idx: number) => (
          <SavedCodeCard key={idx} code={code} idx={idx} />
        ))}
      </Container>
    );
  }
};

export default SavedCodes;
