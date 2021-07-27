$( function() {
   $( "#accordion" ).accordion({
    heightStyle: 'content',
  	header: '.section-questions__items-title',
    icons: false
    } )
});



document.addEventListener('DOMContentLoaded',function(){
 document.querySelectorAll('.tabs__btn').forEach(function(tabsBtn) {
 tabsBtn.addEventListener('click', function(event) {
 const path = event.currentTarget.dataset.path
 console.log('path')

 document.querySelectorAll('.tab-content').forEach(function(tabContent) {
tabContent.classList.remove('tab-content-active')
   })
    document.querySelector(`[data-target = "${path}"]`).classList.add('tab-content-active')
    })
 })
})

const swiper = new Swiper('.swiper-container', {
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
});

 $('.mobile-menu').on('click', function (e) {
   e.preventDefault();
   $('.menu-btn').toggleClass('menu-active');
 $('.menu-wrap').toggleClass('menu-active');
 })



