/*
The MIT License (MIT)
 
 Copyright (c) 2020 Josh Stovall
 Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var AudioContext = window.AudioContext || window.webkitAudioContext;
var thestream
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext		= null;
var isPlaying			= false;
var sourceNode			= null;
var analyser			= null;
var theBuffer			= null;
var mediaStreamSource	= null;
var detectorElem, pitchElem, noteElem, detuneElem, detuneAmount;
var constraints;
var audioSelect = document.getElementById('audioSource')

var rafID = null;
var tracks = null;
var buflen = 2048;
var buf = new Float32Array( buflen );


audioSelect.onchange = toggleLiveInput;


function gotDevices(deviceInfos) {
	for (let i = 0; i !== deviceInfos.length; ++i) {
		const deviceInfo = deviceInfos[i];
		const option = document.createElement("option");
		option.value = deviceInfo.deviceId;
		if (deviceInfo.kind === "audioinput") {
			option.text = deviceInfo.label || "microphone " + (audioSelect.length + 1);
			audioSelect.appendChild(option);
		}
	}
}

function getStream() {
	if (window.stream) {
		window.stream.getTracks().forEach(function (track) {
			track.stop();
		});
	}
}

var just = [
	[ 1  , 1  ], // unision
	[ 16 , 15 ], // minor second
	[ 9  , 8  ], // major second
	[ 6  , 5  ], // minor third
	[ 5  , 4  ], // major third
	[ 4  , 3  ], // perfect fourth
	[ 7  , 5  ], // tritone (or 10/7)
	[ 3  , 2  ], // perfect fifth
	[ 8  , 5  ], // minor sixth
	[ 5  , 3  ], // major sixth
	[ 16 , 9  ], // minor seventh
	[ 15 , 8  ], // major seventh
	[ 2  , 1  ], // octave
];

var pythagorean = [
	[ 1   , 1   ], // unision
	[ 256 , 243 ], // minor second
	[ 9   , 8   ], // major second
	[ 32  , 27  ], // minor third
	[ 81  , 64  ], // major third
	[ 4   , 3   ], // perfect fourth
	[ 729 , 512 ], // tritone
	[ 3   , 2   ], // perfect fifth
	[ 128 , 81  ], // minor sixth
	[ 27  , 16  ], // major sixth
	[ 16  , 9   ], // minor seventh
	[ 243 , 128 ], // major seventh
	[ 2   , 1   ], // octave
];

var meantone = [
	[ 1  , 1  ], // unision
	[ 16 , 15 ], // minor second
	[ 9  , 8  ], // major second
	[ 6  , 5  ], // minor third
	[ 5  , 4  ], // major third
	[ 4  , 3  ], // perfect fourth
	[ 25 , 18 ], // tritone
	[ 3  , 2  ], // perfect fifth
	[ 8  , 5  ], // minor sixth
	[ 5  , 3  ], // major sixth
	[ 9  , 5  ], // minor seventh
	[ 15 , 8  ], // major seventh
	[ 2  , 1  ], // octave
];

var equal = [
	Math.pow(2,  0/12), // unision
	Math.pow(2,  1/12), // minor second
	Math.pow(2,  2/12), // major second
	Math.pow(2,  3/12), // minor third
	Math.pow(2,  4/12), // major third
	Math.pow(2,  5/12), // perfect fourth
	Math.pow(2,  6/12), // tritone
	Math.pow(2,  7/12), // perfect fifth
	Math.pow(2,  8/12), // minor sixth
	Math.pow(2,  9/12), // major sixth
	Math.pow(2, 10/12), // minor seventh
	Math.pow(2, 11/12), // major seventh
	Math.pow(2, 12/12), // octave
];

var werckmeisterI = [
	(1   /   1),                                // unision
	(256 / 243),                                // minor second
	(64  /  81) * Math.sqrt(2),                 // major second
	(32  /  27),                                // minor third
	(256 / 243) * Math.pow(2, 1/4),             // major third
	(4   /   3),                                // perfect fourth
	(1024/ 729),                                // tritone
	(8   /   9) * Math.pow(Math.pow(2, 3), 1/4),// perfect fifth
	(128 /  81),                                // minor sixth
	(1024/ 729) * Math.pow(2, 1/4),             // major sixth
	(16  /   9),                                // minor seventh
	(128 /  81) * Math.pow(2, 1/4),             // major seventh
	(2   /   1),                                // octave
];

var werckmeisterII = [
	(1    /    1),                      // unision
	(16384/19683) * Math.pow(2, 1/3),   // minor second
	(8    /    9) * Math.pow(2, 1/3),   // major second
	(32   /   27),                      // minor third
	(64   /   81) * Math.pow(4, 1/3),   // major third
	(4    /    3),                      // perfect fourth
	(1024 /  729),                      // tritone
	(32   /   27) * Math.pow(2, 1/3),   // perfect fifth
	(8192 / 6561) * Math.pow(2, 1/3),   // minor sixth
	(256  /  243) * Math.pow(4, 1/3),   // major sixth
	(9    /    (4 * Math.pow(2, 1/3))), // minor seventh
	(4096 / 2187),                      // major seventh
	(2    /    1),                      // octave
];

var werckmeisterIII = [
	(1   /   1),                      // unision
	(8   /   9) * Math.pow(2, 1/4),   // minor second
	(9   /   8),                      // major second
				  Math.pow(2, 1/4),   // minor third
	(8   /   9) * Math.sqrt(2),       // major third
	(9   /   8) * Math.pow(2, 1/4),   // perfect fourth
				  Math.sqrt(2),       // tritone
	(3   /   2),                      // perfect fifth
	(128 /  81),                      // minor sixth
				  Math.pow(8, 1/4),   // major sixth
	(3   /        Math.pow(8, 1/4)),  // minor seventh
	(4   /   3) * Math.sqrt(2),       // major seventh
	(2   /   1),                      // octave
];
 
// tune.js
class Tune {
	constructor(options) {
		if(!options){options = {}}
		// options
        this.temperament 		= options.temperament		|| 'equal'; // temperament
		this.fundamental 		= options.fundamental		|| 440;		// fundamental frequency
		this.ratios 	 		= options.ratios			|| equal;
		this.targetFrequencies 	= options.targetFrequencies	|| [];
		this.midPoints			= options.midPoints 		|| [];
		this.temperature		= options.temperature 		|| 70;
		this.speedOfSound		= options.speedOfSound 		|| 343;
		this.wavelength			= options.wavelength 		|| 0;
		this.frequency			= options.frequency 		|| 440; // incoming frequency
		
		// listen for first click, then remove the listener
		document.addEventListener("click", firstClick);

		this.setFundamental(this.fundamental);
		this.setTemperament(this.temperament);
   
	}
	// set temperament
	setTemperament(e) {
		this.temperament = e;
		
		// calculate new ratios
		var newRatios = [];
		// console.log(e)
		window[e].forEach(function(r, i) {
					
			// if a just tuning (pure ratios)
			if (e == 'just' 		||
				e == 'meantone'		||
				e == 'pythagorean'	){
				newRatios.push(r[0] / r[1]);
			}
			// other temperaments (non-pure ratios)
			else if (e == 'equal' 			||
					 e == 'werckmeisterI' 	||
					 e == 'werckmeisterII' 	||
					 e == 'werckmeisterIII' ){
				newRatios.push(r);
			}
		});
		
		// update the ratios
		this.setRatios(newRatios)
	}
	
	// get temperament
	getTemperament(e) {
		return this.temperament;
	}
	
	// set fundamental (A = 440)
	setFundamental(e) {
		// console.log(e)
		this.fundamental = e;
		this.setTemperament(this.temperament)
	}
	
	// get fundamental
	getFundamental(e) {
		return this.fundamental;
	}
	
	// set ratios (upadtes tuning ratios) (send an array of ratios)
	setRatios(e){
		
		try {
			this.ratios = e;
			var funda = this.fundamental;
			
			// calculate target frequencies given the ratios
			var newTargetFreqs = [];
			e.forEach(function(r, i) {
				newTargetFreqs.push(r * funda);
			});

			// console.log(newTargetFreqs)
			// array of target frequencies
			this.targetFrequencies = newTargetFreqs;
				
			// function to calculate mid points
			function diff(ary) {
				var newA = [];
				for (var i = 1; i < ary.length; i++) {
					var x = ary[i] - ary[i - 1];
					newA.push(x/2);
				}
				return newA;
			}

			var newMidPoints = [];
			// for each target frequency, find the  halfway point (in Hz) and push to newMidPoints array
			diff(newTargetFreqs).forEach(function(v, i) { newMidPoints.push( newTargetFreqs[i] + v ); });
			this.midPoints = newMidPoints;
		}
		catch (err){ console.error(err); }
	}
	
	// tune (calcultes cents)
	tune(e) {
		
		this.frequency = e;

		//get Wavelength
		// this.wavelength = this.speedOfSound / this.frequency;
		var frequency = e;
		var cents;
		
		// get the highest of the midPoints, then devide by two
		// this will be the low threshold...if higher, we multiply by 2
		var highMidPoint = this.midPoints[this.midPoints.length - 1] / 2;
		
		// multiply/divide frequency until between 440 & 880
		for (let step = 0; step < 100; step++) {
			if 		(frequency < highMidPoint    ) { frequency = frequency * 2; }
			else if (frequency > highMidPoint * 2) { frequency = frequency / 2; }
			else { break; }
		}

		// for each value in midPoints array, loop until
		// we find the first value our frequency is greater than

		var midPoints = this.midPoints;
		var targ = this.targetFrequencies;
		//console.log(targ)
		midPoints.some(function(v, i) {
			if (frequency < v) {
				// calulate cents
				cents = 1200 * Math.log2(frequency/targ[i]);
				return frequency < v;
			}
		});
		return cents;
	}
			
	static noteFromPitch( frequency ) {
		var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
		return Math.round( noteNum ) + 69;
	}

	static frequencyFromNoteNumber( note ) {
		return 440 * Math.pow(2,(note-69)/12);
	}

	// ===== static functions ===== //
	
	// frequency to MIDI
	static ftom(freq) {
		const note = Math.round(69 + 12 * Math.log2(freq / 440));
		return note;
	}
	
	// MIDI to frequency
	// TO DO: support for other temperaments
	static mtof(e) {
		return Math.pow(2, (e - 69) / 12) * 440
	}
																										
	// calulate harmonics
	// get nth harmonic of a given frequency
	static harmonic(freq, n){
		var thePartial = n - 1;
		var theHarmonic =  freq;
		var i;
		for (i = 1; i <= thePartial; i++){
			theHarmonic +=  theHarmonic / i;
		}
		return theHarmonic;
	}
	
	// convert MIDI note to note name
	static getNoteName(e, accidental){
		
		//var notesDefault = ['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];
		var notesFlat    = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
		var notesSharp   = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

		// negative number will default to flat
		// positive number will default to sharp
		if (!accidental) {
			if (e < 0){ e = Math.abs(e); return notesFlat [e % 12]; }
			else      { 				 return notesSharp[e % 12]; }
		}
		// or use a second argument 'sharp' or 'flat'
		else if (accidental == 'flat')  { return notesFlat [e % 12]; }
		else if (accidental == 'sharp') { return notesSharp[e % 12]; }
		
	}
	
	// set temperature (used to calculate speed of sound)
	setTemperature(temp) {
		this.temperature = temp; // temperature in fehrenheit
		var celsius = (this.temperature - 32) * (5 / 9);
		this.speedOfSound = 331.39 + (.6 * celsius); // (meters per second)
		
		// TO DO:
		// calculate ft/s & mi/hr
	}
	
	// set speed of sound
	setSpeedOfSound(e){
		
	}
												 
	 // get speed of sound
	 getSpeedOfSound(){
		 return this.speedOfSound;
	 }
	
	// set wavelength
	setWavelength(e){
		this.wavelength = e;
		this.frequency = this.speedOfSound / this.wavelength;
	}
	
	// get wavelength
	getWavelength() {
		return this.wavelength;
	}
	
}

function autoCorrelate( buf, sampleRate ) {
	// Implements the ACF2+ algorithm
	var SIZE = buf.length;
	var rms = 0;

	for ( var i=0; i < SIZE; i++ ) {
		var val = buf[i]; rms += val * val;
	}
	rms = Math.sqrt(rms/SIZE);
					
	if ( rms < 0.01 ) { // not enough signal
		return -1;
	}
	var r1 = 0, r2 = SIZE - 1, thres = 0.2;
	for (var i=0; i<SIZE/2; i++){ if ( Math.abs(buf[i])      < thres ) { r1=i;      break; } }
	for (var i=1; i<SIZE/2; i++){ if ( Math.abs(buf[SIZE-i]) < thres ) { r2=SIZE-i; break; } }

	buf = buf.slice(r1,r2);
	SIZE = buf.length;

	var c = new Array(SIZE).fill(0);
	for ( var i = 0; i < SIZE; i++ ){
		 for (var j=0; j<SIZE-i; j++){
			 c[i] = c[i] + buf[j] * buf[j+i];
		 }
	}
	var d=0; while (c[d]>c[d+1]) d++;
	var maxval=-1, maxpos=-1;
	for (var i=d; i<SIZE; i++) {
		if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
	}
	var T0 = maxpos;

	var x1 = c[T0-1], x2 = c[T0], x3 = c[T0+1];
	a = (x1 + x3 - 2 * x2) / 2;
	b = (x3 - x1) / 2;
	if (a) { T0 = T0 - b/(2*a); }

	return sampleRate/T0;
}
	detectorElem = document.getElementById( "detector" );
	 pitchElem = document.getElementById( "pitch" );
	 noteElem = document.getElementById( "note" );
	 detuneElem = document.getElementById( "detune" );
	 detuneAmount = document.getElementById( "detune_amt" );

function firstClick(e) {
	//var myTuner = new Tune();
	document.removeEventListener("click", firstClick);
	audioContext = new AudioContext();
	analyser = audioContext.createAnalyser();
	analyser.fftSize = 2048;
	navigator.mediaDevices.getUserMedia({ video:false, audio: !this.isCameraAccessGranted, }).then(() => { enumm(); });
	updatePitch()
}
		 
function enumm(){
	 navigator.mediaDevices.enumerateDevices().then(gotDevices)// .then(getStream).catch(handleError);
}
		 
function toggleLiveInput() {
	if(thestream){
		thestream.getTracks().forEach(function (track) { track.stop(); });
	}
		getUserMedia(constraints, gotStream);
}
		 
function gotStream(stream) {
	thestream = stream
	mediaStreamSource = audioContext.createMediaStreamSource(stream);
	mediaStreamSource.connect( analyser );
}
		 
function handleError(error) { console.error("Error: ", error); }
		 
function getUserMedia(constraints, callback) {
	try {
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		constraints = {
		audio:{
			deviceId: { exact: audioSelect.options[audioSelect.selectedIndex].value },
			channelCount : 2,
			autoGainControl: false,
			channelCount: 2,
			echoCancellation: false,
			latency: 0,
			noiseSuppression: false,
			sampleRate: 48000,
			sampleSize: 16,
			volume: 1.0
			//audio:true
		},
		video:false
		}
		//navigator.getUserMedia(dictionary, callback, error);
		navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
	} catch (e) { /*   alert('getUserMedia threw exception :' + e); */ }
}
