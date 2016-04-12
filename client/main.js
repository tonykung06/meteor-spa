// Users = new Meteor.Collection('users');
import { Template } from 'meteor/templating';
import Users from '../collections/Users';
import History from '../collections/History';
import './main.html';

window.Users = Users;

Template.userDetails.helpers({
	user: function() {
		return Users.findOne();
	}
});

Template.history.helpers({
	historyItem: function() {
		return History.find({});
	}
});
