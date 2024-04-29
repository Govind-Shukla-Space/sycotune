import { useState,useRef } from 'react';
import './App.css';
import vidArray from './Components/vidArray.js';
import musicAPI from './Components/musicAPI.js';
import { colours } from 'nodemon/lib/config/defaults.js';
function App() {
  const [currentMusicDetails,setCurrentMusicDetails]=useState({
    songName:'Raat Kali Ek Khwab Me Aayi',
    songSrc:'./Assets/songs/Raat Kali Ek Khwab Me Aayi.mp3',
    songAvatar:'./Assets/Images/image1.jpg'
  })
  const[audioProgress,setAudioProgress]=useState(0);
  const [isAudioPlaying,setIsAudioPlaying]=useState(false);
  const [musicIndex,setMusicIndex]=useState(0);
  const [musicTotalLength,setMusicTotalLength]=useState('04 : 38');
  const [musicCurrentTime,setMusicCurrentTime]=useState('00 : 00');
  const [videoIndex,setVideoIndex]=useState(0);
  const currentAudio=useRef();
  const handleMusicProgress=(e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime=e.target.value*currentAudio.current.duration/100;
  }
  let avatarClass=['objectFitCover','objectFitContain','none']
  const [avatarClassIndex,setAvatarClassIndex]=useState(0);
  const handleAvatar=()=>{
    if(avatarClassIndex>=avatarClass.length-1){
      setAvatarClassIndex(0);
    }
    else{
      setAvatarClassIndex(avatarClassIndex+1);
    }
  }
  const handleAudioPlay=()=>{
    if(currentAudio.current.paused){
      currentAudio.current.play();
      setIsAudioPlaying(true);
    }
    else{
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  }
  
  const handleNextSong=()=>{
    if(musicIndex>=musicAPI.length-1){
      let setNumber=0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
    else{
      let setNumber=musicIndex+1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  }
  const handlePrevSong=()=>{
    if(musicIndex===0){
      let setNumber=musicAPI.length-1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
    else{
      let setNumber=musicIndex-1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }
  }
  const updateCurrentMusicDetails=(number)=>{
    let musicObject=musicAPI[number];
    currentAudio.current.src=musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName:musicObject.songName,
      songSrc:musicObject.songSrc,
      songAvatar:musicObject.songAvatar
    })
    setIsAudioPlaying(true);
    
  }
  const handleAudioUpdate=()=>{
    //input total of audio
    let minutes=Math.floor(currentAudio.current.duration/60);
    let seconds=Math.floor(currentAudio.current.duration%60);
    let musicTotalLength0=`${minutes<10 ?`0${minutes}`:minutes} : ${seconds<10 ?`0${seconds}`:seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //input music current time
    let currentMin=Math.floor(currentAudio.current.currentTime/60);
    let currentSec=Math.floor(currentAudio.current.currentTime%60);
    let musicCurrentT=`${currentMin<10 ?`0${currentMin}`:currentMin} : ${currentSec<10?`0${currentSec}`:currentSec}`;
    setMusicCurrentTime(musicCurrentT);
    const progress=parseInt((currentAudio.current.currentTime/currentAudio.current.duration)*100);
    setAudioProgress(isNaN(progress)?0:progress);
  }
  
  const handleChangeBackground=()=>{
    if(videoIndex>=vidArray.length-1){
      setVideoIndex(0);
    }
    else{
      setVideoIndex(videoIndex+1);
    }
  }
  return (
    <>
      <div className='container'>
        <audio src='./Assets/songs/Raat Kali Ek Khwab Me Aayi.mp3' ref={currentAudio} onEnded={handleNextSong} 
        onTimeUpdate={handleAudioUpdate}></audio>
        <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
        <div className='blackScreen'></div>
        <div className='music-Container'>
          <p className='musicPlayer'>Rhythm</p>
          <i><p className='music-Head-Name'>{currentMusicDetails.songName}</p></i>
          {/* <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p> */}
          <img src='./Assets/Images/image1.jpg' className={avatarClass[avatarClassIndex]} 
          onClick={handleAvatar} alt='song Avatar' id='songAvatar'/>
          <div className='musicTimerDiv'>
            <p className='musicCurrentTime'>{musicCurrentTime}</p>
            <p className='musicTotalLength'>{musicTotalLength}</p>
          </div>
          <input type='range' name='musicProgressBar' className='musicProgressBar' 
          value={audioProgress} onChange={handleMusicProgress}/>
          <div className='musicControlers'>
            <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
            <i className={`fa-solid ${isAudioPlaying?'fa-pause-circle':'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
            <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
          </div>
        </div> 
        <div className='changeBackBtn' onClick={handleChangeBackground}>
          <i>Change Background</i>
        </div>
      </div>
    </>
  );
}

export default App;
