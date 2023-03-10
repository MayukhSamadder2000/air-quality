import { DateTime } from "luxon";
import { Card, Container, Header, Table } from "semantic-ui-react";
import styled from "styled-components";

import CustomLoader from "../customLoader";

/**
 * TableData is the type that refers to the type of data of each row of the table
 * @type {string} parameter = Refers to the parameter of the air quality data
 * @type {number} value = Refers to the number of the air quality data
 * @type {string} lastUpdated = Refers to the Last Updated Date of the air quality data
 * @type {string} unit = Refers to the Unit of the air quality data
 */
export type TableData = {
  parameter: string;
  value: number;
  lastUpdated: string;
  unit: string;
};

/**
 * CustomTableProps is a type created for the specific data that'd be consumed by
 * CustomTable component to render the table details
 * @type {boolean} isLoading = Loading state
 * @type {boolean} isFetched = Fetched state
 * @type {TableData[]} tableData = Data to be rendered on the table
 * @type {string} city = Name of the City
 */
export type CustomTableProps = {
  isLoading: boolean;
  isFetched: boolean;
  tableData: TableData[];
  city: string;
};

/** STYLES STARTS HERE */

const TableContainerStyled = styled.div`
  position: relative;
  padding-bottom: 50px;
`;

const CityCardStyled = styled(Card)`
  width: 100% !important;
  height: 60px !important;
  padding: 10px !important;
  background: #efefef !important;
`;

const NoDataFoundStyled = styled.div`
  padding: 10px;
`;

const TableDataContainerStyled = styled(Container)`
  max-height: 300px !important;
  overflow-y: auto;
`;

/** STYLES ENDS HERE */

const CustomTable = ({
  tableData,
  isLoading,
  city,
  isFetched,
}: CustomTableProps) => {
  return (
    <TableContainerStyled>
      <CityCardStyled>
        <b>City: {city ? city : "-"}</b>
        <b>Total: {isFetched ? tableData.length : "-"}</b>
      </CityCardStyled>
      {!isLoading && (
        <TableDataContainerStyled>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sl.</Table.HeaderCell>
                <Table.HeaderCell>Parameter</Table.HeaderCell>
                <Table.HeaderCell>Unit</Table.HeaderCell>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableData?.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>#{index + 1}</Table.Cell>
                  <Table.Cell singleLine>{item.parameter}</Table.Cell>
                  <Table.Cell>{item.unit}</Table.Cell>
                  <Table.Cell textAlign="right">{item.value}</Table.Cell>
                  <Table.Cell>
                    {DateTime.fromISO(item.lastUpdated).toFormat("MM/dd/yyyy")}
                  </Table.Cell>
                </Table.Row>
              ))}
              {!isLoading && isFetched && tableData.length === 0 && (
                <NoDataFoundStyled>
                  <Header as="h3">No Data Found</Header>
                </NoDataFoundStyled>
              )}
            </Table.Body>
          </Table>
        </TableDataContainerStyled>
      )}
      {isLoading && <CustomLoader />}
    </TableContainerStyled>
  );
};

export default CustomTable;
