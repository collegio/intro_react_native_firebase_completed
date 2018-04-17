// Get visible players

export default (players, { text, sport_type, skill_level, sort_by }) => {
    return players.filter((player) => {

        // match the text search
        const textNameMatch = player.name.toLowerCase().includes(text.toLowerCase());
        const textMessageMatch = player.message.toLowerCase().includes(text.toLowerCase());

        // match the sport type
        let typeMatch = false;
        if (sport_type == 'all' || sport_type == player.sport_type) {
            typeMatch = true;
        }

        // match the skill level
        let skillMatch = false;
        if (skill_level == 'all' || skill_level == player.skill_level) {
            skillMatch = true;
        }

        return (textNameMatch || textMessageMatch) && typeMatch && skillMatch;

    }).sort((a, b) => {

        if (sort_by === 'name') {
            return a.name > b.name ? 1 : -1;
        } else if (sort_by === 'skill_level') {
            return a.skill_level > b.skill_level ? 1 : -1;
        }
    });
};