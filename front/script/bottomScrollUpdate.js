window.onscroll = async (ev) => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // you're at the bottom of the page
      const lastBottom = window.scrollY;
      
      await getPosts(postComponentSkip).then(()=>{
        window.scrollTo(0,lastBottom-1);
      });
  } 
};