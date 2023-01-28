import { useState, Suspense } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Divider } from "semantic-ui-react";
import Navbar from "./components/navbar";
import Panel from "./components/panel";
import TableGroup from "./components/tables";
import { CustomTableProps } from "./components/customTable";

function App() {
  const [cityOneDetails, setCityOneDetails] = useState<CustomTableProps>({
    isLoading: false,
    tableData: [],
    city: "",
    isFetched: false,
  });
  const [cityTwoDetails, setCityTwoDetails] = useState<CustomTableProps>({
    isLoading: false,
    tableData: [],
    city: "",
    isFetched: false,
  });

  const handleSubmit = async (cityOne: string, cityTwo: string) => {
    setCityOneDetails((prev) => ({ ...prev, isLoading: true, city: cityOne }));
    setCityTwoDetails((prev) => ({ ...prev, isLoading: true, city: cityTwo }));

    try {
      let res = await getCityAirQuality(cityOne);
      setCityOneDetails((prev) => ({
        ...prev,
        tableData: getDataFormatted(res.data.results),
        isFetched: true,
      }));
    } catch (error) {
      toast.error("Something Went wrong");
      setCityOneDetails((prev) => ({
        ...prev,
        tableData: [],
        isFetched: true,
      }));
    }
    try {
      let res = await getCityAirQuality(cityTwo);
      setCityTwoDetails((prev) => ({
        ...prev,
        tableData: getDataFormatted(res.data.results),
        isFetched: true,
      }));
    } catch (error) {
      toast.error("Something Went wrong");
      setCityOneDetails((prev) => ({
        ...prev,
        tableData: [],
        isFetched: true,
      }));
    }

    setCityOneDetails((prev) => ({ ...prev, isLoading: false }));
    setCityTwoDetails((prev) => ({ ...prev, isLoading: false }));
  };

  const getDataFormatted = (data: any) => {
    return data.reduce((acc: any, curr: { measurements: any }) => {
      return [...acc, ...curr.measurements];
    }, []);
  };

  const getCityAirQuality = (city: string) => {
    return axios.get("https://api.openaq.org/v2/latest", {
      params: {
        limit: 1000,
        page: 1,
        offset: 0,
        sort: "desc",
        city: city,
        radius: 1000,
        order_by: "lastUpdated",
        dumpRaw: false,
      },
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <Navbar />
      <Panel
        handleSubmit={handleSubmit}
        isLoading={cityOneDetails.isLoading || cityTwoDetails.isLoading}
      />
      <Divider />
      <TableGroup
        cityOneDetails={cityOneDetails}
        cityTwoDetails={cityTwoDetails}
      />
    </Suspense>
  );
}

export default App;
