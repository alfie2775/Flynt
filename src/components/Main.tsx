import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "../redux/hooks";
import CodeEditor from "./CodeEditor";
import Output from "./Output";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Templates from "./Templates";
import { Col, Dropdown, Form, Row, Modal, Toast } from "react-bootstrap";
import {
  setValue,
  resetValue,
  setTheme,
  setLang,
  setOutput,
  setInput,
  addRecentCode,
} from "../redux/actions";
import {
  compileAndRun,
  getAllUserData,
  getSavedCodes,
  saveCode,
  shareCode,
} from "../others/apiCalls";
import Loading from "./Loading";

const Main: React.FC = () => {
  const lang = useSelector((state) => state.lang);
  const theme = useSelector((state) => state.theme);
  const value = useSelector((state) => state.codeInEditor);
  const output = useSelector((state) => state.output);
  const input = useSelector((state) => state.input);
  const isAuth = useSelector((state) => state.isAuth);
  const toast = useSelector((state) => state.toast);
  const toastHeader = useSelector((state) => state.toastHeader);
  const toastBody = useSelector((state) => state.toastBody);
  const [savedCodeTitle, setSavedCodeTitle] = useState("");
  const [savedCodeModal, setSavedCodeModal] = useState(false);
  const [templateModal, setTemplateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const dispatch = useDispatch();

  const setToast = (value: boolean) =>
    dispatch({ type: "SET_TOAST", payload: value });

  const setToastHeader = (value: string) =>
    dispatch({ type: "SET_TOAST_HEADER", payload: value });

  const setToastBody = (value: string) =>
    dispatch({ type: "SET_TOAST_BODY", payload: value });

  const toggleToast = () => setToast(!toast);

  const handleSubmit: () => void = async () => {
    setIsLoading(true);
    const [language, code, inp] = [lang, value[lang], input];
    const res = await compileAndRun(value[lang], lang, input);
    if (res.error) {
      dispatch(setOutput("Try agail later"));
    } else {
      dispatch(setOutput(res.output));
      dispatch(addRecentCode(language, code, inp, output));
    }
    setIsLoading(false);
  };

  const toggleTemplateModal = () => setTemplateModal(!templateModal);

  const openToast = (header: string, body: string, open: boolean = false) => {
    setToastHeader(header);
    setToastBody(body);
    if (open) setToast(true);
  };

  const handleShare = async (e: any) => {
    e.preventDefault();
    openToast("Generating...", "loading", true);
    const res = await shareCode(lang, value[lang], input);
    if (res.success) {
      openToast(
        "Generated link",
        "https://flynt-ide.netlify.app/shared/" + res.url
      );
    } else {
      openToast("Generating Failed", "Server is busy, try again later");
    }
  };

  const toggleSavedCodeModal = () => {
    setSavedCodeModal(!savedCodeModal);
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    toggleSavedCodeModal();
    openToast("Saving...", "loading", true);
    const res1 = await saveCode(savedCodeTitle, lang, value[lang], input);
    if (res1.success) {
      openToast(
        "Saved successfully",
        "You can click your username at the top right to access your saved codes."
      );
    } else {
      setToastBody("Server is busy, try again later");
    }
    const res2 = await getSavedCodes();
    dispatch({ type: "GET_SAVED_CODES", payload: res2.reverse() });
    setSavedCodeTitle("");
  };

  useEffect(() => {
    if (isAuth) {
      getAllUserData(dispatch);
    }
  });

  return (
    <Container>
      <Row>
        <Col className="share-container" sm="12" md="10">
          <Button
            onClick={(e) => handleShare(e)}
            style={{ transform: "translateY(50%)" }}
          >
            <span className="fa fa-share fa-lg"></span>
          </Button>
        </Col>
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
          className="d-flex order-direction align-items-center justify-content-evenly"
        >
          <Dropdown>
            <Dropdown.Toggle
              className="mr-2 mt-2"
              variant="outline-light"
              id="lang-dropdown"
            >
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
            <Dropdown.Toggle
              className="mr-2 mt-2"
              variant="outline-success"
              id="lang-dropdown"
            >
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
          <Modal show={savedCodeModal} onHide={toggleSavedCodeModal}>
            <Modal.Title className="login-modal-title">
              Add a title to your code
            </Modal.Title>
            <Modal.Body className="login-modal">
              <Form.Control
                spellCheck={false}
                style={{ fontSize: "large" }}
                as="textarea"
                className="login-modal"
                placeholder="Title can not be empty"
                rows={2}
                value={savedCodeTitle}
                onChange={(e) => setSavedCodeTitle(e.target.value)}
              />
              <div className="d-flex justify-content-center">
                <Button
                  className="m-0 mr-2 mt-2"
                  variant="outline-primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </Modal.Body>
          </Modal>
          {isAuth && (
            <>
              <Button
                onClick={(e) => toggleTemplateModal()}
                variant="outline-warning"
                className="m-0 mr-2 mt-2"
              >
                Templates
              </Button>
              <Modal onHide={toggleTemplateModal} show={templateModal}>
                <Modal.Title className="login-modal-title">
                  Templates
                </Modal.Title>
                <Templates />
              </Modal>
            </>
          )}
          <Button
            className="m-0 mr-2 mt-2"
            variant="outline-danger"
            onClick={() => {
              toggleModal(true);
            }}
          >
            Reset Code
          </Button>
          {isAuth && (
            <Button
              className="m-0 mr-2 mt-2"
              variant="outline-primary"
              onClick={toggleSavedCodeModal}
            >
              Save
            </Button>
          )}
          <Button
            href="#output"
            className="m-0 mr-2 mt-2"
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
                    dispatch(setInput(""));
                    dispatch(setOutput(""));
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
              spellCheck={false}
              style={{ fontSize: "large" }}
              as="textarea"
              className="input-t"
              placeholder="Input is Empty"
              rows={5}
              value={input}
              onChange={(e) => dispatch(setInput(e.target.value))}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="10">
          <Output isLoading={isLoading} output={output} className="mt-2" />
        </Col>
      </Row>
      <Toast
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(1.2)",
        }}
        show={toast}
        onClose={toggleToast}
      >
        <Toast.Header style={{ paddingLeft: "auto" }}>
          {toastHeader}
        </Toast.Header>
        <Toast.Body style={{ color: "black" }}>
          {toastBody === "loading" ? (
            <Loading height="30px" width="30px" borderSize="5px" />
          ) : (
            toastBody
          )}
        </Toast.Body>
      </Toast>
    </Container>
  );
};
export default Main;
