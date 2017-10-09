# v-ripple

> material ripple effect vue directive

## Example

``` html
 <button v-ripple>{{msg}}</button>
 or
 <button v-ripple="{color:'#222',duration:500}">{{msg}}</button>
```

## Config

``` js
 {
   class: '', // Animation container className
   center: false, // Position of animation
   duration: 400, // Duration of animation  (unit: ms)
   color: 'currentColor', // Background color of Animation
   radius: '', // Radius of Animation ( default: the longer between width and height )
 }
```