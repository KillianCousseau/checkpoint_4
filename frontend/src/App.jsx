import Router from "./Router";
import Navbar from "./components/Navbar";
import SidebarLayout from "./layouts/SidebarLayout";

function App() {
  return (
    <div className="grid-rows-[10%_90%] h-screen bg-alice-blue text-cactus lg:text-xl">
      <Navbar />
      <SidebarLayout className="flex bg-alice-blue flex-grow">
        <Router />
      </SidebarLayout>
    </div>
  );
}

export default App;
