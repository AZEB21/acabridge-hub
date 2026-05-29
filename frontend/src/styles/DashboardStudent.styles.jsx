import styled from "styled-components";

/* ── Layout ── */

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f4f8;
  font-family: "Inter", "Segoe UI", Arial, sans-serif;
`;

/* ── Sidebar ── */

export const Sidebar = styled.aside`
  width: 220px;
  min-width: 220px;
  background: #ffffff;
  border-right: 1px solid #e8edf2;
  display: flex;
  flex-direction: column;
  padding: 24px 0 32px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
`;

export const LogoWrap = styled.div`
  padding: 0 20px 32px;
  img {
    width: 120px;
    height: auto;
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 12px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  color: ${({ $active }) => ($active ? "#00b894" : "#4b5563")};
  background: ${({ $active }) => ($active ? "#f0fdf9" : "transparent")};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #f0fdf9;
    color: #00b894;
  }

  svg {
    flex-shrink: 0;
    color: ${({ $active }) => ($active ? "#00b894" : "#9ca3af")};
  }
`;

/* ── Main content ── */

export const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

/* ── Top header bar ── */

export const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px;
  background: #ffffff;
  border-bottom: 1px solid #e8edf2;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const TopBarTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: background 0.15s;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

export const NotifWrap = styled.div`
  position: relative;
`;

export const NotifBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

export const AvatarBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
  transition: background 0.15s;

  &:hover {
    background: #f3f4f6;
  }
`;

export const AvatarCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #0d2137;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* ── Scrollable page body ── */

export const PageBody = styled.div`
  padding: 24px 28px 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

/* ── Welcome banner ── */

export const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, #032b72 0%, #0d3d8e 100%);
  border-radius: 16px;
  padding: 32px 36px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WelcomeLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const WelcomeBack = styled.p`
  font-size: 13px;
  opacity: 0.75;
  margin: 0;
`;

export const WelcomeName = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
`;

export const WelcomeBadges = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

export const CohortBadge = styled.span`
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 12px;
  padding: 5px 14px;
  border-radius: 20px;
`;

export const TrackBadge = styled.span`
  background: #00b894;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 14px;
  border-radius: 20px;
`;

export const EnrolledBadge = styled.span`
  background: #00b894;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 20px;
  white-space: nowrap;
`;

/* ── Stats row ── */

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

export const StatCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

export const StatIcon = styled.div`
  color: #9ca3af;
  margin-bottom: 4px;
`;

export const StatNumber = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #111827;
  line-height: 1;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #6b7280;
`;

/* ── Two-column content grid ── */

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
  align-items: start;
`;

/* ── Card wrapper ── */

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const ViewAllLink = styled.button`
  background: none;
  border: none;
  color: #00b894;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

/* ── Live classes ── */

export const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
`;

export const ClassCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  width: fit-content;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #dc2626;
    display: inline-block;
  }
`;

export const UpcomingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  width: fit-content;

  &::before {
    content: "";
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #9ca3af;
    display: inline-block;
  }
`;

export const ClassTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
`;

export const ClassDate = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
`;

export const JoinButton = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: opacity 0.15s;
  border: ${({ $filled }) => ($filled ? "none" : "1px solid #d1d5db")};
  background: ${({ $filled }) => ($filled ? "#2f3ab2" : "#fff")};
  color: ${({ $filled }) => ($filled ? "#fff" : "#374151")};

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ── Assignments ── */

export const AssignmentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const AssignmentCard = styled.div`
  background: #f9fafb;
  border-radius: 10px;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

export const AssignmentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const AssignmentTitle = styled.h4`
  font-size: 13px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 3px;
`;

export const AssignmentSub = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AssignmentActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
`;

export const PassedBadge = styled.span`
  background: #dcfce7;
  color: #16a34a;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
`;

export const PendingBadge = styled.span`
  background: #fef3c7;
  color: #d97706;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  white-space: nowrap;
`;

export const ReviewLink = styled.button`
  background: none;
  border: none;
  color: #00b894;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 3px;

  &:hover {
    text-decoration: underline;
  }
`;

/* ── My Learning section ── */

export const LearningMeta = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 0 0 2px;
`;

export const LearningTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 6px;
`;

export const ProgressLabelText = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const ProgressLabelPct = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

export const ProgressBarWrap = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $pct }) => $pct || "0%"};
  background: #00b894;
  border-radius: 10px;
  transition: width 0.4s ease;
`;

export const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CourseRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
`;

export const CourseLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const CourseDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #00b894;
  margin-top: 4px;
  flex-shrink: 0;
`;

export const CourseInfo = styled.div``;

export const CourseTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 3px;
`;

export const CourseLessons = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
`;

export const CoursePct = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 20px;
  background: ${({ $done }) => ($done ? "#dcfce7" : "#dbeafe")};
  color: ${({ $done }) => ($done ? "#16a34a" : "#2563eb")};
  white-space: nowrap;
`;

/* ── Notification dropdown ── */

export const DropdownWrap = styled.div`
  position: relative;
`;

export const NotifDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
  overflow: hidden;
`;

export const NotifHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #f3f4f6;
`;

export const NotifTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const MarkAllBtn = styled.button`
  background: none;
  border: none;
  color: #00b894;
  font-size: 12px;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

export const NotifItem = styled.div`
  padding: 12px 16px;
  border-bottom: 1px solid #f9fafb;
  background: ${({ $unread }) => ($unread ? "#f0fdf9" : "#fff")};
  font-size: 13px;
  color: #374151;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f9fafb;
  }
`;

export const NotifEmpty = styled.p`
  padding: 20px 16px;
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
  margin: 0;
`;

/* ── Loading / error states ── */

export const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: #6b7280;
  font-size: 14px;
`;

export const ErrorBanner = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13px;
`;
