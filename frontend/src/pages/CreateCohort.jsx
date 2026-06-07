import React, { useState } from "react";
import {
  Overlay,
  ModalContainer,
  Header,
  Title,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Row,
  SubmitButton,
} from "../styles/CreateCohort.styles";

const CreateCohort = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    cohortName: "",
    trainingTrack: "",
    startDate: "",
    endDate: "",
    maxStudents: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>Create New Cohort</Title>

          <CloseButton onClick={onClose}>
            ✕
          </CloseButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              Cohort Name <span>*</span>
            </Label>

            <Input
              type="text"
              name="cohortName"
              placeholder="Cohort 6"
              value={formData.cohortName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Training Track <span>*</span>
            </Label>

            <Select
              name="trainingTrack"
              value={formData.trainingTrack}
              onChange={handleChange}
              required
            >
              <option value="">Select Track</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="uiux">UI/UX Design</option>
              <option value="data-science">Data Science</option>
              <option value="machine-learning">
                Machine Learning
              </option>
            </Select>
          </FormGroup>

          <Row>
            <FormGroup>
              <Label>
                Start Date <span>*</span>
              </Label>

              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                End Date <span>*</span>
              </Label>

              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Row>

          <FormGroup>
            <Label>
              Max Students <span>*</span>
            </Label>

            <Input
              type="number"
              name="maxStudents"
              placeholder="e.g 5000"
              value={formData.maxStudents}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">
            Create Cohort
          </SubmitButton>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default CreateCohort;