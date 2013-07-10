Pi estimations using Monte Carlo methods
========================

This small Javascript application illustrates the concept of Monte Carlo method used to calculate the value of Pi.
* http://ren0.github.io/monte-carlo-pi-simulator/

It works with HTML5 canvas so make sure you don't use a retarded browser.
To run it, simply extract it locally and open monte-carlo.html in your browser.

<img src="http://imgur.com/s3l13Sx">


Pi estimations
========================

Consider a square with side equals one. The area is 1*1 = 1
Now consider a circle within the square. Radius is 0.5 so the area is Pi x Radius x Radius = Pi/4

By randomly drawing points on the board (think of throwing darts on a dartboard) we know that the ratio of points in the circle compared to the number of total points is Pi/4.
Multiply the ratio by 4 to get an approximation of Pi value.

https://en.wikipedia.org/wiki/Monte_Carlo_method


Javscript applications
========================

The application is a Single Page Applications (SPA) and makes use of AngularJS library and Twitter Bootstrap.
I recommend watching this great video for a quick overview of AngularJS:
* http://weblogs.asp.net/dwahlin/archive/2013/04/12/video-tutorial-angularjs-fundamentals-in-60-ish-minutes.aspx