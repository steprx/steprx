package ksu.capstone.steprxmiddleware.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import ksu.capstone.steprxmiddleware.entity.PatientSteps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class StepsRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public ResponseEntity<?> save(PatientSteps patientSteps) {
        try{
            dynamoDBMapper.save(patientSteps);
            return new ResponseEntity<>(patientSteps, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<List<PatientSteps>> getAll() {
        try{
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
            return new ResponseEntity<>(dynamoDBMapper.scan(PatientSteps.class, scanExpression), HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<PatientSteps>> getPatientStepsByUuid(String uuid) {
        try{
            List<PatientSteps> patientSteps = this.getAll().getBody();
            if(patientSteps != null){
                patientSteps = patientSteps.stream().filter(steps -> steps.getUuid().equalsIgnoreCase(uuid))
                        .collect(Collectors.toList());
            }
            if(patientSteps == null || patientSteps.size() < 1) throw new Exception("Not Found!");
            return new ResponseEntity<>(patientSteps, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<PatientSteps> getPatientStepsById(String uuid, String date) {
        try{
            PatientSteps patientSteps = dynamoDBMapper.load(PatientSteps.class, uuid, date);
            if(patientSteps == null) throw new Exception("Not Found!");
            return new ResponseEntity<>(patientSteps, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public Object delete(String uuid, String date) {
        try{
            PatientSteps patientSteps = dynamoDBMapper.load(PatientSteps.class, uuid, date);
            if(patientSteps == null) throw new Exception("Not Found!");
            dynamoDBMapper.delete(patientSteps);
            return new ResponseEntity<>("PatientSteps deleted successfully!", HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }

    }

    public String updateX(String uuid, String date, PatientSteps patientSteps) {
        dynamoDBMapper.save(patientSteps,
                new DynamoDBSaveExpression()
        .withExpectedEntry("uuid",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(uuid)
                )));
        return uuid;
    }
}
