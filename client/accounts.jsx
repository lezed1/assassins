import React from 'react';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

export const SignUp = React.createClass({
    getInitialState(){
        return {name: "", id: "", error: ""};
    },
    handleNameChange(e) {
        this.setState({name: e.target.value})
    },
    handleIdChange(e) {
        this.setState({id: e.target.value})
    },
    handleSignup(e) {
        e.preventDefault();

        var name = this.state.name.trim();
        var id = this.state.id.trim();

        if (!name || !id) {
            return;
        }

        Meteor.call("user.signup", {name, id}, (error, res) => {
            if (error) {
                this.setState({error: <div className="callout small alert">{error.reason}</div>});
                return;
            }
            this.setState({error: ""});

            console.log(res);
            FlowRouter.go("signup-confirm");
        });
    },
    render() {
        return (
            <div>
                <div className="callout secondary">
                    <form onSubmit={this.handleSignup}>
                        {this.state.error}
                        <label>Name
                            <input type="text" placeholder="Name" required onChange={this.handleNameChange}/>
                        </label>
                        <label>NetID
                            <input type="text" placeholder="NetId" required onChange={this.handleIdChange}/>
                        </label>
                        <input type="submit" className="button" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
});

export class SignUpConfirm extends React.Component {
    render() {
        return (
            <div >
                <h1>Your account has been created!</h1>
                <p>
                    A verification email has been sent to your @cornell.edu email account. Please click the link in
                    the email to verify your account.
                    <div className="callout success">
                        You must verify your account before the start of the game to participate. If you do not verify
                        your account before the start of the game, you will not be able to play.
                    </div>
                    <a className="button" href="https://cmail.cornell.edu"> Go to your email now</a>
                </p>
            </div>
        )
    }
}
