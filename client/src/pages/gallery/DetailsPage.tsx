import { useLocation, useNavigate, useParams } from 'react-router';
import { BackButton } from '../../components/BackButton';
import { Polaroid } from '../../components/Polaroid';
import { Navbar } from '../../components/Navbar';
import { SummarySection } from './SummarySection';
import { monthlyGalleryData, weeklyGalleryData } from './galleryData';

import './DetailsPage.css';

export function DetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isMonth = location.pathname.includes("/month/");
  const type = isMonth ? "month" : "week";
  const data = isMonth ? monthlyGalleryData : weeklyGalleryData;

  const index = data.findIndex(x => x.id === id);
  if (index === -1) return <div>Not Found</div>;
  
  const item = data[index];
  const prevItem = data[index - 1];
  const nextItem = data[index + 1];

  return (
    <>
      <title>Details</title>
      <Navbar />
      <div className="details-back">
        <BackButton />
      </div>

      <div className="details-page-content">
        <div className="details-left-container">
          <div className="polaroid-container">
            <Polaroid imageSrc={item.image} caption={item.caption} />
          </div>

          <div className="controls">
            <button className={`${!prevItem ? "disabled" : ""}`} 
                    onClick={() => navigate(`/details/${type}/${prevItem.id}`)}>
              ‹
            </button>

            <button className={`${!nextItem ? "disabled" : ""}`}
                    onClick={() => navigate(`/details/${type}/${nextItem.id}`)}>
              ›
            </button>
          </div>
        </div>

        <div className="details-right-container">
          <SummarySection summary={item.summary} id={item.id} type={isMonth ? "month" : "week"}/>
        </div>
      </div>
    </>
  );
}