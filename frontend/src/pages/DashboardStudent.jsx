import {
  Container,
  Sidebar,
  MainContent,
  Logo,
  Menu,
  MenuItem,
  Header,
  HeaderTitle,
  WelcomeBanner,
  WelcomeText,
  WelcomeSmallText,
  BadgeContainer,
  Badge,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  ContentGrid,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAll,
  ClassesContainer,
  ClassCard,
  LiveBadge,
  UpcomingBadge,
  ClassTitle,
  ClassDate,
  JoinButton,
  AssignmentContainer,
  AssignmentCard,
  AssignmentTitle,
  AssignmentText,
  PassedBadge,
  PendingBadge,
  ReviewText,
  LearningSection,
  LearningHeader,
  ProgressBar,
  ProgressFill,
  CourseItem,
  CourseInfo,
  CourseTitle,
  CourseLessons,
  ProgressPercent,
  IconGroup,
} from "../styles/DashboardStudent.styles.jsx";
import LogoImg2 from "../assets/Logo.PNG";
import { Settings , Bell, User } from "lucide-react";

function DashboardStudent  () {
  return (
    <Container>
      <Sidebar>
        <Logo> 
            <img src={LogoImg2} alt="Acabridge logo" />
        </Logo>

        <Menu>
          <MenuItem active>Dashboard</MenuItem>
          <MenuItem>My Courses</MenuItem>
          <MenuItem>Live Classes</MenuItem>
          <MenuItem>Assignments</MenuItem>
          <MenuItem>My Grades</MenuItem>
          <MenuItem>Certification</MenuItem>
          <MenuItem>Profile</MenuItem>
        </Menu>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>Dashboard</HeaderTitle>
          <IconGroup>
            <Bell size={20} />
            <Settings size={20} />
            <User size={20} />
          </IconGroup>
         </Header>

        <WelcomeBanner>
          <div>
            <WelcomeSmallText>Welcome Back</WelcomeSmallText>

            <WelcomeText>Dany Mabouanda👋</WelcomeText>

            <BadgeContainer>
              <Badge>Cohort 09 · Jan - Oct 2026</Badge>
              <Badge green>Frontend developper</Badge>
            </BadgeContainer>
          </div>

          <Badge enrolled>Enrolled</Badge>
        </WelcomeBanner>

        <StatsContainer>
          <StatCard>
            <StatNumber>62%</StatNumber>
            <StatLabel>Course Completion</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>88%</StatNumber>
            <StatLabel>Attendance Rate</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>4/6</StatNumber>
            <StatLabel>Assessments Passed</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>0</StatNumber>
            <StatLabel>Certificates Earned</StatLabel>
          </StatCard>
        </StatsContainer>

        <ContentGrid>
          <Section>
            <SectionHeader>
              <SectionTitle>Upcoming Live Classes</SectionTitle>

              <ViewAll>View full schedule →</ViewAll>
            </SectionHeader>

            <ClassesContainer>
              <ClassCard>
                <LiveBadge>Live now</LiveBadge>

                <ClassTitle>
                  User Research Live Workshop
                </ClassTitle>

                <ClassDate>
                  Mon, May 25 · 4:00 PM WAT
                </ClassDate>

                <JoinButton filled>
                  Join Class
                </JoinButton>
              </ClassCard>

              <ClassCard>
                <UpcomingBadge>Upcoming</UpcomingBadge>

                <ClassTitle>
                  User Research Live Workshop
                </ClassTitle>

                <ClassDate>
                  Mon, May 25 · 4:00 PM WAT
                </ClassDate>

                <JoinButton>
                  Join Class
                </JoinButton>
              </ClassCard>

              <ClassCard>
                <UpcomingBadge>Upcoming</UpcomingBadge>

                <ClassTitle>
                  User Research Live Workshop
                </ClassTitle>

                <ClassDate>
                  Mon, May 25 · 4:00 PM WAT
                </ClassDate>

                <JoinButton>
                  Join Class
                </JoinButton>
              </ClassCard>
            </ClassesContainer>
          </Section>

          <AssignmentContainer>
            <SectionTitle>
              Recent Assignments
            </SectionTitle>

            <AssignmentCard>
              <div>
                <AssignmentTitle>
                  Foundations Quiz
                </AssignmentTitle>

                <AssignmentText>
                  Foundations of product thinking
                </AssignmentText>
              </div>

              <div>
                <PassedBadge>Passed ✓</PassedBadge>
                <ReviewText>review →</ReviewText>
              </div>
            </AssignmentCard>

            <AssignmentCard>
              <div>
                <AssignmentTitle>
                  Discovery Quiz
                </AssignmentTitle>

                <AssignmentText>
                  Discovery & user research
                </AssignmentText>
              </div>

              <div>
                <PendingBadge>pending</PendingBadge>
                <ReviewText>review →</ReviewText>
              </div>
            </AssignmentCard>

            <AssignmentCard>
              <div>
                <AssignmentTitle>
                  Discovery Quiz
                </AssignmentTitle>

                <AssignmentText>
                  Discovery & user research
                </AssignmentText>
              </div>

              <div>
                <PassedBadge>Passed ✓</PassedBadge>
                <ReviewText>review →</ReviewText>
              </div>
            </AssignmentCard>
          </AssignmentContainer>
        </ContentGrid>

        <LearningSection>
          <LearningHeader>
            <div>
              <AssignmentText>My Learning</AssignmentText>

              <SectionTitle>
                Product Management
              </SectionTitle>
            </div>

            <ViewAll>
              View full schedule →
            </ViewAll>
          </LearningHeader>

          <AssignmentText>
            Track progress
          </AssignmentText>

          <ProgressBar>
            <ProgressFill />
          </ProgressBar>

          <CourseItem>
            <CourseInfo>
              <CourseTitle>
                Foundations of Product Thinking
              </CourseTitle>

              <CourseLessons>
                12 lessons
              </CourseLessons>
            </CourseInfo>

            <ProgressPercent success>
              100%
            </ProgressPercent>
          </CourseItem>

          <CourseItem>
            <CourseInfo>
              <CourseTitle>
                Discovery & User Research
              </CourseTitle>

              <CourseLessons>
                4 lessons
              </CourseLessons>
            </CourseInfo>

            <ProgressPercent>
              34%
            </ProgressPercent>
          </CourseItem>

          <CourseItem>
            <CourseInfo>
              <CourseTitle>
                Roadmapping & Prioritization
              </CourseTitle>

              <CourseLessons>
                4 lessons
              </CourseLessons>
            </CourseInfo>

            <ProgressPercent>
              34%
            </ProgressPercent>
          </CourseItem>

          <CourseItem>
            <CourseInfo>
              <CourseTitle>
                Launch & Growth
              </CourseTitle>

              <CourseLessons>
                1 lessons
              </CourseLessons>
            </CourseInfo>

            <ProgressPercent>
              34%
            </ProgressPercent>
          </CourseItem>
        </LearningSection>
      </MainContent>
    </Container>
  );
};

export default DashboardStudent;