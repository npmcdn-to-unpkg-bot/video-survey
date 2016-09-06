videos = []

var Question = React.createClass({
render: function() {
  return (
    <div></div>
  )
}
})
// tutorial1.js
var Survey = React.createClass({
render: function() {
  return (
    <div className="survey">
      <Question />
    </div>
  )
}
})
ReactDOM.render(
<Survey />,
document.getElementById('content')
);
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUyh-1xUutcy54yOYQC7JBvYz4mRNacEU",
    authDomain: "video-feedback.firebaseapp.com",
    databaseURL: "https://video-feedback.firebaseio.com",
    storageBucket: "gs://video-feedback.appspot.com",
  }
  firebase.initializeApp(config)




  // var videoOne = document.getElementById('videoQuestionOne')
  // videoOne.addEventListener('change', addFirstVideo)
  var video_two = document.getElementById('video_question_two')
  // video_one.addEventListener('change', changeInputText)
  // video_two.addEventListener('change', changeInputText)

  var firstNextButton = document.getElementById('firstNextButton')
  firstNextButton.addEventListener('click', showNextQuestion)
  // submitButton.addEventListener('click', submitVideos)
  function showNextQuestion(event) {
    event.preventDefault()
    var firstQuestionPanel = document.getElementById('firstQuestionPanel')
    firstQuestionPanel.className = "mui-container fadeOut"
    var secondQuestionPanel = document.getElementById('secondQuestionPanel')
    secondQuestionPanel.className = "mui-container fadeIn"
  }
