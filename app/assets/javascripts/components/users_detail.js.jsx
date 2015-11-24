var UsersDetail = React.createClass({

  getInitialState: function () {
    return ({
      user: UserStore.show(),
      tracks: TrackStore.userTracks()
    });
  },

componentDidMount: function () {
  UserStore.addChangeListener(this._getUser);
  TrackStore.addChangeListener(this._getUserTracks);

  var u = this.props.params;
  if (u.username === undefined) {
    ApiUtil.fetchUser(u.id);
  } else {
    ApiUtil.fetchUser(u.username);
  }
},

_getUser: function () {
  this.setState({ user: UserStore.show() });
  ApiUtil.fetchUserTracks(this.state.user.id);
},

_getUserTracks: function () {
  this.setState({ tracks: TrackStore.userTracks() });
},

componentWillUnmount: function () {
  UserStore.removeChangeListener(this._getUser);
  TrackStore.removeChangeListener(this._getUserTracks);
},
  render: function () {
    var user = this.state.user;
    return (
        <div className="profile-page">
          <header>
          <img className="cover" src={user.cover}>
              <img className="avatar" src={user.avatar} />
              <h2>{user.username.capitalize()}</h2>
              <p>{user.bio}</p>
          </img>
          </header>

          <ul>
            {this.state.tracks.map(function (track) {
              return <TracksIndexItem key={track.title} track={track} />;
            })}
          </ul>
        </div>
    );
  }
});
          // <div className="cover" styles={"background-image: url(" + user.cover + ")"}>
          // </div>
