import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Toggle } from "../../components/Toggle";
import { MonthlyGallery } from "./MonthlyGallery";
import { WeeklyGallery } from "./WeeklyGallery";
import { getInsights } from "../../api/insights";
import type { Insight } from "../../types/insight";

import './GalleryPage.css';

export function GalleryPage() {
  const [mode, setMode] = useState("Week");
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    getInsights().then(setInsights);
  }, []);

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