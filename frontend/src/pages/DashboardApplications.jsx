import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper, Sidebar, MainContent, Header, HeaderTitle, Content,
  StudentsCard, CardHeader, CardSubTitle, FilterContainer, FilterButton,
  TableWrapper, Table, StatusBadge, ActionButton, Footer, Pagination,
  PageButton, MenuItem, Logo, HeaderRight, IconCircle, Badge, Avatar,
  BottomLogo, Logo2,
} from "../styles/DashboardApplications.styles";
import LogoImg from "../assets/Logo.PNG";
import LogoAA from "../assets/AA.PNG";
import {
  FiGrid, FiUsers, FiFileText, FiCheckSquare, FiBookOpen,
  FiFolder, FiAward, FiStar, FiBell, FiChevronDown, FiLogOut,
  FiUser, FiTrash2, FiCheck, FiX,
} from "react-icons/fi";
import styled from "styled-components";
import {
  getAdminApplications, updateApplicationStatus, deleteApplication,
} from "../api/auth";
import ApplicationReview from "./ApplicationReview";

/* extra styles */
const DropMenu = styled.div`
  position: absolute; top: 44px; right: 0; background: #fff;
  border: 1px solid #eee; border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1); min-width: 160px; z-index: 100;
`;
const DropItem = styled.button`
  width: 100%; text-align: left; padding: 10px 16px; background: none;
  border: none; cursor: pointer; font-size: 13px; color: #374151;
  display: flex; align-items: center; gap: 8px;
  &:hover { background: #f9fafb; }
  &.danger { color: #dc2626; }
`;
const AvatarCircle = styled.div`
  width: 32px; height: 32px; border-radius: 50%; background: #0d2137;
  color: #fff; font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
`;
const ActionGroup = styled.div`display: flex; gap: 6px; flex-wrap: wrap;`;
const SmallBtn = styled.button`
  padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;
  cursor: pointer; border: none; display: flex; align-items: center; gap: 4px;
  background: ${({ $variant }) =>
    $variant === "accept" ? "#dcfce7" :
    $variant === "reject" ? "#fee2e2" :
    $variant === "delete" ? "#f3f4f6" : "#e0f2fe"};
  color: ${({ $variant }) =>
    $variant === "accept" ? "#16a34a" :
    $variant === "reject" ? "#dc2626" :
    $variant === "delete" ? "#6b7280" : "#0369a1"};
  &:hover { opacity: 0.85; }
`;
const ErrorMsg = styled.p`color: #dc2626; font-size: 13px; margin: 8px 0;`;

const STATUS_FILTERS = ["All", "applied", "reviewed", "accepted", "enrolled", "rejected"];

