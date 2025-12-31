import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { APPWRITE_CHALLENGES_TABLE_ID } from '@/src/utils/appwrite/constants';
import { createChallenge } from '../../utils/appwrite/challengesTableOps.js';

const Challenges = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("TECH");
  const [level, setLevel] = useState("INTERMEDIATE");
  const [duration, setDuration] = useState("21");


  async function handleChallengeFormSubmission(event) {
    event.preventDefault();
    const newChallenge = {
      title, description, domain, level, duration: Number(duration)
    }
    const result = await createChallenge(newChallenge)
    console.log("Appwrite challenge record: ", result);
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <form onSubmit={handleChallengeFormSubmission}>
        <div className="flex flex-col items-start">
          <label htmlFor="title">Enter challenge title</label>
          <input value={title} onChange={(event) => setTitle(event.target.value)} id="title" placeholder='e.g., #50DaysOfVibeCoding' type="text" required />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="description">Enter challenge description</label>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} id="description" placeholder='e.g., This challenge is best for non-coding people...' required />
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="duration">Enter Duration of Challenge</label>
          <select value={duration} onChange={(event) => setDuration(event.target.value)} id="duration">
            <option value="21">#21 Days</option>
            <option value="50">#50 Days</option>
            <option value="100">#100 Days</option>
          </select>
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="level">Enter Level of Challenge</label>
          <select value={level} onChange={(event) => setLevel(event.target.value)} id="level">
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div className="flex flex-col items-start">
          <label htmlFor="domain">Enter Domain of Challenge</label>
          <select value={domain} onChange={(event) => setDomain(event.target.value)} id="domain">
            <option value="TECH">TECH</option>
            <option value="DESIGN">DESIGN</option>
            <option value="SALES">SALES</option>
            <option value="MARKETING">MARKETING</option>
            <option value="MEDIA">MEDIA</option>
          </select>
        </div>

        <Button type="submit">Create Challenge</Button>

      </form>
    </div>
  )
}

export default Challenges