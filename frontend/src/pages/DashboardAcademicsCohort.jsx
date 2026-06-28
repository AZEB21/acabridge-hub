import React, { useState } from "react";

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

  ProgramsCard,
  FilterContainer,
  FilterButton,

  ProgramsGrid,
  ProgramCard,

  ProgramHeader,
  ProgramStats,
  StatBox,

  CardActions,
  ViewButton,

  StatusBadge,
  DateText,
  MenuContainer,

} from "../styles/DashboardAcademicsCohort.styles";


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



export default function AcademicsCohort(){

const [activeFilter,setActiveFilter] = useState("Cohorts");


const filters = [
  "Programs",
  "Cohorts"
];



const cohorts = [

{
 id:1,
 name:"Cohort 1",
 date:"May 9, 2026 - Aug 1, 2026",
 status:"Active",
 students:"1300 Enrolled",
 programs:"12 Tracks",
 certificates:"None"
},


{
 id:2,
 name:"Cohort 10",
 date:"May 10, 2026 - Aug 1, 2026",
 status:"Draft",
 students:"None",
 programs:"12 Tracks",
 certificates:"None"
},


{
 id:3,
 name:"Cohort 2",
 date:"May 1, 2026 - Aug 1, 2026",
 status:"Completed",
 students:"1300 Enrolled",
 programs:"12 Tracks",
 certificates:"1204 Issued"
},


{
 id:4,
 name:"Cohort 3",
 date:"May 1, 2026 - Aug 1, 2026",
 status:"Completed",
 students:"1300 Enrolled",
 programs:"12 Tracks",
 certificates:"1204 Issued"
},


{
 id:5,
 name:"Cohort 4",
 date:"May 1, 2026 - Aug 1, 2026",
 status:"Completed",
 students:"1300 Enrolled",
 programs:"12 Tracks",
 certificates:"1204 Issued"
},


{
 id:6,
 name:"Cohort 5",
 date:"May 1, 2026 - Jun 1, 2026",
 status:"Completed",
 students:"1300 Enrolled",
 programs:"12 Tracks",
 certificates:"1204 Issued"
}

];



return (

<PageWrapper>


{/* SIDEBAR */}

<Sidebar>

<div>

<Logo src={LogoImg}/>


<MenuContainer>

<MenuItem>
<FiGrid/> Dashboard
</MenuItem>


<MenuItem>
<FiUsers/> Students
</MenuItem>


<MenuItem>
<FiFileText/> Applications
</MenuItem>


<MenuItem>
<FiCheckSquare/> Assessment
</MenuItem>


<MenuItem $active>
<FiBookOpen/> Academics
</MenuItem>


<MenuItem>
<FiFolder/> Resources
</MenuItem>


<MenuItem>
<FiAward/> Grades
</MenuItem>


<MenuItem>
<FiStar/> Certifications
</MenuItem>


</MenuContainer>


</div>



<BottomLogo>

<Logo2 src={LogoAA}/>

</BottomLogo>


</Sidebar>





{/* MAIN */}


<MainContent>


<Header>


<HeaderTitle>
Dashboard / Academics
</HeaderTitle>


<HeaderRight>


<IconCircle>
<FiHeart/>
</IconCircle>



<IconCircle>

<FiBell/>

<Badge>
5
</Badge>

</IconCircle>



<Avatar>

<FiChevronDown/>

</Avatar>


</HeaderRight>


</Header>






<Content>



<TopSection>

<div>

<h2>
Cohort Management
</h2>

<p>
Plan and run cohorts across all tracks.
</p>

</div>



<ButtonGroup>

<button>
Add Cohort
</button>


<button>
+ Add Program
</button>


</ButtonGroup>


</TopSection>






<ProgramsCard>


<h3>
All Cohorts
</h3>



<FilterContainer>


{
filters.map(filter=>(

<FilterButton

key={filter}

active={activeFilter===filter}

onClick={()=>setActiveFilter(filter)}

>

{filter}


</FilterButton>


))

}


</FilterContainer>





{

<ProgramsGrid>


{

cohorts.map(cohort=>(



<ProgramCard key={cohort.id}>


<DateText>
{cohort.date}
</DateText>



<ProgramHeader>

{cohort.name}



<StatusBadge status={cohort.status}>

{cohort.status}

</StatusBadge>


</ProgramHeader>






<ProgramStats>


<StatBox>

<span>
Students
</span>

<strong>
{cohort.students}
</strong>

</StatBox>





<StatBox>

<span>
Programs
</span>

<strong>
{cohort.programs}
</strong>

</StatBox>





<StatBox>

<span>
Certificates
</span>

<strong>
{cohort.certificates}
</strong>

</StatBox>



</ProgramStats>





<CardActions>


<ViewButton>

View Cohort Details

</ViewButton>


</CardActions>




</ProgramCard>



))


}


</ProgramsGrid>



}




</ProgramsCard>



</Content>


</MainContent>



</PageWrapper>

)


}