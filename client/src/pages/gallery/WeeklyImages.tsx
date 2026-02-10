import './WeeklyImages.css';

export function WeeklyImages({ weeks }) {
  return (
    <div className="weekly-images">
      {weeks.map((week, idx) => (
        <div key={week.id} className="weekly-image">
          <img src={week.image_url} />
          <span>Week {idx + 1}</span>
        </div>
      ))}
    </div>
  );
}