Template.userDetails.helpers({
	user: function() {
		return {
			total: 123,
			goal: 251
		};
	}
});

Template.history.helpers({
	historyItem: function() {
		return [{
			date: '10/31/2013 5:00 AM',
			value: 20
		}, {
			date: '10/31/2013 6:00 AM',
			value: 30
		}, {
			date: '10/31/2013 7:00 AM',
			value: 40
		},{
			date: '10/31/2013 8:00 AM',
			value: 50
		}];
	}
});
