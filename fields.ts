/* eslint-disable no-shadow */
import { validEmail } from "utils/formFieldValidators";

import {
  Field,
  FieldGroup,
  InputChange,
  Military,
  FIELDKEYS,
  YesNoCurrent,
  OptInTypes,
  LevelOfEducation,
} from "types/Fields";

export type FieldProps = {
  label: string;
  value?: string;
  defaultValue?: string;
  name?: string;
};

export type FieldPropsWithEvent = {
  label: string;
  value: string;
  onInput?: InputChange;
  onChange?: InputChange;
};

export type FieldPropsLabelOnly = Pick<FieldProps, "label">;

export type FieldCreator = ({
  label,
  value,
  name,
  defaultValue,
}: FieldProps) => Field;

export type FieldCreatorWithEvent = ({
  label,
  onChange,
}: FieldPropsWithEvent) => Field;

export type FieldCreatorLabelOnly = ({ label }: FieldProps) => Field;

export type FieldGroupLabel = (
  name: string,
  label: string
) => {
  name: string;
  type: string;
  label: string;
};

export const fieldGroupLabel: FieldGroupLabel = (name, label) => ({
  name,
  type: "fieldGroupLabel",
  label,
});

export const fieldGroup = (name: string, subFields: Field[]): FieldGroup => ({
  name,
  type: "group",
  subFields,
});

export const firstName: Field = {
  type: "text",
  name: FIELDKEYS.FIRSTNAME,
  label: "First name",
  validationRules: {
    required: {
      value: true,
      message: "First Name is required.",
    },
    maxLength: 50,
    pattern: /[A-Za-z]/,
  },
  width: "50%",
  pii: true,
};

export const lastName: Field = {
  type: "text",
  name: FIELDKEYS.LASTNAME,
  label: "Last name",
  validationRules: {
    maxLength: 50,
    required: {
      value: true,
      message: "Last Name is required.",
    },
    pattern: /[A-Za-z]/,
  },
  width: "50%",
  pii: true,
};

export const address: Field = {
  type: "address",
  name: FIELDKEYS.ADDRESS,
  label: "Address",
  validationRules: {
    required: true,
  },
  width: "full",
  pii: true,
};

export const city = (width?: "full" | "half"): Field => ({
  type: "text",
  name: FIELDKEYS.CITY,
  label: "City",
  validationRules: {
    required: true,
  },
  width,
});

export const state: Field = {
  type: "text",
  name: FIELDKEYS.STATE,
  label: "State",
  validationRules: {
    minLength: {
      value: 5,
      message: "State must be the full state name",
    },
    maxLength: {
      value: 50,
      message: "State name is too long",
    },
    required: {
      value: true,
      message: "State is required",
    },
  },
  width: "50%",
  pii: true,
};

export const stateAbbr: Field = {
  type: "select",
  name: FIELDKEYS.STATE,
  label: "State",
  validationRules: {
    required: {
      value: true,
      message: "State is required",
    },
  },
  width: "50%",
  pii: true,
};

export const zip = (width?: "full" | "half"): Field => ({
  type: "number",
  name: FIELDKEYS.ZIP,
  label: "Zip code",
  validationRules: {
    minLength: {
      value: 5,
      message: "Zip Code must be 5 digits",
    },
    maxLength: {
      value: 5,
      message: "Zip Code must be 5 digits",
    },
    required: {
      value: true,
      message: "A valid Zip Code is required.",
    },
  },
  width,
});

export const country: FieldCreatorWithEvent = ({ label, value, onChange }) => ({
  type: "radio",
  name: FIELDKEYS.COUNTRY,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "standard",
  onChange,
});

export const phone = (width?: "full" | "half"): Field => ({
  type: "tel",
  name: FIELDKEYS.PHONENUMBER,
  label: "Phone number",
  validationRules: {
    minLength: {
      value: 12,
      message: "A valid Phone Number is required.",
    },
    maxLength: {
      value: 15,
      message: "A valid Phone Number is required.",
    },
    required: {
      value: true,
      message: "A valid Phone Number is required.",
    },
  },
  width,
  pii: true,
});
phone.pii = true;

