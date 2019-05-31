<?php

//ambiente de produccion
// ambiente de pruebas
$bdServidor = "mysql.lanzamientos.ileben.cl";
$bdUsuario = "ileben_lanzadb";
$bdPassword = "2KmB!E!y";
$bdNombre = "lanzamientos";

// ambiente de pruebas
// $bdServidor = "mysql.erocorpcl.bylcomunicaciones.com";
// $bdUsuario = "eurocorpcl";
// $bdPassword = "HWRdync9M9TPCfu";
// $bdNombre = "byl_eurocorpcl";

// ambiente local
// $bdServidor = "localhost";
// $bdUsuario = "root";
// $bdPassword = "root";
// $bdNombre = "leben";

$con = mysqli_connect($bdServidor, $bdUsuario, $bdPassword, $bdNombre);
	
	$nombre = $_POST['nombre'];
    $email = $_POST['email'];
	$telefono = $_POST['telefono'];
	$tipologia = $_POST['planta'];
	$fecha = date('Y-n-d H:i');
				 
$sql = 'INSERT INTO contacto(nombre, telefono, email, tipologia, fecha) VALUES ("'.$nombre.'","'.$telefono.'", "'.$email.'","'.$tipologia.'" , "'.$fecha.'")';

$result = mysqli_query($con,$sql);

	if($result) {
		
		include ('classes/phpmailer/PHPMailerAutoload.php');

		$mail = new PHPMailer;
	
		$mail->CharSet = 'UTF-8';
		$mail->isSMTP();
        $mail->Host = 'smtp.dreamhost.com';
        $mail->SMTPAuth = true; 
        $mail->Username = 'noreply@leben.bylcomunicaciones.com';
        $mail->Password = 'dublin.5040';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
		$mail->setFrom('noreply@ileben.cl', 'Inmobiliaria Leben - Formulario de Contacto');
		$mail->addAddress($email);
		$mail->addBCC('leben.byl@gmail.com');
		// $mail->addReplyTo($email, $nombre);
		
		$mail->isHTML(true);                                  // Set email format to HTML

		$cuerpo = '
		<!DOCTYPE html>
		<html lang="es">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="ie=edge">
				<title>Inmobiliaria LEBEN</title>
				<link href="https://fonts.googleapis.com/css?family=Montserrat:300,600" rel="stylesheet">
				<style>
						.centro {
								margin-left:auto; 
								margin-right:auto;
						}
						img{
								display:block;
								margin:auto;
						}
						.txt {
								text-align:center;
						}
						p {
								margin-left: auto;
								margin-right: auto;
						}
						.responsive {
								width: 100%;
								height: auto;
						}

						.montserratL {
								font-family: "Montserrat", sans-serif;
								font-weight: 300;
						}
						.montserratM {
								font-family: "Montserrat", sans-serif;
								font-weight: 600;
						}
						.txt39{
								font-size: 2.5rem;
						}
						.txt44{
								font-size: 2.65rem;
						}
						.txt20{
								font-size: 1.3rem;
						}
						.esquina{
								border-bottom-right-radius: 100px;
						}
						.franja{
								border-radius: 30px;
								width: 80%;padding:10px; background: #333333;color:white;font-size: 0.8rem;
						}
						.uno {
								z-index: 3;
						}
						.dos {
								z-index: 1;
						}

						.ancho {
								width: 600px;
						}

						.foto {
								margin-top:-45px;
						}
						

						@media only screen and (max-width: 530x) {
								.ancho {
										width: 400px;
								}

								.foto {
										margin-top:-25px;
								}

						}

				</style>
		</head>
		<body>
				<div class="centro ancho">
						<div class="centro">
								<div style="margin-top:30px;"><img src="http://www.leben.bylcomunicaciones.com/assets/img/logo.png" width="200px"></div>
								<div class="txt montserratL">
										<p class="txt39">¡GRACIAS POR<br>
										<span class="montserratM txt44" style="height:1px; text-decoration-line: underline; text-decoration-color: red; line-height: 1em;">INSCRIBIRTE!</span></p>
								</div>
								<div class="txt" style="margin-top:-30px;margin-bottom:40px;"><span class="montserratL txt20">AHORA ESTAMOS EN CONTACTO</span></div>
								<div class="uno"><p class="txt montserratL franja txt10">Pronto ser&aacute;s el primero en saber sobre nuestros lanzamientos</p></div>
						</div>
						<div class="dos foto"><img class="responsive" src="http://www.leben.bylcomunicaciones.com/assets/img/mail2.png"></div>
						<div></div>
						<div class="txt montserratL"><a href="https://ileben.cl/" target="_blank"><p style="color:red;">i<span style="color:black;">leben.cl</span></p></a></div>
						<div><p style="width: 95%; background:red;height: 15px;"></p></div>
						<div></div>
				</div>

		</body>
		</html>
				';
		
						
		$mail->Subject = '¡Gracias por inscribirte! AHORA ESTAMOS EN CONTACTO';
		$mail->Body    = $cuerpo;
		
		if(!$mail->send()) {
		    echo 'nosent';
		    echo 'Mailer Error: ' . $mail->ErrorInfo;
		} else {
		    echo 'success';
		}
	} else {
		echo 'nosaved'.$db->getLastError().' '.var_dump($data);
	}
	
?>