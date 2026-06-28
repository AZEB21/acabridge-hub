import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  PageWrap, TopBar, TopLogo, StepLabel, ProgressLine, Content,
} from "../styles/Flow.styles.jsx";
import LogoImg from "../assets/Logo.PNG";
import { getMyApplication } from "../api/auth";

/* ── Styles ── */
const CheckCircle = styled.div`
  width: 72px; height: 72px; border-radius: 50%;
  background: #2ec4b6; display: flex; align-items: center;
  justify-content: center; margin: 0 auto 16px;
`;
const PageTitle = styled.h2`
  text-align: center; font-size: 22px; font-weight: 800; color: #0d2137; margin: 0 0 8px;
`;
const PageSub = styled.p`
  text-align: center; font-size: 14px; color: #666; margin: 0 0 24px; line-height: 1.5;
`;
const StatusCard = styled.div`
  background: #fff; border: 1px solid #e8e6e1; border-radius: 10px;
  padding: 16px 20px; margin-bottom: 16px;
`;
const StatusCardTitle = styled.p`
  font-size: 13px; font-weight: 700; color: #0d2137; margin: 0 0 14px;
`;
const StepList = styled.div`display: flex; flex-direction: column;`;
const StepRow = styled.div`display: flex; gap: 12px; align-items: flex-start; padding: 6px 0;`;
const StepNum = styled.div`
  width: 24px; height: 24px; border-radius: 50%;
  background: ${({ $done }) => ($done ? "#2ec4b6" : ({ $active }) => $active ? "#0d2137" : "#f0eee9")};
  background: ${({ $done, $active }) => $done ? "#2ec4b6" : $active ? "#0d2137" : "#f0eee9"};
  color: ${({ $done, $active }) => ($done || $active) ? "#fff" : "#aaa"};
  font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center;
`;
const StepConnector = styled.div`
  width: 2px; height: 20px; background: #e8e6e1; margin-left: 11px;
`;
const StepInfo = styled.div`flex: 1;`;
const StepTitle = styled.p`
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? "700" : "400")};
  color: ${({ $active }) => ($active ? "#0d2137" : "#aaa")};
  margin: 0;
`;
const StepDesc = styled.p`font-size: 12px; color: #aaa; margin: 2px 0 0;`;
const RejectedBanner = styled.div`
  background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px;
  padding: 16px 20px; margin-bottom: 16px; text-align: center;
  color: #dc2626; font-weight: 600;
`;
const ActionRow = styled.div`display: flex; gap: 10px; margin-bottom: 12px;`;
const OutlineBtn = styled.button`
  flex: 1; padding: 10px; border: 1px solid #ddd;
  background: #fff; border-radius: 8px; cursor: pointer;
`;
const PrimaryBtn = styled.button`
  width: 100%; padding: 13px; background: #0d2137; color: #fff;
  border: none; border-radius: 8px; font-weight: 600; cursor: pointer; margin-bottom: 10px;
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
const BackHome = styled.button`
  width: 100%; background: none; border: none; color: #666; cursor: pointer; padding: 6px 0;
`;
const LoadingText = styled.p`text-align: center; color: #888; margin: 40px 0;`;

const STEPS = [
  { key: "applied",  label: "Applied",  desc: "We've received your application." },
  { key: "reviewed", label: "Reviewed", desc: "An admin is reviewing your application." },
  { key: "accepted", label: "Accepted", desc: "Congratulations! Your application was accepted." },
  { key: "enrolled", label: "Enrolled", desc: "You are now enrolled in the cohort." },
];
const STATUS_ORDER = ["applied", "reviewed", "accepted", "enrolled"];

export default function ApplicationStatus() {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("status");
  const navigate = useNavigate();

  useEffect(() => {
    getMyApplication()
      .then(({ data }) => { setApplication(data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  const currentStatus = application?.status || "applied";
  const isRejected = currentStatus === "rejected";
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  if (loading) {
    return (
      <PageWrap>
        <TopBar><TopLogo src={LogoImg} /><StepLabel>Step 5 of 5</StepLabel></TopBar>
        <ProgressLine $pct="100%" />
        <Content><LoadingText>Loading your application status…</LoadingText></Content>
      </PageWrap>
    );
  }

  if (view === "preview" && application) {
    const rows = [
      ["STUDENT",  application.user_name  || "—"],
      ["EMAIL",    application.user_email || "—"],
      ["COHORT",   application.cohort     || "—"],
      ["TRACK",    application.track      || "—"],
      ["STATUS",   application.status     || "—"],
    ];
    return (
      <PageWrap>
        <TopBar><TopLogo src={LogoImg} /><StepLabel>Step 5 of 5</StepLabel></TopBar>
        <ProgressLine $pct="100%" />
        <Content>
          <BackHome onClick={() => setView("status")}>← Back to status</BackHome>
          <h2>Your application</h2>
          <div style={{ background: "#fff", padding: 16, borderRadius: 10 }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f5f4ef" }}>
                <span style={{ color: "#888", fontSize: 13 }}>{k}</span>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{v}</span>
              </div>
            ))}
          </div>
          <PrimaryBtn style={{ marginTop: 20 }} onClick={() => navigate("/onboarding/track")}>
            Edit application
          </PrimaryBtn>
          <BackHome onClick={() => setView("status")}>Back to status</BackHome>
        </Content>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <TopBar><TopLogo src={LogoImg} /><StepLabel>Step 5 of 5</StepLabel></TopBar>
      <ProgressLine $pct="100%" />
      <Content>
        <BackHome onClick={() => navigate("/onboarding/track")}>← Back</BackHome>

        <CheckCircle>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckCircle>

        <PageTitle>Application received!</PageTitle>
        <PageSub>
          {application?.cohort
            ? `Thanks for applying to ${application.cohort}.`
            : "Thanks for applying. An admin will review your application."}
        </PageSub>

        {isRejected ? (
          <RejectedBanner>
            ✕ Your application was not accepted this time. You can reapply for the next cohort.
          </RejectedBanner>
        ) : (
          <StatusCard>
            <StatusCardTitle>Application Status</StatusCardTitle>
            <StepList>
              {STEPS.map((step, i) => {
                const isDone   = i < currentIdx;
                const isActive = i === currentIdx;
                return (
                  <div key={step.key}>
                    <StepRow>
                      <StepNum $done={isDone} $active={isActive}>
                        {isDone ? "✓" : i + 1}
                      </StepNum>
                      <StepInfo>
                        <StepTitle $active={isActive || isDone}>{step.label}</StepTitle>
                        {isActive && <StepDesc>{step.desc}</StepDesc>}
                      </StepInfo>
                    </StepRow>
                    {i !== STEPS.length - 1 && <StepConnector />}
                  </div>
                );
              })}
            </StepList>
          </StatusCard>
        )}

        <ActionRow>
          <OutlineBtn onClick={() => setView("preview")}>Preview</OutlineBtn>
          <OutlineBtn onClick={() => navigate("/onboarding/track")}>Edit</OutlineBtn>
        </ActionRow>

        {currentStatus === "enrolled" ? (
          <PrimaryBtn onClick={() => navigate("/dashboard/student")}>
            Go to Dashboard →
          </PrimaryBtn>
        ) : (
          <PrimaryBtn disabled>
            Waiting for admin review…
          </PrimaryBtn>
        )}

        <BackHome onClick={() => navigate("/")}>Back to home</BackHome>
      </Content>
    </PageWrap>
  );
}
