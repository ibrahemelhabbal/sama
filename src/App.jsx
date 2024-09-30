import { Route, Routes } from 'react-router-dom';
import Homepage from './routes/homepage/Homepage';
import SerDetail from './routes/serdetail/SerDetail';
import ProDetail from './routes/projectdetail/ProDetail';
import './index.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/services/:id" element={<SerDetail />} />
      <Route path="/projects/:id" element={<ProDetail />} />
    </Routes>
  );
}

export default App;
