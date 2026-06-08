import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 620px;

  background: #ffffff;
  border-radius: 16px;

  padding: 24px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
    padding: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
`;

export const CloseButton = styled.button`
  width: 30px;
  height: 30px;

  border: none;
  border-radius: 50%;

  background: #f3f4f6;
  cursor: pointer;

  font-size: 14px;

  color: #dc2626; /* 🔴 texte rouge */

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #fee2e2; /* léger rouge clair */
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;

  span {
    color: red;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  padding: 0 14px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0b3d91;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  padding: 0 14px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #0b3d91;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;

  border: none;
  border-radius: 10px;

  background: #003d99;
  color: #ffffff;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
  margin-top: 8px;

  &:hover {
    opacity: 0.95;
  }
`;