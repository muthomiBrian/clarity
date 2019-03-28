class Challenge {
  constructor(challenge) {
    this.challenge = challenge;
    this.strike = false;
    this.id = this.getId();
    this.submit();
  }

  submit() {
    const challenge = {
      challenge: this.challenge,
      strike: this.strike,
      id: this.id
    }
    return new ChallengeRepo().createChallenge(challenge);
  }

  toggleStrike() {
    this.strike =  this.strike ? false: true;
  }

  getId() {
    const challengePre = this.challenge.replace(/ /g, '').slice(0,5).replace(/[&<>'"]/g, '');
    const challengePost = Date.now();

    return challengePre + challengePost;
  }

  show() {

  }
}