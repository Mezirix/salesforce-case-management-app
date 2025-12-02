public class CaseAutoAssignHandler {

    public static void assignCases(List<Case> cases) {
        // Queue or User IDs from my org
        Id techQueueId    = '00Gfj000004vjJ3';
        Id billingQueueId = '00Gfj000004vq9F';
        Id defaultOwnerId = UserInfo.getUserId();

        for (Case c : cases) {
            if (c.Issue_Type__c == null || c.Priority == null) {
                continue;
            }

            // Assignment logic
            if (c.Issue_Type__c == 'Technical' && c.Priority == 'High') {
                c.OwnerId = techQueueId;
            } else if (c.Issue_Type__c == 'Billing') {
                c.OwnerId = billingQueueId;
            } else {
                c.OwnerId = defaultOwnerId;
            }

            // Simple SLA calculation: now + 8 hours if empty
            if (c.SLA_Due_Date__c == null) {
                Datetime baseTime = (c.CreatedDate == null) ? Datetime.now() : c.CreatedDate;
                c.SLA_Due_Date__c = baseTime.addHours(8);
            }
        }
    }
}
