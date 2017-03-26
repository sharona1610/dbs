console.log('helo');
function publish() {

    pubnub = new PubNub({
        publishKey : 'pub-c-1225a3ef-1e8e-48ea-a71c-e00c44088fab',
        subscribeKey : 'sub-c-b99fad52-117a-11e7-ab7b-02ee2ddab7fe'
    })

    function publishSampleMessage() {
        console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
        var publishConfig = {
            channel : "hello_world",
            message : "Hello from PubNub Docs!"
        }
        pubnub.publish(
            {
                message: {
                    such: 'object'
                },
                channel: 'ch1',
                sendByPost: false, // true to send via post
                storeInHistory: false, //override default storage options
                meta: {
                    "cool": "meta"
                } // publish extra meta with the request
            },
            function (status, response) {
                // handle status, response
                console.log(response);
            }
        );
    }

    pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                publishSampleMessage();
            }
        },
        message: function(message) {
            console.log("New Message!!", message);
            var channelName = m.channel; // The channel for which the message belongs
            var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
            var pubTT = m.timetoken; // Publish timetoken
            var msg = m.message; // The Payload
        },
        presence: function(presenceEvent) {
          var channelName = p.channel; // The channel for which the message belongs
      var occupancy = p.occupancy; // No. of users connected with the channel
      var state = p.state; // User State
      var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
      var publishTime = p.timestamp; // Publish timetoken
      var timetoken = p.timetoken;  // Current timetoken
      var uuid = p.uuid; // UUIDs of users who are connected with the channel
        }
    })
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['hello_world']
    });
};
publish()
