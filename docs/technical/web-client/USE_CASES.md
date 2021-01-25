
Use cases
AUTHENTICATED / UNAUTHENTICATED USERS (MAP)
(3)  Any user can READ non-privileged info of and search General Offers 
(4)  Any user can READ non-privileged info of and search General Requests
- Filter by status and map coordinates
- Cannot read privileged info
Privileged info: users name, photo, contact info, rating, profile picture, specific offers, specific requests
Backend: check can retrieve info
Frontend: Map and List of items shown in Map
Issue: Can we switch between list and map without requerying

AUTHENTICATED USERS (MAP)

Optional UI: different color if yours


CREATE, READ by ID of General Requests, General Offers, Specific Requests, Specific Offers
(1)  Registered User can CREATE a General Offer
(2)  Registered User is able to CREATE a General Request
- User can get a list of their general requests, including confidential info
- User can get a list of their general offers, including confidential info
- Users can read specific offers for their general request
- Users can read specific requests for their general offer

(5)  Registered User can CREATE Specific Request in response to General Offer
(6)  Registered User can CREATE Specific Offer in response to General Request


DELETE by ID of General Requests, General Offers, Specific Requests, Specific Offers
(7)  Registered User can DELETE General Offer
(8)  Registered User can DELETE Specific Offer
(9)  Registered User can DELETE General Request
(10)  Registered User can DELETE Specific Request

MY OFFERS / MY REQUESTS
(11)  Registered User can READ privileged info for their General Requests and Specific Requests
      - Users can list their General and Specific Requests
      - Users can read all of the specific requests for a general offer
(12)  Registered User can READ combination of all General and Specific Offers
      - Users can list their General and Specific Offers
     - Users can read all of the specific offers for a general request
(13) Registered User can potentially FILTER the READs of (11) and (12)


(14)  The STATUS of an Offer or Request  can be UPDATED. I believe only GENERAL offers/requests can be updated but I could be wrong. There are four predetermined statuses
   a.      Open
   b.     Accepted
   c.      In Progress
   d.     Closed
(15) No other UPDATE functionality should be implemented.   If you want to change your offer or request, you would just have to delete it and create a new one

ducks/
services
   posts
     createPost
     getPosts

MapRequests
   actions
     getGeneralRequests => calls getPosts({lat,lng, is_request=true, is_response=false})
     getGeneralOffers   
GeneralRequests
   actions
     createGeneralRequest
     getMyRequests
GeneralOffers
   actions
     createGeneralRequest
     getMyOffers
SpecificRequests
   actions
      createSpecificRequestsForOffer
      getSpecificRequestsForOffer
SpecificOffers
   actions
      createSpecificOfferForRequest
      getSpecificOffersForRequest




















