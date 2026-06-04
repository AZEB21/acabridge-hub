import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FiEye, FiEyeOff } from "react-icons/fi";
import api from "../api/axios";
import { resetPassword } from "../api/auth";
import LogoImg from "../assets/Logo-register.PNG";
import HeroImg from "../assets/image.png";

/* ─── Shared two-pane layout (matches Register.jsx exactly) ─── */

const PageWrap = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
  background: #eef3f8;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const HeroPane = styled.section`
  min-height: 100vh;
  background-image: linear-gradient(to top, rgba(5, 9, 15, 0.82), rgba(5, 9, 15, 0.08)),
    url(${HeroImg});
  background-size: cover;
  background-position: center center;
  color: #fff;
  display: flex;
  align-items: flex-end;
  padding: 48px 38px;

  @media (max-width: 960px) {
    min-height: 320px;
    padding: 32px 20px;
  }
`;

const HeroContent = styled.div`
  width: 100%;
  max-width: 520px;
`;

const HeroBrand = styled.img`
  width: 145px;
  height: auto;
  margin-bottom: 18px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(26px, 3vw, 40px);
  line-height: 1.15;
  font-weight: 800;
  span { color: #f5c84c; }
`;

const HeroSub = styled.p`
  margin: 12px 0 18px;
  max-width: 420px;
  font-size: 15px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.82);
`;

const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ReviewAvatars = styled.div`
  display: flex;
  align-items: center;
  span {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.85);
    margin-left: -7px;
    background: linear-gradient(135deg, #f4c542, #2ec4b6);
    display: inline-block;
  }
  span:first-child { margin-left: 0; }
