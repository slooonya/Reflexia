import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { Navbar } from '../../components/Navbar';
import { SummarySection } from './SummarySection';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { useInsight } from '../../hooks/useInsight';
import { useInsights } from '../../hooks/useInsights';
import { Toggle } from '../../components/Toggle';
import { getReflectionSummary } from '../../api/reflection';

import BackIcon from '../../assets/icons/back-icon.svg';
import './DetailsPage.css';

export function DetailsPage() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [mode, setMode] = useState("Viewing");
  const [reflectionSummary, setReflectionSummary] = useState(null);

  useEffect(() => {
    if (!id) return;

    getReflectionSummary(id).then(response => {
      setReflectionSummary(response.summary);
    });
  }, [id])

  const { data: entry } = useInsight(id);
  const { data: entries, loading } = useInsights();

  if (loading || !entry) return <Loader />

  const sameTypeData = entries
    .filter(e => e.period_type === entry.period_type)
    .sort((a, b) => a.period_start.localeCompare(b.period_start));

  const index = sameTypeData.findIndex(e => e.id === entry.id);
  
  const prev = sameTypeData[index - 1];
  const next = sameTypeData[index + 1];

  return (
    <>
      <title>Details</title>
      <Navbar />
      <div className="details-back">
        <Button variant="accent" onClick={() => navigate("/gallery")} icon={BackIcon}>
          Go back
        </Button>
      </div>

      <div className="details-page-content">
        <div className="details-left-container">
          <div className="polaroid-container">
            <Polaroid imageSrc={entry.image_url} caption={entry.period_label} />
          </div>

          <div className="controls">
            <button className={`${!prev ? "disabled" : ""}`} 
                    onClick={() => navigate(`/details/${type}/${prev.id}`)}>
              ‹
            </button>

            <button className={`${!next ? "disabled" : ""}`}
                    onClick={() => navigate(`/details/${type}/${next.id}`)}>
              ›
            </button>
          </div>
        </div>

        <div className="details-right-container">
          <Toggle options={["Viewing", "Reflection"]} active={mode} variant="black" onChange={setMode}/>

          <div className={`summary-mode-container ${mode === "Viewing" ? "viewing" : "reflection"}`}>
            <div className="summary-mode viewing">
              <SummarySection summary={entry.summary} id={entry.id} type={entry.period_type}/>
            </div>

            <div className="summary-mode reflection">
              <SummarySection summary={reflectionSummary} id={entry.id} type={entry.period_type}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}