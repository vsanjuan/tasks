
tasksController = function() {
	function errorLogger(errorCode, errorMessage){
		console.log(errorCode+' '+ errorMessage);
	}
	var taskPage;
	var initialised = false;
	
	function taskCountChanged(){
		var count = $(taskPage).find('#tblTasks tbody tr').length;
		$('footer').find('#taskCount').text(count);
	}
	
	function clearTask() {
		$(taskPage).find('form').fromObject({});
	}
	
	function renderTable() {
		$.each($(taskPage).find('#tblTasks tbody tr') , function(idx, row){
			var due = Date.parse($(row).find('[datetime]').text());
			if(due.compareTo(Date.today()) < 0) {
				$(row).addClass("overdue");
			} else if(due.compareTo((2).days().fromNow()) <=0) {
				$(row).addClass("warning");
			}
		});
	}
	
	return {
		init: function(page, callback){
			if(initialised){
				callback()
			} else {
				taskPage = page;
				storageEngine.init(function(){
					storageEngine.initObjectStore('task',function(){
							callback();
					},errorLogger)
				},errorLogger)};
			if(!initialised){
				taskPage = page;
				$(taskPage).find('[required="required"]').prev('label').append('<span>*</span>').children('span').addClass('required');
				$(taskPage).find('#btnAddTask').click(function(evt){
					evt.preventDefault();
					$(taskPage).find('#taskCreation').removeClass('not');
				});
				$(taskPage).find('#tblTasks tbody').on('click', 'tr', function(evt) {
					$(evt.target).closest('td').siblings().andSelf().toggleClass('rowHightlight');
				});
				$(taskPage).find('#tblTasks tbody').on('click','.deleteRow', 
				function(evt){
					storageEngine.delete('task',$(evt.target).data().taskId, 
					function(){
						$(evt.target).parents('tr').remove();
						taskCountChanged();
					},errorLogger);
				});
				$(taskPage).find('#saveTask').click(function(evt){
					evt.preventDefault();
					if($(taskPage).find('form').valid()){
						var task = $('form').toObject();
						storageEngine.save('task',task,
						function() {
							$(taskPage).find('#tblTasks tbody').empty();
							tasksController.loadTasks();
							clearTask();
							$(taskPage).find('#taskCreation').addClass('not');
						},errorLogger);
					}
				});
				$(taskPage).find('#tblTasks tbody').on('click', '.editRow',
				function(evt) {
					$(taskPage).find('#taskCreation').removeClass('not');
					storageEngine.findById('task', $(evt.target).data().taskId,
					function(task) {
						$(taskPage).find('form').fromObject(task);
					}, errorLogger);
				});
				$(taskPage).find('#tblTasks tbody').on('click', '.completeRow', function(evt){
					storageEngine.findById('task',$(evt.target).data().taskId, function(task){
						task.complete = true;
						storageEngine.save('task', task, function(){
							tasksController.loadTasks();
						},errorLogger);
					},errorLogger);
				});
				$(taskPage).find('#clearTask').click(function(evt){
					evt.preventDefault();
					clearTask();
				});
				initialised = true;
			}
		},
		loadTasks: function() {
			$(taskPage).find('#tblTasks tbody').empty();
			storageEngine.findAll('task',function(task){
				$.each(task, function(index,task){
					if(!task.complete){
						task.complete = false;
					}
					$('#taskRow').tmpl(task).appendTo($(taskPage).find('#tblTasks tbody'));
				});
				taskCountChanged();
				renderTable();
				$(taskPage).find('tbody tr:even').addClass('even');
			},errorLogger);
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