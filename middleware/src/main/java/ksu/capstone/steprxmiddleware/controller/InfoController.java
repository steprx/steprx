package ksu.capstone.steprxmiddleware.controller;

import ksu.capstone.steprxmiddleware.entity.PatientInfo;
import ksu.capstone.steprxmiddleware.repository.InfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "")
@RestController
public class InfoController {

    @Autowired
    private InfoRepository infoRepository;

    @GetMapping("/")
    public String welcome(){
        return "Welcome to StepRx middleware!";
    }

    @PostMapping("/info/save")
    public Object savePatientInfo(@RequestBody PatientInfo patientInfo) {
        return infoRepository.save(patientInfo);
    }

    @GetMapping("/info/get/all")
    public Object getAll() {
        return infoRepository.getAll();
    }

    @GetMapping("/info/uuid/{uuid}")
    public Object getPatientInfo(@PathVariable("uuid") String uuid) {
        return infoRepository.getPatientInfoById(uuid);
    }

    @DeleteMapping("/info/uuid/{uuid}")
    public Object deletePatientInfo(@PathVariable("uuid") String uuid) {
        return  infoRepository.delete(uuid);
    }

//    @PutMapping("/info/update")
//    public Object updatePatientInfo(@RequestBody PatientInfo patientInfo) {
//        return infoRepository.save(patientInfo);
//    }
}
