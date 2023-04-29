package ksu.capstone.steprxmiddleware.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import ksu.capstone.steprxmiddleware.entity.PatientInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

@Repository
public class InfoRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Object save(PatientInfo patientInfo) {
        try {
            dynamoDBMapper.save(patientInfo);
            return new ResponseEntity<>(patientInfo, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public Object getAll() {
        try{
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
            Object infos = dynamoDBMapper.scan(PatientInfo.class, scanExpression);
            return new ResponseEntity<>(infos, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.NOT_FOUND);
        }

    }

    public Object getPatientInfoById(String uuid) {
        try{
            PatientInfo patientInfo = dynamoDBMapper.load(PatientInfo.class, uuid);
            if(patientInfo == null) throw new Exception("Not Found!");
            return new ResponseEntity<>(patientInfo, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public Object delete(String uuid) {
        try{
            PatientInfo patientInfo = dynamoDBMapper.load(PatientInfo.class, uuid);
            if(patientInfo == null) throw new Exception("Not Found!");
            dynamoDBMapper.delete(patientInfo);
            return new ResponseEntity<>("PatientInfo deleted successfully!", HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public String updateX(String uuid, PatientInfo patientInfo) {
        dynamoDBMapper.save(patientInfo,
                new DynamoDBSaveExpression()
                        .withExpectedEntry("uuid",
                                new ExpectedAttributeValue(
                                        new AttributeValue().withS(uuid)
                                )));
        return uuid;
    }
}
