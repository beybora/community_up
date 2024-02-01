import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Authentication/>} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
