## Code Conventions

## ORDER OF CODE

- All important declarations must be made on the first screen
- - You should not have to scroll down
- - In publishing this is called "ABOVE THE FOLD", like the first page of a newspaper.
- - CORRECT ORDER OF FILE:

1. Imports
2. Simple Consts
3. Main Component Declaration
4. Complex Consts
5. Styled-Components
   <code>

import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

/_ Simple Consts _/
const { Text } = Typography;

/_ Component Declaration _/
const BlogPost: React.FC<BlogPostProps> = ({ title, description }) => (
<BlogPostWrapper>

<Title>{title}</Title>
<Description>{description}</Description>
</BlogPostWrapper>
);

/_ styled-component declarations _/

const BlogPostWrapper = styled.div`margin: 5px;`;
const Title = styled.div`font-size: 125%;`;
const Description = styled.div`font-style: italic;`;

/_ Complex consts -- documentation coming soon_/

/_ interface declaration -- do not use PropTypes _/

interface BlogPostProps {
title: string;
description: string;
}

export default BlogPost;

</code>

## NAMING

- All Component Names follow standard OO Naming conventions

- - Inheritance Relationships can be indicated by appending the name of the subclass
- - All styled-components must have meaningful names that indicate their usage within the markup.
- - They must be treated exactly the same as React Components
- - The root styled-component for the module is {ModuleName}Wrapper
- - Never use "SomeComponentWrapper" or "SomeContainerWrapper" as a filename. If you need the suffix, you can call use "Component" or "Wrapper"
- - Never use a generic name that will clash with AntD components
- - https://blog.elpassion.com/naming-101-quick-guide-on-how-to-name-things-a9bcbfd02f02
- - All css must occur in styled-components

---

## Template Strings

- When you are in vscode, you see the path to the string in en.json. This path should match the actual filepath where the string is used and should have a final name that corresponds to the meaning and usage of the string.

![How to write template strings](CODING_CONVENTIONS_TRANSLATIONS.png)

## Generic Components in Figma

src/components/figma

Distinguish

- TextStyle components (eg font-weight: 700px) I think these should be spans, not divs
- DivStyle components (eg margin: 25px)

## H2.tsx :

<code>
import react;
import styles;

export default styled.span "font-size: 150%;"
</code>

InfoBox.tsx :

---

<code>
import react;
import styles;

export default styled.div "margin: 20px;"
</code>

## index.tsx:

<code>
import H4 from './H4'
import InfoBox from './InfoBox'

export {H4, InfoBox}
</code>
