import { COLORS } from '../styling/theme';

export const SERVICES = {
  food: {
    color: COLORS.red,
  },
  medicine: {
    color: COLORS.blue,
  },
  supplies: {
    color: COLORS.green,
  },
  mobility: {
    color: COLORS.purple,
  },
  shelter: {
    color: COLORS.orange,
  },
  support: {
    color: COLORS.yellow,
  },
  information: {
    color: COLORS.orange,
  },
  network: {
    color: COLORS.yellow,
  },
  manufacturing: {
    color: COLORS.orange,
  },
  financial: {
    color: COLORS.orange,
  },
  other: {
    color: COLORS.yellow,
  },
} as const;

export const MARKER_TYPES = {
  'mutual-aid-group': {
    color: COLORS.red,
  },
  org: {
    color: COLORS.blue,
  },
  financial: {
    color: COLORS.green,
  },
  information: {
    color: COLORS.purple,
  },
  other: {
    color: COLORS.orange,
  },
};
