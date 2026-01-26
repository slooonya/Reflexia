import { BackButton } from "../components/BackButton";
import { Navbar } from "../components/Navbar";
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <>
      <title>Not Found</title>

      <Navbar />

      <div className="page-content">
          <BackButton />
      </div>
    </>
  );
}