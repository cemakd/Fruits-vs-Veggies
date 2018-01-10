# Fruits-vs-Veggies
Submission for Amazon Alexa Skills Challenge: Kids 
https://devpost.com/software/fruits-vs-veggies

## Inspiration
Our inspiration was other popular Alexa skills currently doing well in the kids section of the store. We wanted to make something that had some educational value and could be fun for both parents and kids alike.
## What it does
It asks the user to tell the difference between over 100 fruits and vegetables. 
## How we built it
We build it using AWS Lambda and node.js. We also hosted the function in 3 different servers to decrease the latency for all 5 english language options in the store.
## Challenges we ran into
Since we were somewhat experienced making Alexa skill we only had to figure out how to store session attributes to keep track of which question was asked to the user.
## Accomplishments that we're proud of
We are proud of completing this over one weekend.
## What we learned
We learned how to keep track of some user data during a session without using S3 databases.
## What's next for Fruits vs Veggies
Add more fruits and veggies to the list!
