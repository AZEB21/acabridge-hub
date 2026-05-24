/**
 * AppLayout — shared sidebar + topbar shell used by all student dashboard pages.
 * Usage:
 *   <AppLayout title="Dashboard/ Courses" activeNav="/courses">
 *     <YourPageContent />
 *   </AppLayout>
 */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Video,
  BarChart2,
  Award,
  User,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import {
  getDashboard,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../api/auth";
import {
  Container,
  Sidebar,
  LogoWrap,
  Menu,
  MenuItem,
  MainContent,
  TopBar,
  TopBarTitle,
  TopBarRight,
  IconBtn,
  NotifWrap,
  NotifBadge,
  AvatarBtn,
  AvatarCircle,
  DropdownWrap,
  NotifDropdown,
  NotifHeader,
  NotifTitle,
  MarkAllBtn,
  NotifItem,
  NotifEmpty,
} from "../styles/DashboardStudent.styles.jsx";
import LogoImg from "../assets/Logo.PNG";

export const NAV_ITEMS = [
  { label: "Dashboard",   icon: LayoutDashboard, path: "/dashboard/student" },
  { label: "My Courses",  icon: BookOpen,         path: "/courses" },
  { label: "Assignments", icon: ClipboardList,    path: "/assignments" },
  { label: "Live Classes",icon: Video,            path: "/live-classes" },
  { label: "My Grades",   icon: BarChart2,        path: "/grades" },
  { label: "Certification",icon: Award,           path: "/certification" },
  { label: "Profile",     icon: User,             path: "/profile" },
];

export default function AppLayout({ title, activeNav, children }) {
  const navigate = useNavigate();

  const [user, setUser]               = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [avatarOpen, setAvatarOpen]   = useState(false);
  const notifRef  = useRef(null);
  const avatarRef = useRef(null);

  /* Fetch user + notification count once */
  useEffect(() => {
    getDashboard()
      .then(({ data }) => {
        setUser(data.user);
        setUnreadCount(data.unread_notifications || 0);
        setNotifications(data.recent_notifications || []);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.clear();
          navigate("/signin");
        }
      });
  }, [navigate]);

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current  && !notifRef.current.contains(e.target))  setNotifOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target)) setAvatarOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleOpenNotif = () => {
    setNotifOpen((p) => !p);
    setAvatarOpen(false);
    if (!notifOpen) {
      getNotifications().then(({ data }) => setNotifications(data)).catch(() => {});
    }
  };

  const handleMarkRead = (id) => {
    markNotificationRead(id).then(() => {
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
      setUnreadCount((c) => Math.max(0, c - 1));
    }).catch(() => {});
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead().then(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    }).catch(() => {});
  };

  const fullName = user?.full_name || "";
  const initials = fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "ST";
  const activePath = activeNav || window.location.pathname;

  return (
    <Container>
      {/* ── Sidebar ── */}
      <Sidebar>
        <LogoWrap>
          <img src={LogoImg} alt="AcaBridge" />
        </LogoWrap>

        <Menu>
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <MenuItem
              key={label}
              $active={activePath === path}
              onClick={() => navigate(path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(path)}
            >
              <Icon size={17} />
              {label}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>

      {/* ── Main content ── */}
      <MainContent>
        {/* Top bar */}
        <TopBar>
          <TopBarTitle>{title || "Dashboard"}</TopBarTitle>

          <TopBarRight>
            <IconBtn aria-label="Search"><Search size={18} /></IconBtn>

            {/* Notifications */}
            <DropdownWrap ref={notifRef}>
              <NotifWrap>
                <IconBtn aria-label="Notifications" onClick={handleOpenNotif} aria-expanded={notifOpen}>
                  <Bell size={18} />
                </IconBtn>
                {unreadCount > 0 && (
                  <NotifBadge aria-label={`${unreadCount} unread`}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </NotifBadge>
                )}
              </NotifWrap>

              {notifOpen && (
                <NotifDropdown role="dialog" aria-label="Notifications">
                  <NotifHeader>
                    <NotifTitle>Notifications</NotifTitle>
                    {unreadCount > 0 && <MarkAllBtn onClick={handleMarkAllRead}>Mark all read</MarkAllBtn>}
                  </NotifHeader>
                  {notifications.length === 0
                    ? <NotifEmpty>No notifications yet.</NotifEmpty>
                    : notifications.map((n) => (
                        <NotifItem key={n.id} $unread={!n.is_read} onClick={() => !n.is_read && handleMarkRead(n.id)}>
                          {n.message}
                        </NotifItem>
                      ))
                  }
                </NotifDropdown>
              )}
            </DropdownWrap>

            {/* Avatar */}
            <DropdownWrap ref={avatarRef}>
              <AvatarBtn
                onClick={() => { setAvatarOpen((p) => !p); setNotifOpen(false); }}
                aria-label="User menu"
                aria-expanded={avatarOpen}
              >
                <AvatarCircle>
                  {user?.profile_photo ? <img src={user.profile_photo} alt={fullName} /> : initials}
                </AvatarCircle>
                <ChevronDown size={14} color="#6b7280" />
              </AvatarBtn>

              {avatarOpen && (
                <NotifDropdown role="menu" aria-label="User menu">
                  <NotifItem role="menuitem" onClick={() => { setAvatarOpen(false); navigate("/profile"); }}>
                    View Profile
                  </NotifItem>
                  <NotifItem role="menuitem" onClick={() => { localStorage.clear(); navigate("/signin"); }}>
                    Sign Out
                  </NotifItem>
                </NotifDropdown>
              )}
            </DropdownWrap>
          </TopBarRight>
        </TopBar>

        {/* Page-specific content */}
        {children}
      </MainContent>
    </Container>
  );
}
