import "./assets/styles/App.css";
import Content from "./components/content";
import Footer from "./components/footer";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
