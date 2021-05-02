/* ******************************************************************
 * Constantes de configuration
 */
var apiKey = "762cd7db-a83a-4913-8b42-00101b23438b";
const serverUrl = "https://lifap5.univ-lyon1.fr";

/* ******************************************************************
 * Gestion des tabs "Voter" et "Toutes les citations"
 ******************************************************************** */

/**
 *
 * @param {request}
 * @param {apiKey}
 */

/**function fetchBuilder(request, apiKey = apiKey){
  return fetch(serverUrl + resquest, {headers : {"x-api-key" : apiKey}})
  .then(response =>)
}**/
/**
 * Affiche/masque les divs "div-duel" et "div-tout"
 * selon le tab indiqué dans l'état courant.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majTab(etatCourant) {
  console.log("CALL majTab");
  const dDuel = document.getElementById("div-duel");
  const dTout = document.getElementById("div-tout");
  const tDuel = document.getElementById("tab-duel");
  const tTout = document.getElementById("tab-tout");
  console.log(tTout);
  const tAjout = document.getElementById("tab-ajout");
  const dAjout = document.getElementById("div-ajout");
  if (etatCourant.tab === "duel") {
    dDuel.style.display = "flex";
    tDuel.classList.add("is-active");
    dTout.style.display = "none";
    tTout.classList.remove("is-active");
    dAjout.style.display = "none";
    tAjout.classList.remove("is-active");
  } else if (etatCourant.tab === "tout") {
    dTout.style.display = "flex";
    tTout.classList.add("is-active");
    dDuel.style.display = "none";
    tDuel.classList.remove("is-active");
    dAjout.style.display = "none";
    tAjout.classList.remove("is-active");
  } else {
    dDuel.style.display = "none";
    tDuel.classList.remove("is-active");
    tTout.classList.remove("is-active");
    dAjout.style.display = "none";
    dAjout.style.display = "flex";
    tAjout.classList.add("is-active");
   
  }

}

/**
 * Mets au besoin à jour l'état courant lors d'un click sur un tab.
 * En cas de mise à jour, déclenche une mise à jour de la page.
 *
 * @param {String} tab le nom du tab qui a été cliqué
 * @param {Etat} etatCourant l'état courant
 */
function clickTab(tab, etatCourant) {
  console.log(`CALL clickTab(${tab},...)`);
  if (etatCourant.tab !== tab) {
    etatCourant.tab = tab;
    majPage(etatCourant);
  }
}

/**
 * Enregistre les fonctions à utiliser lorsque l'on clique
 * sur un des tabs.
 *
 * @param {Etat} etatCourant l'état courant
 */
function registerTabClick(etatCourant) {
  console.log("CALL registerTabClick");
  document.getElementById("tab-duel").onclick = () =>
    clickTab("duel", etatCourant);
  document.getElementById("tab-tout").onclick = () =>
    clickTab("tout", etatCourant);
  document.getElementById("tab-ajout").onclick = () =>
    clickTab("ajout", etatCourant);
}

function classerSelonPositionDes(a, b) {
  return a.character < b.character;
}
function classerSelonCharacterAsc(a, b) {
  return a.character > b.character;
}
function classerSelonClassementAsc(a, b) {
  return a.character > b.character;
}
function classerSelonQuoteAsc(a, b) {
  return a.quote > b.quote;
}
function classerSelonClassementDec(a, b) {
  return a.character < b.character;
}

function classerSelonQuoteDec(a, b) {
  return a.quote < b.quote;
}

