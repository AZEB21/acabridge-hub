import styled from "styled-components";
import { Link } from "react-router-dom";
import imagegirl from "../assets/imagegirl.PNG";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;

  @media (max-width: 768px) {
  flex-direction: column;
}
`;

export const LeftSection = styled.div`
  flex: 1;
  position: relative;
  background: url(${imagegirl}) center/cover no-repeat;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.15)
    );
  }

  @media (max-width: 768px) {
  min-height: 40vh;
}
`;

export const LeftContent = styled.div`
  position: absolute;
  bottom: 40px;
  left: 25px;
  right: 25px;
  z-index: 2;
  color: white;
  max-width: 500px;

  @media (max-width: 768px) {
    left: 15px;
    bottom: 20px;
  }

  @media (max-width: 320px) {
    left: 10px;
    right: 10px;
    bottom: 15px;
  }
`;

export const Logo = styled.h2`
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: 700;

  span {
    color: #00d4ff;
  }
`;

export const Title = styled.h1`
  font-size: 42px;
  line-height: 1.2;
  margin-bottom: 15px;
  word-wrap: break-word;

  span {
    color: #f9b233;
  }

   @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 320px) {
    font-size: 22px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
`;

export const ReviewSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
`;

export const Avatars = styled.div`
  display: flex;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid white;
    margin-left: -10px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export const Rating = styled.div`
  font-size: 14px;
`;

export const RightSection = styled.div`
  flex: 1;
  background: #f4f7fc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 320px) {
  padding: 10px;
}
`;

export const Card = styled.div`
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 45px;
  border-radius: 20px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.08);
`;

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: #e8f8eb;
  color: #22c55e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
  font-size: 28px;
`;

export const Heading = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  color: #1f2937;
`;

export const Text = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  margin-bottom: 20px;

  &:focus {
    border-color: #123b85;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: #0d3b8c;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

// export const BackLink = styled.button`
//   margin-top: 15px;
//   width: 100%;
//   border: none;
//   background: transparent;
//   color: #3b82f6;
//   cursor: pointer;
// `;

export const BackLink = styled(Link)`
  margin-top: 15px;
  width: 100%;
  display: block;
  text-align: center;
  color: #3b82f6;
  text-decoration: none;
`;

export const Required = styled.span`
  color: red;
`;

export const Highlight = styled.span`
  color: #f9b233;
`;

export const Blue = styled.span`
  color: #00d4ff;
`;

export const White = styled.span`
  color: white;
`;

export const Star = styled.span`
  color: #f9b233;
`;