Object.defineProperty(phone, "name", {
  value: "phoneNumber",
  configurable: true,
});

export const email = (width?: "full" | "half"): Field => ({
  type: "email",
  name: FIELDKEYS.EMAIL,
  label: "Email",
  validationRules: {
    required: {
      value: true,
      message: "Email is required.",
    },
    pattern: {
      value: validEmail,
      message: "Invalid email supplied",
    },
  },
  width,
  pii: true,
});
// @TODO - re evaluate this
// https://github.com/HigherEducation/hosted-lead-flow/issues/386
email.pii = true;

Object.defineProperty(email, "name", {
  value: "email",
  configurable: true,
});

export const gradYearSelect = (label?: string): Field => ({
  type: "select",
  name: FIELDKEYS.GRADYEAR,
  label: label || "Graduation year",
  validationRules: {
    required: {
      value: true,
      message: "Graduation year is required.",
    },
  },
  width: "full",
  pii: true,
});

export const campusSelect = (label?: string): Field => ({
  type: "select",
  name: FIELDKEYS.CAMPUS,
  label: label || "Desired campus",
  validationRules: {
    required: {
      value: true,
      message: "Campus is required.",
    },
  },
  width: "full",
});

export const startTerm = (label?: string): Field => ({
  type: "select",
  name: FIELDKEYS.STARTDATE,
  label: label || "Anticipated start term",
  validationRules: {
    required: {
      value: true,
      message: "Start term is required.",
    },
  },
  width: "full",
  pii: true,
});

export const educationLevel: FieldCreator = ({ label, value }) => ({
  name: FIELDKEYS.LEVELOFEDUCATION,
  type: "radio",
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

export const educationLevelSelect = (label?: string, value?:LevelOfEducation): Field => ({
  type: "select",
  name: FIELDKEYS.LEVELOFEDUCATION,
  label: label || "Highest level of education",
  validationRules: {
    required: {
      value: true,
      message: "Level of education is required.",
    },
  },
  width: "full",
  value: value || label
});

export const gpa: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.GPA,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

export const gpaSelect = (label?: string): Field => ({
  type: "select",
  name: FIELDKEYS.GPA,
  label: label || "GPA",
  validationRules: {
    required: {
      value: true,
      message: "GPA is required",
    },
  },
  width: "full",
});

export const yearsWorkedSelect = (label?: string): Field => ({
  type: "select",
  name: FIELDKEYS.YEARSOFWORKEXPERIENCE,
  label: label || "Years of professional-level experience in this field",
  validationRules: {
    required: {
      value: true,
      message: "Work experience is required",
    },
  },
  width: "full",
});

export const startDateSelect = (label?: string): Field => ({
  type: "select",
  name: FIELDKEYS.STARTDATE,
  label: label || "Anticipated start date",
  validationRules: {
    required: {
      value: true,
      message: "Start Date is required",
    },
  },
  width: "full",
});

export const militaryExp: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.MILITARY,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

export const militaryExpStandard: FieldCreator = ({
  label,
  value,
  defaultValue,
}) => ({
  type: "radio",
  name: FIELDKEYS.MILITARY,
  label,
  validationRules: {
    required: true,
  },
  value,
  defaultValue,
  width: "25%",
  format: "standard",
});

export const militaryFieldGroup = (defaultValue = Military.NO): FieldGroup =>
  fieldGroup("militaryRadioGroup", [
    fieldGroupLabel(
      "militaryRadioGroupLabel",
      "Are you or your spouse active duty, a reservist, or veteran of the U.S. Military?"
    ),
    militaryExpStandard({
      label: "Yes",
      value: Military.YES,
    }),
    militaryExpStandard({
      label: "No",
      value: Military.NO,
      defaultValue,
    }),
  ]);

export const hasRn: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.HASRNLICENSE,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

export const hasRnStandard: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.HASRNLICENSE,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "25%",
  format: "standard",
});

export const yearsWorked = (label: string): Field => ({
  type: "radio",
  name: FIELDKEYS.YEARSOFWORKEXPERIENCE,
  label,
  validationRules: {
    required: true,
  },
  width: "50%",
  format: "number",
});

export const startDate: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.STARTDATE,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

