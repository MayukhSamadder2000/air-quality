import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import styled from "styled-components";

const LoaderStyled = styled(Segment)`
    height: 300px !important;
`

const CustomLoader = () => {
  return (
    <LoaderStyled>
      <Dimmer active inverted>
        <Loader size="medium">Fetching ...</Loader>
      </Dimmer>
    </LoaderStyled>
  );
};

export default CustomLoader;
