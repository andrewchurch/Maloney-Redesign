<?php 
include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/config.inc.php'; 

if(isset($_POST['contactus'])) {
	$name = $_POST['name'];
	$email = $_POST['email'];
	$subject = $_POST['subject'];
	$comments = $_POST['comments'];
	$verify = $_POST['verify'];
	
	if(trim($name) == '') {
		$error = '<div class="error_message">Attention! You must enter your name.</div>';
	} else if(trim($email) == '') {
		$error = '<div class="error_message">Attention! Please enter a valid email address.</div>';
	} else if(!isEmail($email)) {
		$error = '<div class="error_message">Attention! You have entered an invalid e-mail address, try again.</div>';
	} else if(trim($subject) == '') {
		$error = '<div class="error_message">Attention! Please enter a subject.</div>';
	} else if(trim($comments) == '') {
		$error = '<div class="error_message">Attention! Please enter your message.</div>';
	} else if(trim($verify) == '') {
		$error = '<div class="error_message">Attention! Please enter the verification number.</div>';
	} else if(trim($verify) != '4' && trim(strtolower($verify)) != 'four') {
		$error = '<div class="error_message">Attention! The verification number that you entered is incorrect.</div>';
	}

	if($error == '') {
		$sent = true;
		if(get_magic_quotes_gpc()) {
			$comments = stripslashes($comments);
		}
		$address = "andrewchurch@gmail.com";
		//$address = "markjmaloney@gmail.com";
		$e_subject = 'You\'ve been contacted by ' . $name . '.';
		$e_body = "You have been contacted by $name with regards to $subject, their additional message is as follows.\r\n\n";
		$e_content = "\"$comments\"\r\n\n";
		$e_reply = "You can contact $name via email, $email";
		$msg = $e_body . $e_content . $e_reply;
		
		mail($address, $e_subject, $msg, "From: $email\r\nReply-To: $email\r\nReturn-Path: $email\r\n");
	}
} ?>	
<!DOCTYPE html>
<html>
<head>
	<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/head.inc.php' ?>	
	<title>Mark Maloney</title>
	<meta name="description" content="Mark Maloney, an award-winning and deeply experienced interactive strategist and user experience designer based in Baltimore, MD">
	<link rel="stylesheet" type="text/css" href="/lib/css/mjm.css" />
</head>

<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/body.inc.php' ?>	

	<div id="container">

		<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/header.inc.php' ?>
		
		<h1>Contact</h1>

		<div id="contact">
			
			<?php if (!$sent): ?>
					
				<form  method="post" action="">

					<?php echo $error; ?>

					<label for=name accesskey=U><span class="required">*</span> Your Name</label>
					<input name="name" type="text" id="name" size="30" value="<?php echo $name ?>" />
					
					<br />
					
					<label for=email accesskey=E><span class="required">*</span> Email</label>
					<input name="email" type="text" id="email" size="30" value="<?php echo $email ?>" />
				
					<br />
					
					<label for=subject accesskey=S><span class="required">*</span> Subject</label>
					<?php $selected[$subject] = 'selected="selected"'; ?>
					<select name="subject" type="text" id="subject">
					<option value="Potential Engagement" <?php echo $selected['Potential Engagement'] ?>>I want to hire you.</option>
					<option value="Partnership" <?php echo $selected['Partnership'] ?>>I want to partner with you.</option>
					<option value="Question" <?php echo $selected['Question'] ?>>I have a quick question for you.</option>
					<option value="General" <?php echo $selected['General'] ?>>Just Saying "Hi!"</option>
					</select>
					
					<br />
					
					<label for=comments accesskey=C><span class="required">*</span> Your comments</label>
					<textarea name="comments" cols="40" rows="3"  id="comments"><?php echo $comments ?></textarea>
					
					<br />
					
					<label for=verify accesskey=V><span class="required">*</span> Three + one =</label>
					<input name="verify" type="text" id="verify" size="4" value="" />
					
					<br />
					
					<input name="contactus" type="submit" class="submit" id="contactus" value="Send Message" />
					
				</form>
				
			<?php else: ?>
				
				<p>Thanks <strong><?php echo $name ?></strong>, your message has been sent. I'll get right back to you. Promise!</p>

			<?php endif; ?>
						
		</div>

	</div>

	<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/js.inc.php' ?>

</body>
</html>
