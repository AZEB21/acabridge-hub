import { useState } from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";
import CreateAssignment from "./CreateAssignment";

/* ── Styles ── */
const TopRow = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  h2 { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
  p  { font-size: 13px; color: #6b7280; margin: 0; }
`;
const NewBtn = styled.button`
  background: #0f3d8f; color: #fff; border: none; border-radius: 10px;
  padding: 11px 18px; display: flex; align-items: center; gap: 8px;
  font-weight: 600; font-size: 13px; cursor: pointer;
  &:hover { opacity: 0.88; }
`;
const Card = styled.div`background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);`;
const CardTop = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;`;
const FilterRow = styled.div`display: flex; gap: 8px; margin-bottom: 20px;`;
const FilterBtn = styled.button`
  padding: 8px 18px; border-radius: 999px; border: 1px solid #d1d5db; font-size: 13px; cursor: pointer;
  background: ${({ $active }) => ($active ? "#0f3d8f" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#6b7280")};
`;
const TableWrap = styled.div`overflow-x: auto;`;
const Table = styled.table`
  width: 100%; border-collapse: collapse; min-width: 800px;
  th, td { padding: 14px 12px; text-align: left; font-size: 13px; border-bottom: 1px solid #f3f4f6; }
  th { font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; }
  tbody tr:hover td { background: #fafafa; }
`;
const ActionBtn = styled.button`
  border: 1px solid #d1d5db; background: #fff; color: #374151;
  padding: 6px 16px; border-radius: 999px; font-size: 12px; cursor: pointer;
  &:hover { background: #0f3d8f; color: #fff; border-color: #0f3d8f; }
`;
const TableFooter = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 16px; font-size: 12px; color: #9ca3af;
`;

const ASSIGNMENTS = [
  { id: 1, title: "User Interview Plan",  track: "Product Management", issued: "May 19", due: "May 26", submissions: 1040 },
  { id: 2, title: "Discovery Quiz",       track: "Product Design",     issued: "May 19", due: "May 26", submissions: 1040 },
  { id: 3, title: "Roadmap Quiz",         track: "Development",        issued: "May 19", due: "May 26", submissions: 1040 },
  { id: 4, title: "Practice Learning",    track: "Data Analysis",      issued: "May 19", due: "May 26", submissions: 1040 },
  { id: 5, title: "Week 5 Quiz",          track: "Product Management", issued: "May 19", due: "May 26", submissions: 1040 },
  { id: 6, title: "Week 4 Quiz",          track: "Product Design",     issued: "May 19", due: "May 26", submissions: 1040 },
];

export default function DashboardAssessment() {
  const [activeFilter, setActiveFilter] = useState("Assignment");
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <AdminLayout activeNav="assessment" title="Dashboard / Assessments">
      <TopRow>
        <div>
          <h2>Assessments</h2>
          <p>Build quizzes and assignments, review submissions.</p>
        </div>
        <NewBtn onClick={() => setOpenCreate(true)}>
          <FiPlus size={14} /> New Assignment
        </NewBtn>
      </TopRow>

      <Card>
        <CardTop>
          <h3 style={{ margin: 0, fontSize: 16 }}>Assignment</h3>
        </CardTop>

        <FilterRow>
          {["Quiz", "Assignment"].map(f => (
            <FilterBtn key={f} $active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</FilterBtn>
          ))}
        </FilterRow>

        <TableWrap>
          <Table>
            <thead>
              <tr>
                <th>#</th><th>Title</th><th>Track</th><th>Issued Date</th><th>Due Date</th><th>Submissions</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ASSIGNMENTS.map((a, i) => (
                <tr key={a.id}>
                  <td>{i + 1}</td>
                  <td style={{ fontWeight: 600 }}>{a.title}</td>
                  <td>{a.track}</td>
                  <td>{a.issued}</td>
                  <td>{a.due}</td>
                  <td>{a.submissions}</td>
                  <td><ActionBtn>View</ActionBtn></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>

        <TableFooter>
          <span>Showing 1–6 of 6 assignments</span>
          <span>← Previous &nbsp; 1 &nbsp; Next →</span>
        </TableFooter>
      </Card>

      <CreateAssignment open={openCreate} onClose={() => setOpenCreate(false)} />
    </AdminLayout>
  );
}
