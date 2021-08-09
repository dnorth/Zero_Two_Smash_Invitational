import { CSVLink } from "react-csv";

import './CSVDownloaderButton.css'

const CSVDownloaderButton = ({ players }) => {
    const headers = [
        { label: 'Tag', key: 'tag' },
        { label: 'Number of tournaments entered', key: 'numTournamentsEntered'},
        { label: 'Lowest scoring tournament', key: 'lowestScoringTournamentString' },
        { label: 'Highest scoring tournament', key: 'highestScoringTournamentString' },
    ]

    return (
        <CSVLink data={players} headers={headers} className="csvDownloaderButton" target="_blank">
            Download list as CSV
        </CSVLink>
    )
}

export default CSVDownloaderButton;