import { useState } from 'react'
import RequirementsForm from './RequirementsForm'
import PlayerArea from './PlayerArea'
import CSVDownloaderButton from './CSVDownloaderButton';

import { calculatePlayersFromCriteria } from './calculationUtils'

import './App.css';

const defaultCriteriaState = {
  minTournaments: 3,
  lowestScoringTournament: 0,
  highestScoringTournament: 2
}

const App = () => {
  const [criteria, setCriteria] = useState(defaultCriteriaState)
  const [playerList, setPlayerList] = useState(null)

  return (
    <div className="App">
        <RequirementsForm criteria={criteria} onSubmit={(c) => onRequirementsFormSubmit(c, setCriteria, setPlayerList)} />
        <span>
        {
          playerList && (
            <CSVDownloaderButton players={playerList} />
          )
        }
        </span>
        <PlayerArea players={playerList} />
    </div>
  );
}

const onRequirementsFormSubmit = (criteria, setCriteria, setPlayerList) => {
  const players = calculatePlayersFromCriteria(criteria);
  setCriteria(criteria);
  setPlayerList(players);
}

export default App;
