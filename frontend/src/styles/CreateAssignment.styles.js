import styled from "styled-components";

/* ===========================
            Overlay
=========================== */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  z-index: 999;
`;

/* ===========================
            Modal
=========================== */

export const Modal = styled.div`
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 18px;
  padding: 20px;
  box-sizing: border-box;

  max-height: 95vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* ===========================
            Header
=========================== */

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #111827;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #ef4444; /* rouge */

  font-size: 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #dc2626;
  }
`;

/* ===========================
             Form
=========================== */

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
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;

  span {
    color: red;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ===========================
         Inputs
=========================== */

export const Input = styled.input`
  width: 100%;
  height: 46px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  padding: 0 14px;
  box-sizing: border-box;

  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #0f3d8f;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 46px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  padding: 0 14px;
  box-sizing: border-box;

  outline: none;
  font-size: 14px;
  background: white;

  &:focus {
    border-color: #0f3d8f;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;

  border: 1px solid #d1d5db;
  border-radius: 10px;

  padding: 12px 14px;
  box-sizing: border-box;

  resize: none;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #0f3d8f;
  }
`;

/* ===========================
         Upload
=========================== */

export const UploadBox = styled.div`
  border: 1.5px dashed #d1d5db;
  border-radius: 12px;
  padding: 30px 20px;

  text-align: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    border-color: #0f3d8f;
    background: #f8fbff;
  }

  label {
    cursor: pointer;
    display: block;
  }
`;

export const UploadIcon = styled.div`
  margin-bottom: 12px;

  display: flex;
  justify-content: center;
  color: #0f3d8f;
`;

export const UploadText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0f3d8f;

  span {
    color: #6b7280;
    font-weight: 400;
  }
`;

export const UploadHint = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #9ca3af;
`;

/* ===========================
          Buttons
=========================== */

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;

  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DraftButton = styled.button`
  flex: 1;

  height: 48px;

  border: 1px solid #d1d5db;
  background: white;
  color: #0f3d8f;

  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;

  transition: 0.2s;

  &:hover {
    background: #f3f4f6;
  }
`;

export const PublishButton = styled.button`
  flex: 1;

  height: 48px;

  border: none;
  background: #0f3d8f;
  color: white;

  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;

  transition: 0.2s;

  &:hover {
    background: #0b2f70;
  }
`;