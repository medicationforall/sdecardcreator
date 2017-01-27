/**
 *   SDE Card Creator source file Form,
 *   Copyright (C) 2015  James M Adams
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


function sdeCreate(){

//data
this.keywordSettings;

//constructor
this._constructor = function(){
	this.setupCardScale();
	this.setupCardType();
	this.setupRegionColor();
	this.setupOrientation();
	this.setupHeader();
	this.setupImage();
	this.setupCreepSpawn();
	this.setupStats();
	this.setupItemStat();
	this.setupHelpButton();
	this.setupKeywords();
	this.setupKeywordSettings();
	this.setupKeywordDefinitionCheck();

	this.setupAddAbility();
	this.setupListeners();

	this.setupBit();
	this.setupFlavorText();
}


/**
 *
 */
this.setupListeners = function(event){
	var that = this;

	$('.form').on('checkKeywords',function(event){
		that.checkKeywords();
	});


	$('.form').on('resolved-keywords',function(event){
		that.initializeAbility();
	});

	$('.form').on('reset',this.reset);
}


/**
 *
 */
this.setupCardScale = function(){
	$('input[name=cardScale]').on('input',function(event){
		$('.card').css("transform","scale("+$(this).val()+","+$(this).val()+")").css('transform-origin','top left');

		$('.cardContainer').css('width',($('.card').width()*parseFloat($(this).val())));
		$('.cardContainer').css('height',($('.card').height()*parseFloat($(this).val())));
	});
}


/**
 *
 */
this.setupCardType = function(){
	var selectedCardType = $('#cardType').val();
	var that = this;

	$("select[name=cardType]").change(function(event){
		//modify displayed elements
		$('.hero, .monster, .pet, .treasure, .loot, .wonder, .explore, .arcade, .command, .timeout').css('display','none');
		$('.'+$(this).val()).css('display','');

		//modify card color
		$('.card').removeClass('hero monster pet treasure loot wonder explore arcade command timeout').addClass($(this).val()).css('display','');

		that.setProfileDefaultAvatar($(this).val());


		that.checkStatsForDisplay();

		selectedCardType = $(this).val();
	});

	$("select[name=cardType]").trigger('change');
}


/**
 *
 */
this.setProfileDefaultAvatar = function(v){

	if($('.form input[name=imageSource][value=default]').is(':checked')){
		//set default profiles
		if(v === 'hero'){
			$('.character').attr('src', 'image/barbsilo.png');
		} else if(v === 'monster'){
			$('.character').attr('src', 'image/dragonsilo.png');
		} else if(v === 'pet'){
			$('.character').attr('src', 'image/bunnysilo.png');
		} else if(v === 'loot'){
			$('.character').attr('src', 'image/armor.png');
		} else if(v === 'treasure'){
			$('.character').attr('src', 'image/weapon.png');
		} else if(v === 'wonder'){
			$('.character').attr('src', 'image/wonder.png');
		} else if(v === 'explore'){
			$('.character').attr('src', 'image/trap.png');
		} else if(v === 'timeout'){
			$('.character').attr('src', 'image/gorosilo.png');
		} else if(v === 'command'){
			$('.character').attr('src', 'image/koboldgoupsilo.png');
		}
	}
}


/**
 *
 */
this.checkStatsForDisplay = function(){
	$('.form .stats input').each(function(){
		if($(this).val()===''){
			$('.card .front .stat.'+$(this).attr('name')).css('display','none');			
		}
	});
}


/**
 *
 */
this.setupRegionColor = function(){
	var card = $('.card');

	$("select[name=region]").change(function(event){
		$(this).find('option').each(function() {
			card.removeClass($(this).val());
		});

		card.addClass($(this).val());
	});

	$("select[name=region]").trigger('change');
}


/**
 *
 */
this.setupOrientation = function(){
	$('select[name="orientation"]').change(function(event){
		console.log("Change orientation",$(this).val());

		$('.card .item .contentBorder, .card .item .placeHolder').removeClass('ruby sapphire citrine emerald').addClass($(this).val());


		if($(this).val() === 'ruby' || $(this).val() === 'citrine'){

			$('.card .item .placeHolder').before($('.card .item .contentBorder'));

		}else if($(this).val() === 'sapphire' || $(this).val() === 'emerald'){

			$('.card .item .contentBorder').before($('.card .item .placeHolder'));

		}
	});

}


