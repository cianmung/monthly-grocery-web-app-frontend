import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import AddNewGrocery from "./components/AddNewGrocery";
import PaymentDetails from "./components/PaymentDetails";
import EditPaymentDetail from "./components/EditPaymentDetail";
import ResultPayments from "./components/ResultPayments";
import Login from "./components/Login";
import SelectGroceryType from "./components/SelectGroceryType";

import { Route, Routes, Navigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

function App() {
  const isLoggedIn = useStoreState((state) => state.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route
          path="selectgrocerytype"
          element={
            !isLoggedIn ? <Navigate to="/login" /> : <SelectGroceryType />
          }
        />
        <Route
          index
          element={!isLoggedIn ? <Navigate to="/login" /> : <Home />}
        />
        <Route
          path="about"
          element={!isLoggedIn ? <Navigate to="/login" /> : <About />}
        />
        <Route
          path="newgrocery"
          element={!isLoggedIn ? <Navigate to="/login" /> : <AddNewGrocery />}
        />
        <Route path="paymentdetail">
          <Route
            path=":name"
            element={
              !isLoggedIn ? <Navigate to="/login" /> : <PaymentDetails />
            }
          />
        </Route>
        <Route path="editpaymentdetail">
          <Route
            path=":id"
            element={
              !isLoggedIn ? <Navigate to="/login" /> : <EditPaymentDetail />
            }
          />
        </Route>
        <Route
          path="calculatepayments"
          element={!isLoggedIn ? <Navigate to="/login" /> : <ResultPayments />}
        />
      </Route>
    </Routes>
  );
}

export default App;
