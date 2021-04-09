import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import { Accordion, Modal, Button, Col, Row } from "react-bootstrap";
import DetailedTemplate from "./DetailedTemplate";
import { useSelector, useDispatch } from "../redux/hooks";
import { addTemplate, getTemplates } from "../others/apiCalls";

const Templates: React.FC = () => {
  const templates = useSelector((state) => state.templates);
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newCode, setNewCode] = useState<string>("");
  var langTemplates: Array<any>;
  if (templates === null) langTemplates = [];
  else langTemplates = templates[lang] || [];

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await addTemplate(lang, newCode);
    if (res.success) {
      const newTemplates = await getTemplates();
      dispatch({ type: "ADD_TEMPLATES", payload: newTemplates.templates });
    } else alert("Try again later");
    toggleModal();
  };

  return (
    <Modal.Body className="login-modal">
      <Accordion>
        {langTemplates &&
          langTemplates.map((template: any, idx: number) => {
            return (
              <DetailedTemplate
                key={idx}
                idx={idx}
                code={template.code}
                id={template.id}
                toggleModal={setIsOpen}
              />
            );
          })}
      </Accordion>
      {langTemplates.length < 3 && (
        <Row>
          <Col sm="12" className="d-flex justify-content-center pt-3 pb-2">
            <Button onClick={(e) => toggleModal()}>
              <span className="fa fa-plus"></span> Add a new template
            </Button>
          </Col>
        </Row>
      )}
      <Modal show={isOpen} onHide={toggleModal}>
        <CodeEditor
          value={newCode}
          setValue={setNewCode}
          lang={lang.toLowerCase()}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </Modal>
    </Modal.Body>
  );
};

export default Templates;
