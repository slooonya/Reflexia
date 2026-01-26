import { NavLink, useLocation } from 'react-router';
import './RangeToggle.css';

export function RangeToggle() {
  const location = useLocation();
  const isMonth = location.pathname === "/gallery/month";

  return (
    <div className={`range-toggle ${isMonth ? "month" : "week"}`}>
        <NavLink to={"/gallery/week"} className="range-toggle-btn">Week</NavLink>
        <NavLink to={"/gallery/month"} className="range-toggle-btn">Month</NavLink>
        
        <div className="range-toggle-slider" />
    </div>
  );
}