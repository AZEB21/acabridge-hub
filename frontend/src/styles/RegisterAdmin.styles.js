import styled from "styled-components";

export const PageContainer = styled.div`
  min-height: 100vh;
  background: #f4f7fa;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  padding: 20px;

  @media (max-width: 480px) {
  padding: 12px;
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
`;

export const Card = styled.div`
  width: 100%;
  max-width: 460px;

  background: #ffffff;
  border-radius: 14px;

  padding: 28px;

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
`;

export const Title = styled.h2`
  margin: 0;

  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const Subtitle = styled.p`
  margin-top: 4px;
  margin-bottom: 20px;

  font-size: 12px;
  color: #8b95a7;

  @media (max-width: 480px) {
  font-size: 13px;
}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Row = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: #374151;

  margin-bottom: 6px;
`;

export const Input = styled.input`
  height: 38px;

  border: 1px solid #d8dde6;
  border-radius: 6px;

  padding: 0 12px;

  font-size: 12px;
  color: #111827;

  outline: none;

  &:focus {
    border-color: #00b7c2;
  }

  &::placeholder {
    color: #a3acba;
  }
`;

export const Select = styled.select`
  height: 38px;

  border: 1px solid #d8dde6;
  border-radius: 6px;

  padding: 0 12px;

  font-size: 12px;
  color: #111827;

  background: white;
  outline: none;

  &:focus {
    border-color: #00b7c2;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Checkbox = styled.input`
  cursor: pointer;
`;

export const TermsText = styled.span`
  font-size: 11px;
  color: #7b8794;

  @media (max-width: 480px) {
  font-size: 13px;
}
`;

export const TermsLink = styled.span`
  color: #00b7c2;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  height: 40px;

  border: none;
  border-radius: 6px;

  background: #082b73;
  color: white;

  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    opacity: 0.95;
  }

  @media (max-width: 480px) {
  height: 44px;
}
`;

export const LoginText = styled.p`
  text-align: center;

  margin: 0;

  font-size: 11px;
  color: #7b8794;

  @media (max-width: 480px) {
  font-size: 13px;
}
`;

export const LoginLink = styled.a`
  color: #00b7c2;
  text-decoration: none;
  font-weight: 500;
`;