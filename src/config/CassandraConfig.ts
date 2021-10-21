export interface CassandraConfig{
    contactPoints:string[];
    localDataCenter:string;
    credentials:{
        username:string,
        password:string
    };
    keyspace:string;
}