    // --- PARTE 1: NAVEGACIÓN Y MENÚ ---
    const boton = document.querySelector(".menu-toggle");
    const lista = document.querySelector("#nav-list");
    // Solo si existen ambos elementos
    if (boton && lista) {
      // Abrir/Cerrar al hacer clic en el botón hamburguesa
      boton.addEventListener("click", () => {
        const abierto = boton.getAttribute("aria-expanded") === "true";
        const nuevoEstado = !abierto;
        boton.setAttribute("aria-expanded", String(nuevoEstado));
        boton.setAttribute(
          "aria-label",
          nuevoEstado ? "Cerrar menú" : "Abrir menú"
        );
        lista.classList.toggle("is-open");
      });
      // Cerrar el menú al hacer clic en cualquier enlace
      const enlacesMenu = lista.querySelectorAll("a");
      enlacesMenu.forEach((enlace) => {
        enlace.addEventListener("click", () => {
          lista.classList.remove("is-open");
          boton.setAttribute("aria-expanded", "false");
          boton.setAttribute("aria-label", "Abrir menú");
        });
      });
      // NUEVO: si se pasa a escritorio desde 1200px, cerrar el menú
      const mediaDesktop = window.matchMedia("(min-width: 1200px)");
      mediaDesktop.addEventListener("change", (e) => {
        if (e.matches) {
          lista.classList.remove("is-open");
          boton.setAttribute("aria-expanded", "false");
          boton.setAttribute("aria-label", "Abrir menú");
        }
      });
      const selectoresEnfocables = 'a[href], button:not([disabled])';
      document.addEventListener("keydown", (e) => {
        if (!lista.classList.contains("is-open")) return;
        // ESCAPE: Cierra y devuelve el foco
        if (e.key === "Escape") {
          lista.classList.remove("is-open");
          boton.setAttribute("aria-expanded", "false");
          boton.setAttribute("aria-label", "Abrir menú");
          boton.focus();
          return;
        }
        // TAB: Mantiene el foco dentro del menú
        if (e.key === "Tab") {
          const elementosEnfocables = lista.querySelectorAll(selectoresEnfocables);
          const todosLosElementos = [boton, ...elementosEnfocables];

          if (todosLosElementos.length === 0) return;

          const primerElemento = todosLosElementos[0];
          const ultimoElemento = todosLosElementos[todosLosElementos.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === primerElemento) {
              ultimoElemento.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === ultimoElemento) {
              primerElemento.focus();
              e.preventDefault();
            }
          }
        }
      });
    }
    // --- PARTE 2: BOTÓN VOLVER ARRIBA ---
    const btnVolverArriba = document.querySelector(
      ".btn-volver-al-inicio-pag",
    );

    if (btnVolverArriba) {
      window.addEventListener(
        "scroll",
        () => {
          if (window.scrollY > 400) {
            btnVolverArriba.classList.add("is-visible");
          } else {
            btnVolverArriba.classList.remove("is-visible");
          }
        },
        { passive: true }
      );
    }
    // PARA CAMBIAR EL SCROLLBEHAVIOR
    document.addEventListener("DOMContentLoaded", () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!reduceMotion && window.location.hash) {
        document.documentElement.style.scrollBehavior = "auto";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.documentElement.style.scrollBehavior = "";
          });
        });
      }
    });