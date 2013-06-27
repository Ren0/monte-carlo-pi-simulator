monte-carlo-pi-simulator
========================

This small Javascript application illustrates the concept of Monte Carlo method.
http://ren0.github.io/monte-carlo-pi-simulator/

It works with HTML5 canvas so makes sure you are using a compatible browser.


How it works
========================

Consider a square with side equals one. The area is 1*1 = 1
Now consider a circle within the square. Radius is 1/2 so the area is Pi*R*R = Pi/4

By randomly drawing points on the board (think of throwing darts on a dartboard) we know that the ratio of points in the circle compared to the number of total points is Pi/4.
Multiply the ratio by 4 to get an approximation of Pi value.

https://en.wikipedia.org/wiki/Monte_Carlo_method
