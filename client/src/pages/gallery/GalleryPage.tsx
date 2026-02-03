import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Toggle } from "../../components/Toggle";
import { MonthlyGallery } from "./MonthlyGallery";
import { WeeklyGallery } from "./WeeklyGallery";
import './GalleryPage.css';

export function GalleryPage() {
  const [mode, setMode] = useState("Week");

  return (
    <>
      <title>Gallery</title>
      <Navbar />

      <div className="blur-box" />

      <div className="gallery-container">
        <div className="gallery-toggle">
          <Toggle options={["Week", "Month"]} active={mode} variant="brown" onChange={setMode}/>
        </div>

        <div className={`gallery-view-container ${mode === "Month" ? "month" : "week"}`}>
          <div className="gallery-view week">
            <WeeklyGallery />
          </div>
          <div className="gallery-view month">
            <MonthlyGallery />
          </div>
        </div>
      </div>
    </>
  );
}