public with sharing class ExternalDataSync implements Schedulable {

    // Called by the Scheduler
    public void execute(SchedulableContext sc) {
        run();
    }

    // Called manually or by Dashboard refresh
    @AuraEnabled
    public static void run() {
        List<Currency__c> results = CurrencyApiService.pullRates();

        // Wipe old data (optional)
        delete [SELECT Id FROM Currency__c];

        // Insert fresh data
        insert results;
    }
}