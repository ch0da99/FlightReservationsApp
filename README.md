# <h2>An Application that gives user a feature to create reservations on flights.</h2> 
<p>It's mini-app that contains 4 cities currently: Belgrade, Kraljevo, Nis and Pristina.<br>
It's highly scalable and easy to be expanded in future.</p>
<p>It's based on <b>.Net Web Application Techology</b> that uses<b> API Controllers</b> for handling backend traffic
<br>and <b>React.Js</b> for creating frontend functionality and UI.<br>I also used <b>SignalR</b> library, 
powerful Microsoft tool for real-time communication via Web Sockets </p>
<p>For a storage i used <b>SqLite</b> relational database for local storage, 
but the fact that i used <b>Entity Framework</b> gives an opportunity to easily transfer everything to any other relational database using power of scaffolding.</p>
<br><br><br>
<h3>Basic scenarios</h3>
<p>The application can be used as three different users:
<ul>
<li>Agent - may create flights, delete them and accept customer's reservation's on flights. 
Those flight with less than a 5 seats available are highlighted, so it would be easy noticed.</li>
<li>Customer - may see all available flights (with seats available), 
may apply for a reservation and step up in a queue waiting for some agent to accept it 
(may not try to make reservations on flights that take off in less than a 3 days). 
Customer may also filter all reservations by having/not having transfers during a travel.
There is also a separate page to see all created reservations and their status (accepted,pending or declined)</li>
<li>Administrator - may add customers and agents (there's no available registration at the moment), and also can cancel any created flight by agents.</li>
</ul></p>
<p>The fact that SignalR is used in infrastructure of application gives realtime reactive functionality that gives customers feature to track
progress of their applied reservations.</p>
