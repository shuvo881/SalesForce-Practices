public with sharing class AccountController {
    // @AuraEnabled
    // public static List<Account> getAccounts(){
    //     List<Account> accounts = [SELECT name FROM Account Limit 10];
    //     System.debug(accounts);
    //     return accounts;
    // }
    // @AuraEnabled
    // public static void makeClient(String accId, String lname){
    //     Contact con = new Contact();
    //     con.LastName = lname;
    //     con.AccountId = accId;
    //     INSERT con;
    // }
    
    @AuraEnabled
    public static string accountCreator(String accName){
        List<Account> accArry = [SELECT Id FROM Account WHERE Name=:accName];
        //string id = [SELECT Id FROM Account WHERE Name=: 'TestName' LIMIT 1];
        
        if (accArry.isEmpty()){
            Account acc = new Account();
            acc.Name = accName;
            INSERT acc;
            return acc.Id;
        }
        
    
        return accArry[0].Id;
    }
}