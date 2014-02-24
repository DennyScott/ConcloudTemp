Template.createProjectModal.events({
	'click #createSideProj' : function (event) {
		clearBackground(event, "createSideProj");
	},
	'keypress' : function() {
    if(event.which === 13){
    	if(acceptPasswords()){
	      clearBackground();
	      createSideProject();
  		}
    }
  },

	'click #create-side-project' : function () {
		if(acceptPasswords()){
			createSideProject();
		}
	}
});

function createSideProject(){
	//This will stop the default submitting of the form
		var userName = Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
	    	Meteor.call('createNewProjectDirectories', $('#create-side-title').val(), function (error, result) {
	    		if(error)
	    			console.log(error);
	    	});

	        var folderUpdate = createFolderUpdate();
	        var folderCreation = createFolderCreation();
	        var project = {title:$('#create-side-title').val(),
	        	password: $("#project-password").val(),
	    		folders:{}};

	        var foldersData = Folders.find();

	        foldersData.forEach(function (folder) {
	        	project.folders[folder.name] = createFolder(folder.name, folderCreation, folderUpdate);
	        });

			//Calls the newly created Project's path after creating
		Meteor.call('project', project, function (error, id) {
			if (error) {
				console.log(error);
                // display the error to the user
                throwError(error.reason);
                // if the error is that the post already exists, take us there
                if (error.error === 302){
                }
            } else {
            	$("#createSideProj").modal("hide");
            	//ENTER SPINNER STOP CODE HERE!!!!
            }
        });
}

function acceptPasswords(){
	if($("#project-password").val() === $("#project-password-two").val()){
		return true;
	}
	$("#incorrect-pass-label").text("Please enter matching passwords");
	return false;
}