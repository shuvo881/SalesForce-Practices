
@isTest
private class AccountControllerTest {

    @isTest
    private static void accountCreatorTest() {
        List<Account> accArry = [SELECT Id FROM Account WHERE Name=:'Name' LIMIT 1];
        //string id = [SELECT Id FROM Account WHERE Name=: 'TestName' LIMIT 1];
        if(accArry.isEmpty()){
            
            Account acc = new Account();
            acc.Name = 'Name';
            INSERT acc;
            string accId = AccountController.accountCreator('Name');
            System.assertEquals(acc.Id, accId);
            return;
        }
        string accId = AccountController.accountCreator('Name');
        System.assertEquals(accArry[0].Id, accId);
    }
}