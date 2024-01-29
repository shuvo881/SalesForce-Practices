trigger UserTrigger on User (after insert) {
     // Access all emails in the list 
     List<Messaging.SingleEmailMessage> mailList =  new List<Messaging.SingleEmailMessage>();

     for (User usr : Trigger.new) {
     if (usr.Email != null && usr.FirstName != null) {
 
       // initialize the single send email id object
       Messaging.SingleEmailMessage newMail = new Messaging.SingleEmailMessage();
 
       // Specify who receives the email
       List<String> sendToAddressesList = new List<String>();
 
       sendToAddressesList.add(usr.Email);
 
       newMail.setToAddresses(sendToAddressesList);
 
        // Set the attributes of the email.
       newMail.setSubject('Your User and Contace with Account detail have been added');
 
       String body = 'Hello ' + usr.FirstName + ', '; 
       body += 'Your details have been added and your contact has been created.';     
       newMail.setHtmlBody(body);
 
       // Add the email to the list
      mailList.add(newMail);
     }
   }
   // Send all emails in the list
   Messaging.sendEmail(mailList);
}