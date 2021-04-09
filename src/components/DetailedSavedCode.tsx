import { RouteComponentProps, useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "../redux/hooks";
import { setInput, setLang, setValue } from "../redux/actions";

interface Props {
  codeId: string;
}

const DetailedSavedCode = ({ match }: RouteComponentProps<Props>) => {
  const savedCode = useSelector((state) => state.savedCodes)[
    parseInt(match.params.codeId)
  ];
  const history = useHistory();

  const dispatch = useDispatch();
  const style = {
    fontSize: "1.2rem",
    paddingLeft: "1%",
    paddingTop: "1%",
    paddingBottom: "1%",
    color: "white",
    marginTop: "1%",
    border: "2px solid white",
    borderRadius: "5px",
  };

  const openInIDE = () => {
    dispatch(setLang(savedCode.lang));
    dispatch(setValue(savedCode.code, savedCode.lang));
    dispatch(setInput(savedCode.input));
    history.push("/");
  };

  return (
    <Container>
      <Row>
        <Col className="text-center mt-2 mb-2" style={{ fontSize: "1.5rem" }}>
          {savedCode.codeName}
        </Col>
      </Row>
      <Row
        style={{ fontSize: "1.4rem", paddingTop: "2%", paddingBottom: "2%" }}
      >
        <Col>
          Language: {savedCode.lang}
          <Button
            style={{ marginLeft: "5%" }}
            onClick={openInIDE}
            variant="outline-light"
          >
            Open in IDE
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ fontSize: "1.2rem" }}>Code:</p>
          <pre style={style}>{savedCode.code}</pre>
        </Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col sm="12" md="6">
          <p style={{ fontSize: "1.2rem" }}>Input:</p>
          <pre style={style}>{savedCode.input || "Input is empty"}</pre>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailedSavedCode;
