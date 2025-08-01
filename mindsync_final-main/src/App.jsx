import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load page components
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Chat = lazy(() => import('./pages/Chat').then(module => ({ default: module.Chat })));
const Refresh = lazy(() => import('./pages/Refresh').then(module => ({ default: module.Refresh })));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/refresh" element={<Refresh />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;