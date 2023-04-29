"use strict";

$(document).ready( () => {
	
	$('#staticFirstName').focus();	
	const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;  
	
	var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/; 	

	$('#submit').click(function(){
		var days = parseInt($('#days').val());			//Get value of days
		if($('#pickup_date').val() == "")				//check pickup date is empty or not
		{
			$('#pickup_date_error').text("This field is required");		//Error message
			return false;
		}else if(!dateformat.test($("#pickup_date").val()))				//Check date pattern with user input
		{
			$("#pickup_date_error").text("Must be valid formate (DD/MM/YYYY)"); 	//set message
			return false;

		}else if(days == "")							//if days is empty then print below msg
		{
			$('#days_error').text("This field is required");
			return false;
		}
		else if(isNaN(days)){							//if days is NaN then return the error msg
			$('#days_error').text("Must be numeric");
			return false;
		}
		else if($("#name").val()=="")					//if name is empty
		{
			$("#name_error").text("This field is required");		//set message
			return false;
		}else if($("#email").val()=="")					//if email is empty
		{	
			$("#email_error").text("This field is required");		//set message
			return false;
		}else if(!emailPattern.test($("#email").val()))	//validate email pattern
		{
			$("#email_error").text("Must be valid email address");	//set message
			return false;
		}else if($("#phone").val()=="")					//if phone number is empty
		{	
			$("#phone_error").text("This field is required");		//set message
			return false;
		}else if(!phonePattern.test($("#phone").val())) //validate phone number 10 digit
		{
			$("#phone_error").text("Enter valid phone number");	//set message
			return false;
		}		
	})
		
}); // end ready