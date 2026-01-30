import { Outlet, useLocation, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Toggle } from "../components/Toggle";
import './GalleryLayout.css';

export function GalleryLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const active = location.pathname.includes("month") ? "Month" : "Week";

  return (
    <>
      <Navbar />

      <div className="blur-box" />

      <div className="gallery-container">
        <div className="gallery-toggle">
          <Toggle options={["Week", "Month"]} active={active} variant="brown" 
                  onChange={(value) => navigate(`/gallery/${value.toLowerCase()}`)}/>
        </div>
        <Outlet />
      </div>
    </>
  );
}