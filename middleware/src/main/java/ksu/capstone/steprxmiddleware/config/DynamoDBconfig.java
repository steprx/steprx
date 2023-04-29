package ksu.capstone.steprxmiddleware.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DynamoDBconfig {
    @Value("${steprx.amazon.aws.accessKey}")
    private String accessKey;
    @Value("${steprx.amazon.aws.secretKey}")
    private String secretKey;
    @Value("${steprx.amazon.aws.serviceEndpoint}")
    private String serviceEndpoint;
    @Value("${steprx.amazon.aws.signingRegion}")
    private String signingRegion;

    @Bean
    public DynamoDBMapper dynamoDBMapper() {
        return new DynamoDBMapper(amazonDynamoDbBuilder());
    }

    private AmazonDynamoDB amazonDynamoDbBuilder() {
        return AmazonDynamoDBClientBuilder
                .standard()
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration(
                                this.serviceEndpoint,
                                this.signingRegion
                        )
                )
                .withCredentials(
                        new AWSStaticCredentialsProvider(
                                new BasicAWSCredentials(
                                        this.accessKey,
                                        this.secretKey
                                )
                        )
                )
                .build();
    }
}