function fetchCitation(etatCourant) {
  fetch(serverUrl + "/citations", { headers: { "x-api-key": apiKey } })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const ok = data.err === undefined;

      if (ok) {
        console.log(data);
        afficheListe(data, etatCourant);

        const perso = data.sort();
        const entete = document.getElementById(`head`);
        const ligne = entete.insertRow();

        const Classement = ligne.insertCell(0);
        Classement.innerHTML = `<th id = "tri-victoire"><b> Classement  </b></th>`;
        Classement.onclick = () => {
          afficheListe(data.sort(classerSelonClassementAsc), etatCourant);
          Classement.innerHTML = `<th id = "tri-victoire"><b> Classement ↓ </b></th>`;
          Personnage.innerHTML = `<th id = "tri-perso"><b>Personnage</b></th>`;
          Citation.innerHTML = `<th id = "tri-citation"><b>Citation</b></th>`;
          /*Classement.onclick =() => {
        afficheListe(data.sort(classerSelonClassementDec));  
        Classement.innerHTML = `<th id = "tri-victoire"><b> Classement ↓ </b></th>`;
        Personnage.innerHTML =  `<th id = "tri-perso"><b>Personnage</b></th>`;
        Citation.innerHTML = `<th id = "tri-citation"><b>Citation</b></th>`;
      };*/
        };
        Classement.onmouseover = () => Classement.classList.add("is-selected");
        Classement.onmouseleave = () =>
          Classement.classList.remove("is-selected");

        const Personnage = ligne.insertCell(1);
        Personnage.innerHTML = `<th id = "tri-perso"><b>Personnage</b></th>`;
        Personnage.onclick = () => {
          afficheListe(data.sort(classerSelonCharacterAsc), etatCourant);
          Personnage.innerHTML = `<th id = "tri-perso"><b>Personnage ↓</b></th>`;
          Citation.innerHTML = `<th id = "tri-citation"><b>Citation</b></th>`;
          Classement.innerHTML = `<th id = "tri-victoire"><b> Classement </b></th>`;
        };

        Personnage.onmouseover = () => Personnage.classList.add("is-selected");
        Personnage.onmouseleave = () =>
          Personnage.classList.remove("is-selected");

        const Citation = ligne.insertCell(2);
        Citation.innerHTML = `<th id = "tri-citation"><b>Citation</b></th>`;

        Citation.onclick = () => {
          afficheListe(data.sort(classerSelonQuoteAsc), etatCourant);
          Citation.innerHTML = `<th id = "tri-citation"><b> Citation ↓</b></th>`;
          Classement.innerHTML = `<th id = "tri-victoire"><b> Classement </b></th>`;
          Personnage.innerHTML = `<th id = "tri-perso"><b>Personnage</b></th>`;
        };

        /*Citation.onclick =() => {
        afficheListe(data.sort(classerSelonQuoteDec));  
        Citation.innerHTML = `<th id = "tri-citation"><b> Citation ↓</b></th>`;
        Classement.innerHTML = `<th id = "tri-victoire"><b> Classement </b></th>`;
        Personnage.innerHTML =  `<th id = "tri-perso"><b>Personnage</b></th>`;
        a=true;
       };*/

        Citation.onmouseover = () => Citation.classList.add("is-selected");
        Citation.onmouseleave = () => Citation.classList.remove("is-selected");
      }

      return ok;
    });
}

function afficheListe(data, etatCourant) {
  console.log(data);
  document.getElementById(`list-citation`).innerHTML = "";
  const tab = document.getElementById("list-citation");
  let rank = 1; // TODO pas sur qu'on ait le droit à la boucle là
  

  data.forEach((citation) => {
    const ligne = tab.insertRow();
    const rankCell = ligne.insertCell(0);
    const characterCell = ligne.insertCell(1);
    const quoteCell = ligne.insertCell(2);

    rankCell.innerHTML = rank.toString();

    characterCell.innerHTML = citation.character;

    quoteCell.innerHTML = citation.quote;

    ligne.onclick = () => {
      etatCourant.ModalDetail = true;
      majPage(etatCourant);
      ClickDetail(citation._id,etatCourant) ;
    }
    ligne.style.cursor = "pointer";
    ligne.onmouseover = () => ligne.classList.add("is-selected");
    ligne.onmouseleave = () => ligne.classList.remove("is-selected");

    rank++;
  });
}

function ClickDetail(id, etatCourant)
{
  
  //Ouvredetail(etatCourant);
  fetchDetailCitation(id);
}
function Ouvredetail(etatCourant) 
{
  etatCourant.ModalDetail = true;
  majPage(etatCourant);
}

function majModalDetail(etatCourant)
{
  const modalDetail = document.getElementById("modal-detail").classList;
  if(etatCourant.ModalDetail){
    modalDetail.add("is-active");
  }else{
    modalDetail.remove("is-active");
  }
}
function fermedetail(etatCourant) {
  etatCourant.ModalDetail = false;
  majPage(etatCourant);
}
function registerDetailModalClick(etatCourant) {
  document.getElementById("btn-close-detail-modal1").onclick = () =>
  fermedetail(etatCourant);
 document.getElementById("btn-close-detail-modal2").onclick = () =>  
      fermedetail(etatCourant);
  
}
function fetchDetailCitation(id) {
  fetch(serverUrl + "/citations/" + id, { headers: { "x-api-key": apiKey } })
    .then((response) => response.json())
    .then((citation) => {
      const ok = citation.error === undefined;
      if (ok) {
        
        document.getElementById(
          `image_detail`
        ).innerHTML = `<td><img src =${citation.image} /></td>`;
        document.getElementById(
          `quote_detail`
        ).innerHTML = `<td> Citation: ${citation.quote}</td>`;
        document.getElementById(
          `character_detail`
        ).innerHTML = `<td> Personnage: ${citation.character}</td>`;
        document.getElementById(
          `characterDirection_detail`
        ).innerHTML = `<td> Direction: ${citation.characterDirection}</td>`;
        document.getElementById(
          `origin_detail`
        ).innerHTML = `<td> Origine: ${citation.origin}</td>`;
      }
      return ok;
    });
}

