import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { RangeToggle } from "../components/RangeToggle";
import './GalleryLayout.css';

export function GalleryLayout() {
  return (
    <>
      <Navbar />

      <div className="gallery-container">
        <RangeToggle />
        <Outlet />
      </div>
    </>
  );
}