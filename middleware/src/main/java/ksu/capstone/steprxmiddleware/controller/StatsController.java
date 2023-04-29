package ksu.capstone.steprxmiddleware.controller;

import ksu.capstone.steprxmiddleware.entity.PatientStats;
import ksu.capstone.steprxmiddleware.repository.StatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*", allowCredentials = "")
@RestController
public class StatsController {

    @Autowired
    private StatsRepository statsRepository;

    @PostMapping("/stats/save")
    public Object savePatientStats(@RequestBody PatientStats patientStats) {
        return statsRepository.save(patientStats);
    }

    @GetMapping("/stats/get/all")
    public Object getAll() {
        return statsRepository.getAll();
    }


    @GetMapping("/stats/uuid/{uuid}")
    public Object getPatientStatsByUuid(@PathVariable("uuid") String uuid) {
        return statsRepository.getPatientStatsByUuid(uuid);
    }

    @GetMapping("/stats/uuid/date/{uuid}/{date}")
    public Object getPatientStats(@PathVariable("uuid") String uuid,
                                        @PathVariable("date") String date) {
        return statsRepository.getPatientStatsById(uuid, date);
    }

    @DeleteMapping("/stats/uuid/date/{uuid}/{date}")
    public Object deletePatientStats(@PathVariable("uuid") String uuid,
                                     @PathVariable("date") String date) {
        return  statsRepository.delete(uuid, date);
    }

//    @PutMapping("/stats/uuid/date/{uuid}/{date}")
//    public String updatePatientStats(@PathVariable("uuid") String uuid,
//                                     @PathVariable("date") String date,
//                                     @RequestBody PatientStats patientStats) {
//        return statsRepository.updateX(uuid, date, patientStats);
//    }
}
