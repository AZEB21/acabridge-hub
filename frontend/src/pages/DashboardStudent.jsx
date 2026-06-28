import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ClipboardList,
  Video,
  BarChart2,
  Award,
  User,
  ArrowRight,
} from "lucide-react";
import { getDashboard } from "../api/auth";
import AppLayout from "../components/AppLayout";
import {
  PageBody,
  WelcomeBanner,
  WelcomeLeft,
  WelcomeBack,
  WelcomeName,
  WelcomeBadges,
  CohortBadge,
  TrackBadge,
  EnrolledBadge,
  StatsRow,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel,
  ContentGrid,
  Card,
  CardHeader,
  CardTitle,
  ViewAllLink,
  ClassesGrid,
  ClassCard,
  LiveBadge,
  UpcomingBadge,
  ClassTitle,
  ClassDate,
  JoinButton,
  AssignmentList,
  AssignmentCard,
  AssignmentInfo,
  AssignmentTitle,
  AssignmentSub,
  AssignmentActions,
  PassedBadge,
  PendingBadge,
  ReviewLink,
  LearningMeta,
  LearningTitle,
  ProgressLabel,
  ProgressLabelText,
  ProgressLabelPct,
  ProgressBarWrap,
  ProgressFill,
  CourseList,
  CourseRow,
  CourseLeft,
  CourseDot,
  CourseInfo,
  CourseTitle,
  CourseLessons,
  ProgressPercent,
  IconGroup,
   CoursePct,
  LoadingWrap,
  ErrorBanner,
  Container
} from "../styles/DashboardStudent.styles";
import LogoImg2 from "../assets/Logo.PNG";
import { Settings , Bell, User } from "lucide-react";
 
/* ── Static mock data ── */
const MOCK_CLASSES = [
  { id: 1, title: "User Research Live Workshop", date: "Mon, May 25 · 4:00 PM WAT", status: "live",     link: "#" },
  { id: 2, title: "User Research Live Workshop", date: "Mon, May 25 · 4:00 PM WAT", status: "upcoming", link: "#" },
  { id: 3, title: "User Research Live Workshop", date: "Mon, May 25 · 4:00 PM WAT", status: "upcoming", link: "#" },
];

const MOCK_ASSIGNMENTS = [
  { id: 1, title: "Foundations Quiz",  subtitle: "Foundations of product thinking", status: "passed" },
  { id: 2, title: "Discovery Quiz",    subtitle: "Discovery & user research",        status: "pending" },
  { id: 3, title: "Discovery Quiz",    subtitle: "Discovery & User Research",         status: "passed" },
];

const MOCK_COURSES = [
  { id: 1, title: "Foundations of Product Thinking", lessons: 12, pct: 100 },
  { id: 2, title: "Discovery & User Research",        lessons: 4,  pct: 34 },
  { id: 3, title: "Roadmapping & Prioritization",     lessons: 4,  pct: 34 },
  { id: 4, title: "Launch & Growth",                  lessons: 1,  pct: 34 },
];

const MOCK_STATS = {
  courseCompletion:   62,
  attendanceRate:     88,
  assessmentsPassed:  "4/6",
  certificatesEarned: 0,
};

