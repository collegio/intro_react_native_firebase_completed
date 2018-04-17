import React from 'react';
import { Text, View, Image, Linking, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { selectPlayer } from '../actions/selectedPlayer';

class PlayersListItem extends React.Component {

    constructor(props) {
        super(props);

        this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
        this.updateSelectedPlayer = this.updateSelectedPlayer.bind(this);
    }

    componentDidUpdate() {
        LayoutAnimation.spring();
    }
    
    renderPlayerInfo() {
        if (this.props.expanded) {
            return (
                <View>
                    <CardSection>
                        <Text style={styles.messageText}>{this.props.player.message}</Text>
                    </CardSection>

                    <CardSection>
                        <Button onPress={() => { Linking.openURL('http://www.tsn.ca/'); }}>Email!</Button>
                    </CardSection>
                </View>
            );
        }
    }

    updateSelectedPlayer() {
        this.props.selectPlayer(this.props.player.id);
    }

    render() {
        const { thumbnail, thumbnailContainer, headerText, header } = styles;
        const { thumbnail_image, name, sport_type, skill_level } = this.props.player;
        return (
            <Card>
                <TouchableWithoutFeedback
                    onPress={this.updateSelectedPlayer}
                >
                    <View>
                        <CardSection>
                            <View style={thumbnailContainer}>
                                <Image
                                    style={thumbnail}
                                    source={{
                                        uri: thumbnail_image
                                    }}
                                />
                            </View>
                            <View style={header}>
                                <Text style={headerText}>{name} - {sport_type}</Text>
                                <Text>{skill_level}</Text>
                            </View>
                        </CardSection>
                    </View>
                </TouchableWithoutFeedback>

                {this.renderPlayerInfo()}
            </Card>
        );
    }
};

const styles = {
    thumbnail: {
        width: 50,
        height: 50
    },
    thumbnailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 18
    },
    messageText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 24,
        padding: 50
    }
};

const mapStateToProps = (state, props) => {

    const expanded = state.selectedPlayer.id == props.player.id;

    return {
        expanded
    };
}

export default connect(mapStateToProps, { selectPlayer })(PlayersListItem);
