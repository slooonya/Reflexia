import { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Toggle } from "../../components/Toggle";
import { MonthlyGallery } from "./MonthlyGallery";
import { WeeklyGallery } from "./WeeklyGallery";
import { Loader } from "../../components/Loader";

import './GalleryPage.css';
import { useInsights } from "../../hooks/useInsights";

export function GalleryPage() {
  const [mode, setMode] = useState("Week");
  const { data: insights, loading } = useInsights();

  if (loading) return <Loader />;

  const weekly = insights.filter(i => i.period_type === "week");
  const monthly = insights.filter(i => i.period_type === "month")

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
            <WeeklyGallery weekly={weekly} />
          </div>
          <div className="gallery-view month">
            <MonthlyGallery monthly={monthly} weekly={weekly} />
          </div>
        </div>
      </div>
    </>
  );
}