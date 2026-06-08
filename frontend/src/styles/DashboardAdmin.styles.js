import styled from "styled-components";

/* PAGE */
export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100vh;
  background: #f5f7fb;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
`;

/* SIDEBAR */
export const Sidebar = styled.div`
  width: 240px;
  min-width: 240px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-right: 1px solid #f0f0f0;
  overflow-y: auto;
`;

export const Logo = styled.img`
  width: 140px;
  margin-bottom: 20px;
`;
export const Logo2 = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

export const NavItem = styled.div`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  display: flex;
  align-items: center;
  white-space: nowrap;

  background: #ffffff;
  color: ${({ $active }) => ($active ? "#072010" : "#444")};

  transition: all 0.2s ease;

  &:hover {
    color: #16a34a;
  }

  svg {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

/* MAIN */
export const Main = styled.div`
  flex: 1;
  padding: 24px 32px;
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

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
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

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      gap: 15px;
    }

    .actions {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
    }
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

  @media (max-width: 768px) {
    width: 100%;
  }
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BottomLogo = styled.div`
  margin-top: auto; /* ⭐ pousse en bas */
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;