let LoginRegisterComponent;

//true = login, false = register
//Display (register/login) is being reverted
let loginRegisterSwitchState = true;

const loginRegisterStyle = `
    #loginRegisterComponent {
      position: absolute;
      margin: auto;
      padding: 35px;
      top:0;
      bottom:0;
      right: 0;
      left: 0;
      width: 60%;
      height: fit-content;
      box-shadow: 0px 0px 25px grey;
    
      background-color: #fff;
    }

    #loginRegisterComponent input, 
    #loginRegisterComponent button {
      display: block;
    }

    #loginRegisterClose{
      float: right;
    }

    #loginRegisterComponent .email{
      display: none;
    }

    #loginRegisterComponent .error{
      color: red;
      display: none;
    }
  `;

async function submitLoginRegister(){
  const component = document.getElementById('loginRegisterComponent');

  const username = component.getElementsByClassName('username')[0].value; 
  const email = component.getElementsByClassName('email')[0].value; 
  const password = component.getElementsByClassName('password')[0].value; 

  try{
    if(loginRegisterSwitch){
      
        const res = (await axios.post('/login', {
          username,
          password
        })).data

        localStorage.setItem('token', res.token);
        user = res.user
      
    } else {
      
        const res = (axios.post('/register', {
          username,
          email,
          password
        })).data.token

        localStorage.setItem('token', res.token);
        user = res.user
      
    }

    closeElement();
    
  } catch (error) {
    console.log(error);
    
    document.getElementById('loginRegisterComponent')
      .getElementsByClassName('error')[0]
      .style
      .display = 'block';
  }
}

function closeElement(){
  LoginRegisterComponent.remove();
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
}

function openLoginRegisterComponent(){
  
  const loginRegisterHTML = `
    <style>
      ${loginRegisterStyle}
    </style>
    <div id="loginRegisterComponent">
      <button id="loginRegisterClose" onclick="closeElement()">X</button>

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

  // Create element
  const div = document.createElement('div')
  div.innerHTML = loginRegisterHTML
  document.getElementsByTagName('body')[0].appendChild(div)

  LoginRegisterComponent = div;
}

function trySilentLogin(){
  try {
    const token = localStorage.getItem('token');
    if(token){
      const res = (axios({
        method: 'post',
        url: '/login',
        headers: {
          authorization: token
        }
      })).data.token

      localStorage.setItem('token', res.token);
      user = res.user
    } else {
      console.log('no token stored');

      openLoginRegisterComponent()
    }
  } catch (error) {
    console.log(error);
    openLoginRegisterComponent()
  }
}