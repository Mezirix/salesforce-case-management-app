public with sharing class CurrencyDashboardController {

    @AuraEnabled(cacheable=true)
    public static List<Currency__c> getCurrencies() {
        return [
            SELECT Id, Currency_Code__c, Rate__c, CreatedDate
            FROM Currency__c
            ORDER BY Currency_Code__c ASC
        ];
    }

    @AuraEnabled
    public static void refreshRates() {
        // Manually trigger the sync logic
        ExternalDataSync.run();
    }
}