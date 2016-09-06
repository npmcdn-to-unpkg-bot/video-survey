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

/*
  VIDEO UPLOAD BUTTONS
*/
// Add first video to videos array once uploaded
// (Note: Closure is used to pass video number as an argument to
// the callback)
document
  .getElementById('videoInput1')
  .addEventListener('change', addVideo(1))

// Add second video to videos array
document
  .getElementById('videoInput2')
  .addEventListener('change', addVideo(2))

/*
  NEXT & SUBMIT BUTTONS
*/

// Show second question when next button is clicked
document
  .getElementById('nextButton1')
  .addEventListener('click', showNextQuestion)

// Submit videos to Firebase once submit button is clicked
document
  .getElementById('submitButton')
  .addEventListener('click', handleFiles)



/*
  HELPER FUNCTIONS
*/
function showNextQuestion(event) {
  let questionPanel1 = document.getElementById('questionPanel1')
  questionPanel1.className = "mui-panel fadeOut"
  let questionPanel2 = document.getElementById('questionPanel2')
  questionPanel2.className = "mui-panel fadeIn"
}

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
    let videoDiv = document.getElementById('videoDiv' + number)
    videoDiv.className = 'mdl-grid mui--text-center'

    // Set video url to uploaded video local URL
    let videoElement = document.getElementById('video' + number)
    // Create a local url for displaying the uploaded video
    let url = URL.createObjectURL(video)
    console.log("video element is", videoElement)
    console.log("setting url to", url)
    videoElement.setAttribute('src', url)
  }
}

function handleFiles() {
  // Hide last question panel
  let panel = document.getElementById('questionPanel2')
  panel.className = "hidden"

  // Show video-upload success panel
  let successPanel = document.getElementById('successPanel')
  successPanel.className = "mdl-grid mui--text-center"

  // Use a random folder name and update storage pointer
  let userFolder = "User_" + Math.random().toString(36).substring(7)

  // Create firebase storage pointer
  let storageRef = firebase.storage().ref().child(userFolder)

  // Upload videos to firebase asynchronously
  videos.forEach( (video) => {
    storageRef = storageRef.child(video.name)

    storageRef
    // Upload video
    .put(video)
    // Display download URL on page
    .then( () => {
      storageRef
      .getDownloadURL()
      .then( (url) => {
        let bodyUrl = document.getElementById('url')
        bodyUrl.innerHTML += "File '" + video.name + "' submitted.<br><a href='" + url + "'>Download</a><br><br>"
      })
      .catch( (error) => console.log(error) )
    })
    .catch( (error) => console.log(error) )
  })
}
