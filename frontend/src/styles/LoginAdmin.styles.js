import styled from "styled-components";

/* Page wrapper */
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f6f8fb;
  padding: 20px;

   @media (max-width: 600px) {
    padding: 16px;
    justify-content: flex-start;
    padding-top: 90px;
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  top: 28px;
  left: 32px;

  @media (max-width: 600px) {
  top: 16px;
  left: 16px;
}
`;

export const Logo = styled.img`
  height: 40px;

   @media (max-width: 600px) {
    height: 32px;
  }
`;


/* Card */
export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

    @media (max-width: 600px) {
    padding: 20px;
    border-radius: 10px;
  }
`;

/* Titles */
export const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2d3d;

    @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const Subtitle = styled.p`
  margin-top: 8px;
  margin-bottom: 25px;
  font-size: 14px;
  color: #6b7a90;

    @media (max-width: 600px) {
    font-size: 13px;
    margin-bottom: 18px;
  }
`;

/* Form */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Label = styled.label`
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #344054;
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }

   @media (max-width: 600px) {
    font-size: 13px;
    padding: 11px;
  }
`;

/* Checkbox */
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Checkbox = styled.input`
  margin-right: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

export const TermsText = styled.span`
  font-size: 13px;
  color: #667085;
`;

/* Button */
export const SubmitButton = styled.button`
  padding: 12px;
  background: #082b73;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.95;
  }

  &:active {
    transform: scale(0.98);
  }

    @media (max-width: 600px) {
    font-size: 14px;
    padding: 11px;
  }
`;


/* Sign up closer option */
export const LoginText = styled.p`
  margin-top: ${({ $compact }) => ($compact ? "10px" : "18px")};
  font-size: 13px;
  text-align: center;
  color: #667085;
`;


export const LoginLink = styled.span`
  color: #4f46e5;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;


export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

    @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ForgotPassword = styled.span`
  font-size: 13px;
  color: #4f46e5;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: #d0d5dd;
`;

export const DividerText = styled.span`
  margin: 0 10px;
  font-size: 12px;
  color: #98a2b3;
  font-weight: 600;
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;


export const SocialIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #d0d5dd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  transition: 0.2s;

  color: ${({ $google, $facebook, $apple }) =>
    $google ? "#DB4437" :
    $facebook ? "#1877F2" :
    $apple ? "#000000" :
    "#344054"};

  &:hover {
    transform: translateY(-2px);
    background: ${({ $google, $facebook, $apple }) =>
      $google ? "#fdecec" :
      $facebook ? "#e8f0fe" :
      $apple ? "#f2f2f2" :
      "#f2f4f7"};
  }
`;