const grpc = require('grpc');
const InstrumentsGRPC = require('./.grpc_protoc_gen/instruments_grpc_pb');
const InstrumentsPB = require('./.grpc_protoc_gen/instruments_pb');

const metadata = new grpc.Metadata();

metadata.add('Authorization', 'Bearer ' + 'TOKEN');
metadata.add('x-app-name', 'lazy-nodejs');

const metadataCreds = grpc.credentials.createFromMetadataGenerator(function(args, callback) {
    callback(null, metadata);
});

const sslCreds = grpc.credentials.combineChannelCredentials(
    grpc.credentials.createSsl(),
    metadataCreds,
);

const request = new InstrumentsPB.InstrumentsRequest({
    instrumentStatus: InstrumentsPB.InstrumentStatus.INSTRUMENT_STATUS_BASE,
});
const instruments = new InstrumentsGRPC.InstrumentsServiceClient('invest-public-api.tinkoff.ru:443', sslCreds);

(async () => {
    const clientgetProfile = options => {
        return new Promise((resolve, reject) => {
            instruments.currencies(options, (error, response) => {
                if (error) { reject(error) }

                resolve(response);
            });
        });
    };

    // console.log(await clientgetProfile(request));
})();
