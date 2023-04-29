package ksu.capstone.steprxmiddleware.entity;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBRangeKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@DynamoDBTable(tableName = "steps")
//@DynamoDBDocument
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientSteps {
        @DynamoDBHashKey(attributeName = "uuid")
        private String uuid;
        @DynamoDBRangeKey(attributeName = "date")
        private String date;
        @DynamoDBAttribute(attributeName = "steps")
        private String steps;

        // getters and setters provided by Lombok
}
