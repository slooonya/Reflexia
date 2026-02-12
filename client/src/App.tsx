import { Routes, Route } from 'react-router';
import { GalleryPage } from './pages/gallery/GalleryPage';
import { AuthPage } from './pages/auth/AuthPage';
import { GuidedReflectionPage } from './pages/reflection/GuidedReflectionPage';
import { ImageEditingPage } from './pages/editing/ImageEditingPage';
import { UploadPage } from './pages/upload/UploadPage';
import { UserProfilePage } from './pages/profile/UserProfilePage';
import { NotFoundPage } from './pages/error/NotFoundPage';
import { DetailsPage } from './pages/gallery/DetailsPage';
import { LandingPage } from './pages/landing/LandingPage';
import { ProcessingPage } from './pages/processing/ProcessingPage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<LandingPage />}/>
      <Route path="gallery" element={<GalleryPage />}/>
      <Route path="auth" element={<AuthPage />} />
      <Route path="/reflection/:type/:id" element={<GuidedReflectionPage />} />
      <Route path="/editing/:type/:id" element={<ImageEditingPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="profile" element={<UserProfilePage />} />
      <Route path="/details/:type/:id" element={<DetailsPage />} />
      <Route path="/processing/:jobId" element={<ProcessingPage />}/>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
