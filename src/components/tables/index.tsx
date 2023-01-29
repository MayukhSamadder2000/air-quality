import { Container, Grid } from "semantic-ui-react";
import CustomTable, { CustomTableProps } from "../customTable";


/**
 * TableGroupProps is the props that take in the air quality details of city one & city two
 * @type {CustomTableProps} cityOneDetails = Refers to the necessary details for the first city's air quality
 * @type {CustomTableProps} cityTwoDetails = Refers to the necessary details for the second city's air quality
 */
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
