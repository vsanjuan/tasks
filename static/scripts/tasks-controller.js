
tasksController = function() {
	var taskPage;
	var initialised = false;
	return {
		init: function(page){
			if(!initialised){
				taskPage = page;
				$(taskPage).find('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required');
				$(taskPage).find('tbody tr:even').addClass('even');
				$(taskPage).find('#btnAddTask').click(function(evt){
					evt.preventDefault();
					console.log('Add task')
					$(taskPage).find('#taskCreation').removeClass('not');
				});
				$(taskPage).find('tbody tr').click(function(evt) {
					console.log("Hightlight")
					$(evt.target).closest('td').siblings().andSelf().toggleClass('rowHightlight');
				});
				$(taskPage).find('#tblTasks tbody').on('click','.deleteRow', function(evt){
					evt.preventDefault();
					$(evt.target).parents('tr').remove();
				});
				$(taskPage).find('#saveTask').click(function(evt){
					evt.preventDefault();
					if($(taskPage).find('form').valid()){
					var task = $('form').toObject();
					$('#taskRow').tmpl(task).appendTo($('#tblTasks tbody'));
					}
				});
				initialised = true;
			}
		}
	}
}();

/*
	// Adds an * to the labels of the text boxes marked asa required
	$('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required')
	// Adds the class even to the rows in the table that have an even number
	$('tbody tr:even').addClass('even');
	// When you click on the element id btnAddTask removes the class not from the elements with id taskCreation
	// this makes the section visible because the css for the class not id is display: none
	$('#btnAddTask').click(function(evt){
		evt.preventDefault();
		$('#taskCreation').removeClass('not');
	});
	$('tbody tr').click(function(evt) {
	$(evt.target).closest('td').siblings().andSelf().toggleClass('rowHightlight');
	});
	$('#tblTasks tbody').on('click','.deleteRow', function(evt){
		evt.preventDefault();
		$(evt.target).parents('tr').remove();
		});
	$('#saveTask').click(function(evt){
		evt.preventDefault();
		var task = $('form').toObject();
		$('#taskRow').tmpl(task).appendTo($('#tblTasks tbody'));
	});
	
	*/