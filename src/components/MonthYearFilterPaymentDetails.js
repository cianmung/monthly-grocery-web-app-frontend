import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import moment from "moment";
import { Dropdown } from "semantic-ui-react";

const MonthYearFilterPaymentDetails = ({name}) => {
    const paymentDetails = useStoreState((state) => state.paymentDetails);
    const eachPaymentDetails = paymentDetails.filter(each => each.name === name);

    const selectedMonth = useStoreState(state => state.selectedMonth);
    const selectedYear = useStoreState(state => state.selectedYear);
  
    const setSelectedMonth = useStoreActions(actions => actions.setSelectedMonth);
    const setSelectedYear = useStoreActions(actions => actions.setSelectedYear);

    const years = eachPaymentDetails.map(e => moment(new Date(e.date)).format("YYYY"));
    const months = eachPaymentDetails.filter((each) => moment(new Date(each.date)).format("YYYY") === selectedYear).map(e => moment(new Date(e.date)).format("MMMM"));

    const uniqueMonths = months.filter((e, idx) => months.indexOf(e) === idx);
    const uniqueYears = years.filter((e, idx) => years.indexOf(e) === idx);
  
    const filterMonths = useStoreState(state => state.filterMonths);
    const filterYears = useStoreState(state => state.filterYears);
    
    const setFilterMonths = useStoreActions(actions => actions.setFilterMonths);
    const setFilterYears = useStoreActions(actions => actions.setFilterYears);

    const setGetEachPaymentDetailsByName = useStoreActions(actions => actions.setGetEachPaymentDetailsByName);

    useEffect(() => {
        var filteredMonths = [];
        var filteredYears = [];

        uniqueMonths.map(each => {
            filteredMonths.push({key: each, text: each, value: each})
        })
        uniqueYears.map(each => {
            filteredYears.push({key: each, text:each, value:each})
        })

        setFilterMonths(filteredMonths)
        setFilterYears(filteredYears)     
    },[selectedMonth, selectedYear, setFilterMonths, setFilterYears, setGetEachPaymentDetailsByName])

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
          > 
          </Dropdown>
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
        > 
        </Dropdown>
      </div>      
    </div>
  )
}

export default MonthYearFilterPaymentDetails