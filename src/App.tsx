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
  /**
   * State variable corresponding to the first city
   */
  const [cityOneDetails, setCityOneDetails] = useState<CustomTableProps>({
    isLoading: false,
    tableData: [],
    city: "",
    isFetched: false,
  });

  /**
   * State variable corresponding to the second city
   */
  const [cityTwoDetails, setCityTwoDetails] = useState<CustomTableProps>({
    isLoading: false,
    tableData: [],
    city: "",
    isFetched: false,
  });

  /**
   * The function handleSubmit
   * @param cityOne - refers to the first city entered by the user
   * @param cityTwo - refers to the second city entered by the user
   */
  const handleSubmit = async (cityOne: string, cityTwo: string) => {
    /**
     *  here we're setting the cityOne to it's corresponding state variable
     * @param {string} cityOneDetails.city = cityOne
     */
    setCityOneDetails((prev) => ({ ...prev, isLoading: true, city: cityOne }));

    /**
     *  here we're setting the cityTwo to it's corresponding state variable
     * @param {string} cityTwoeDetails.city = cityTwo
     */
    setCityTwoDetails((prev) => ({ ...prev, isLoading: true, city: cityTwo }));

    /** Ran a Promise.allSettled here to resolve two promises that fetches the air quality for the two cities given */
    await Promise.allSettled([
      getCityAirQuality(cityOne),
      getCityAirQuality(cityTwo),
    ]).then((res) => {
      /**
       * Checking if the staus is rejected or not for first promise
       */
      if (res[0].status === "rejected") {
        toast.error(res[0].reason);
      } else {
        /** Updating the tableData value for the first city */
        setCityOneDetails((prev) => ({
          ...prev,
          /** Checks if the first promise has been resolved to filter the unnecessary data */
          tableData: getDataFormatted(
            res[0].status === "fulfilled" ? res[0].value.data.results : []
          ),
          isFetched: true,
        }));
      }

      /**
       * Checking if the staus is rejected or not for second promise
       */
      if (res[1].status === "rejected") {
        toast.error(res[1].reason);
      } else {
        /** Updating the tableData value for the second city */
        setCityTwoDetails((prev) => ({
          ...prev,
          /** Checks if the second promise has been resolved to filter the unnecessary data */
          tableData: getDataFormatted(
            res[1].status === "fulfilled" ? res[1].value.data.results : []
          ),
          isFetched: true,
        }));
      }
    });

    /** setting the loading state to false */
    setCityOneDetails((prev) => ({ ...prev, isLoading: false }));
    setCityTwoDetails((prev) => ({ ...prev, isLoading: false }));
  };

  /**
   * The function takes data parameter and filters out the unnecesaary data
   * @param data
   * @returns {Array}
   */
  const getDataFormatted = (data: any) => {
    return data.reduce((acc: any, curr: { measurements: any }) => {
      return [...acc, ...curr.measurements];
    }, []);
  };

  /**
   * This function takes the city name and returns a promise by hitting
   * an API from openaq that returns the air quality
   * @param {string} city
   * @returns {Promise}
   */
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
