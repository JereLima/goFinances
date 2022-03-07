import React from 'react';

import { Category, Container, Icon } from './styles';

interface Props {
    title: string;
}

const Select = () => {
  return (
      <Container>
          <Category>teste</Category>
          <Icon name="chevron-down" />
      </Container>
  )
}

export default Select;