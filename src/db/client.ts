import cassandra from "cassandra-driver";
import config from 'config';
import { CassandraConfig } from '../config/CassandraConfig';


const cassandraConfig: CassandraConfig = config.get("cassandra")

const CASSANDRA: cassandra.DseClientOptions = {
    contactPoints: cassandraConfig.contactPoints,
    localDataCenter: cassandraConfig.localDataCenter,
    credentials: cassandraConfig.credentials,
    keyspace: cassandraConfig.keyspace,
};


export const client = new cassandra.Client(CASSANDRA);