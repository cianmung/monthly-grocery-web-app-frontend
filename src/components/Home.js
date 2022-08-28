import EachPersonPayment from "./EachPersonPayment";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import MonthYearFilter from "./MonthYearFilter";
import { Message, Button } from "semantic-ui-react";

const Home = () => {
  const paymentOverall = useStoreState((state) => state.getPaymentOverall);
  const isLoading = useStoreState((state) => state.isLoading);
  const isError = useStoreState((state) => state.isError);
  const groceryType = useStoreState((state) => state.groceryType);

  return (
    <div className="Home">
      {isError && (
        <div class="ui error message">
          <div class="content">
            <div class="header">{isError}</div>
          </div>
        </div>
      )}
      {!isError && isLoading && (
        <div className="loader">
          <div className="ui active transition visible inverted dimmer">
            <div className="content">
              <div className="ui inverted text loader">Loading</div>
            </div>
          </div>
        </div>
      )}
      {!isError && !isLoading && (
        <>
          <MonthYearFilter />
          <h2 style={{ textAlign: "center", color: "green" }}>
            Grocery Type : {groceryType}
          </h2>
          {paymentOverall.length > 0 && (
            <div>
              {paymentOverall.map((each) => (
                <div
                  key={each.name}
                  className="summary-for-each-person-container"
                >
                  <EachPersonPayment each={each} />
                </div>
              ))}
            </div>
          )}
          {paymentOverall.length === 0 && (
            <Message warning>
              <Message.Header>No Payment Records Found!</Message.Header>
              <p>
                Please Select <b>Month</b> and <b>Year</b> Again.
              </p>
            </Message>
          )}
          <div className="calculate-button-container">
            <Link to="/calculatepayments">
              <Button
                color="green"
                content="CALCULATE"
                icon="calculator"
                labelPosition="left"
              />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
