# Env-Website
This is my website about environmental things.

Stage 1 is to build a solar widget
 a. It should be able to take state information and output cost and footprint info.

Stage 2 is to build a state energy profile
 a. It should be able to display in charts how the state generates its energy
 b. It should also display how the state consumes its energy
   i.  Transportation will be a large differentiator

Stage 3 is to build a footprint calculator
 a. It should have direct energy usages
   i. Utilities
   ii. Transportation
 b. It should have indirect energy usages
   i. Food
   ii. Home
   iii. Possessions
   iv. Infrastructure

Stage 4 is to start selling ads
Stage 5 is to grow users

Other ideas:
 1. Add concept of a user login and a personal energy profile
 2. Add a state seo page that has the best thing you can do to reduce your footprint


Dev note:
In order for the energySourceMap to render, I need to change line 198 in the following package node_modules/react-d3-map-bubble/lib/map.js to be "circleClass: d.properties.class"
Otherwise, all circles will be black and not be colored by energy source.

