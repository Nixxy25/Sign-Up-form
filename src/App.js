import { Routes, Route } from "react-router-dom";
import LoginForm from "./routes/signup/sign-up.component";
import SignIn from "./component/sign-in/sign-in.component";
import './App.css';

const App = () =>{
    return(
        <Routes>
            <Route path="/" element={<LoginForm />}/>
            <Route path="sign-in" element={<SignIn />}/>
        </Routes>
    )
}


export default App;