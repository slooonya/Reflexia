import { Routes, Route, Navigate } from 'react-router';
import { WeeklyGalleryPage } from './pages/WeeklyGalleryPage';
import { MonthlyGalleryPage } from './pages/MonthlyGalleryPage';
import { GalleryLayout } from './pages/GalleryLayout';
import { AuthPage } from './pages/AuthPage';
import { GuidedReflectionPage } from './pages/GuidedReflectionPage';
import { ImageEditingPage } from './pages/ImageEditingPage';
import { UploadPage } from './pages/upload/UploadPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
// import { LandingPage } from './pages/LandingPage';
import './App.css'
import { DetailsPage } from './pages/DetailsPage';

function App() {

  return (
    <Routes>
      {"<Route index element={<WeeklyGalleryPage />} />"}{"<Route index element={<LandingPage />}/>"}

      <Route element={<GalleryLayout />}>
        <Route index element={<WeeklyGalleryPage />} />
        <Route path="/gallery/week" element={<Navigate to="/" replace />} />
        <Route path="/gallery/month" element={<MonthlyGalleryPage />} />
      </Route>

      <Route path="auth" element={<AuthPage />} />
      <Route path="reflection" element={<GuidedReflectionPage />} />
      <Route path="editing" element={<ImageEditingPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="profile" element={<UserProfilePage />} />
      <Route path="details" element={<DetailsPage />}></Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
