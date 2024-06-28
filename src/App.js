// import './App.css';
import SudokuGrid from './Sudoku';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <ToastContainer />
      <SudokuGrid />
    </>
  );
}

export default App;
