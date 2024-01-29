trigger AccountTrigger on Account (before insert, before update) {
    //System.debug(Trigger.new);
    for (Account acc : Trigger.new) {
        if (acc.Industry != null && acc.Industry.equals('Banking') && acc.AnnualRevenue == null) {
            acc.AnnualRevenue = 10000;
            acc.Rating = 'Hot';
        }
    }
}