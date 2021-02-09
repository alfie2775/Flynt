import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <footer>
            <div className="alfie">
              <p>
                Made by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="link-to-alfie"
                  href="https://tarunalfie.netlify.app"
                >
                  Tarun
                </a>
              </p>
            </div>
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
