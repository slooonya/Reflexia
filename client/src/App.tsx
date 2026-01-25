import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { GuidedReflectionPage } from './pages/GuidedReflectionPage';
import { ImageEditingPage } from './pages/ImageEditingPage';
import { UploadPage } from './pages/UploadPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { LandingPage } from './pages/LandingPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './App.css'

function App() {

  return (
    <Routes>
      <Route index element={<HomePage />} />
      // <Route index element={<LandingPage />}/>

      <Route path="auth" element={<AuthPage />} />
      <Route path="reflection" element={<GuidedReflectionPage />} />
      <Route path="editing" element={<ImageEditingPage />} />
      <Route path="upload" element={<UploadPage />} />
      <Route path="profile" element={<UserProfilePage />} />

      <Route path="error" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
