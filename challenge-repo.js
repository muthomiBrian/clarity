class ChallengeRepo {
  constructor() {
    this.db = idb.openDb('challenge-store', 1, upgradeDB => {
      upgradeDB.createObjectStore('challenges', {keyPath: 'id'});
    })
  }

  createChallenge (challenge) {
    return this.db
      .then(db => {
        if (!db) return;
        return db
          .transaction('challenges', 'readwrite')
          .objectStore('challenges')
          .put(challenge);
      })
  }

  readChallenge () {
    return this.db
      .then(db => {
        if (!db) return;
        return db
          .transaction('challenges')
          .objectStore('challenges')
          .getAll();
      })
  }
  
  readSingleChallege(id) {
    return this.db
      .then(db => {
        if (!db) return;
        return db
          .transaction('challenges')
          .objectStore('challenges')
          .get(id)
      })
  }

  updateChallenge (id) {
    return this.readSingleChallege(id)
      .then(challenge => {
        const chal = JSON.parse(JSON.stringify(challenge))
        chal.strike = challenge.strike ? false : true;
        return this.createChallenge(chal);
      })
  }
}