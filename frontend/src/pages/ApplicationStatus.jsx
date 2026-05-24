import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  PageWrap,
  TopBar,
  TopLogo,
  StepLabel,
  ProgressLine,
  Content,
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

const StepList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 6px 0;
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
`;

const StepConnector = styled.div`
  width: 2px;
  height: 20px;
  background: #e8e6e1;
  margin-left: 11px;
`;

const StepInfo = styled.div`
  flex: 1;
`;

const StepTitle = styled.p`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  color: ${({ $active }) => ($active ? "#0d2137" : "#aaa")};
  margin: 0;
`;

const StepDesc = styled.p`
  font-size: 12px;
  color: #aaa;
  margin: 2px 0 0;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`;

const OutlineBtn = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
`;

const PrimaryBtn = styled.button`
  width: 100%;
  padding: 13px;
  background: #0d2137;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 10px;
`;

const BackHome = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 6px 0;
`;

/* ── Data ── */

const STEPS = [
  { label: "Applied", desc: "We've received your application." },
  { label: "Reviewed", desc: "" },
  { label: "Accepted", desc: "" },
  { label: "Enrolled", desc: "" },
];

const STATUS_ORDER = ["applied", "reviewed", "accepted", "enrolled"];

const SIMULATE_LABELS = {
  applied: "Simulate: Mark as reviewed",
  reviewed: "Simulate: Mark as accepted",
  accepted: "Simulate: Mark as enrolled",
  enrolled: "Go to dashboard →",
};

/* ── Component ── */

export default function ApplicationStatus() {
  const [status, setStatus] = useState("applied");
  const [view, setView] = useState("status");
  const navigate = useNavigate();

  const currentIdx = STATUS_ORDER.indexOf(status);

  const handleSimulate = () => {
    if (status === "enrolled") {
      navigate("/dashboard/student");
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
      ["TRACK", track],
      ["CAREER GOAL", profile.career_goal || "—"],
      ["BIO", profile.bio || "—"],
    ];

    return (
      <PageWrap>
        <TopBar>
          <TopLogo src={LogoImg} />
          <StepLabel>Step 5 of 5</StepLabel>
        </TopBar>

        <ProgressLine $pct="100%" />

        <Content>
          <BackHome onClick={() => setView("status")}>
            ← Back to status
          </BackHome>

          <h2>Your application</h2>

          <div style={{ background: "#fff", padding: 16, borderRadius: 10 }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>

          <PrimaryBtn onClick={() => navigate("/onboarding/track")}>
            Edit application
          </PrimaryBtn>

          <BackHome onClick={() => setView("status")}>
            Back to status
          </BackHome>
        </Content>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <TopBar>
        <TopLogo src={LogoImg} />
        <StepLabel>Step 5 of 5</StepLabel>
      </TopBar>

      <ProgressLine $pct="100%" />

      <Content>
        <BackHome onClick={() => navigate("/onboarding/track")}>
          ← Back
        </BackHome>

        <CheckCircle>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckCircle>

        <PageTitle>Application received!</PageTitle>
        <PageSub>
          Thanks for applying to Cohort 9.0
        </PageSub>

        <StatusCard>
          <StatusCardTitle>Status</StatusCardTitle>

          <StepList>
            {STEPS.map((step, i) => {
              const isActive = i === currentIdx;
              const isDone = i < currentIdx;

              return (
                <div key={step.label}>
                  <StepRow>
                    <StepNum $active={isActive || isDone}>
                      {isDone ? "✓" : i + 1}
                    </StepNum>

                    <StepInfo>
                      <StepTitle $active={isActive || isDone}>
                        {step.label}
                      </StepTitle>

                      {isActive && step.desc && (
                        <StepDesc>{step.desc}</StepDesc>
                      )}
                    </StepInfo>
                  </StepRow>

                  {i !== STEPS.length - 1 && <StepConnector />}
                </div>
              );
            })}
          </StepList>
        </StatusCard>

        <ActionRow>
          <OutlineBtn onClick={() => setView("preview")}>
            Preview
          </OutlineBtn>

          <OutlineBtn onClick={() => navigate("/onboarding/track")}>
            Edit
          </OutlineBtn>
        </ActionRow>

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