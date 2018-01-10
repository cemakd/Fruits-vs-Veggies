exports.handler = (event, context) => {

  try {
    var session = event.session;
    var plantList = [
      {"name" : "potato", "type" : "vegetable" },
      {"name" : "okra", "type" : "vegetable" },
      {"name" : "spinach", "type" : "vegetable" },
      {"name" : "broccoli", "type" : "vegetable" },
      {"name" : "celery", "type" : "vegetable" },
      {"name" : "carrot", "type" : "vegetable" },
      {"name" : "ginger", "type" : "vegetable" },
      {"name" : "beet", "type" : "vegetable" },
      {"name" : "artichoke", "type" : "vegetable" },
      {"name" : "chickpea", "type" : "vegetable" },
      {"name" : "green bean", "type" : "vegetable" },
      {"name" : "lentil", "type" : "vegetable" },
      {"name" : "soy bean", "type" : "vegetable" },
      {"name" : "brussel sprout", "type" : "vegetable" },
      {"name" : "cabbage", "type" : "vegetable" },
      {"name" : "cauliflower", "type" : "vegetable" },
      {"name" : "chard", "type" : "vegetable" },
      {"name" : "fennel", "type" : "vegetable" },
      {"name" : "anise", "type" : "vegetable" },
      {"name" : "basil", "type" : "vegetable" },
      {"name" : "cilantro", "type" : "vegetable" },
      {"name" : "dill", "type" : "vegetable" },
      {"name" : "lavender", "type" : "vegetable" },
      {"name" : "oregano", "type" : "vegetable" },
      {"name" : "parsley", "type" : "vegetable" },
      {"name" : "rosemary", "type" : "vegetable" },
      {"name" : "sage", "type" : "vegetable" },
      {"name" : "thyme", "type" : "vegetable" },
      {"name" : "kale", "type" : "vegetable" },
      {"name" : "lettuce", "type" : "vegetable" },
      {"name" : "corn", "type" : "vegetable" },
      {"name" : "chive", "type" : "vegetable" },
      {"name" : "garlic", "type" : "vegetable" },
      {"name" : "leek", "type" : "vegetable" },
      {"name" : "onion", "type" : "vegetable" },
      {"name" : "shallot", "type" : "vegetable" },
      {"name" : "turnip", "type" : "vegetable" },
      {"name" : "radish", "type" : "vegetable" },
      {"name" : "wasabi", "type" : "vegetable" },
      {"name" : "horseradish", "type" : "vegetable" },
      {"name" : "sweet potato", "type" : "vegetable" },
      {"name" : "water chestnut", "type" : "vegetable" },
      {"name" : "zucchini", "type" : "vegetable" },
      {"name" : "apple", "type" : "fruit" },
      {"name" : "apricot", "type" : "fruit" },
      {"name" : "avocado", "type" : "fruit" },
      {"name" : "banana", "type" : "fruit" },
      {"name" : "blackberry", "type" : "fruit" },
      {"name" : "blueberry", "type" : "fruit" },
      {"name" : "cherry", "type" : "fruit" },
      {"name" : "coconut", "type" : "fruit" },
      {"name" : "cranberry", "type" : "fruit" },
      {"name" : "cucumber", "type" : "fruit" },
      {"name" : "date", "type" : "fruit" },
      {"name" : "dragonfruit", "type" : "fruit" },
      {"name" : "durian", "type" : "fruit" },
      {"name" : "elderberry", "type" : "fruit" },
      {"name" : "fig", "type" : "fruit" },
      {"name" : "goji berry", "type" : "fruit" },
      {"name" : "gooseberry", "type" : "fruit" },
      {"name" : "grape", "type" : "fruit" },
      {"name" : "grapefruit", "type" : "fruit" },
      {"name" : "guava", "type" : "fruit" },
      {"name" : "jackfruit", "type" : "fruit" },
      {"name" : "kiwi", "type" : "fruit" },
      {"name" : "kumquat", "type" : "fruit" },
      {"name" : "lemon", "type" : "fruit" },
      {"name" : "lychee", "type" : "fruit" },
      {"name" : "mango", "type" : "fruit" },
      {"name" : "melon", "type" : "fruit" },
      {"name" : "honeydew", "type" : "fruit" },
      {"name" : "watermelon", "type" : "fruit" },
      {"name" : "nectarin", "type" : "fruit" },
      {"name" : "chili pepper", "type" : "fruit" },
      {"name" : "olive", "type" : "fruit" },
      {"name" : "orange", "type" : "fruit" },
      {"name" : "clementine", "type" : "fruit" },
      {"name" : "mandarin", "type" : "fruit" },
      {"name" : "tangerine", "type" : "fruit" },
      {"name" : "papaya", "type" : "fruit" },
      {"name" : "passionfruit", "type" : "fruit" },
      {"name" : "peach", "type" : "fruit" },
      {"name" : "pear", "type" : "fruit" },
      {"name" : "plantain", "type" : "fruit" },
      {"name" : "plum", "type" : "fruit" },
      {"name" : "pineapple", "type" : "fruit" },
      {"name" : "pomegranate", "type" : "fruit" },
      {"name" : "raspberry", "type" : "fruit" },
      {"name" : "rambutan", "type" : "fruit" },
      {"name" : "strawberry", "type" : "fruit" },
      {"name" : "butternut squash", "type" : "fruit" },
      {"name" : "eggplant", "type" : "fruit" },
      {"name" : "tomato", "type" : "fruit" },
      {"name" : "pea", "type" : "fruit" },
      {"name" : "bean", "type" : "fruit" },
      {"name" : "pepper", "type" : "fruit" },
      {"name" : "pumpkin", "type" : "fruit" }
    ];
    var plantIndex = 0;
    
    if (event.session.new) {
      // New Session
      console.log("NEW SESSION");
      session.attributes = {"plantIndex" : -1};
    }

    switch (event.request.type) {

      case "LaunchRequest":
        // Launch Request
        console.log(`LAUNCH REQUEST`);
        context.succeed(
          generateResponse(
            buildSpeechletResponse("Welcome to fruits versus veggies! Ready to test your knowledge?", 
              false)
          )
        );
        break;

      case "IntentRequest":
        // Intent Request
        console.log("YES INTENT REQUEST");
        switch(event.request.intent.name) {
          case "AMAZON.YesIntent":
            if (session.attributes == undefined) {
              session.attributes = {"plantIndex" : -1};
            }
            if (session.attributes.plantIndex == -1) {
              var totalOptions = plantList.length;
              var plantIndex = getRandomInt(0, plantList.length);
              session.attributes = {"plantIndex" : plantIndex};
              buildResponseWithSessionAttribute(context, 
                "Is a " + plantList[plantIndex].name + " a fruit?", 
                false, {"plantIndex" : plantIndex});
            }
            else {
              var plantIndex = session.attributes.plantIndex;
              // session.attributes.plantIndex = -1;
              if (plantList[plantIndex].type == "fruit") {
                buildResponseWithSessionAttribute(context, "Yay!, You are right!" + 
                  plantList[plantIndex].name + " is a fruit! Do you want another question?", 
                  false, {"plantIndex" : -1});
              }
              else {
                buildResponseWithSessionAttribute(context, "Oh no!" + 
                  plantList[plantIndex].name + " is actually a vegetable. Would you like another question?", 
                  false, {"plantIndex" : -1});
              }
            }
            break;
          case "AMAZON.NoIntent":
            if (session.attributes.plantIndex != -1) {
              var plantIndex = session.attributes.plantIndex;
              session.attributes.plantIndex = -1;
              if (plantList[plantIndex].type == "vegetable") {
                buildResponseWithSessionAttribute(context, "Yay!, You are right!" + 
                  plantList[plantIndex].name + " is a vegetable! Do you want another question?", 
                  false, {"plantIndex" : -1});
              }
              else {
                buildResponseWithSessionAttribute(context, "Oh no!" + 
                  plantList[plantIndex].name + " is actually a fruit. Would you like another question?", 
                  false, {"plantIndex" : -1});
              }
            }
            else {
              var exitResponses = [
                "Launch me again when you are ready!",
                "Thanks for playing!",
                "Thanks! If you enjoyed playing please rate me in the Alexa app.",
                "See you next time!",
                "Hope to see you again soon!",
                "Alright, I wish you had fun!"
              ];
              var randomNum = getRandomInt(0, exitResponses.length);
              buildResponse(context, exitResponses[randomNum], true);
            }
            break;
          case "AMAZON.HelpIntent":
            buildResponse(context, "Want to test your knowledge in botanically classifying plants? " +
              "I'll ask you to distinguish fruits and vegetables from each other and " +
              "you can test your knowledge. Are you ready to play?", false);
            break;
          case "AMAZON.CancelIntent":
            buildResponse(context, "", true);
            break;
          case "AMAZON.StopIntent":
            buildResponse(context, "", true);
            break;          
          default:
            throw "Invalid intent"
        }
        break;
      case "SessionEndedRequest":
        // Session Ended Request
        console.log(`SESSION ENDED REQUEST`)
        break;
      default:
        context.fail(`INVALID REQUEST TYPE: ${event.request.type}`)

    }

  } catch(error) { context.fail(`Exception: ${error}`) }

}

// Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }
}

buildSpeechletReprompt = (outputText, shouldEndSession) => {
  return {
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: outputText
      },
      shouldEndSession: shouldEndSession
    }
  }
}

generateResponse = (speechletResponse, sessionAttributes) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}

buildResponse = (context, output, shouldEndSession) => {
  context.succeed(
    generateResponse(
      buildSpeechletResponse(output, shouldEndSession)
    )
  );
}

buildResponseWithSessionAttribute = (context, output, shouldEndSession, sessionAttributes) => {
  context.succeed(
    generateResponse(
      buildSpeechletResponse(output, shouldEndSession),
      sessionAttributes
    )
  );
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
