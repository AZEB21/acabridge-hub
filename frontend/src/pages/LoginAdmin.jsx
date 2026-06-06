import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../assets/Logo.PNG";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LoginAdmin data:", form);
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
          {/* EMAIL REQUIRED */}
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

          {/* PASSWORD REQUIRED */}
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

          {/* REMEMBER + FORGOT PASSWORD (SAME LINE) */}
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

          <SubmitButton type="submit">Get Started</SubmitButton>

          {/* SIGN UP closer to button */}
          <LoginText $compact>
            New organisation?{" "}
            <LoginLink onClick={() => navigate("/register-admin")}>
              Sign up
            </LoginLink>
          </LoginText>

          {/* DIVIDER OR */}
          <Divider>
            <DividerLine />
            <DividerText>OR</DividerText>
            <DividerLine />
          </Divider>

          {/* SOCIAL ICONS */}
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