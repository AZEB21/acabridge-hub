import { useState } from "react";
import styled from "styled-components";
import { Lock } from "lucide-react";
import AppLayout from "../components/AppLayout";
import { PageBody } from "../styles/DashboardStudent.styles.jsx";

/* ── Mock data ── */
const TRACK = {
  name: "Product Management",
  modules: 6,
  lessons: 14,
  weeks: 12,
  progress: 46,
};

const MODULES = [
  { id: 1, num: 1, title: "Foundations of Product Thinking",    lessons: 3, hours: 3, pct: 100, complete: 3,  total: 3, status: "done" },
  { id: 2, num: 2, title: "Customer Discovery Frameworks",      lessons: 5, hours: 4, pct: 100, complete: 5,  total: 5, status: "done" },
  { id: 3, num: 3, title: "User Research & Interviews",         lessons: 4, hours: 5, pct: 64,  complete: 2,  total: 4, status: "inprogress" },
  { id: 4, num: 4, title: "Roadmapping & Prioritization",       lessons: 3, hours: 3, pct: 100, complete: 3,  total: 3, status: "locked" },
  { id: 5, num: 5, title: "Working with Engineers & Designers", lessons: 5, hours: 4, pct: 100, complete: 5,  total: 5, status: "locked" },
  { id: 6, num: 6, title: "Metrics & Data Analytics",           lessons: 4, hours: 5, pct: 64,  complete: 2,  total: 4, status: "locked" },
];

const TABS = ["All Modules", "In Progress", "Completed"];

/* ── Styles ── */

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const PageTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 4px;
`;

const PageSub = styled.p`
  font-size: 13px;
  color: #6b7280;
  margin: 0;
`;

const ViewLink = styled.button`
  background: none;
  border: none;
  color: #00b894;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  padding: 0;
  &:hover { text-decoration: underline; }
`;

/* Track banner */
const TrackBanner = styled.div`
  background: linear-gradient(135deg, #032b72 0%, #0d3d8e 100%);
  border-radius: 16px;
  padding: 32px 36px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const TrackLeft = styled.div``;

const TrackLabel = styled.p`
  font-size: 12px;
  opacity: 0.7;
  margin: 0 0 6px;
`;

const TrackName = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 12px;
`;

const TrackMeta = styled.p`
  font-size: 13px;
  opacity: 0.75;
  margin: 0;
`;

/* Circular progress */
const CircleWrap = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  flex-shrink: 0;
`;

const CircleSvg = styled.svg`
  transform: rotate(-90deg);
`;

const CircleLabel = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CirclePct = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
`;

const CircleSub = styled.span`
  font-size: 10px;
  color: rgba(255,255,255,0.65);
  margin-top: 2px;
`;

/* Tabs */
const TabRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 7px 18px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background 0.15s, color 0.15s;
  background: ${({ $active }) => ($active ? "#00b894" : "#f3f4f6")};
  color: ${({ $active }) => ($active ? "#fff" : "#6b7280")};
  &:hover { opacity: 0.85; }
`;

/* Module grid */
const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ModuleCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: ${({ $locked }) => ($locked ? 0.7 : 1)};
`;

const ModuleTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ModuleNum = styled.span`
  font-size: 11px;
  color: #9ca3af;
`;

const StatusBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  background: ${({ $s }) =>
    $s === "done"       ? "#dcfce7" :
    $s === "inprogress" ? "#dbeafe" :
                          "#f3f4f6"};
  color: ${({ $s }) =>
    $s === "done"       ? "#16a34a" :
    $s === "inprogress" ? "#2563eb" :
                          "#9ca3af"};
`;

const ModuleTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin: 0;
  line-height: 1.4;
`;

const ModuleMeta = styled.p`
  font-size: 12px;
  color: #9ca3af;
  margin: 0;
`;

const ModuleProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #6b7280;
`;

const ModuleBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
`;

const ModuleBarFill = styled.div`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: #00b894;
  border-radius: 10px;
`;

const ModuleComplete = styled.p`
  font-size: 12px;
  color: #9ca3af;
  text-align: right;
  margin: 0;
`;

const ModuleBtn = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: ${({ $locked }) => ($locked ? "not-allowed" : "pointer")};
  border: ${({ $primary }) => ($primary ? "none" : "1px solid #d1d5db")};
  background: ${({ $primary, $locked }) =>
    $locked   ? "#f3f4f6" :
    $primary  ? "#0d2137" :
                "#fff"};
  color: ${({ $primary, $locked }) =>
    $locked  ? "#9ca3af" :
    $primary ? "#fff"    :
               "#374151"};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 4px;
  transition: opacity 0.15s;
  &:hover:not(:disabled) { opacity: 0.85; }
`;

/* ── Circular progress helper ── */
function CircleProgress({ pct }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <CircleWrap>
      <CircleSvg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke="#00b894"
          strokeWidth="7"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </CircleSvg>
      <CircleLabel>
        <CirclePct>{pct}%</CirclePct>
        <CircleSub>Track Progress</CircleSub>
      </CircleLabel>
    </CircleWrap>
  );
}

