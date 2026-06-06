import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP, resendOTP } from "../api/auth";
import styled from "styled-components";
import {
  Container, Card, Header, Logos, BackButton,
  Title, Subtitle, Button, ErrorMsg, SuccessMsg,
  OTPRow, OTPBox, ResendRow,
} from "../styles/Onboarding.styles.jsx";
import LogoImg from "../assets/Logo.PNG";

/* ── OTP popup overlay — commented out, OTP now goes to real email ──
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 32px 28px;
  max-width: 340px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
`;

const PopupTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
`;

const OTPDisplay = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #0d2137;
  letter-spacing: 0.2em;
  background: #f5f4ef;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 20px;
  cursor: pointer;
  user-select: all;
  &:hover { background: #eceae4; }
`;

const CopyBtn = styled.button`
  width: 100%;
  padding: 12px;
  background: #0d2137;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover { opacity: 0.88; }
`;

const DismissBtn = styled.button`
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  font-size: 13px;
  color: #888;
  cursor: pointer;
  &:hover { color: #0d2137; }
`;
── end popup styles ── */

export default function VerifyOTP() {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(29);
  const [loading, setLoading] = useState(false);
  // const [devOtp, setDevOtp] = useState(null);     // dev popup — disabled, OTP goes to real email
  // const [popupOpen, setPopupOpen] = useState(false);
  // const [copied, setCopied] = useState(false);
  const refs = useRef([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("pending_email") || "";

  // dev popup disabled — OTP is now sent to the user's real email via Brevo
  // useEffect(() => {
  //   const otp = localStorage.getItem("dev_otp");
  //   if (otp) {
  //     setDevOtp(otp);
  //     setPopupOpen(true);
  //     localStorage.removeItem("dev_otp");
  //   }
  // }, []);

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

  // dev popup handlers — disabled
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(devOtp).then(() => {
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   });
  // };
  // const handleDismiss = () => {
  //   setPopupOpen(false);
  //   refs.current[0]?.focus();
  // };

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
      if (data.user) {
        localStorage.setItem("user_full_name", data.user.full_name || "");
        localStorage.setItem("user_email", data.user.email || "");
      }
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
      const { data } = await resendOTP(email);
      setCountdown(29);
      setDigits(["", "", "", "", "", ""]);
      // dev popup disabled — re-enable these lines if you need to test without email:
      // if (data?.dev_otp) { setDevOtp(data.dev_otp); setPopupOpen(true); }
      if (!data?.dev_otp) {
        setSuccess("A new code has been sent.");
      }
      refs.current[0]?.focus();
    } catch {
      setError("Could not resend. Try again.");
    }
  };

  return (
    <>
      {/* OTP dev popup — commented out, OTP goes to real email now
      {popupOpen && devOtp && (
        <Overlay onClick={handleDismiss}>
          <Popup onClick={(e) => e.stopPropagation()}>
            <PopupTitle>🔐 Your verification code</PopupTitle>
            <OTPDisplay onClick={handleCopy}>{devOtp}</OTPDisplay>
            <CopyBtn onClick={handleCopy}>
              {copied ? "✓ Copied!" : "Copy code"}
            </CopyBtn>
            <DismissBtn onClick={handleDismiss}>Close and enter manually</DismissBtn>
          </Popup>
        </Overlay>
      )}
      */}

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
    </>
  );
}
