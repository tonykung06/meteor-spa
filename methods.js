import {Meteor} from 'meteor/meteor';
import ProteinData from './collections/ProteinData';
import History from './collections/History';

// ProteinData.deny({
// 	update: function(userId, data) {
// 		if (data.total < 0) {
// 			return true;
// 		}

// 		return false;
// 	}
// });

ProteinData.allow({
	insert: function(userId, data) {
		if (data.userId === userId) {
			return true;
		}

		return false;
	},
	update: function(userId, data) {
		if (data.total >= 0 ) {
			return true;
		}

		return false;
	}
});

export default () => {
	Meteor.methods({
		addProtein(amount) {
			if (this.isSimulation) {
				amount = 500;

				ProteinData.update({
					userId: this.userId
				}, {
					$inc: {
						total: amount
					}
				});

				History.insert({
					value: amount,
					date: new Date().toTimeString(),
					userId: this.userId
				});
			} else {
				Meteor.setTimeout(() => {
					ProteinData.update({
						userId: this.userId
					}, {
						$inc: {
							total: amount
						}
					});

					History.insert({
						value: amount,
						date: new Date().toTimeString(),
						userId: this.userId
					});
				}, 2000);
			}
		}
	});
};