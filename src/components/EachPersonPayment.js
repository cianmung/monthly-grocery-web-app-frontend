import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const EachPersonPayment = ({each}) => {
    const payeeOptions = useStoreState((state) => state.payeeOptions);
    const payeeAvatar = payeeOptions.find(option => option.text === each.name).image.src;

  return (
        <div className="each-person-payment-container">
        <div className="person-profile-image-container">
            <img src={payeeAvatar} alt="avatar"/>
        </div>
        <div className="person-profile-payment-container">
            <div className="person-profile-payment-body">
                <h3>{each.name}</h3>
            </div>              
        <div className="person-profile-payment-footer">
            <h3>Total: ${each.amount}</h3>
            <div className="person-profile-payment-button-container">
                <Link to="/newgrocery">
                    <button className ="ui icon primary button">
                        <i aria-hidden="true" className="cart plus icon"></i>
                    </button>
                </Link>
                <Link to={`/paymentdetail/${each.name}`}>
                    <button className="ui icon button">
                        <i aria-hidden="true" className="list ul icon"></i>
                    </button>
                </Link>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default EachPersonPayment;
