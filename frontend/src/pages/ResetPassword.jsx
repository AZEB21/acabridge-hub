import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { forgotPassword } from "../api/auth";
import {
  Container,
  LeftSection,
  LeftContent,
  Logo,
  Title,
  Description,
  ReviewSection,
  Avatars,
  Rating,
  RightSection,
  Card,
  IconWrapper,
  Heading,
  Text,
  Label,
  Input,
  Button,
  BackLink,
  Required,
  Highlight,
  Blue,
  White,
  Star,
} from "../styles/ForgotPassword.styles";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
const handleSubmit = async () => {
  try {
    const res = await forgotPassword(email);
    console.log("SUCCESS:", res.data);
    alert("Reset email sent!");
  } catch (err) {
    console.log("ERROR FULL:", err);
    alert(
      err.response?.data?.error ||
      err.response?.data?.detail ||
      "Something went wrong"
    );
  }
};

  return (
    <Container>
      <LeftSection>
        <LeftContent>
          <Logo>
            <White>Aca</White>
            <Blue>Bridge</Blue>
          </Logo>

          <Title>
            Learn a <Highlight>Globally</Highlight> Recognised Skills
          </Title>

          <Description>
            Find the right tech track for you, build confidence in every
            lesson, and prepare to excel globally.
          </Description>

          <ReviewSection>
            <Avatars>
              <img src="https://i.pravatar.cc/40?img=1" alt="" />
              <img src="https://i.pravatar.cc/40?img=2" alt="" />
              <img src="https://i.pravatar.cc/40?img=3" alt="" />
              <img src="https://i.pravatar.cc/40?img=4" alt="" />
            </Avatars>

            <Rating>
              <Star>★★★★★</Star> 4.5
              <br />
              from 500+ Students Reviews
            </Rating>
          </ReviewSection>
        </LeftContent>
      </LeftSection>

      <RightSection>
        <Card>
          <IconWrapper>
            <FaCheck />
          </IconWrapper>

          <Heading>Forgot Your Password?</Heading>

          <Text>
            Enter your email address and we will send you instructions to reset
            your password.
          </Text>

          <Label>
            Email <Required>*</Required>
          </Label>

          <Input
            type="email"  value={email} placeholder="enter your email"
             onChange={(e) => setEmail(e.target.value)}
          />

          <Button onClick={handleSubmit}>Continue</Button>

          <BackLink to="/signin">← Back</BackLink>
        </Card>
      </RightSection>
    </Container>
  );
};

export default ForgotPassword;