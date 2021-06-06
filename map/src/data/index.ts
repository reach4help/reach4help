import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    color: COLORS.red,
  },
  shelter: {
    color: COLORS.orange,
  },
  beds: {
    color: COLORS.orange,
  },
  oxygen: {
    color: COLORS.red,
  },
  medicine: {
    color: COLORS.grayDark,
  },
  'home-care': {
    color: COLORS.orange,
  },
  blood: {
    color: COLORS.red,
  },
  quarantine: {
    color: COLORS.gray,
  },
  telehealth: {
    // TODO: Might need to rename this?
    color: COLORS.blue,
  },
  financial: {
    // TODO: rename to donations
    color: COLORS.green,
  },
  mobility: {
    // TODO: rename to transportation
    color: COLORS.purple,
  },
  information: {
    color: COLORS.purple,
  },
  manufacturing: {
    color: COLORS.orange,
  },
  other: {
    color: COLORS.yellow,
  },
  network: {
    // TODO: define more clearly
    color: COLORS.blueDark,
  },
  support: {
    // TODO: remove since too vague
    color: COLORS.yellow,
  },
  supplies: {
    // TODO: remove since too vague
    color: COLORS.green,
  },
} as const;

export const MARKER_TYPES = {
  'mutual-aid-group': {
    color: COLORS.red,
  },
  org: {
    color: COLORS.blue,
  },
  // financial: {
  //   color: COLORS.green,
  // },
  // information: {
  //   color: COLORS.purple,
  // },
  other: {
    color: COLORS.orange,
  },
};
