import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";

import {
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
  AwardIcon,

} from "../styles/DashboardStudentCertification.styles";

import {
  CheckCircle,
  Download,
  Share2

} from "lucide-react";



function DashboardStudentCertification(){
  const navigate = useNavigate();


return (


<AppLayout title="Dashboard / Certification" activeNav="/certification">


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

View &amp; Share

</ShareButton>


</ButtonContainer>




</CertificateInfo>




</CertificateCard>




</CertificateSection>




</Content>


</AppLayout>


)


}


export default DashboardStudentCertification;
