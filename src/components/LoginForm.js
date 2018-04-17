import React from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, LoadingSpinner } from './common';
import firebase from 'firebase';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.onButtonPress = this.onButtonPress.bind(this);
        this.loginSuccess = this.loginSuccess.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);

        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        };
    }

    renderButton() {
        if (this.state.loading) {
            return <LoadingSpinner size="small" />;
        }
        else {
            return <Button onPress={this.onButtonPress}>Log In</Button>;
        }
    }

    onButtonPress() {

        this.setState(() => ({
            error: '', 
            loading: true
        }));

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.loginSuccess()
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(() => {
                        this.loginSuccess()
                    })
                    .catch((err) => {
                        this.setState(() => ({ 
                            error: err.message,
                            loading: false
                        }))
                    })
            });
    }

    loginSuccess() {
        this.setState(() => ({
            error: '',
            email: '',
            password: '',
            loading: false
        }));
    }

    onEmailChange(email) {
        this.setState(() => ({
            email
        }));
    }

    render() {
        return (
            <Card>
                {this.state.error && <Text style={styles.errorText}>{this.state.error}</Text>}
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="test@user.com"
                        value={this.state.email}
                        onChangeText={this.onEmailChange}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        label="Password"
                        placeholder="pass1234"
                        isPassword
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                    />
                </CardSection>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorText: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#900'
    }
}

export default LoginForm;