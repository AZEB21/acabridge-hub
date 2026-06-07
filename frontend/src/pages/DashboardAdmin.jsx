import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  Sidebar,
  Main,
  TopBar,
  CardsRow,
  Card,
  CohortSection,
  EmptyState,
  Button,
  PrimaryButton,
  Logo,
  NavItem,
  Logo2,
  BottomLogo,
  MenuContainer
} from "../styles/DashboardAdmin.styles";

import LogoImg from "../assets/Logo.PNG";
import LogoAA from "../assets/AA.PNG";

import {
  FiGrid,
  FiUsers,
  FiFileText,
  FiCheckSquare,
  FiBookOpen,
  FiFolder,
  FiAward,
  FiStar,
  FiBook,
  FiClock,
} from "react-icons/fi";

import CreateCohort from "../pages/CreateCohort";

export default function DashboardAdmin() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <PageContainer>
      {/* MODAL */}
      <CreateCohort
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      {/* SIDEBAR */}
      <Sidebar>
        <Logo src={LogoImg} alt="logo" />

        <NavItem $active onClick={() => navigate("/dashboard-admin")}>
          <FiGrid style={{ marginRight: "10px" }} />
          Dashboard
        </NavItem>

        <NavItem onClick={() => navigate("/dashboard-all-students")}>
          <FiUsers style={{ marginRight: "10px" }} />
          Students
        </NavItem>

        <NavItem onClick={() => navigate("/dashboard-applications")}>
          <FiFileText style={{ marginRight: "10px" }} />
          Applications
        </NavItem>

        <NavItem onClick={() => navigate("/dashboard-assessment")}>
          <FiCheckSquare style={{ marginRight: "10px" }} />
          Assessment
        </NavItem>

        <NavItem onClick={() => navigate("/dashboard-academics")}>
          <FiBookOpen style={{ marginRight: "10px" }} />
          Academics
        </NavItem>

        <NavItem>
          <FiFolder style={{ marginRight: "10px" }} />
          Resources
        </NavItem>

        <NavItem>
          <FiAward style={{ marginRight: "10px" }} />
          Grades
        </NavItem>

        <NavItem>
          <FiStar style={{ marginRight: "10px" }} />
          Certifications
        </NavItem>

        <BottomLogo>
          <Logo2 src={LogoAA} alt="logo" />
        </BottomLogo>
      </Sidebar>

      {/* MAIN */}
      <Main>
        <TopBar>
          <h2>Dashboard 👋</h2>
        </TopBar>

        <CardsRow>
          <Card>
            <FiUsers className="cardIcon" />
            <div>
              <h3>0</h3>
              <p>Total Students</p>
            </div>
          </Card>

          <Card>
            <FiBook className="cardIcon" />
            <div>
              <h3>0</h3>
              <p>Active Programs</p>
            </div>
          </Card>

          <Card>
            <FiClock className="cardIcon" />
            <div>
              <h3>0</h3>
              <p>Pending Applications</p>
            </div>
          </Card>

          <Card>
            <FiAward className="cardIcon" />
            <div>
              <h3>0</h3>
              <p>Certificates Issued</p>
            </div>
          </Card>
        </CardsRow>

        <CohortSection>
          <div className="header">
            <div className="titleBlock">
              <small className="subTitle">Cohorts</small>
              <h3>Active Cohorts</h3>
            </div>

            <div className="actions">
              <Button>Manage all Cohorts</Button>

              <PrimaryButton onClick={() => setIsCreateOpen(true)}>
                + Add Cohort
              </PrimaryButton>
            </div>
          </div>

          <EmptyState>
            <h4>No Cohort</h4>
            <p>You currently do not have an existing cohort.</p>
            <p>Create new cohort to get started</p>

            <PrimaryButton onClick={() => setIsCreateOpen(true)}>
              Create a Cohort
            </PrimaryButton>
          </EmptyState>
        </CohortSection>
      </Main>
    </PageContainer>
  );
}