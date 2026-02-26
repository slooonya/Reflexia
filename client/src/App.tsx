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
import { Toaster } from 'sonner';
import ProtectedRoute from './utils/ProtectedRoute';

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<LandingPage />}/>
        <Route path="auth" element={<AuthPage />} />

        <Route path="gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>}/>
        <Route path="/reflection/:type/:id" element={<ProtectedRoute><GuidedReflectionPage /></ProtectedRoute>} />
        <Route path="/editing/:type/:id" element={<ProtectedRoute><ImageEditingPage /></ProtectedRoute>} />
        <Route path="upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
        <Route path="/details/:type/:id" element={<ProtectedRoute><DetailsPage /></ProtectedRoute>} />
        <Route path="/processing/:jobId" element={<ProtectedRoute><ProcessingPage /></ProtectedRoute>}/>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
