const btnMenu = document.getElementById("btnMenu");
      const menuList = document.getElementById("menuList");

      let menuOpen = false;

      btnMenu.addEventListener("click", () => {
        menuOpen = !menuOpen;

        //Mostrar/ocultar menu
        menuList.classList.toggle("active");

        //Trocar ícone
        if (menuOpen) {
          btnMenu.src = "icons/x 1.png"; //Ícone X
        } else {
          btnMenu.src = "icons/Union.png"; //Ícone original
        }
      });