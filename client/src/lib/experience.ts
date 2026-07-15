const START_YEAR = 2018;

export function getYearsExperience(): number {
  return new Date().getFullYear() - START_YEAR;
}

export function getYearsExperienceText(): string {
  return `${getYearsExperience()}+`;
}
