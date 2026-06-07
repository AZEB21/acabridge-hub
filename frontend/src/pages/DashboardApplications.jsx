import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CohortButton,
  FilterContainer,
  FilterButton,
  TableWrapper,
  Table,
  ProgressBar,
  StatusBadge,
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
} from "../styles/DashboardApplications.styles";

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

import ApplicationReview from "./ApplicationReview";



export default function DashboardApplications() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Review", "Accepted", "Rejected", "Enrolled", "Applied"];

  const students = [
    {
      id: 1,
      name: "Mercy Johnson",
      email: "Mercy@mail.com",
      track: "Frontend",
      period : "May 18",
      status: "On review",
      actions: "Review",
    },
    {
      id: 2,
      name: "Jacky Appiah",
      email: "jane@mail.com",
      track: "Backend",
      period : "May 18",
      status: "Accepted",
      actions: "Review",
    },
  ];

  const [openReview, setOpenReview] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  return (
    <PageWrapper>

      {/* SIDEBAR */}
    <Sidebar>
    <Logo src={LogoImg} alt="logo" />

    <MenuItem onClick={() => navigate("/dashboard-admin")}>
        <FiGrid style={{ marginRight: "10px" }} />
        Dashboard
    </MenuItem>

    <MenuItem onClick={() => navigate("/dashboard-all-students")}>
        <FiUsers style={{ marginRight: "10px" }} />
        Students
    </MenuItem>

    <MenuItem $active>
        <FiFileText style={{ marginRight: "10px" }} />
        Applications
    </MenuItem>

    <MenuItem onClick={() => navigate("/dashboard-assessment")}>
        <FiCheckSquare style={{ marginRight: "10px" }} />
        Assessment
    </MenuItem>

    <MenuItem onClick={() => navigate("/dashboard-academics")}>
        <FiBookOpen style={{ marginRight: "10px" }} />
        Academics
    </MenuItem>

    <MenuItem>
        <FiFolder style={{ marginRight: "10px" }} />
        Resources
    </MenuItem>

    <MenuItem>
        <FiAward style={{ marginRight: "10px" }} />
        Grades
    </MenuItem>

    <MenuItem>
        <FiStar style={{ marginRight: "10px" }} />
        Certifications
    </MenuItem>

    <BottomLogo>
    <Logo2 src={LogoAA} alt="logo" />
  </BottomLogo>

    </Sidebar>

      {/* MAIN */}
<MainContent>

  <Header>
    <HeaderTitle>Dashboard / Applications </HeaderTitle>

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
    <div style={{ marginBottom: "20px" }}>
      <h2 style={{ marginBottom: "5px" }}>Applications</h2>
      <p style={{ color: "#6b7280" }}>
        Review and process student applications.
      </p>
    </div>

    <StudentsCard>

            <CardHeader>
              <div>
                <CardSubTitle>Active Cohorts</CardSubTitle>
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
                    <th>STUDENT</th>
                    <th>EMAIL</th>
                    <th>TRACK</th>
                    <th>START APPLIED</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.track}</td>
                      <td>{student.period}</td>

                      <td>
                        <StatusBadge status={student.status}>
                          {student.status}
                        </StatusBadge>
                      </td>

                      <td>
                        <ActionButton  onClick={() => {
                                setSelectedStudent(student);
                                setOpenReview(true);
                            }}>
                            Review
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <Footer>
              <span>Showing 1–3 assigments</span>

              <Pagination>
                <span>← Previous</span>
                <PageButton active>1</PageButton>
                <span>Next →</span>
              </Pagination>
            </Footer>

          </StudentsCard>
        </Content>

      </MainContent>

      <ApplicationReview
        open={openReview}
        student={selectedStudent}
        onClose={() => setOpenReview(false)}
        />
    </PageWrapper>
  );
}