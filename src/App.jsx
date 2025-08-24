import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import Children from './pages/Children';
import { ChildrenInfo } from './pages/ChildrenInfo';
import { Vps } from './pages/Vps';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/children" replace />} />
          <Route path="/children" element={<Children />} />
          <Route path="/children/:id" element={<ChildrenInfo />} />
          <Route path="/VPS" element={<Vps />} />
        </Routes>
      </Router>
  );
}

export default App;
