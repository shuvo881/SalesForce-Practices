public with sharing class UserController {
    @AuraEnabled
    public static void createUser(String fname, String lname, String email){
        Profile p = [SELECT Id FROM Profile WHERE Name='System Administrator' limit 1];
        User usr = new User();
        usr.FirstName = fname;
        usr.LastName = lname;
        usr.username = email;
        usr.Email = email;
        //usr.ContactId = conId;
        usr.IsActive = false;
        usr.Alias = lname;
        usr.LocaleSidKey = 'en_US';
        usr.TimeZoneSidKey = 'GMT';
        usr.ProfileID = p.Id;
        usr.LanguageLocaleKey = 'en_US';
        usr.EmailEncodingKey = 'UTF-8';

        INSERT usr;
    }
}