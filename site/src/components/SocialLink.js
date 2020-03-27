import React from 'react';
import { Link } from 'rebass';
import Tippy from '@tippy.js/react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FaGithub,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from 'react-icons/fa';
import 'tippy.js/dist/tippy.css'; // eslint-disable-line

const ICONS_MAPPER = {
  github: <FaGithub />,
  envelope: <FaEnvelope />,
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  facebook: <FaFacebookF />,
};

const IconLink = styled(Link)`
  transition: color 0.5s;
  color: ${props =>
    props.theme.colors[props.color] || props.theme.colors.primary};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.primaryLight};
  }
`;

const SocialLink = ({ fontAwesomeIcon, name, url, color }) => (
  <Tippy content={name} placement="bottom" trigger="mouseenter" arrow={false}>
    <IconLink
      href={url}
      target="_blank"
      color={color}
      rel="noreferrer"
      aria-label={name}
    >
      {ICONS_MAPPER[fontAwesomeIcon]}
    </IconLink>
  </Tippy>
);

SocialLink.propTypes = {
  fontAwesomeIcon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default SocialLink;
