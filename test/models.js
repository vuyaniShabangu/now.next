const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User');
const Drone = require('../models/Drone');


describe('User Model', () => {
  it('should create a new user', (done) => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save((err) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
      done();
    });
  });

  it('should not create a user with the unique email', (done) => {
    const user = new User({
      email: 'test@gmail.com',
      password: 'password'
    });
    user.save((err) => {
      expect(err).to.be.defined;
      expect(err.code).to.equal(11000);
      done();
    });
  });

  it('should find user by email', (done) => {
    User.findOne({ email: 'test@gmail.com' }, (err, user) => {
      expect(err).to.be.null;
      expect(user.email).to.equal('test@gmail.com');
      done();
    });
  });

  it('should delete a user', (done) => {
    User.remove({ email: 'test@gmail.com' }, (err) => {
      expect(err).to.be.null;
      done();
    });
  });
});




describe('Drone Model', () =>{

it('Should create a new drone ', (done)=>{
  const drone = new Drone({
  fManuc: 'DroneCast1.1',
  fModel: 'Drone1.1',
  fFlyTime: '2',
  fAerial: '2',
  fOrtho: '35',
  fVideo: '1',
  fUser: 'test@gmail.com',
  dStatus: "pending"
   });
  drone.save((err) => {
  expect(err).to.be.null;
      expect(drone.fUser).to.equal('test@gmail.com');
      expect(drone).to.have.property('createdAt');
      expect(drone).to.have.property('updatedAt');
      done();
    });
  

it('should remove the drone', (done) => {
    drone.remove({ email: 'test@gmail.com' }, (err) => {
      expect(err).to.be.null;
      done();
    });
  });
});

it('should find  owner by email', (done) => {
    User.findOne({ email: 'test@gmail.com' }, (err, user) => {
      expect(err).to.be.null;
      expect(drone.email).to.equal('test@gmail.com');
      done();
    });
  });
});

