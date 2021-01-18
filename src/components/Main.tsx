import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Output from "./Output";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Col, Dropdown, Form, Row, Modal } from "react-bootstrap";
import {
  getValues,
  resetValue,
  updateValue,
  getTheme,
  updateTheme,
} from "../others/functions";
import { themes } from "../others/themes";

interface Values {
  [key: string]: string;
}

const Main: React.FC = () => {
  const [lang, setLang] = useState("Python");
  const [theme, setTheme] = useState(getTheme());
  const [value, setValue] = useState<Values>(getValues());
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modal, toggleModal] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);

  const handleSubmit: () => void = () => {
    setOutput("OP");
    setIsLoading(false);
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md="10" className="code-editor">
          <CodeEditor
            value={value[lang]}
            lang={lang.toLowerCase()}
            theme={theme.toLowerCase().replace(" ", "_")}
            setValue={(val) => {
              setValue({ ...value, [lang]: val });
              updateValue(lang, val);
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
                  active={key === lang ? true : false}
                  key={idx}
                  onClick={() => setLang(key)}
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
              {themes.map((key, idx) => (
                <Dropdown.Item
                  active={key === theme ? true : false}
                  key={idx}
                  onClick={() => {
                    setTheme(key);
                    updateTheme(key);
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
                    resetValue(lang, value);
                    setValue(getValues());
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
          <Output isLoading={isLoading} output={output} className="mt-2" />
        </Col>
      </Row>
    </Container>
  );
};
export default Main;
