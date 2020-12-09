let PostCreationComponent;

let postCreationOpen = false;
let postCreationImgSelected = false;

let previewImageStyle = {
  blur: 0,
  grayscale: 0,
}

const postCreationComponentHTML = /*html*/`
<div id="postCreationComponent" class="dialog">
  <button id="postCreationClose" onclick="closePostCreation()">X</button>

  <img id="imgPreview" src="" alt="image preview"/>

  <label id="blur">Blur</label>
  <input type="range" min="0" max="10" value="0" step="0.1" class="slider" id="blurRange">

  <label id="grayscale">Grayscale</label>
  <input type="range" min="0" max="100" value="0" class="slider" id="grayscaleRange">
  
  <input id="imgFile" type='file' accept="image/*" onchange="readImgURL(this);" />

  <p class="error">Error occured</p>
  <button id="postCreationSubmit" onclick="sendPost()">Submit</button>
</div>
`;

function openPostCreation(){
  if(!postCreationOpen){
    postCreationOpen = true;
    const postCreation = document.createElement('div');
    postCreation.innerHTML = postCreationComponentHTML;
    document.getElementById('main').append(postCreation);
    PostCreationComponent = postCreation;

    const imgPreview = document.getElementById('imgPreview');

    const blur = document.getElementById('blurRange');
    blur.oninput = ()=>{
      previewImageStyle.blur = blur.value;
      imgPreview.style = 
        'filter: blur('+previewImageStyle.blur+'px) ' + 
        'grayscale('+previewImageStyle.grayscale+'%);';
    };

    const grayscale = document.getElementById('grayscaleRange');
    grayscale.oninput = ()=>{
      previewImageStyle.grayscale = grayscale.value;
      imgPreview.style = 
        'filter: blur('+previewImageStyle.blur+'px) ' + 
        'grayscale('+previewImageStyle.grayscale+'%);';
    }
  }
}

function closePostCreation(){
  PostCreationComponent.remove();
  postCreationOpen = false;
}

function readImgURL(input) {
  if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        document.getElementById('imgPreview').src = e.target.result
      };

      reader.readAsDataURL(input.files[0]);
      postCreationImgSelected = true;
  }
}

async function sendPost(){
  try {
    const file = document.getElementById('imgFile').files[0];
    const data = new FormData();
    data.append('image', file, file.fileName);
    data.append(
      'filters', 'filter: blur('+previewImageStyle.blur+'px) ' + 
      'grayscale('+previewImageStyle.grayscale+'%);'
    );

    await axios.post('/post', data, {
      headers: {
        'authorization': localStorage.token_I_C,
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    });

    await getPosts(0, true);

    closePostCreation();
  } catch (error) {
    console.log(error);
  }
  
}