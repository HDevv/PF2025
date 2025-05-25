import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "./NProjects.css";
import { useProjects } from "../../context/ProjectsContext";

function NProjects() {
  const { projects, setProjects } = useProjects();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [error, setError] = useState("");
  const [newProject, setNewProject] = useState({
    description: "",
    link: "",
    image: null,
  });
  const [editableProject, setEditableProject] = useState({
    id: "",
    description: "",
    link: "",
    image: null,
  });

  useEffect(() => {
    fetch("http://localhost:5001/api/projects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: 'include'
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Erreur lors de la récupération des projets");
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError(error.message);
      });
  }, [setProjects]);

  const handleAddShow = () => {
    setError("");
    setShowAddModal(true);
  };
  
  const handleAddClose = () => {
    setError("");
    setShowAddModal(false);
    setNewProject({ description: "", link: "", image: null });
  };

  const handleEditShow = (project) => {
    setError("");
    setEditableProject(project);
    setShowEditModal(true);
  };
  
  const handleEditClose = () => {
    setError("");
    setShowEditModal(false);
    setEditableProject({ id: "", description: "", link: "", image: null });
  };

  const handleAddProject = async (event) => {
    event.preventDefault();
    setError("");
    
    if (!newProject.description.trim()) {
      setError("La description est requise");
      return;
    }

    const formData = new FormData();
    formData.append("description", newProject.description.trim());
    formData.append("link", newProject.link.trim());
    if (newProject.image) {
      formData.append("image", newProject.image);
    }

    try {
      const response = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'ajout du projet");
      }

      const data = await response.json();
      setProjects([...projects, data]);
      handleAddClose();
    } catch (error) {
      console.error("Error adding project:", error);
      setError(error.message);
    }
  };

  const handleUpdateProject = async (event) => {
    event.preventDefault();
    setError("");
    
    if (!editableProject.description.trim()) {
      setError("La description est requise");
      return;
    }

    const formData = new FormData();
    formData.append("description", editableProject.description.trim());
    formData.append("link", editableProject.link.trim());
    if (editableProject.image instanceof File) {
      formData.append("image", editableProject.image);
    }

    try {
      const addResponse = await fetch("http://localhost:5001/api/projects", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: 'include'
      });

      if (!addResponse.ok) {
        const errorData = await addResponse.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour du projet");
      }

      const updatedProject = await addResponse.json();

      const deleteResponse = await fetch(
        `http://localhost:5001/api/projects/${editableProject.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: 'include'
        }
      );

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(errorData.message || "Erreur lors de la suppression de l'ancien projet");
      }

      setProjects(
        projects.map((p) => (p.id === editableProject.id ? updatedProject : p))
      );
      handleEditClose();
    } catch (error) {
      console.error("Error updating project:", error);
      setError(error.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la suppression du projet");
      }

      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      setError(error.message);
    }
  };

  const handleImageChange = (e) => {
    setNewProject({ ...newProject, image: e.target.files[0] });
  };

  return (
    <Container className="container-center">
      <div className="projects-header">
        <h1>Mes Projets</h1>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      
      <div className="add-project-container">
        <Button variant="primary" onClick={handleAddShow} className="add-project-btn">
          Ajouter un projet
        </Button>
      </div>

      <div className="projects-grid">
        <Row>
          {projects.map((project) => (
            <Col key={project.id} xs={12} sm={6} lg={4}>
              <div className="project-card">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.description}
                    className="project-image"
                  />
                )}
                <h3>{project.description}</h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Voir le projet
                  </a>
                )}
                <div className="btn-group">
                  <Button
                    variant="primary"
                    onClick={() => handleEditShow(project)}
                  >
                    Modifier
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showAddModal} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un projet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProject}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lien du projet</Form.Label>
              <Form.Control
                type="url"
                value={newProject.link}
                onChange={(e) =>
                  setNewProject({ ...newProject, link: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Ajouter
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleEditClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un projet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProject}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editableProject.description}
                onChange={(e) =>
                  setEditableProject({
                    ...editableProject,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Lien du projet</Form.Label>
              <Form.Control
                type="url"
                value={editableProject.link}
                onChange={(e) =>
                  setEditableProject({
                    ...editableProject,
                    link: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setEditableProject({
                    ...editableProject,
                    image: e.target.files[0],
                  })
                }
                accept="image/*"
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Mettre à jour
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default NProjects;
