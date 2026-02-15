import { Navbar } from './Navbar';
import './Loader.css';

export function Loader() {
  return (
    <>
      <Navbar />

      <div className="loader-container">
        <div className="loader"></div>
        <p>LOADING</p>
      </div>
    </>
  );
}