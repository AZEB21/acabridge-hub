/**
 * AdminLayout — shared sidebar + topbar for all admin dashboard pages.
 * Usage:
 *   <AdminLayout activeNav="students">
 *     <YourPageContent />
 *   </AdminLayout>
 *
 * activeNav values: "dashboard" | "students" | "applications" | "assessment" | "academics"
 */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FiGrid, FiUsers, FiFileText, FiCheckSquare, FiBookOpen,
  FiFolder, FiAward, FiStar, FiBell, FiChevronDown,
  FiLogOut, FiUser, FiCheck,
} from "react-icons/fi";
import LogoImg from "../assets/Logo.PNG";
import LogoAA from "../assets/AA.PNG";
import { getAdminDashboard } from "../api/auth";

/* ── Layout shell ── */
const Shell = styled.div`
  display: flex;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  background: #f5f7fb;
  font-family: Arial, Helvetica, sans-serif;
`;

const Sidebar = styled.aside`
  width: 240px;
  min-width: 240px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  padding: 20px 16px;
  gap: 4px;
  overflow-y: auto;
`;

const SidebarLogo = styled.img`
  width: 130px;
  margin-bottom: 24px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ $active }) => ($active ? "#0d2137" : "#555")};
  background: ${({ $active }) => ($active ? "#f0f4ff" : "transparent")};
  font-weight: ${({ $active }) => ($active ? "600" : "400")};
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;

  &:hover {
    background: #f5f5f5;
    color: #16a34a;
  }
`;

const BottomLogo = styled.div`
  margin-top: auto;
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;

const BottomLogoImg = styled.img`
  width: 130px;
`;

/* ── Main content area ── */
const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/* ── Top bar ── */
const TopBar = styled.header`
  height: 60px;
  min-height: 60px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  flex-shrink: 0;
`;

const TopTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const TopRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const IconBtn = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f3f4f6;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 16px;
  &:hover { background: #e5e7eb; }
`;

const NotifDot = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid #fff;
`;

const AvatarBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  &:hover { background: #f5f5f5; }
`;

const AvatarCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #0d2137;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* ── Notification dropdown ── */
const DropMenu = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  min-width: 200px;
  z-index: 200;
  overflow: hidden;
`;

const DropItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 11px 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover { background: #f9fafb; }
  &.danger { color: #dc2626; }
`;

const NotifDropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 48px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  width: 300px;
  z-index: 200;
  overflow: hidden;
`;

const NotifHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px 10px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  font-weight: 700;
  color: #0d2137;
`;

const MarkAllBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #16a34a;
  &:hover { text-decoration: underline; }
