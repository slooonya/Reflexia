import { Link, useNavigate } from 'react-router';
import { Polaroid } from '../../components/Polaroid';
import { addEmptySlots } from './emptySlotGenerator';
import { EmptyState } from '../../components/EmptyState';

import EmptyImg from '../../assets/images/empty.svg';
import UploadIcon from '../../assets/icons/upload-icon.svg?react';
import './WeeklyGallery.css'

export function WeeklyGallery({ weekly }) {
  const navigate = useNavigate();

  if (!weekly.length) {
    return (
      <div className="empty-state-container">
        <EmptyState img={EmptyImg} title="Nothing here yet" text="Upload your watch history to generate weekly insights." 
                    action={() => navigate("/upload")} actionLabel="Upload" btnIcon={UploadIcon} variant="accent" />
      </div>
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