import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Sidebar,
  MainContent,
  Logo,
  Menu,
  MenuItem,

  Header,
  HeaderTitle,
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

  CertificatePreview,
  CertificateImage,

  CertificateInfo,
  ReadyBadge,

  CertificateTitle,
  CertificateDescription,

  ButtonContainer,
  DownloadButton,
  ShareButton,
  StatusButton,
  AwardIcon,
  HeaderStatus 

} from "../styles/DashboardStudentCertification.styles";


import LogoImg from "../assets/Logo.PNG";


import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Video,
  BarChart3,
  Award,
  UserRound,

  Bell,
  Search,
  CheckCircle,
  Download,
  Share2

} from "lucide-react";



function DashboardStudentCertification(){
  const navigate = useNavigate();


return (


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

<Search size={19}/>

<Bell size={19}/>

<UserRound size={19}/>


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

<CheckCircle size={16}/>

</RequirementTitle>


<RequirementNumber>

6 <span>/ 6</span>

</RequirementNumber>



<ProgressBar>

<ProgressFill width="100%"/>

</ProgressBar>



<RequirementText>

Required: All modules completed

</RequirementText>


</RequirementCard>





<RequirementCard>


<RequirementTitle>

Attendance Rate

<CheckCircle size={16}/>

</RequirementTitle>



<RequirementNumber>

90%

</RequirementNumber>


<ProgressBar>

<ProgressFill width="90%"/>

</ProgressBar>


<RequirementText>

Required: Minimum 80% attendance

</RequirementText>



</RequirementCard>






<RequirementCard>


<RequirementTitle>

Assessments Passed

<CheckCircle size={16}/>

</RequirementTitle>


<RequirementNumber>

14 <span>/14</span>

</RequirementNumber>


<ProgressBar>

<ProgressFill width="100%"/>

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



<CertificatePreview>


<CertificateImage>


<div className="certificate-inner">


<AwardIcon>
🏅
</AwardIcon>


<small>
CERTIFICATE OF COMPLETION
</small>


<h3>
Dany
</h3>


<p>
Frontend developer Track
</p>


</div>



</CertificateImage>


</CertificatePreview>







<CertificateInfo>



<ReadyBadge>

CERTIFICATE READY

</ReadyBadge>



<CertificateTitle>

Congratulations,
<br/>
Dany!

</CertificateTitle>



<CertificateDescription>

You have successfully completed the
<b> Frontend Developer </b>
track. An email notification has been sent to your registered address.

</CertificateDescription>




<ButtonContainer>


<DownloadButton
onClick={()=> navigate("/certificate")}
>

<Download size={17}/>

Download PDF

</DownloadButton>



<ShareButton>

<Share2 size={17}/>

View & Share

</ShareButton>


</ButtonContainer>




</CertificateInfo>





</CertificateCard>




</CertificateSection>




</Content>





</MainContent>



</Container>


)


}


export default DashboardStudentCertification;