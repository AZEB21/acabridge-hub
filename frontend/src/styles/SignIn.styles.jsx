import styled from "styled-components";

export const Container  = styled.div `
min-height : 100vh;
background : #f0eee9;
display: flex ;
justify-content : center;
align-items : center;
font-family : Arial;
`;

export const Card = styled.div`
  width: 420px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const Logos = styled.div`
  display :flex;
  align-items: center;

  img{
  width:120px;
  height :auto;}
`;

export const Redirection = styled.a`
  color: #0d2137;
  font-size: 14px;
  text-decoration: none;
`;

export const Title = styled.h2`
  margin: 0;
  color: #0d2137;
`;

export const Subtitle = styled.p`
  margin-top: 5px;
  margin-bottom: 20px;
  color: #666;
`;

export const Label = styled.label`
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

/* OPTIONS */
export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #0d2137;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

/* FOOTER */
export const Footer = styled.p`
  margin-top: 20px;
  font-size: 13px;
  text-align: center;
  color: #666;
  a {
    color: #0d2137;
    text-decoration: none;
    font-weight: 600;
    &:hover { text-decoration: underline; }
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

export const ErrorMsg = styled.p`
  color: #dc2626;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 8px 10px;
  background: #fef2f2;
  border-radius: 6px;
  border-left: 3px solid #dc2626;
`;
