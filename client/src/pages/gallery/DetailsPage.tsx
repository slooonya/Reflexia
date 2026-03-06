import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useInsight } from '../../hooks/useInsight';
import { useInsights } from '../../hooks/useInsights';
import { Polaroid } from '../../components/Polaroid';
import { Navbar } from '../../components/Navbar';
import { SummarySection } from './SummarySection';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { Toggle } from '../../components/Toggle';
import { ImageOverlay } from '../../components/ImageOverlay';
import { getReflectionSummary } from '../../api/reflection';
import { toast } from 'sonner';

import BackIcon from '../../assets/icons/back-icon.svg';
import ReflectIcon from '../../assets/icons/reflect-icon.svg';
import EditIcon from '../../assets/icons/edit-icon.svg';
import './DetailsPage.css';

export function DetailsPage() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("Viewing");
  const [reflectionSummary, setReflectionSummary] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    if (location.state?.sessionComplete) {
      toast.success("Reflection session completed ✨");
    }

    getReflectionSummary(id).then(response => {
      setReflectionSummary(response.summary);
    });
  }, [id, location.state])

  const { data: entry } = useInsight(id);
  const { data: entries, loading } = useInsights();

  if (loading || !entry) return <Loader />

  const sameTypeData = entries
    .filter(e => e.period_type === entry.period_type)
    .sort((a, b) =>
    new Date(a.period_start).getTime() -
    new Date(b.period_start).getTime());

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
          <div className="polaroid-container" onClick={() => setIsImageOpen(true)}>
            <Polaroid imageSrc={entry.image_url} caption={entry.period_label} />
          </div>

          <div className="controls">
            <button className={`${!next ? "disabled" : ""}`} 
                    onClick={() => navigate(`/details/${type}/${next.id}`)}>
              ‹
            </button>

            <button className={`${!prev ? "disabled" : ""}`}
                    onClick={() => navigate(`/details/${type}/${prev.id}`)}>
              ›
            </button>
          </div>
        </div>

        <div className="details-right-container">
          <Toggle options={["Viewing", "Reflection"]} active={mode} variant="black" onChange={setMode}/>

          <div className={`summary-mode-container ${mode === "Viewing" ? "viewing" : "reflection"}`}>
            <div className="summary-mode viewing">
              <SummarySection summary={entry.summary} />
            </div>

            <div className="summary-mode reflection">
              <SummarySection summary={reflectionSummary} />
            </div>
          </div>

          <div className="action-btns">
            <Button to={`/editing/${type}/${id}`} icon={EditIcon}>Edit</Button>
            <Button to={`/reflection/${type}/${id}`} icon={ReflectIcon}>Reflect</Button>
          </div>
        </div>
      </div>

      {isImageOpen && (
        <ImageOverlay img={entry.image_url} onClose={() => setIsImageOpen(false)}/>
      )}
    </>
  );
}