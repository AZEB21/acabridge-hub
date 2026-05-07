import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  PageWrap, TopBar, TopLogo, StepLabel, ProgressLine, Content,
} from "../styles/Flow.styles.jsx";
import LogoImg from "../assets/Logo.PNG";

/* ── Styles ── */
const CheckCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #2ec4b6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`;

const PageTitle = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  color: #0d2137;
  margin: 0 0 8px;
`;

const PageSub = styled.p`
  text-align: center;
  font-size: 14px;
  color: #666;
  margin: 0 0 24px;
  line-height: 1.5;
`;

const StatusCard = styled.div`
  background: #fff;
  border: 1px solid #e8e6e1;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 16px;
`;

const StatusCardTitle = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: #0d2137;
  margin: 0 0 14px;
`;

/* Timeline list */
const StepList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const StepRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 6px 0;
  position: relative;
`;

const StepNum = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#2ec4b6" : "#f0eee9")};
  color: ${({ $active }) => ($active ? "#fff" : "#aaa")};
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
`;

const StepConnector = styled.div`
  width: 2px;
  height: 20px;
  background: #e8e6e1;
  margin-left: 11px;
`;

const StepInfo = styled.div`
  flex: 1;
  padding-bottom: 4px;
`;

const StepTitle = styled.p`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  color: ${({ $active }) => ($active ? "#0d2137" : "#aaa")};
  margin: 0 0 2px;
`;

const StepDesc = styled.p`
  font-size: 12px;
  color: #aaa;
  margin: 0;
`;

/* Preview / Edit row */
const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

const OutlineBtn = styled.button`
  flex: 1;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 13px;
  color: #0d2137;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: Arial;
  &:hover { background: #f5f4ef; }
`;

const PrimaryBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: #0d2137;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
  font-family: Arial;
  &:hover { opacity: 0.88; }
`;

const BackHome = styled.button`
  width: 100%;
  background: none;
  border: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 6px 0;
  font-family: Arial;
  &:hover { color: #0d2137; text-decoration: underline; }
`;

/* ── Data ── */
const STEPS = [
  { label: "Applied", desc: "We've received your application." },
  { label: "Reviewed", desc: "" },
  { label: "Accepted", desc: "" },
  { label: "Enrolled", desc: "" },
];

const SIMULATE_LABELS = {
  applied:  "Simulate: Mark as reviewed",
  reviewed: "Simulate: Mark as accepted",
  accepted: "Simulate: Mark as enrolled",
  enrolled: "Go to dashboard →",
};

const STATUS_ORDER = ["applied", "reviewed", "accepted", "enrolled"];

/* ── Component ── */
export default function ApplicationStatus() {
  const [status, setStatus] = useState("applied");
  const [view, setView] = useState("status"); // "status" | "preview"
  const navigate = useNavigate();

  const currentIdx = STATUS_ORDER.indexOf(status);

  const handleSimulate = () => {
    if (status === "enrolled") {
      navigate("/dashboard");
    } else {
      setStatus(STATUS_ORDER[currentIdx + 1]);
    }
  };

  if (view === "preview") {
    const profile = JSON.parse(localStorage.getItem("profile_data") || "{}");
    const track = localStorage.getItem("selected_track") || "—";
    const fullName = localStorage.getItem("user_full_name") || "—";
    const userEmail = localStorage.getItem("user_email") || "—";

    const rows = [
      ["FULL NAME", fullName],
      ["EMAIL", userEmail],
      ["AGE", profile.age || "—"],
      ["NATIONALITY", profile.nationality || "—"],
      ["LOCATION", profile.location || "—"],
      ["COHORT", "Cohort 9.0"],
      ["TRAINING TRACK", track],
      ["CAREER GOAL", profile.career_goal || "—"],
      ["BIO", profile.bio || "—"],
    ];

    return (
      <PageWrap>
        <TopBar>
          <TopLogo src={LogoImg} alt="AcaBridge" />
          <StepLabel>Step 5 of 5</StepLabel>
        </TopBar>
        <ProgressLine $pct="100%" />
        <Content>
          <BackHome onClick={() => setView("status")} style={{ textAlign: "left", width: "auto", marginBottom: 20, display: "block" }}>
            ← Back to status
          </BackHome>

          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0d2137", margin: "0 0 4px" }}>
            Your application
          </h2>
          <p style={{ fontSize: 13, color: "#888", margin: "0 0 20px" }}>
            Review the details you submitted.
          </p>

          {/* White card with all rows */}
          <div style={{ background: "#fff", border: "1px solid #e8e6e1", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
            {rows.map(([key, val], i) => (
              <div key={key} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "13px 16px",
                borderBottom: i < rows.length - 1 ? "1px solid #f0eee9" : "none",
                fontSize: 13,
              }}>
                <span style={{ color: "#aaa", fontWeight: 600, letterSpacing: "0.05em", fontSize: 11, textTransform: "uppercase" }}>{key}</span>
                <span style={{ color: "#0d2137", fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>

          <PrimaryBtn onClick={() => navigate("/onboarding/track")} style={{ marginBottom: 10 }}>
            ✏ Edit application
          </PrimaryBtn>
          <BackHome onClick={() => setView("status")}>Back to status</BackHome>
        </Content>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <TopBar>
        <TopLogo src={LogoImg} alt="AcaBridge" />
        <StepLabel>Step 5 of 5</StepLabel>
      </TopBar>
      <ProgressLine $pct="100%" />

      <Content>
        {/* Back button */}
        <BackHome
          onClick={() => navigate("/onboarding/track")}
          style={{ textAlign: "left", width: "auto", display: "block", marginBottom: 16 }}
        >
          ← Back
        </BackHome>

        {/* Big teal checkmark */}
        <CheckCircle>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </CheckCircle>

        <PageTitle>Application received!</PageTitle>
        <PageSub>
          Thanks for applying to Cohort 9.0. We'll email and SMS you at each stage.
        </PageSub>

        {/* Status card with numbered list */}
        <StatusCard>
          <StatusCardTitle>Application status</StatusCardTitle>
          <StepList>
            {STEPS.map((step, i) => {
              const isActive = i === currentIdx;
              const isDone = i < currentIdx;
              const isLast = i === STEPS.length - 1;
              return (
                <div key={step.label}>
                  <StepRow>
                    <StepNum $active={isActive || isDone}>
                      {isDone ? "✓" : i + 1}
                    </StepNum>
                    <StepInfo>
                      <StepTitle $active={isActive || isDone}>{step.label}</StepTitle>
                      {(isActive && step.desc) && (
                        <StepDesc>{step.desc}</StepDesc>
                      )}
                    </StepInfo>
                  </StepRow>
                  {!isLast && <StepConnector />}
                </div>
              );
            })}
          </StepList>
        </StatusCard>

        {/* Preview + Edit */}
        <ActionRow>
          <OutlineBtn onClick={() => setView("preview")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            Preview
          </OutlineBtn>
          <OutlineBtn onClick={() => navigate("/onboarding/track")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </OutlineBtn>
        </ActionRow>

        {/* Simulate button */}
        <PrimaryBtn onClick={handleSimulate}>
          {SIMULATE_LABELS[status]}
        </PrimaryBtn>

        <BackHome onClick={() => navigate("/")}>
          Back to home
        </BackHome>
      </Content>
    </PageWrap>
  );
}
