import { Link } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { weeklyGalleryData } from './galleryData';
import { addEmptySlots } from './emptySlotGenerator';

import './WeeklyGallery.css'

export function WeeklyGallery() {
  const items = addEmptySlots(weeklyGalleryData, 3);

  return (
    <>
      <div className="gallery-grid">
        {items.map(item => (
          <div className="grid-slot" key={item.id}>
            {item.empty ? null : (
              <Link to={`/details/week/${item.id}`} className="link">
                <Polaroid imageSrc={item.image} caption={item.caption} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}