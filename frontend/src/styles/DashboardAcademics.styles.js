import styled from "styled-components";

/* ========== LAYOUT ========== */

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

/* ❌ SUPPRIMÉ AddProgramButton + AddCohortButton inutiles */

/* ========== CARD CONTAINER ========== */

export const ProgramsCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 18px;
`;

/* ========== FILTER ========== */

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

export const FilterButton = styled.button`
  padding: 8px 15px;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  background: ${({ active }) => (active ? "#0f3d8f" : "#e5e7eb")};
  color: ${({ active }) => (active ? "white" : "black")};
`;

/* ========== GRID ========== */

export const ProgramsGrid = styled.div`
  margin-top: 25px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* ========== CARD ========== */

export const ProgramCard = styled.div`
  border: 1px solid #edf0f4;
  border-radius: 12px;
  background: white;
`;

export const ProgramHeader = styled.div`
  padding: 15px;
  font-weight: 600;
`;

export const ProgramDescription = styled.div`
  padding: 0 15px 15px;
  font-size: 12px;
  color: #6b7280;
`;

export const ProgramStats = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #edf0f4;
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 11px;
    color: #9ca3af;
  }

  strong {
    margin-top: 5px;
  }
`;

/* ========== PROGRESS ========== */

export const ProgressSection = styled.div`
  padding: 15px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 7px;
  background: #e5e7eb;
  border-radius: 999px;
  margin: 10px 0;

  span {
    display: block;
    height: 100%;
    background: #34c759;
    border-radius: 999px;
  }
`;

/* ========== ACTIONS ========== */

export const CardActions = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
`;

export const EditButton = styled.button`
  border: 1px solid #dfe4ea;
  background: white;
  padding: 8px 15px;
  border-radius: 999px;
  cursor: pointer;
`;

export const ViewButton = styled.button`
  background: #0f3d8f;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 999px;
  cursor: pointer;
`;

/* ========== GLOBAL LAYOUT ========== */

export const PageWrapper = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  width: 240px;
  background: #ffffff;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* ⭐ important */
  height: 100vh;

  border-right: 1px solid #fffbfb;
`;

export const MainContent = styled.div`
  flex: 1;
  background: #f6f7fb;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  background: white;
`;

export const HeaderTitle = styled.h3``;

export const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
`;

export const Content = styled.div`
  padding: 20px;
`;

/* ========== SIDEBAR ITEMS ========== */

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: rgba(235, 225, 225, 0.1);
  }
`;

export const Logo = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

export const Logo2 = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

export const BottomLogo = styled.div`
  margin-top: auto; /* ⭐ pousse en bas */
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;


/* ========== HEADER ICONS ========== */

export const IconCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: red;
  color: white;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;