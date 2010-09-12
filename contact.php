<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/config.inc.php' ?>	
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
			
			<fieldset>
				
				<form  method="post" action="">
					
					<label for=name accesskey=U><span class="required">*</span> Your Name</label>
					<input name="name" type="text" id="name" size="30" value="" />
					<br />
					<label for=email accesskey=E><span class="required">*</span> Email</label>
					
					<input name="email" type="text" id="email" size="30" value="" />
					<br />
					<label for=subject accesskey=S><span class="required">*</span> Subject</label>
					<select name="subject" type="text" id="subject">
					<option value="Potential Engagement">I want to hire you.</option>
					<option value="Partnership">I want to partner with you.</option>
					
					<option value="Question">I have a quick question for you.</option>
					<option value="General">Just Saying "Hi!"</option>
					</select>
					<br />
					<label for=comments accesskey=C><span class="required">*</span> Your comments</label>
					<textarea name="comments" cols="40" rows="3"  id="comments"></textarea>
					
					<br />
					<label for=verify accesskey=V><span class="required">*</span> Three + one =</label>
					<input name="verify" type="text" id="verify" size="4" value="" />
					<br />
					<input name="contactus" type="submit" class="submit" id="contactus" value="Send Message" />
					
				</form>
				
			</fieldset>
		
		</div>

	</div>

	<?php include $_SERVER['DOCUMENT_ROOT'] . '/lib/includes/js.inc.php' ?>

</body>
</html>
