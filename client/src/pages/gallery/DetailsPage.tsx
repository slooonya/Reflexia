import { useNavigate, useParams } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { Navbar } from '../../components/Navbar';
import { SummarySection } from './SummarySection';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { useInsight } from '../../hooks/useInsight';
import { useInsights } from '../../hooks/useInsights';

import BackIcon from '../../assets/icons/back-icon.svg';
import './DetailsPage.css';

export function DetailsPage() {
  const { id, type } = useParams();
  const navigate = useNavigate();

  const { data: entry } = useInsight(id);
  const { data: entries, loading } = useInsights();

  if (loading) return <Loader />
  if (!entry) return <div>Not found</div>;

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
          <SummarySection summary={entry.summary} id={entry.id} type={entry.period_type}/>
        </div>
      </div>
    </>
  );
}