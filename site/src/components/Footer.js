import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Text, Box, Link, Flex } from 'rebass';
import Fade from 'react-reveal/Fade';
import SocialLink from './SocialLink';

const FooterContainer = styled.div`
  min-width: 320px;
  max-width: 1366px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const TextFooter = styled(Text)`
  color: ${props => props.theme.colors.background};

  & a {
    color: ${props => props.theme.colors.background};
  }
`;

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            socialLinks {
              fontAwesomeIcon
              id
              name
              url
            }
          }
        }
      }
    `}
    render={({ site }) => {
      const { title, socialLinks } = site.siteMetadata;

      return (
        <Box p={3} backgroundColor="primaryDark" as="footer">
          <FooterContainer>
            <Fade left>
              <TextFooter fontSize={[2, 3]}>
                <span>{`${title} `}</span>
                <Link href="https://www.netlify.com/" py={16} mr={1}>
                  site is Powered by Netlify
                </Link>
                <span role="img" aria-label="heart">
                  ❤️
                </span>
                <span> | </span>
                <Link
                  py={16}
                  fontSize={[1, 2]}
                  href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md"
                >
                  Code of Conduct
                </Link>
              </TextFooter>
            </Fade>
            <Flex>
              <Fade right>
                {socialLinks.map(({ id, ...rest }) => (
                  <Box mx={[2, 3]} fontSize={[4, 5]} key={id}>
                    <SocialLink {...rest} color="background" />
                  </Box>
                ))}
              </Fade>
            </Flex>
          </FooterContainer>
        </Box>
      );
    }}
  />
);

export default Footer;
