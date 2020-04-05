<?php
require 'database.php';

// Récupère les données postées.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extraît les données en JSON.
  $request = json_decode($postdata);

  // Nettoie
  $nomCommande = mysqli_real_escape_string($con, trim($request->name));
  $type = mysqli_real_escape_string($con, trim($request->type));
  $langue = mysqli_real_escape_string($con, trim($request->language));
  $date = mysqli_real_escape_string($con, $request->date);
  $longueur = mysqli_real_escape_string($con, (int)$request->lengthVisibleFormat);
  $echelleLongueur = mysqli_real_escape_string($con, trim($request->lengthScale));
  $largeur = mysqli_real_escape_string($con, (int)$request->widthVisibleFormat);
  $echelleLargeur = mysqli_real_escape_string($con, trim($request->widthScale));
  $debords = mysqli_real_escape_string($con, (int)$request->overflows);
  $echelleDebords = mysqli_real_escape_string($con, trim($request->overflowsScale));
  $fond= mysqli_real_escape_string($con, trim($request->background));
  $produit = mysqli_real_escape_string($con, trim($request->product));
  $infosSupp = mysqli_real_escape_string($con, trim($request->addInfos));

  // Requête d’insertion
  $sql = "INSERT INTO `commandes`(`id`,`nomCommande`,`type`
                                  ,`langue`,`date`,`longueur`,`echelleLongueur`,
                                  ,`largeur`,`echelleLargeur`,`debords`,
                                  `echelleDebords`,`fond`,
                                  `produit`,`infosSupp`) 
                         VALUES (null,'{$nomCommande}','{$type}','{$langue}',
                                '{$date}','{$longueur}','{$echelleLongueur}',
                                '{$largeur}','{$echelleLargeur}','{$debords}',
                                '{$echelleDebords}','{$produit}','{$infosSupp}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $commandes = [
      'id'    => mysqli_insert_id($con),
      'nomCommande' => $nomCommande,
      'type' => $type,
      'langue' => $langue,
      'date' => $date,
      'longueur' => $longueur,
      'echelleLongueur' => $echelleLongueur,
      'largeur' => $largeur,
      'echelleLargeur' => $echelleLargeur,
      'debords' => $debords,
      'echelleDebords' => $echelleDebords,
      'fond' => $fond,
      'produit' => $produit,
      'infosSupp' => $infosSupp
    ];
    echo json_encode($commandes);
  }
  else
  {
    http_response_code(422);
  }
}