let user;

let LoginRegisterComponent;

let loginOpen = false;

//true = login, false = register
//Display (register/login) is being reverted
let loginRegisterSwitchState = true;

const loginRegisterHTML = /*html */`

  <div id="loginRegisterComponent"  class="dialog">
    <button id="loginRegisterClose" onclick="closeElement()">X</button>

    <label class="username">Username</label>
    <input class="username input" >

    <label class="email">Email</label>
    <input class="email input" >

    <label class="password">Password</label>
    <input type="password"class="password input" >

    <p class="error">Error occured</p>
    <button id="loginRegisterSubmit" onclick="submitLoginRegister()">Submit</button>
    <button id="loginRegisterSwitch" onclick="changeLoginRegisterSwitchState()">To Registration</button>

  </div>
`;

async function submitLoginRegister(){
  const component = document.getElementById('loginRegisterComponent');

  const username = component.getElementsByClassName('username')[1].value; 
  const email = component.getElementsByClassName('email')[1].value; 
  const password = component.getElementsByClassName('password')[1].value; 

  try{

    let res;
    if(loginRegisterSwitchState){
        res = (await axios.post('/login', {
          username,
          password
        })).data;
    } else {
        res = (await axios.post('/register', {
          username,
          email,
          password
        })).data;
    }
    saveUserAndEnablePosting(res)

    closeElement();
    
  } catch (error) {
    console.log(error.response.data.error);
    document.getElementById('loginRegisterComponent')
      .getElementsByClassName('error')[0]
      .style
      .display = 'block';

    document.getElementById('loginRegisterComponent')
    .getElementsByClassName('error')[0].innerText = error.response.data.error;
  }
}

function closeElement(){
  LoginRegisterComponent.remove();
  loginOpen = false;
}

function changeLoginRegisterSwitchState(){
  loginRegisterSwitchState = !loginRegisterSwitchState;
  document.getElementById('loginRegisterComponent')
    .getElementsByClassName('email')[0]
    .style
    .display = loginRegisterSwitchState?'none':'block';

  document.getElementById('loginRegisterComponent')
    .getElementsByClassName('email')[1]
    .style
    .display = loginRegisterSwitchState?'none':'block';

  document
    .getElementById('loginRegisterSwitch')
    .innerText = loginRegisterSwitchState?'To Registration':'To Login';

  document.getElementById('loginRegisterComponent')
    .getElementsByClassName('error')[0]
    .style
    .display = 'none';
}

function openLoginRegisterComponent(){
  if(!loginOpen){
    loginOpen = true;

    // Create element
    const div = document.createElement('div')
    div.innerHTML = loginRegisterHTML
    document.getElementsByTagName('body')[0].appendChild(div)

    LoginRegisterComponent = div;
  }
}

async function loginOrLogout(){
  try {
    if(!user){
      console.log('no token stored');

      openLoginRegisterComponent();
    }else{
      console.log('I deleted token');
      user = undefined;
      localStorage.removeItem('token_I_C');

      // Change login button to logout
      document.getElementById('loginButton').innerText = 'Login';
      //Enable posting
      document.getElementById('postCreationButton').style.display = 'none';
      
    }
  } catch (error) {
    console.log(error);
    openLoginRegisterComponent();
  }
}

async function trySilentLogin(){
  try {
  if(localStorage.token_I_C && localStorage.token_I_C !== 'undefined'){
    const res = (await axios({
      method: 'post',
      url: '/login',
      headers: {
        authorization: localStorage.token_I_C
      }
    })).data;

    saveUserAndEnablePosting(res)
  }
  } catch (error) {
    console.log(error);
  }
}

function saveUserAndEnablePosting(res){
  localStorage.setItem('token_I_C', res.token);
  user = res.user;

  //Enable posting
  document.getElementById('postCreationButton').style.display = 'block';
  // Change login button to logout
  document.getElementById('loginButton').innerText = 'Logout';
}