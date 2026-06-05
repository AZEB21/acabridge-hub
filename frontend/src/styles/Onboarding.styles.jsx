import styled from "styled-components";

/* Shared wrapper for all onboarding/auth pages */
export const Container = styled.div`
  min-height: 100vh;
  background: #f0eee9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
  padding: 20px;
`;

export const Card = styled.div`
  width: 420px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  @media (max-width: 480px) {
    width: 100%;
    padding: 24px 20px;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #0d2137;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { text-decoration: underline; }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export const Logos = styled.div`
  display: flex;
  align-items: center;
  img { width: 120px; height: auto; }
`;

export const Title = styled.h2`
  margin: 0;
  color: #0d2137;
`;

export const Subtitle = styled.p`
  margin-top: 5px;
  margin-bottom: 20px;
  color: #666;
  line-height: 1.5;
`;

export const Label = styled.label`
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #0d2137; }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: white;
  cursor: pointer;
  &:focus { border-color: #0d2137; }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  &:focus { border-color: #0d2137; }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0d2137;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.88; }
`;

export const SkipButton = styled.button`
  width: 100%;
  padding: 12px;
  background: none;
  color: #0d2137;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  &:hover { background: #f5f4ef; }
`;

export const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 8px 10px;
  background: #fef2f2;
  border-radius: 6px;
  border-left: 3px solid #dc2626;
`;

export const SuccessMsg = styled.p`
  color: #16a34a;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 8px 10px;
  background: #f0fdf4;
  border-radius: 6px;
  border-left: 3px solid #16a34a;
`;

/* OTP boxes */
export const OTPRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`;

export const OTPBox = styled.input`
  width: 48px;
  height: 56px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  color: #0d2137;
  outline: none;
  &:focus { border-color: #0d2137; }
`;

export const ResendRow = styled.div`
  text-align: center;
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  button {
    background: none;
    border: none;
    color: #0d2137;
    font-weight: 600;
    cursor: pointer;
    font-size: 13px;
    padding: 0;
    &:hover { text-decoration: underline; }
  }
`;

/* Step indicator */
export const StepBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

export const StepDot = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  background: ${({ $active, $done }) =>
    $done ? "#2ec4b6" : $active ? "#0d2137" : "#e0ddd8"};
  color: ${({ $active, $done }) => ($active || $done ? "#fff" : "#999")};
`;

export const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${({ $done }) => ($done ? "#2ec4b6" : "#e0ddd8")};
`;

/* Track selection card */
export const TrackCard = styled.div`
  border: 2px solid ${({ $selected }) => ($selected ? "#0d2137" : "#e0ddd8")};
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 10px;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? "#f0f4f8" : "#fff")};
  display: flex;
  align-items: center;
  gap: 12px;
  transition: border-color 0.15s;
  &:hover { border-color: #0d2137; }
`;

export const TrackRadio = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid ${({ $selected }) => ($selected ? "#0d2137" : "#ccc")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $selected }) => ($selected ? "#0d2137" : "transparent")};
  }
`;

export const LockedField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f5f4ef;
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
`;

/* Application status */
export const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize;
  background: ${({ $status }) => {
    if ($status === "accepted" || $status === "enrolled") return "#dcfce7";
    if ($status === "reviewed") return "#fef9c3";
    return "#e0f2fe";
  }};
  color: ${({ $status }) => {
    if ($status === "accepted" || $status === "enrolled") return "#16a34a";
    if ($status === "reviewed") return "#ca8a04";
    return "#0369a1";
  }};
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0eee9;
  font-size: 14px;
  &:last-child { border-bottom: none; }
  span:first-child { color: #666; }
  span:last-child { color: #0d2137; font-weight: 600; }
`;
