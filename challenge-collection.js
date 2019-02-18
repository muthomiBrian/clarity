class Collection {
  constructor(selector, repo) {
    this.container = document.querySelector(selector);
    this.challengeList = [];
    this.repo = repo;
  }

  toggleStrike(id) {
    const card = document.querySelector(`#${id}`);
    card.classList.toggle('strike');
    return this.repo.updateChallenge(id);
  }

  insertChallenge(challenge) {
    this.container.insertAdjacentHTML('afterbegin', 
    `<div id="${challenge.id}" class="card" onclick="collection.toggleStrike('${challenge.id}')">
    <p class="${challenge.strike ? 'strike': ''}">${challenge.challenge}</p>
  </div>`)
  }

  displayChallenges() {
    this.container.innerHTML = '';
    this.challengeList.forEach(challenge => {
      this.insertChallenge(challenge);
    })
  }

  addChallenge(challenge) {
    if (typeof challenge.length !== 'undefined') {
      challenge.forEach(chal => {
        this.challengeList.push(chal);
      })
      return; 
    }

    this.challengeList.push(challenge);
    this.insertChallenge(challenge);
  }
}