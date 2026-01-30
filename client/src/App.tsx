import { Routes, Route, Navigate } from 'react-router';
import { WeeklyGalleryPage } from './pages/gallery/WeeklyGalleryPage';
import { MonthlyGalleryPage } from './pages/gallery/MonthlyGalleryPage';
import { GalleryLayout } from './pages/gallery/GalleryLayout';
import { AuthPage } from './pages/AuthPage';
import { GuidedReflectionPage } from './pages/reflection/GuidedReflectionPage';
import { ImageEditingPage } from './pages/ImageEditingPage';
import { UploadPage } from './pages/upload/UploadPage';
import { UserProfilePage } from './pages/profile/UserProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DetailsPage } from './pages/gallery/DetailsPage';
// import { LandingPage } from './pages/LandingPage';
import './App.css'

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
