import { useState } from "react";
import styled from "styled-components";
import AdminLayout from "../components/AdminLayout";

/* ── Styles ── */
const TopRow = styled.div`
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  h2 { font-size: 22px; font-weight: 700; color: #111827; margin: 0 0 4px; }
  p  { font-size: 13px; color: #6b7280; margin: 0; }
`;
const AddBtn = styled.button`
  background: #0f3d8f; color: #fff; border: none; border-radius: 10px;
  padding: 11px 18px; font-weight: 600; font-size: 13px; cursor: pointer;
  &:hover { opacity: 0.88; }
`;
const Card = styled.div`background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.06);`;
const FilterRow = styled.div`display: flex; gap: 8px; margin: 16px 0 24px;`;
const FilterBtn = styled.button`
  padding: 8px 18px; border-radius: 999px; border: none; font-size: 13px; cursor: pointer;
  background: ${({ $active }) => ($active ? "#0f3d8f" : "#e5e7eb")};
  color: ${({ $active }) => ($active ? "#fff" : "#374151")};
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 1200px) { grid-template-columns: repeat(2, 1fr); }
`;
const ProgramCard = styled.div`
  border: 1px solid #edf0f4; border-radius: 12px; background: #fff; overflow: hidden;
`;
const ProgramHeader = styled.div`
  padding: 16px; font-weight: 600; font-size: 14px; color: #111827;
`;
const ProgramDesc = styled.div`
  padding: 0 16px 16px; font-size: 12px; color: #6b7280;
`;
const ProgramStats = styled.div`
  display: flex; justify-content: space-between; padding: 14px 16px;
  border-top: 1px solid #edf0f4;
`;
const StatBox = styled.div`
  display: flex; flex-direction: column;
  span { font-size: 11px; color: #9ca3af; }
  strong { margin-top: 4px; font-size: 14px; }
`;
const ProgressSection = styled.div`padding: 0 16px 12px;`;
const ProgressBar = styled.div`
  width: 100%; height: 6px; background: #e5e7eb; border-radius: 999px; margin: 8px 0;
  span { display: block; height: 100%; background: #34c759; border-radius: 999px; width: ${({ $pct }) => $pct}%; }
`;
const CardActions = styled.div`
  padding: 12px 16px; display: flex; justify-content: space-between; border-top: 1px solid #edf0f4;
`;
const EditBtn = styled.button`
  border: 1px solid #dfe4ea; background: #fff; padding: 7px 14px;
  border-radius: 999px; cursor: pointer; font-size: 12px;
  &:hover { background: #f5f5f5; }
`;
const ViewBtn = styled.button`
  background: #0f3d8f; color: #fff; border: none; padding: 7px 14px;
  border-radius: 999px; cursor: pointer; font-size: 12px;
  &:hover { opacity: 0.88; }
`;

const PROGRAMS = [
  { id: 1, title: "Product Management Bootcamp", students: 130, duration: "12 weeks", progress: 60 },
  { id: 2, title: "UX Design",                   students: 130, duration: "12 weeks", progress: 100 },
  { id: 3, title: "Data Analysis",               students: 130, duration: "12 weeks", progress: 50 },
  { id: 4, title: "Frontend Development",        students: 130, duration: "12 weeks", progress: 75 },
  { id: 5, title: "Backend Development",         students: 130, duration: "12 weeks", progress: 45 },
  { id: 6, title: "Mobile Development",          students: 130, duration: "12 weeks", progress: 80 },
];

export default function DashboardAcademics() {
  const [activeFilter, setActiveFilter] = useState("Programs");

  return (
    <AdminLayout activeNav="academics" title="Dashboard / Academics">
      <TopRow>
        <div>
          <h2>Training Programs</h2>
          <p>Manage all training programs offered by Africa Agility.</p>
        </div>
        <AddBtn>+ Add Cohort</AddBtn>
      </TopRow>

      <Card>
        <h3 style={{ margin: 0, fontSize: 16, color: "#111827" }}>All Programs</h3>
        <FilterRow>
          {["Programs", "Cohorts"].map(f => (
            <FilterBtn key={f} $active={activeFilter === f} onClick={() => setActiveFilter(f)}>{f}</FilterBtn>
          ))}
        </FilterRow>

        <Grid>
          {PROGRAMS.map(p => (
            <ProgramCard key={p.id}>
              <ProgramHeader>{p.title}</ProgramHeader>
              <ProgramDesc>12-week intensive bootcamp covering fundamentals and practical learning.</ProgramDesc>
              <ProgramStats>
                <StatBox><span>No of Students</span><strong>{p.students}</strong></StatBox>
                <StatBox><span>Duration</span><strong>{p.duration}</strong></StatBox>
              </ProgramStats>
              <ProgressSection>
                <small style={{ color: "#9ca3af", fontSize: 11 }}>Avg completion</small>
                <ProgressBar $pct={p.progress}><span /></ProgressBar>
                <small style={{ color: "#9ca3af", fontSize: 11 }}>{p.progress}%</small>
              </ProgressSection>
              <CardActions>
                <EditBtn>Edit Program</EditBtn>
                <ViewBtn>View Program</ViewBtn>
              </CardActions>
            </ProgramCard>
          ))}
        </Grid>
      </Card>
    </AdminLayout>
  );
}
