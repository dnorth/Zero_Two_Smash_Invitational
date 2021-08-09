import promisify from 'cypress-promise'

describe('Scraping site', () => {
    it('scrapes tournament results from braacket link', async () => {
        cy.visit('https://braacket.com/tournament/54C7F922-559E-45FC-8D9A-0EBF9A78FCC6/stage/EBB1753C-80C8-40E4-A448-26D942DEE881?')

        const tourneyNameArr = await promisify(getValuesFromTable('.content_header-body a.text-bold'))
        const tournamentName = tourneyNameArr[0].replaceAll('/', '|')
        console.log('name: ', tournamentName)

        const losers = await promisify(getValuesFromTable('.tournament_encounter_opponent.loser'))
        const losersScores = await promisify(getValuesFromTable('.tournament_encounter-score.loser'))

        const winners = await promisify(getValuesFromTable('.tournament_encounter_opponent.winner'))
        const winnersScores = await promisify(getValuesFromTable('.tournament_encounter-score.winner'))

        let tournament = losers.map((_, index) => {
            return {
                loser: losers[index],
                loserScore: losersScores[index],
                winner: winners[index],
                winnersScore: winnersScores[index]
            }
        })

        cy.writeFile(`./scraped_results/${tournamentName}.json`, tournament)
        console.log('Done.')
    })
})

const getValuesFromTable = async (thingClass) => {
    return new Cypress.Promise((resolve, reject) => {
        cy.get(thingClass)
        .invoke('text')
        .then(losers => {
            const losersArr = losers.replace(/\t/g, '').split(/\n/).filter(s => s);
            resolve(losersArr)
        })
    })
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })