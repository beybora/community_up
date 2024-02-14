import "./App.css";
import { Routes, Route } from "react-router-dom";
import GroupsPage from "./pages/GroupsPage";
import Authentication from "./pages/Authentication";
import CommunitiesPage from "./pages/CommunitiesPage";
import Protected from "./components/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Protected />}>
            <Route path="community/:id" element={<GroupsPage />} />
            <Route path="" element={<CommunitiesPage />} />
            <Route path="*" element={<CommunitiesPage />} />
          </Route>
          <Route path="/login" element={<Authentication />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
