public with sharing class ContactController {
    @AuraEnabled
    public static string createContact(String fname, String lname, String email, String accountID){
        Contact con = new Contact();
        con.FirstName = fname;
        con.LastName = lname;
        con.Email = email;
        con.AccountId = accountID;
        INSERT con;
        List<Contact> conArry = [SELECT Id FROM Contact WHERE Email=:email];
        return conArry[0].Id;
    }

    @AuraEnabled
    public static boolean isEmailExist(String email){

        List<Contact> conList = new List<Contact>();
        conList = [Select Id, Name From contact Where email = :email];
        
        return !conList.isEmpty();    
        
    
    }
}