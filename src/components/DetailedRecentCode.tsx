import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { setLang, setValue, setOutput, setInput } from "../redux/actions";

type Params = {
  codeId: string;
};

const DetailedRecentCode = ({ match }: RouteComponentProps<Params>) => {
  const recentCode = useSelector((state: any) => state.recentCodes)[
    parseInt(match.params.codeId)
  ];
  const dispatch = useDispatch();
  const history = useHistory();

  const preTagStyle = {
    fontSize: "1.2rem",
    paddingLeft: "1%",
    paddingTop: "1%",
    paddingBottom: "1%",
    color: "white",
    marginTop: "1%",
    border: "2px solid white",
    borderRadius: "5px",
  };

  const openInIDE: () => void = () => {
    dispatch(setValue(recentCode.code, recentCode.lang));
    dispatch(setLang(recentCode.lang));
    dispatch(setInput(recentCode.input));
    dispatch(setOutput(recentCode.output));
    history.push("/");
  };

  return (
    <Container>
      <Row
        style={{ fontSize: "1.5rem", paddingTop: "2%", paddingBottom: "2%" }}
      >
        <Col>
          Language: {recentCode.lang}
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
          <p style={{ fontSize: "1.5rem" }}>Code:</p>
          <pre style={preTagStyle}>{recentCode.code}</pre>
        </Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col sm="12" md="6">
          <p style={{ fontSize: "1.5rem" }}>Input:</p>
          <pre style={preTagStyle}>
            {recentCode.input ? recentCode.input : "Input is Empty"}
          </pre>
        </Col>
        <Col sm="12" md="6">
          <p style={{ fontSize: "1.5rem" }}>Output:</p>
          <pre style={preTagStyle}>
            {recentCode.output ? recentCode.output : "Output is empty"}
          </pre>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailedRecentCode;
