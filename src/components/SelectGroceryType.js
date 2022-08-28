import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import SeaCucumber from "../files/rick-and-morty-sea-cucumber.gif";
import { Button } from "semantic-ui-react";
import useAxiosFetch from "../hooks/useAxiosFetch";

const SelectGroceryType = () => {
  const { data } = useAxiosFetch("/paymentdetails");
  const isLoading = useStoreState((state) => state.isLoading);
  const isError = useStoreState((state) => state.isError);
  const setIsError = useStoreActions((actions) => actions.setIsError);

  const setGroceryType = useStoreActions((actions) => actions.setGroceryType);

  const paymentDetails = useStoreState((state) => state.paymentDetails);
  const setPaymentDetails = useStoreActions(
    (actions) => actions.setPaymentDetails
  );

  const navigate = useNavigate();

  let selectedQuery = data.map((each) => {
    if (!each.hasOwnProperty("groceryType")) {
      return { ...each, groceryType: "3-People" };
    } else {
      return { ...each };
    }
  });

  const handleSelectGroceryType = (e) => {
    let selectedType = e.target.innerHTML;
    setGroceryType(selectedType);
    setPaymentDetails(
      selectedQuery.filter((each) => each.groceryType === selectedType)
    );
    if (selectedType) {
      setIsError("");
      navigate("/");
    } else {
      setIsError("Select Grocery Type.");
    }
  };

  return (
    <div className="Login login-component-container">
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
      {!isLoading && (
        <div className="login-component">
          <div className="require-safe-work-container">
            <img src={SeaCucumber} alt="Safe Word?" />
          </div>
          <div className="safe-word-input-container">
            <h2>Select Grocery Type:</h2>
            <Button.Group>
              <Button color="green" onClick={(e) => handleSelectGroceryType(e)}>
                3-People
              </Button>
              <Button.Or />
              <Button color="blue" onClick={(e) => handleSelectGroceryType(e)}>
                4-People
              </Button>
            </Button.Group>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectGroceryType;
