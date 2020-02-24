import React from "react";
import './Tweets.css';
import '../App.css';
import PostTweetsComponent from "./Components/PostTweetsComponent";
import UsersComponent from "./Components/UsersComponent";
import ReadTweetsComponent from "./Components/ReadTweetsComponent";

class TweetsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedUsername : this.props.loggedUsername,
            isPostTweetsTabOpen: true,
            isReadTweetsTabOpen: false,
            isUserTabOpen: false,
        };
    }

    showPostTweetsTab() {
        this.resetTabs();
        this.setState({isPostTweetsTabOpen: true});
    }

    showReadTweetsTab() {
        this.resetTabs();
        this.setState({isReadTweetsTabOpen: true});
    }

    showUsersTab() {
        this.resetTabs();
        this.setState({isUserTabOpen: true});
    }

    resetTabs() {
        this.setState({isPostTweetsTabOpen: false, isReadTweetsTabOpen: false, isUserTabOpen: false});
    }

    render() {
        return(
            <div className="Tweets-box">
                <div className="Inner-Container">
                    <div className="Tabs">
                        <button className="Tab" onClick={() => this.showPostTweetsTab()}>
                            Post Tweet
                        </button>
                        <button className="Tab" onClick={this.showReadTweetsTab.bind(this)}>
                            Read Tweet
                        </button>
                        <button className="Tab" onClick={this.showUsersTab.bind(this)}>
                            View Users
                        </button>
                        <button className="Tab" onClick={this.props.logOut.bind(this)}>
                            Logout
                        </button>
                    </div>

                    {this.state.isPostTweetsTabOpen && <PostTweetsComponent loggedUsername={this.state.loggedUsername} sendPostRequest={this.props.sendPostRequest}/>}
                    {this.state.isReadTweetsTabOpen && <ReadTweetsComponent loggedUsername={this.state.loggedUsername}/>}
                    {this.state.isUserTabOpen && <UsersComponent loggedUsername={this.state.loggedUsername} sendPostRequest={this.props.sendPostRequest}/>}
                </div>
            </div>
        )
    }
}

export default TweetsPage;