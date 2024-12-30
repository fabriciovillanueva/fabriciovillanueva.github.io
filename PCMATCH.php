<?php

$server="localhost";
$user="root";
$password="";
$db= "PCMATCH";

$conexion= new mysqli($server,$user,$password,$db);

if($conexion ->connect_error) {

die("Error de Conexion: ". $conexion->connect_error);

}
    else{
echo "Conexion establecida...";
    }

?>