import React from 'react'
import './PlayerArea.css'

const PlayerArea = ({ players }) => {
    return (
        <div className="playerArea">
            {
                players
                    ? renderPlayerArea(players)
                    : <div> Click "Calculate" to start! </div>
            }

        </div>
    )
}

const renderPlayerArea = (players) => {
    return (
        <ul className="playerList">
            {
                players.map(renderPlayer)
            }
        </ul>
    )
}

const renderPlayer = (playerInfo) => {
    return (
        <li key={playerInfo.tag}>{playerInfo.tag}</li>
    )
}

export default PlayerArea;