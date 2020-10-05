# tune.js 🎵
![GitHub](https://img.shields.io/github/license/instrumentbible/tune.js) 


JavaScript library for various tuning systems. 

Calculate cents for different temperaments.

**supported temperaments**
* Equal temperament
* Pythagorean tuning


## tune

calculate the cents given a specific frequency

tune(`frequency`)
```javascript
tune(448)
// -7.887184708183386
```


## target frequencies

calculate the target frequencies for a given temperaments

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

calculate the MIDI note given a specific frequency

mtof(`MIDI Note Number`)
```javascript
mtof(60)
// 261.6255653005986
```


## frequency to MIDI (ftom)

calculate the frequency given a specific MIDI note

ftom(`frequency`)
```javascript
ftom(440)
// 69
```

## get note name from MIDI note

calculate the note name given a MIDI note

ftom(`frequency`)
```javascript
toNoteName(64)
// 69
```


# temperaments
* Equal temperament
* Pythagorean tuning

## Pythagorean
```javascript
// pythagorean

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


 [440, 463.5390946502058, 495, 521.4814814814814, 556.875, 586.6666666666666, 626.484375, 660, 695.3086419753085, 742.5, 782.2222222222222, 835.3125, 880]
```



## Meantone
```javascript
// pythagorean

// meantone tuning ratios
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


[440, 469.3333333333333, 495, 528, 550, 586.6666666666666, 611.1111111111111, 660, 704, 733.3333333333334, 792, 825, 880]
```

## Werckmeister I
```javascript
//werck 1
[
  440, 
  463.5390946502058, 
  491.6574557583501, 
  521.4814814814814, 
  551.2439894399445, 
  586.6666666666666, 
  618.0521262002743, 
  657.7678625984612, 
  695.3086419753085, 
  734.9919859199259, 
  782.2222222222222, 
  826.8659841599166, 
  880
]

//werck2
[440, 461.4500051745235, 492.7691217366615, 521.4814814814814, 551.8668348570925, 586.6666666666666, 618.0521262002743, 657.025495648882, 692.1750077617852, 735.8224464761234, 785.7635207242587, 824.0695016003658, 880]


// werck3
[452.55605804497657, 480.05605804497657, 509.1255653005986, 538.1828841646704, 570.8860798272453, 605.4557446852543, 641.1269837220809, 677.6543209876543, 717.6487436992887, 762.4327706625324, 807.2743262470058, 854.8359782961079]
```

