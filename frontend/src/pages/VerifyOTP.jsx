import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP, resendOTP } from "../api/auth";
import {
  Container, Card, Header, Logos, BackButton,
  Title, Subtitle, Button, ErrorMsg, SuccessMsg,
  OTPRow, OTPBox, ResendRow,
} from "../styles/Onboarding.styles.jsx";
import LogoImg from "../assets/Logo.PNG";

export default function VerifyOTP() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(29);
  const [loading, setLoading] = useState(false);
  const refs = useRef([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("pending_email") || "";

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      refs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) { setError("Enter the full 6-digit code."); return; }
    setError("");
    setLoading(true);
    try {
      const { data } = await verifyOTP(email, code);
      localStorage.setItem("access_token", data.tokens.access);
      localStorage.setItem("refresh_token", data.tokens.refresh);
      localStorage.removeItem("pending_email");
      navigate("/onboarding/profile");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    try {
      await resendOTP(email);
      setCountdown(29);
      setDigits(["", "", "", "", "", ""]);
      setSuccess("A new code has been sent to your email.");
      refs.current[0]?.focus();
    } catch {
      setError("Could not resend. Try again.");
    }
  };

  return (
    <Container>
      <Card>
        <Header>
          <Logos><img src={LogoImg} alt="AcaBridge logo" /></Logos>
        </Header>

        <BackButton onClick={() => navigate("/register")}>← Back</BackButton>

        <Title>Check your inbox</Title>
        <Subtitle>
          We sent a 6-digit code to <strong>{email}</strong>. Enter it below to verify your account.
        </Subtitle>

        <form onSubmit={handleSubmit}>
          <OTPRow onPaste={handlePaste}>
            {digits.map((d, i) => (
              <OTPBox
                key={i}
                ref={(el) => (refs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </OTPRow>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {success && <SuccessMsg>{success}</SuccessMsg>}
          <Button type="submit" disabled={loading}>
            {loading ? "Verifying…" : "Verify & continue"}
          </Button>
        </form>

        <ResendRow>
          {countdown > 0
            ? <span>Resend code in {countdown} seconds</span>
            : <button onClick={handleResend}>Resend code</button>
          }
        </ResendRow>
      </Card>
    </Container>
  );
}
