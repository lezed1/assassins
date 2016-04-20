import React from 'react';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

export class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {name: "", id: "", error: ""};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleIdChange(e) {
        this.setState({id: e.target.value})
    }

    handleSubmit(e) {
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
    }

    render() {
        return (
            <div>
                <div className="callout secondary">
                    <form onSubmit={this.handleSubmit}>
                        {this.state.error}
                        <div className="callout warning">eChalk ID refers to the part of your email before the "@". <br/> ([eChalk ID]@klschools.org)</div>
                        <div className="callout warning">To make this more clear, if my email is "jjay@klschools.org", I would type "jjay" into the eChalk ID box.</div>
                        <label>Name
                            <input type="text" placeholder="John Jay" required onChange={this.handleNameChange}/>
                        </label>
                        <label>eChalk ID
                            <input type="text" placeholder="jjay" required onChange={this.handleIdChange}/>
                        </label>
                        <input type="submit" className="button" value="Submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export class SignUpConfirm extends React.Component {
    render() {
        return (
            <div >
                <h1>Your account has been created!</h1>
                <p>
                    A verification email has been sent to your @klschools.org email account. Please click the link in
                    the email to verify your account.
                    <div className="callout success">
                        You must verify your account before the start of the game to participate. If you do not verify
                        your account before the start of the game, you will not be able to play.
                    </div>
                    <a className="button" href="http://webmail.klschools.org/"> Go to your email now</a>
                </p>
            </div>
        )
    }
}
