const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /login', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/login')
      .expect(200, done);
  });
});

describe('GET /signup', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/signup')
      .expect(200, done);
  });
});

describe('GET /api', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});

describe('GET /contact', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/contact')
      .expect(200, done);
  });
});


describe('GET /add-drone', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/add-drone')
      .expect(302, done);
  });
});

describe('GET /missionsemail', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/missionsemail')
      .expect(302, done);
  });
});


describe('GET /acceptedmissions', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/acceptedmissions')
      .expect(302, done);
  });
});


describe('GET /finishedmissions', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/finishedmissions')
      .expect(302, done);
  });
});


describe('GET /operatormissions', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/operatormissions')
      .expect(302, done);
  });
});


describe('GET /manage-drones', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/manage-drones')
      .expect(302, done);
  });
});



describe('GET /retrievedrones', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/retrievedrones')
      .expect(302, done);
  });
});


describe('GET /userfinishedmissions', () => {
  it('should return 302 OK', (done) => {
    request(app)
      .get('/userfinishedmissions')
      .expect(302, done);
  });
});



describe('GET /finishedmissions', () => {
  it('should return 302 OK', (done) => {
    request(app)
      .get('/finishedmissions')
      .expect(302, done);
  });
});


describe('GET /missionsbare', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/missionsbare')
      .expect(302, done);
  });
});

describe('GET /uploadThis', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/uploadThis')
      .expect(302, done);
  });
});



describe('GET /manage-drones', () => {
  it('should return 302 Found', (done) => {
    request(app)
      .get('/manage-drones')
      .expect(302, done);
  });
});



describe('GET /random-url', () => {
  it('should return 404', (done) => {
    request(app)
      .get('/reset')
      .expect(404, done);
  });
});
