let PostCreationComponent;

let postCreationOpen = false;

const postCreationComponentHTML = `

<div id="postCreation">
  <button id="postCreation" onclick="closeElement()">X</button>

  <label class="username">Username</label>
  <input class="username input" >

  <label class="email">Email</label>
  <input class="email input" >

  <label class="password">Password</label>
  <input class="password input" >

  <p class="error">Error occured</p>
  <button id="loginRegisterSubmit" onclick="submitLoginRegister()">Submit</button>
  <button id="loginRegisterSwitch" onclick="changeLoginRegisterSwitchState()">To Registration</button>

</div>
`;

function openPostCreation(){
  
  const postElement = document.createElement('div');
  postElement.innerHTML = postHTML;
  document.getElementById('main').prepend(postElement);
}