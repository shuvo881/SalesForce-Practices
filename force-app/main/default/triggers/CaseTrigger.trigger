trigger CaseTrigger on Case (after insert) {
    
    List<Messaging.SingleEmailMessage> mailList =  new List<Messaging.SingleEmailMessage>();
    for (Case cs : Trigger.new) {
        if (cs.Status == 'Working'){
            if (cs.ContactEmail != null) {
                EmailTemplate et = [SELECT Id, Subject, Body FROM EmailTemplate WHERE Name = 'working'];
                // initialize the single send email id object
                Messaging.SingleEmailMessage newMail = new Messaging.SingleEmailMessage();
                List<String> sendToAddressesList = new List<String>();
          
                sendToAddressesList.add(cs.ContactEmail);
          
                newMail.setToAddresses(sendToAddressesList);
                newMail.setTemplateId(et.Id);
                newMail.setTargetObjectId(cs.ContactId);
          
                // Add the email to the list
               mailList.add(newMail);
               System.debug('Email sended');
              }
        }else {
            System.debug('No Email sended');
        }
    }
   // Send all emails in the list
   Messaging.sendEmail(mailList);
} 