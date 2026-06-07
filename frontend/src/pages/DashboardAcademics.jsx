import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  Sidebar,
  MainContent,
  Header,
  HeaderTitle,
  HeaderRight,
  Content,
  MenuItem,
  Logo,
  Logo2,
  BottomLogo,
  IconCircle,
  Badge,
  Avatar,

  TopSection,
  ButtonGroup,
  AddCohortButton,

  ProgramsCard,
  FilterContainer,
  FilterButton,

  ProgramsGrid,
  ProgramCard,
  ProgramHeader,
  ProgramDescription,
  ProgramStats,
  StatBox,

  ProgressSection,
  ProgressBar,

  CardActions,
  EditButton,
  ViewButton,
   MenuContainer,

} from "../styles/DashboardAcademics.styles";

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
  FiHeart,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

export default function Academics() {
  const [activeFilter, setActiveFilter] = useState("Programs");
  const navigate = useNavigate();

  const filters = ["Programs", "Cohorts"];

  const programs = [
    { id: 1, title: "Product Management Bootcamp", students: 130, duration: "12 weeks", progress: 60 },
    { id: 2, title: "UX Design", students: 130, duration: "12 weeks", progress: 100 },
    { id: 3, title: "Data Analysis", students: 130, duration: "12 weeks", progress: 50 },
    { id: 4, title: "Frontend Development", students: 130, duration: "12 weeks", progress: 75 },
    { id: 5, title: "Backend Development", students: 130, duration: "12 weeks", progress: 45 },
    { id: 6, title: "Mobile Development", students: 130, duration: "12 weeks", progress: 80 },
  ];

  return (
    <PageWrapper>

      {/* SIDEBAR */}
    <Sidebar>
      <div>
        <Logo src={LogoImg} />

        <MenuContainer>
          <MenuItem onClick={() => navigate("/dashboard-admin")}><FiGrid /> Dashboard</MenuItem>
          <MenuItem onClick={() => navigate("/dashboard-all-students")}><FiUsers /> Students</MenuItem>
          <MenuItem onClick={() => navigate("/dashboard-applications")}><FiFileText /> Applications</MenuItem>
          <MenuItem onClick={() => navigate("/dashboard-assessment")}><FiCheckSquare /> Assessment</MenuItem>
          <MenuItem $active><FiBookOpen /> Academics</MenuItem>
          <MenuItem><FiFolder /> Resources</MenuItem>
          <MenuItem><FiAward /> Grades</MenuItem>
          <MenuItem><FiStar /> Certifications</MenuItem>
        </MenuContainer>
      </div>

      {/*  LOGO EN BAS */}
      <BottomLogo>
        <Logo2 src={LogoAA} />
      </BottomLogo>
    </Sidebar>

      {/* MAIN */}
      <MainContent>

        <Header>
          <HeaderTitle>Dashboard / Academics</HeaderTitle>

          <HeaderRight>
            <IconCircle><FiHeart /></IconCircle>

            <IconCircle>
              <FiBell />
              <Badge>5</Badge>
            </IconCircle>

            <Avatar>
              <FiChevronDown />
            </Avatar>
          </HeaderRight>
        </Header>

        <Content>

          {/* TOP SECTION */}
          <TopSection>
            <div>
              <h2>Training Programs</h2>
              <p>Manage all training programs offered by Africa Agility.</p>
            </div>

            <ButtonGroup>
              <button>
                Add Cohort
              </button>
            </ButtonGroup>
          </TopSection>

          {/* CARD */}
          <ProgramsCard>
            <h3>All Programs</h3>

            <FilterContainer>
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </FilterButton>
              ))}
            </FilterContainer>

            {/* GRID */}
            <ProgramsGrid>
              {programs.map((program) => (
                <ProgramCard key={program.id}>

                  <ProgramHeader>
                    {program.title}
                  </ProgramHeader>

                  <ProgramDescription>
                    12-week intensive bootcamp covering fundamentals and practical learning.
                  </ProgramDescription>

                  <ProgramStats>
                    <StatBox>
                      <span>No of Students</span>
                      <strong>{program.students}</strong>
                    </StatBox>

                    <StatBox>
                      <span>Duration</span>
                      <strong>{program.duration}</strong>
                    </StatBox>
                  </ProgramStats>

                  <ProgressSection>
                    <small>Avg completion</small>

                    <ProgressBar>
                      <span style={{ width: `${program.progress}%` }} />
                    </ProgressBar>

                    <small>{program.progress}%</small>
                  </ProgressSection>

                  <CardActions>
                    <EditButton>Edit Program</EditButton>
                    <ViewButton>View Program</ViewButton>
                  </CardActions>

                </ProgramCard>
              ))}
            </ProgramsGrid>

          </ProgramsCard>

        </Content>

      </MainContent>

    </PageWrapper>
  );
}