export default function DashboardApplications() {
  const navigate = useNavigate();
  const dropRef = useRef(null);

  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openReview, setOpenReview] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const adminName = localStorage.getItem("admin_name") || "Admin";
  const initials = adminName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const fetchApplications = (statusFilter) => {
    setLoading(true);
    const sf = statusFilter === "All" ? null : statusFilter;
    getAdminApplications(sf)
      .then(({ data }) => { setApplications(data); setLoading(false); })
      .catch(() => { setError("Failed to load applications."); setLoading(false); });
  };

  useEffect(() => { fetchApplications("All"); }, []);

  useEffect(() => {
    const h = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setAvatarOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateApplicationStatus(id, newStatus);
      setApplications((prev) => prev.map((a) => a.id === id ? res.data : a));
    } catch { setError("Failed to update status."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application? This cannot be undone.")) return;
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
    } catch { setError("Failed to delete application."); }
  };

  const handleFilterChange = (f) => {
    setActiveFilter(f);
    fetchApplications(f);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_name");
    navigate("/login-admin");
  };

  return (
    <PageWrapper>
      <Sidebar>
        <Logo src={LogoImg} alt="logo" />
        <MenuItem onClick={() => navigate("/dashboard-admin")}><FiGrid style={{ marginRight: 10 }} />Dashboard</MenuItem>
        <MenuItem onClick={() => navigate("/dashboard-all-students")}><FiUsers style={{ marginRight: 10 }} />Students</MenuItem>
        <MenuItem $active><FiFileText style={{ marginRight: 10 }} />Applications</MenuItem>
        <MenuItem onClick={() => navigate("/dashboard-assessment")}><FiCheckSquare style={{ marginRight: 10 }} />Assessment</MenuItem>
        <MenuItem onClick={() => navigate("/dashboard-academics")}><FiBookOpen style={{ marginRight: 10 }} />Academics</MenuItem>
        <MenuItem><FiFolder style={{ marginRight: 10 }} />Resources</MenuItem>
        <MenuItem><FiAward style={{ marginRight: 10 }} />Grades</MenuItem>
        <MenuItem><FiStar style={{ marginRight: 10 }} />Certifications</MenuItem>
        <BottomLogo><Logo2 src={LogoAA} alt="logo" /></BottomLogo>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>Dashboard / Applications</HeaderTitle>
          <HeaderRight style={{ position: "relative" }} ref={dropRef}>
            <IconCircle><FiBell /></IconCircle>
            <AvatarCircle onClick={() => setAvatarOpen((p) => !p)}>{initials}</AvatarCircle>
            {avatarOpen && (
              <DropMenu>
                <DropItem onClick={() => { setAvatarOpen(false); navigate("/dashboard-admin"); }}>
                  <FiUser /> Profile
                </DropItem>
                <DropItem className="danger" onClick={handleLogout}>
                  <FiLogOut /> Sign Out
                </DropItem>
              </DropMenu>
            )}
          </HeaderRight>
        </Header>

        <Content>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ marginBottom: 5 }}>Applications</h2>
            <p style={{ color: "#6b7280" }}>Review and process student applications.</p>
          </div>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <StudentsCard>
            <CardHeader>
              <div><CardSubTitle>All Applications</CardSubTitle></div>
            </CardHeader>

            <FilterContainer>
              {STATUS_FILTERS.map((f) => (
                <FilterButton key={f} active={activeFilter === f} onClick={() => handleFilterChange(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </FilterButton>
              ))}
            </FilterContainer>

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>STUDENT</th>
                    <th>EMAIL</th>
                    <th>TRACK</th>
                    <th>APPLIED</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} style={{ textAlign: "center", padding: 24, color: "#9ca3af" }}>Loading…</td></tr>
                  ) : applications.length === 0 ? (
                    <tr><td colSpan={7} style={{ textAlign: "center", padding: 24, color: "#9ca3af" }}>No applications found.</td></tr>
                  ) : applications.map((app, i) => (
                    <tr key={app.id}>
                      <td>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{app.student_name}</td>
                      <td>{app.student_email}</td>
                      <td>{app.track_name || "—"}</td>
                      <td>{app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : "—"}</td>
                      <td>
                        <StatusBadge status={app.status}>{app.status}</StatusBadge>
                      </td>
                      <td>
                        <ActionGroup>
                          <SmallBtn onClick={() => { setSelectedApp(app); setOpenReview(true); }}>
                            Review
                          </SmallBtn>
                          {app.status !== "accepted" && app.status !== "enrolled" && (
                            <SmallBtn $variant="accept" onClick={() => handleStatusChange(app.id, "accepted")}>
                              <FiCheck size={11} /> Accept
                            </SmallBtn>
                          )}
                          {app.status !== "rejected" && (
                            <SmallBtn $variant="reject" onClick={() => handleStatusChange(app.id, "rejected")}>
                              <FiX size={11} /> Reject
                            </SmallBtn>
                          )}
                          <SmallBtn $variant="delete" onClick={() => handleDelete(app.id)}>
                            <FiTrash2 size={11} />
                          </SmallBtn>
                        </ActionGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <Footer>
              <span>Showing {applications.length} application{applications.length !== 1 ? "s" : ""}</span>
              <Pagination>
                <PageButton active>1</PageButton>
              </Pagination>
            </Footer>
          </StudentsCard>
        </Content>
      </MainContent>

      <ApplicationReview
        open={openReview}
        student={selectedApp ? {
          name: selectedApp.student_name,
          email: selectedApp.student_email,
          track: selectedApp.track_name,
          period: selectedApp.submitted_at ? new Date(selectedApp.submitted_at).toLocaleDateString() : "—",
          id: selectedApp.id,
          status: selectedApp.status,
        } : null}
        onClose={() => setOpenReview(false)}
        onAccept={(id) => { handleStatusChange(id, "accepted"); setOpenReview(false); }}
        onReject={(id) => { handleStatusChange(id, "rejected"); setOpenReview(false); }}
      />
    </PageWrapper>
  );
}
