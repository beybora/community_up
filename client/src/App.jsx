import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./components/LogIn";
function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}


export default App;
