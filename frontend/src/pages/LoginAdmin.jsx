import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/Logo.PNG";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import { adminLogin } from "../api/auth";

import {
  PageContainer,
  LogoContainer,
  Logo,
  Card,
  Title,
  Subtitle,
  Form,
  FormGroup,
  Label,
  Input,
  CheckboxContainer,
  Checkbox,
  TermsText,
  SubmitButton,
  LoginText,
  LoginLink,
  FormRow,
  ForgotPassword,
  Divider,
  DividerLine,
  DividerText,
  SocialIcons,
  SocialIcon,
} from "../styles/LoginAdmin.styles";

const LoginAdmin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
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
    setLoading(true);
    try {
      const { data } = await adminLogin({ email: form.email, password: form.password });
      localStorage.setItem("admin_access_token", data.access);
      localStorage.setItem("admin_refresh_token", data.refresh);
      localStorage.setItem("admin_name", data.user?.full_name || "Admin");
      navigate("/dashboard-admin");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Invalid email or password. Please try again.";
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
        <Title>Welcome Back!</Title>
        <Subtitle>Log in to manage your organisation</Subtitle>

        <Form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <FormGroup>
            <Label>Email Address *</Label>
            <Input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
          </FormGroup>

          {/* PASSWORD */}
          <FormGroup>
            <Label>Password *</Label>
            <Input
              required
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="enter password"
            />
          </FormGroup>

          {/* REMEMBER + FORGOT PASSWORD */}
          <FormRow>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              <TermsText>Remember me</TermsText>
            </CheckboxContainer>

            <ForgotPassword onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </ForgotPassword>
          </FormRow>

          {error && (
            <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "8px" }}>
              {error}
            </p>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Get Started"}
          </SubmitButton>

          <LoginText $compact>
            New organisation?{" "}
            <LoginLink onClick={() => navigate("/register-admin")}>
              Sign up
            </LoginLink>
          </LoginText>

          <Divider>
            <DividerLine />
            <DividerText>OR</DividerText>
            <DividerLine />
          </Divider>

          <SocialIcons>
            <SocialIcon $google>
              <FaGoogle />
            </SocialIcon>
            <SocialIcon $facebook>
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon $apple>
              <FaApple />
            </SocialIcon>
          </SocialIcons>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default LoginAdmin;
