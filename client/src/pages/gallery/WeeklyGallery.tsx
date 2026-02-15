import { Link, useNavigate } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { addEmptySlots } from './emptySlotGenerator';
import { EmptyState } from './EmptyState';

import EmptyImg from '../../assets/images/empty.svg';
import UploadIcon from '../../assets/icons/upload-icon-white.svg';
import './WeeklyGallery.css'

export function WeeklyGallery({ weekly }) {
  const navigate = useNavigate();

  if (!weekly.length) {
    return (
      <EmptyState img={EmptyImg} title="Nothing here yet" text="Upload your watch history to generate weekly insights." 
                  action={() => navigate("/upload")} actionLabel="Upload" btnIcon={UploadIcon} />
    );
  }

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