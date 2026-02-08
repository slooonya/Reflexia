import { useNavigate } from "react-router";
import { Navbar } from "../../components/Navbar";
import { Polaroid } from "../../components/Polaroid";
import { Button } from "../../components/Button";

import BackIcon from '../../assets/icons/back-icon.svg';
import TVStatic from '../../assets/images/tv-static.gif';
import './NotFoundPage.css';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <>
      <title>404 Not Found</title>

      <Navbar />

      <div className="page-content not-found">
          <div className="polaroid-container">
            <Polaroid imageSrc={TVStatic} caption={"404 Not Found"}/>
          </div>

          <div className="error-container">
            <h1>Oops!</h1>
            <p>We couldn't find the page <br></br>
               you were looking for.</p>
            <Button variant="accent" onClick={() => navigate(-1)} icon={BackIcon}>
              Go back
            </Button>
          </div>
      </div>
    </>
  );
}