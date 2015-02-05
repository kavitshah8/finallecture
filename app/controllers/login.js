import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Controller.extend({

	reset: function() {
		this.setProperties({username:'', password: '', errorMessage: ''});
	},

	actions: {

		login: function() {

			var self = this, data = this.getProperties('username', 'password');

			self.set('errorMessage', null);

			return ajax({url:'/auth.json', data: data, type:'POST'}).then(function(response) {
				
				if (response.success) {
					self.token = response.token;
					self.transitionToRoute('home');
				} else {
					self.set('errorMessage', response.message);
				}
				
			});

		}

	}

});
