import React, { useState } from 'react'
import "./RequirementsForm.css"

const RequirementsForm = ({ criteria: defaultCriteriaState, onSubmit }) => {
    let [requirementData, setRequirementData] = useState(defaultCriteriaState)

    return (
        <form onSubmit={(evt) => submitForm(evt, onSubmit, requirementData)} className="requirementsForm">
            <label>
                <div>Minimum Number of Tournaments Entered:</div>
                <input
                    type="number"
                    value={requirementData.minTournaments}
                    onChange={e => setRequirementData({...requirementData, minTournaments: e.target.value })}
                />
            </label>
            <label>
                <div>Lowest Scoring Tournament:</div>
                <input
                    type="number"
                    value={requirementData.lowestScoringTournament}
                    onChange={e => setRequirementData({...requirementData, lowestScoringTournament: e.target.value })}
                />
            </label>
            <label>
                <div>Highest Scoring Tournament:</div>
                <input
                    type="number"
                    value={requirementData.highestScoringTournament}
                    onChange={e => setRequirementData({...requirementData, highestScoringTournament: e.target.value })}
                />
            </label>

            <input type="submit" value="Calculate" />
        </form>
    )
}

const submitForm = (evt, onSubmit, requirementData) => {
    evt.preventDefault()
    onSubmit(requirementData)
}

export default RequirementsForm;