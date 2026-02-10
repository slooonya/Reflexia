import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { Navbar } from '../../components/Navbar';
import { SummarySection } from './SummarySection';
import { Button } from '../../components/Button';
import { getInsight, getInsights } from '../../api/insights';
import type { Insight } from '../../types/insight';

import BackIcon from '../../assets/icons/back-icon.svg';
import './DetailsPage.css';

export function DetailsPage() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState<Insight | null>(null);
  const [allEntries, setAllEntries] = useState<Insight[]>([]);

  useEffect(() => {
    if (!id) return;

    getInsight(id).then(setEntry);
    getInsights().then(setAllEntries);
  }, [id]);

  if (!entry) return <div>Loading...</div>

  const sameTypeData = allEntries.filter(i => i.period_type === type);
  const index = sameTypeData.findIndex(i => i.id === entry.id);
  
  const prev = sameTypeData[index - 1];
  const next = sameTypeData[index + 1];

  return (
    <>
      <title>Details</title>
      <Navbar />
      <div className="details-back">
        <Button variant="accent" onClick={() => navigate(-1)} icon={BackIcon}>
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
          <SummarySection summary={entry.summary} id={entry.id} type={entry.period_type}/>
        </div>
      </div>
    </>
  );
}