/**
 *   Mjs source file hamburgerMenu,
 *   Copyright (C) 2016  James M Adams
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU Lesser General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU Lesser General Public License for more details.
 *
 *   You should have received a copy of the GNU Lesser General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
'use strict';
$(document).ready(function(){

	//console.log('hamburger menu ready');

	//menu click
	$('.header .hamburger').click(function(event){
		event.preventDefault();
		//console.log('clicked hamburger');

		if($('body').hasClass('menuOpen')){
			$('body').removeClass('menuOpen');
		}else{
			$('body').addClass('menuOpen');
		}
	});

	//about click
	$('.hamburger.menu .infoButton').click(function(event){
		event.preventDefault();

		console.log('clicked infoButton',$(this).attr('href'));
		var href = $(this).attr('href');
		var aboutDialog = new InfoDialog(href);
	});
});
