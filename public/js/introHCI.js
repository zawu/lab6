'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}
var idNumber;
$("p").click(function(e)
{
	var projectID = $(this).closest('.project').attr('id');
	idNumber = projectID.substr('project'.length);
	console.log("/project/" + idNumber);
	$.get("/project/" + idNumber, addProject);
})

function addProject(result){
	console.log(result);
	var projectHTML = '<a href="#" class ="thumbnail">' + 
	'<img src="' + result['image'] + '" class="detailsImage">' +
	 '<p>' + result['title'] + '</p>' + '<p><small>' +
	  result['date'] + '</small></p></a>' + result['summary'];
	//var projectID = $(this).closest('.project').attr('id');
	//var idNumber = projectID.substr('project'.length);
	//$(""#project"+idNumber > ".details"").html("FOO");
	// var test = '#project'+idNumber + ' > details';
	// console.log(test);
	// $("#project"+idNumber + " details").html("FOO");
	// $(test).html("FOO");	
	$('#project'+idNumber+ ' .details').html(projectHTML);	
	//$("#project-description").html(result['summary']);
}
/*	
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", addColor);
}

function addColor(result){
	var temp = result['colors'];
	var colors = temp['hex'];
	console.log(colors);
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}