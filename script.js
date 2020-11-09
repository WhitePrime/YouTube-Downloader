var sanitize = require("sanitize-filename");
const execa = require('execa');
let convertBtn = document.querySelector('.get-btn');
let URLinput = document.querySelector('.link-input');

const gggg = () => {
  console.log(`URL: ${URLinput.value}`);
  document.getElementById("thumbnail").style.display = "";
  downBtnRemove()
  main()
}
convertBtn.addEventListener('click', gggg);
// convertBtn.addEventListener('keypress', function(enter){
//   console.log(enter)
//   if (enter.key === 'Return') {
//    gggg()
//   }
// })
const scriptLoc = require('electron').remote.app.getAppPath()
const ffmpegLoc = scriptLoc + '/dep/ffmpeg'
let vidtitle
function getVideoInfo(videoID) {
  return new Promise((resolve) => {
  const cp = execa(scriptLoc + '/dep/youtube-dl', ['-j', videoID, '--ffmpeg-location', ffmpegLoc])
  cp.on('error', (error) => {
    console.log(error)
  })
  let jsonData = ''
  const { stdout, stderr } = cp
  let errorData = ''
  console.log(cp)
  stdout.on('data', (data) => {
    jsonData += data.toString('utf-8')
    console.log(data.toString('utf-8'))
  })
  stderr.on('data', (data) => {
    errorData += data.toString('utf-8')
    console.error(data.toString('utf-8'))
  })
  let errorString = cp.stderr
    cp.on('exit', function(code) {
      console.log(code)
      if (code == 1) {
        if (errorData.includes('Unable to extract video data')) { 
          resolve(getVideoInfo(videoID))
        } else if (errorData.includes('This video is DRM protected')) { 
          resolve(getVideoInfo(videoID))
        }
      } else if (code == 0) {
        resolve(JSON.parse(jsonData))
      }
    })
  })
}
async function removeQuarantine() {
  const removeQ =  await execa('xattr', ['-r', '-d', 'com.apple.quarantine', ffmpegLoc])
}
async function main() {
  const jsonData = await getVideoInfo(URLinput.value)
  console.log(jsonData.title);
  let qava = jsonData.requested_formats[0].format_note;
  let qav = qava.split('p', 4)[0];
  console.log(qav)
  let thumbnail = jsonData.thumbnails[3];
  document.getElementById("thumbnail").src = thumbnail.url;
  document.getElementById("all").style.display = "";
  vidtitle = sanitize(jsonData.title)
  document.getElementById("vid-title").innerHTML = vidtitle
  document.getElementById("buttons").style.display = "";
  boringStuff(qav)
  removeQuarantine()
}

