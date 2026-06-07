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
  CardTitle,
  TopActions,
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
  Logo2,
  BottomLogo,
  MenuContainer,

} from "../styles/DashboardAllStudents.styles";

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

export default function DashboardAllStudents() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Review", "Accepted", "Rejected", "Enrolled", "Applied"];

  const students = [
    {
      id: 1,
      name: "John Doe",
      email: "john@mail.com",
      track: "Frontend",
      attendance: "90%",
      progress: 70,
      certificate: "Issued",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@mail.com",
      track: "Backend",
      attendance: "80%",
      progress: 50,
      certificate: "Pending",
    },
  ];

  return (
    <PageWrapper>

      {/* SIDEBAR */}
    <Sidebar>
    <Logo src={LogoImg} alt="logo" />

    <MenuItem $active>
        <FiGrid style={{ marginRight: "10px" }} />
        Dashboard
    </MenuItem>

    <MenuItem>
        <FiUsers style={{ marginRight: "10px" }} />
        Students
    </MenuItem>

    <MenuItem>
        <FiFileText style={{ marginRight: "10px" }} />
        Applications
    </MenuItem>

    <MenuItem>
        <FiCheckSquare style={{ marginRight: "10px" }} />
        Assessment
    </MenuItem>

    <MenuItem>
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
    <HeaderTitle>Dashboard / Students</HeaderTitle>

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
      <h2 style={{ marginBottom: "5px" }}>Student Management</h2>
      <p style={{ color: "#6b7280" }}>
        Search, filter and manage enrolled students.
      </p>
    </div>

    <StudentsCard>

            <CardHeader>
              <div>
                <CardSubTitle>COHORTS 1</CardSubTitle>
                <CardTitle>All Students</CardTitle>
              </div>

              <TopActions>
                <select className="cohortSelect">
                    <option value="cohort1">Cohort 1</option>
                    <option value="cohort2">Cohort 2</option>
                    <option value="cohort3">Cohort 3</option>
                </select>
              </TopActions>
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
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>TRACK</th>
                    <th>ATTENDANCE</th>
                    <th>PROGRESS</th>
                    <th>CERTIFICATE</th>
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
                      <td>{student.attendance}</td>

                      <td>
                        <ProgressBar>
                          <span style={{ width: `${student.progress}%` }} />
                        </ProgressBar>
                      </td>

                      <td>
                        <StatusBadge status={student.certificate}>
                          {student.certificate}
                        </StatusBadge>
                      </td>

                      <td>
                        <ActionButton>View</ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>

            <Footer>
              <span>Showing 1–2 students</span>

              <Pagination>
                <span>← Previous</span>
                <PageButton active>1</PageButton>
                <span>Next →</span>
              </Pagination>
            </Footer>

          </StudentsCard>
        </Content>

      </MainContent>

    </PageWrapper>
  );
}