/* ── Component ── */
export default function DashboardStudent() {
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    getDashboard()
      .then(({ data }) => { setDashData(data); setLoading(false); })
      .catch((err) => {
        if (err.response?.status === 401) { localStorage.clear(); navigate("/signin"); }
        else { setError("Could not load dashboard. Please refresh."); setLoading(false); }
      });
  }, [navigate]);

  if (loading) {
    return <Container><LoadingWrap>Loading your dashboard…</LoadingWrap></Container>;
  }

  const user        = dashData?.user;
  const application = dashData?.application;
  const firstName   = user?.full_name?.split(" ")[0] || "Student";
  const fullName    = user?.full_name || "Student";
  const cohortName  = application?.cohort          || "Cohort 09 · Jan - Oct 2026";
  const trackName   = application?.training_track  || "Product Management";
  const isEnrolled  = application?.status === "enrolled";

  return (
    <AppLayout title="Dashboard" activeNav="/dashboard/student">
      <PageBody>
        {error && <ErrorBanner role="alert">{error}</ErrorBanner>}

        {/* Welcome banner */}
        <WelcomeBanner>
          <WelcomeLeft>
            <WelcomeBack>Welcome Back</WelcomeBack>
            <WelcomeName>{firstName} {fullName.split(" ").slice(1).join(" ")} 👋</WelcomeName>
            <WelcomeBadges>
              <CohortBadge>{cohortName}</CohortBadge>
              <TrackBadge>{trackName}</TrackBadge>
            </WelcomeBadges>
          </WelcomeLeft>
          {isEnrolled && <EnrolledBadge>Enrolled</EnrolledBadge>}
        </WelcomeBanner>

        {/* Stats */}
        <StatsRow>
          <StatCard>
            <StatIcon><BookOpen size={20} /></StatIcon>
            <StatNumber>{MOCK_STATS.courseCompletion}%</StatNumber>
            <StatLabel>Course Completion</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon><User size={20} /></StatIcon>
            <StatNumber>{MOCK_STATS.attendanceRate}%</StatNumber>
            <StatLabel>Attendance Rate</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon><ClipboardList size={20} /></StatIcon>
            <StatNumber>{MOCK_STATS.assessmentsPassed}</StatNumber>
            <StatLabel>Assessments Passed</StatLabel>
          </StatCard>
          <StatCard>
            <StatIcon><Award size={20} /></StatIcon>
            <StatNumber>{MOCK_STATS.certificatesEarned}</StatNumber>
            <StatLabel>Certificates Earned</StatLabel>
          </StatCard>
        </StatsRow>

        {/* Live classes + Assignments */}
        <ContentGrid>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Live Classes</CardTitle>
              <ViewAllLink onClick={() => navigate("/live-classes")}>
                View full schedule <ArrowRight size={13} />
              </ViewAllLink>
            </CardHeader>
            <ClassesGrid>
              {MOCK_CLASSES.map((cls) => (
                <ClassCard key={cls.id}>
                  {cls.status === "live" ? <LiveBadge>Live now</LiveBadge> : <UpcomingBadge>Upcoming</UpcomingBadge>}
                  <ClassTitle>{cls.title}</ClassTitle>
                  <ClassDate>{cls.date}</ClassDate>
                  <JoinButton
                    $filled={cls.status === "live"}
                    onClick={() => cls.link !== "#" && window.open(cls.link, "_blank")}
                    aria-label={`Join ${cls.title}`}
                  >
                    Join Class
                  </JoinButton>
                </ClassCard>
              ))}
            </ClassesGrid>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
            </CardHeader>
            <AssignmentList>
              {MOCK_ASSIGNMENTS.map((a) => (
                <AssignmentCard key={a.id}>
                  <AssignmentInfo>
                    <AssignmentTitle>{a.title}</AssignmentTitle>
                    <AssignmentSub>{a.subtitle}</AssignmentSub>
                  </AssignmentInfo>
                  <AssignmentActions>
                    {a.status === "passed"
                      ? <PassedBadge>Passed ✓</PassedBadge>
                      : <PendingBadge>pending</PendingBadge>
                    }
                    <ReviewLink onClick={() => navigate("/assignments")}>
                      review <ArrowRight size={11} />
                    </ReviewLink>
                  </AssignmentActions>
                </AssignmentCard>
              ))}
            </AssignmentList>
          </Card>
        </ContentGrid>

        {/* My Learning */}
        <Card>
          <CardHeader>
            <div>
              <LearningMeta>My Learning</LearningMeta>
              <LearningTitle>{trackName}</LearningTitle>
            </div>
            <ViewAllLink onClick={() => navigate("/courses")}>
              View full schedule <ArrowRight size={13} />
            </ViewAllLink>
          </CardHeader>

          <ProgressLabel>
            <ProgressLabelText>Track progress</ProgressLabelText>
            <ProgressLabelPct>{MOCK_STATS.courseCompletion}%</ProgressLabelPct>
          </ProgressLabel>
          <ProgressBarWrap>
            <ProgressFill $pct={`${MOCK_STATS.courseCompletion}%`} />
          </ProgressBarWrap>

          <CourseList>
            {MOCK_COURSES.map((course) => (
              <CourseRow key={course.id} onClick={() => navigate("/courses")} style={{ cursor: "pointer" }}>
                <CourseLeft>
                  <CourseDot />
                  <CourseInfo>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseLessons>{course.lessons} lessons</CourseLessons>
                  </CourseInfo>
                </CourseLeft>
                <CoursePct $done={course.pct === 100}>
                  {course.pct === 100 ? "100% ✓" : `${course.pct}%`}
                </CoursePct>
              </CourseRow>
            ))}
          </CourseList>
        </Card>
      </PageBody>
    </AppLayout>
  );
}
