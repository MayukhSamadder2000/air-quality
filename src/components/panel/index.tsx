import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Input,
} from "semantic-ui-react";
import styled from "styled-components";

const CardStyled = styled(Card)`
  width: 500px !important;
  min-height: 250px !important;
  padding: 10px 0px !important;
`;

const ContainerStyled = styled(Container)`
  padding: 75px 0px;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;

type PanelProps = {
  handleSubmit: (cityOne: string, cityTwo: string) => void;
  isLoading: boolean;
};

const Panel = ({ handleSubmit, isLoading }: PanelProps) => {
  const [cityOne, setCityOne] = useState<string>("");
  const [cityTwo, setCityTwo] = useState<string>("");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSubmit(cityOne, cityTwo);
  };
  return (
    <ContainerStyled>
      <Grid columns="equal" textAlign="center">
        <Grid.Column width={8}>
          <CardStyled>
            <Card.Header>
              <Header as="h2">Air Q</Header>
            </Card.Header>
            <Card.Content>
              <Form onSubmit={submitHandler}>
                <Form.Field>
                  <label>Enter City 1 ( Example: Chicago )</label>
                  <Input
                    placeholder="City 1"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setCityOne(e.target.value);
                    }}
                    value={cityOne}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Enter city 2 ( Example: Delhi )</label>
                  <Input
                    placeholder="City 2"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setCityTwo(e.target.value);
                    }}
                    value={cityTwo}
                  />
                </Form.Field>
                <ButtonStyled
                  type="submit"
                  primary
                  disabled={!(cityOne.length && cityTwo.length)}
                  loading={isLoading}
                >
                  Compare
                </ButtonStyled>
              </Form>
            </Card.Content>
          </CardStyled>
        </Grid.Column>
      </Grid>
    </ContainerStyled>
  );
};

export default Panel;
