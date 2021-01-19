import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CodeEditor from "./CodeEditor";
import Output from "./Output";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col, Dropdown, Form, Row, Modal } from "react-bootstrap";
import { setValue, resetValue, setTheme, setLang } from "../redux/actions";
import { compileAndRun } from "../others/compileandrun";

const Main: React.FC = () => {
  const lang = useSelector((state: any) => state.lang);
  const theme = useSelector((state: any) => state.theme);
  const value = useSelector((state: any) => state.value);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [outputStatus, setOutputStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [error, setError] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit: () => void = async () => {
    setIsLoading(true);
    const out = await compileAndRun(lang, value[lang], input);
    if (out.message) {
      setOutputStatus("");
      setOutput("Sever is busy try sometime later.");
      setIsLoading(false);
      return;
    }
    setOutputStatus(
      out.Errors
        ? out.Errors.substring(0, 4) === "Kill"
          ? "Time Limit Exceeded"
          : "Runtime Error"
        : "Success"
    );
    setOutput(out.Result);
    setError(out.Errors);
    console.log({ out });

    setIsLoading(false);
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md="10" className="code-editor">
          <CodeEditor
            value={value[lang]}
            lang={lang.toLowerCase()}
            theme={theme}
            setValue={(val) => {
              dispatch(setValue(val, lang));
            }}
          />
        </Col>
        <Col
          sm="12"
          md="2"
          className="d-flex order-direction justify-content-evenly"
        >
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="lang-dropdown">
              {lang}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(value).map((key, idx) => (
                <Dropdown.Item
                  className="dropdown-hover"
                  active={key === lang ? true : false}
                  key={idx}
                  onClick={() => dispatch(setLang(key))}
                >
                  {key}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-success" id="lang-dropdown">
              Theme
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {["Light", "Dark"].map((key, idx) => (
                <Dropdown.Item
                  className="dropdown-hover"
                  active={key === theme ? true : false}
                  key={idx}
                  onClick={() => {
                    dispatch(setTheme(key));
                  }}
                >
                  {key}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            className="m-0"
            variant="outline-danger"
            onClick={() => {
              toggleModal(true);
            }}
          >
            Reset Code
          </Button>
          <Button
            href="#output"
            className="m-0"
            variant="outline-info"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          >
            Run
          </Button>
          <Modal show={modal} onHide={() => toggleModal(false)}>
            <Modal.Title className="reset-code text-center modal-titl">
              Are you sure?
            </Modal.Title>
            <Modal.Body className="reset-code">
              <Col className="d-flex justify-content-around" md="12">
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    dispatch(resetValue(lang));
                    toggleModal(false);
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="outline-primary"
                  onClick={() => toggleModal(false)}
                >
                  No
                </Button>
              </Col>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="10" className="mt-3">
          <Dropdown.Toggle
            onClick={() => setIsInputOpen(!isInputOpen)}
            className="input-toggler mb-1"
            variant="light"
          >
            Input
          </Dropdown.Toggle>
          <div className={"input " + (isInputOpen ? "input-slide" : "")}>
            <Form.Control
              style={{ fontSize: "large" }}
              as="textarea"
              className="input-t"
              placeholder="Input is Empty"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="10">
          <Output
            isLoading={isLoading}
            status={outputStatus}
            error={error}
            output={output}
            className="mt-2"
          />
        </Col>
      </Row>
    </Container>
  );
};
export default Main;
