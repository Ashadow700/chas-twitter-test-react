import React from "react";

class UsersComponent extends React.Component {

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

        const response = await this.props.sendPostRequest(
            "http://localhost:8080/followUser/post",
            JSON.stringify({
                username: this.props.loggedUsername,
                followedUsername: this.state.selectedUser
            })
        );
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

    render() {
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

export default UsersComponent;