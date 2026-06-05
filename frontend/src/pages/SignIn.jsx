import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../api/auth";
import {
  Container, Card, Header, Logos, Redirection,
  Title, Subtitle, Label, Input, Options, Button, Footer,
  BackButton, ErrorMsg,
} from "../styles/SignIn.styles.jsx";
import LogoImg from "../assets/Logo.PNG";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unverified, setUnverified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUnverified(false);
    setLoading(true);
    try {
      const { data } = await signIn(email, password);
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
      if (data.user) {
        localStorage.setItem("user_full_name", data.user.full_name || "");
        localStorage.setItem("user_email", data.user.email || "");
      }
      navigate("/dashboard/student");
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.detail || "";
      if (err.response?.status === 403 || msg.toLowerCase().includes("verify")) {
        setUnverified(true);
        localStorage.setItem("pending_email", email);
      } else {
        setError(msg || "Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <Logos>
            <img src={LogoImg} alt="AcaBridge logo" />
          </Logos>
          <Redirection as={Link} to="/register">
            Create account
          </Redirection>
        </Header>

        <BackButton onClick={() => navigate("/")}>← Back</BackButton>

        <Title>Welcome back</Title>
        <Subtitle>Sign in to continue your learning journey.</Subtitle>

        <form onSubmit={handleSubmit}>
          <Label>Email address</Label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Options>
            <label><input type="checkbox" /> remember me</label>
<Link
  to="/forgot-password"
  style={{ color: "#0d2137", textDecoration: "none" }}
>
  Forgot password?
</Link>          </Options>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          {unverified && (
            <ErrorMsg>
              Your email is not verified.{" "}
              <span
                onClick={() => navigate("/verify-otp")}
                style={{ color: "#0d2137", fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}
              >
                Verify now →
              </span>
            </ErrorMsg>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <Footer>
          New to AcaBridge? <Link to="/register">Create an account</Link>
        </Footer>
      </Card>
    </Container>
  );
}
