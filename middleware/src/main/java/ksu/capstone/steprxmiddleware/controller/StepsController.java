package ksu.capstone.steprxmiddleware.controller;

import ksu.capstone.steprxmiddleware.entity.PatientSteps;
import ksu.capstone.steprxmiddleware.repository.StepsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "")
@RestController
public class StepsController {

    @Autowired
    private StepsRepository stepsRepository;

    @PostMapping("/steps/save")
    public Object savePatientSteps(@RequestBody PatientSteps patientSteps) {
        return stepsRepository.save(patientSteps);
    }

    @GetMapping("/steps/get/all")
    public Object getAll() {
        return stepsRepository.getAll();
    }

    @GetMapping("/steps/uuid/date/{uuid}/{date}")
    public Object getPatientSteps(@PathVariable("uuid") String uuid,
                                        @PathVariable("date") String date) {
        return stepsRepository.getPatientStepsById(uuid, date);
    }

    @GetMapping("/steps/uuid/{uuid}")
    public Object getPatientStepsByUuid(@PathVariable("uuid") String uuid) {
        return stepsRepository.getPatientStepsByUuid(uuid);
    }

    @DeleteMapping("/steps/uuid/date/{uuid}/{date}")
    public Object deletePatientSteps(@PathVariable("uuid") String uuid,
                                     @PathVariable("date") String date) {
        return  stepsRepository.delete(uuid, date);
    }

//    @PutMapping("/steps/uuid/date/{uuid}/{date}")
//    public String updatePatientSteps(@PathVariable("uuid") String uuid,
//                                     @PathVariable("date") String date,
//                                     @RequestBody PatientSteps patientSteps) {
//        return stepsRepository.updateX(uuid, date, patientSteps);
//    }
}
