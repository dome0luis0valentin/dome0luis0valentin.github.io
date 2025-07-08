document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById('dropdownToggle');
  const dropdown = document.getElementById('dropdownContent');
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('closeSidebar');
  const overlay = document.getElementById('overlay');
  const dropdownContainer = document.getElementById('dropdownContainer');

  const mobileSearchToggle = document.getElementById("mobileSearchToggle");
  const mobileSearchOverlay = document.getElementById("mobileSearchOverlay");
  const closeMobileSearch = document.getElementById("closeMobileSearch");




  const faceIcons = {
    happy: "😊",
    neutral: "😐",
    annoyed: "😒"
  }

  const faceCondition = (score) =>
    score > 6 ? faceIcons.happy :
      score > 3 ? faceIcons.neutral :
        faceIcons.annoyed


  document.querySelectorAll('.dropdown-option').forEach(button => {
    // Seleccionar todos al inicio
    button.classList.add('selected-option');

    button.addEventListener('click', () => {
      // Contar cuántos están seleccionados ahora
      const selectedCount = document.querySelectorAll('.dropdown-option.selected-option').length;

      if (button.classList.contains('selected-option')) {
        // Si está seleccionado, solo permitir quitar si hay más de 1 seleccionada
        if (selectedCount > 1) {
          button.classList.remove('selected-option');
        }
        // si no, no hacer nada para evitar 0 seleccionadas
      } else {
        // Si no está seleccionado, simplemente agregar selección
        button.classList.add('selected-option');
      }
    });
  });

  mobileSearchToggle?.addEventListener("click", () => {
    mobileSearchOverlay.classList.remove("hidden");
    // Limpiar el input de búsqueda dentro del overlay
    const input = mobileSearchOverlay.querySelector('input[type="text"]');
    if (input) {
      input.value = "";
    }
  });

  closeMobileSearch?.addEventListener("click", () => {
    mobileSearchOverlay.classList.add("hidden");
  });

  // También cerrar si se hace clic fuera del modal (en el fondo oscuro)
  mobileSearchOverlay?.addEventListener("click", (e) => {
    if (e.target === mobileSearchOverlay) {
      mobileSearchOverlay.classList.add("hidden");
    }
  });

  toggleBtn.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });



  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    overlay.classList.remove('hidden');
    dropdownContainer.classList.add('hidden'); // Ocultar el botón
    setTimeout(() => {
      map.invalidateSize();
    }, 300); // espera a que termine la animación
  });

  closeSidebar.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    dropdownContainer.classList.remove('hidden'); // Mostrar el botón
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    overlay.classList.add('hidden');
    dropdownContainer.classList.remove('hidden'); // Mostrar el botón
  });

  const map = L.map('map').setView([-34.6037, -58.3816], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const oms = new OverlappingMarkerSpiderfier(map, {
    keepSpiderfied: true
  });

  const icons = {

    contaminacionArena: L.icon({
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    }),
    contaminacionAgua: L.icon({
      iconUrl: 'https://cdn.vectorstock.com/i/1000v/05/44/map-marker-icon-vector-12860544.jpg',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    }),
    concurrencia: L.icon({
      iconUrl: 'https://www.clipartmax.com/png/middle/86-869339_yellow-map-marker-png.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    }),
    limpieza: L.icon({
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    }),
    tranquilidad: L.icon({
      iconUrl: 'https://www.clipartmax.com/png/middle/86-869339_yellow-map-marker-png.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    }),
    atracciones: L.icon({
      iconUrl: 'https://www.kindpng.com/picc/m/724-7245648_google-maps-marker-transparent-clipart-jpg-black-and.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    }),

  };

  const beachLevelIcons = {
    nivel1: L.icon({
      iconUrl: "images/1.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]

    }),
    nivel2: L.icon({
      iconUrl: "images/2.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]

    }),
    nivel3: L.icon({
      iconUrl: "images/3.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]

    }),
  }



  const beachLocations = [
    { coords: [-34.822267, -57.963088], icon: beachLevelIcons.nivel1, name: "Punta Lara", score: 2 },
    { coords: [-35.263109, -57.236898], icon: beachLevelIcons.nivel2, name: "Punta Indio", score: 8 },
    { coords: [-34.87, -57.83], icon: beachLevelIcons.nivel1, name: "Playa Mas o Menos", score: 6 },
    { coords: [-35.263109, -57.246898], icon: beachLevelIcons.nivel3, name: "Playa Bagliardi", score: 2 },
    { coords: [-34.854337, -57.840149], icon: beachLevelIcons.nivel2, name: "Palo Blanco", score: 5 },
    { coords: [-34.831436, -57.871377], icon: beachLevelIcons.nivel1, name: "Playa de la Isla Paulino", score: 1 },
  ];

  beachLocations.forEach(({ coords, icon, name, score }) => {
    const marker = L.marker(coords, { icon });

    marker.bindTooltip(name, {
      permanent: true,
      direction: 'left',
      offset: [-30, -20],
      className: 'transparent-tooltip'
    });

    marker.bindPopup(`
    <div style="text-align: center;">
      <strong>${name}</strong><br>
      ${faceCondition(score)} ${score}/10
    </div>
  `);

    marker.addTo(map); // Agregalo al mapa

    oms.addMarker(marker); // Y también al spiderfier
  });




});