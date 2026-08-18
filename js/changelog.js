const CHANGELOG_DATA = [
  {
    time: "2026-08-18 04:30",
    tag: "ALERTA DE SERVICIO",
    title: "Colectivo 09:30 hs (Tupungato -> Eugenio Bustos): SUSPENDIDO",
    detail: "Motivo: Ráfagas intensas de Viento Zonda en zona de montaña y falta de visibilidad."
  },
  {
    time: "2026-08-18 01:00",
    tag: "TARIFA ACTUALIZADA",
    title: "Recorrido Urbano Local (Sergi / RIM 11)",
    detail: "Nuevo valor del boleto asignado a $1.650."
  },
  {
    time: "2026-08-17 18:30",
    tag: "HORARIOS DE REGRESO",
    title: "Salidas Mendoza -> Tupungato",
    detail: "Se actualizaron las frecuencias nocturnas de regreso (Expreso Mitre / CATA)."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const btnChangelog = document.getElementById('btn-changelog');
  const changelogModal = document.getElementById('changelog-modal');
  const closeChangelogBtn = document.getElementById('close-changelog-modal');
  const consoleOutput = document.getElementById('changelog-console-output');

  function renderCmdOutput() {
    if (!consoleOutput) return;

    let text = "Municipalidad de Tupungato [2026]\n";
    text += "(c) Municipalidad de Tupungato. Todos los derechos reservados.\n\n";
    text += "C:\\Mendoza\\Tupungato\\Transporte> type novedades_recientes.log\n\n";

    CHANGELOG_DATA.forEach(entry => {
      text += `[${entry.time}] -- ${entry.tag} --\n`;
      text += `  * ${entry.title}\n`;
      text += `    ${entry.detail}\n\n`;
    });

    text += "C:\Mendoza\\Tupungato\\Transporte> <span class=\"cmd-cursor\"></span>";

    consoleOutput.innerHTML = text;
  }

  function openChangelog() {
    renderCmdOutput();
    if (changelogModal) {
      changelogModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeChangelog() {
    if (changelogModal) {
      changelogModal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  if (btnChangelog) {
    btnChangelog.addEventListener('click', openChangelog);
  }

  if (closeChangelogBtn) {
    closeChangelogBtn.addEventListener('click', closeChangelog);
  }

  if (changelogModal) {
    changelogModal.addEventListener('click', (e) => {
      if (e.target === changelogModal) {
        closeChangelog();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && changelogModal && changelogModal.style.display === 'flex') {
      closeChangelog();
    }
  });
});
