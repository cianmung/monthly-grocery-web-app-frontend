import { useStoreState } from "easy-peasy";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const paymentOverall = useStoreState((state) => state.getPaymentOverall);
  const totalPayment = paymentOverall.reduce((a, v) => (a = a + v.amount), 0);
  const eachPayment = totalPayment / paymentOverall.length;

  return (
    <div className="Footer">
      <div className="footer-wrapper">
        <h4>Total : ${totalPayment.toFixed(2)}</h4>
        <NavLink
          to="/"
          style={{ color: "rgba(255,255,255,.7)" }}
          className={({ isActive }) =>
            "item home icon" + (isActive ? " active" : "")
          }
        >
          <i aria-hidden="true" className="home icon large" />
        </NavLink>
        <h4>Each : ${eachPayment ? eachPayment.toFixed(2) : "0.00"}</h4>
      </div>
    </div>
  );
};

export default Footer;
