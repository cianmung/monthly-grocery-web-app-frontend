import { Confirm, Card, Feed, Button, Message } from "semantic-ui-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import Moment from "react-moment";
import MonthYearFilterPaymentDetails from "./MonthYearFilterPaymentDetails";

const PaymentDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const isLoading = useStoreState((state) => state.isLoading);
  const isError = useStoreState((state) => state.isError);
  const payeeOptions = useStoreState((state) => state.payeeOptions);

  const paymentDetails = useStoreState((state) => state.paymentDetails);
  const eachPersonRecord = useStoreState((state) => state.eachPersonRecord);
  const setEachPersonRecord = useStoreActions(
    (actions) => actions.setEachPersonRecord
  );
  const paymentDetailDisplayName = useStoreState(
    (state) => state.paymentDetailDisplayName
  );
  const setPaymentDetailDisplayName = useStoreActions(
    (actions) => actions.setPaymentDetailDisplayName
  );
  const getEachPaymentDetailsByName = useStoreState(
    (state) => state.getEachPaymentDetailsByName
  );
  const filterEachRecord = getEachPaymentDetailsByName(name);
  const deletePaymentDetail = useStoreActions(
    (actions) => actions.deletePaymentDetail
  );
  const confirmDeletePopUp = useStoreState((state) => state.confirmDeletePopUp);
  const setConfirmDeletePopUp = useStoreActions(
    (actions) => actions.setConfirmDeletePopUp
  );

  const selectedMonth = useStoreState((state) => state.selectedMonth);
  const selectedYear = useStoreState((state) => state.selectedYear);

  useEffect(() => {
    setEachPersonRecord(filterEachRecord);
    setPaymentDetailDisplayName(name);
  }, [
    paymentDetails,
    setEachPersonRecord,
    setPaymentDetailDisplayName,
    deletePaymentDetail,
    selectedMonth,
    selectedYear,
  ]);

  const handleDelete = (id, name) => {
    deletePaymentDetail(id);
    navigate(`/paymentdetail/${name}`);
  };

  const handleDeleteCancel = () => {
    setConfirmDeletePopUp(false);
  };

  const handleDeleteConfirm = (id, name) => {
    setConfirmDeletePopUp(false);
    handleDelete(id, name);
  };

  const showDeleteConfirm = () => {
    setConfirmDeletePopUp(true);
  };
  return (
    <div className="PaymentDetails">
      {isError && (
        <div class="ui error message">
          <div class="content">
            <div class="header">{isError}</div>
          </div>
        </div>
      )}
      {!isError && isLoading && (
        <div className="loader">
          <div className="ui active transition visible inverted dimmer">
            <div className="content">
              <div className="ui inverted text loader">Loading</div>
            </div>
          </div>
        </div>
      )}
      {!isError && !isLoading && (
        <div className="payment-details-container">
          <div className="payment-detail-image">
            <img
              src={
                payeeOptions.find((option) => option.text === name).image.src
              }
              alt="avatar"
            />
          </div>
          <Card className="payment-details">
            <Card.Content>
              <MonthYearFilterPaymentDetails name={name} />
            </Card.Content>
            <Card.Content className="payment-records-content-container">
              <Card.Header className="payment-records-content-header">
                Payment Records for{" "}
                <span style={{ color: "#2185d0" }}>
                  {paymentDetailDisplayName}
                </span>
              </Card.Header>
              <Feed>
                {eachPersonRecord.length > 0 &&
                  eachPersonRecord.map((each) => (
                    <Feed.Event key={each._id}>
                      <Feed.Label
                        image={
                          payeeOptions.find(
                            (option) => option.text === each.name
                          ).image.src
                        }
                      />
                      <Feed.Content>
                        <Feed.Date
                          content={<Moment fromNow>{each.updatedAt}</Moment>}
                        />
                        <Feed.Summary>
                          <div className="payment-records-feed-summary-container">
                            <div className="payment-records-feed-summary">
                              <p>
                                <span style={{ color: "#2185d0" }}>
                                  Amount:
                                </span>{" "}
                                ${each.amount}
                              </p>
                              <p>
                                <span style={{ color: "#2185d0" }}>
                                  Grocery Items:
                                </span>{" "}
                                {each.groceryItems}
                              </p>
                            </div>
                            <div className="payment-records-feed-editor">
                              <Link to={`/editpaymentdetail/${each._id}`}>
                                <i aria-hidden="true" className="edit icon" />
                              </Link>
                              <i
                                aria-hidden="true"
                                className="trash alternate icon"
                                onClick={() => showDeleteConfirm()}
                                style={{
                                  cursor: "pointer",
                                  color: "red",
                                  marginBottom: "4px",
                                  marginLeft: "5px",
                                }}
                              />
                              <Confirm
                                open={confirmDeletePopUp}
                                cancelButton="No"
                                confirmButton="Yes"
                                onCancel={() => handleDeleteCancel()}
                                onConfirm={() =>
                                  handleDeleteConfirm(each._id, each.name)
                                }
                              />
                            </div>
                          </div>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  ))}
                {eachPersonRecord.length === 0 && (
                  <Message warning>
                    <Message.Header>No Payment Records Found!</Message.Header>
                    <p>
                      Please Select <b>Month</b> and <b>Year</b> Again.
                    </p>
                  </Message>
                )}
              </Feed>
            </Card.Content>
          </Card>

          <div className="payment-detail-button">
            <Link to="/">
              <Button
                color="blue"
                content="HOME"
                icon="home"
                labelPosition="left"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
