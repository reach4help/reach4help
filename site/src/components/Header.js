import React, { Fragment } from 'react';
import Headroom from 'react-headroom';
import { Flex, Image } from 'rebass';
import styled from 'styled-components';
import { SectionLinks } from 'react-scroll-section';
import Fade from 'react-reveal/Fade';
import RouteLink from './RouteLink';
import logo from '../images/logo-border.svg';

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

const HeaderContainer = styled(Headroom)`
  position: absolute;
  width: 100%;

  .logo {
    opacity: 0;
  }

  .headroom--pinned {
    background: ${props => props.theme.colors.primaryDark};

    .logo {
      opacity: 1;
    }
  }
`;

const formatLinks = allLinks =>
  Object.entries(allLinks).reduce(
    (acc, [key, value]) => {
      const isHome = key === 'home';
      return isHome
        ? {
            ...acc,
            home: value,
          }
        : {
            ...acc,
            links: [...acc.links, { name: capitalize(key), value }],
          };
    },
    { links: [], home: null },
  );

const Header = () => (
  <HeaderContainer>
    <Fade top>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SectionLinks>
          {({ allLinks }) => {
            const { home, links } = formatLinks(allLinks);

            const homeLink = home && (
              <Image
                className="logo"
                src={logo}
                width="50px"
                alt="Reach4Help Logo"
                onClick={home.onClick}
                style={{
                  cursor: 'pointer',
                }}
              />
            );
            const navLinks = links.map(({ name, value }) => (
              <RouteLink
                key={name}
                onClick={value.onClick}
                selected={value.selected}
                name={name}
              />
            ));

            return (
              <Fragment>
                {homeLink}
                <Flex mr={[0, 3, 5]}>
                  <RouteLink
                    onClick={() =>
                      (window.location.href = 'https://map.reach4help.org')
                    }
                    selected={false}
                    name="Map"
                  />
                  {navLinks}
                </Flex>
              </Fragment>
            );
          }}
        </SectionLinks>
      </Flex>
    </Fade>
  </HeaderContainer>
);

export default Header;
