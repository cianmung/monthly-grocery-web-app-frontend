import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";
import { Button } from "semantic-ui-react";

const EachPersonPayment = ({ each }) => {
  const payeeOptions = useStoreState((state) => state.payeeOptions);
  const payeeAvatar = payeeOptions.find((option) => option.text === each.name)
    .image.src;

  return (
    <div className="each-person-payment-container">
      <div className="person-profile-image-container">
        <img src={payeeAvatar} alt="avatar" />
      </div>
      <div className="person-profile-payment-container">
        <div className="person-profile-payment-body">
          <h3>{each.name}</h3>
        </div>
        <div className="person-profile-payment-footer">
          <h3>Total: ${each.amount.toFixed(2)}</h3>
          <div className="person-profile-payment-button-container">
            <Link to={`/paymentdetail/${each.name}`}>
              <Button
                color="blue"
                content="DETAILS"
                icon="folder open outline"
                labelPosition="left"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EachPersonPayment;
