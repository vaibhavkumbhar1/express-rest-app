import cassandra from "cassandra-driver";

const CASSANDRA: cassandra.DseClientOptions = {
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    credentials: {
        username: '',
        password: '',
    },
    keyspace: 'test',
};


export const client = new cassandra.Client(CASSANDRA);