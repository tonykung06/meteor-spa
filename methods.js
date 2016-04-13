import {Meteor} from 'meteor/meteor';
import ProteinData from './collections/ProteinData';
import History from './collections/History';

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
				}, 3000);
			}
		}
	});
};