/**
 *
 */
this.setupImage = function(){
	var that = this;

	this.setupBackground();
	this.setupBackgroundFlip();

	//setup radio 
	$('.form input[name=imageSource]').change(function(){
		console.log($(this).val());
		var value = $(this).val();

		//reset creepSpawn back to display none.
		$('.item .creepSpawn').css('display','');

		if(value === "default"){
			that.setProfileDefaultAvatar($(".form select[name=cardType]").val());
		} else if(value === "local"){
			$(".form  input[name=character]").trigger('change');
		} else if(value === "remote"){
			$('.form input[name=rCharacter]').trigger('input');
		} else if(value === "creep"){
			$('.character').attr('src', 'image/creepSpawn.png');
			$('.item .creepSpawn').css('display','inline');
			//$('.form input[name=rCharacter]').trigger('input');
		}
	});


	$(".form input[name=rCharacter]").on('input',function(){
		$('.character').attr('src', $(this).val());
		$('.form input[name=imageSource][value=remote]').attr('checked','checked');
	});


	$(".form input[name=character]").change(function(){
        	that.readURL(this);
		$('.form input[name=imageSource][value=local]').attr('checked','checked');
	});

	//initilize background
	$("select[name=background]").trigger('change');


	//setup draggable
	$('.card .front .character').draggable({containment:'parent'});
}

/**
 *
 */
this.setupCreepSpawn = function(){
	this.linkToTemplate("creepSpawn");
}


/**
 *
 */
this.setupBackground = function(){
	//setup background
	$("select[name=background]").change(function(event){
		//if($(this).val()!=='---'){
			$('.background').css("background","url('image/background/"+$(this).val()+"') no-repeat");
			$('.background').css("background-size","100% 100%");
		//}
	});
}


/**
 *
 */
this.setupBackgroundFlip = function(){
	$("input[name=backgroundFlip]").change(function(event){
		if($(this).is(':checked')){
			$('.background').css('transform','scaleX(-1)');
		}else{
			$('.background').css('transform','');
		}
	});
}


/**
 *
 */
this.setupHeader = function(){
	this.linkToTemplate("title");
	this.linkToTemplate("subTitle");
	this.linkToTemplate("actions");
	this.linkToTemplate("move");
	this.linkToTemplate("potions");
}


/**
 *
 */
this.setupStats = function(){

	strStat = new Stat("STR", 'hero monster pet', '3b 1sw');
	armStat = new Stat("ARM", 'hero monster pet', '2b 1r sh');
	willStat = new Stat("WILL", 'hero monster', '3b');
	dexStat = new Stat("DEX", 'hero monster', '3b');


	this.linkToTemplateStat("STR",strStat);
	this.linkToTemplateStat("ARM",armStat);
	this.linkToTemplateStat("WILL",willStat);
	this.linkToTemplateStat("DEX",dexStat);
}


/**
 *
 */
this.setupItemStat = function(){
	this.linkToTemplate('itemStats','input',this.parseItemStat);
	$('input[name=itemStats]').trigger('input');
}


/**
 *
 */
 this.setupHelpButton = function(){
		$('.form .helpButton').click(function(event){
			event.preventDefault();
			$(this).closest('div').find('.helpBlock').toggle();
			//$('.form .statHelpBlock').toggle();
		});
 }


/**
 *
 */
this.setupKeywords = function(){
	$("select[name=affinity]").change(function(event){
		//alert($(this).val());
		$('.affinity').removeClass('ruby citrine emerald sapphire amethyst all');
		$('.affinity').addClass($(this).val());
	});

	this.linkToTemplate("keywordsList",'input',this.findKeywords,this.checkKeywords);
	this.linkToTemplate("wounds");
	this.linkToTemplate("skulls");
}


/**
 *
 */
this.setupKeywordSettings = function(){
	var that = this;

	$('.form .keywordSettings').click(function(event){
		event.preventDefault();

		if(that.keywordSettings === undefined){
			that.keywordSettings = new KeywordSettings();
		}else{
			that.keywordSettings.setupList();
		}

		that.keywordSettings.reset();
		$('.keyword.settings').dialog({dialogClass: "keywordSettingsDialog", width: 500});
	});
}


/**
 *
 */