async function boringStuff(qav) {

  let f = document.getElementById("btn-zero");
  let e = document.getElementById("btn-one");
  let d = document.getElementById("btn-two");
  let c = document.getElementById("btn-three");
  let b = document.getElementById("btn-four");
  let a = document.getElementById("btn-five");
  let ab = document.getElementById("btn-six");
  let ac = document.getElementById("btn-seven");
  let ad = document.getElementById("btn-eight");


  f.classList.remove("nav");
  e.classList.remove("nav");
  d.classList.remove("nav");
  c.classList.remove("nav");
  b.classList.remove("nav");
  a.classList.remove("nav");
  ab.classList.remove("nav");
  ac.classList.remove("nav");
  ad.classList.remove("nav");

if (qav == '2160') {
    f.classList.add("nav")

    f.classList.remove("hover")

  }
  else if (qav == '1440') {
    f.classList.add("nav")
    e.classList.add("nav")

    f.classList.remove("hover")
    e.classList.remove("hover")




  }
  else if (qav == '1080') {
    f.classList.add("nav")
    e.classList.add("nav")
    d.classList.add("nav")

    f.classList.remove("hover")
    e.classList.remove("hover")
    d.classList.remove("hover")



  }
  else if (qav == '720') {
    f.classList.add("nav")
    e.classList.add("nav")
    d.classList.add("nav")
    c.classList.add("nav")

    f.classList.remove("hover")
    e.classList.remove("hover")
    d.classList.remove("hover")
    c.classList.remove("hover")



  }
  else if (qav == '480') {
    f.classList.add("nav")
    e.classList.add("nav")
    d.classList.add("nav")
    c.classList.add("nav")
    b.classList.add("nav")

    f.classList.remove("hover")
    e.classList.remove("hover")
    d.classList.remove("hover")
    c.classList.remove("hover")
    b.classList.remove("hover")


  }
  else if (qav == '360') {
    f.classList.add("nav")
    e.classList.add("nav")
    d.classList.add("nav")
    c.classList.add("nav")
    b.classList.add("nav")
    a.classList.add("nav")

    f.classList.remove("hover")
    e.classList.remove("hover")
    d.classList.remove("hover")
    c.classList.remove("hover")
    b.classList.remove("hover")
    a.classList.remove("hover")

  }
  else if (qav == '240') {
    f.classList.add("nav")
    e.classList.add("nav")
    d.classList.add("nav")
    c.classList.add("nav")
    b.classList.add("nav")
    a.classList.add("nav")
    ab.classList.add("nav")

    f.classList.remove("hover")
    e.classList.remove("hover")
    d.classList.remove("hover")
    c.classList.remove("hover")
    b.classList.remove("hover")
    a.classList.remove("hover")
    ab.classList.remove("hover")


  }
  else if (qav == '144') {
    f.classList.add("nav")
    e.classList.add("nav")
    d.classList.add("nav")
    c.classList.add("nav")
    b.classList.add("nav")
    a.classList.add("nav")
    ab.classList.add("nav")
    ac.classList.add("nav")

    f.classList.remove("hover")
    e.classList.remove("hover")
    d.classList.remove("hover")
    c.classList.remove("hover")
    b.classList.remove("hover")
    a.classList.remove("hover")
    ab.classList.remove("hover")
    ac.classList.remove("hover")

  }
}
function removeActiv() {
  let f = document.getElementById("btn-zero");
  let e = document.getElementById("btn-one");
  let d = document.getElementById("btn-two");
  let c = document.getElementById("btn-three");
  let b = document.getElementById("btn-four");
  let a = document.getElementById("btn-five");
  let ab = document.getElementById("btn-six");
  let ac = document.getElementById("btn-seven");
  let ad = document.getElementById("btn-eight");
  f.classList.remove("active");
  e.classList.remove("active");
  d.classList.remove("active");
  c.classList.remove("active");
  b.classList.remove("active");
  a.classList.remove("active");
  ab.classList.remove("active");
  ac.classList.remove("active");
  ad.classList.remove("active");
}
var btnContainer = document.getElementById("buttons")
var btns = btnContainer.getElementsByClassName("quality");
  let activclass
  if (btns) {
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        removeActiv()
        // current[0].className = current[0].className.replace("", "");
        this.className += " active";
        activclass = btnContainer.getElementsByClassName("active")[0].innerHTML
        document.getElementById("download").style.display = "";
      });
    }
  }
function getFcode() {
  let fcode
  console.log(activclass)
  switch (activclass) {
    case '4320p':
      fcode = 'bestvideo[height<=4320]+'
      break;

    case '2160p':
      fcode = 'bestvideo[height<=2160]+'
      break;

    case '1440p':
      fcode = 'bestvideo[height<=1440]+'
      break;

    case '1080p':
      fcode = 'bestvideo[height<=1080]+'
      break

    case '720p':
      fcode = 'bestvideo[height<=720]+'
      break

    case '480p':
      fcode = 'bestvideo[height<=480]+'
      break

    case '360p':
      fcode = 'bestvideo[height<=360]+'
      break

    case '240p':
      fcode = 'bestvideo[height<=240]+'
      break

    case '144p':
      fcode = 'bestvideo[height<=144]+'
      break
  }
  return fcode
}


