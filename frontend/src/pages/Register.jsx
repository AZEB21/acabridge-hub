import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../api/auth";
import LogoImg from "../assets/Logo-register.PNG";
import HeroImg from "../assets/image.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  background-image: linear-gradient(to top, rgba(5, 9, 15, 0.82), rgba(5, 9, 15, 0.08)), url(${HeroImg});
  background-size: cover;
  background-position: center center;
  color: #fff;
  display: flex;
  align-items: flex-end;
  padding: 48px 38px;

  @media (max-width: 960px) {
    min-height: 420px;
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
  font-size: clamp(28px, 3vw, 42px);
  line-height: 1.1;
  font-weight: 800;

  span {
    color: #f5c84c;
  }
`;

const HeroSub = styled.p`
  margin: 14px 0 0;
  max-width: 460px;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.86);
`;

const HeroReviews = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  color: #fff;
  flex-wrap: wrap;
`;

const ReviewAvatars = styled.div`
  display: flex;
  align-items: center;

  span {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.85);
    margin-left: -6px;
    background: linear-gradient(135deg, #f4c542, #2ec4b6);
  }

  span:first-child {
    margin-left: 0;
  }
`;

const ReviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  flex-wrap: wrap;

  strong {
    color: #f5c84c;
    font-size: 15px;
  }
`;

const FormPane = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 28px;

  @media (max-width: 960px) {
    padding: 20px;
  }
`;

const FormCard = styled.div`
  width: min(100%, 460px);
  background: #fff;
  border-radius: 26px;
  box-shadow: 0 18px 50px rgba(13, 33, 55, 0.12);
  padding: 28px 28px 24px;

  @media (max-width: 960px) {
    width: 100%;
  }
`;

const FormTitle = styled.h2`
  margin: 0;
  font-size: 22px;
  line-height: 1.2;
  color: #0d2137;
`;

const FormSub = styled.p`
  margin: 4px 0 22px;
  font-size: 13px;
  color: #667085;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #2d3648;

  span {
    color: #e5484d;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const PhoneInputWrap = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  border: 1px solid #e4e7ec;
  border-radius: 10px;
  padding: 0 12px;
  margin-bottom: 14px;
  background: #fff;

  &:focus-within {
    border-color: #0d2137;
    box-shadow: 0 0 0 3px rgba(13, 33, 55, 0.08);
  }
`;

const CountryCode = styled.select`
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: #0d2137;
  margin-right: 8px;
  cursor: pointer;
`;

const PhoneInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #0d2137;

  &::placeholder {
    color: #98a2b3;
  }
`;

const PasswordWrap = styled.div`
  position: relative;
  margin-bottom: 14px;
`;
const Field = styled.input`
  width: 100%;
  height: 42px;
  border: 1px solid #e4e7ec;
  border-radius: 10px;
  background: #fff;
  padding: 0 12px;
  margin-bottom: 14px;
  font-size: 14px;
  color: #0d2137;
  outline: none;

  &:focus {
    border-color: #0d2137;
    box-shadow: 0 0 0 3px rgba(13, 33, 55, 0.08);
  }

  &::placeholder {
    color: #98a2b3;
  }
`; 
const PasswordField = styled(Field)`
  margin-bottom: 0;
  padding-right: 48px;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: #667085;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
`;



const CheckboxRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: #667085;
  margin: 2px 0 18px;

  input {
    margin-top: 2px;
  }

  a {
    color: #2ec4b6;
    text-decoration: none;
    font-weight: 600;
  }
`;

const ErrorMsg = styled.p`
  margin: 0 0 14px;
  color: #dc2626;
  font-size: 13px;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: #0d3b78;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FooterNote = styled.p`
  margin: 12px 0 0;
  text-align: center;
  font-size: 12px;
  color: #6b7280;

  a {
    color: #2ec4b6;
    text-decoration: none;
    font-weight: 700;
  }