this.setupKeywordDefinitionCheck = function(){
	$('.form input[name="keywordDefinitionCheck"]').change(function(event){
		console.log('setupKeywordDefinitionCheck',$(this).is(':checked'));
		$('.form').trigger('checkKeywords');
	});
}


/**
 *
 */
this.findDice = function(text){
	return keywordStore.findDice(text);
}


/**
 *
 */
this.findStats = function(text){
	return keywordStore.findStats(text);
}


/**
 *
 */
this.findAffinity = function(text){
	return keywordStore.findAffinity(text);
}


/**
 *
 */
this.setupAddAbility = function(){
	var that = this;

	$('.form .abilities').sortable({containment: "parent", tolerance: "pointer", 'ui-floating': 'auto', axis:'y', placeholder: "ui-state-highlight",
		forceHelperSize: false, update:function(event,ui){
		//console.log('abilities change event',$(ui.item).data('ability'));
		that.handleAbilityUpdate();
	}});

	$('.form .addAbility').click(function(event){
		event.preventDefault();
		//console.log("clicked add ability");

		var ability = new Ability();
		that.setupAbility(ability);
	});

	$('.form .abilities').on('click','.closeAbility',function(event){
		event.preventDefault();
		var parent = $(this).parent();
		var ability = $(parent).data('ability');

		$('.card .ability[data-ability="'+ability+'"]').remove();
		$(parent).remove();

		$('.form').trigger('checkKeywords');
	});

}

/**
 *
 */
this.handleAbilityUpdate = function(){
	console.log('call update order');

	//loop through from abilities in order
	$('.form .ability').each(function(index,item){
		var abilityId = $(item).data('ability');

		//loop through card abilities change order for model and item 
		$('.card .model .ability[data-ability="'+abilityId+'"]').detach().appendTo($('.card .model .abilities'));
		$('.card .item .ability[data-ability="'+abilityId+'"]').detach().appendTo($('.card .item .abilities'));
		$('.card .back .ability[data-ability="'+abilityId+'"]').detach().appendTo($('.card .back .abilities'));
	});

	$('.form').trigger('checkKeywords');
}

/**
 *
 */
this.initializeAbility = function(){
	$('.addAbility').trigger('click');
	$('.form .ability textarea[name="definition"]').val('+1r -2b 3g 4o 5p 1st 0mi 1ma 2sw 3rg augment fire STR WILL DEX ARM 1ac 2mo 0sh +1he').trigger('input');
}


/**
 *
 */
this.setupAbility = function(ability){
	//create the nodes
	var cardNode = $(ability.getCardTemplate()).appendTo('.card .abilities');
	var formNode = $(ability.getFormTemplate()).appendTo('.form .abilities');

	this.linkAbilityType(formNode, cardNode);
	this.link($(formNode).find('input[name="cost"]'),$(cardNode).find('.cost'),this.parseAbilityCost);
	this.link($(formNode).find('input[name="name"]'),$(cardNode).find('.name'));
	this.link($(formNode).find('textarea[name="definition"]'),$(cardNode).find('.definition'),this.parseAbility,this.checkKeywords);


	return formNode;
}


/**
 *
 */
this.parseAbility = function(text){
	var kText = this.findKeywords(text);
	var dText = this.findDice(kText);

	return this.findStats(dText);
}


/**
 *
 */
this.parseAbilityCost = function(text){
	if(text==="0"){
		text = '&nbsp;';
	}

	return text;
}


/**
 *
 */
this.parseItemStat = function(text){
	text = this.findDice(text);
	text = this.findAffinity(text);
	text = this.findKeywords(text);
	return this.findStats(text);
}


/**
 *
 */
this.setupBit = function(){
	$('.form select[name=bit]').change(function(event){

		$(this).find('option').each(function(){
			$('.card .bit').removeClass($(this).val());
		});

		$('.card .bit').addClass($(this).val());
	});
}


/**
 *
 */
this.setupFlavorText = function(){
	this.link($('textarea[name="flavorText"]'),$('span.flavorText'));
}


/**
 *
 */
this.readURL = function(input){
	if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.card .front .character').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
}


/**
 *Passthrough method that calls findKeywords on the keyword store.
 */
this.findKeywords =  function(text){
	text = keywordStore.findKeywords(text);
	text = keywordStore.findNKeywords(text);
	return text;
}


