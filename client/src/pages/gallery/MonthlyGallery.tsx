import { Link } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { WeeklyImages } from './WeeklyImages';
import { monthlyGalleryData, weeklyGalleryData } from './galleryData';
import { addEmptySlots } from './emptySlotGenerator';
import './MonthlyGallery.css'

export function MonthlyGallery() {
  const items = addEmptySlots(monthlyGalleryData, 2);

  return (
    <>
      <div className="monthly-gallery-grid">  
        {items.map(item => {
          if (item.empty) {
            return <div className="grid-slot"></div>;
          }
          const weeks = item.weeks.map(id => weeklyGalleryData.find(w => w.id === id)).filter(Boolean);

          return (
            <div className="monthly-gallery-slot" key={item.id}>
              <WeeklyImages weeks={weeks}/>
              <div className="monthly-image">
                <Link to={`/details/month/${item.id}`} className="link">
                  <Polaroid imageSrc={item.image} caption={item.caption} />
                </Link>
              </div>
            </div>
          );
        })} 
      </div>
    </>
  );
}