import { Meteor } from 'meteor/meteor';
import ProteinData from '../collections/ProteinData';
import History from '../collections/History';
import injectMethods from '../methods';

Meteor.publish('allProteinData', function() {
  return ProteinData.find({
    userId: this.userId
  });
});

Meteor.publish('allHistory', function() {
  return History.find({
    userId: this.userId
  }, {
    sort: {
      date: -1
    },
    limit: 5
  });
});

Meteor.startup(() => {
  // code to run on server at startup
  injectMethods();
  
  //seed some data
  // if (ProteinData.find({}).count() === 0) {
  // 	ProteinData.insert({
  // 		total: 120,
  // 		goal: 200
  // 	});
  // }

  // if (History.find({}).count() === 0) {
  // 	History.insert({
  // 		value: 50,
  // 		date: new Date().toTimeString()
  // 	});

  // 	History.insert({
  // 		value: 40,
  // 		date: new Date().toTimeString()
  // 	});

  // 	History.insert({
  // 		value: 30,
  // 		date: new Date().toTimeString()
  // 	});
  // }
});
