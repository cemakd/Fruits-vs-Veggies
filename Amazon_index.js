exports.handler = (event, context) => {

  try {
    var session = event.session;
    var plantList = [
      {"name" : "tomato", "type" : "fruit" },
      {"name" : "potato", "type" : "vedgetable" },
      {"name" : "banana", "type" : "fruit" },
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
              if (plantList[plantIndex].type == "fruit") {
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
            buildResponse(context, "Want to test your knowledge in classifying plants? " +
              "I'll ask you to distinguish fruits and vedgetables from each other and " +
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
