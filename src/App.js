import React, {Component} from 'react';
import './App.css';
import LoginPage from "./LoginPage/LoginPage";
import TweetsPage from "./TweetsPage/TweetsPage";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            loggedUsername: ""
        };
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
        this.sendPostRequest = this.sendPostRequest.bind(this);
    }

    async logIn(username, password) {
        console.log("Attempting to login with username " + username);
        const url = "http://localhost:8080/login?username=" + username + "&password=" + password;
        const response = await fetch(url);
        const data = await response.text().valueOf();

        if (data == "Logged In") {
            this.setState({loggedUsername: username});
            this.setState({isLoggedIn: true});
        } else {
            alert("Failed to log in");
        }
    }

    logOut() {
        alert(this.state.loggedUsername + " logged out");
        this.setState({loggedUsername: ""});
        this.setState({isLoggedIn: false});
    }

    async sendPostRequest(url, jsonBody) {
        console.log("Sending POST request to " + url + " with jsonBody " + jsonBody);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: jsonBody
        })
        return response;
    }

    render() {
        return (
            <div className="Main-container">
                {!this.state.isLoggedIn && <LoginPage logIn={this.logIn} sendPostRequest={this.sendPostRequest}/>}
                {this.state.isLoggedIn && <TweetsPage loggedUsername={this.state.loggedUsername} logOut={this.logOut} sendPostRequest={this.sendPostRequest}/>}
            </div>
        );
    }
}

export default App;
