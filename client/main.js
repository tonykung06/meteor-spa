import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor'
import ProteinData from '../collections/ProteinData';
import History from '../collections/History';
import './main.html';

Meteor.subscribe('allProteinData', function() {
	ProteinData.ready = true;
});
Meteor.subscribe('allHistory', function() {
	History.ready = true;
});

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

		ProteinData.update(this._id, {
			$inc: {
				total: amount
			}
		});

		History.insert({
			value: amount,
			date: new Date().toTimeString(),
			userId: this.userId
		});
	}
});
