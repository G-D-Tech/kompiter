import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/Homepage.css";
import "../styles/CreateGroup.css";
import "../styles/LoginPage.css";
import "react-datepicker/dist/react-datepicker.css";

const SignUpOrInPage = () => {
  return (
    <div>
      <div class="container">
        <Link to="/">
          <IoIosArrowBack class="IoIosArrowBack"></IoIosArrowBack>
        </Link>
      </div>
      <div class="container-center ">
        <Link to="/LoginPage">
          <button class="signInButtonStyle">Logg inn</button>
        </Link>
        <Link to="/SignUpPage">
          <button class="signInButtonStyle">Opprett konto</button>
        </Link>

        <button class="tilbakemeldingButtonStyle">Gi oss tilbakemelding</button>
      </div>
    </div>
  );
};

export default SignUpOrInPage;
