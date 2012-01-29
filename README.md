#USC Web Workshop

##Day 1: Introductions
	An introduction to my work and the work of others
		Links:
		(my work): http://timespentalone.com/
		(also me): http://sansumbrella.com/
		arcade fire: http://www.thewildernessdowntown.com/
		ellie goudling: http://lights.elliegoulding.com/
		Ryan Alexander: http://notlion.github.com/streetview-stereographic/

	An introduction to html5. What is it?
		Plain text files with a .html extension
		A bunch of nested <tags> describing the document structure
		Most of the stuff in html4
			text, image, and form elements
		New html tags for multimedia
			video
			audio
			canvas
		New html tags for page structure
			section, article, nav, header, footer
		A new (simplified) standard
			<!doctype html>
			not totally supported (yes, there are older browsers out there)
			consider html5 boilerplate
		New ways of storing data
			Local databases
		Some implied technologies (not actually html5)
			WebGL, WebAudio
			geolocation
			newer, faster javascript
			CSS3 (including animation)
		Good Resources
			https://developer.mozilla.org/en/HTML/HTML5
			http://www.html5rocks.com/en/
			http://popcornjs.org/
  

##Day 2: Doing something with Javascript
	Your working environment:
		A modern browser: Chrome/Firefox/Safari
		Browser console for hacking and debugging
		A text editor: TextMate, SublimeText2, TextWrangler, gEdit, emacs, what-have-you
	Javascript basics:
		Numbers
			you can type them in!
			you can do math: +, -, /, *, %
		Text (Strings)
			you can type them in!
			you can combine them: +
			you can inspect them: charAt, indexOf
			you can transform them: toLowerCase, toUpperCase
		Variables
			Remembering those numbers and strings
			Modifying them later
	Drawing with javascript + html5 canvas:
		Our canvas lives in a variable
		Hello, Canvas!
			Drawing a circle
	More advanced javascript:
		Functions
			variables you can call on to do things
		Scope and closures
			{ things exist where you create them }
		Objects
			{ associate groups of variables and functions }
		Arrays
			[ list of variables ]
		Where did those String and Number methods come from?
			looking at __proto__
	Resources
		https://developer.mozilla.org/en/JavaScript
		http://simon.html5.org/dump/html5-canvas-cheat-sheet.html
		http://jquery.com/


##Day 3: Audio and Graphics close to the metal
	WebAudio
		Play sounds with stereo panning.
		Get spectral data from audio for visualization
		Resources:
			http://www.html5rocks.com/en/tutorials/webaudio/intro/
			https://wiki.mozilla.org/Audio_Data_API
	WebGL (maybe, might stick with canvas for visualizing this audio)
		Drawing a triangle
			Vbo: color, positions
			Glsl Program: determine how your triangle gets drawn
		Moving the triangle
			matrix translate, rotate
		Resources:
			http://learningwebgl.com/blog/?page_id=1217


##Day 4 Making a music visualizer with 3.js
	Three.js: 3d scenes and animation
		3d scenes, cameras, and whatnot
		make a grid of 3d objects (spheres, cubes, whatever)
		texture the objects
		(maybe) manipulate them with a shader
	Bring back our audio player from previous week
		plug data in to the 3d scene
	Resources
		http://www.html5rocks.com/en/tutorials/three/intro/
		http://www.html5rocks.com/en/tutorials/webgl/shaders/
		https://github.com/mrdoob/three.js
