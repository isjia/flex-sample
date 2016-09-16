$(".footer-fix a").each(function(){
   var path = document.location.pathname.split('/');
   var page = path[path.length - 1];
   if (page.length == 0) {
      page = "index.html";
   }
   var href = $(this).attr("href");
   if (href === page) {
     $(this).addClass("active");
     return false;
   }
 });