/**
 *Passthrough method that calls checkKeywords on the keyword store. 
 */
this.checkKeywords = function(){
	keywordStore.checkKeywords($('.card .front'));
}


/**
 *As the input changes it modifies the template linked span
 */
this.linkToTemplate = function(name,tag,parser,checker){
	//resolve tag
	if(tag === undefined){
		tag = 'input';
	}
	this.link($(tag+"[name='"+name+"']"),$('span.'+name),parser,checker);
}


/**
 *Generic linker which takes an input node, output node, parser callback, and checker callback.
 */
this.link = function(input,output,parser,checker){
	var that = this;
	var reset = $(output).first().text();

	$(input).on('input', function(event){
		if($(this).val() !== ''){

			if(parser===undefined){
				$(output).text($(this).val());
			} else{
				//parses out html without placing the string into the domNode
				var text = $("<div/>").html($(this).val()).text();
				$(output).html($.proxy(parser,that)(text));
			}
		} else{
			$(output).text(reset);
		}

		if(checker){
			$.proxy(checker,that)();
		}
	});
}


/**
 *
 */
this.linkToTemplateStat = function(name,stat){
	$("input[name='"+name+"']").on('input',function(event){
			stat.setValue($(this).val());
	});
}



/**
 *
 */
this.linkAbilityType = function(formNode, cardNode){
	$(formNode).find('select[name="costType"]').change(function(event){
		var parent = $(this).parent().parent();

		//reset
		$(cardNode).find('.name, .colon, .definition').css('display','');
		$(parent).find('input[name="name"],input[name="cost"], textarea[name="definition"]').parent().css('display','');
		$(cardNode).find('.cost').removeClass('attack support emergencyPotion supportPotion offensePotion special definitionOnly nameOnly');

		$(cardNode).find('.cost').addClass($(this).val());


		//card ability display
		if($(this).val()==='definitionOnly'){
			$(cardNode).find('.name, .colon').css('display','none');	
		}else if($(this).val()==='nameOnly'){
			$(cardNode).find('.colon, .definition').css('display','none');
		}

		//for ability display
		if($(this).val()==='special'){
			$(parent).find('input[name="cost"]').parent().css('display','none');
		} else if($(this).val()==='definitionOnly'){
			$(parent).find('input[name="name"],input[name="cost"]').parent().css('display','none');
		} else if($(this).val()==='nameOnly'){
			$(parent).find('input[name="cost"],textarea[name="definition"]').parent().css('display','none');
		}
	});
}



/**
 *Returns a data object containing all of the form data to represent the card.
 */
this.gatherData = function(){
	var data = {};

	this.getData(data,'select','cardType');
	this.getData(data,'select','region');
	this.getData(data,'select','orientation');
	this.getData(data,'input','title');
	this.getData(data,'input','subTitle');
	this.getData(data,'input','move');
	this.getData(data,'input','actions');
	this.getData(data,'input','potions');
	this.getData(data,'input','wounds');
	this.getData(data,'input','skulls');
	this.getData(data,'input','keywordsList');
	this.getData(data,'select','background');
	this.getData(data,'input','backgroundFlip',true);

	//save image selection type
	data.imageSource = $('.form input[name=imageSource]:checked').val();
	data.remoteAvatar = $("input[name=rCharacter]").val();

	if(data.imageSource === 'local'){
		data.avatarData = $(".card .front .character").attr('src');
	}

	this.getData(data,'input','creepSpawn');

	this.getData(data,'input','STR');
	this.getData(data,'input','ARM');
	this.getData(data,'input','WILL');
	this.getData(data,'input','DEX');
	this.getData(data,'input','itemStats');

	this.getData(data,'select','bit');
	this.getData(data,'textarea','flavorText');

	data.abilities = [];

	$('.form .ability').each(function(){
		var ability = {};
		ability.costType=$(this).find('select[name="costType"]').val();
		ability.cost=$(this).find('input[name="cost"]').val();
		ability.name=$(this).find('input[name="name"]').val();
		ability.definition=$(this).find('textarea[name="definition"]').val();
		data.abilities.push(ability);
	});

	if(keywordStore.customKeywords !==undefined){
		data.customKeywords = keywordStore.customKeywords;
	}

	this.getData(data,'select','affinity');
	console.log(data);

	return data;
}


