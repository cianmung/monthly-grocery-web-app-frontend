import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import AddNewGrocery from "./components/AddNewGrocery";
import PaymentDetails from "./components/PaymentDetails";
import EditPaymentDetail from "./components/EditPaymentDetail";
import ResultPayments from "./components/ResultPayments";

import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useStoreActions } from "easy-peasy";
import useAxiosFetch from "./hooks/useAxiosFetch";

function App() {
  const setPaymentDetails = useStoreActions((actions) => actions.setPaymentDetails);
  //const { data } = useAxiosFetch('http://localhost:3500/payments');
  const { data } = useAxiosFetch('/paymentdetails');

  useEffect(() => {
    setPaymentDetails(data);
  },[data, setPaymentDetails]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <Home />}/>
        <Route path="about" element={<About />}/>
        <Route path="newgrocery" element={<AddNewGrocery/>}/>
        <Route path="paymentdetail">
          <Route path=":name" element={<PaymentDetails />}/>
        </Route>
        <Route path="editpaymentdetail">
          <Route path=":id" element={<EditPaymentDetail />}/>
        </Route>
        <Route path="calculatepayments" element={<ResultPayments />}/>
      </Route>
    </Routes>
  );
}

export default App;
