// Initialize Firebase
let config = {
  apiKey: "AIzaSyAUyh-1xUutcy54yOYQC7JBvYz4mRNacEU",
  authDomain: "video-feedback.firebaseapp.com",
  databaseURL: "https://video-feedback.firebaseio.com",
  storageBucket: "gs://video-feedback.appspot.com",
}
firebase.initializeApp(config)







// Create an array to store the video uploads
let videos = []







// Show second question when next button is clicked
let nextButton1 = document.getElementById('nextButton1')
nextButton1.addEventListener('click', showNextQuestion)

function showNextQuestion(event) {
  let questionPanel1 = document.getElementById('questionPanel1')
  questionPanel1.className = "mui-panel fadeOut"
  let questionPanel2 = document.getElementById('questionPanel2')
  questionPanel2.className = "mui-panel fadeIn"
}








// Add first video to videos array once uploaded
// Closure is used to pass video number as an argument to
// the callback
let videoInput1 = document.getElementById('videoInput1')
videoInput1.addEventListener('change', addVideo(1))

function addVideo(number) {
  number = number.toString()

  // Callback that actually gets run in file upload
  return function() {
    // files is array of file uploads
    let files = this.files
    let video = files[0]

    // Add video to videos array where we keep all responses
    videos.push(video)

    // Show video preview section
    let videoGrid = document.getElementById('videoDiv' + number)
    videoGrid.className = 'mdl-grid mui--text-center'

    // Set video url to uploaded video local URL
    let videoElement = document.getElementById('video' + number)
    // Create a local url for displaying the uploaded video
    let url = URL.createObjectURL(video)
    videoElement.setAttribute('src', url)
  }
}







// Add second video to videos array once uploaded
let videoInput2 = document.getElementById('videoInput2')
videoInput2.addEventListener('change', addVideo(2))







// Submit videos to Firebase once submit button is clicked
let submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', handleFiles)

function handleFiles() {
  // Hide last question panel
  let panel = document.getElementById('questionPanel2')
  panel.className = "hidden"

  // Show video-upload success panel
  let successPanel = document.getElementById('successPanel')
  successPanel.className = "mdl-grid mui--text-center"

  // Create firebase storage pointer
  let storageRef = firebase.storage().ref()

  // Upload videos to firebase asynchronously
  videos.forEach( (video) => {
    // Use a random folder name and update storage pointer
    let path = "User_" + Math.random().toString(36).substring(7)
    storageRef = storageRef.child(path + video.name)

    storageRef
    // Upload video
    .put(video)
    // Display download URL on page
    .then( () => {
      storageRef.getDownloadURL()
        .then( (url) => {
          let bodyUrl = document.getElementById('url')
          bodyUrl.innerHTML += "File '" + video.name + "' submitted.<br><a href='" + url + "'>Download</a><br><br>"
        })
        .catch( (error) => console.log(error) )
    })
    .catch( (error) => console.log(error) )
  })
}
