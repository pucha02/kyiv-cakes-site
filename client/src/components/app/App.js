import { MainPage } from "../atomic/pages/MainPage";
import { AdminPage } from "../atomic/pages/AdminPage/AdminPage";
import ClientLoginForm from "../atomic/organisms/ClientLoginForm/ClientLoginForm";
import { CreateOrderPage } from "../atomic/pages/CreateOrderPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../services/ProtectedRoute";

import './App.css'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<ClientLoginForm />} />
            <Route path="/kyivcakes" element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } />
            <Route path="/create-order" element={<CreateOrderPage />} />
            <Route path="/adminpage" element={<AdminPage />} />
          </Routes>
        </Router>

      </div>

    </div>
  );
}

export default App;
