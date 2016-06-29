Template.postBook.helpers({
    postsCompleted: function() {
        return Posts.find({
            $and: [
                {
                    owner: this._id
                }, {
                    completed: true
                }
            ]
        });
    }
});
