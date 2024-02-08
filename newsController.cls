public with sharing class newsController {
    @AuraEnabled
    public static Map<String, Object> retriveNews(){
         HttpRequest httpRequest = new HttpRequest();
        //Calling the API Access point
        httpRequest.setEndpoint('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=31ce6b1ae5f748b08a8296dabc6984a6');
        //End point type we are targeting
        httpRequest.setMethod('GET');
        // Storing the JSON data in a map

        Map<String, Object> newsJsonData = new Map<String, Object>();
        String strResponse = null;
        // Http Class to initiate http request and response

        try{
            Http http = new Http();
            //The request is sent and response is stored
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                //Success Code
                strResponse = httpResponse.getBody();
            } else {
                //Error Code
                throw new CalloutException(httpResponse.getBody());
            }

        } catch(Exception ex){
            throw ex;
        }
        //Check if response is not blank

        if(!String.isBlank(strResponse)){
        //type cast response
        //each news item in Json format is separated
            newsJsonData = (Map<String, Object>)JSON.deserializeUntyped(strResponse);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        } else {
            return null;
        }
    }
}