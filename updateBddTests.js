       /**
         * Update the Functional Business Test Coverage Table.
         *
         */
        function updateSeleniumBDDTests() {

             var continuousSeleniumTestAPI = "test.json";

            $.getJSON(continuousSeleniumTestAPI, function (jsonReport) {
                var result = filterBDDJsonReport(jsonReport);
                $(".continuous-selenium-test-coverage").text(result.pass + "/" + result.fail + " " + PASS_FAIL);
            })
        }


        /**
         * Helper Method to filter BDD Json Report into Counts of Passed and Failed Methods.
         * Response is in the format of {pass: passedTests, fail: failedTests}
         */
        function filterBDDJsonReport(jsonReport){

            var passCount = 0;
            var failCount = 0;

            var featuresLength = jsonReport.length;

            for (var featureCount = 0; featureCount < featuresLength; ++featureCount) {
                var feature = jsonReport[featureCount];
                if(feature.elements){
                    var scenarioLength = feature.elements.length;
                    for (var scenarioCount = 0; scenarioCount < scenarioLength; ++scenarioCount) {
                        var scenario = feature.elements[scenarioCount];

                         if(scenario.after){
                            if(scenario.steps){

                                var allStepsPass = true;
                                var stepsLength = scenario.steps.length;

                                for(var stepsCount=0; stepsCount< stepsLength; ++stepsCount){
                                    var step = scenario.steps[stepsCount];

                                    if(step.result !== undefined && step.result.status === "failed"){
                                        allStepsPass = false;
                                        break;
                                    }
                                }

                                if(allStepsPass){
                                    passCount++;
                                }else{
                                    failCount++;
                                }
                            }
                        }

                    }
                }
            }
            return {pass: passCount, fail: failCount};
        }
