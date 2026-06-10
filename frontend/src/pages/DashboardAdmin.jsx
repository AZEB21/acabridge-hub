import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiUsers, FiBook, FiClock, FiAward, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";
import CreateCohort from "./CreateCohort";
import {
  getAdminDashboard, getAdminCohorts,
  updateAdminCohort, deleteAdminCohort,
  getAdminUsers, approveAdminUser, rejectAdminUser,
} from "../api/auth";

/* ── Styles ── */
const CardsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 28px;
  @media (max-width: 1100px) { grid-template-columns: repeat(2, 1fr); }
`;
const StatCard = styled.div`
  background: #fff; border-radius: 14px; padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  display: flex; align-items: flex-start; gap: 14px;
  .icon { font-size: 22px; color: #0a66ff; margin-top: 2px; }
  h3 { margin: 0; font-size: 26px; font-weight: 800; color: #111827; }
  p  { margin: 4px 0 0; color: #6b7280; font-size: 13px; }
`;
const Section = styled.div`
  background: #fff; border-radius: 14px; padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  margin-bottom: 24px;
`;
const SectionTop = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 20px; flex-wrap: wrap; gap: 12px;
`;
const SectionTitle = styled.div`
  small { display: block; font-size: 11px; color: #00b894; font-weight: 700; text-transform: uppercase; margin-bottom: 4px; }
  h3 { margin: 0; font-size: 18px; color: #111827; }
`;
const BtnGroup = styled.div`display: flex; gap: 10px;`;
const OutlineBtn = styled.button`
  padding: 9px 16px; border: 1px solid #d1d5db; background: #fff;
  border-radius: 8px; cursor: pointer; font-size: 13px;
  &:hover { background: #f9fafb; }
`;
const PrimaryBtn = styled.button`
  padding: 9px 16px; border: none; background: #0d2137; color: #fff;
  border-radius: 8px; cursor: pointer; font-size: 13px;
  &:hover { opacity: 0.88; }
`;
const EmptyState = styled.div`
  text-align: center; padding: 60px 20px; color: #6b7280;
  h4 { margin-bottom: 8px; font-size: 16px; }
  p  { margin: 4px 0; font-size: 13px; }
`;
const DataTable = styled.table`
  width: 100%; border-collapse: collapse;
  th, td { padding: 12px 14px; text-align: left; font-size: 13px; border-bottom: 1px solid #f3f4f6; }
  th { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; }
  tbody tr:hover td { background: #fafafa; }
`;
const Badge = styled.span`
  display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600;
  background: ${({ $on }) => $on ? "#dcfce7" : "#f3f4f6"};
  color: ${({ $on }) => $on ? "#16a34a" : "#6b7280"};
`;
const PendingBadge = styled.span`
  display: inline-block; padding: 3px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600;
  background: #fef3c7; color: #b45309;
`;
const ActionIcons = styled.div`display: flex; gap: 8px;`;
const SmallBtn = styled.button`
  background: none; border: 1px solid #e5e7eb; border-radius: 6px;
  padding: 5px 10px; cursor: pointer; font-size: 12px; color: #555;
  display: flex; align-items: center; gap: 4px;
  &:hover { background: #f9fafb; }
  &.approve { color: #16a34a; border-color: #bbf7d0; }
  &.approve:hover { background: #f0fdf4; }
  &.danger { color: #dc2626; border-color: #fecaca; }
  &.danger:hover { background: #fef2f2; }
`;
const ErrorMsg = styled.p`color: #dc2626; font-size: 13px; margin: 0 0 12px;`;
const WelcomeTitle = styled.h2`font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 20px;`;

export default function DashboardAdmin() {
  const navigate = useNavigate();
  const adminName    = localStorage.getItem("admin_name") || "Admin";
  const isSuperAdmin = !!localStorage.getItem("admin_is_superuser");

  const [stats, setStats]               = useState({ total_students: 0, active_programs: 0, pending_applications: 0, certificates_issued: 0 });
  const [cohorts, setCohorts]           = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    Promise.all([getAdminDashboard(), getAdminCohorts()])
      .then(([d, c]) => { setStats(d.data); setCohorts(c.data); setLoading(false); })
      .catch(() => { setError("Failed to load dashboard data."); setLoading(false); });

    // Only superadmin can see pending admin registrations
    if (isSuperAdmin) {
      getAdminUsers()
        .then(({ data }) => setPendingAdmins(data.filter(u => u.pending)))
        .catch(() => {});
    }
  }, [isSuperAdmin]);

  const handleToggleCohort = async (cohort) => {
    try {
      const res = await updateAdminCohort(cohort.id, { is_active: !cohort.is_active });
      setCohorts(prev => prev.map(c => c.id === cohort.id ? res.data : c));
    } catch { setError("Failed to update cohort."); }
  };

  const handleDeleteCohort = async (id) => {
    if (!window.confirm("Delete this cohort?")) return;
    try {
      await deleteAdminCohort(id);
      setCohorts(prev => prev.filter(c => c.id !== id));
    } catch { setError("Failed to delete cohort."); }
  };

  const handleApproveAdmin = async (id) => {
    try {
      await approveAdminUser(id);
      setPendingAdmins(prev => prev.filter(u => u.id !== id));
    } catch { setError("Failed to approve admin."); }
  };

  const handleRejectAdmin = async (id) => {
    if (!window.confirm("Reject and remove this admin request?")) return;
    try {
      await rejectAdminUser(id);
      setPendingAdmins(prev => prev.filter(u => u.id !== id));
    } catch { setError("Failed to reject admin."); }
  };

  return (
    <AdminLayout activeNav="dashboard" title="Dashboard">
      <WelcomeTitle>Dashboard 👋 Welcome, {adminName.split(" ")[0]}</WelcomeTitle>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* ── Stat cards ── */}
      <CardsRow>
        <StatCard>
          <FiUsers className="icon" />
          <div><h3>{loading ? "—" : stats.total_students}</h3><p>Total Students</p></div>
        </StatCard>
        <StatCard>
          <FiBook className="icon" />
          <div><h3>{loading ? "—" : stats.active_programs}</h3><p>Active Programs</p></div>
        </StatCard>
        <StatCard>
          <FiClock className="icon" />
          <div><h3>{loading ? "—" : stats.pending_applications}</h3><p>Pending Applications</p></div>
        </StatCard>
        <StatCard>
          <FiAward className="icon" />
          <div><h3>{loading ? "—" : stats.certificates_issued}</h3><p>Certificates Issued</p></div>
        </StatCard>
      </CardsRow>

      {/* ── Pending admin approvals (superadmin only) ── */}
      {isSuperAdmin && (
        <Section>
          <SectionTop>
            <SectionTitle>
              <small>Admin Management</small>
              <h3>
                Pending Admin Approvals
                {pendingAdmins.length > 0 && (
                  <span style={{ marginLeft: 8, background: "#fef3c7", color: "#b45309", fontSize: 12, padding: "2px 8px", borderRadius: 20 }}>
                    {pendingAdmins.length} pending
                  </span>
                )}
              </h3>
            </SectionTitle>
          </SectionTop>

          {pendingAdmins.length === 0 ? (
            <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", padding: "24px 0" }}>
              No pending admin registrations.
            </p>
          ) : (
            <DataTable>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {pendingAdmins.map(admin => (
                  <tr key={admin.id}>
                    <td style={{ fontWeight: 600 }}>{admin.full_name}</td>
                    <td>{admin.email}</td>
                    <td><PendingBadge>Pending Approval</PendingBadge></td>
                    <td>
                      <ActionIcons>
                        <SmallBtn className="approve" onClick={() => handleApproveAdmin(admin.id)}>
                          <FiCheck size={11} /> Approve
                        </SmallBtn>
                        <SmallBtn className="danger" onClick={() => handleRejectAdmin(admin.id)}>
                          <FiX size={11} /> Reject
                        </SmallBtn>
                      </ActionIcons>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          )}
        </Section>
      )}

      {/* ── Cohorts ── */}
      <Section>
        <SectionTop>
          <SectionTitle>
            <small>Cohorts</small>
            <h3>Active Cohorts</h3>
          </SectionTitle>
          <BtnGroup>
            <OutlineBtn onClick={() => navigate("/dashboard-applications")}>Manage Applications</OutlineBtn>
            <PrimaryBtn onClick={() => setIsCreateOpen(true)}>+ Add Cohort</PrimaryBtn>
          </BtnGroup>
        </SectionTop>

        {cohorts.length === 0 ? (
          <EmptyState>
            <h4>No Cohort</h4>
            <p>You currently do not have an existing cohort.</p>
            <p>Create a new cohort to get started.</p>
            <PrimaryBtn style={{ marginTop: 16 }} onClick={() => setIsCreateOpen(true)}>
              Create a Cohort
            </PrimaryBtn>
          </EmptyState>
        ) : (
          <DataTable>
            <thead>
              <tr>
                <th>#</th>
                <th>Cohort</th>
                <th>Tracks</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Applications</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cohorts.map((c, i) => (
                <tr key={c.id}>
                  <td style={{ color: "#9ca3af" }}>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td style={{ color: "#6b7280", fontSize: 12 }}>
                    {c.track_names?.length > 0
                      ? c.track_names.slice(0, 2).join(", ") + (c.track_names.length > 2 ? ` +${c.track_names.length - 2}` : "")
                      : "—"}
                  </td>
                  <td>{c.start_date ? new Date(c.start_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</td>
                  <td><Badge $on={c.is_active}>{c.is_active ? "Active" : "Inactive"}</Badge></td>
                  <td><Badge $on={c.applications_open}>{c.applications_open ? "Open" : "Closed"}</Badge></td>
                  <td>
                    <ActionIcons>
                      <SmallBtn onClick={() => handleToggleCohort(c)}>
                        <FiEdit2 size={11} /> {c.is_active ? "Deactivate" : "Activate"}
                      </SmallBtn>
                      <SmallBtn className="danger" onClick={() => handleDeleteCohort(c.id)}>
                        <FiTrash2 size={11} /> Delete
                      </SmallBtn>
                    </ActionIcons>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}
      </Section>

      <CreateCohort
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={(newCohort) => { setCohorts(prev => [newCohort, ...prev]); setIsCreateOpen(false); }}
      />
    </AdminLayout>
  );
}
