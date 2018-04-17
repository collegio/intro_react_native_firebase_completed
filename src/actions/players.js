import uuid from 'uuid';

export const addPlayer = ({ name, message = '', sport_type = 'hockey', skill_level = 'basic', gender = 'Male' } = {}) => ({
    type: 'ADD_PLAYER',
    player: {
        id: uuid(),
        name,
        sport_type,
        gender,
        skill_level,
        message
    }
})
  
export const removePlayer = ({ id } = {}) => ({
    type: 'REMOVE_PLAYER',
    id
});

export const editPlayer = (id, updates) => ({
    type: 'EDIT_PLAYER',
    id,
    updates
});