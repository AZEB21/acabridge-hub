import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import {
  PageWrap, TopBar, TopLogo, StepLabel, ProgressLine,
  Content, Badge, PageTitle, PageSub,
  Label, Input, PrimaryBtn, ErrorMsg,
} from "../styles/Flow.styles.jsx";
import styled from "styled-components";
import LogoImg from "../assets/Logo.PNG";

const FooterNote = styled.p`
  text-align: center;
  font-size: 13px;
  color: #888;
  margin-top: 16px;
  a { color: #0d2137; font-weight: 600; text-decoration: none; &:hover { text-decoration: underline; } }
`;

export default function Register() {
  const [form, setForm] = useState({
    full_name: "", email: "", password: "", confirm_password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await register(form);
      localStorage.setItem("pending_email", form.email);
      if (data?.dev_otp) localStorage.setItem("dev_otp", data.dev_otp);
      navigate("/verify-otp");
    } catch (err) {
      const d = err.response?.data;
      if (!err.response) {
        setError("Network error — cannot reach the server. Check your connection.");
        return;
      }
      setError(
        d?.email?.[0] ||
        d?.password?.[0] ||
        d?.full_name?.[0] ||
        d?.non_field_errors?.[0] ||
        d?.detail ||
        JSON.stringify(d) ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap>
      <TopBar>
        <TopLogo src={LogoImg} alt="AcaBridge" />
        <StepLabel>Step 1 of 5</StepLabel>
      </TopBar>
      <ProgressLine $pct="20%" />

      <Content>
        <Badge>Cohort 9.0 — Applications open</Badge>
        <PageTitle>Create your account</PageTitle>
        <PageSub>Your learning journey starts here.</PageSub>

        <form onSubmit={handleSubmit}>
          <Label>Full name</Label>
          <Input
            type="text"
            placeholder="Azeb yirga"
            value={form.full_name}
            onChange={set("full_name")}
            required
          />
          <Label>Email address</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="At least 8 characters"
            value={form.password}
            onChange={set("password")}
            required
          />
          <Label>Confirm password</Label>
          <Input
            type="password"
            placeholder=""
            value={form.confirm_password}
            onChange={set("confirm_password")}
            required
          />
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <PrimaryBtn type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </PrimaryBtn>
        </form>

        <FooterNote>
          Already have an account? <Link to="/signin">Sign in</Link>
        </FooterNote>
      </Content>
    </PageWrap>
  );
}
