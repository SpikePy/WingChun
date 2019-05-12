const database_side = [
  ['Links: ',  'links.mp3',],
  ['Rechts: ', 'rechts.mp3'],
];
const database_technique = [            // Schwierigkeitsgrade
  ['Tan Sao',  'tan.mp3',  'tan.jpg'],  // │ │ │ │
  ['Gan Sao',  'gan.mp3',  'gan.jpg'],  // │ │ │ └─ Anfänger
  ['Pak Sao',  'pak.mp3',  'pak.jpg'],  // │ │ └─── Fortgeschritten
  ['Cham Sao', 'cham.mp3', 'cham.jpg'], // │ └───── Profi
  ['Bong Sao', 'bong.mp3', 'bong.jpg'], // └─────── Meister
];

wait_between     =  800; // Time to wait between playing side and technique audio files
wait_fullCommand = 1500; // Time to wait between 2 commands

// Entry point, gets started if button is pressed
function start() {
  html("running");

  for (repetition = 0; repetition < get_repetitions(); repetition++) {
    setTimeout(function() { // Wait time before starting loop
      random_side      = Math.round(Math.random());
      random_technique = Math.floor(Math.random() * get_difficulty());
      text.innerHTML   = database_side[random_side][0] + database_technique[random_technique][0];
      image.src        = "images/" + database_technique[random_technique][2];
      audio.src        = "audio/side/"  + database_side[random_side][1];
      audio.play();

      setTimeout(function() {
        audio.src      = "audio/technique/" + database_technique[random_technique][1];
        audio.play();
      },wait_between);
    },repetition * get_waitTime());
  }

  // Wait repetition * get_waitTime before resetting the page
  setTimeout(function() {
    html("reset");
  },repetition * get_waitTime());
}

// manipulate html depending on state
function html(state) {
  if (state == "running") {
    interaction.style.display = "none";
  }
  else if (state == "reset") {
    interaction.style.display = "block";
    image.src      = "images/hand.jpg";
    text.innerHTML = "";
  }
}

// Get value of html-select to decides which elements of *database_commands_array* 
// should be included
function get_difficulty() {
  return difficulty.options[difficulty.selectedIndex].value;
}

// Get waitingg time between commands
function get_waitTime() {
  // Time to wait between 2 commands + offset chosen in html
  return wait_fullCommand + Number(wait.options[wait.selectedIndex].value);
}

// Get value of repetitions input field
function get_repetitions() {
  return repetitions.value;
}