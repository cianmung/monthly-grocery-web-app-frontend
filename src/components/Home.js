import EachPersonPayment from "./EachPersonPayment";
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const Home = () => {
  const paymentOverall = useStoreState((state) => state.getPaymentOverall);
  const isLoading = useStoreState((state) => state.isLoading);
  const isError = useStoreState((state) => state.isError);

  return(
    <div className="Home">
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
      <>
        {paymentOverall.map(each => (
          <div key = {each.name} className="summary-for-each-person-container">
            <EachPersonPayment each = {each}/>
          </div>))}
          <div className="calculate-button-container">
            <Link to="/calculatepayments">
              <button className="ui positive button">Calculate</button> 
            </Link>
          </div>
      </>    
      }   
    </div>
  );
};

export default Home;
