import { useStoreState } from 'easy-peasy';

const Footer = () => {
  const paymentOverall = useStoreState((state) => state.getPaymentOverall);
  const totalPayment = paymentOverall.reduce((a, v) => a = a + v.amount, 0);
  const eachPayment = totalPayment/paymentOverall.length;

  return(
    <div className="Footer">
      <div className="footer-wrapper">
        <h4>Total : ${totalPayment.toFixed(2)}</h4>
        <h4>Each : ${eachPayment.toFixed(2)}</h4>
      </div>
    </div>      
  );
};

export default Footer;
