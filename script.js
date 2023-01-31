const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeText = document.getElementById('quote');

//Disable Button
function toggleButton(){
  button.disabled = !button.disabled;
}

//Text ot Voice
function connection(joke){
        VoiceRSS.speech({
            key: 'a4791f66cebf47f5ac4067b2ef34d9df',
            src: joke,
            hl: 'en-us',
            v: 'Linda',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

// Get Joke from API
const getJokes = async () =>{
  let joke ="";
  const jokesApi = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try{
    const response = await fetch(jokesApi);
    const data = await response.json();

    // Check Whether It's Single Part Jokes or Two Parts Jokes
    if(data.type === "twopart"){
      joke = `${data.setup} ... ${data.delivery}`
    }else {
      joke = data.joke;
    }

    //Disable the Button
    toggleButton();

    //Printing Joke on Screen
    jokeText.textContent = joke;
    
    //Text to Voice
    connection(joke);
  }catch(error){
    console.log('Whooo', error);
  }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);