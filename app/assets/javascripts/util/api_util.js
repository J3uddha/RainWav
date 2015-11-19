ApiUtil = {
  fetchTracks: function () {
    $.ajax({
      url: 'api/tracks',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        ApiActions.receiveAllTracks(data);
      }
    });
  },

  fetchTrack: function (id) {
    $.ajax({
      url: 'api/tracks/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        ApiActions.receiveTrack(data);
      }
    });
  },

  fetchTrackUrl: function (id, options) {
    $.ajax({
      url: 'api/tracks/' + id,
      type: 'GET',
      dataType: 'json',
      data: options,
      success: function (data) {
        ApiActions.receiveTrack(data);
      }
    });
  },

  fetchUserTracks: function (userId) {
    $.ajax({
      url: 'api/tracks',
      type: 'GET',
      dataType: 'json',
      data: { user_id: userId },
      success: function (data) {
        ApiActions.receiveUserTracks(data);
      }
    });
  },

  fetchUsers: function () {
    $.ajax({
      url: 'api/users',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        ApiActions.receiveAllUsers(data);
      }
    });
  },

  fetchUser: function (userId) {
    $.ajax({
      url: 'api/users/' + userId,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        ApiActions.receiveUser(data);
      }
    });
  },
};
