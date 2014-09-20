/**
*The client must call this to initialize the storage engine before using it.
*If the storage engine initializes successfully the successCallback will be invoked with
*a null object.
	*If the errorCallback is invoked then the storage engine cannot be used.
	*It should be possible to call this method multiple times, and the same result wil be
	returned each time.
	*
	*@param{Function} successCallback. The callback will be invoked if the storage engine
	initializes.
	@param{Function} errorCallback. The callback that will be invoked in error scenarios.
	*/
	function init(successCallback, errorCallback)