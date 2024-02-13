import "./App.css";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import Authentication from "./pages/Authentication";
import CommunitiesPage from "./pages/CommunitiesPage";
import Protected from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<Protected />}>
            <Route path="community/:id" element={<ChatPage />} />
            <Route path="" element={<CommunitiesPage />} />
            <Route path="*" element={<CommunitiesPage/>} />
          </Route>
          <Route path="/login" element={<Authentication />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
