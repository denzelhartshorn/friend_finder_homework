var friends = require("../data/friends");

module.exports = function(app) {
  // get freinds req
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // post friends req
  app.post("/api/friends", function(req, res) {
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    var userData = req.body;
    var userScores = userData.userScores;

    var totalDifference;

    //loop through all friends
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // loop through scores
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // calculate the difference between the scores and sum them into totalDifference
        totalDifference += Math.abs(
          parseInt(currentUserScore) - parseInt(currentFriendScore)
        );
      }
      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        // Reset the bestMatch to be the new friend.
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }
    friends.push(userData);

    res.json(bestMatch);
  });
};
