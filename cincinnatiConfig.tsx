import {
  AcademicCapOutline,
  ChartBarOutline,
  ClockOutline,
  StarOutline,
  UserGroupOutline,
} from "heroicons-react";

// Types
import { FieldsResolver, SchoolConfig, SchoolSlugs } from "types/SchoolConfig";
import { Flows } from "types/Flows";
import { ScreenSlugs } from "types/Screen";

// Theme
import schoolConfig from "data/schoolColors/university-of-cincinnati-online.json";
import { LevelOfEducation } from "types/Fields";

import { eduOptions, getCustomEduLevelSelection} from "utils/fieldHelpers";

// Fields
import {
  educationLevelSelect,
  militaryFieldGroup,
  rnQuestion,
} from "components/Form/fields";

const eduLevelsToShow = [
  LevelOfEducation.HIGHSCHOOL,
  LevelOfEducation.GED,
  LevelOfEducation.SOMECOLLEGE,
  LevelOfEducation.ASSOCIATES,
  LevelOfEducation.BACHELORS,
  LevelOfEducation.MASTERS,
  LevelOfEducation.DOCTORATE,
]

const eduLevelsLabelsOverride = { HIGHSCHOOL: "High School Diploma or GED"}

const levels = getCustomEduLevelSelection(eduLevelsToShow, eduLevelsLabelsOverride )

const fields: FieldsResolver = ({ program, baseFields }) => {
  const additionalFields = [];

  const eduLevelProgramIds = [26613, 24991, 24963, 25305, 24961, 24967, 24969];
  if (eduLevelProgramIds.includes(Number(program.id))) {
    additionalFields.push({ ...educationLevelSelect(), options: levels });
  }

  const nursingProgramIds = [25781, 25779, 25783];
  if (nursingProgramIds.includes(Number(program.id))) {
    additionalFields.push(rnQuestion());
  }

  additionalFields.push(militaryFieldGroup());

  return [...baseFields, ...additionalFields];
};

const config: SchoolConfig = {
  schoolId: 583,
  slug: SchoolSlugs.CINCINNATI,
  schoolName: "University of Cincinnati Online",
  image:
    "https://res.cloudinary.com/highereducation/image/upload/f_auto,fl_lossy,q_auto/v1/hosted-lead-flow/university-of-cincinnati/hero.jpg",
  homepage: "https://online.uc.edu/",
  mobius: {
    idToken: "a1d7c5c8-f761-4838-acf9-0b37c927cc23",
  },
  logo: "https://simple-storage-server.highereducation.com/university-of-cincinnati-online.png",
  description:
    "Take your career to the next level with a flexible education that fits your lifestyle. Earn a UC degree fully online with the same faculty and academic excellence. Achieve success with a dedicated support team from admission to graduation.",
  creditStats: {
    general: [],
    masters: [],
    doctorate: [],
    associates: [],
    certificate: [],
    bachelors: [],
  },
  themeColors: schoolConfig.theme,
  tags: {
    online: true,
    notForProfit: true,
    city: "Cincinnati",
    state: "OH",
    isPrivate: false,
  },
  nudges: {
    [ScreenSlugs.LEVELOFEDUCATION]: {
      title: "",
      message: "",
      percentage: 0,
    },
    [ScreenSlugs.GPA]: {
      title: "",
      message: "",
      percentage: 0,
    },
    [ScreenSlugs.WORKEXPERIENCE]: {
      title: "",
      message: "",
      percentage: 0,
    },
    [ScreenSlugs.LOCATION]: {
      title: "",
      message: "",
      percentage: 0,
    },
  },
  fastFacts: [
    {
      title: "Flexibility",
      stat: "",
      description:
        "Our completely online programs enable you to earn your degree without quitting your current job. Designed for students of all ages, these programs help you complete a degree, expand upon your associate’s degree or earn that bachelor’s or master's degree you've been talking about for years.",
      icon: ClockOutline,
    },
    {
      title: "World-Renowned Faculty",
      stat: "",
      description:
        "We are a 200-year-old premier research and higher learning institution whose mission is to help busy professionals like you build a better future. Our online students are equally valued members of our dynamic University of Cincinnati community and graduate with the same prestigious, career-advancing degrees.",
      icon: UserGroupOutline,
    },
    {
      title: "Accreditation",
      stat: "",
      description:
        "UC Online and all regional campuses are accredited by the Higher Learning Commission.",
      icon: StarOutline,
    },
    {
      title: "Top Ranked",
      stat: "",
      description:
        "The University of Cincinnati Online offers students a balance of educational excellence and real-world experience. UC is a public research university with an enrollment of more than 45,000 students and has been named “Among the top tier of the Best National Universities,” according to U.S. News & World Report.",
      icon: ChartBarOutline,
    },
    {
      title: "Start-to-Graduation Support",
      stat: "",
      description:
        "Juggling school, a career and sometimes a family can be difficult. University of Cincinnati Online provides Enrollment Services Advisors and Student Success Coordinators who understand the demands of a busy life. We will guide you through each step of the admissions process, assist you with course selection, answer your questions and keep you on your path toward degree completion.",
      icon: AcademicCapOutline,
    },
  ],
  formDates: [],
  formDatesLabel: "Register By",
  featureFlags: { ProgramToggle: 0 },
  confirmation: {
    meta: {
      text: "Generally, you can expect to be called immediately or within 2 business days, depending on the availability of the school’s counselors. If you miss your call, University of Cincinnati Online will try again. Calls average 20-30 minutes, and you’ll typically receive a follow-up email afterwards.",
    },
  },
  fields,
  tcpa: "By submitting this form I accept the privacy policy and understand that University of Cincinnati may contact me via telephone, email, and/or text messages about educational programs using an automated technology.",
  showNextStartDate: true,
};

export default {
  slug: SchoolSlugs.CINCINNATI,
  configs: [
    {
      flow: Flows.BASEFULLFORM,
      config,
    },
  ],
};
