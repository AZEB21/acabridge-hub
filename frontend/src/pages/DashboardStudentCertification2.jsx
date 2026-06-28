import React from "react";

import {
Container,
Sidebar,
MainContent,
Logo,
Menu,
MenuItem,

Header,
HeaderTitle,
HeaderStatus,
StatusButton,
IconGroup,

Content,

Title,
Description,

RequirementsContainer,
RequirementCard,
RequirementTitle,
RequirementNumber,
ProgressBar,
ProgressFill,
RequirementText,

CertificateSection,
CertificateCard,
LockedContent,
LockIcon,
LockedTitle,
LockedText

} from "../styles/DashboardStudentCertification2.styles";


import LogoImg from "../assets/Logo.PNG";


import {
LayoutDashboard,
BookOpen,
FileText,
Video,
BarChart3,
Award,
UserRound,

Search,
Bell,
LockKeyhole

} from "lucide-react";





function DashboardStudentCertification2(){


return(


<Container>



{/* SIDEBAR */}

<Sidebar>


<Logo>

<img src={LogoImg} alt="Acabridge"/>

</Logo>



<Menu>



<MenuItem>

<LayoutDashboard size={16}/>
Dashboard

</MenuItem>



<MenuItem>

<BookOpen size={16}/>
My Courses

</MenuItem>



<MenuItem>

<FileText size={16}/>
Assignments

</MenuItem>




<MenuItem>

<Video size={16}/>
Live Classes

</MenuItem>




<MenuItem>

<BarChart3 size={16}/>
My Grades

</MenuItem>




<MenuItem active>

<Award size={16}/>
Certification

</MenuItem>




<MenuItem>

<UserRound size={16}/>
Profile

</MenuItem>



</Menu>


</Sidebar>





{/* MAIN */}


<MainContent>



<Header>



<HeaderTitle>

Dashboard / Certification

</HeaderTitle>



<HeaderStatus>


<StatusButton>

In Progress

</StatusButton>


<StatusButton earned>

Earned

</StatusButton>



</HeaderStatus>





<IconGroup>


<Search size={18}/>


<Bell size={18}/>


<UserRound size={18}/>


</IconGroup>



</Header>







<Content>



<Title>

Certification

</Title>


<Description>

Track your requirements and download your official certificate

</Description>





<h3>
Completion Requirements
</h3>





<RequirementsContainer>



<RequirementCard>


<RequirementTitle>

Modules Completed

<LockKeyhole size={15}/>

</RequirementTitle>



<RequirementNumber>

4 <span>/ 6</span>

</RequirementNumber>




<ProgressBar>

<ProgressFill width="67%" blue/>

</ProgressBar>




<RequirementText>

Required: All modules completed

</RequirementText>


</RequirementCard>







<RequirementCard>


<RequirementTitle>

Attendance Rate

<LockKeyhole size={15}/>

</RequirementTitle>



<RequirementNumber orange>

75%

</RequirementNumber>



<ProgressBar>

<ProgressFill width="75%" orange/>

</ProgressBar>




<RequirementText>

Required: Minimum 80% attendance

</RequirementText>


</RequirementCard>







<RequirementCard>


<RequirementTitle>

Assessments Passed

<LockKeyhole size={15}/>

</RequirementTitle>



<RequirementNumber>

10 <span>/ 14</span>

</RequirementNumber>



<ProgressBar>

<ProgressFill width="71%" purple/>

</ProgressBar>




<RequirementText>

Required: Pass all assignments

</RequirementText>



</RequirementCard>






</RequirementsContainer>







<CertificateSection>



<h3>
Your Certificate
</h3>






<CertificateCard>



<LockedContent>



<LockIcon>

<LockKeyhole size={35}/>

</LockIcon>




<LockedTitle>

Certificate Locked

</LockedTitle>




<LockedText>

You must complete all modules, pass all assessments, and
maintain at least an 80% attendance rate to unlock your official certificate.

</LockedText>



</LockedContent>





</CertificateCard>






</CertificateSection>







</Content>






</MainContent>






</Container>


)

}


export default DashboardStudentCertification2;