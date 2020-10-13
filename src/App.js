import React, {useState} from "react";
import logo from './logo.svg';
import LoginApp from "./components/jwtlogin/LoginApp";
import './App.css'

const App = () => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('/api/hello')
            .then(response => response.text())
            .then(message => {
                setMessage(message);
            });
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">{message}</h1>
            </header>
            <LoginApp />
        </div>
    )
}

export default App;