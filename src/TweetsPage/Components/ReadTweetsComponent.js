import React from "react";

class ReadTweetsComponent extends React.Component {

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

    render() {
        return (
            <div className="Items">
                <div className="List">
                    {this.state.tweets.map( tweet =>
                        <div className="ListedItem">
                            <div>From user: {tweet.username}</div>
                            <div>Tweet: {tweet.tweet}</div>
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

export default ReadTweetsComponent;