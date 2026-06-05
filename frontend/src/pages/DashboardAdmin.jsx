import React from "react";
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
} from "../styles/DashboardAdmin.styles";

import LogoImg from "../assets/Logo.PNG";

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


export default function DashboardAdmin() {
  return (
    <PageContainer>
      {/* SIDEBAR */}
      <Sidebar>
        <Logo src={LogoImg} alt="logo" />

        <NavItem active>
        <FiGrid style={{ marginRight: "10px" }} />
        Dashboard
        </NavItem>

        <NavItem>
        <FiUsers style={{ marginRight: "10px" }} />
        Students
        </NavItem>

        <NavItem>
        <FiFileText style={{ marginRight: "10px" }} />
        Applications
        </NavItem>

        <NavItem>
        <FiCheckSquare style={{ marginRight: "10px" }} />
        Assessment
        </NavItem>

        <NavItem>
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
      </Sidebar>

      {/* MAIN */}
      <Main>
        <TopBar>
          <h2>Dashboard 👋</h2>
        </TopBar>

        {/* STATS */}
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

        {/* COHORT */}
        <CohortSection>
          <div className="header">
                <div className="titleBlock">
                <small className="subTitle">Cohorts</small>
                <h3>Active Cohorts</h3>
            </div>

            <div className="actions">
              <Button>Manage all Cohorts</Button>
              <PrimaryButton>+ Add Cohort</PrimaryButton>
            </div>
          </div>

          <EmptyState>
            <h4>No Cohort</h4>
            <p>You currently do not have an existing cohort.</p>
            <p>Create new cohort to get started</p>

            <PrimaryButton>Create a Cohort</PrimaryButton>
          </EmptyState>
        </CohortSection>
      </Main>
    </PageContainer>
  );
}