const selectedDefaultState = {
    id: 2
};

export default (state = selectedDefaultState, action) => {
    switch (action.type) {
        case 'SELECT_PLAYER':
            if (action.player_id == state.id) {
                return {
                    id: 0
                };
            }

            return {
                id: action.player_id
            };

        default:
            return state;
    }
};