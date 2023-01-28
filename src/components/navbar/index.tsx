import { Header, Menu, Segment } from "semantic-ui-react";
import styled from "styled-components";

const HeaderStyled = styled(Header)`
  color: #fff;
`;

const Navbar = () => {
  return (
    <Segment inverted attached size="mini">
      <Menu inverted secondary>
        <Menu.Item name="logo">
          <HeaderStyled as="h2">Air Q</HeaderStyled>
        </Menu.Item>
      </Menu>
    </Segment>
  );
};

export default Navbar;
