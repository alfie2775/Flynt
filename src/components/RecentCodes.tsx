import React from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAllRecentCodes } from "../redux/actions";
import { RecentCode } from "../redux/reducers/recentCodes";

const RecentCodes: React.FC = () => {
  const recentCodes = useSelector((state: any) => state.recentCodes);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row style={{ margin: "15px 0px" }}>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outline-danger"
            onClick={() => dispatch(deleteAllRecentCodes())}
          >
            Delete All Codes
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Table
          responsive
          style={{
            margin: "auto",
            color: "white",
            textAlign: "center",
          }}
        >
          <thead>
            <Col style={{ paddingLeft: "auto" }}>
              <tr>
                <td className="rc-1">Sl. no.</td>
                <td className="rc-2">Language</td>
                <td className="rc-3">Code</td>
                <td className="rc-4">Input</td>
                <td className="rc-5">Output</td>
                <td className="rc-6">Date and Time</td>
              </tr>
            </Col>
          </thead>
          <tbody>
            {recentCodes.map((code: RecentCode, idx: number) => {
              return (
                <Col key={idx} className="recent-codes-tr">
                  <tr
                    className="rc"
                    style={{ height: "15vh" }}
                    onClick={() => history.push(`/recent-codes/${idx}`)}
                  >
                    <td className="rc-1">{idx + 1}</td>
                    <td className="rc-2">{code.lang}</td>
                    <td className="rc-3">
                      <pre
                        style={{
                          margin: "0",
                          color: "white",
                          fontFamily: "Josefin Sans",
                          overflow: "hidden",
                        }}
                      >
                        {code.code.length > 100
                          ? code.code.substring(0, 99) + "..."
                          : code.code}
                      </pre>
                    </td>
                    <td className="rc-4">{code.input || "Input was Empty"}</td>
                    <td className="rc-5">{code.output}</td>
                    <td className="rc-6">
                      {code.datetime.substring(
                        4,
                        code.datetime.indexOf("GMT") - 1
                      )}
                    </td>
                  </tr>
                </Col>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
export default RecentCodes;
