import React, { useState } from 'react'
import "./RequirementsForm.css"

const RequirementsForm = ({ criteria: defaultCriteriaState, onSubmit }) => {
    let [requirementData, setRequirementData] = useState(defaultCriteriaState)

    return (
        <form onSubmit={(evt) => submitForm(evt, onSubmit, requirementData)} className="requirementsForm">
            <label className="formLabel">
                <div>Minimum Number of Tournaments Entered:</div>
                <input
                    className="scoreInput scoreEnding"
                    type="number"
                    value={requirementData.minTournaments}
                    onChange={e => setRequirementData({...requirementData, minTournaments: e.target.value })}
                />
            </label>
            <label className="formLabel">
                <div>Minimum Score:</div>
                <input
                    className="scoreInput scoreEnding"
                    type="number"
                    value={requirementData.lowestScoringTournament}
                    onChange={e => setRequirementData({...requirementData, lowestScoringTournament: e.target.value })}
                />
                <div className="scoreEnding"> - 2</div>
            </label>
            <label className="formLabel">
                <div>Maximum Score:</div>
                <input
                    className="scoreInput scoreEnding"
                    type="number"
                    value={requirementData.highestScoringTournament}
                    onChange={e => setRequirementData({...requirementData, highestScoringTournament: e.target.value })}
                />
                <div className="scoreEnding"> - 2</div>
            </label>

            <label className="formLabel">
                <input type="submit" value="Calculate" />
            </label>
        </form>
    )
}

const submitForm = (evt, onSubmit, requirementData) => {
    evt.preventDefault()
    onSubmit(requirementData)
}

export default RequirementsForm;