import { Link, useNavigate } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { WeeklyImages } from './WeeklyImages';
import { addEmptySlots } from './emptySlotGenerator';
import type { Insight } from '../../types/insight';
import { EmptyState } from './EmptyState';

import EmptyImg from '../../assets/images/empty.svg';
import UploadIcon from '../../assets/icons/upload-icon-white.svg';
import './MonthlyGallery.css'

export function MonthlyGallery({ weekly, monthly }) {
  const navigate = useNavigate();

  if (!monthly.length) {
    return (
      <EmptyState img={EmptyImg} title="Nothing here yet" text="Upload your watch history to generate monthly insights." 
                  action={() => navigate("/upload")} actionLabel="Upload" btnIcon={UploadIcon} />
    );
  }

  const items = addEmptySlots(monthly, 2);

  function getWeeksForMonth(month: Insight) {
    const start = new Date(month.period_start);
    const end = new Date(month.period_end);

    return weekly.filter(week => {
      const date = new Date(week.period_start);
      return date >= start && date <= end;
    });
  }

  return (
    <>
      <div className="monthly-gallery-grid">  
        {items.map(item => {
          if (item.empty) {
            return <div className="grid-slot"></div>;
          }

          const weeks = getWeeksForMonth(item);

          return (
            <div className="monthly-gallery-slot" key={item.id}>
              <WeeklyImages weeks={weeks}/>
              <div className="monthly-image">
                <Link to={`/details/month/${item.id}`} className="link">
                  <Polaroid imageSrc={item.image_url} caption={item.period_label} />
                </Link>
              </div>
            </div>
          );
        })} 
      </div>
    </>
  );
}