global class ExternalDataScheduler implements Schedulable {
    global void execute(SchedulableContext sc) {
        ExternalDataSync.run();
    }
}