import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    color: COLORS.red,
  },
  shelter: {
    color: COLORS.orange,
  },
  beds: {
    colors: COLORS.red,
  },
  oxygen: {
    colors: COLORS.red,
  },
  medicine: {
    color: COLORS.purple,
  },
  'home-care': {
    colors: COLORS.orange,
  },
  blood: {
    colors: COLORS.red,
  },
  quarantine: {
    colors: COLORS.gray,
  },
  telehealth: {
    // TODO: Might need to rename this?
    colors: COLORS.blue,
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
    color: COLORS.yellow,
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
