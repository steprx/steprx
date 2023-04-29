package ksu.capstone.steprxmiddleware.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverted;
import com.amazonaws.services.dynamodbv2.xspec.N;
//import ksu.capstone.steprxmiddleware.config.BirthdateConverter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@DynamoDBTable(tableName = "user_info")
//@DynamoDBDocument
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientInfo {
    @DynamoDBHashKey(attributeName = "uuid")
    private String uuid;
    @DynamoDBAttribute(attributeName = "birthdate")
//    @DynamoDBTypeConverted(converter = BirthdateConverter.class)
    private String birthdate;
    @DynamoDBAttribute(attributeName = "sex")
    private String sex;

    // getters and setters provided by Lombok
}
