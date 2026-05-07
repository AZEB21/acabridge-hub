import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #f5f4ef;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  padding: 20px;
`;

export const Card = styled.div`
  background: white;
  padding: 35px;
  border-radius: 18px;
  width: 100%;
  max-width: 420px;

  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.12);
  }
`;

export const TopIcon = styled.div`
  width: 70px;
  height: 70px;
  background: #2ec4b6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px auto;
`;

export const Title = styled.h3`
  margin: 20px 0;
  color: #6b7280;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const HeaderText = styled.div`
  text-align: center;
    margin-bottom: 20px;

  h2 {
    margin: 10px 0 5px;
    color: #0d2137;
  }

  p {
    color: gray;
    font-size: 14px;
  }
`;

export const Step = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  position: relative;
`;

export const StepNumber = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "#2ec4b6" : "#ddd")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  z-index: 2;
`;

export const StepLine = styled.div`
  position: absolute;
  top: 26px;
  left: 12px;
  width: 2px;
  height: 40px;
  background: #ddd;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ButtonPrimary = styled.button`
  width: 100%;
  margin-top: 15px;
  padding: 12px;
  background: #0d2137;
  color: white;
  border: none;
  border-radius: 10px;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #1b2f4a;
    transform: translateY(-2px);
  }
`;

export const ButtonSecondary = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;

  color: #0d2137;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #f3f4f6;
    transform: translateY(-2px);
  }

  svg {
    color: #0d2137;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const FooterText = styled.div`
  text-align: center;
  margin-top: 18px;
  color: #0d2137;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;