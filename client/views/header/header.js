Template.header.events({
	/**
	 * Logs the user out on click
	 * @return void
	 */
	'click #logout-btn' : function(){
		Meteor.users.update({_id: Meteor.userId()}, {$set : {'profile.recent.lastLogin' : new Date().getTime() } });
		Meteor.logout();
	},

	'click #password-btn' : function(){
		$("#old-password").val("");
		$("#sign-password").val("");
		$("#sign-confirm-password").val("");
		$("#updatePass").modal("show");
	}
});

Template.header.helpers({
	/**
	 * Gets the first name of the current user
	 * @return String String value of first name
	 */
	'currentName' : function(){
		return Meteor.user().profile.firstName;
	},

	notSub: function() {
		var user = Meteor.user();
		if(user.profile.userGroup == "Sub-Trade"){
			return false;
		}
		return true;
	}
});