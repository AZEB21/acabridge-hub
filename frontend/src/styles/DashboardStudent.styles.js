import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fb;
`;

export const Sidebar = styled.div`
  width: 250px;
  background: white;
  padding: 30px 20px;
  border-right: 1px solid #eaeaea;
`;

export const Logo = styled.h2`
  color: #00b894;
  margin-bottom: 50px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const MenuItem = styled.div`
  font-size: 16px;
  color: ${({ active }) =>
    active ? "#00b894" : "#2d3436"};

  font-weight: ${({ active }) =>
    active ? "600" : "400"};

  cursor: pointer;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
export const IconGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  svg {
    cursor: pointer;
    transition: 0.2s;
  }

  svg:hover {
    transform: scale(1.1);
    opacity: 0.7;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 32px;
  color: #1f2937;
`;

export const WelcomeBanner = styled.div`
  background: #032b72;
  border-radius: 20px;
  padding: 40px;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;
`;

export const WelcomeSmallText = styled.p`
  font-size: 14px;
  opacity: 0.8;
`;

export const WelcomeText = styled.h2`
  font-size: 40px;
  margin: 10px 0;
`;

export const BadgeContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Badge = styled.div`
  background: ${({ green, enrolled }) =>
    green || enrolled ? "#00b894" : "#1d3f8b"};

  padding: 10px 18px;
  border-radius: 20px;
  font-size: 14px;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  margin-bottom: 30px;
`;

export const StatCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
`;

export const StatNumber = styled.h2`
  font-size: 42px;
  color: #111827;
`;

export const StatLabel = styled.p`
  color: #6b7280;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  margin-bottom: 30px;
`;

export const Section = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const SectionTitle = styled.h3`
  font-size: 28px;
  color: #111827;
`;

export const ViewAll = styled.p`
  color: #00b894;
  cursor: pointer;
`;

export const ClassesContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ClassCard = styled.div`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 20px;
`;

export const LiveBadge = styled.div`
  background: #ffe5e5;
  color: #ff4d4f;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const UpcomingBadge = styled.div`
  background: #edf2ff;
  color: #3b5bdb;
  width: fit-content;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const ClassTitle = styled.h4`
  font-size: 20px;
  margin-bottom: 15px;
`;

export const ClassDate = styled.p`
  color: #6b7280;
  margin-bottom: 25px;
`;

export const JoinButton = styled.button`
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  border: ${({ filled }) =>
    filled ? "none" : "1px solid #d1d5db"};

  background: ${({ filled }) =>
    filled ? "#2f3ab2" : "white"};

  color: ${({ filled }) =>
    filled ? "white" : "#111827"};

  cursor: pointer;
`;

export const AssignmentContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AssignmentCard = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 20px;

  display: flex;
  justify-content: space-between;
`;

export const AssignmentTitle = styled.h4`
  margin-bottom: 10px;
`;

export const AssignmentText = styled.p`
  color: #6b7280;
  font-size: 14px;
`;

export const PassedBadge = styled.div`
  background: #dcfce7;
  color: #16a34a;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;

  margin-bottom: 10px;
`;

export const PendingBadge = styled.div`
  background: #fef3c7;
  color: #d97706;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;

  margin-bottom: 10px;
`;

export const ReviewText = styled.p`
  color: #00b894;
  cursor: pointer;
`;

export const LearningSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 30px;
`;

export const LearningHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e5e7eb;
  border-radius: 10px;

  margin: 15px 0 30px;
`;

export const ProgressFill = styled.div`
  width: 40%;
  height: 100%;
  background: #00b894;
  border-radius: 10px;
`;

export const CourseItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
`;

export const CourseInfo = styled.div``;

export const CourseTitle = styled.h4`
  margin-bottom: 8px;
`;

export const CourseLessons = styled.p`
  color: #6b7280;
  font-size: 14px;
`;

export const ProgressPercent = styled.div`
  background: ${({ success }) =>
    success ? "#dcfce7" : "#dbeafe"};

  color: ${({ success }) =>
    success ? "#16a34a" : "#2563eb"};

  padding: 10px 15px;
  border-radius: 20px;
  font-weight: 600;
`;