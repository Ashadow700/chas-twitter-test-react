import React, {Component} from 'react';
import './LoginPage.css';
import '../App.css';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {userName: "", password: ""};
        this.state = {isLoginOpen: true, isRegisterOpen: false};
    }
    setUserName(changeEvent) {
        this.setState({userName: changeEvent.target.value});
    }

    setPassword(changeEvent) {
        this.setState({password: changeEvent.target.value});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }

    showLoginBox() {
        this.setState({isRegisterOpen: false, isLoginOpen: true});
    }

    render() {
        return (
            <div className="Login-box">
                <div className="Inner-Container">
                    <div className="Tabs">
                        <button className="Tab" onClick={() => this.showLoginBox()}>
                            Login
                        </button>
                        <button className="Tab" onClick={this.showRegisterBox.bind(this)}>
                            Register
                        </button>
                    </div>
                    {this.state.isRegisterOpen && <Register/>}
                    {this.state.isLoginOpen && <Login logIn={this.props.logIn}/>}
                </div>
            </div>
        );
    }
}

class Login extends LoginPage {

    constructor(props) {
        super(props);
    }
    render(props) {

        return (
            <div className="Items">
                <form>
                    <input type="text" placeholder="Username" onChange={ (changeEvent) => super.setUserName(changeEvent)}/>
                </form>
                <form>
                    <input type="password" placeholder="Password" onChange={super.setPassword.bind(this)}/>
                </form>
                <button className="Button" onClick={() => this.props.logIn(this.state.userName, this.state.password)}>
                    Login
                </button>
            </div>
        );
    }
}

class Register extends LoginPage {

    constructor(props) {
        super(props);
        this.state = {
            registerUsername: "",
            registerPassword: "",
            registerEmail: ""
        }
    }

    setUserName(changeEvent) {
        this.setState({registerUsername: changeEvent.target.value})
    }

    setPassword(changeEvent) {
        this.setState({registerPassword: changeEvent.target.value})
    }

    setEmail(changeEvent) {
        this.setState({registerEmail: changeEvent.target.value})
    }

    async registerUser() {
        console.log("registering user");
        const response = await fetch("http://localhost:8080/user/post", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    username: this.state.registerUsername,
                    password: this.state.registerPassword,
                    email: this.state.registerEmail
                })
            })

        console.log(response.status);
        if (response.status == 201) {
            alert("User " + this.state.registerUsername + " was registered");
        } else {
            alert("Failed to register user");
        }
    }

    render() {
        return(
            <div className="Items">
                <form>
                    <input type="text" placeholder="Username" onChange={this.setUserName.bind(this)}/>
                </form>
                <form>
                    <input type="password" placeholder="Password" onChange={this.setPassword.bind(this)}/>
                </form>
                <form>
                    <input type="text" placeholder="Email" onChange={this.setEmail.bind(this)}/>
                </form>
                <button className="Button" onClick={this.registerUser.bind(this)}>
                    Register
                </button>
            </div>
        );
    }
}

export default LoginPage;