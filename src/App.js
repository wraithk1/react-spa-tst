import './App.css';
import { Routes, Route} from 'react-router'
import Header from './components/header';
import Home from './pages/home';
import Basket from './pages/basket';
import NotFound from './pages/404'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      {/*  header  */}
      <Header />

      {/*  main  */}
      <main className='max-w-6xl mx-auto min-h-screen mt-16'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/basket' element={<Basket />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
