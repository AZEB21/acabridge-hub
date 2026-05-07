import styled from "styled-components";

export const Container = styled.div`
 background: #f5f4ef;   
width: 100%;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 390px) {
    padding: 12px;
    gap: 14px;
  }

  @media (min-width: 1280px) {
    padding: 40px 80px;
    max-width: 1280px;
    margin: 0 auto;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logos = styled.h2`
  color: #0d2137;
`;

export const Avatar = styled.div`
  background: #0d2137;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Hero = styled.div`
  background: linear-gradient(135deg, #0d2137, #2ec4b6);
  color: white;
  padding: 30px;
  border-radius: 16px;
  margin-top: 25px;

  h2 {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 1280px) {
    padding: 40px;

    h2 {
      font-size: 32px;
    }
  }
`;

export const ProgressBar = styled.div`
  height: 6px;
  background: rgba(255,255,255,0.3);
  border-radius: 10px;
  margin-top: 10px;
`;

export const Progress = styled.div`
  height: 100%;
  width: 0%;
  background: white;
  border-radius: 10px;
`;


export const Stats = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const StatCard = styled.div`
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;

  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

export const Section = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  background: white;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  }
`;

export const Title = styled.h3`
  margin: 0;
  color: #0d2137;
`;

export const Small = styled.p`
  margin: 5px 0 0;
  color: gray;
  font-size: 14px;
`;

export const FooterLink = styled.div`
  text-align: center;
  margin-top: 25px;
  color: #0d2137;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;