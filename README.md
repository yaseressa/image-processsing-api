## Scripts
- build:```npm run build```
- Lint: ```npm run lint```
- Prettier: ```npm run prettier```
- Run unit tests: ```npm run test```
- Start server: ```npm run start```

## Port
The server will listen on port 3000:


#### Path
http://localhost:3000/IApi/image

Expected query arguments are:
- __name__: Available filenames are:
  > encenadaport
  > fjord
  > icelandwaterfall
  > palmtunnel
  > santamonica
- __w__: numerical value > 0
- __h__: numerical value > 0

## Examples
http://localhost:3000/IApi/image
displays a hint

http://localhost:3000/IApi/image?name=fjord
displays the OG fjord image.


http://localhost:3000/IApi/image?name=fjord&w=150&h=150
converts the fjord image to 150 by 150 pixels and store the resulting image. then, serves the resized image.

#### Instruction
- the original Images are stored on images/full
- the resized ones are stored on images/out
- the Spec files are located with the same as support: spec
