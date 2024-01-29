trigger ContactTrigger on Contact (before insert) {
    for(Contact con: Trigger.new){
        System.debug(con);
    }
}