import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading, Flex, Box, Image, Link } from 'rebass';
import styled from 'styled-components';
import { SectionLink } from 'react-scroll-section';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import SocialLink from '../components/SocialLink';
import MouseIcon from '../components/MouseIcon';
import Triangle from '../components/Triangle';
import logo from '../images/logo.svg';
import markdownRenderer from '../components/MarkdownRenderer';

const colors = require('../../colors');

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['35vh', '80vh']}
      width={['95vw', '60vw']}
    />

    <Triangle
      color="secondary"
      height={['38vh', '80vh']}
      width={['50vw', '35vw']}
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '35vh']}
      width={['75vw', '60vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['20vh', '20vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const ButtonLink = styled(Link)`
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const centerHorizontally = { marginRight: 'auto', marginLeft: 'auto' };

const PrivacyPage = () => (
  <Section.Container id="home" Background={Background}>
    <Section.Header name="Privacy" icon="🔑" label="privacy" />
    <StaticQuery
      query={graphql`
        {
          markdownRemark(frontmatter: { title: { eq: "Privacy" } }) {
            internal {
              content
            }
          }
        }
      `}
      render={data => {
        // const { edges } = data.;
        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
              <Fade bottom>
                <ReactMarkdown
                  source={data.markdownRemark.internal.content}
                  renderers={markdownRenderer}
                />
              </Fade>
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default PrivacyPage;
