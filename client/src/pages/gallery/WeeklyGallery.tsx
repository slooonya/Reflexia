import { Link } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { addEmptySlots } from './emptySlotGenerator';

import './WeeklyGallery.css'

export function WeeklyGallery({ weekly }) {
  const items = addEmptySlots(weekly, 3);

  return (
    <>
      <div className="gallery-grid">
        {items.map(item => (
          <div className="grid-slot" key={item.id}>
            {item.empty ? null : (
              <Link to={`/details/week/${item.id}`} className="link">
                <Polaroid imageSrc={item.image_url} caption={item.period_label} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}