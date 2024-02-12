import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Authentication from "./pages/Authentication";
import CommunitiesPage from "./pages/CommunitiesPage";


function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/community/:id" element={<ChatPage />} />
          <Route path="/" element={<Authentication />} />
          <Route path="/communities" element={<CommunitiesPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
