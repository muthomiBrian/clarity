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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => {
        console.log('Service worker registration successful.')
      }, err => {
        console.log('Service worker registration failed.')
      })
  })
}