`;

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "+1",
    phone_number: "",
    password: "",
    confirm_password: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.agree) {
      setError("You must agree to the Terms and Privacy Policy.");
      return;
    }

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    const full_name = `${form.first_name} ${form.last_name}`.trim();
    if (!full_name) {
      setError("Please enter your first and last name.");
      return;
    }

    const phone_number = `${form.country_code} ${form.phone_number}`.trim();

    setLoading(true);
    try {
      const { data } = await register({
        full_name,
        email: form.email,
        phone_number,
        password: form.password,
        confirm_password: form.confirm_password,
      });
      localStorage.setItem("pending_email", form.email);
      if (data?.dev_otp) localStorage.setItem("dev_otp", data.dev_otp);
      navigate("/verify-otp");
    } catch (err) {
      const d = err.response?.data;
      if (!err.response) {
        setError("Network error — cannot reach the server.");
        return;
      }
      setError(
        d?.email?.[0] ||
        d?.password?.[0] ||
        d?.full_name?.[0] ||
        d?.confirm_password?.[0] ||
        d?.non_field_errors?.[0] ||
        d?.detail ||
        `Error ${err.response.status}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrap>
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
          <HeroReviews>
            <ReviewAvatars aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </ReviewAvatars>
            <ReviewMeta>
              <strong>+5</strong>
              <strong>4.5</strong>
              <span>from 500+ Student’s Reviews</span>
            </ReviewMeta>
          </HeroReviews>
        </HeroContent>
      </HeroPane>

      <FormPane>
        <FormCard>
          <FormTitle>Create your AcaBridge Account</FormTitle>
          <FormSub>Your learning journey starts here.</FormSub>

          <form onSubmit={handleSubmit}>
            <Row>
              <div>
                <Label>First Name <span>*</span></Label>
                <Field
                  type="text"
                  placeholder="Anabel"
                  value={form.first_name}
                  onChange={set("first_name")}
                  required
                />
              </div>
              <div>
                <Label>Last Name <span>*</span></Label>
                <Field
                  type="text"
                  placeholder="Mercy"
                  value={form.last_name}
                  onChange={set("last_name")}
                  required
                />
              </div>
            </Row>

            <Row>
              <div>
                <Label>Email Address <span>*</span></Label>
                <Field
                  type="email"
                  placeholder="example@gmail.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                />
              </div>
              <div>
                <Label>Phone Number <span>*</span></Label>
              <PhoneInputWrap>
  <CountryCode
    value={form.country_code}
    onChange={set("country_code")}
    aria-label="Country code"
  >
    <option value="+1">🇺🇸 +1</option>
    <option value="+44">🇬🇧 +44</option>
    <option value="+234">🇳🇬 +234</option>
    <option value="+251">🇪🇹 +251</option>
    <option value="+256">🇺🇬 +256</option>
    <option value="+27">🇿🇦 +27</option>
  </CountryCode>

  <PhoneInput
    type="tel"
    placeholder="908 765 4321"
    value={form.phone_number}
    onChange={set("phone_number")}
    required
  />
</PhoneInputWrap>
              </div>
            </Row>

            <Label>Password <span>*</span></Label>
            <PasswordWrap>
              <PasswordField
                type={showPassword ? "text" : "password"}
                placeholder="create password"
                value={form.password}
                onChange={set("password")}
                required
              />
              <ToggleBtn type="button" onClick={() => setShowPassword((current) => !current)} aria-label="Toggle password visibility">
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </ToggleBtn>
            </PasswordWrap>

            <Label>Confirm Password <span>*</span></Label>
            <PasswordWrap>
              <PasswordField
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirm_password}
                onChange={set("confirm_password")}
                required
              />
              <ToggleBtn type="button" onClick={() => setShowConfirmPassword((current) => !current)} aria-label="Toggle confirm password visibility">
               {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </ToggleBtn>
            </PasswordWrap>

            <CheckboxRow>
              <input type="checkbox" checked={form.agree} onChange={set("agree")} />
              <span>
                I agree with the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
              </span>
            </CheckboxRow>

            {error && <ErrorMsg>{error}</ErrorMsg>}

            <SubmitBtn type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </SubmitBtn>

            <FooterNote>
              Already have an account? <Link to="/signin">Login</Link>
            </FooterNote>
          </form>
        </FormCard>
      </FormPane>
    </PageWrap>
  );
}

