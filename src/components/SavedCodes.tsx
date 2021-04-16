import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SavedCodeCard from "./SavedCodeCard";
import { useDispatch, useSelector } from "../redux/hooks";
import { getAllUserData } from "../others/apiCalls";
import { Code } from "../redux/reducers/savedCodes";

const SavedCodes: React.FC = () => {
  const { savedCodes, isAuth } = useSelector((state) => ({
    savedCodes: state.savedCodes,
    isAuth: state.isAuth,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      getAllUserData(dispatch);
    }
  });

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
