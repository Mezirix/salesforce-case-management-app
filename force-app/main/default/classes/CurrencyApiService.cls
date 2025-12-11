public with sharing class CurrencyApiService {

    // API response wrapper
    public class ApiResponse {
        public String provider;
        public String terms;
        public String base;
        public String api_date; // renamed from 'date'
        public Long time_last_updated;
        public Map<String, Decimal> rates;
    }

    // Main callout method
    public static List<Currency__c> pullRates() {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Currency_API/v6/latest/USD');
        req.setMethod('GET');

        Http http = new Http();
        HttpResponse res = http.send(req);

        System.debug('Status: ' + res.getStatusCode());
        System.debug('Body: ' + res.getBody());

        if (res.getStatusCode() != 200) {
            throw new CalloutException('Currency API error: ' + res.getStatus());
        }

        ApiResponse data = (ApiResponse) JSON.deserialize(res.getBody(), ApiResponse.class);

        // ensure JSON structure is valid
        if (data == null || data.rates == null) {
            throw new CalloutException('API response missing rates');
        }

        List<Currency__c> records = new List<Currency__c>();

        for (String code : data.rates.keySet()) {
            Decimal rate = data.rates.get(code);

            Currency__c c = new Currency__c();
            c.Currency_Code__c = code;
            c.Rate__c = rate;

            records.add(c);
        }

        return records;
    }
}