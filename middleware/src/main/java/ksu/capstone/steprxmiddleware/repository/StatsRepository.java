package ksu.capstone.steprxmiddleware.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import ksu.capstone.steprxmiddleware.entity.PatientStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class StatsRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public Object save(PatientStats patientStats) {
        try{
            dynamoDBMapper.save(patientStats);
            return new ResponseEntity<>(patientStats, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<List<PatientStats>> getAll() {
        try{
            DynamoDBScanExpression scanExpression = new DynamoDBScanExpression();
            return new ResponseEntity<>(dynamoDBMapper.scan(PatientStats.class, scanExpression), HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<List<PatientStats>> getPatientStatsByUuid(String uuid) {
        try{
            List<PatientStats> patientStats = this.getAll().getBody();
            if(patientStats != null){
                patientStats = patientStats.stream().filter(steps -> steps.getUuid().equalsIgnoreCase(uuid))
                        .collect(Collectors.toList());
            }
            if(patientStats == null || patientStats.size() < 1) throw new Exception("Not Found!");
            return new ResponseEntity<>(patientStats, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<PatientStats> getPatientStatsById(String uuid, String date) {
        try{
            PatientStats patientStats = dynamoDBMapper.load(PatientStats.class, uuid, date);
            if(patientStats == null) throw new Exception("Not Found!");
            return new ResponseEntity<>(patientStats, HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public Object delete(String uuid, String date) {
        try{
            PatientStats patientStats = dynamoDBMapper.load(PatientStats.class, uuid, date);
            if(patientStats == null) throw new Exception("Not Found!");
            dynamoDBMapper.delete(patientStats);
            return new ResponseEntity<>("PatientStats deleted successfully!", HttpStatus.OK);
        }catch (Exception exception){
            exception.printStackTrace();
            return new ResponseEntity<>(exception.getLocalizedMessage(), HttpStatus.EXPECTATION_FAILED);
        }

    }

    public String updateX(String uuid, String date, PatientStats patientStats) {
        dynamoDBMapper.save(patientStats,
                new DynamoDBSaveExpression()
        .withExpectedEntry("uuid",
                new ExpectedAttributeValue(
                        new AttributeValue().withS(uuid)
                )));
        return uuid;
    }
}
