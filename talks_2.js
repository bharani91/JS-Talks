Talks = new Meteor.Collection("talks");

if( Meteor.isClient ) {
	Template.listing.talks = function() {
		return Talks.find({}, { sort: { votes: -1 } });
	};

	Template.talk.events({
		"click .upvote": function(e, t) {
			Talks.update({_id: t.data._id}, { $inc: {votes: 1}} );
		},

		"click .downvote": function(e, t) {
			Talks.update({_id: t.data._id}, { $inc: {votes: -1}});
		},

		"click .delete": function(e, t)  {
			e.preventDefault();
			console.log("Delete");

			if (Meteor.user().emails[0]["address"] == "admin@jschannel.com") {
				Talks.remove({_id: t.data._id });
			}
		}

	});

	Template.add_talk.events({
		"submit form": function(e, t) {
			e.preventDefault();
			var form = t.find("form"),
				title = t.find(".title").value,
				description = t.find(".description").value,
				time = t.find(".time").value,
				speaker_name = t.find(".speaker_name").value,
				speaker_bio = t.find(".speaker_bio").value;

			
			Talks.insert({title: title, time: time, description: description, speaker_name: speaker_name, speaker_bio: speaker_bio});

			form.reset();
		}
	});


}