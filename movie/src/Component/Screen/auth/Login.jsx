import { LoginEndpoint } from "../../../../spotify";
import "../../Shared/login.css";
export const Login = () => {
  return (
    <>
      <div className="login-page">
        <div className="logo-container">
          <h1>Music</h1>
        </div>
        <a href={LoginEndpoint}>
          <div className="login-btn">Log In</div>
        </a>
      </div>
    </>
  );
};
