import styled from "styled-components";

/* PAGE */
export const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f7fb;
  font-family: Arial, Helvetica, sans-serif;
`;

/* SIDEBAR */
export const Sidebar = styled.div`
  width: 240px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-right: 1px solid #eee;
`;

export const Logo = styled.img`
  width: 140px;
  margin-bottom: 20px;
`;

export const NavItem = styled.div`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.active ? "#0a66ff" : "#444")};
  background: ${(props) => (props.active ? "#e9f1ff" : "transparent")};

  display: flex;
  align-items: center;

  &:hover {
    background: #f0f4ff;
  }

  svg {
    font-size: 16px;
  }
`;

/* MAIN */
export const Main = styled.div`
  flex: 1;
  padding: 20px 30px;
  overflow-y: auto;
`;

/* TOP BAR */
export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 22px;
  }
`;

/* CARDS */
export const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 25px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Card = styled.div`
  background: white;
  padding: 18px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  display: flex;
  align-items: flex-start;
  gap: 12px;

  .cardIcon {
    font-size: 22px;
    color: #0a66ff;
    margin-top: 4px;
  }

  h3 {
    margin: 0;
    font-size: 24px;
  }

  p {
    margin: 5px 0 0;
    color: #777;
    font-size: 13px;
  }
`;

/* COHORT */
export const CohortSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .titleBlock {
    display: flex;
    flex-direction: column;
  }

  .subTitle {
    font-size: 12px;
    color: #0a66ff;
    font-weight: 600;
    margin-bottom: 4px;
  }

  h3 {
    margin: 0;
  }

  .actions {
    display: flex;
    gap: 10px;
  }
`;

/* EMPTY STATE */
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  h4 {
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
  }
`;

/* BUTTONS */
export const Button = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  display: inline-block;
  white-space: nowrap;
`;

export const PrimaryButton = styled.button`
  padding: 8px 12px;
  border: none;
   background: #082b73;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background: #0852cc;
  }
`;