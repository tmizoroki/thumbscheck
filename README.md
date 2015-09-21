# Thumbs Check Web App

Thumbs check is a web application app gives lecuturers the ability to see realtime data that represents students level of understanding of the material that is being presented.

Each student will log into a client view that contains only a slider bar. They can interact with the slider to discreetly communicate their current confidence level of the material that is being presented. The position of the slider will represent an integer from 0 to 100 that will quantify that particular students understanding of the material. Once the student begins to feel confused or less confident in the material that is begin presented, the can move the slider down to indicate this.

The slider will stream the data to a sever which will continuously aggregate the data, and keep an updated average. The lecturer should be able to query the database at anytime to view the average.



Stretch Goal:

Allow the lecturer to view the data in realtime in as a graph built with D3.
Use Github OAuth for students to login.
Allow lecturer to see the confidence level of a particular student.