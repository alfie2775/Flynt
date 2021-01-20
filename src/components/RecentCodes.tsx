import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RecentCode } from "../redux/reducers/recentCodes";

const RecentCodes: React.FC = () => {
  const recentCodes = useSelector((state: any) => state.recentCodes);
  const history = useHistory();

  return (
    <Container>
      <Row className="justify-content-center">
        <Table
          responsive
          style={{
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
                      {code.code.length > 100
                        ? code.code.substring(0, 99) + "..."
                        : code.code}
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
