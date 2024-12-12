JavaScript library for microtonal tuning systems.

Try the [live demo](https://instrumentbible.github.io/tune.js/).

![tune js](https://github.com/user-attachments/assets/a6359b23-ed32-43cc-b357-68416137b61d)

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

# Contributing
Any contributions you make are **greatly appreciated**. Any bugs and change requests are to be reported on the [issues tab](https://github.com/instrumentbible/instrument.bible/issues). If you don't like coding, you can contribute by becoming a sponsor.

[![GitHub Sponsors](https://img.shields.io/static/v1?label=&message=GitHub%20Sponsors&logo=github&logoColor=white&color=6e5494)](https://github.com/sponsors/instrumentbible) 
[![Patreon](https://img.shields.io/static/v1?label=&message=Support%20on%20Patreon&logo=Patreon&logoColor=white&color=f96854)](https://patreon.com/instrumentbible) 
[![Square](https://img.shields.io/static/v1?label=&message=Donate%20on%20Square&logo=Square&logoColor=white&color=28c101)](https://checkout.square.site/pay/31ba92dcb17e4a9c979c022b690659bb) 
[![Venmo](https://img.shields.io/static/v1?label=&message=Donate%20on%20Venmo&logo=Venmo&logoColor=white&color=3d95ce)](https://venmo.com/u/instrumentbible) 
[![PayPal](https://img.shields.io/static/v1?label=&message=Donate%20on%20PayPal&logo=PayPal&logoColor=white&color=009cde)](https://paypal.me/instrumentbible) 


# Questions?   
Please write to [contact@instrument.bible](mailto:contact@instrument.bible) or visit [instrument.bible](https://instrument.bible).
  
[![Discord](https://img.shields.io/static/v1?label=&message=Discord%20&logo=discord&logoColor=white&color=7289da)](https://discord.gg/VJDj7nt)  [![Twitter](https://img.shields.io/static/v1?label=&message=Twitter&logo=Twitter&logoColor=white&color=1DA1F2)](https://twitter.com/instrumentbible)  [![YouTube](https://img.shields.io/static/v1?label=&message=Youtube&logo=youtube&logoColor=white&color=FF0000)](https://youtube.com/channel/UCkw7klLsjYXYGzFT-9a3WMA)  [![Facebook](https://img.shields.io/static/v1?label=&message=Facebook&logo=facebook&logoColor=white&color=3c5a99)](https://facebook.com/instrumentbible)  [![LinkedIn](https://img.shields.io/static/v1?label=&message=LinkedIn&logo=LinkedIn&logoColor=white&color=0077b5)](https://linkedin.com/company/instrumentbible)  [![Instagram](https://img.shields.io/static/v1?label=&message=Instagram&logo=Instagram&logoColor=white&color=e1306c)](https://instagram.com/instrument.bible)

