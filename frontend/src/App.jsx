import Router from "./Router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="h-screen w-screen bg-alice-blue text-cactus lg:text-xl">
      <Navbar />
      <div className="flex flex-col h-[90%]">
        <Router />
      </div>
    </div>
  );
}

export default App;
