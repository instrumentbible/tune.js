# tune.js 🎵
![GitHub](https://img.shields.io/github/license/instrumentbible/tune.js) 


JavaScript library for various tuning systems. 

Calculate cents for different temperaments.


## supported temperaments
* Equal temperament
* Pythagorean 
* Meantone
* Werkmeister


# Setup
import **tune.js** library
```html
<script src="tune.js"></script>
```

now you can use the library to create a tuner
```javascript
// these are the options
var options = {
	temperament: "equal",
	fundamental: 440
}

// create a new tuner
var myTuner = new Tuner(options)
```




# Functions
## tune
calculate the cents given a specific frequency

tune(`frequency`)
```javascript
tune(448)
// -7.887184708183386
```


## target frequencies

calculate the target frequencies for a given 


s

```javascript
calculateTargetFrequencies('meantone', 440)
```

## harmonic series

get **n**<sup>th</sup> harmonic of a given frequency

harmonic(`partial`, `frequency`)
```javascript
harmonic(4, 440)
// 1760
```


## MIDI to frequency (mtof)
calculate the frequency given a specific MIDI note
```javascript
mtof(60)
// 261.6255653005986
```


## frequency to MIDI (ftom)
calculate the MIDI note given a specific frequency
```javascript
ftom(440)
// 69
```

## MIDI note to note name

```javascript
toNoteName(64)
// 69
```


