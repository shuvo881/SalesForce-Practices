
@isTest
private class ContactControllerTest {
    @isTest
    private static void createContactTest() {
        Contact con = new Contact();
        con.FirstName = 'fname';
        con.LastName = 'lname';
        con.Email = 'aemail@xy.com';
        con.AccountId = '0015g00001bBUx3AAG';
        INSERT con;
        String conId = ContactController.createContact('fname', 'lname', 'email@gmail.com', '0015g00001bBUx3AAG');
        Contact cn = [SELECT FirstName FROM Contact WHERE Id=:conId];
        System.assertEquals(con.FirstName, cn.FirstName);
    }
    
}