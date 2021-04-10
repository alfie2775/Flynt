import React, { useState } from "react";
import { Card, Accordion, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "../redux/hooks";
import { deleteTemplate, editTemplate, getTemplates } from "../others/apiCalls";
import CodeEditor from "./CodeEditor";
import { setValue } from "../redux/actions";

interface Props {
  code: string;
  idx: number;
  id: string;
  toggleModal: any;
}

const DetailedTemplate: React.FC<Props> = ({ idx, code, id, toggleModal }) => {
  const [editable, setEditable] = useState(false);
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const [newCode, setNewCode] = useState(code);

  const handleEdit = (e: any) => {
    setEditable(true);
  };

  const openInIde = (e: any) => {
    dispatch(setValue(code, lang));
    toggleModal();
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    setEditable(false);
    const res = await editTemplate(id, newCode);
    if (res.success) {
      const templates = await getTemplates();
      dispatch({ type: "ADD_TEMPLATES", payload: templates.templates });
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const res = await deleteTemplate(id);
    if (res.success) {
      const templates = await getTemplates();
      dispatch({ type: "ADD_TEMPLATES", payload: templates.templates });
    }
  };

  return (
    <Card className="login-modal">
      <Accordion.Toggle as={Card.Header} eventKey={idx + ""}>
        {"Template " + (idx + 1)}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={idx + ""}>
        <>
          {editable ? (
            <CodeEditor
              showGutter={false}
              lang={lang.toLowerCase()}
              value={newCode}
              setValue={setNewCode}
              height="250px"
            />
          ) : (
            <Card.Body
              style={{
                fontSize: "1.2rem",
                paddingLeft: "5%",
                paddingTop: "1%",
                marginTop: "1%",
                border: "2px solid white",
                borderRadius: "5px",
              }}
            >
              <pre
                style={{ marginBottom: 0, color: "white" }}
                contentEditable={editable}
              >
                {code}
              </pre>
            </Card.Body>
          )}
          <Row style={{ marginTop: "15px", marginBottom: "15px" }}>
            <Col
              sm="12"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Button variant="outline-light" onClick={(e) => openInIde(e)}>
                Open in IDE
              </Button>
              <Button
                variant="success"
                onClick={(e) => (editable ? handleSave(e) : handleEdit(e))}
              >
                {editable ? "Save" : "Edit"}
              </Button>
              <Button variant="danger" onClick={(e) => handleDelete(e)}>
                Delete
              </Button>
            </Col>
          </Row>
        </>
      </Accordion.Collapse>
    </Card>
  );
};

export default DetailedTemplate;