export const rnDegreeInterest: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.DEGREEINTEREST,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

export const rnProgramTrack: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.PROGRAMTRACK,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

export const assocDegree: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.UNDERGRADCOMPLETED,
  label,
  validationRules: {
    required: true,
  },
  width: "50%",
  format: "standard",
  value,
});

export const hasAssocDegree: FieldGroup = fieldGroup("assocDegreeRadioGroup", [
  fieldGroupLabel(
    "assocDegreeRadioGroupLabel",
    "Do you have an associate degree?"
  ),
  assocDegree({
    label: "Yes or In progress",
    value: YesNoCurrent.YES,
  }),
  assocDegree({ label: "No", value: YesNoCurrent.NO }),
]);

export const hasAssocDegreeWithLabel = (label: string): FieldGroup =>
  fieldGroup("assocDegreeRadioGroup", [
    fieldGroupLabel("assocDegreeRadioGroupLabel", label),
    assocDegree({
      label: "Yes",
      value: YesNoCurrent.YES,
    }),
    assocDegree({ label: "No", value: YesNoCurrent.NO }),
  ]);

// Bachelors in Social Work field for BswScreen
export const bsw: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.HASBSW,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

// Bachelors in Social Work field for BswScreen
export const hasBsn: FieldCreator = ({ label, value }) => ({
  type: "radio",
  name: FIELDKEYS.HASBSN,
  label,
  validationRules: {
    required: true,
  },
  value,
  width: "50%",
  format: "label",
});

const leadShareOptIn = (label: string): Field => ({
  type: "checkbox",
  name: FIELDKEYS.LEADSHAREOPTIN,
  label,
});

export const optInTypes = {
  name: "optInTypes",
  pii: false,
  [OptInTypes.LEAD_OPT_IN]: leadShareOptIn,
};

export const genericRadioOption: FieldCreator = ({ label, value, name }) => ({
  type: "radio",
  name,
  label,
  validationRules: {
    required: true,
  },
  width: "50%",
  format: "standard",
  value,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const genericRadio = ({
  label,
  yesOptionLabel = "Yes",
  yesOptionValue = YesNoCurrent.YES,
  noOptionLabel = "No",
  noOptionValue = YesNoCurrent.NO,
  name,
}: {
  label: string;
  yesOptionLabel?: string;
  yesOptionValue?: string;
  noOptionLabel?: string;
  noOptionValue?: string;
  name?: string;
}) =>
  fieldGroup("genericGroup", [
    fieldGroupLabel("genericGroupLabel", label),
    genericRadioOption({
      label: yesOptionLabel,
      value: yesOptionValue,
      name,
    }),
    genericRadioOption({ label: noOptionLabel, value: noOptionValue, name }),
  ]);

export const levelOfEducationRadioOption: FieldCreator = ({
  label,
  value,
}) => ({
  type: "radio",
  name: FIELDKEYS.LEVELOFEDUCATION,
  label,
  validationRules: {
    required: true,
  },
  width: "50%",
  format: "standard",
  value,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const levelOfEducationRadio = ({
  label,
  yesOptionLabel = "Yes",
  yesOptionValue = YesNoCurrent.YES,
  noOptionLabel = "No",
  noOptionValue = YesNoCurrent.NO,
}: {
  label: string;
  yesOptionLabel?: string;
  yesOptionValue?: string;
  noOptionLabel?: string;
  noOptionValue?: string;
}): FieldGroup =>
  fieldGroup("levelOfEducation", [
    fieldGroupLabel("levelOfEducationGroupLabel", label),
    levelOfEducationRadioOption({
      label: yesOptionLabel,
      value: yesOptionValue,
    }),
    levelOfEducationRadioOption({ label: noOptionLabel, value: noOptionValue }),
  ]);

export const rnQuestion = (
  label = "Do you currently have your registered nurse (RN) License?"
): FieldGroup =>
  fieldGroup("hasRnRadioGroup", [
    fieldGroupLabel("hasRnRadioGroupLabel", label),
    hasRnStandard({
      label: "Yes",
      value: YesNoCurrent.YES,
    }),
    hasRnStandard({
      label: "No",
      value: YesNoCurrent.NO,
    }),
  ]);
