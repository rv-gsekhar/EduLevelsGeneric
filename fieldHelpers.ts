import { LevelOfEducation } from "types/Fields";

export const eduOptions = {
  HIGHSCHOOL: "High School Diploma",
  GED: "GED",
  SOMECOLLEGE: "Some College",
  ASSOCIATES: "Associate's Degree",
  BACHELORS: "Bachelor's Degree",
  MASTERS: "Master's Degree",
  DOCTORATE: "Doctorate Degree",
  INPROGRESSBACHELORS: "Bachelor's in progress",
  INPROGRESSMASTERS: "Master's in progress"
}

export const getCustomEduLevelSelection = (levelsNeeded: LevelOfEducation[] = [], labelOverrides?: { [x: string]: string}) => {
  if (levelsNeeded.length === 0) {
    return Object.entries(LevelOfEducation).map(([k,v]) => ({key: k, value: v, label: labelOverrides ? labelOverrides[k] : eduOptions[k]}))

  }
  return Object.entries(LevelOfEducation).filter(([k, v]) => levelsNeeded.includes(v))
  

}
  //  const res = Object.keys(eduOptions).filter(key => levelsNeeded.includes(key))
  // const res = Object.entries(eduOptions).filter((k, v) => levelsNeeded.includes(k))
  // const res = Object.entries(eduOptions).filter((k,v) => { k in levelsNeeded }) ;
  // res.map((k,v) => ({k: labelOverrides[k] || v}) )  
  // let thisSchoolLevels = [];
  // for (let eLevel in levelsNeeded) {
  //   if (eduOptions[eLevel])
  //     thisSchoolLevels.push({key: eLevel, value: eLevel, label: labelOverrides[eLevel] | eduOptions[eLevel]})
  // }  

  // return thisSchoolLevels


