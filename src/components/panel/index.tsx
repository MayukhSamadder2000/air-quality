import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Input,
} from "semantic-ui-react";
import styled from "styled-components";

/** STYLES STARTS HERE */
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
/** STYLES ENDS HERE */

/**
 * Declaring a type PanelProps that will hold the following types
 * @type {Function} handleSubmit
 * @type {boolean} isLoading
 */
type PanelProps = {
  handleSubmit: (cityOne: string, cityTwo: string) => void;
  isLoading: boolean;
};

const Panel = ({ handleSubmit, isLoading }: PanelProps) => {
  /** Local state variable for the first city */
  const [cityOne, setCityOne] = useState<string>("");

  /** Local state variable for the second city */
  const [cityTwo, setCityTwo] = useState<string>("");

  /**
   * This function handles the submit of the form that holds the value for the two cities entered
   * @param e {React.SyntheticEvent}
   */
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    /** Invoking the handleSubmit function that has been passed through it's parent component */
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
                      /** Setting the value for city one */
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
                      /** Setting the value for city two */
                      setCityTwo(e.target.value);
                    }}
                    value={cityTwo}
                  />
                </Form.Field>
                <ButtonStyled
                  type="submit"
                  primary
                  /**
                   * Toggling the button compare' disability on the basis of
                   * whether the text is present in local states of cityOne & cityTwo
                   */
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
