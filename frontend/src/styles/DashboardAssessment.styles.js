import styled from "styled-components";

/* ===========================
            Layout
=========================== */

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #eef2f7;

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;

/* ===========================
          Sidebar
=========================== */

export const Sidebar = styled.div`
  width: 240px;
  height: 100vh;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ececec;
`;

export const Logo = styled.img`
  width: 140px;
  margin-bottom: 25px;
`;

export const Logo2 = styled.img`
  width: 170px;
`;

export const BottomLogo = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 11px 12px;
  border-radius: 10px;

  cursor: pointer;
  font-size: 14px;
  color: ${({ $active }) => ($active ? "#00B894" : "#4B5563")};
  background: ${({ $active }) => ($active ? "#F4FFFB" : "transparent")};

  transition: 0.25s;

  &:hover {
    background: #f5f5f5;
    color: #00b894;
  }
`;

/* ===========================
            Main
=========================== */

export const MainContent = styled.div`
  flex: 1;
`;

export const Content = styled.div`
  padding: 30px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

/* ===========================
           Header
=========================== */

export const Header = styled.div`
  background: white;
  padding: 18px 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #ededed;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 15px;
  }
`;

export const HeaderTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #374151;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f5f5f5;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  cursor: pointer;
`;

export const Badge = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;

  width: 16px;
  height: 16px;

  border-radius: 50%;

  background: #ff2d55;
  color: white;

  font-size: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

/* ===========================
            Card
=========================== */

export const StudentsCard = styled.div`
  background: white;
  border-radius: 18px;
  padding: 30px;
  margin-top: 15px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;
`;

export const CardSubTitle = styled.small`
  color: #00b894;
  font-weight: 600;
`;

/* ===========================
      New Assignment Button
=========================== */

export const NewAssignmentButton = styled.button`
  background: #0f3d8f;
  color: white;

  border: none;
  border-radius: 10px;

  padding: 12px 18px;

  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 600;
  cursor: pointer;

  transition: 0.25s;

  &:hover {
    background: #0b2f70;
  }
`;

/* ===========================
            Filters
=========================== */

export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;

  @media (max-width: 768px) {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const FilterButton = styled.button`
  padding: 9px 22px;
  border-radius: 999px;
  border: 1px solid #d9dde5;

  background: ${({ active }) =>
    active ? "#0F3D8F" : "#FFFFFF"};

  color: ${({ active }) =>
    active ? "#FFFFFF" : "#6B7280"};

  font-size: 13px;
  cursor: pointer;
  transition: 0.25s;

  &:hover {
    background: ${({ active }) =>
      active ? "#0F3D8F" : "#F5F7FA"};
  }
`;

/* ===========================
            Table
=========================== */

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 20px;
  }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;

  thead tr {
    background: #fafafa;
  }

  th {
    text-align: left;
    padding: 16px 12px;
    font-size: 11px;
    font-weight: 600;
    color: #9ca3af;
    border-bottom: 1px solid #ececec;
  }

  td {
    padding: 18px 12px;
    font-size: 13px;
    color: #374151;
    border-bottom: 1px solid #f1f3f5;
  }

  tbody tr:hover {
    background: #fafcff;
  }
`;

/* ===========================
          Action Button
=========================== */

export const ActionButton = styled.button`
  border: 1px solid #d9dde5;
  background: #ffffff;
  color: #374151;

  padding: 7px 18px;
  border-radius: 999px;

  cursor: pointer;
  font-size: 12px;
  transition: 0.25s;

  &:hover {
    background: #0f3d8f;
    color: #ffffff;
    border-color: #0f3d8f;
  }
`;

/* ===========================
            Footer
=========================== */

export const Footer = styled.div`
  margin-top: 22px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #9ca3af;
  font-size: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

/* ===========================
          Pagination
=========================== */

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  span {
    color: #9ca3af;
    font-size: 12px;
    cursor: pointer;
  }
`;

export const PageButton = styled.button`
  width: 34px;
  height: 34px;

  border: none;
  border-radius: 50%;

  background: ${({ active }) =>
    active ? "#0F3D8F" : "#F3F4F6"};

  color: ${({ active }) =>
    active ? "#FFFFFF" : "#374151"};

  cursor: pointer;
  font-weight: 600;
  transition: 0.25s;

  &:hover {
    transform: scale(1.05);
  }
`;