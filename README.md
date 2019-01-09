# Maze Escape

## A NodeJS implementation of Tremaux' Algorithm

### Description

This is a NodeJS/Express REST API that solves any bidimensional matrix representing a maze from a starting point coordinates to an open edge.
It uses the Tremaux' Algorithm and it can demonstrate also if the maze has no exit.
It doesn't have a finished strategy for finding the shortest path, but calling the API multiple times will generate different solutions (stored on the output variable "path") so it is possible to save the solutions and repeat the call n times to get a reasonable number of solutions to be ordered by their lengths so to discover the shortest.

#### Input

METHOD: HTTP GET OR POST
PARAMS (get or post): 
- startingpoint (string) in JSON format: [y,x] (example '[0,4]')
- matrix (string) in JSON format: (example '[["X","X","X","X","O","X","X"],["X","O","O","O","O","X","X"],["X","O","X","X","X","X","X"],["X","O","O","O","O","O","O"],["X","O","X","X","X","X","X"]]')

The "matrix" represents the maze:
X: wall
O: open cell

#### Output

- result (int)
- message (string)
- matrixsolved: (array)
- path: (array)

In particular "path" object is the array of coordinates to get the solution



### Quick Start

Clone or download the repository

open terminal

> cd [the repository folder]


> npm install


> node index.js


#### GET
Then open your browser and point to:
http://localhost:3000/?startingpoint=[0,4]&matrix=[%20[%22X%22,%22X%22,%22X%22,%22X%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22O%22,%22O%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22X%22,%22X%22,%22X%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22O%22,%22O%22,%22O%22,%22O%22,%22O%22],%20[%22X%22,%22O%22,%22X%22,%22X%22,%22X%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22O%22,%22O%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22X%22,%22X%22,%22X%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22X%22,%22X%22,%22X%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22O%22,%22O%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22X%22,%22X%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22O%22,%22O%22,%22O%22,%22X%22,%22X%22],%20[%22X%22,%22O%22,%22X%22,%22X%22,%22X%22,%22X%22,%22X%22],%20[%22X%22,%22X%22,%22X%22,%22X%22,%22X%22,%22X%22,%22X%22]%20]

Or

If you want to quick test it on your terminal using cUrl, just run the following command:

>curl --request GET \
>  --url 'http://localhost:3000/?startingpoint=%5B0%2C4%5D&>matrix=%5B%5B%22X%22%2C%22X%22%2C%22X%22%2C%22X%22%2C%22O%22%2C%22X%22%2C%22X%22%5D%2C%5B%22X%22%2C%22O%22%2C%22O%22%2C%22O%22%2C%22O%22%2>C%22X%22%2C%22X%22%5D%2C%5B%22X%22%2C%22O%22%2C%22X%22%2C%22X%22%2C%22X%22%2C%22X%22%2C%22X%22%5D%2C%5B%22X%22%2C%22O%22%2C%22O%22%2C%22O%>22%2C%22O%22%2C%22O%22%2C%22O%22%5D%2C%5B%22X%22%2C%22O%22%2C%22X%22%2C%22X%22%2C%22X%22%2C%22X%22%2C%22X%22%5D%5D'



#### POST
If you want to test it with large arrays, please use POST on your REST API Test Client (such as Insomnia or Postman)
Or on your terminal, using cUrl:


>curl --request POST \
>  --url http://localhost:3000/ \
>  --header 'content-type: application/json' \
>  --data '{
>	"matrix": [["X","X","X","X","O","X","X"],["X","O","O","O","O","X","X"],["X","O","X","X","X","X","X"],["X","O","O","O","O","O","O"],>["X","O","X","X","X","X","X"],["X","O","O","O","O","X","X"],["X","X","X","X","O","X","X"],["X","X","X","X","O","X","X"],["X","O","O",>"O","O","X","X"],["X","O","X","X","O","X","X"],["X","O","O","O","O","X","X"],["X","O","X","X","X","X","X"],["X","X","X","X","X","X",>"X"]],
>	"startingpoint": [0,4]
>}'


## Notes

The algorithm will be truncated after 10000 iterations to prevent ram overflows.
If needed this param can be changed on index.js at line 96

