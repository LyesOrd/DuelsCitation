describe("Test avec fetch et promesses", function() {
    test("Exemple de test sur une promesse de fetch", function(done){
      // Attention à la ligne au dessus, on a ajouté un paramètre done à la fonction de test
      fetch("https://lifap5.univ-lyon1.fr")
        .then(response => {
          chai.assert.equal(200,Number(response.status));
          done(); // Le test est terminé et a réussi
        })
        .catch(err => {
          done(err); // le test a échoué avec l'erreur err
        })
  
    });
    test("Exemple de test qui échoue à cause du code de retour", function(done){
      // Attention à la ligne au dessus, on a ajouté un paramètre done à la fonction de test
      fetch("https://lifap5.univ-lyon1.fr")
        .then(response => {
          chai.assert.equal(201,Number(response.status)); 
          // cette assertion va échouer car le serveur renvoie 200 et pas 201 ici
          done(); // Le test est terminé et a réussi si on arrive ici, 
          // mais comme l'assertion précédente échoue, cette ligne n'est jamais exécutée
        })
        .catch(err => {
          done(err); // le test a échoué avec l'erreur err
        })
    });
  })
  