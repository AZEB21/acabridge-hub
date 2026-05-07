/* Shared styles for the 5-step onboarding flow */
import styled from "styled-components";

export const PageWrap = styled.div`
  min-height: 100vh;
  background: #f5f4ef;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

/* ── Top bar ── */
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px 0;
`;

export const TopLogo = styled.img`
  width: 100px;
  height: auto;
`;

export const StepLabel = styled.span`
  font-size: 12px;
  color: #aaa;
`;

/* ── Teal progress line ── */
export const ProgressLine = styled.div`
  height: 3px;
  background: #e8e6e1;
  margin-top: 10px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $pct }) => $pct || "0%"};
    background: #2ec4b6;
    transition: width 0.3s ease;
  }
`;

/* ── Scrollable content area ── */
export const Content = styled.div`
  flex: 1;
  padding: 20px 20px 40px;
  max-width: 390px;
  width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 660px;
    padding: 28px 40px 40px;
  }
`;

export const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  color: #555;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover { color: #0d2137; }
`;

export const Badge = styled.span`
  display: inline-block;
  background: #e8f5f4;
  color: #2ec4b6;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 14px;
  letter-spacing: 0.03em;
`;

export const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 800;
  color: #0d2137;
  margin: 0 0 6px;

  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

export const PageSub = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 24px;
  line-height: 1.5;
`;

export const Label = styled.label`
  display: block;
  font-size: 13px;
  color: #444;
  margin-bottom: 5px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #0d2137;
  background: #fff;
  outline: none;
  margin-bottom: 14px;
  font-family: Arial;
  &:focus { border-color: #0d2137; }
  &::placeholder { color: #bbb; }
`;

export const Select = styled.select`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #0d2137;
  background: #fff;
  outline: none;
  margin-bottom: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  &:focus { border-color: #0d2137; }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #0d2137;
  background: #fff;
  outline: none;
  resize: vertical;
  min-height: 90px;
  margin-bottom: 4px;
  font-family: Arial;
  &:focus { border-color: #0d2137; }
  &::placeholder { color: #bbb; }
`;

export const CharCount = styled.p`
  font-size: 11px;
  color: #bbb;
  text-align: right;
  margin: 0 0 14px;
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const PrimaryBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: #0d2137;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  font-family: Arial;
  &:disabled { opacity: 0.55; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.88; }
`;

export const GhostBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: none;
  color: #0d2137;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 6px;
  font-family: Arial;
  &:hover { text-decoration: underline; }
`;

export const ErrorMsg = styled.p`
  font-size: 13px;
  color: #dc2626;
  margin-bottom: 10px;
`;

/* ── Locked cohort field ── */
export const LockedField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f0f4f8;
  font-size: 14px;
  color: #0d2137;
  margin-bottom: 6px;
  font-weight: 500;
`;

/* ── Photo circle ── */
export const PhotoCircle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #eef0f5;
  border: 1.5px solid #dde0e8;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  margin: 0 auto 8px;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const PhotoLabel = styled.p`
  text-align: center;
  font-size: 12px;
  color: #aaa;
  margin-bottom: 20px;
`;
