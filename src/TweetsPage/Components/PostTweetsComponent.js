import React from "react";

class PostTweetsComponent extends React.Component {

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

        const response = await this.props.sendPostRequest(
            "http://localhost:8080/tweet/post",
            JSON.stringify({
                username: this.state.loggedUsername,
                tweet: this.state.tweet,
            })
        );
        if (response.status == 201) {
            alert("Tweet was posted");
        } else {
            alert("Failed to post tweet");
        }
    }

    render() {
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

export default PostTweetsComponent;