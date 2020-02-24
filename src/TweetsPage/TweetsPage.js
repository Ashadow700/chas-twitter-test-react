import React from "react";

import './Tweets.css';
import '../App.css';

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
        this.setState({isPostTweetsTabOpen: true})
    }

    showReadTweetsTab() {
        this.resetTabs();
        this.setState({isReadTweetsTabOpen: true})
    }

    showUsersTab() {
        this.resetTabs();
        this.setState({isUserTabOpen: true})
    }

    resetTabs() {
        this.setState({isPostTweetsTabOpen: false, isReadTweetsTabOpen: false, isUserTabOpen: false})
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

                    {this.state.isPostTweetsTabOpen && <PostTweets loggedUsername={this.state.loggedUsername}/>}
                    {this.state.isReadTweetsTabOpen && <ReadTweets loggedUsername={this.state.loggedUsername}/>}
                    {this.state.isUserTabOpen && <Users loggedUsername={this.state.loggedUsername}/>}
                </div>
            </div>
        )
    }
}
class PostTweets extends TweetsPage {

    constructor(props) {
        super(props);
        this.state = {
            tweet: "",
            loggedUsername : this.props.loggedUsername
        }
    }

    setTweet(changeEvent) {
        this.setState({tweet: changeEvent.target.value})
    }

    async postTweet() {
        console.log("Posting tweet");
        const response = await fetch("http://localhost:8080/tweet/post", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.loggedUsername,
                tweet: this.state.tweet,
            })
        })

        if (response.status == 201) {
            alert("Tweet was posted");
        } else {
            alert("Failed to post tweet");
        }
    }

    render(props) {
        return (
            <div className="Items">
                <textarea className="Write-tweet-field" placeholder="Write Tweet" onChange={this.setTweet.bind(this)}>
                </textarea>
                <button className="Button" onClick={this.postTweet.bind(this)}>
                    Post Tweet
                </button>
            </div>
        );
    }
}

class ReadTweets extends TweetsPage {

    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        };
    }

    async componentDidMount() {
        await this.fetchMyTweets();
    }

    async fetchMyTweets() {
        const url = "http://localhost:8080/tweet/get/" + this.props.loggedUsername;
        await this.fetchTweets(url);
    }

    async fetchFollowUsersTweets() {
        const url = "http://localhost:8080/tweet/get/FollowedUsersTweets/" + this.props.loggedUsername;
        await this.fetchTweets(url);
    }

    async fetchTweets(url) {
        const response = await fetch(url);
        const data = await response.json();
        this.setState({tweets: data});
    }

    render(props) {
        return (
            <div className="Items">
                <div className="List">
                    {this.state.tweets.map( tweet =>
                        <div className="ListedItem">
                            <div> From user: {tweet.username}</div>
                            <div> Tweet: {tweet.tweet}</div>
                        </div>
                    )}
                </div>
                <button className="Button" onClick={() => this.fetchMyTweets()}>
                    My Tweets
                </button>
                <button className="Button" onClick={() => this.fetchFollowUsersTweets()}>
                    Followed Users Tweets
                </button>
            </div>
        );
    }
}

class Users extends TweetsPage {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedUser: ""
        };
    }

    selectUser(username) {
        this.setState({selectedUser: username});
    }

    async componentDidMount() {
        await this.fetchAllUserData();
    }

    async fetchAllUserData() {
        const url = "http://localhost:8080/user/get/all";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({users: data});
    }

    async followUser() {
        console.log(this.props.loggedUsername + " is trying to follow " + this.state.selectedUser);

        const response = await fetch("http://localhost:8080/followUser/post", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.loggedUsername,
                followedUsername: this.state.selectedUser,
            })
        })

        if (response.status == 201) {
            alert(this.props.loggedUsername + " followed user " + this.state.selectedUser);
        } else {
            alert("Failed to follow user");
        }
    }

    async unFollowUser() {
        console.log(this.props.loggedUsername + " is trying to unfollow " + this.state.selectedUser);

        const response = await fetch("http://localhost:8080/followUser/delete", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.props.loggedUsername,
                followedUsername: this.state.selectedUser,
            })
        })

        if (response.status == 200) {
            alert(this.props.loggedUsername + " unfollowed user " + this.state.selectedUser);
        } else {
            alert("Failed to unfollow user");
        }
    }


    render(props) {
        return (
            <div className="Items">
                <div className="List">
                    {this.state.users.map( user =>
                            <div className="ListedItem" key={user.username}>
                                {!(this.state.selectedUser == user.username) &&
                                <div onClick={() => this.selectUser(user.username)}>
                                    {user.username}
                                </div>
                                }
                                {this.state.selectedUser == user.username &&
                                <div className="Selected-user">
                                    {user.username}
                                </div>
                                }
                            </div>
                    )}
                </div>
                <button className="Button" onClick={this.followUser.bind(this)}>
                    Follow User
                </button>
                <button className="Button" onClick={this.unFollowUser.bind(this)}>
                    UnFollow User
                </button>
            </div>
        );
    }
}

export default TweetsPage;