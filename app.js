const repo = new ChallengeRepo();
const collection =  new Collection('.challenges', repo);

repo.readChallenge()
  .then(challenges => {
    collection.addChallenge(challenges);
  })
  .then(() => {
    collection.displayChallenges();
  })

const form = new challengeForm('.form', collection);