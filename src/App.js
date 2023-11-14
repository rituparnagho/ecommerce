import './App.css';
import Header from './components/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <Header/>
     <Home/>
     <Footer/>
    </div>
  );
}

export default App;
