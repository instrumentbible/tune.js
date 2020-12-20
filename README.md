# tune.js 🎵

JavaScript library for various tuning systems.   Calculate cents for different temperaments.

Try the [live demo](https://instrumentbible.github.io/tune.js/).

# Features 
* calculate cents based on various temperaments
* calculate n<sup>th</sup> harmonic of a given frequency
* ftom (frequency to MIDI function)
* mtof (MIDI to frequency function)
* get note name for a given MIDI note

## supported temperaments
* [Equal Temperament](https://en.wikipedia.org/wiki/Equal_temperament)
* [Pythagorean](https://en.wikipedia.org/wiki/Pythagorean_tuning)
* [Meantone](https://en.wikipedia.org/wiki/Meantone_temperament)
* [Werkmeister I](https://en.wikipedia.org/wiki/Werckmeister_temperament#Werckmeister_I_(III):_%22correct_temperament%22_based_on_1/4_comma_divisions)
* [Werkmeister II](https://en.wikipedia.org/wiki/Werckmeister_temperament#Werckmeister_II_(IV):_another_temperament_included_in_the_Orgelprobe,_divided_up_through_1/3_comma)
* [Werkmeister III](https://en.wikipedia.org/wiki/Werckmeister_temperament#Werckmeister_III_(V):_an_additional_temperament_divided_up_through_1/4_comma)
* [Werkmeister IV](https://en.wikipedia.org/wiki/Werckmeister_temperament#Werckmeister_IV_(VI):_the_Septenarius_tunings)

# Setup
import **tune.js** library
```html
<script src="tune.js"></script>
```

now you can use the library to create a tuner
```javascript
// create a tuner
myTuner = new Tuner();
```

```javascript
// use custom options
var options = {
	temperament: 'equal',
	fundamental: 440
};

// create a new tuner
var myTuner = new Tuner(options);
```


# Functions

## temperament
set the current temperament
```js
myTuner.setTemperament("meantone");
```
get the current temperament
```js
myTuner.getTemperament();
// meantone
```



## tune
calculate the cents given a specific frequency
```js
myTuner.tune(448);
// -7.887184708183386
```


# Other (static) functions

## harmonic series

get **n**<sup>th</sup> harmonic of a given frequency

harmonic(`frequency`, `partial`)

get the 3<sup>rd</sup> harmonic of `440`
```javascript
Tuner.harmonic(440, 3);
// 1320
```


## MIDI to frequency (mtof)
calculate the frequency given a specific MIDI note
```js
Tuner.mtof(60);
// 261.6255653005986
```

## frequency to MIDI (ftom)
calculate the MIDI note given a specific frequency
```js
Tuner.ftom(440);
// 69
```

## MIDI note to note name

get note name from MIDI note number

you can use a negative number to get the flat
```js
Tuner.getNoteName(63);
// D#

// use negative number for flat
Tuner.getNoteName(-63);
// Eb
```

or use a second argument `sharp` or `flat` to get enharmonic note name
```js
Tuner.getNoteName(63, 'sharp');
// D#

Tuner.getNoteName(63, 'flat');
// Eb
```







# tune.js API

## attributes
| attribute | type | options | default |
| :- | :-: | :-: | :-: |
| **`temperament`** | string | `equal`, `just`, `pythagorean`, `meantone`, 	`werckmeister`| `equal` |
| **`fundamental`** | number | any `integer` or `float`  | `440` | 


# Options

## `temperament`
Set the temperament for a given tuner. 

> Type: `string` 
> Default: `equal`
> Available values: `equal` `just` `pythagorean` `meantone` `werckmeisterI` `werckmeisterII` `werckmeisterIII`

Examples
```js
// create a new tuner with meantone temperament
var myTuner = new Tuner({
	temperament: "meantone"
});

// set temperament to pythagorean 
myTuner.setTemperament('pythagorean');

// get current temperament
myTuner.getTemperament();
// pythagorean
```

## `fundamental`
Set the target frequency for a given tuner. 

> Type: `number`  
> Default: `440`
> Available values: `integer` or `float` 


Examples
```js
// create a new tuner with fundamental 440
var myTuner = new Tuner({
	fundamental: 440
});

// update fundamental to 442
myTuner.setFundamental(442);

// get current fundamental
myTuner.getFundamental();
// 442
```

# Functions

## `tune()`
Calculte cents

Examples
```js
// create a new tuner
var myTuner = new Tuner({
	temperament: 'meantone',
	fundamental: 440
});

// calculate cents
myTuner.tune(439);
// -3.939100787161778
```
