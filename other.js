const execa = require('execa');
let convertBtn = document.querySelector('.get-btn');
let URLinput = document.querySelector('.link-input');
var sanitize = require("sanitize-filename");
const gggg = () => {
  console.log(`URL: ${URLinput.value}`);
  document.getElementById("thumbnail").style.display = "";
  enDownBtn()
  document.getElementById('status').innerHTML = ''
  main()
}
convertBtn.addEventListener('click', gggg);

const scriptLoc = require('electron').remote.app.getAppPath()
const ffmpegLoc = scriptLoc + '/dep/ffmpeg'
removeQuarantine(ffmpegLoc)
async function getVideoInfo(videoID) {
    const cp = await execa(scriptLoc + '/dep/youtube-dl', ['-j', videoID, '--ffmpeg-location', ffmpegLoc])
    console.log(JSON.parse(cp.stdout))
    return JSON.parse(cp.stdout)
  }
async function removeQuarantine(filePath) {
  const removeQ = await execa('xattr', ['-r', '-d', 'com.apple.quarantine', filePath])
  console.log(removeQ)
}
async function main() {
  const json = await getVideoInfo(URLinput.value)
  console.log(json.title);
  let playlistTitle = json.title;
  let thumbnail = json.thumbnails[3];
  if (thumbnail) {
  document.getElementById("thumbnail").src = thumbnail.url;
  }
  else {
    document.getElementById("thumbnail").src = json.thumbnail
  }
  document.getElementById('vid-title').innerHTML = sanitize(playlistTitle)
  document.getElementById("downloadPlaylist").style.display = "";
  document.getElementById("buttons").style.display = "";
  document.getElementById("qual-info").style.display = "";
  return playlistTitle
}
let videoBtn = document.getElementById('video-p');
let audioBtn = document.getElementById('audio-p');
let downloadBtn = document.getElementById('downloadPlaylist');
function removeActive() {
  videoBtn.classList.remove('active')
  audioBtn.classList.remove('active')
}

function videoActive() {
  removeActive()
  videoBtn.classList.add('active')
}

function audioActive() {
  removeActive()
  audioBtn.classList.add('active')
}
async function videoPlayDownload(videoURL) {
    let playlistTitle = await main()
    let downStatus = document.getElementById('status')
    const downLocation = require('os').homedir() + '/Downloads/' + playlistTitle + '.mp4'
    const downlo = execa(scriptLoc + '/dep/youtube-dl', ['-o', downLocation,'--merge-output-format', 'mp4', videoURL, '--ffmpeg-location', ffmpegLoc])
    downlo.stdout.on('data', (data) => {
      let stat = data.toString('utf-8')
      downStatus.innerHTML = 'Status: ' + stat
    })
    console.log(downlo)
    downlo.on('exit', function () {
      enDownBtn()
      document.getElementById('status').innerHTML = 'Status: Done!'
    })
}
async function audioPlayDownload(videoURL) {
  let playlistTitle = await main()
  let downStatus = document.getElementById('status')
  const downLocation = require('os').homedir() + '/Downloads/' + playlistTitle + '.mp3'
  const downlo = execa(scriptLoc + '/dep/youtube-dl', ['-o', downLocation, '-i', '-x', '--audio-format', 'mp3', videoURL, '--ffmpeg-location', ffmpegLoc])
  downlo.stdout.on('data', (data) => {
    let stat = data.toString('utf-8')
    downStatus.innerHTML = 'Status: ' + stat
  })
  console.log(downlo)
  downlo.on('exit', function () {
    enDownBtn()
    document.getElementById('status').innerHTML = 'Status: Done!'
  })
}
let getBtn = document.getElementById('get-btn');
function disDownBtn() {  
  downloadBtn.disabled = true;
  getBtn.disabled = true;
}

function enDownBtn() {
  downloadBtn.disabled = false;
  getBtn.disabled = false;
}
let activClass;
async function download() {
  disDownBtn()
  let getBtn = document.getElementById('get-btn');
  getBtn.disabled = true
  activClass = document.getElementsByClassName("active")[0].innerHTML;
  if (activClass == 'Video') {
    videoPlayDownload(URLinput.value)
  } else if (activClass == 'Audio') {
    audioPlayDownload(URLinput.value)
  }
}