import { createStore, combineReducers } from 'redux';
import playersReducer from '../reducers/players';
import filtersReducer from '../reducers/filters';
import selectedPlayerReducer from '../reducers/selectedPlayer';

export default () => {
    const store = createStore(
        combineReducers({
            players: playersReducer,
            filters: filtersReducer,
            selectedPlayer: selectedPlayerReducer
        })
    );

    return store;
}