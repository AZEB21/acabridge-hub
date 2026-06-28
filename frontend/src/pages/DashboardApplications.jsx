import { useState, useEffect } from "react";
import styled from "styled-components";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";
import ApplicationReview from "./ApplicationReview";
import {
  getAdminApplications, updateApplicationStatus, deleteApplication,
} from "../api/auth";

/* ── Styles ── */
const PageHeader = styled.div`
  margin-bottom: 20px;
  h2 { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
  p  { font-size: 13px; color: #6b7280; margin: 0; }
`;
const Card = styled.div`background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);`;
const CardTop = styled.div`margin-bottom: 16px;`;
const CardSubTitle = styled.small`color: #00b894; font-weight: 600;`;
const FilterRow = styled.div`display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;`;
const FilterBtn = styled.button`
  padding: 8px 18px; border-radius: 999px; border: 1px solid #d1d5db; font-size: 13px; cursor: pointer;
  background: ${({ $active }) => ($active ? "#0f3d8f" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#6b7280")};
  &:hover { opacity: 0.85; }
`;
const TableWrap = styled.div`overflow-x: auto;`;
const Table = styled.table`
  width: 100%; border-collapse: collapse; min-width: 900px;
  th, td { padding: 14px 12px; text-align: left; font-size: 13px; border-bottom: 1px solid #f3f4f6; }
  th { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; }
  tbody tr:hover td { background: #fafafa; }
`;
const StatusBadge = styled.span`
  padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 600;
  background: ${({ $s }) =>
    $s === "accepted" || $s === "enrolled" ? "#dcfce7" :
    $s === "rejected" ? "#fee2e2" :
    $s === "reviewed" ? "#dbeafe" : "#fef3c7"};
  color: ${({ $s }) =>
    $s === "accepted" || $s === "enrolled" ? "#16a34a" :
    $s === "rejected" ? "#dc2626" :
    $s === "reviewed" ? "#2563eb" : "#b45309"};
`;
const ActionGroup = styled.div`display: flex; gap: 6px; flex-wrap: wrap;`;
const Btn = styled.button`
  padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;
  cursor: pointer; border: none; display: flex; align-items: center; gap: 4px;
  background: ${({ $v }) =>
    $v === "review" ? "#e0f2fe" :
    $v === "accept" ? "#dcfce7" :
    $v === "reject" ? "#fee2e2" : "#f3f4f6"};
  color: ${({ $v }) =>
    $v === "review" ? "#0369a1" :
    $v === "accept" ? "#16a34a" :
    $v === "reject" ? "#dc2626" : "#6b7280"};
  &:hover { opacity: 0.85; }
`;
const TableFooter = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 16px; font-size: 12px; color: #9ca3af;
`;
const ErrorMsg = styled.p`color: #dc2626; font-size: 13px; margin: 0 0 12px;`;

const STATUS_FILTERS = ["All", "applied", "reviewed", "accepted", "enrolled", "rejected"];

export default function DashboardApplications() {
  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openReview, setOpenReview] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApps = (sf) => {
    setLoading(true);
    getAdminApplications(sf === "All" ? null : sf)
      .then(({ data }) => { setApplications(data); setLoading(false); })
      .catch(() => { setError("Failed to load applications."); setLoading(false); });
  };

  useEffect(() => { fetchApps("All"); }, []);

  const handleStatus = async (id, newStatus) => {
    try {
      const res = await updateApplicationStatus(id, newStatus);
      setApplications(prev => prev.map(a => a.id === id ? res.data : a));
    } catch { setError("Failed to update status."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    try {
      await deleteApplication(id);
      setApplications(prev => prev.filter(a => a.id !== id));
    } catch { setError("Failed to delete."); }
  };

  const handleFilterChange = (f) => { setActiveFilter(f); fetchApps(f); };

  return (
    <AdminLayout activeNav="applications" title="Dashboard / Applications">
      <PageHeader>
        <h2>Applications</h2>
        <p>Review and process student applications.</p>
      </PageHeader>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <Card>
        <CardTop><CardSubTitle>All Applications</CardSubTitle></CardTop>

        <FilterRow>
          {STATUS_FILTERS.map(f => (
            <FilterBtn key={f} $active={activeFilter === f} onClick={() => handleFilterChange(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </FilterBtn>
          ))}
        </FilterRow>

        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>#</th><th>Student</th><th>Email</th><th>Track</th><th>Applied</th><th>Status</th><th>Actions</th>
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
                  <td><StatusBadge $s={app.status}>{app.status}</StatusBadge></td>
                  <td>
                    <ActionGroup>
                      <Btn $v="review" onClick={() => { setSelectedApp(app); setOpenReview(true); }}>Review</Btn>
                      {app.status !== "accepted" && app.status !== "enrolled" && (
                        <Btn $v="accept" onClick={() => handleStatus(app.id, "accepted")}><FiCheck size={11} /> Accept</Btn>
                      )}
                      {app.status !== "rejected" && (
                        <Btn $v="reject" onClick={() => handleStatus(app.id, "rejected")}><FiX size={11} /> Reject</Btn>
                      )}
                      <Btn $v="delete" onClick={() => handleDelete(app.id)}><FiTrash2 size={11} /></Btn>
                    </ActionGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>

        <TableFooter>
          <span>Showing {applications.length} application{applications.length !== 1 ? "s" : ""}</span>
        </TableFooter>
      </Card>

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
        onAccept={(id) => { handleStatus(id, "accepted"); setOpenReview(false); }}
        onReject={(id) => { handleStatus(id, "rejected"); setOpenReview(false); }}
      />
    </AdminLayout>
  );
}