`;

const NotifItem = styled.div`
  padding: 12px 16px;
  font-size: 13px;
  color: ${({ $unread }) => ($unread ? "#111827" : "#6b7280")};
  background: ${({ $unread }) => ($unread ? "#f0fdf4" : "transparent")};
  border-bottom: 1px solid #f9fafb;
  cursor: pointer;
  display: flex;
  gap: 8px;
  align-items: flex-start;
  &:hover { background: #f9fafb; }
`;

const NotifEmpty = styled.p`
  text-align: center;
  padding: 20px;
  color: #9ca3af;
  font-size: 13px;
`;

/* ── Page content area ── */
const PageContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px;
`;

const NAV = [
  { key: "dashboard",    label: "Dashboard",    icon: FiGrid,        path: "/dashboard-admin" },
  { key: "students",     label: "Students",     icon: FiUsers,       path: "/dashboard-all-students" },
  { key: "applications", label: "Applications", icon: FiFileText,    path: "/dashboard-applications" },
  { key: "assessment",   label: "Assessment",   icon: FiCheckSquare, path: "/dashboard-assessment" },
  { key: "academics",    label: "Academics",    icon: FiBookOpen,    path: "/dashboard-academics" },
  { key: "resources",    label: "Resources",    icon: FiFolder,      path: null },
  { key: "grades",       label: "Grades",       icon: FiAward,       path: null },
  { key: "certs",        label: "Certifications", icon: FiStar,      path: null },
];

export default function AdminLayout({ activeNav, title, children }) {
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const notifRef  = useRef(null);

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [notifOpen,  setNotifOpen]  = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const adminName = localStorage.getItem("admin_name") || "Admin";
  const initials  = adminName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  // Load unread count from dashboard stats
  useEffect(() => {
    getAdminDashboard()
      .then(({ data }) => {
        // Use pending_applications as notification count proxy
        setUnread(data.pending_applications || 0);
        // Build a notification list from pending count
        if (data.pending_applications > 0) {
          setNotifications([{
            id: 1,
            message: `${data.pending_applications} application(s) are pending review.`,
            is_read: false,
          }]);
        }
      })
      .catch(() => {});
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const h = (e) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false);
      if (notifRef.current  && !notifRef.current.contains(e.target))  setNotifOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_name");
    navigate("/login-admin");
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    setUnread(0);
  };

  return (
    <Shell>
      {/* ── Sidebar ── */}
      <Sidebar>
        <SidebarLogo src={LogoImg} alt="AcaBridge" />
        {NAV.map(({ key, label, icon: Icon, path }) => (
          <NavItem
            key={key}
            $active={activeNav === key}
            onClick={() => path && navigate(path)}
            style={{ cursor: path ? "pointer" : "default", opacity: path ? 1 : 0.45 }}
          >
            <Icon size={16} />
            {label}
          </NavItem>
        ))}
        <BottomLogo>
          <BottomLogoImg src={LogoAA} alt="Africa Agility" />
        </BottomLogo>
      </Sidebar>

      {/* ── Main ── */}
      <Main>
        {/* Top bar */}
        <TopBar>
          <TopTitle>{title || "Dashboard"}</TopTitle>
          <TopRight>
            {/* Notifications */}
            <div ref={notifRef} style={{ position: "relative" }}>
              <IconBtn
                aria-label="Notifications"
                onClick={() => { setNotifOpen(p => !p); setAvatarOpen(false); }}
              >
                <FiBell size={17} />
                {unread > 0 && <NotifDot />}
              </IconBtn>

              {notifOpen && (
                <NotifDropdown>
                  <NotifHeader>
                    Notifications
                    {unread > 0 && <MarkAllBtn onClick={handleMarkAllRead}><FiCheck size={11} /> Mark all read</MarkAllBtn>}
                  </NotifHeader>
                  {notifications.length === 0
                    ? <NotifEmpty>No notifications.</NotifEmpty>
                    : notifications.map(n => (
                      <NotifItem
                        key={n.id}
                        $unread={!n.is_read}
                        onClick={() => {
                          setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, is_read: true } : x));
                          setUnread(p => Math.max(0, p - 1));
                        }}
                      >
                        {n.message}
                      </NotifItem>
                    ))
                  }
                </NotifDropdown>
              )}
            </div>

            {/* Avatar + profile dropdown */}
            <div ref={avatarRef} style={{ position: "relative" }}>
              <AvatarBtn
                onClick={() => { setAvatarOpen(p => !p); setNotifOpen(false); }}
                aria-label="User menu"
              >
                <AvatarCircle>{initials}</AvatarCircle>
                <span style={{ fontSize: 13, color: "#374151", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {adminName}
                </span>
                <FiChevronDown size={13} color="#9ca3af" />
              </AvatarBtn>

              {avatarOpen && (
                <DropMenu>
                  <div style={{ padding: "12px 16px 8px", borderBottom: "1px solid #f3f4f6" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0d2137" }}>{adminName}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>Admin</div>
                  </div>
                  <DropItem onClick={() => { setAvatarOpen(false); navigate("/dashboard-admin"); }}>
                    <FiUser size={14} /> My Profile
                  </DropItem>
                  <DropItem className="danger" onClick={handleLogout}>
                    <FiLogOut size={14} /> Sign Out
                  </DropItem>
                </DropMenu>
              )}
            </div>
          </TopRight>
        </TopBar>

        {/* Page content */}
        <PageContent>
          {children}
        </PageContent>
      </Main>
    </Shell>
  );
}
