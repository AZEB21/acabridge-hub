import styled from "styled-components";

/* Layout */
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

/* SIDEBAR */
export const Sidebar = styled.div`
  width: 240px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-right: 1px solid #fffbfb;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid #eee;
    gap: 10px;
  }
`;

/* LOGO FIX */
export const Logo = styled.img`
  width: 140px;
  margin-bottom: 20px;
`;

export const Logo2 = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

export const MenuItem = styled.div`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  display: flex;
  align-items: center;
  white-space: nowrap;

  background: #ffffff;
  color: ${({ $active }) => ($active ? "#072010" : "#444")};

  &:hover {
    color: #16a34a;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 10px;
  }
`;

/* Main */
export const MainContent = styled.div`
  flex: 1;
`;

export const Content = styled.div`
  padding: 30px;
`;

export const StudentsCard = styled.div`
  background: white;
  border-radius: 18px;
  padding: 30px;

   @media (max-width: 768px) {
    padding: 15px;
  }
`;

/* Header */
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const CardSubTitle = styled.small`
  color: #00b894;
  font-weight: 600;
`;

export const CardTitle = styled.h2`
  margin-top: 8px;
`;

export const TopActions = styled.div`
  display: flex;
  align-items: center;
`;

export const CohortSelect = styled.select`
  border: none;
  background: #0f3d8f;
  color: white;
  padding: 14px 22px;
  border-radius: 12px;
  cursor: pointer;
  outline: none;
`;

/* Filters */
export const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;

   @media (max-width: 768px) {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
  }
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid #d1d5db;

  background: ${({ active }) => (active ? "#0f3d8f" : "white")};
  color: ${({ active }) => (active ? "white" : "#6b7280")};
`;

/* Table */
export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;

  th,
  td {
    padding: 18px 12px;
    border-bottom: 1px solid #edf0f4;
  }

  th {
    color: #6b7280;
    font-size: 12px;
  }

   @media (max-width: 768px) {
    min-width: 700px;
  }
`;

/* Progress */
export const ProgressBar = styled.div`
  width: 90px;
  height: 6px;
  background: #e5e7eb;
  border-radius: 20px;

  span {
    display: block;
    height: 100%;
    background: #22c55e;
    border-radius: 20px;
  }
`;

/* Badge */
export const StatusBadge = styled.span`
  padding: 7px 14px;
  border-radius: 999px;

  background: ${({ status }) =>
    status === "Issued"
      ? "#DCFCE7"
      : status === "Pending"
      ? "#FEF3C7"
      : "#FEE2E2"};

  color: ${({ status }) =>
    status === "Issued"
      ? "#15803D"
      : status === "Pending"
      ? "#B45309"
      : "#DC2626"};
`;

export const ActionButton = styled.button`
  border: none;
  background: #0f3d8f;
  color: white;
  padding: 8px 18px;
  border-radius: 999px;
`;

/* Footer */
export const Footer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 12px;
`;

export const PageButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;

  background: ${({ active }) => (active ? "#0f3d8f" : "#f3f4f6")};
  color: ${({ active }) => (active ? "white" : "#374151")};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 30px;
  background: white;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding: 15px;
  }
`;

export const HeaderTitle = styled.div`
  font-weight: 600;
  color: #111827;
`;


export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const IconCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
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
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
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