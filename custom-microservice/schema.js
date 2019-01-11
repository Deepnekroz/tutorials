const avroSchema = {
  namespace: 'org.kaaproject.ipc.tstp.gen.v1',
  name: 'TimeSeriesEvent',
  type: 'record',
  fields: [
    {
      name: 'correlationId',
      type: 'string',
      doc: 'Message ID primarily used to track message processing across services'
    },
    {
      name: 'timestamp',
      type: 'long',
      doc: 'Message creation UNIX timestamp in milliseconds'
    },
    {
      name: 'timeout',
      type: 'long',
      default: 0,
      doc: 'Amount of milliseconds since the timestamp until the message expires. Value of 0 is reserved to indicate no expiration.'
    },
    {
      name: 'appVersionName',
      type: 'string',
      doc: 'Application version name the data is sent for'
    },
    {
      name: 'endpointId',
      type: 'string',
      doc: 'Identifier of the endpoint that data points belong to'
    },
    {
      name: 'timeSeriesName',
      type: 'string',
      doc: 'Name of the time series that data points belong to'
    },
    {
      name: 'dataPoints',
      doc: 'Array of endpoint time series data points',
      type: {
        type: 'array',
        items: {
          namespace: 'org.kaaproject.ipc.tstp.gen.v1',
          name: 'DataPoint',
          type: 'record',
          fields: [
            {
              name: 'timestamp',
              type: 'long',
              doc: 'Data point UNIX timestamp in milliseconds'
            },
            {
              name: 'contentType',
              type: [
                'string',
                'null'
              ],
              default: 'null',
              doc: 'Type of the value in case of a composite type'
            },
            {
              name: 'value',
              type: [
                'boolean',
                'int',
                'long',
                'float',
                'double',
                'string',
                'bytes',
                'null'
              ],
              doc: 'Data point value, can be any primitive or composite type. In case of a composite type, value should be encoded into string or bytes.'
            },
            {
              name: 'tags',
              doc: 'Map of data point tags with tag names represented as map keys',
              type: {
                type: 'map',
                values: {
                  namespace: 'org.kaaproject.ipc.tstp.gen.v1',
                  name: 'DataPointTagValue',
                  type: 'record',
                  fields: [
                    {
                      name: 'contentType',
                      type: [
                        'string',
                        'null'
                      ],
                      default: 'null',
                      doc: 'Type of the value in case of a composite type'
                    },
                    {
                      name: 'value',
                      type: [
                        'boolean',
                        'int',
                        'long',
                        'float',
                        'double',
                        'string',
                        'bytes',
                        'null'
                      ],
                      doc: 'Data point tag value, can be any primitive or composite type. In case of a composite type, value should be encoded into string or bytes.'
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  ]
};

module.exports.avroSchema = avroSchema;