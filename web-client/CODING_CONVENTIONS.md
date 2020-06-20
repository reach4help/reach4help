
## Code Conventions

ORDER OF CODE
-------------
- All important declarations must be made on the first screen
- - You should not have to scroll down
- - In publishing this is called "ABOVE THE FOLD", like the first page of a newspaper.
- - CORRECT ORDER OF FILE:
1. Imports
2. Simple Consts 
3. Main Component Declaration
5. Complex Consts
4. Styled-Components 
<code> 

import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

/* Simple Consts */
const { Text } = Typography;

/* Component Declaration */
const BlogPost: React.FC<BlogPostProps> = ({ title, description }) => (
  <BlogPostWrapper>
    <Title>{title}</Title>
    <Description>{description}</Description>
  </BlogPostWrapper>
);

/* styled-component declarations */

const BlogPostWrapper = styled.div`
  margin: 5px;
`;
const Title = styled.div`
  font-size: 125%;
`;
const Description = styled.div`
  font-style: italic;
`;

/* Complex consts -- documentation coming soon*/

/* interface declaration -- do not use PropTypes */

interface BlogPostProps {
  title: string;
  description: string;
}

export default BlogPost;

</code>


 NAMING
-------
* All Component Names follow standard OO Naming conventions

* * Inheritance Relationships can be indicated by appending the name of the subclass
* * All styled-components must have meaningful names that indicate their usage within the markup.
* * They must be treated exactly the same as React Components
* * The root styled-component for the module is {ModuleName}Wrapper
* * Never use "SomeComponentWrapper" or "SomeContainerWrapper" as a filename. If you need the suffix, you can call use "Component" or "Wrapper"
* * Never use a generic name that will clash with AntD components
* * https://blog.elpassion.com/naming-101-quick-guide-on-how-to-name-things-a9bcbfd02f02
* * All css must occur in styled-components
