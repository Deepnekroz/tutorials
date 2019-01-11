const { avroSchema } = require('./schema.js');

var NATS = require('nats');
var avro = require('avsc');

//Avro schema for TSTP protocol. More info: https://github.com/kaaproject/kaa-rfcs/blob/master/0014/README.md
const schema = avroSchema;
const nats = NATS.connect({'url': 'nats://localhost:4222', 'preserveBuffers': true});
const type = avro.parse(JSON.stringify(schema), {wrapUnions: true});
let subjectForSubscription = `kaa.v1.events.epts.endpoint.data-collection.data-points-received.Logs`;
//Listen for messages from EPTS
nats.subscribe(subjectForSubscription, function(msg) {
    console.log('Message received: ', type.toString(type.fromBuffer(msg)));
});
//Publish message to EPTS. 'test' part stands for the name of TSTP transmitter configured in this merge request: https://gitlab.21ba.kaaiot.net/trial/blueprint/merge_requests/2
//See EPTS docs for more information: https://docs.kaaiot.io/EPTS/docs/current/Overview/
let subjectForPublish = `kaa.v1.events.test.endpoint.data-collection.data-points-received.Logs`;
const message = {
    correlationId: Math.random().toString(36).substring(7),
    timestamp: 0,
    appVersionName: 'demo_application_v1',
    endpointId: 'qwerty12345678',
    timeSeriesName: 'Logs',
    dataPoints: [{
        timestamp: 1875943753,
        value: {string: "1"},
        tags: new Map()
    }]
};
const buf = type.toBuffer(message);
nats.publish(subjectForPublish, buf);