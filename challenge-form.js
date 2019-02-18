class challengeForm {
  constructor(selector, collection) {
    this.form = document.querySelector(selector);
    this.repo = new ChallengeRepo();
    this.collection = collection;
  }

  async submit(event) {
    event.preventDefault();
    const newChallenge = await new Challenge(this.form.challenge.value)
    this.form.reset();
    this.collection.addChallenge(newChallenge);
  }
}