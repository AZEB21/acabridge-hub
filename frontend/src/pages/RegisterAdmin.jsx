import React, { useState } from "react";
import {
  PageContainer,
  LogoContainer,
  Logo,
  Card,
  Title,
  Subtitle,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Select,
  CheckboxContainer,
  Checkbox,
  TermsText,
  TermsLink,
  SubmitButton,
  LoginText,
  LoginLink,
} from "../styles/RegisterAdmin.styles";
import LogoImg from "../assets/Logo.PNG";
import { Link } from "react-router-dom";

const RegisterAdmin = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    organisationName: "",
    organisationType: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", form);

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!form.termsAccepted) {
      alert("You must accept terms & privacy policy");
      return;
    }

    // TODO: call API here
  };

  return (
    <PageContainer>
      <LogoContainer>
        <Logo src={LogoImg} alt="AcaBridge Hub" />
      </LogoContainer>

      <Card>
        <Title>Create Organisation Learning Space</Title>
        <Subtitle>Start for free. Set up in minutes.</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup>
              <Label>Full Name *</Label>
              <Input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Anabel"
              />
            </FormGroup>

            <FormGroup>
              <Label>Work Email *</Label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
              />
            </FormGroup>
          </Row>

          <FormGroup>
            <Label>Organisation Name *</Label>
            <Input
              type="text"
              name="organisationName"
              value={form.organisationName}
              onChange={handleChange}
              placeholder="e.g Africa Agility"
            />
          </FormGroup>

          <FormGroup>
            <Label>Organisation Type *</Label>
            <Select
              name="organisationType"
              value={form.organisationType}
              onChange={handleChange}
            >
              <option value="">Select organisation type</option>
              <option value="NGO">NGO</option>
              <option value="Company">Company</option>
              <option value="University">University</option>
              <option value="School">School</option>
            </Select>
          </FormGroup>

          <Row>
            <FormGroup>
              <Label>Password *</Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
              />
            </FormGroup>

            <FormGroup>
              <Label>Confirm Password *</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </FormGroup>
          </Row>

          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              name="termsAccepted"
              checked={form.termsAccepted}
              onChange={handleChange}
            />

            <TermsText>
              I agree with the <TermsLink>Terms</TermsLink> and{" "}
              <TermsLink>Privacy Policy</TermsLink>
            </TermsText>
          </CheckboxContainer>

          <SubmitButton type="submit">
            Create Learning Space
          </SubmitButton>

          <LoginText>
            Already have an account?{" "}
            <LoginLink as={Link} to="/login-admin">Login</LoginLink>
          </LoginText>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default RegisterAdmin;