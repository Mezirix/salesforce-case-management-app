trigger CaseAutoAssignTrigger on Case (before insert, before update) {
    if (Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)) {
        CaseAutoAssignHandler.assignCases(Trigger.new);
    }
}
