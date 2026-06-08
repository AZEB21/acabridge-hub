import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid, FiUsers, FiFileText, FiCheckSquare, FiBookOpen,
  FiFolder, FiAward, FiStar, FiBook, FiClock, FiBell,
  FiChevronDown, FiLogOut, FiUser, FiTrash2, FiEdit2,
} from "react-icons/fi";
import styled from "styled-components";
import LogoImg from "../assets/Logo.PNG";
import LogoAA from "../assets/AA.PNG";
import {
  PageContainer, Sidebar, Main, CardsRow, Card,
  CohortSection, EmptyState, Button, PrimaryButton,
  Logo, NavItem, Logo2, BottomLogo,
} from "../styles/DashboardAdmin.styles";
import {
  getAdminDashboard, getAdminCohorts, createAdminCohort,
  updateAdminCohort, deleteAdminCohort,
} from "../api/auth";
import CreateCohort from "./CreateCohort";

/* ── Extra styled pieces ── */
const TopBar = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px; padding: 0 4px;
  h2 { font-size: 22px; margin: 0; }
`;
const TopRight = styled.div`display: flex; align-items: center; gap: 12px; position: relative;`;
const IconBtn = styled.button`
  background: #fff; border: 1px solid #eee; border-radius: 8px;
  width: 36px; height: 36px; display: flex; align-items: center;
  justify-content: center; cursor: pointer; position: relative;
  color: #555; font-size: 16px;
  &:hover { background: #f5f5f5; }
`;
const NotifDot = styled.span`
  position: absolute; top: 4px; right: 4px; width: 8px; height: 8px;
  border-radius: 50%; background: #ef4444;
`;
const AvatarBtn = styled.button`
  display: flex; align-items: center; gap: 8px; background: none;
  border: none; cursor: pointer; padding: 4px 8px; border-radius: 8px;
  &:hover { background: #f5f5f5; }
`;
const AvatarCircle = styled.div`
  width: 34px; height: 34px; border-radius: 50%; background: #0d2137;
  color: #fff; font-size: 13px; font-weight: 700; display: flex;
  align-items: center; justify-content: center;
`;
const DropMenu = styled.div`
  position: absolute; top: 44px; right: 0; background: #fff;
  border: 1px solid #eee; border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  min-width: 180px; z-index: 100; overflow: hidden;
`;
const DropItem = styled.button`
  width: 100%; text-align: left; padding: 10px 16px; background: none;
  border: none; cursor: pointer; font-size: 13px; color: #374151;
  display: flex; align-items: center; gap: 8px;
  &:hover { background: #f9fafb; }
  &.danger { color: #dc2626; }
`;
const CohortTable = styled.table`
  width: 100%; border-collapse: collapse; margin-top: 12px;
  th, td { padding: 10px 14px; text-align: left; font-size: 13px; }
  th { color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; border-bottom: 1px solid #f3f4f6; }
  tr:hover td { background: #fafafa; }
`;
const Badge = styled.span`
  display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
  background: ${({ $active }) => $active ? "#dcfce7" : "#f3f4f6"};
  color: ${({ $active }) => $active ? "#16a34a" : "#6b7280"};
`;
const ActionIcons = styled.div`display: flex; gap: 8px;`;
const SmallBtn = styled.button`
  background: none; border: 1px solid #e5e7eb; border-radius: 6px;
  padding: 4px 8px; cursor: pointer; font-size: 13px; color: #555;
  display: flex; align-items: center; gap: 4px;
  &:hover { background: #f9fafb; }
  &.danger { color: #dc2626; border-color: #fecaca; }
  &.danger:hover { background: #fef2f2; }
`;
const ErrorMsg = styled.p`color: #dc2626; font-size: 13px; margin: 8px 0;`;

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const dropRef = useRef(null);

  const [stats, setStats] = useState({ total_students: 0, active_programs: 0, pending_applications: 0, certificates_issued: 0 });
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [adminName, setAdminName] = useState("");

  // Load dashboard data
  useEffect(() => {
    const name = localStorage.getItem("admin_name") || "Admin";
    setAdminName(name);

    Promise.all([getAdminDashboard(), getAdminCohorts()])
      .then(([dashRes, cohortRes]) => {
        setStats(dashRes.data);
        setCohorts(cohortRes.data);
        setLoading(false);
      })
      .catch(() => { setError("Failed to load dashboard data."); setLoading(false); });
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setAvatarOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("admin_name");
    navigate("/login-admin");
  };

  const handleDeleteCohort = async (id) => {
    if (!window.confirm("Delete this cohort?")) return;
    try {
      await deleteAdminCohort(id);
      setCohorts((prev) => prev.filter((c) => c.id !== id));
    } catch { setError("Failed to delete cohort."); }
  };

  const handleToggleActive = async (cohort) => {
    try {
      const res = await updateAdminCohort(cohort.id, { is_active: !cohort.is_active });
      setCohorts((prev) => prev.map((c) => c.id === cohort.id ? res.data : c));
    } catch { setError("Failed to update cohort."); }
  };

  const initials = adminName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AD";

  return (
    <PageContainer>
      <CreateCohort
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(newCohort) => { setCohorts((prev) => [newCohort, ...prev]); setIsCreateOpen(false); }}
      />

      {/* SIDEBAR */}
      <Sidebar>
        <Logo src={LogoImg} alt="logo" />
        <NavItem $active onClick={() => navigate("/dashboard-admin")}><FiGrid style={{ marginRight: 10 }} />Dashboard</NavItem>
        <NavItem onClick={() => navigate("/dashboard-all-students")}><FiUsers style={{ marginRight: 10 }} />Students</NavItem>
        <NavItem onClick={() => navigate("/dashboard-applications")}><FiFileText style={{ marginRight: 10 }} />Applications</NavItem>
        <NavItem onClick={() => navigate("/dashboard-assessment")}><FiCheckSquare style={{ marginRight: 10 }} />Assessment</NavItem>
        <NavItem onClick={() => navigate("/dashboard-academics")}><FiBookOpen style={{ marginRight: 10 }} />Academics</NavItem>
        <NavItem><FiFolder style={{ marginRight: 10 }} />Resources</NavItem>
        <NavItem><FiAward style={{ marginRight: 10 }} />Grades</NavItem>
        <NavItem><FiStar style={{ marginRight: 10 }} />Certifications</NavItem>
        <BottomLogo><Logo2 src={LogoAA} alt="logo" /></BottomLogo>
      </Sidebar>

      {/* MAIN */}
      <Main>
        <TopBar>
          <h2>Dashboard 👋</h2>
          <TopRight ref={dropRef}>
            <IconBtn aria-label="Notifications">
              <FiBell />
              <NotifDot />
            </IconBtn>
            <AvatarBtn onClick={() => setAvatarOpen((p) => !p)} aria-expanded={avatarOpen}>
              <AvatarCircle>{initials}</AvatarCircle>
              <span style={{ fontSize: 13, color: "#374151" }}>{adminName}</span>
              <FiChevronDown size={14} color="#9ca3af" />
            </AvatarBtn>
            {avatarOpen && (
              <DropMenu>
                <DropItem onClick={() => { setAvatarOpen(false); navigate("/dashboard-admin"); }}>
                  <FiUser /> My Profile
                </DropItem>
                <DropItem className="danger" onClick={handleLogout}>
                  <FiLogOut /> Sign Out
                </DropItem>
              </DropMenu>
            )}
          </TopRight>
        </TopBar>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        {/* STAT CARDS */}
        <CardsRow>
          <Card>
            <FiUsers className="cardIcon" />
            <div>
              <h3>{loading ? "—" : stats.total_students}</h3>
              <p>Total Students</p>
            </div>
          </Card>
          <Card>
            <FiBook className="cardIcon" />
            <div>
              <h3>{loading ? "—" : stats.active_programs}</h3>
              <p>Active Programs</p>
            </div>
          </Card>
          <Card>
            <FiClock className="cardIcon" />
            <div>
              <h3>{loading ? "—" : stats.pending_applications}</h3>
              <p>Pending Applications</p>
            </div>
          </Card>
          <Card>
            <FiAward className="cardIcon" />
            <div>
              <h3>{loading ? "—" : stats.certificates_issued}</h3>
              <p>Certificates Issued</p>
            </div>
          </Card>
        </CardsRow>

        {/* COHORTS */}
        <CohortSection>
          <div className="header">
            <div className="titleBlock">
              <small className="subTitle">Cohorts</small>
              <h3>Active Cohorts</h3>
            </div>
            <div className="actions">
              <Button onClick={() => navigate("/dashboard-applications")}>Manage Applications</Button>
              <PrimaryButton onClick={() => setIsCreateOpen(true)}>+ Add Cohort</PrimaryButton>
            </div>
          </div>

          {cohorts.length === 0 ? (
            <EmptyState>
              <h4>No Cohort</h4>
              <p>You currently do not have an existing cohort.</p>
              <PrimaryButton onClick={() => setIsCreateOpen(true)}>Create a Cohort</PrimaryButton>
            </EmptyState>
          ) : (
            <CohortTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cohorts.map((cohort) => (
                  <tr key={cohort.id}>
                    <td style={{ fontWeight: 600 }}>{cohort.name}</td>
                    <td><Badge $active={cohort.is_active}>{cohort.is_active ? "Active" : "Inactive"}</Badge></td>
                    <td><Badge $active={cohort.applications_open}>{cohort.applications_open ? "Open" : "Closed"}</Badge></td>
                    <td>
                      <ActionIcons>
                        <SmallBtn onClick={() => handleToggleActive(cohort)}>
                          <FiEdit2 size={12} /> {cohort.is_active ? "Deactivate" : "Activate"}
                        </SmallBtn>
                        <SmallBtn className="danger" onClick={() => handleDeleteCohort(cohort.id)}>
                          <FiTrash2 size={12} /> Delete
                        </SmallBtn>
                      </ActionIcons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </CohortTable>
          )}
        </CohortSection>
      </Main>
    </PageContainer>
  );
}
