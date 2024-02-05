import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/LogIn";
import ChatPage from "./pages/ChatPage";
import Authentication from "./pages/Authentication";
import Communities from "./components/Communities";
import CommunitesPage from "./pages/CommunitiesPage";


function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/community/:id" element={<ChatPage />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/communities" element={<CommunitesPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
