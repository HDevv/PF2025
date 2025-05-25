// src/components/ProjectModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ProjectModal = ({ show, onHide, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un projet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez le titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez la description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Sauvegarder
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectModal;
