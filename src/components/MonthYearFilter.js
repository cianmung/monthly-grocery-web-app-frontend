import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import moment from "moment";
import { Dropdown } from "semantic-ui-react";

const MonthYearFilter = () => {
  const paymentDetails = useStoreState((state) => state.paymentDetails);

  const selectedMonth = useStoreState((state) => state.selectedMonth);
  const selectedYear = useStoreState((state) => state.selectedYear);

  const setSelectedMonth = useStoreActions(
    (actions) => actions.setSelectedMonth
  );
  const setSelectedYear = useStoreActions((actions) => actions.setSelectedYear);

  const years = paymentDetails.map((e) =>
    moment(new Date(e.date)).format("YYYY")
  );
  const months = paymentDetails
    .filter(
      (each) => moment(new Date(each.date)).format("YYYY") === selectedYear
    )
    .map((e) => moment(new Date(e.date)).format("MMMM"));

  const uniqueMonths = months.filter((e, idx) => months.indexOf(e) === idx);
  const uniqueYears = years.filter((e, idx) => years.indexOf(e) === idx);

  const filterMonths = useStoreState((state) => state.filterMonths);
  const filterYears = useStoreState((state) => state.filterYears);

  const setFilterMonths = useStoreActions((actions) => actions.setFilterMonths);
  const setFilterYears = useStoreActions((actions) => actions.setFilterYears);

  const setFilteredPaymentDetails = useStoreActions(
    (actions) => actions.setFilteredPaymentDetails
  );

  useEffect(() => {
    let filteredMonths = [];
    let filteredYears = [];

    uniqueMonths.map((each) => {
      filteredMonths.push({ key: each, text: each, value: each });
    });
    uniqueYears.map((each) => {
      filteredYears.push({ key: each, text: each, value: each });
    });

    setFilterMonths(filteredMonths);
    setFilterYears(filteredYears);

    let selectedQuery = paymentDetails.filter(
      (each) =>
        moment(new Date(each.date)).format("MMMM") === selectedMonth &&
        moment(new Date(each.date)).format("YYYY") === selectedYear
    );

    setFilteredPaymentDetails(selectedQuery);
  }, [selectedMonth, selectedYear]);

  return (
    <div className="filter-function-component-container">
      <div className="year-filter-container each-filter-container">
        <h3>YEAR:</h3>
        <Dropdown
          className="filter-dropdown"
          placeholder="Select the year"
          compact
          selection
          options={filterYears}
          onChange={(e) => setSelectedYear(e.target.innerText)}
          value={selectedYear}
        ></Dropdown>
      </div>
      <div className="month-filter-container each-filter-container">
        <h3>MONTH:</h3>
        <Dropdown
          className="filter-dropdown"
          placeholder="Select the month"
          compact
          selection
          options={filterMonths}
          onChange={(e) => setSelectedMonth(e.target.innerText)}
          value={selectedMonth}
        ></Dropdown>
      </div>
    </div>
  );
};

export default MonthYearFilter;
