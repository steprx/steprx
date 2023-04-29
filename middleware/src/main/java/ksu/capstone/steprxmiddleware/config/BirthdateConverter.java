//package ksu.capstone.steprxmiddleware.config;
//
//import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTypeConverter;
//import com.amazonaws.services.dynamodbv2.xspec.N;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//
//public class BirthdateConverter implements DynamoDBTypeConverter<N, Integer> {
//
//    ObjectMapper om = new ObjectMapper();
//
//    @Override
//    public N convert(Integer i) {
//        try{
//            N iValue = om.readValue(i.toString(), N.class);
//            return iValue;
//        }catch (Exception exception){
//            throw new RuntimeException(exception);
//        }
//    }
//
//    @Override
//    public Integer unconvert(N n) {
//        try{
//             String nValue = om.writeValueAsString(n.);
//             return Integer.parseInt(nValue);
//        }catch (Exception exception){
//            throw new RuntimeException(exception);
//        }
//    }
//}
