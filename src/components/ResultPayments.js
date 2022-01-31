import { useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

const ResultPayments = () => {
    const paymentOverall = useStoreState((state) => state.getPaymentOverall);
    const totalPayment = paymentOverall.reduce((a, v) => a = a + v.amount, 0);
    const eachPayment = totalPayment/paymentOverall.length;
    const isLoading = useStoreState((state) => state.isLoading);
    const isError = useStoreState((state) => state.isError);
    const payeeOptions = useStoreState((state) => state.payeeOptions);

  return(
      <div className="ResultPayments">
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

         {!isError && !isLoading && <div className="calculate-payment-container">
            <div className="payment-summary-container">
              <div className="payment-summary-header">
                <div className="ui tiny blue statistic"><div className="label">Total</div><div className="value">${totalPayment.toFixed(2)}</div></div>
                <div className="ui tiny blue statistic"><div className="label">Each</div><div className="value">${eachPayment.toFixed(2)}</div></div>
              </div>
                <div className='payment-calculation'>
                  <div className="ui card">
                    <div className="content">
                      <h4>Calculate Payment</h4>
                    </div>
                    {paymentOverall.map(each => (
                      <div key={each.name} className='content'>
                        <div className='ui feed'>
                          <div className="event">
                            <div className="label"><img src={payeeOptions.find(option => option.text === each.name).image.src} /></div>
                            <div className="content">
                              <div className="summary">
                                <h5>{each.name}</h5>
                                <p className="summary-footer"><span><span style={{color: "#2185d0"}}>Paid</span> : {each.amount} SGD</span> <span><span style={{color: "#2185d0"}}>{each.amount - eachPayment > 0 ? "Receive" : "Pay"}</span> : {(each.amount - eachPayment).toFixed(2)} SGD</span></p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}             
                  </div>   
                </div>
                <div className="payment-detail-button">
                <Link to="/">
                    <button className="ui primary button home icon ">
                    <i 
                        aria-hidden="true" 
                        className="home icon"
                    />
                    </button>
                </Link>
            </div>
            </div>
          </div>}

      </div>
  );
};

export default ResultPayments;
