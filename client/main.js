// Users = new Meteor.Collection('users');
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import Users from '../collections/Users';
import History from '../collections/History';
import './main.html';

Meteor.subscribe('allUsers');
Meteor.subscribe('allHistory');

Template.userDetails.helpers({
	user: function() {
		return Users.findOne();
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

		Users.update(this._id, {
			$inc: {
				total: amount
			}
		});

		History.insert({
			value: amount,
			date: new Date().toTimeString(),
			userId: this._id
		});
	}
});
