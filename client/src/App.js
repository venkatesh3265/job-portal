import styled from "styled-components";
import { BrowserRouter, Routes,Route} from 'react-router-dom'
import { Dashboard,Landing,Register,Error } from "./pages";
import {Satistic,Profile,Alljob,AddJob,SharedLayOut} from './pages/dashboard'
import Protected from "./pages/Protected";
function App() {
  return (
  <BrowserRouter>
  
  <Routes>
     <Route  path="/" element={<Protected><SharedLayOut/></Protected> }>
      <Route index element={<Satistic/>} />
      <Route path="all-jobs" element={<Alljob/>} />
      <Route path="add-job" element={<AddJob/>} />
      <Route path="profile" element={<Profile/>} />

     </Route>
    <Route path="/register" element={<Register/>} />
    <Route path="/landing" element={ <Landing/>} />
    <Route path="*" element={<Error/>} />
   
  
  </Routes>

  </BrowserRouter>
  );
}

export default App;
