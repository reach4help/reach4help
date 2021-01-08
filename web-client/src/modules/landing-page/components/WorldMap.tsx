import * as d3 from 'd3';
import React from 'react';
import Datamap from 'react-datamaps';

const hoverInfoStyle = `
    color:black;
    text-align:center;
    background-color:white;
    padding:10px;
    display:flex;
    flex-direction:column;
    box-shadow: -1px -1px 7px 0px rgb(0, 0, 0, 0.5);
`;

const WorldMap = () => {
  const usersByCountry = [
    ['BGD', 32],
    ['BEL', 1],
    ['BGR', 1],
    ['BOL', 4],
    ['BRA', 3],
    ['CAN', 62],
    ['CHN', 7],
    ['DEU', 6],
    ['DZA', 1],
    ['EGY', 5],
    ['ESP', 1],
    ['FIN', 1],
    ['FRA', 4],
    ['GBR', 16],
    ['HKG', 1],
    ['IND', 74],
    ['ITA', 6],
    ['JPN', 4],
    ['KEN', 8],
    ['MAR', 1],
    ['MKD', 9],
    ['MEX', 4],
    ['MYS', 6],
    ['NGA', 9],
    ['NLD', 3],
    ['NZL', 2],
    ['PER', 1],
    ['PHL', 1],
    ['POL', 6],
    ['PRT', 55],
    ['SAU', 4],
    ['SGP', 3],
    ['SVK', 1],
    ['TUN', 2],
    ['TUR', 8],
    ['UKR', 1],
    ['USA', 269],
    ['VNM', 1],
  ];

  const onlyUsers: number[] = usersByCountry.map(obj => obj[1] as number);

  const minNumOfUsers = Math.min(...onlyUsers);
  const maxNumOfUsers = Math.max(...onlyUsers);

  const paletteScale = d3
    .scaleLinear()
    .domain([minNumOfUsers, maxNumOfUsers])
    .range(['#FFCE6B', '#EB7100']);

  // populate the dataset with the number of users and the corresponding color
  const dataset = {};
  usersByCountry.forEach(item => {
    dataset[item[0]] = {
      numOfUsers: item[1],
      fillColor: paletteScale(item[1]),
    };
  });

  return (
    <section>
      <Datamap
        responsive
        fills={{ defaultFill: '#DDD' }}
        data={dataset}
        geographyConfig={{
          highlightFillColor: geo => geo.fillColor || '#DDD',
          popupTemplate: (geography, data) =>
            `<div style="${hoverInfoStyle}">
              <span><b>${geography.properties.name}</b></span> 
              <span>${
                data
                  ? `Users: ${data.numOfUsers}`
                  : 'No users yet <br/> (maybe you?)'
              }
              </span>
          </div>`,
        }}
      />
    </section>
  );
};

export default WorldMap;
