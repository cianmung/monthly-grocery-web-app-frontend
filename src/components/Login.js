import SafeWord from "../files/asking_safeword.gif";
import { Input, Button } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isLoading = useStoreState((state) => state.isLoading);
  const isError = useStoreState((state) => state.isError);
  const setIsError = useStoreActions((actions) => actions.setIsError);
  const setIsLoggedIn = useStoreActions((actions) => actions.setIsLoggedIn);
  const safeWord = useStoreState((state) => state.safeWord);
  const setSafeWord = useStoreActions((actions) => actions.setSafeWord);

  const navigate = useNavigate();

  const validateSafeWord = (e) => {
    e.preventDefault();
    if (safeWord.toLocaleLowerCase() == "seacucumber") {
      setIsLoggedIn(true);
      navigate("/selectgrocerytype");
      setIsError("");
    } else {
      setIsLoggedIn(false);
      setIsError("Your safe word is incorrect!");
    }
  };

  return (
    <div className="Login login-component-container">
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
      {!isLoading && (
        <div className="login-component">
          <div className="require-safe-work-container">
            <img src={SafeWord} alt="Safe Word?" />
          </div>
          <div className="safe-word-input-container">
            <h2>SAFE WORD?</h2>
            <form onSubmit={validateSafeWord}>
              <Input
                id="safe-word"
                type="password"
                icon="lock"
                iconPosition="left"
                placeholder="Write Your Safe Word Here..."
                value={safeWord}
                onChange={(e) => setSafeWord(e.target.value)}
                required
              />
              <Button
                content="Login"
                icon="arrow alternate circle right outline"
                labelPosition="right"
                primary
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
