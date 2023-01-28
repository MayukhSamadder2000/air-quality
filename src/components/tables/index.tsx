import React from "react";
import { Container, Grid } from "semantic-ui-react";
import CustomTable, { CustomTableProps } from "../table";

type TableGroupProps = {
  cityOneDetails: CustomTableProps;
  cityTwoDetails: CustomTableProps;
};

const TableGroup = ({ cityOneDetails, cityTwoDetails }: TableGroupProps) => {
  return (
    <Container>
      <Grid columns="equal">
        <Grid.Column>
          <CustomTable
            city={cityOneDetails.city}
            isLoading={cityOneDetails.isLoading}
            tableData={cityOneDetails.tableData}
            isFetched={cityOneDetails.isFetched}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <CustomTable
            city={cityTwoDetails.city}
            isLoading={cityTwoDetails.isLoading}
            tableData={cityTwoDetails.tableData}
            isFetched={cityTwoDetails.isFetched}
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default TableGroup;
