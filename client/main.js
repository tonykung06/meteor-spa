import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import ProteinData from '../collections/ProteinData';
import History from '../collections/History';
import injectMethods from '../methods';
import './main.html';

Meteor.subscribe('allProteinData', function() {
	ProteinData.ready = true;
});
Meteor.subscribe('allHistory', function() {
	History.ready = true;
});

Tracker.autorun(function () {
  if (Meteor.user()) {
  	console.log('User logged in:', Meteor.user().profile.name);
  } else {
  	console.log("User logged out");
  }
});

injectMethods();

Template.userDetails.helpers({
	user: function() {
		var data = ProteinData.findOne({});

		if (!data && ProteinData.ready) {
			data = {
				userId: Meteor.userId(),
				total: 0,
				goal: 200
			};

			ProteinData.insert(data);
		}

		return data;
	},
	lastAmount: function() {
		return Session.get('lastAmount');
	}
});

Template.history.helpers({
	historyItem: function() {
		return History.find({}, {
			sort: {
				date: -1
			},
			limit: 5
		});
	}
});

Template.userDetails.events({
	'click #addAmount': function(e) {
		e.preventDefault();

		var amount = parseInt($('#amount').val(), 10);

		if (!amount) {
			return;
		}

		Meteor.call('addProtein', amount, (err, id) => {
			if (err) {
				return alert(err.reason);
			}
		});

		Session.set('lastAmount', amount);
	}
});