`;

const ReviewMeta = styled.div`
  font-size: 13px;
  color: rgba(255,255,255,0.9);
  strong { color: #f5c84c; margin-right: 4px; }
`;

/* ─── Right pane ─── */

const FormPane = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
  background: #eef3f8;

  @media (max-width: 960px) { padding: 24px 20px; }
`;

const Card = styled.div`
  width: min(100%, 420px);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 16px 48px rgba(13, 33, 55, 0.1);
  padding: 36px 32px 28px;
  text-align: center;

  @media (max-width: 960px) { width: 100%; }
`;

/* Green shield check icon */
const CheckIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #16a34a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0d2137;
  margin: 0 0 8px;
`;

const CardSub = styled.p`
  font-size: 13px;
  color: #667085;
  margin: 0 0 24px;
  line-height: 1.5;
`;

const FieldWrap = styled.div`
  text-align: left;
  margin-bottom: 14px;
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #2d3648;
  margin-bottom: 6px;
  span { color: #e5484d; }
`;

const Field = styled.input`
  width: 100%;
  height: 44px;
  border: 1.5px solid ${({ $hasError }) => ($hasError ? "#dc2626" : "#e4e7ec")};
  border-radius: 10px;
  background: #fff;
  padding: 0 44px 0 14px;
  font-size: 14px;
  color: #0d2137;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #0d2137;
    box-shadow: 0 0 0 3px rgba(13, 33, 55, 0.08);
  }

  &::placeholder { color: #98a2b3; }
`;

const PwWrap = styled.div`
  position: relative;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: #667085;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const PrimaryBtn = styled.button`
  width: 100%;
  height: 46px;
  border: 0;
  border-radius: 10px;
  background: #0d3b78;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 4px;
  transition: opacity 0.15s;

  &:disabled { opacity: 0.65; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.88; }
`;

const SecondaryBtn = styled.button`
  width: 100%;
  height: 44px;
  border: 1.5px solid #e4e7ec;
  border-radius: 10px;
  background: #f9fafb;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.15s;
  &:hover { background: #f3f4f6; }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #0d3b78;
  text-decoration: none;
  margin-top: 14px;
  &:hover { text-decoration: underline; }
`;

const ErrorMsg = styled.p`
  font-size: 13px;
  color: #dc2626;
  margin: 0 0 10px;
  text-align: left;
`;

/* ─── Success modal ─── */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 40px 36px 32px;
  text-align: center;
  width: min(90%, 380px);
  box-shadow: 0 24px 64px rgba(0,0,0,0.2);
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  color: #9ca3af;
  cursor: pointer;
  line-height: 1;
  &:hover { color: #374151; }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #0d2137;
  margin: 0 0 8px;
`;

const ModalSub = styled.p`
  font-size: 13px;
  color: #667085;
  margin: 0 0 24px;
  line-height: 1.5;
`;

/* ─── Shared green check SVG ─── */
function GreenCheck() {
  return (
    <CheckIcon>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </CheckIcon>
  );
}

/* ─── Left hero pane (reused across all 3 screens) ─── */
function HeroLeft() {
  return (
    <HeroPane>
      <HeroContent>
        <HeroBrand src={LogoImg} alt="AcaBridge" />
        <HeroTitle>
          Learn a <span>Globally</span> Recognised Skills
        </HeroTitle>
        <HeroSub>
          Find the right tech track for you, build confidence in every lesson,
          and prepare to excel globally.
        </HeroSub>
        <ReviewRow>
          <ReviewAvatars aria-hidden="true">
            <span /><span /><span /><span /><span />
          </ReviewAvatars>
          <ReviewMeta>
            <strong>★★★★½</strong> 4.5
            <br />
            from 500+ Student's Reviews
          </ReviewMeta>
        </ReviewRow>
      </HeroContent>
    </HeroPane>
  );
}

/* ════════════════════════════════════════════════════════
   SCREEN 1 — Forgot Password  (/forgot-password)
   ════════════════════════════════════════════════════════ */
export function ForgotPassword() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [devUrl, setDevUrl]   = useState("");   // shown locally when email isn't configured
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDevUrl("");
    setLoading(true);
    try {
      const { data } = await api.post("/forgot-password/", { email });
      sessionStorage.setItem("reset_email", email);
      // Backend sends dev_reset_url when DEBUG=True so you can test without email
      if (data?.dev_reset_url) {
        setDevUrl(data.dev_reset_url);
        sessionStorage.setItem("dev_reset_url", data.dev_reset_url);
      }
      navigate("/check-email");
    } catch (err) {
      const msg = err.response?.data?.error || err.response?.data?.detail || "";
      if (msg) {
        setError(msg);
      } else {
        // Always navigate — backend never reveals whether email exists
        sessionStorage.setItem("reset_email", email);
        navigate("/check-email");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap>
      <HeroLeft />
      <FormPane>
        <Card>
          <GreenCheck />
          <CardTitle>Forgot Your Password?</CardTitle>
          <CardSub>
            Enter your email address and we will send you instructions to reset
            your password.
          </CardSub>

          <form onSubmit={handleSubmit}>
            <FieldWrap>
              <Label>Email <span>*</span></Label>
              <Field
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                $hasError={!!error}
              />
            </FieldWrap>

            {error && <ErrorMsg>{error}</ErrorMsg>}

            <PrimaryBtn type="submit" disabled={loading || !email}>
              {loading ? "Sending…" : "Continue"}
            </PrimaryBtn>
          </form>

          <div style={{ marginTop: 14 }}>
            <BackLink to="/signin">← Back</BackLink>
          </div>
        </Card>
      </FormPane>
    </PageWrap>
  );
}

/* ════════════════════════════════════════════════════════
   SCREEN 2 — Check Your Email  (/check-email)
   ════════════════════════════════════════════════════════ */
export function CheckEmail() {
  const [loading,  setLoading]  = useState(false);
  const [resent,   setResent]   = useState(false);
  const [devUrl,   setDevUrl]   = useState(sessionStorage.getItem("dev_reset_url") || "");
  const [copied,   setCopied]   = useState(false);
  const email = sessionStorage.getItem("reset_email") || "your email";

  const handleResend = async () => {
    setLoading(true);
    setResent(false);
    setDevUrl("");
    try {
      const { data } = await api.post("/forgot-password/", { email });
      if (data?.dev_reset_url) {
        setDevUrl(data.dev_reset_url);
        sessionStorage.setItem("dev_reset_url", data.dev_reset_url);
      }
      setResent(true);
    } catch {
      setResent(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(devUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <PageWrap>
      {/* Dev-mode popup — shows reset link when email isn't configured locally */}
      {devUrl && (
        <Overlay onClick={() => setDevUrl("")}>
          <Modal onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <CloseBtn onClick={() => setDevUrl("")} aria-label="Close">×</CloseBtn>
            <GreenCheck />
            <ModalTitle style={{ fontSize: 15, marginBottom: 6 }}>🔗 Dev: Reset link</ModalTitle>
            <p style={{ fontSize: 12, color: "#667085", wordBreak: "break-all", margin: "0 0 16px", lineHeight: 1.5 }}>
              {devUrl}
            </p>
            <PrimaryBtn onClick={handleCopy}>
              {copied ? "✓ Copied!" : "Copy link"}
            </PrimaryBtn>
            <SecondaryBtn onClick={() => setDevUrl("")} style={{ marginTop: 8 }}>
              Close
            </SecondaryBtn>
          </Modal>
        </Overlay>
      )}

      <HeroLeft />
      <FormPane>
        <Card>
          <GreenCheck />
          <CardTitle>Check Your Email</CardTitle>
          <CardSub>
            Please check the email address <strong>{email}</strong> for
            instructions to reset your password.
          </CardSub>

          {resent && (
            <p style={{ fontSize: 13, color: "#16a34a", marginBottom: 10 }}>
              Email resent successfully.
            </p>
          )}

          <SecondaryBtn onClick={handleResend} disabled={loading}>
            {loading ? "Sending…" : "Resend mail"}
          </SecondaryBtn>

          <div style={{ marginTop: 14 }}>
            <BackLink to="/signin">← Back to login</BackLink>
          </div>
        </Card>
      </FormPane>
    </PageWrap>
  );
}

/* ════════════════════════════════════════════════════════
   SCREEN 3 — Reset Password  (/reset-password/:uid/:token)
   ════════════════════════════════════════════════════════ */
export function ResetPassword() {
  const { uid, token } = useParams();
  const navigate       = useNavigate();

  const [password,        setPassword]        = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw,          setShowPw]          = useState(false);
  const [showConfirm,     setShowConfirm]     = useState(false);
  const [loading,         setLoading]         = useState(false);
  const [error,           setError]           = useState("");
  const [showSuccess,     setShowSuccess]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(uid, token, password, confirmPassword);
      setShowSuccess(true);
    } catch (err) {
      const d = err.response?.data;
      setError(
        d?.error ||
        d?.detail ||
        d?.password?.[0] ||
        "Invalid or expired reset link. Please request a new one."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap>
      <HeroLeft />

      <FormPane>
        <Card style={{ filter: showSuccess ? "blur(2px)" : "none" }}>
          <GreenCheck />
          <CardTitle>Reset password</CardTitle>

          <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: 20 }}>
            <FieldWrap>
              <Label>Password <span>*</span></Label>
              <PwWrap>
                <Field
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  $hasError={!!error}
                />
                <ToggleBtn
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  aria-label="Toggle password visibility"
                >
                  {showPw ? <FiEyeOff /> : <FiEye />}
                </ToggleBtn>
              </PwWrap>
            </FieldWrap>

            <FieldWrap>
              <Label>Confirm Password <span>*</span></Label>
              <PwWrap>
                <Field
                  type={showConfirm ? "text" : "password"}
                  placeholder="12367890"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  $hasError={!!error}
                />
                <ToggleBtn
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </ToggleBtn>
              </PwWrap>
            </FieldWrap>

            {error && <ErrorMsg>{error}</ErrorMsg>}

            <PrimaryBtn type="submit" disabled={loading}>
              {loading ? "Resetting…" : "Continue"}
            </PrimaryBtn>
          </form>

          <div style={{ textAlign: "center", marginTop: 14 }}>
            <BackLink to="/signin">← Back to login</BackLink>
          </div>
        </Card>
      </FormPane>

      {/* ── Success modal ── */}
      {showSuccess && (
        <Overlay>
          <Modal role="dialog" aria-modal="true" aria-labelledby="success-title">
            <CloseBtn onClick={() => navigate("/signin")} aria-label="Close">×</CloseBtn>
            <GreenCheck />
            <ModalTitle id="success-title">Successful!!</ModalTitle>
            <ModalSub>
              Your password has successfully been reset. Kindly login to proceed
              to the dashboard
            </ModalSub>
            <PrimaryBtn onClick={() => navigate("/signin")}>
              Login to Account
            </PrimaryBtn>
          </Modal>
        </Overlay>
      )}
    </PageWrap>
  );
}

/* Default export = ForgotPassword (the entry point imported in App.jsx) */
export default ForgotPassword;
