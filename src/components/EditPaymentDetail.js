import { Dropdown } from 'semantic-ui-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';

const EditPaymentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isLoading = useStoreState((state) => state.isLoading);
    const isError = useStoreState((state) => state.isError);
    const payeeOptions = useStoreState((state) => state.payeeOptions);

    const paymentDetails = useStoreState((state) => state.paymentDetails);
    const getEachPaymentById = useStoreState((state) => state.getEachPaymentById)
    const eachPayment = getEachPaymentById(id);

    const editAmount = useStoreState((state) => state.editAmount);
    const editDate = useStoreState((state) => state.editDate);
    const editGroceries = useStoreState((state) => state.editGroceries);
    const editPaymentMadeBy = useStoreState((state) => state.editPaymentMadeBy);

    const setEditAmount = useStoreActions((actions) => actions.setEditAmount);
    const setEditDate = useStoreActions((actions) => actions.setEditDate)
    const setEditGroceries = useStoreActions((actions) => actions.setEditGroceries);
    const setEditPaymentMadeBy = useStoreActions((actions) => actions.setEditPaymentMadeBy);
    const updatePaymentDetail = useStoreActions((actions) => actions.updatePaymentDetail);

      useEffect(() => {
        if(eachPayment) {
            setEditAmount(eachPayment.amount);
            setEditDate(Date.parse(eachPayment.date));
            setEditGroceries(eachPayment.groceryItems);
            setEditPaymentMadeBy(eachPayment.name);
        }
      },[paymentDetails, setEditAmount, setEditGroceries, setEditPaymentMadeBy])

      const handleEdit = (id) => {
        const updatedPaymentDetail = { _id: id, name: editPaymentMadeBy, amount: editAmount, groceryItems: editGroceries, date: editDate};
        updatePaymentDetail(updatedPaymentDetail);
        navigate(`/paymentdetail/${editPaymentMadeBy}`);
      }
  return(
      <div className='EditPaymentDetail'>
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
        </div>}
        {!isError && !isLoading && eachPayment &&
        <>
          <div className="add-new-grocery-container">
            <div className="add-new-grocery">
              <h3>Edit Payment Detail</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="new-grocery-amount-container ui labeled input">
                  <div className="ui basic label">$</div>
                  <input 
                      id="newAmount"
                      type="text"
                      pattern="[0.00-9.00]*"
                      placeholder="Amount"
                      required
                      value={isNaN(parseFloat(editAmount)) ? 0 : parseFloat(editAmount)}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                </div>
                <div className="date-picker-container">
                  <SemanticDatepicker 
                    required
                    placeholder="Choose the date you bought the grocery"
                    format = "Do MMMM YYYY"  
                    value={editDate}
                    onChange={(event, data) =>  {
                      if(!isNaN(Date.parse(data.value))){
                        setEditDate(Date.parse(data.value))
                      }}}      
                  />
                </div>
                <div className="ui form">
                  <textarea 
                    placeholder="What did you buy?" 
                    rows="5"
                    value={editGroceries}
                    onChange={(e) => setEditGroceries(e.target.value)}
                  />   
                </div>                           
                <div className="payment-made-by">
                  <span>
                    Payment made by: {' '}
                    <Dropdown 
                      inline
                      options={payeeOptions}
                      defaultValue={eachPayment.name}
                      onChange={(e) => setEditPaymentMadeBy(e.target.innerText)}
                    />
                  </span>
                </div>
                <button className="ui fluid primary button" type="button" onClick={() => handleEdit(eachPayment._id)}>Update</button>
              </form>
            </div>
          </div>
          </>
        }
        {!isError && !isLoading && !eachPayment && 
          <div className="EditPaymentDetails">
            <>
              <div className="ui negative message">
                <div className="header">Error 404</div>
                <p>This record cannot be found.</p>
              </div>
            </>
          </div>
        }
      </div>
  );
};

export default EditPaymentDetail;
