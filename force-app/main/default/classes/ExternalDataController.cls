public with sharing class ExternalDataController {

    @AuraEnabled(cacheable=true)
    public static List<External_Data__c> getRates() {

        return [
            SELECT Id, Base_Currency__c, Target_Currency__c, Rate__c, Retrieved_On__c
            FROM External_Data__c
            ORDER BY Target_Currency__c ASC
        ];
    }
}