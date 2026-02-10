import { Link } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { WeeklyImages } from './WeeklyImages';
import { addEmptySlots } from './emptySlotGenerator';
import type { Insight } from '../../types/insight';

import './MonthlyGallery.css'

export function MonthlyGallery({ weekly, monthly }) {
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