import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Children from './pages/Children';
import { ChildrenInfo } from './pages/ChildrenInfo';
import { Vps } from './pages/Vps';
import { CustomThemeProvider } from './components/layouts/layout.jsx';
import { VpsInfo } from './pages/VpsInfo.jsx';

export default function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/children" replace />} />
          <Route path="/children" element={<Children />} />
          <Route path="/children/:id" element={<ChildrenInfo />} />
          <Route path="/VPS" element={<Vps />} />
          <Route path="/VPS/:id" element={<VpsInfo/>} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}