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
import { Link, useNavigate } from "react-router-dom";
import { adminRegister } from "../api/auth";

const RegisterAdmin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    organisationName: "",
    organisationType: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.termsAccepted) {
      setError("You must accept the Terms and Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      await adminRegister({
        full_name: form.fullName,
        email: form.email,
        organisation_name: form.organisationName,
        organisation_type: form.organisationType,
        password: form.password,
        confirm_password: form.confirmPassword,
      });
      navigate("/login-admin");
    } catch (err) {
      const data = err.response?.data;
      const msg =
        data?.detail ||
        data?.error ||
        (typeof data === "object" ? Object.values(data).flat()[0] : null) ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
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
                required
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
                required
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
              required
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
              required
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
                required
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
                required
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

          {error && (
            <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "8px" }}>
              {error}
            </p>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create Learning Space"}
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
