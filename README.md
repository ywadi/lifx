# LIFX-API 
LIFX's Official REST API NodeJs Wrapper to control the lightbulb 


----------

Usage 
=============
Install the module from npm 

    ~ npm install lifx-api 

Once installed you can instantiate your object and pass your access token. 

    var lifxObj = require('lifx-api');
    var lifx = new lifxObj("ACCESS TOKEN HERE");

Once the object is created you can use the function in it to control the lights. 
The function parameters and default values are like the ones in the official documentations for REST but made easier into functions. [(Official REST Documentation Here)](http://developer.lifx.com/)

function listLights(selector, callback)
---------------------------------------

Gets lights belonging to the authenticated account. Filter the lights using selectors. Properties such as id, label, group and location can be used in selectors. Most endpoints accept selectors when performing actions.

> **selector** : string [(See official selector documentations here)](http://developer.lifx.com/#selectors)

> **callback**(body) : function 


EXAMPLE RESPONSE CALLBACK BODY

    [
      {
        "id": "d3b2f2d97452",
        "uuid": "8fa5f072-af97-44ed-ae54-e70fd7bd9d20",
        "label": "Left Lamp",
        "connected": true,
        "power": "on",
        "color": {
          "hue": 250.0,
          "saturation": 0.5,
          "kelvin": 3500
        },
        "brightness": 0.5,
        "group": {
          "id": "1c8de82b81f445e7cfaafae49b259c71",
          "name": "Lounge"
        },
        "location": {
          "id": "1d6fe8ef0fde4c6d77b0012dc736662c",
          "name": "Home"
        },
        "last_seen": "2015-03-02T08:53:02.867+00:00",
        "seconds_since_seen": 0.002869418
      }
    ]

function togglePower(selector, cb)
---------------------------------------

Turn off lights if they are on, or turn them on if they are off. Physically powered off lights are ignored.

> **selector** : string [(See official selector documentations here)](http://developer.lifx.com/#selectors)

> **callback**(body) : function (Body contains server response status if any) 



function setPower(selector, state, duration, cb)
---------------------------------------
Turn lights on, or turn lights off. You can optionally set a duration which will fade on (or off) over the given duration in seconds.

> **selector** : string [(See official selector documentations here)](http://developer.lifx.com/#selectors)

> **state** : string (either "on" or "off") 

> **duration** : float (Fade to the given `state` over a duration of seconds. Defaults to `1.0`.)

> **callback**(body) : function (Body contains server response status if any) 


function setColor(selector, color, duration, power_on, cb)
---------------------------------------
Set the lights to any color. You can optionally set a duration which will fade between colours over the given duration in seconds.

> **selector** : string [(See official selector documentations here)](http://developer.lifx.com/#selectors)

> **color** : string [(See official color documentation here)](http://developer.lifx.com/#colors)

> **duration** : float (Fade to the given `color` over a duration of seconds. Defaults to `1.0`.)

> **power_on** : boolean (Turn on first? Defaults to `true`.)

> **callback**(body) : function (Body contains server response status if any) 


function breatheEffect(selector, color, from_color, period, cycles, persist, power_on, peak, cb)
---------------------------------------
Performs a breathe effect by slowly fading between the given colors. If from_color is omitted then the current color is used in its place. Use the parameters to tweak the effect.

> **selector** : string [(See official selector documentations here)](http://developer.lifx.com/#selectors)

> **color** : string [(See official color documentation here)](http://developer.lifx.com/#colors)

> **from_color** : string [(See official color documentation here)](http://developer.lifx.com/#colors)

> **period** : float (Period of the waveform in seconds. Defaults to `1.0`.)

> **cycles** : float (Number of times to repeat, cycle counts) 

> **persistant** :boolean (Keep state at the end of the effect? Defaults to `false`.)

> **power_on** :boolean (Turn on first? Defaults to `true`.)

> **peak** :float (Defines where in a period the target color is at its maximum. Minimum `0.0`, maximum `1.0`.)



function pulseEffect(selector, color, from_color, period, cycles, persist, power_on, duty_cycle, cb)
---------------------------------------
> **selector** : string [(See official selector documentations here)](http://developer.lifx.com/#selectors)

> **color** : string [(See official color documentation here)](http://developer.lifx.com/#colors)

> **from_color** : string [(See official color documentation here)](http://developer.lifx.com/#colors)

> **period** : float (Period of the waveform in seconds. Defaults to `1.0`.)

> **cycles** : float (Number of times to repeat, cycle counts) 

> **persistant** :boolean (Keep state at the end of the effect? Defaults to `false`.)

> **power_on** :boolean (Turn on first? Defaults to `true`.)

> **duty_cycle** :float (Ratio of the period where color is active. Only used for pulse. Defaults to `0.5`. Minimum `0.0`, maximum `1.0`.)



