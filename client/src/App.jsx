import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