/**
 * Initialise le tableau de citations
 * @param {Etat} etatCourant
 */
function initListCitation(etatCourant) {
  const table = document.getElementById(`list-citation`);
 
  fetchCitation(etatCourant);
}

function ajoutercitation() {
  fetch(serverUrl + "/citations", {
    method: `POST`,
    headers: { "x-api-key": apiKey },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("newdata");
      const newdata = {
        quote: document.getElementById("quote").value,
        character: document.getElementById("character").value,
        image: document.getElementById("image").value,
        characterDirection: document.getElementById("characterDirection").value,
        origin: document.getElementById("Film d'origine"),
        
      };

      data.push(newdata);
      console.log("poster");
    });
}

function randomid(etatCourant) {
  fetch(serverUrl + "/citations", { headers: { "x-api-key": apiKey } })
    .then((response) => response.json())
    .then((data) => {
      var id1 = data[Math.floor(Math.random() * data.length)];
      var id2 = data[Math.floor(Math.random() * data.length)];
      randomduel(id1._id, id2._id);
    });
}

function randomduel(id1, id2) {
  fetch(serverUrl + "/citations/" + id1, { headers: { "x-api-key": apiKey } })
    .then((response) => response.json())
    .then((citation1) => {
      const ok = citation1.error === undefined;
      {
        if (ok) {
          let sens1;
          if (citation1.characterDirection != "Left") {
            sens1 = -1;
          } else {
            sens1 = 1;
          }
          document.getElementById(
            `image_gauche`
          ).innerHTML = `<td><img src =${citation1.image}  style="transform: scaleX(${sens1})"/></td>`;
          document.getElementById(
            `quote_gauche`
          ).innerHTML = `<td> ${citation1.quote}</td>`;
          document.getElementById(
            `character_gauche`
          ).innerHTML = `<td> ${citation1.character}</td>`;
        }
      }

      return ok;
    });

  fetch(serverUrl + "/citations/" + id2, { headers: { "x-api-key": apiKey } })
    .then((response) => response.json())
    .then((citation2) => {
      const ok = citation2.error === undefined;
      {
        if (ok) {
          let sens2;
          if (citation2.characterDirection != "Right") {
            sens2 = -1;
          } else {
            sens2 = 1;
          }
          document.getElementById(
            `image_droite`
          ).innerHTML = `<td><img src =${citation2.image} style="transform: scaleX(${sens2})"/></td>`;
          document.getElementById(
            `quote_droite`
          ).innerHTML = `<td> ${citation2.quote}</td>`;
          document.getElementById(
            `character_droite`
          ).innerHTML = `<td> ${citation2.character}</td>`;
        }
       
      }

      return ok;
    });
  document.getElementById("vote-gauche").onclick = () => vote(id1, id2);
  document.getElementById("vote-droite").onclick = () => vote(id2, id1);
  fetchDetailCitation(id1);
 
}


function vote(id1, id2) {
  console.log("voteok");
  
  return fetch(serverUrl + "/citations/duels", {
    method: "POST",
    headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ winner: id1, looser: id2 }),
  });
  
}

/* ******************************************************************
 * Gestion de la boîte de dialogue (a.k.a. modal) d'affichage de
 * l'utilisateur.
 * ****************************************************************** */

/**
 * Fait une requête GET authentifiée sur /whoami
 * @returns une promesse du login utilisateur ou du message d'erreur
 */
function fetchWhoami() {
  return fetch(serverUrl + "/whoami", { headers: { "x-api-key": apiKey } })
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData.status && Number(jsonData.status) != 200) {
        return { err: jsonData.message };
      }
      return jsonData;
    })
    .catch((erreur) => ({ err: erreur }));
}

