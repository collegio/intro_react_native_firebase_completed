import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import * as firebase from 'firebase';
import { Header, Button, LoadingSpinner } from './common';
import LoginForm from './LoginForm';
import PlayersList from './PlayersList';
import configStore from '../store/configStore';

const store = configStore();

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: null
        }
    }

    componentDidMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyAKFlDsOcP68wsKXJzZ3wT2bq40TWKseG8",
            authDomain: "freeagenttracker-78258.firebaseapp.com",
            databaseURL: "https://freeagenttracker-78258.firebaseio.com",
            projectId: "freeagenttracker-78258",
            storageBucket: "freeagenttracker-78258.appspot.com",
            messagingSenderId: "749917128497"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({isLoggedIn: true});
            }
            else {
                this.setState({isLoggedIn: false});
            }
        });
    }

    renderLogin() {

        switch (this.state.isLoggedIn) {
            case true:
                return (
                    <Button 
                        onPress={() => firebase.auth().signOut()}
                    >
                        Logout
                    </Button>
                );

            case false:
                return <LoginForm />;

            default:
                return <LoadingSpinner />;

        }
    }

    render() {
        return (
            <Provider store={store}>
                <View>
                    <Header>Free Agent Tracker</Header>
                    <PlayersList />
                    {/* {this.renderLogin()} */}
                </View>
            </Provider>
        );
    }
}

export default App;
