(function (root) {

  var CHANGE_EVENT = 'change';
  var _follows = [];
  var _follow;

  var setFollows = function (follows) {
    _follows = follows;
  };

  root.FollowStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _follows.slice(0);
    },
    followercount: function () {
      var followcount = 0;
      _follows.forEach(function (follow) {
        if (follow.followee_id === CurrentUserStore.currentUser().id) {
          followcount++;
        }
      return followcount;
      });
    },

    show: function () {
      if (typeof _follows !== "undefined") {
        return _follows.filter(function (fllw) {
          return fllw.follower_id === CurrentUserStore.currentUser().id && fllw.following_id === UserStore.show().id;
        })[0];
      }
    },

    addChangeListener: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case FollowConstants.FOLLOWS_RECEIVED:

          setFollows(payload.follows);
          FollowStore.emit(CHANGE_EVENT);
          break;
        case FollowConstants.FOLLOW_RECEIVED:

          _follows.push(payload.follow);
          FollowStore.emit(CHANGE_EVENT);
          break;
        case FollowConstants.FOLLOW_REMOVED:

          var i = _follows.map(function(follow) { return follow.id; }).indexOf(payload.follow.id);
          // debugger
          _follows.splice(i,1);
          FollowStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });
  FollowStore.setMaxListeners(99);
})(this);