/**
 * Fait une requête sur le serveur et insère le login dans
 * la modale d'affichage de l'utilisateur.
 * @returns Une promesse de mise à jour
 */
function lanceWhoamiEtInsereLogin() {
  return fetchWhoami().then((data) => {
    const elt = document.getElementById("elt-affichage-connexion");
    const ok = data.err === undefined;
    if (!ok) {
      elt.innerHTML = `<span class="is-error">${data.err}</span>`;
    } else {
      elt.innerHTML = `Bonjour ${data.login}.`;
    }
    return ok;
  });
}

/**
 * Affiche ou masque la fenêtre modale de login en fonction de l'état courant.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majModalLogin(etatCourant) {
  console.log("majmodalLogin");
  const modalClasses = document.getElementById("mdl-login").classList;
  console.log(modalClasses);
  if (etatCourant.loginModal) {
    modalClasses.add("is-active");
    const elt = document.getElementById("elt-affichage-login");

    const ok = etatCourant.login !== undefined;
    if (!ok) {
      elt.innerHTML = `<span class="is-error">${etatCourant.errLogin}</span>`;
    } else {
      elt.innerHTML = `Bonjour ${etatCourant.login}.`;
    }
  } else {
    modalClasses.remove("is-active");
  }}


/**
 * Déclenche l'affichage de la boîte de dialogue du nom de l'utilisateur.
 * @param {Etat} etatCourant
 */
function clickFermeModalLogin(etatCourant) {
  etatCourant.loginModal = false;
  majPage(etatCourant);
}

/**
 * Déclenche la fermeture de la boîte de dialogue du nom de l'utilisateur.
 * @param {Etat} etatCourant
 */
function clickOuvreModalLogin(etatCourant) {
 
  etatCourant.loginModal = true;
  lanceWhoamiEtInsereLogin(etatCourant);
  majPage(etatCourant);
}

/**
 * Enregistre les actions à effectuer lors d'un click sur les boutons
 * d'ouverture/fermeture de la boîte de dialogue affichant l'utilisateur.
 * @param {Etat} etatCourant
 */
function registerLoginModalClick(etatCourant) {
  console.log("registerLoginModal");

  document.getElementById("btn-close-login-modal1").onclick = () =>
  clickFermeModalLogin(etatCourant);
  document.getElementById("btn-open-login-modal-connexion").onclick = () =>
    
      //apiKey = document.getElementById("api").value;
      clickOuvreModalLogin(etatCourant);
    
 document.getElementById("btn-close-login-modal2").onclick = () =>
    {
      //apiKey = undefined;
      clickFermeModalLogin(etatCourant);
    }
  
}

function connexion(etatCourant) {
  const motdepasse = document.getElementById("password");
  fetch(serverUrl + "/whoami", { headers: { "x-api-key": apiKey } }).then(
    (data) => {
      const a = document.getElementById("elt-affichage-connexion");
      const ok = data.error === undefined;
      if (ok) {
        etatCourant.isLogged = true;
        motdepasse.value = "";

        a.innerHTML = `Vous etes connecter ${data.login}.`;
      } else {
        a.innerHTML = `Erreur`;
      }
      return ok;
    }
  );
}

function deconnexion(etatCourant) {
  etatCourant.isLogged = false;
   clickFermeModalLogin(etatCourant);
}

/* ******************************************************************
 * Initialisation de la page et fonction de mise à jour
 * globale de la page.
 * ****************************************************************** */

/**
 * Mets à jour la page (contenu et événements) en fonction d'un nouvel état.
 *
 * @param {Etat} etatCourant l'état courant
 */
function majPage(etatCourant) {
  console.log("CALL majPage");
  console.log(etatCourant);



  majTab(etatCourant);
  majModalLogin(etatCourant);
  majModalDetail(etatCourant);

  registerTabClick(etatCourant);
  registerLoginModalClick(etatCourant);
  registerDetailModalClick(etatCourant);
  
}

/**
 * Appelé après le chargement de la page.
 * Met en place la mécanique de gestion des événements
 * en lançant la mise à jour de la page à partir d'un état initial.
 */
function initClientCitations() {
  console.log("CALL initClientCitations");
  const etatInitial = {
    tab: "duel",
    loginModal: false,
    isLogged: undefined,
    ModalDetail:false,
  };
  
  initListCitation(etatInitial);
  randomid(etatInitial);
  majPage(etatInitial);
  
}

// Appel de la fonction init_client_duels au après chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  console.log("Exécution du code après chargement de la page");
  initClientCitations();
});
