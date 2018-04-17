import React from 'react';
import { FlatList } from 'react-native';
import axios from 'axios';
import PlayersListItem from './PlayersListItem';

class PlayersList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            players: []
        };
    }

    componentDidMount() {
        axios.get('http://206.189.20.69')
            .then((response) => {
                this.setState(() => ({
                    players: response.data.players
                }));
            });
    }

    render() {
        return (
            <FlatList
                data={this.state.players}
                renderItem={(player) => <PlayersListItem player={player.item} key={player.item.id} />}
            />
        );
    }
}

export default PlayersList;
