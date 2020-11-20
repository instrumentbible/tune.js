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
	Math.pow(2, 0/12),  // unision
	Math.pow(2, 1/12),  // minor second
	Math.pow(2, 2/12),  // major second
	Math.pow(2, 3/12),  // minor third
	Math.pow(2, 4/12),  // major third
	Math.pow(2, 5/12),  // perfect fourth
	Math.pow(2, 6/12),  // tritone
	Math.pow(2, 7/12),  // perfect fifth
	Math.pow(2, 8/12),  // minor sixth
	Math.pow(2, 9/12),  // major sixth
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
class Tuner {
	constructor(options) {
		
		// options
        this.temperament 		= options.temperament		|| 'equal';
		this.fundamental 		= options.fundamental		|| 440;
		this.ratios 	 		= options.ratios			|| equal;
		this.targetFrequencies 	= options.targetFrequencies	|| [];
		this.midPoints			= options.midPoints 		|| [];
		this.temperature		= options.temperature 		|| 70; // temperature (used to calulate speed of sound)
		this.speedOfSound		= options.speedOfSound 		|| 343;
		this.wavelength			= options.wavelength 		|| 0;
		this.frequency			= options.frequency 		|| 440; // incoming frequency

	}
    
	// set temperament
	setTemperament(e) {
		this.temperament = e;
		
		// calculate new ratios
		var newRatios = [];
		
		window[this.temperament].forEach(function(r, i) {
					
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
		this.fundamental = e;
		this.setRatios(this.ratios);
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
			this.ratios.forEach(function(r, i) {
				newTargetFreqs.push(r * funda);
			});

			// array of target frequencies
			this.targetFrequencies = newTargetFreqs;
				
			function diff(ary) {
				var newA = [];
				for (var i = 1; i < ary.length; i++) {
					var x = ary[i] - ary[i - 1];
					newA.push(x/2);
				}
				return newA;
			}

			var newMidPoints = [];
			
			// for each target frequency, find the
			// halfway point (in Hz) and push to newMidPoints array
			diff(newTargetFreqs).forEach(function(v, i) {
				var midpoint =  newTargetFreqs[i] + v;
				newMidPoints.push(midpoint);
			});

			this.midPoints = newMidPoints;
			
		}
		catch (err){
			console.error(err);
		}
	}
	
	// tune (calcultes cents)
	tune(e) {
		
		this.frequency = e;
		console.log(this.frequency);
		
		
		
		//getWavelength
		
		
		this.wavelength = this.speedOfSound / this.frequency;
		var frequency = e;
		var cents;
		
		
		
		// get the highest of the midPoints, then devide by two
		// this will be the low threshold...if higher, we multiply by 2
		var highMidPoint = this.midPoints[this.midPoints.length - 1] / 2;
		
		
		// multiply/divide frequency until between 440 & 880
		for (let step = 0; step < 100; step++) {
			if (frequency < highMidPoint) {
				frequency = frequency * 2;
			}
			else if (frequency > highMidPoint * 2) {
				frequency = frequency / 2;
			}
			else {
				break;
			}
		}

		// for each value in midPoints array, loop until
		// we find the first value our frequency is greater than

		var midPoints = this.midPoints;
		var targ = this.targetFrequencies;
		
		midPoints.some(function(v, i) {
			if (frequency < v) {
				// calulate cents
				cents = 1200 * Math.log2(frequency/targ[i]);
				return frequency < v;
			}
		});

		return cents;
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
			if (e < 0){
				e = Math.abs(e);
				return notesFlat[e % 12];
			} else {
				return notesSharp[e % 12];
			}
		}
		// or use a second argument 'sharp' or 'flat'
		else if (accidental == 'flat') {
			return notesFlat[e % 12];
		}
		else if (accidental == 'sharp') {
			return notesSharp[e % 12];
		}
		
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


/*
 function calculateCents(freq1, freq2) {
	 var cents = Math.log2(freq2 / freq1) * 1200;
 }
 */
