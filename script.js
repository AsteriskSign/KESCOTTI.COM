<script>
    document.addEventListener"DOMContentLoaded", function() 
      var tabs = document.getElementsByClassName("tab");
      var tabContents = document.getElementsByClassName("tab-content");

      function showTab(tabId)
    for(var i = 0; i  tabs.length; i++) 
        tabs[i].classList.remove("active");
      

      for (var i = 0; i  tabContents.length; i++) 
        tabContents[i].classList.remove("active");
      

      var tab = document.getElementById(tabId);
      var tabContent = document.getElementById("tab-content-" + tabId);

      tab.classList.add("active");
      tabContent.classList.add("active");
    

    for (var i = 0; i  tabs.length; i++) 
      tabs[i].addEventListener"click", function() 
        var tabId = this.getAttribute("data-tab");
        showTab(tabId);
    ;
  </script>