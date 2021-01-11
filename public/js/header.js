window.onload=function(){
  navFade();
}

const navFade = () => {
  const burgerIcon=document.querySelector(".burger")
  const items = document.querySelectorAll(".item");

  burgerIcon.addEventListener('click', () => {
    items.forEach((item,index)=>{
      item.classList.toggle("active")
    });
    burgerIcon.classList.toggle('mark')
  });
};