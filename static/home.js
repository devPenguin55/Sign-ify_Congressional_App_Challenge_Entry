let stream;
const canvas = document.getElementById('frameCanvas');
const ctx = canvas.getContext('2d');
let videoElement = document.getElementById('webcam');

function startWebcam() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((mediaStream) => {
                stream = mediaStream;
                videoElement.srcObject = stream;
            }).catch((error) => {
                console.error("error accessing webcam:", error);
            });
    } else {
        alert("webcam not supported in this browser");
    }

}

function stopWebcam() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(
            (track) => track.stop()
            );
        videoElement.srcObject = null;
    }
}

function captureFrame() {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const frameData = canvas.toDataURL("image/jpeg");
    
    if (!(frameData==="data:,")) {
        console.log();
        socket.emit('videoFrame', {'encoded':frameData});
    }
}

setInterval(captureFrame, 20);