import React, { useState } from "react";
import {
  PageWrapper,
  Sidebar,
  MainContent,
  Header,
  HeaderTitle,
  Content,
  StudentsCard,
  CardHeader,
  CardSubTitle,
  FilterContainer,
  FilterButton,
  TableWrapper,
  Table,
  ActionButton,
  Footer,
  Pagination,
  PageButton,
  MenuItem,
  Logo,
  HeaderRight,
  IconCircle,
  Badge,
  Avatar,
  BottomLogo,
  Logo2,
  NewAssignmentButton,
} from "../styles/DashboardAssessment.styles";

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
  FiPlus,
} from "react-icons/fi";

import CreateAssignment from "./CreateAssignment";

export default function DashboardAssessment() {
  const [activeFilter, setActiveFilter] = useState("Assignment");
  const [openCreateAssignment, setOpenCreateAssignment] = useState(false);

  const filters = ["Quiz", "Assignment"];

  const assignments = [
    {
      id: 1,
      title: "User Interview Plan",
      track: "Product Management",
      issued: "May 19",
      due: "May 26",
      submissions: 1040,
    },
    {
      id: 2,
      title: "Discovery Quiz",
      track: "Product Design",
      issued: "May 19",
      due: "May 26",
      submissions: 1040,
    },
    {
      id: 3,
      title: "Roadmap Quiz",
      track: "Development",
      issued: "May 19",
      due: "May 26",
      submissions: 1040,
    },
    {
      id: 4,
      title: "Practice Learning",
      track: "Data Analysis",
      issued: "May 19",
      due: "May 26",
      submissions: 1040,
    },
    {
      id: 5,
      title: "Week 5 Quiz",
      track: "Product Management",
      issued: "May 19",
      due: "May 26",
      submissions: 1040,
    },
    {
      id: 6,
      title: "Week 4 Quiz",
      track: "Product Design",
      issued: "May 19",
      due: "May 26",
      submissions: 1040,
    },
  ];

  return (
    <PageWrapper>
      {/* Sidebar */}

      <Sidebar>
        <Logo src={LogoImg} alt="logo" />

        <MenuItem>
          <FiGrid style={{ marginRight: 10 }} />
          Dashboard
        </MenuItem>

        <MenuItem>
          <FiUsers style={{ marginRight: 10 }} />
          Students
        </MenuItem>

        <MenuItem>
          <FiFileText style={{ marginRight: 10 }} />
          Applications
        </MenuItem>

        <MenuItem $active>
          <FiCheckSquare style={{ marginRight: 10 }} />
          Assessment
        </MenuItem>

        <MenuItem>
          <FiBookOpen style={{ marginRight: 10 }} />
          Academics
        </MenuItem>

        <MenuItem>
          <FiFolder style={{ marginRight: 10 }} />
          Resources
        </MenuItem>

        <MenuItem>
          <FiAward style={{ marginRight: 10 }} />
          Grades
        </MenuItem>

        <MenuItem>
          <FiStar style={{ marginRight: 10 }} />
          Certifications
        </MenuItem>

        <BottomLogo>
          <Logo2 src={LogoAA} alt="logo" />
        </BottomLogo>
      </Sidebar>

      {/* Main */}

      <MainContent>
        <Header>
          <HeaderTitle>Dashboard / Assessments</HeaderTitle>

          <HeaderRight>
            <IconCircle>
              <FiHeart />
            </IconCircle>

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <h2 style={{ marginBottom: 5 }}>Assessments</h2>

              <p style={{ color: "#6b7280" }}>
                Build quizzes and assignments, review submissions.
              </p>
            </div>

            <NewAssignmentButton
              onClick={() => setOpenCreateAssignment(true)}
            >
              <FiPlus />
              New Assignment
            </NewAssignmentButton>
          </div>

          <StudentsCard>
            <CardHeader>
              <div>
                <h3 style={{ margin: 0 }}>Assignment</h3>
                <CardSubTitle></CardSubTitle>
              </div>
            </CardHeader>

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

            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>TITLE</th>
                    <th>TRACK</th>
                    <th>ISSUED DATE</th>
                    <th>DUE DATE</th>
                    <th>SUBMISSIONS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {assignments.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>

                      <td>{item.title}</td>

                      <td>{item.track}</td>

                      <td>{item.issued}</td>

                      <td>{item.due}</td>

                      <td>{item.submissions}</td>

                      <td>
                        <ActionButton>View</ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <Footer>
              <span>Showing 1–6 of 6 assignments</span>

              <Pagination>
                <span>← Previous</span>

                <PageButton active>1</PageButton>

                <span>Next →</span>
              </Pagination>
            </Footer>
          </StudentsCard>
        </Content>
      </MainContent>

      <CreateAssignment
        open={openCreateAssignment}
        onClose={() => setOpenCreateAssignment(false)}
      />
    </PageWrapper>
  );
}