let acode = 'bestaudio[ext=m4a]'
function downBtnAdd() {
  let downbtn = document.getElementById('download');
  let downAudioBtn = document.getElementById("download-audio");
  let getBtn = document.getElementById('get-btn');
  getBtn.disabled = true;
  if (downAudioBtn) {
  downAudioBtn.disabled = true;
  }
  if (downbtn) {
  downbtn.disabled = true;
}}
function downBtnRemove() {
  let downbtn = document.getElementById('download');
  let downAudioBtn = document.getElementById("download-audio");
  let getBtn = document.getElementById('get-btn');
  getBtn.disabled = false;
  if (downAudioBtn) {
  downAudioBtn.disabled = false;
}
if (downbtn) {
  downbtn.disabled = false;
}}


async function execYtDl(videoURL) {
  console.log('Downloading')
  const downLocationVideo = require('os').homedir() + '/Downloads/' + vidtitle + '.mp4'
  console.log(downLocationVideo);
  let fcode = getFcode()
  console.log(fcode)
  const foo = execa(scriptLoc + '/dep/youtube-dl', ['-o', downLocationVideo, '-f', `${fcode}${acode}`, '--merge-output-format', 'mp4', videoURL, '-c', '--ffmpeg-location', ffmpegLoc])
  foo.stdout.on('data', (data) => {
    var stat = data.toString('utf-8')
    var downStatus = document.getElementById('status')
    downStatus.innerHTML = 'Status: ' + stat
  })
  foo.on('exit', function(code) {
    if (code == 0) {
    downBtnRemove()
    }
    else {
      execYtDl();
    }
  })
}


async function download() {
  downBtnAdd()
  await execYtDl(URLinput.value)
}


async function audioYtDl(videoURL) {
  let downStatus
  let downLocationAudio = require("os").homedir + '/Downloads/' + vidtitle + '.mp3'
  console.log("Downloading")
  const foof = execa(scriptLoc + '/dep/youtube-dl', ['-o', downLocationAudio, '-x', '--audio-format', 'mp3', videoURL, '-c', '--ffmpeg-location', ffmpegLoc])
  foof.stdout.on('data', (data) => {
    var stat = data.toString('utf-8')
    var downStatus = document.getElementById('status')
    downStatus.innerHTML = 'Status: ' + stat
  })
  foof.on('exit', function(code) {
    if (code == 0) {
    fixAudio()
    }
    else {
      audioYtDl()
    }
  })
}


async function fixAudio() {
  let downLocationAud = require("os").homedir + '/Downloads/' + vidtitle + '.mp3'
  let downLocationAudioFix = require("os").homedir + '/Downloads/' + vidtitle + ' - DO NOT DELETE (CONVERTING)' + '.mp3'
  let downStatus
  const ffmpeg = execa(scriptLoc + '/dep/ffmpeg', ['-i', downLocationAud, downLocationAudioFix])
  ffmpeg.stdout.on('data', (data) => {
    var downStatus = document.getElementById('status')
    downStatus.innerHTML = 'Status: Converting'
  })
  ffmpeg.on('exit', function() {
    deleteOld()
    downBtnRemove()
  })
}
async function downloadAudio() {
  downBtnAdd()
  audioYtDl(URLinput.value)
}
async function deleteOld() {
  let downLocationAud = require("os").homedir + '/Downloads/' + vidtitle + '.mp3'
  const remove = execa('rm', [downLocationAud])
  remove.on('exit', function() {
    renameToNew()
  })
}
async function renameToNew() {
  let downLocationAud = require("os").homedir + '/Downloads/' + vidtitle + '.mp3'
  let downLocationAudioFix = require("os").homedir + '/Downloads/' + vidtitle + ' - DO NOT DELETE (CONVERTING)' + '.mp3'
  const rename = execa('mv', [downLocationAudioFix, downLocationAud])
  downBtnRemove()
}