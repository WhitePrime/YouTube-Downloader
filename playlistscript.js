const execa = require('execa');
let convertBtn = document.querySelector('.get-btn');
let URLinput = document.querySelector('.link-input');
const gggg = () => {
  console.log(`URL: ${URLinput.value}`);
  document.getElementById("thumbnail").style.display = "";
  enDownBtn()
  main()
}
convertBtn.addEventListener('click', gggg);

const scriptLoc = require('electron').remote.app.getAppPath()
const ffmpegLoc = scriptLoc + '/dep/ffmpeg'

async function getVideoInfo(videoID) {
    const cp = await execa(scriptLoc + '/dep/youtube-dl', ['-j', '--playlist-items', '1', videoID])
    console.log(JSON.parse(cp.stdout))
    return JSON.parse(cp.stdout)
  }
async function removeQuarantine(filePath) {
  const removeQ = await execa('xattr', ['-r', '-d', 'com.apple.quarantine', filePath])
  console.log(removeQ)
}
removeQuarantine(ffmpegLoc)
async function main() {
  const json = await getVideoInfo(URLinput.value)
  console.log(json.playlist);
  let playlistTitle = json.playlist;
  let thumbnail = json.thumbnails[3];
  document.getElementById("thumbnail").src = thumbnail.url;
  document.getElementById('vid-title').innerHTML = playlistTitle;
  document.getElementById("downloadPlaylist").style.display = "";
  document.getElementById("buttons").style.display = "";
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
  const downLocation = require('os').homedir() + '/Downloads/' + playlistTitle
  const downlo = execa(scriptLoc + '/dep/youtube-dl', ['-o', downLocation + '/%(title)s.%(ext)s', '-i', '-f', 'bestvideo+bestaudio', '--merge-format', 'mp4', videoURL, '--ffmpeg-location', ffmpegLoc])
  downlo.stdout.on('data', (data) => {
    let stat = data.toString('utf-8')
    downStatus.innerHTML = 'Status: ' + stat
  })
  console.log(downlo)
  downlo.on('exit', function (code) {
    if (code == 0) {
    enDownBtn()
    }
    else {
    videoPlayDownload(videoURL)
    }
  })
}
async function audioPlayDownload(videoURL) {
  let playlistTitle = await main()
  let downStatus = document.getElementById('status')
  const downLocation = require('os').homedir() + '/Downloads/' + playlistTitle
  const downlo = execa(scriptLoc + '/dep/youtube-dl', ['-o', downLocation + '/%(title)s.%(ext)s', '-i', '-x', '--audio-format', 'mp3', videoURL, '--ffmpeg-location', ffmpegLoc])
  downlo.stdout.on('data', (data) => {
    let stat = data.toString('utf-8')
    downStatus.innerHTML = 'Status: ' + stat
  })
  console.log(downlo)
  downlo.on('exit', function () {
    enDownBtn()
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
  let playlistTitle = await main()
  const downLocation = require('os').homedir() + '/Downloads/' + playlistTitle
  const mkdir = await execa('mkdir', [downLocation])
  if (activClass == 'Video') {
    videoPlayDownload(URLinput.value)
  } else if (activClass == 'Audio') {
    audioPlayDownload(URLinput.value)
  }
}