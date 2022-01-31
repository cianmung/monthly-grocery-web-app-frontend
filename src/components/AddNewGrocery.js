import { Dropdown } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";
import Avatar from "../files/dummyavatar.png";

const AddNewGrocery = () => {
  const newAmount = useStoreState((state) => state.newAmount);
  const newGroceries = useStoreState((state) => state.newGroceries);
  const paymentMadeBy = useStoreState((state) => state.paymentMadeBy);

  const setNewAmount = useStoreActions((actions) => actions.setNewAmount);
  const setNewGroceries = useStoreActions((actions) => actions.setNewGroceries);
  const setPaymentMadeBy = useStoreActions((actions) => actions.setPaymentMadeBy);

  const addNewPayment = useStoreActions((actions) => actions.addNewPayment);

  const isLoading = useStoreState((state) => state.isLoading);
  const isError = useStoreState((state) => state.isError);
  const payeeOptions = useStoreState((state) => state.payeeOptions);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = {name: paymentMadeBy, amount: newAmount, groceryItems: newGroceries};
    addNewPayment(newPayment);
    navigate('/');
  }
  return (
      <div className="NewGrocery">
        {isError &&
        <div class="ui error message">
          <div class="content">
              <div class="header">{isError}</div>
          </div>
        </div>
        }

        {!isError && isLoading && 
        <div className="loader">
          <div className="ui active transition visible inverted dimmer">
            <div className="content">
              <div className="ui inverted text loader">Loading</div>
            </div>
          </div>
        </div>
        }

        {!isError && !isLoading && 
          <div className="add-new-grocery-container">
            <div className="add-new-grocery">
              <h3>Add New Grocery</h3>
              <form onSubmit={handleSubmit}>
                <div className="new-grocery-amount-container ui labeled input">
                  <div className="ui basic label">$</div>
                  <input 
                      id="newAmount"
                      type="text"
                      pattern="[0-9]*"
                      placeholder="Amount"
                      required
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                    />
                </div>
                <div className="ui form">
                  <textarea 
                    placeholder="What did you buy?" 
                    rows="5"
                    value={newGroceries}
                    onChange={(e) => setNewGroceries(e.target.value)}
                  />   
                </div>                           
                <div className="payment-made-by">
                  <span>
                    Payment made by: {' '}
                    <Dropdown 
                      inline
                      options={payeeOptions}
                      defaultValue={payeeOptions[0].value}
                      onChange={(e) => setPaymentMadeBy(e.target.innerText)}
                    />
                  </span>
                </div>
                <button className="ui fluid primary button">Add</button>
              </form>
            </div>
          </div>
          }
      </div>
  );
};

export default AddNewGrocery;