/**
 *Collects the data for a single form field if the css display propery is not none. 
 *Also checks 2 parent levels up for the display property. 
 *If it's determined to be visible the object is add to the data object. 
 */
this.getData = function(data,type,name,checkbox){
	var node = $('.form '+type+'[name="'+name+'"]');

	if(node.css('display')==='none' || node.parent().css('display')==='none' || node.parent().parent().css('display')=== 'none'){
		return;
	}

	if(checkbox){
		data[name] = node.is(':checked');

	}else{
		data[name] = node.val();
	}
}


/**
 *
 */
this.setData = function(data){
	console.log('calling form setData',data);
	$('.form form').trigger('reset');

	if(data.customKeywords !== undefined){
		keywordStore.setCustomKeywords(data.customKeywords);
	}

	$("select[name=cardType]").val(data.cardType).trigger('change');

	if(data.region){
		$("select[name=region]").val(data.region).trigger('change');
	}

	if(data.orientation){
		$('select[name="orientation"]').val(data.orientation).trigger('change');
	}

	$("input[name=title]").val(data.title).removeClass('fail').trigger('input');
	$("input[name=subTitle]").val(data.subTitle).trigger('input');

	$("input[name=move]").val(data.move).trigger('input');
	$("input[name=actions]").val(data.actions).trigger('input')
	$("input[name=potions]").val(data.potions).trigger('input');
	$("input[name=wounds]").val(data.wounds).trigger('input')
	$("input[name=skulls]").val(data.skulls).trigger('input');

	$("input[name=keywordsList]").val(data.keywordsList);
	if(data.keywordsList){
		$("span.keywordsList").html(this.findKeywords(data.keywordsList));
	}
	this.checkKeywords();


//BACKGROUND
	$("select[name=background]").val(data.background).trigger('change');
	$("input[name=backgroundFlip]").prop('checked',data.backgroundFlip).trigger('change');


//IMAGE
	//order matters kids!
	$("input[name=rCharacter]").val(data.remoteAvatar).trigger('input');

	if(data.imageSource === undefined){
		data.imageSource = 'default';
	}

	//set radio button
	console.log(data.imageSource,$("input[name=imageSource][value="+data.imageSource+"]").is(':checked'));
	if($("input[name=imageSource][value="+data.imageSource+"]").is(':checked')===false){
		$("input[name=imageSource][value="+data.imageSource+"]").prop('checked',true).trigger('change');
	}

	//todo fix character image load
	if(data.imageSource==='local' && data.avatarData){
		$(".card .front .character").attr('src',data.avatarData);
	} else if(data.imageSource==='default'){
		this.setProfileDefaultAvatar();
	}

	if(data.creepSpawn){
	$('input[name="creepSpawn"]').val(data.creepSpawn).trigger('input');
	}

//STATS
	$("input[name=STR]").val(data.STR).trigger('input');
	$("input[name=ARM]").val(data.ARM).trigger('input');
	$("input[name=WILL]").val(data.WILL).trigger('input');
	$("input[name=DEX]").val(data.DEX).trigger('input');
	$('input[name=itemStats]').val(data.itemStats).trigger('input');

	$("select[name=bit]").val(data.bit).trigger('change');

	$("textarea[name=flavorText]").val(data.flavorText).trigger('input');

	$("select[name=affinity]").val(data.affinity).trigger('change');


//ABILITIES
	for(var i=0;i<data.abilities.length;i++){
		var ability = new Ability();
		var formNode = this.setupAbility(ability);

		$(formNode).find("select[name=costType]").val(data.abilities[i].costType).trigger('change');
		$(formNode).find("input[name=cost]").val(data.abilities[i].cost).trigger('input');
		$(formNode).find("input[name=name]").val(data.abilities[i].name).trigger('input');
		$(formNode).find("textarea[name=definition]").val(data.abilities[i].definition).trigger('input');
	}
}


/**
 *
 */
this.reset = function(){

	//setTimeout(function() {
		$('.form .ability .closeAbility').trigger('click');

		/*$('.form input').not('input[name="keywordsList"]').trigger('input');
		$("span.keywordsList").empty();
		//checkbox doesn't trigger change
		$('.form select').trigger('change');
		$('.form textarea').trigger('input');*/

		//$('.form').trigger('checkKeywords');
	//}, 0);
}


//main
	this._constructor();
}
