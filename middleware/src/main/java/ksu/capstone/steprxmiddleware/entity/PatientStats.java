package ksu.capstone.steprxmiddleware.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@DynamoDBTable(tableName = "weigh_ins")
//@DynamoDBDocument
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientStats {
    @DynamoDBHashKey(attributeName = "uuid")
    private String uuid;
    @DynamoDBRangeKey(attributeName = "date")
    private String date;
    @DynamoDBAttribute(attributeName = "bodyFat")
    private String bodyFat;
    @DynamoDBAttribute(attributeName = "heightFt")
    private String heightFt;
    @DynamoDBAttribute(attributeName = "heightIn")
    private String heightIn;
    @DynamoDBAttribute(attributeName = "neck")
    private String neck;
    @DynamoDBAttribute(attributeName = "targetWeightLoss")
    private String targetWeightLoss;
    @DynamoDBAttribute(attributeName = "waist")
    private String waist;
    @DynamoDBAttribute(attributeName = "weight")
    private String weight;

    // getters and setters provided by Lombok
}
