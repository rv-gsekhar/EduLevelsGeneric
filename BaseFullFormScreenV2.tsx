/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import { FC, ReactElement, useCallback } from "react";
import { theme } from "twin.macro";

// Components
import { FormContainer } from "components/Theme/Form";
import * as Grid from "components/Theme/Grid";
import * as Hide from "components/Theme/Hide";
import Citation from "components/Citation";
import Container from "components/Theme/Container";
import FastFacts, { FastFactProps } from "components/FastFactsV2";
import Footer from "components/FooterV2";
import FormHeader from "components/Form/FormHeader";
import Header from "components/HeaderV2";
import NextStartDate from "components/NextStartDateV2";
import ProgramSnippet from "components/Theme/ProgramSnippet";
import RequestInfoProgress from "components/RequestInfoProgress";
import Screen from "components/Theme/Screen";
import ScreenForm from "components/Form/Single";
import TcpaStyles from "components/Theme/Tcpa";
import { Label } from "components/Theme/Typography";

import { Program } from "types/Program";

// Fields
import { firstName, lastName, email, phone, zip } from "components/Form/fields";

// Hooks + Contexts
import useFullStory from "hooks/useFullStory";
import { useCohesionEvents } from "hooks/useCohesionEvents";
import { useAppState } from "contexts/AppContext";

// Utils
import { nrPageActions } from "services/newRelic";
import { Field } from "types/Shorelight/Fields";
import { ParseTcpa } from "./ParseTcpa";

// temp
import { eduOptions, getCustomEduLevelSelection } from "utils/fieldHelpers"
import { LevelOfEducation } from "types/Fields"
//temp

type Props = {
  citationText?: string;
  showCitationBackground?: boolean;
  fastFactsColor?: string;
  fastFactsCourses?: string;
  fastFactsFacts?: FastFactProps[];
  fastFactsOutcomes?: string;
  fastFactsSchoolName?: string;
  formContainerBackground?: string;
  formHeaderAccentColor?: string;
  formHeaderBackground?: string;
  headerImage?: string;
  headerLogo?: string;
  headerSchoolName?: string;
  programSnippet?: string;
  requestInfoProgressColor?: string;
  screenFormBackground?: string;
  screenFormColor?: string;
  program?: Program;
  showNextStartDate?: boolean;
  TCPA?: JSX.Element;
  fields: Field[];
  [k: string]: unknown;
};

const BaseFullFormScreenV2: FC<Props> = (props): ReactElement => {
  const { formStarted } = useCohesionEvents();
  const { formStarted: fsFormStarted } = useFullStory();

  const { state } = useAppState();
  const { program } = state;

  const baseFields = [
    firstName,
    lastName,
    email("full"),
    phone("full"),
    zip("full"),
  ];

  const {
    fields = state.config.fields({ program, baseFields }),
    citationText = state.config.citationText,
    showCitationBackground = state?.config.showCitationBackground,
    fastFactsColor = theme(`colors.schoolPrimary`),
    fastFactsCourses = state.config.fastFactsCourses,
    fastFactsFacts = state.config.fastFacts,
    fastFactsOutcomes = state.config.fastFactsOutcomes,
    fastFactsSchoolName = state?.config.schoolName,
    formContainerBackground = theme(`colors.schoolFormBackground`),
    formHeaderAccentColor = theme(`colors.schoolSecondary`),
    formHeaderBackground = theme(`colors.schoolPrimary`),
    headerImage = state?.config?.image,
    headerLogo = state?.config?.logo,
    headerSchoolName = state?.config?.schoolName,
    programSnippet = program?.snippet || state?.config.description,
    requestInfoProgressColor = theme(`colors.schoolPrimary`),
    screenFormBackground = theme(`colors.schoolFormBackground`),
    screenFormColor = theme(`colors.schoolPrimary`),
    showNextStartDate = state.config.showNextStartDate,
    TCPA = ParseTcpa(),
  } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFormStarted = useCallback(() => {
    formStarted();
    fsFormStarted();
    nrPageActions.formStarted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const eduLevelsToShow = [
    LevelOfEducation.HIGHSCHOOL,
    LevelOfEducation.GED,
    LevelOfEducation.SOMECOLLEGE,
    LevelOfEducation.ASSOCIATES,
    LevelOfEducation.BACHELORS,
    LevelOfEducation.MASTERS,
    LevelOfEducation.DOCTORATE,
  ]
  console.log(getCustomEduLevelSelection([],{[keyof LevelOfEducation.HIGHSCHOOL]: "High School or GED"}))
  return (
    <Screen>
      <Container fullWidth>
        <Header
          image={headerImage}
          logo={headerLogo}
          program={program}
          schoolName={headerSchoolName}
        />
        <Container>
          <Grid.Container>
            <Grid.HalfShort>
              <Hide.Mobile>
                <ProgramSnippet data-testid="program-description-desktop">
                  {programSnippet}
                </ProgramSnippet>
                <FastFacts
                  data-testid="fastfactsconintainer-desktop"
                  schoolName={fastFactsSchoolName}
                  facts={fastFactsFacts}
                  color={fastFactsColor}
                  courses={fastFactsCourses}
                  outcomes={fastFactsOutcomes}
                />
              </Hide.Mobile>
            </Grid.HalfShort>
            <Grid.ThreeEighths>
              <FormContainer background={formContainerBackground}>
                {showNextStartDate && <NextStartDate />}
                <FormHeader
                  background={formHeaderBackground}
                  accentColor={formHeaderAccentColor}
                />
                <RequestInfoProgress color={requestInfoProgressColor} />
                {state?.config?.requiredStatement && (
                  <Label tw="m-0 pt-5 -mb-8 text-center font-normal text-appTypeLight">
                    {state.config.requiredStatement(Number(program.id))}
                  </Label>
                )}
                <ScreenForm
                  program={program}
                  background={screenFormBackground}
                  color={screenFormColor}
                  onFirstInteraction={onFormStarted}
                  fields={fields}
                  buttonType="cta"
                  buttonText="Get Info"
                  columns={{
                    mobile: 1,
                    desktop: 2,
                  }}
                />
                <TcpaStyles>{TCPA}</TcpaStyles>
              </FormContainer>
            </Grid.ThreeEighths>
          </Grid.Container>
          <Hide.Desktop>
            <Grid.Third>
              <ProgramSnippet data-testid="program-description-mobile">
                {programSnippet}
              </ProgramSnippet>
              <FastFacts
                data-testid="fastfactsconintainer-mobile"
                schoolName={fastFactsSchoolName}
                facts={fastFactsFacts}
                color={fastFactsColor}
                courses={fastFactsCourses}
                outcomes={fastFactsOutcomes}
              />
            </Grid.Third>
          </Hide.Desktop>
        </Container>
      </Container>
      {citationText && (
        <Citation
          citationText={citationText}
          showCitationBackground={showCitationBackground}
        />
      )}
      <Footer />
    </Screen>
  );
};

export default BaseFullFormScreenV2;
