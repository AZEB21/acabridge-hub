import { useState } from "react";
import {
  PageContainer, LogoContainer, Logo, Card, Title, Subtitle, Form,
  Row, FormGroup, Label, Input, Select, CheckboxContainer, Checkbox,
  TermsText, TermsLink, SubmitButton, LoginText, LoginLink,
} from "../styles/RegisterAdmin.styles";
import LogoImg from "../assets/Logo.PNG";
import { Link, useNavigate } from "react-router-dom";
import { adminRegister } from "../api/auth";
import styled from "styled-components";

/* ── Success modal ── */
const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
`;
const Modal = styled.div`
  background: #fff; border-radius: 20px; padding: 40px 36px 32px;
  text-align: center; width: min(90%, 380px);
  box-shadow: 0 24px 64px rgba(0,0,0,0.2);
`;
const CheckCircle = styled.div`
  width: 56px; height: 56px; border-radius: 50%; background: #f59e0b;
  display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;
`;
const ModalTitle = styled.h2`
  font-size: 20px; font-weight: 800; color: #0d2137; margin: 0 0 10px;
`;
const ModalSub = styled.p`
  font-size: 14px; color: #667085; margin: 0 0 24px; line-height: 1.5;
`;
const ModalBtn = styled.button`
  width: 100%; padding: 13px; background: #0d2137; color: #fff;
  border: none; border-radius: 10px; font-size: 15px; font-weight: 700;
  cursor: pointer; &:hover { opacity: 0.88; }
`;

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "", email: "", organisationName: "",
    organisationType: "", password: "", confirmPassword: "", termsAccepted: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match."); return; }
    if (!form.termsAccepted) { setError("You must accept the Terms and Privacy Policy."); return; }
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
      setShowSuccess(true);
    } catch (err) {
      const data = err.response?.data;
      const msg =
        data?.detail || data?.error ||
        (typeof data === "object" ? Object.values(data).flat()[0] : null) ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Waiting for approval modal */}
      {showSuccess && (
        <Overlay>
          <Modal>
            <CheckCircle>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </CheckCircle>
            <ModalTitle>Request Submitted!</ModalTitle>
            <ModalSub>
              Your admin account request has been submitted.<br />
              Please wait for approval from the super admin before you can log in.
              You'll be notified by email once approved.
            </ModalSub>
            <ModalBtn onClick={() => navigate("/login-admin")}>
              Go to Login
            </ModalBtn>
          </Modal>
        </Overlay>
      )}

      <PageContainer style={{ filter: showSuccess ? "blur(2px)" : "none" }}>
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
                <Input required type="text" name="fullName" value={form.fullName}
                  onChange={handleChange} placeholder="Anabel" />
              </FormGroup>
              <FormGroup>
                <Label>Work Email *</Label>
                <Input required type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="example@gmail.com" />
              </FormGroup>
            </Row>

            <FormGroup>
              <Label>Organisation Name *</Label>
              <Input required type="text" name="organisationName" value={form.organisationName}
                onChange={handleChange} placeholder="e.g Africa Agility" />
            </FormGroup>

            <FormGroup>
              <Label>Organisation Type *</Label>
              <Select required name="organisationType" value={form.organisationType} onChange={handleChange}>
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
                <Input required type="password" name="password" value={form.password}
                  onChange={handleChange} placeholder="Create password" />
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password *</Label>
                <Input required type="password" name="confirmPassword" value={form.confirmPassword}
                  onChange={handleChange} placeholder="Confirm your password" />
              </FormGroup>
            </Row>

            <CheckboxContainer>
              <Checkbox type="checkbox" name="termsAccepted"
                checked={form.termsAccepted} onChange={handleChange} />
              <TermsText>
                I agree with the <TermsLink>Terms</TermsLink> and <TermsLink>Privacy Policy</TermsLink>
              </TermsText>
            </CheckboxContainer>

            {error && (
              <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "8px" }}>{error}</p>
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
    </>
  );
};

export default RegisterAdmin;
