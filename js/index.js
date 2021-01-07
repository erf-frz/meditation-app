const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');  //we only need the circle part of the svg
    const video = document.querySelector('.video-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');


    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //get the total length of the circle in order to animate it
    const outlineLength = outline.getTotalLength();    //1359.759765625
    console.log(outlineLength); 
    
    //duration
    let fakeDuration = 600;
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;


    //change the sound
    sounds.forEach(sound => {
        sound.addEventListener('click',function(){
            song.src = this. getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
        })
    })


    //play sound
    play.addEventListener('click', ()=>{
        checkPlaying(song);
    });


    //select time
    timeSelect.forEach(el => {
        el.addEventListener('click',function(){
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        })
    });

    //separete function for playing and pausing the sound
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = 'css/svg/pause.svg';
        }else{
            song.pause();
            video.pause();
            play.src = 'css/svg/play.svg';
        }
    };


    //animate the cirlce
    song.ontimeupdate = () =>{
        let currentTime = song.currentTime;       //returns the current time in secods (used for audio/video)
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60 );
        let minutes = Math.floor(elapsed / 60 );

        //animate the circle
        let progress = outlineLength - (currentTime/fakeDuration * outlineLength);
        outline.style.strokeDashoffset = progress;

        //animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration){
            song.pause();
            video.pause();
            song.currentTime = 0;
            play.src = 'css/svg/play.svg';
        }
    };
};

app();






