Template.postItem.helpers({
    isCurrentUser: function() {
        return Meteor.userId() == this.owner;
    },

    isOwner: function() {
        return this.owner === Meteor.userId();
    },

    isNotCompleted: function() {
        return this.completed === false;
    },

    image: function() {
        var image_id = Meteor.users.findOne({"_id": this.owner}).image;
        return Images.collection.findOne({"_id": image_id});
    },

    imagesOfCompletionNotZero: function() {
        if (parseInt(this.imagesOfCompletion) !== 0) {
            return true;
        }
    },

    isForked: function() {
        return this.hasOwnProperty("forkedFrom");
    },

    forkedFrom: function() {
        return this.forkedFrom;
    },

    isLoggedIn: function() {
        var user = Meteor.user();
        if (user) {
            return true;
        }
    },

    isNotOwner: function() {
        return this.owner !== Meteor.userId();
    },

    ownerUsername: function() {
        return Meteor.users.findOne({"_id": this.owner}).username;
    },

    imageFile: function() {
        return Images.collection.findOne({"_id": this.image});
    },

    imageCompletionFile: function() {
        return Images.collection.findOne({"_id": this.imagesOfCompletion[0]});
    },

    profilePicture: function() {
        return Meteor.users.findOne({"_id": this.owner}).image;
    },

    checkCompleted: function() {
        return this.completed === true;
    },

    checkLike: function() {
        var a = this.likes;
        var obj = Meteor.userId();
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return false;
            }
        }
        return true;
    },

    hasTags: function() {
        if (this.tags !== '') {
            return true;
        }
    },

    dateFromNow: function() {
        return moment(this.date).fromNow();
    },

    shareData: function() {
        var id = Posts.findOne({"_id": this._id})._id;
        var site = "http://thegradlist.herokuapp.com/posts/";
        var path = site.concat(id);
        return {
            url: path,
            title: this.title,
            author: Meteor.users.findOne({"_id": this.owner}).username
        };
    }

});

Template.postItem.events({
    'click .like': function() {
        Meteor.call("likePost", this._id);
    },

    'click .dislike': function() {
        Meteor.call("dislikePost", this._id);
    },

    'click .delete': function() {
        Meteor.call("deletePost", this._id);
    },

    'click .fork': function() {
        Meteor.call("forkPost", this._id);
    },

    'submit .newComment': function(event) {
        event.preventDefault();
        var text = event.target.comment.value;
        var commentId = Comments.insert({text: text, createdAt: new Date(), owner: Meteor.userId()});
        Meteor.call("addCommentToPost", this._id, commentId);
        event.target.comment.value = "";
    }
});

ShareIt.configure({
    sites: {
        'facebook': {
            'appId': 456456687891709
        },
        'twitter': {},
        'googleplus': {},
        'pinterest': {}
    },
    classes: "medium btn",
    iconOnly: true,
    applyColors: false,
    faSize: '', // font awesome size
    faClass: '' // font awesome classes like square
});
