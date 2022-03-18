"use strict";

module.exports.hello = async(event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
                message: "Hallo Welt",
                input: event,
            },
            null,
            2
        ),
    };
};

module.exports.handler = async function(event, context) {
    event.Records.forEach(record => {
        console.log(record)
    });
    return {};
}