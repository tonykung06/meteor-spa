Router.route('/', function () {
  this.render('home');
}, {
  // provide a custom name
  name: 'home'
});

Router.route('/settings', function () {
  this.render('settings');
});