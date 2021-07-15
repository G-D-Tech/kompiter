import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";

const SignUpOrInPage = () => {
  return (
    <div>
      <div className="container">
        <Link to="/">
          <IoIosArrowBack className="IoIosArrowBack"></IoIosArrowBack>
        </Link>
      </div>
      <div className="container-center ">
        <Link to="/LoginPage">
          <button className="signInButtonStyle">Logg inn</button>
        </Link>
        <Link to="/SignUpPage">
          <button className="signInButtonStyle">Opprett konto</button>
        </Link>

        <button className="tilbakemeldingButtonStyle">
          Gi oss tilbakemelding
        </button>
      </div>
    </div>
  );
};

export default SignUpOrInPage;
