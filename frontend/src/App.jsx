import Router from "./Router";
import Navbar from "./components/Navbar";
import SidebarLayout from "./layouts/SidebarLayout";

function App() {
  return (
    <div className="grid-rows-[10rem_auto] h-screen bg-alice-blue text-cactus lg:text-xl">
      <Navbar />
      <SidebarLayout className="flex bg-alice-blue flex-grow">
        <Router />
      </SidebarLayout>
    </div>
  );
}

export default App;
