import { useState } from "react";
import styled from "styled-components";
import AdminLayout from "../components/AdminLayout";

/* ── Styles ── */
const PageHeader = styled.div`
  margin-bottom: 20px;
  h2 { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
  p  { font-size: 13px; color: #6b7280; margin: 0; }
`;
const Card = styled.div`
  background: #fff; border-radius: 16px; padding: 24px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
`;
const CardTop = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
`;
const CardSubTitle = styled.small`color: #00b894; font-weight: 600; display: block; margin-bottom: 4px;`;
const CardTitle = styled.h3`margin: 0; font-size: 16px; color: #111827;`;
const CohortSelect = styled.select`
  border: none; background: #0f3d8f; color: #fff;
  padding: 10px 18px; border-radius: 10px; cursor: pointer; outline: none; font-size: 13px;
`;
const FilterRow = styled.div`display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap;`;
const FilterBtn = styled.button`
  padding: 8px 18px; border-radius: 999px; border: 1px solid #d1d5db; font-size: 13px; cursor: pointer;
  background: ${({ $active }) => ($active ? "#0f3d8f" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#6b7280")};
  &:hover { opacity: 0.85; }
`;
const TableWrap = styled.div`overflow-x: auto;`;
const Table = styled.table`
  width: 100%; border-collapse: collapse; min-width: 800px;
  th, td { padding: 14px 12px; text-align: left; font-size: 13px; border-bottom: 1px solid #f3f4f6; }
  th { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: .04em; }
  tbody tr:hover td { background: #fafafa; }
`;
const ProgressBar = styled.div`
  width: 80px; height: 6px; background: #e5e7eb; border-radius: 20px;
  span { display: block; height: 100%; background: #22c55e; border-radius: 20px; width: ${({ $pct }) => $pct}%; }
`;
const StatusBadge = styled.span`
  padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 600;
  background: ${({ $s }) => $s === "Issued" ? "#dcfce7" : $s === "Pending" ? "#fef3c7" : "#fee2e2"};
  color: ${({ $s }) => $s === "Issued" ? "#16a34a" : $s === "Pending" ? "#b45309" : "#dc2626"};
`;
const ActionBtn = styled.button`
  border: none; background: #0f3d8f; color: #fff;
  padding: 6px 16px; border-radius: 999px; font-size: 12px; cursor: pointer;
  &:hover { opacity: 0.85; }
`;
const TableFooter = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 16px; font-size: 12px; color: #9ca3af;
`;

const FILTERS = ["All", "Review", "Accepted", "Rejected", "Enrolled", "Applied"];

const MOCK_STUDENTS = [
  { id: 1, name: "John Doe",    email: "john@mail.com",  track: "Product Management", attendance: "90%", progress: 70, certificate: "Issued"  },
  { id: 2, name: "Jane Smith",  email: "jane@mail.com",  track: "UX Design",          attendance: "80%", progress: 50, certificate: "Pending" },
  { id: 3, name: "Kwame Asante",email: "kwame@mail.com", track: "Data Analysis",       attendance: "95%", progress: 90, certificate: "Issued"  },
];

export default function DashboardAllStudents() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <AdminLayout activeNav="students" title="Dashboard / Students">
      <PageHeader>
        <h2>Student Management</h2>
        <p>Search, filter and manage enrolled students.</p>
      </PageHeader>

      <Card>
        <CardTop>
          <div>
            <CardSubTitle>COHORTS 1</CardSubTitle>
            <CardTitle>All Students</CardTitle>
          </div>
          <CohortSelect>
            <option>Cohort 1</option>
            <option>Cohort 2</option>
            <option>Cohort 3</option>
          </CohortSelect>
        </CardTop>

        <FilterRow>
          {FILTERS.map(f => (
            <FilterBtn key={f} $active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</FilterBtn>
          ))}
        </FilterRow>

        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Email</th><th>Track</th>
                <th>Attendance</th><th>Progress</th><th>Certificate</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STUDENTS.map((s, i) => (
                <tr key={s.id}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.track}</td>
                  <td>{s.attendance}</td>
                  <td><ProgressBar $pct={s.progress}><span /></ProgressBar></td>
                  <td><StatusBadge $s={s.certificate}>{s.certificate}</StatusBadge></td>
                  <td><ActionBtn>View</ActionBtn></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>

        <TableFooter>
          <span>Showing {MOCK_STUDENTS.length} students</span>
          <span>← Previous &nbsp; 1 &nbsp; Next →</span>
        </TableFooter>
      </Card>
    </AdminLayout>
  );
}
