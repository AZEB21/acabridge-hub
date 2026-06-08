import React, { useState } from "react";
import {
  Overlay, ModalContainer, Header, Title, CloseButton,
  Form, FormGroup, Label, Input, Select, Row, SubmitButton,
} from "../styles/CreateCohort.styles";
import { createAdminCohort } from "../api/auth";

const CreateCohort = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    is_active: true,
    applications_open: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await createAdminCohort({
        name: formData.name,
        is_active: formData.is_active,
        applications_open: formData.applications_open,
      });
      if (onCreated) onCreated(res.data);
      else onClose();
      setFormData({ name: "", is_active: true, applications_open: true });
    } catch (err) {
      const msg = err.response?.data?.name?.[0] || err.response?.data?.detail || "Failed to create cohort.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>Create New Cohort</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Cohort Name <span>*</span></Label>
            <Input
              type="text"
              name="name"
              placeholder="e.g. Cohort 9.0"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <Row>
            <FormGroup>
              <Label>Status</Label>
              <Select name="is_active" value={formData.is_active} onChange={(e) =>
                setFormData((p) => ({ ...p, is_active: e.target.value === "true" }))}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Applications</Label>
              <Select name="applications_open" value={formData.applications_open} onChange={(e) =>
                setFormData((p) => ({ ...p, applications_open: e.target.value === "true" }))}>
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </Select>
            </FormGroup>
          </Row>

          {error && <p style={{ color: "#dc2626", fontSize: 13 }}>{error}</p>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create Cohort"}
          </SubmitButton>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default CreateCohort;