/* ── Status label helper ── */
function statusLabel(s) {
  if (s === "done")       return "Done ✓";
  if (s === "inprogress") return "Inprogress";
  return "Not Started";
}

/* ── Component ── */
export default function MyCourses() {
  const [activeTab, setActiveTab] = useState("All Modules");

  const filtered = MODULES.filter((m) => {
    if (activeTab === "In Progress") return m.status === "inprogress";
    if (activeTab === "Completed")   return m.status === "done";
    return true;
  });

  return (
    <AppLayout title="Dashboard/ Courses" activeNav="/courses">
      <PageBody>
        {/* Page header */}
        <PageHeader>
          <div>
            <PageTitle>My Courses</PageTitle>
            <PageSub>Browse and manage all your enrolled courses</PageSub>
          </div>
          <ViewLink>View full schedule →</ViewLink>
        </PageHeader>

        {/* Track banner */}
        <TrackBanner>
          <TrackLeft>
            <TrackLabel>Track</TrackLabel>
            <TrackName>{TRACK.name}</TrackName>
            <TrackMeta>
              {TRACK.modules} Modules · {TRACK.lessons} Lessons · Est. {TRACK.weeks} weeks
            </TrackMeta>
          </TrackLeft>
          <CircleProgress pct={TRACK.progress} />
        </TrackBanner>

        {/* Tabs */}
        <TabRow role="tablist">
          {TABS.map((t) => (
            <Tab
              key={t}
              $active={activeTab === t}
              onClick={() => setActiveTab(t)}
              role="tab"
              aria-selected={activeTab === t}
            >
              {t}
            </Tab>
          ))}
        </TabRow>

        {/* Module grid */}
        <ModuleGrid>
          {filtered.map((m) => {
            const isLocked = m.status === "locked";
            const isPrimary = m.status === "inprogress";
            return (
              <ModuleCard key={m.id} $locked={isLocked}>
                <ModuleTop>
                  <ModuleNum>Module {m.num}</ModuleNum>
                  <StatusBadge $s={m.status}>{statusLabel(m.status)}</StatusBadge>
                </ModuleTop>

                <ModuleTitle>{m.title}</ModuleTitle>
                <ModuleMeta>{m.lessons} Lessons · {m.hours} hrs est.</ModuleMeta>

                <ModuleProgressRow>
                  <span>{m.pct}%</span>
                </ModuleProgressRow>
                <ModuleBar>
                  <ModuleBarFill $pct={m.pct} />
                </ModuleBar>
                <ModuleComplete>{m.complete} of {m.total} complete</ModuleComplete>

                <ModuleBtn
                  $primary={isPrimary}
                  $locked={isLocked}
                  disabled={isLocked}
                  aria-label={isLocked ? `${m.title} is locked` : isPrimary ? `Open ${m.title}` : `Review ${m.title}`}
                >
                  {isLocked ? <><Lock size={13} /> Locked</> : isPrimary ? "Open Module" : "Review Module"}
                </ModuleBtn>
              </ModuleCard>
            );
          })}
        </ModuleGrid>
      </PageBody>
    </AppLayout>
  );
}
