


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
	
/**
*The client must call this to initialize a specific object type in the storage engine.
*If the storage engine supports the object type the successCallback will be invoked.
with a null value.
*It should be possible to call this method multiple times, and the same result will be
returned each time.
*If the errorCallback is invoked then the object type cannot be stored.
*
*@param{String} type. The type of the object that will be stored.
*@param{Function} successCallback . The callback that will be invoked if the storage
engine initializes.
*@param{Function} errorCallback . The callback that will be invoked on error scenarios.
*/
function initObjectStore(type, successCallback, errorCallback)

/**
*This can be used to find all the objects for a specific type. 
*If there are no objects found for that type this will return an empty array.
*
*@param{String} type. The type of object that should be searched for.
*@param{Function} successCallback. The callback that will be invoked after the query
completes. This will be passed an array of objects conforming the request type.
*@param(Function) errorCallback. The callback that will be invoked on error scenarios.
*/
function findAll(type, successCallback, errorCallback)

/**
*This will return an object with a specific id for a specific type.
*If no object is found this will return null.
*
*@param{String}type. The type of object that should be searched for.
*@param{String|number} id . The unique ID of the object.
*@param{Function} successCallback. The callback that will be invoked after the query
*completes. This will be passed an object conforming to the request type or null.
*@param{Function} errorCallback. The callback that will be invoked on error scenarios.
*/
function findById(type, id, successCallback, errorCallback)

/**
*This will delete an object with a specific id for a specific type.
*If no object exists with that id, the error callback will be invoked.
*If an object is deleted this function will return the id of the deleted object
*to the successCallback.
*
*@param{String} type. The type of object that will be deleted.
*@param{String|number} id. The unique id of the object.
*@param{Function} successCallback. The callback that will be invoked after the
*object has been deleted from the storage engine. This will be passed the unique
*id of the deleted object.
*@param{Function} errorCallback. The callback that will be invoked on error scenarios.
*/
function delete(type, id, successCallback, errorCallback)

/**
*This can be used for querying objects based on a property value.
*A single property name can be passed in, along with the value that matches. Any
*objects with that value for the property specified will be returned.
*
*@param{String} type. The type of object that will be searched for.
*@param{String} propertyName. The property name to be matched.
*@param{String|number} propertyValue. The value that property should have.
*@param{Function} successCallback. The callback that will be invoked after the
*query completes. This will be an array of one or more objects of the specified type.
*@param{Function} errorCallback. The callback that will be invoked on error scenarios.
*/
function findByProperty(type, propertyName, propertyValue, successCallback, errorCallback)

/**
*This will be called in all success scenarios.
*@param{any} result. The success result, as documented on individual method calls.
*/
function successCallback(result)

/**
*This will be called in all failure scenarios.
*@param{String} errorCode. The type of exception.
*@param{String} error message. A human readable version of the error message.
*/
function errorCallback(errorCode, errorMessage)


