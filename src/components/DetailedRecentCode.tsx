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

  const style = {
    fontSize: "1.2rem",
    paddingLeft: "5%",
    paddingTop: "1%",
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
          <div style={style}>
            {recentCode.code.split("").map((el: string) => {
              if (el === "\t") return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
              else if (el === "\n") return <br />;
              return <span>{el}</span>;
            })}
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "2%" }}>
        <Col sm="12" md="6">
          <p style={{ fontSize: "1.5rem" }}>Input:</p>
          <div style={style}>
            {recentCode.input
              ? recentCode.input.split("").map((el: string) => {
                  if (el === "\t") return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
                  else if (el === "\n") return <br />;
                  return <span>{el}</span>;
                })
              : "Input is Empty"}
          </div>
        </Col>
        <Col sm="12" md="6">
          <p style={{ fontSize: "1.5rem" }}>Output:</p>
          <div style={style}>
            {recentCode.output
              ? recentCode.output.split("").map((el: string) => {
                  if (el === "\t") return <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>;
                  else if (el === "\n") return <br />;
                  return <span>{el}</span>;
                })
              : "Output is empty"}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailedRecentCode;
