let posts = [];

let postComponentSkip = 0;

let noMorePosts = false;

// Get posts returns always 20 posts if there is ENOUGH posts
async function getPosts(skip, newPost){
  try {
    if(!noMorePosts || newPost){
      let newPosts;
      if(newPost){
        newPosts = [(await axios.get('/post')).data.list[0]]
      } else {
        newPosts = (await axios.get('/post'+(skip?'?skip='+skip:''))).data.list
        if(newPosts.length < 20){
          noMorePosts = true;
        }
      }

      posts = [...posts, ...newPosts];

      postComponentSkip += newPosts.length;

      /** 
       * sorting by creation date 
       * so array would be compatible 
       * with prepend functionality
       * */ 
      posts = posts.sort((a,b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });

      /**
       * Updates list of posts by deleting old posts
       */
      Array.from(document.getElementsByClassName('postComponent')).forEach((element) => {
        element.remove();
      });
      
      posts.forEach(post => {
        appendPostComponentToMain(post);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function appendPostComponentToMain(post){
  const postHTML = /*html*/`
    <div id="${post.id}" class="postComponent">
      <img src="/post/${post.id}" style="${post.filters}"/>
      <p class="creationDateAndUser">
        ${new Date(post.created_at).toLocaleDateString()}<br/>
        by
        <b>${post.user_id}</b>
      </p>
    </div>
  `;
  const postElement = document.createElement('div');
  postElement.innerHTML = postHTML;
  document.getElementById('main').prepend(postElement);
}

