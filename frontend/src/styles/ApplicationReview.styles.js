import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 999;
`;

export const Modal = styled.div`
  width: 700px;
  max-width: 92%;
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;

  border: 1px solid #dcdcdc;
  background: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.h3`
  margin-bottom: 28px;
  color: #1f2937;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Avatar = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  flex: 1;

  h3 {
    margin: 0;
    font-size: 18px;
  }

  p {
    margin: 3px 0;
    color: #6b7280;
    font-size: 14px;
  }
`;

export const Status = styled.div`
  background: #dff7df;
  color: #2e9b47;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 120px;
  margin-top: 28px;
`;

export const Label = styled.p`
  color: #9ca3af;
  font-size: 13px;
  margin-bottom: 4px;
`;

export const Value = styled.h4`
  margin: 0;
  color: #374151;
`;

export const Bio = styled.div`
  margin-top: 25px;

  p {
    margin-top: 8px;
    color: #4b5563;
  }
`;

export const Goals = styled.div`
  margin-top: 18px;

  p {
    margin-top: 8px;
    color: #4b5563;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 35px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  cursor: pointer;
  font-weight: 600;
`;

export const InfoButton = styled(Button)`
  background: #f2b600;
`;

export const RejectButton = styled(Button)`
  background: #ef4444;
`;

export const AcceptButton = styled(Button)`
  background: #22c55e;
`;