export const calculatePlayersFromCriteria = (criteria) => {
    const tournaments = importTournamentsData()

    const allPlayerResults = mapAllTournamentsResults(tournaments);

    const playersThatMeetCriteria = allPlayerResults.filter(player => 
            player.numTournamentsEntered >= criteria.minTournaments
        && player.lowestScoringTournament <= criteria.lowestScoringTournament
        && player.highestScoringTournament <= criteria.highestScoringTournament
    );

    /*
        sort by:
            - highest scoring tournaments first
            - then highest number of entered tournaments
            - then tag (ASC)
    */
    playersThatMeetCriteria.sort((a, b) => 
        b.highestScoringTournament - a.highestScoringTournament
        || b.numTournamentsEntered - a.numTournamentsEntered
        || a.tag.localeCompare(b.tag)
    )

    return playersThatMeetCriteria;
}

const importTournamentsData = () => {
    const context = require.context('../../scraped_results', false, /.json$/);
    const tournaments = context.keys().map((key) => {
        const fileName = key.replace('./', '');
        const tournament = require(`../../scraped_results/${fileName}`);

        return mapTournamentResults(tournament)
    })

    return tournaments;
}

const mapTournamentResults = (tournament) => {
    const matches = JSON.parse(JSON.stringify(tournament));

    const players = matches.reduce((acc, match) => {
        const realLoserName = getPlayerNameOnly(match.loser)
        const realWinnerName = getPlayerNameOnly(match.winner)

        const loserObj = acc[realLoserName]
        const winnerObj = acc[realWinnerName]

        if(!loserObj) {
            acc[realLoserName] = { wins: 0, losses: 1 }
        } else {
            acc[realLoserName] = { ...loserObj, losses: loserObj.losses + 1}
        }

        if(!winnerObj) {
            acc[realWinnerName] = { wins: 1, losses: 0 }
        } else {
            acc[realWinnerName] = { ...winnerObj, wins: winnerObj.wins + 1}
        }


        return acc;
    }, {})

    return {
        matches,
        players
    }
}

const getPlayerNameOnly = (playerName) => playerName.split(' | ').pop();

const playerResultsEmptyState = {
    tournamentResults: [],
    numTournamentsEntered: 0,
    lowestScoringTournament: Infinity,
    highestScoringTournament: -1
}

const mapAllTournamentsResults = (tournaments) => {
    const players = tournaments.reduce((acc, tournament) => {
        const { players } = tournament;

        Object.entries(players).forEach(([playerTag, playerTourneyResults]) => {
            const overallPlayerResults = acc[playerTag] || playerResultsEmptyState;

            acc = { 
                ...acc,
                [playerTag]:
                    {
                        tournamentResults: [
                            ...overallPlayerResults.tournamentResults,
                            playerTourneyResults
                        ],
                        numTournamentsEntered: overallPlayerResults.numTournamentsEntered + 1,
                        lowestScoringTournament: Math.min(overallPlayerResults.lowestScoringTournament, playerTourneyResults.wins),
                        highestScoringTournament: Math.max(overallPlayerResults.highestScoringTournament, playerTourneyResults.wins)
                    }
            }
        })

        return acc;
    }, {})

    return Object.entries(players).map(([tag, results]) => ({ tag, ...results }));
}