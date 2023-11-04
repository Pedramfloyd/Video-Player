document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("myVideo");
    const playPauseButton = document.getElementById("playPause");
    const stopButton = document.getElementById("stop");
    const volumeRange = document.getElementById("volumeRange");
    const volumeIcon = document.getElementById("volumeIcon");
    const fullscreenButton = document.getElementById("fullscreen");
    const progress = document.querySelector(".progress-bar");
    const currentTimeDisplay = document.getElementById("currentTime");
    const durationDisplay = document.getElementById("duration");
    const qualitySelect = document.getElementById("quality-select");
    const subtitleButton = document.getElementById("toggleSubtitles");
    const commentInput = document.getElementById("commentInput");
    const postCommentButton = document.getElementById("postComment");
    const commentList = document.querySelector(".comment-list");
    const player = videojs("myVideo");

    let isPlaying = false;

  
    // Quality selection
    // Function to change video source based on selected quality
    qualitySelect.addEventListener("change", function () {
        const selectedQuality = qualitySelect.value;
        const newVideoSource = `${selectedQuality}/sample.mp4`;
        video.src(newVideoSource);
    });

    // Subtitle toggling
    subtitleButton.addEventListener("click", function () {
        const track = video.textTracks()[0];
        track.mode = track.mode === "hidden" ? "showing" : "hidden";
    });

    // Event listener for posting a comment
    function postComment() {
        const commentText = commentInput.value.trim();
        if (commentText === "") {
            return; // Don't post empty comments
        }

        const newComment = createCommentElement(commentText);
        commentList.appendChild(newComment);

        // Clear the comment input
        commentInput.value = "";
    }

    // Event listener for pressing Enter in the comment input field
    commentInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            postComment();
        }
    });

    // Function to create a new comment element
    function createCommentElement(text) {
        const comment = document.createElement("div");
        comment.classList.add("comment");
        comment.innerHTML = `<p class="comment-text">${text}</p>`;
        return comment;
    }

    // Optionally, you can add quality levels if available
    player.qualityLevels([
        { label: "Low", src: "your-low-quality-hls.m3u8" },
        { label: "Medium", src: "your-medium-quality-hls.m3u8" },
        { label: "High", src: "your-high-quality-hls.m3u8" },
    ]);

    // Handle quality level changes
    player.on("qualitychange", function () {
        console.log("Selected quality:", player.currentQuality().label);
    });
});


