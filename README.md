# Hamzone
Routing algorithm for Hamzone's Hambotic

============
| HAMAZONE |
============

DESCRIPTION:
HAMAZONE is a leading supplier of Ham to all of the top restaurants in Sydney.
Business has been going so well that they have decided to sell their products online at www.hamazone.com.au.
The CEO has leased a new warehouse in Bulk-O-Ham Hills to ramp up their operations and has also purchased a
special robot called 'Hambotic' from Japan to automate the process of moving, storing and packing Ham delivery boxes.

You've been recruited as the Chief of Robotics at this new warehouse.
Hambotic, although a very obedient and a trustworthy worker, has its own limitations.
It has a rather short battery life, i.e., the more it moves, the quicker it drains.
You, as the Chief of Robotics, will need to ensure that Hambotic is used in the
most efficient way so its 'time on work' hours is maximized.

Your job now is to come up with an algorithm that ensures that Hambotic doesn't move even an extra inch, if it can be avoided,
to make it extremely efficient. Once it has collected all the required Ham boxes, it needs to return back to the charging bay.
Don't worry about the storing and packing aspects of the robot for this task.


TASK:
> Hambotic is parked at the charging bay within the warehouse.
> There are boxes of Ham that are stored in different locations within the warehouse.
> You know the 'cost' of Hambotic movement (energy spent on moving Hambotic from position A to B) between every box of Ham from any other box of Ham.
> Cost for moving Hambotic between the charging station to every box of Ham is also known.
> For example: If there are 2 Ham boxes (B & C), you would know the cost between A -> B, B -> C, C -> A, B -> A, C -> B, A -> C, where A is the charging dock position.
> The cost for moving Hamotic between 2 Ham boxes is an integer value (no floating point number).
> The cost for moving Hamotic between B -> A may not necessarily be the same as A -> B.


INPUT:
> Each Ham box will have a unique one character ID from the English Alphabet set [A..Z].
> The cost for moving Hamotic between all combinations of Ham boxes would be fed in as an input.
> You are free to come up with your own data structure and have a section explaining how to use it or construct the input for the program.
> If there are 3 Ham boxes (plus the charging dock location), you would have 12 cost configurations available to you.


OUTPUT:
> Print the most efficient route for Hambotic to take given a set of boxes to collect from along with the cost associated with each movement.


ASSUMPTIONS:
> Hambotic can walk anywhere without being 'blocked' by other boxes.
> The cost for moving Hamotic between two locations (boxes and/or charging bay is a positive integer)
> For testing purposes of this submission, Hambotic will never run out of battery.
  However, the essence of this task is to make Hambotic collect as many Ham boxes as possible with minimal energy spent.
> Size and the shape of the warehouse is completely irrelevant to the task at hand.
> Location of the Ham boxes is also irrelevant to the task. Cost for moving Hambotic between Ham boxes is a critical element of this task.


SUBMISSION:
This is a JavaScript program use the above Inputs and produces the required output and uses the Canvas element to display the network used from a third party library vis-network.
