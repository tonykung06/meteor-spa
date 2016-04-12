import { Meteor } from 'meteor/meteor';
import Users from '../collections/Users';
import History from '../collections/History';

Meteor.publish('allUsers', function() {
  return Users.find({});
});

Meteor.publish('allHistory', function() {
  return History.find({});
});

Meteor.startup(() => {
  // code to run on server at startup
  
  //seed some data
  if (Users.find({}).count() === 0) {
  	Users.insert({
  		total: 120,
  		goal: 200
  	});
  }

  if (History.find({}).count() === 0) {
  	History.insert({
  		value: 50,
  		date: new Date().toTimeString()
  	});

  	History.insert({
  		value: 40,
  		date: new Date().toTimeString()
  	});

  	History.insert({
  		value: 30,
  		date: new Date().toTimeString()
  	});
  }
});
