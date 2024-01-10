
import { BrowserRouter } from 'react-router-dom';
import Home from './components/home/home';
import './index.css';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
   <BrowserRouter>
   <Home/>
    <ToastContainer/>
   </BrowserRouter>
  );
}

export default App;
