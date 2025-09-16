import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConsignorForm from './components/Consignor/ConsignorForm';
import ConsignorList from './components/Consignor/ConsignorList';
import ConsigneeForm from './components/Consignee/ConsigneeForm';
import ConsigneeList from './components/Consignee/ConsigneeList';
import TruckForm from './components/Truck/TruckForm';
import TruckList from './components/Truck/TruckList';
import AgentForm from './components/Agent/AgentForm';
import AgentList from './components/Agent/AgentList';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-section">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/consignors" element={<ConsignorForm />} />
              <Route path="/consignors/list" element={<ConsignorList />} />
              <Route path="/consignees" element={<ConsigneeForm />} />
              <Route path="/consignees/list" element={<ConsigneeList />} />
              <Route path="/trucks" element={<TruckForm />} />
              <Route path="/trucks/list" element={<TruckList />} />
              <Route path="/agents" element={<AgentForm />} />
              <Route path="/agents/list" element={<AgentList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
