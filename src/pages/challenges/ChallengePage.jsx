import { getChallengeById } from '../../utils/appwrite/challengesTableOps.js';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";

const ChallengePage = () => {
    const params = useParams();
    // console.log(params);
    const { challengeId } = params;
    const [isChallengeLoading, setIsChallengeLoading] = useState(true);
    const [challenge, setChallenge] = useState(null);

    useEffect(() => {
        async function getChallenge() {
            const challenge = await getChallengeById(challengeId)
            setChallenge(challenge);
            setIsChallengeLoading(false);
        }
        getChallenge();
    }, [])


    if (isChallengeLoading) {
        return (
            <h1>Challenge with {challengeId} is Loading...</h1>
        )
    }

    return (
        <div>
            {JSON.stringify(challenge)}
        </div>
    )
}

export default ChallengePage