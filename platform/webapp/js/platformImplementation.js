var xBrowserSync = xBrowserSync || {};
xBrowserSync.App = xBrowserSync.App || {};

/* ------------------------------------------------------------------------------------
 * Class name:  xBrowserSync.App.PlatformImplementation 
 * Description: Implements xBrowserSync.App.Platform for web app.
 * ------------------------------------------------------------------------------------ */

xBrowserSync.App.PlatformImplementation = function($q, $timeout, $interval, platform, global, utility, bookmarks) {
	'use strict';

/* ------------------------------------------------------------------------------------
 * Platform variables
 * ------------------------------------------------------------------------------------ */

	var constants = {
		"title": {
			"message": "xBrowserSync"
		},
		"description": {
			"message": "Browser syncing as it should be: secure, anonymous and free!"
		},
		"bookmarksToolbarTitle": {
			"message": "Bookmarks bar"
		},
		"bookmarksOtherTitle": {
			"message": "Other bookmarks"
		},
		"tooltipSyncEnabled": {
			"message": "sync enabled"
		},
		"tooltipWorking": {
			"message": "syncing..."
		},
		"button_Help_Label": {
			"message": "Display help"
		},
		"button_Next_Label": {
			"message": "Next"
		},
		"button_Previous_Label": {
			"message": "Previous"
		},
		"introPanel1_Message": {
			"message": "<h4>Welcome</h4><p>Thanks for using xBrowserSync!</p><p>Have a read through the following pages to help you get started. Should you require futher help, check out the <a href='https://www.xbrowsersync.org/#faqs' class='new-tab'>FAQs</a>.</p>"
		},
		"introPanel2_Message": {
			"message": "<h4>Your secret word</h4><p>To begin, enter a secret word or phrase that will be used to encrypt and decrypt your browser data.</p><p>Make it strong to protect your data but also memorable, if you forget it we can't remind you and you won't be able to decrypt your data without it.</p>"
		},
		"introPanel3_Message": {
			"message": "<h4>Syncing for the first time</h4><p>Once you've entered your secret word or phrase, you are ready to create a new sync. Just click the Sync button and your browser data will be encrypted before being synced to the xBrowserSync service.</p><p>And that's it, you're synced! Any future changes will be synced automatically in the background.</p>"
		},
		"introPanel4_Message": {
			"message": "<h4>Your xBrowserSync ID</h4><p>Every time you create a new sync you are given a new xBrowserSync ID, which can be found via the Settings panel.</p><p>You can use this ID along with your corresponding secret word or phrase to retrieve your synced data or sync on a different device.</p>"
		},
		"introPanel5_Message": {
			"message": "<h4>Syncing to another service</h4><p>When creating new syncs, by default your data is synced to the official xBrowserSync service, but you can change the service you sync to via the Settings panel.</p><p>You may do this because the service is full, offline, or perhaps you would like to <a href='https://github.com/xBrowserSync/API' class='new-tab'>run your own xBrowserSync service</a> to sync your data to.</p>"
		},
		"introPanel6_Message": {
			"message": "<h4>New service, new ID</h4><p>IDs are service-specific. If you have created a sync and received an xBrowserSync ID with one service it cannot be used with another.</p><p>Whenever you change services you must create a new sync. You'll then receive a new ID for use with that service.</p>"
		},
		"introPanel7_Message": {
			"message": "<h4>Use it or lose it</h4><p>Service space is limited. If you do not use xBrowserSync for an extended period, any syncs you have created may be deleted to make room for others.</p><p>If you're synced, whenever you have your browser open xBrowserSync will sync regularly in the background which will prevent your sync from being deleted.</p>"
		},
		"introPanel8_Message": {
			"message": "<h4>Searching your bookmarks</h4><p>Once synced, all of your bookmarks will be available in the local browser which can be searched easily on the Search panel.</p><p>From there you can also modify or delete existing bookmarks. Just hover the mouse over a specific search result and click the pen icon to edit the bookmark.</p>"
		},
		"introPanel9_Message": {
			"message": "<h4>Native features supported</h4><p>Feel free to use your browser's native bookmarking features whilst synced, any changes you make there will be synced by xBrowserSync automatically.</p><p>If you have spent time organising your bookmarks don't worry, xBrowserSync will respect your existing bookmarks hierarchy!</p>"
		},
		"introPanel10_Message": {
			"message": "<h4>Adding a bookmark</h4><p>You can add the current page as a bookmark (or modify it if it is bookmarked already) by clicking on the bookmark icon in the Search panel.</p><p>Include a description which will be displayed in search results, and add tags to help find the bookmark more easily when searching.</p>"
		},
		"introPanel11_Message": {
			"message": "<h4>Remember to back up</h4><p>Back up and restore for your browser data is available via the Settings panel.</p><p>Back up saves your unencrypted browser data to a text file. Restore syncs your backed up data. If you are not currently synced, only local browser data will be affected.</p>"
		},
		"introPanel12_Message": {
			"message": "<h4>When switching services</h4><p>Back up your synced data using the first service before creating a new sync with the second, then restore your backed up data to the second service.</p><p>This will ensure that any bookmark descriptions and tags that are not supported natively by your browser are also synced.</p>"
		},
		"introPanel13_Message": {
			"message": "<h4>Shortcut xBrowserSync</h4><p>To access xBrowserSync quickly, assign a keyboard shortcut to activate the extension then just start typing to search your bookmarks.</p><p>Browse to chrome://extensions/, the keyboard shortcuts option is at the bottom of the page."
		},
		"introPanel14_Message": {
			"message": "<h4>Noticed an issue?</h4><p>If you've found a bug in xBrowserSync or would like to request a new feature, head on over to Git Hub and <a href='https://github.com/xBrowserSync/App/issues' class='new-tab'>submit an issue</a>.</p><p>Calling all coders! If you would like to help make xBrowserSync better, go ahead and fork the <a href='https://github.com/xBrowserSync/App' class='new-tab'>xBrowserSync Git Hub repo</a> and submit a pull request.</p>"
		},
		"button_Settings_Label": {
			"message": "Settings"
		},
		"button_AddBookmark_Label": {
			"message": "Add bookmark"
		},
		"button_DeleteBookmark_Label": {
			"message": "Delete bookmark"
		},
		"button_EditBookmark_Label": {
			"message": "Edit bookmark"
		},
		"field_ClientSecret_Label": {
			"message": "Secret"
		},
		"field_ClientSecret_Description": {
			"message": "Your secret word or phrase"
		},
		"field_Id_Label": {
			"message": "ID"
		},
		"field_Id_Description": {
			"message": "Your xBrowserSync ID"
		},
		"button_Sync_Enable_Label": {
			"message": "Sync"
		},
		"button_Sync_Disable_Label": {
			"message": "Disable Sync"
		},
		"confirmReplaceBookmarks_Title" : {
			"message":  "Overwrite browser data?"
		},
		"confirmReplaceBookmarks_Message" : {
			"message":  "xBrowserSync data will overwrite local browser data. OK to proceed?"
		},
		"button_Confirm_Label" : {
			"message":  "Yes"
		},
		"button_Deny_Label" : {
			"message":  "No"
		},
		"field_Search_Description" : {
			"message":  "Find a bookmark"
		},
		"noSearchResults_Message" : {
			"message":  "No bookmarks found"
		},
		"syncBookmarksToolbarConfirmation_Message": {
			"message":  "<p>Enabling syncing of the bookmarks bar will replace the bookmarks currently in the bookmarks bar with your synced bookmarks. OK to proceed?</p>"
		},
		"cancelSyncConfirmation_Message": {
			"message":  "<p>There is currently a sync in progress, if you proceed your local synced data will be incomplete. OK to proceed?</p>"
		},
		"serviceStatus_Label" : {
			"message":  "Service"
		},
		"serviceStatus_NoNewSyncs" : {
			"message":  "Online but not accepting new syncs"
		},
		"serviceStatus_Online" : {
			"message":  "Online"
		},
		"serviceStatus_Offline" : {
			"message":  "Offline"
		},
		"button_UpdateServiceUrl_Label" : {
			"message":  "Change Service"
		},
		"updateServiceUrlForm_Message" : {
			"message":  "Enter the URL of an alternative xBrowserSync service. You can check the list of public xBrowserSync services <a href='https://www.xbrowsersync.org/#status' class='new-tab'>here</a>."
		},
		"updateServiceUrlForm_Placeholder" : {
			"message":  "xBrowserSync service URL"
		},
		"button_UpdateServiceUrl_Submit_Label" : {
			"message":  "Update"
		},
		"button_Cancel_Label" : {
			"message":  "Cancel"
		},
		"confirmUpdateServiceUrl_Message": {
			"message":  "<p>After changing the service, the current sync will be disabled and you'll need to create a new sync.</p><p>If you have previously created a sync using this service and would like to retrieve your data, you can use the xBrowserSync ID provided at the time. OK to proceed?</p>"
		},
		"backupRestore_Title" : {
			"message":  "Back up and restore"
		},
		"backupRestore_Message" : {
			"message":  "<p>Back up your xBrowserSync data or restore from a previous backup.</p><p>If sync is not enabled, back up and restore will apply to local browser data only.</p>"
		},
		"button_Backup_Label" : {
			"message":  "Back Up"
		},
		"button_Restore_Label" : {
			"message":  "Restore"
		},
		"button_Done_Label" : {
			"message":  "Done"
		},
		"button_Clear_Label" : {
			"message":  "Clear"
		},
		"button_Close_Label" : {
			"message":  "Close"
		},
		"backupSuccess_Message" : {
			"message":  "Your data has been backed up to {fileName}, check downloaded files for the location."
		},
		"restoreSuccess_Message" : {
			"message":  "Your data has been restored."
		},
		"restoreForm_Message" : {
			"message":  "Copy the contents of a backup file to restore data."
		},
		"dataToRestore_Label" : {
			"message":  "Paste backup data"
		},
		"button_RestoreData_Label" : {
			"message":  "Restore Data"
		},
		"button_RestoreData_Invalid_Label" : {
			"message":  "Invalid Data"
		},
		"button_RestoreData_Ready_Label" : {
			"message":  "Ready to Restore"
		},
		"syncPanel_Title" : {
			"message":  "Sync"
		},
		"syncPanel_Message" : {
			"message":  "Disable syncing changes to the bookmarks bar if you want to sync your bookmarks to multiple browsers but prefer their bookmarks bars to display different links."
		},
		"syncPanel_Id_Label" : {
			"message":  "Your xBrowserSync ID"
		},
		"syncPanel_SyncBookmarksToolbar_Label" : {
			"message":  "Include bookmarks bar"
		},
		"confirmRestore_Sync_Message" : {
			"message":  "As sync is currently enabled, the data being restored will overwrite your xBrowserSync synced data. To restore data to the local browser only, disable sync before restoring. OK to proceed?"
		},
		"confirmRestore_NoSync_Message" : {
			"message":  "As sync is currently disabled, the data being restored will overwrite the local browser data. OK to proceed?"
		},
		"bookmarkPanel_Title_Add" : {
			"message":  "Add bookmark"
		},
		"bookmarkPanel_Title_Edit" : {
			"message":  "Edit bookmark"
		},
		"bookmarkPanel_Field_Title_Label": {
			"message": "Title"
		},
		"bookmarkPanel_Field_Url_Label": {
			"message": "URL"
		},
		"bookmarkPanel_Field_Description_Label": {
			"message": "Description"
		},
		"bookmarkPanel_Field_Tags_Label": {
			"message": "Tags"
		},
		"bookmarkPanel_Field_Tags_Placeholder": {
			"message": "tag 1, tag 2, tag 3, etc..."
		},
		"bookmarkPanel_Button_AddTags_Label": {
			"message": "Add"
		},
		"bookmarkPanel_Button_RemoveTag_Label": {
			"message": "Remove tag"
		},
		"bookmarkPanel_Button_AddBookmark_Label": {
			"message": "Add Bookmark"
		},
		"bookmarkPanel_Button_RemoveBookmark_Label": {
			"message": "Remove"
		},
		"bookmarkPanel_Button_UpdateBookmark_Label": {
			"message": "Update"
		},
		"working_Title" : {
			"message":  "Working on it..."
		},
		"working_Message" : {
			"message":  "Don't close the window yet."
		},
		"error_Default_Title" : {
			"message":  "Something went wrong"
		},
		"error_Default_Message" : {
			"message":  "If the problem persists, submit an issue for the xBrowserSync team at https://github.com/xBrowserSync/App."
		},
		"error_HttpRequestFailed_Title" : {
			"message":  "Connection lost"
		},
		"error_HttpRequestFailed_Message" : {
			"message":  "Couldn't connect to the xBrowserSync service, check the service status in the Settings panel."
		},
		"error_TooManyRequests_Title" : {
			"message":  "Slow down!"
		},
		"error_TooManyRequests_Message" : {
			"message":  "Too many requests sent, sync has been disabled. Re-enable sync to resume syncing."
		},
		"error_RequestEntityTooLarge_Title" : {
			"message":  "Sync data limit exceeded"
		},
		"error_RequestEntityTooLarge_Message" : {
			"message":  "Unable to sync your data as it exceeds the size limit set by the xBrowserSync service. Remove some old bookmarks and try again or switch to a different xBrowserSync service that allows for larger syncs."
		},
		"error_NotAcceptingNewSyncs_Title" : {
			"message":  "Service not accepting new syncs"
		},
		"error_NotAcceptingNewSyncs_Message" : {
			"message":  "Unable to sync as this xBrowserSync service is not currently accepting new syncs. If you have already created a sync using this service enter your xBrowserSync ID, or change to an alternative service."
		},
		"error_DailyNewSyncLimitReached_Title" : {
			"message":  "Daily new sync limit reached"
		},
		"error_DailyNewSyncLimitReached_Message" : {
			"message":  "Unable to create new sync as you have reached your daily new sync limit for this xBrowserSync service. Sync with an existing xBrowserSync ID, choose a different service or try again tomorrow."
		},
		"error_MissingClientData_Title" : {
			"message":  "Missing xBrowserSync ID or secret"
		},
		"error_MissingClientData_Message" : {
			"message":  "Re-enable sync and try again."
		},
		"error_NoDataFound_Title" : {
			"message":  "No data found"
		},
		"error_NoDataFound_Message" : {
			"message":  "Double check your xBrowserSync ID and secret and try again."
		},
		"error_NoDataToRestore_Title" : {
			"message":  "No data to restore"
		},
		"error_NoDataToRestore_Message" : {
			"message":  "Ensure you have provided a valid xBrowserSync back up before restoring."
		},
		"error_FailedGetLocalBookmarks_Title" : {
			"message":  "Couldn't get local bookmarks"
		},
		"error_FailedGetLocalBookmarks_Message" : {
			"message":  "An error occurred when trying to retrieve local bookmarks."
		},
		"error_FailedCreateLocalBookmarks_Title" : {
			"message":  "Couldn't create bookmarks"
		},
		"error_FailedCreateLocalBookmarks_Message" : {
			"message":  "An error occurred when trying to create a local bookmark."
		},
		"error_FailedRemoveLocalBookmarks_Title" : {
			"message":  "Couldn't overwrite bookmark"
		},
		"error_FailedRemoveLocalBookmarks_Message" : {
			"message":  "An error occurred when trying to overwrite local bookmarks."
		},
		"error_InvalidData_Title" : {
			"message":  "Couldn't decrypt xBrowserSync data"
		},
		"error_InvalidData_Message" : {
			"message":  "Ensure your secret is identical to the one used when you created the sync for this ID."
		},
		"error_LastChangeNotSynced_Title" : {
			"message":  "Last change not synced"
		},
		"error_LastChangeNotSynced_Message" : {
			"message":  "The last change was not synced due to a bookmarks conflict. It would be a good idea to disable and re-enable sync before continuing."
		},
		"error_BookmarkNotFound_Title" : {
			"message":  "Bookmark not found"
		},
		"error_BookmarkNotFound_Message" : {
			"message":  "It looks like your bookmarks are out of sync. It would be a good idea to disable and re-enable sync before continuing."
		},
		"error_OutOfSync_Title" : {
			"message":  "Data out of sync"
		},
		"error_OutOfSync_Message" : {
			"message":  "Local data was out of sync but has now been refreshed. However, your last change was not synced so you will need to redo this change."
		},
		"error_ContainerChanged_Title" : {
			"message": "xBrowserSync folder changed"
		},
		"error_ContainerChanged_Message" : {
			"message": "Changing, deleting or moving xBrowserSync application folders can cause issues, sync has been disabled. Re-enable sync to restore bookmarks."
		},
		"error_BrowserImportBookmarksNotSupported_Title" : {
			"message":  "Importing not supported"
		},
		"error_BrowserImportBookmarksNotSupported_Message" : {
			"message":  "Browser import bookmarks functionality is not supported in xBrowserSync. Create a new sync to sync your newly imported bookmarks."
		},
		"error_NotImplemented_Title" : {
			"message":  "Function not implemented"
		},
		"error_NotImplemented_Message" : {
			"message":  "A required function has not been implemented and is causing xBrowserSync to not function correctly."
		},
		"error_SyncInterrupted_Title" : {
			"message":  "Sync interrupted"
		},
		"error_SyncInterrupted_Message" : {
			"message":  "A previous sync was interrupted and failed to complete. Re-enable sync to restore your synced data."
		}
	}


/* ------------------------------------------------------------------------------------
 * Constructor
 * ------------------------------------------------------------------------------------ */
    
	var WebAppImplementation = function() {
		// Inject required platform implementation functions
		platform.Bookmarks.Clear = clearBookmarks;
        platform.Bookmarks.ContainsCurrentPage = containsCurrentPage;
		platform.Bookmarks.Populate = populateBookmarks;
		platform.Constants.Get = getConstant;
        //platform.CurrentUrl.Get = getCurrentUrl;
		platform.Init = init;
        platform.Interface.Refresh = refreshInterface;
		platform.LocalStorage.Get = getFromLocalStorage;
		platform.LocalStorage.Set = setInLocalStorage;
		platform.OpenUrl = openUrl;
		platform.PageMetadata.Get = getPageMetadata;
		platform.Sync = sync;
	};


/* ------------------------------------------------------------------------------------
 * Public functions
 * ------------------------------------------------------------------------------------ */
	
	var clearBookmarks = function() {
		return $q.resolve();
	};
	
	var containsCurrentPage = function() {
        return $q.resolve(false);
		
		var deferred = $q.defer();
        
        // Get current url
        getCurrentUrl()
            .then(function(currentUrl) {
                // Find current url in local bookmarks
                chrome.bookmarks.search({ url: currentUrl }, function(results) {
                    deferred.resolve(!!results && results.length > 0);
                });
            });
        
        return deferred.promise;
    };
	
	var getConstant = function(constName) {
		return constants[constName].message;
	};
	
	var getCurrentUrl = function() {
        var deferred = $q.defer();
        
        // Get current tab
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function(tabs) {
                var activeTab = tabs[0];
                var url = activeTab.url;
                
                deferred.resolve(url);
        });
        
        return deferred.promise;
    };
    
    var getFromLocalStorage = function(itemName) {
		return localStorage.getItem(itemName);
	};
    
    var getPageMetadata = function() {
        var deferred = $q.defer();
        var metadata = {};

		return $q.resolve(metadata);
		
		// Get current tab
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function(tabs) {
                var activeTab = tabs[0];
                metadata.url = activeTab.url;
				
				// Exit if this is a chrome url
				if (!!activeTab.url && activeTab.url.toLowerCase().startsWith('chrome://')) {
					return deferred.resolve(metadata);
				}
                
				// Add listener to receive page metadata from content script
                chrome.runtime.onMessage.addListener(function(message, sender) {
					if (message.command === 'getPageMetadata') {
						if (!!message.metadata) {
							metadata.title = message.metadata.title;
							metadata.description = message.metadata.description;
							metadata.tags = message.metadata.tags;
						}
						
						deferred.resolve(metadata);
					}
				});
				
				// Run content script to return page metadata
				chrome.tabs.executeScript(null, { file: 'js/content.js' }, 
					function() {
						// If error, resolve deferred
						deferred.resolve(metadata);
					});
        });
        
        return deferred.promise;
    };

	var init = function(vm) {
		// Set login validation
		vm.sync.validateLogin = function() {
			return !!vm.settings.secret() && !!vm.settings.id();
		};

		// Set async channel to view model
		vm.sync.asyncChannel = vm;

		// Remove sync confirmation
		vm.events.syncForm_EnableSync_Click = vm.events.syncForm_ConfirmSync_Click;

		// Turn off auto focus on client secret
		vm.settings.clientSecretFocus = false;

		// Check for updates regularly
		bookmarks.CheckForUpdates();
		$interval(function() {
			bookmarks.CheckForUpdates();
		}, global.Alarm.Period.Get() * 60000);
	};

	var openUrl = function(url) {
		window.open(url, '_blank');
	};
	
	var populateBookmarks = function(xBookmarks) {
		return $q.resolve();
	};
	
	var refreshInterface = function() {
	};
	
	var setInLocalStorage = function(itemName, itemValue) {
		localStorage.setItem(itemName, itemValue);
	};
	
	var sync = function(vm, syncData, command) {
		syncData.command = (!!command) ? command : global.Commands.SyncBookmarks;

		// Start sync
		bookmarks.Sync(syncData)
			.then(function() {
				vm.events.handleSyncResponse({ command: syncData.command, success: true });
			})
			.catch(function(err) {
				vm.events.handleSyncResponse({ command: syncData.command, success: false, error: err });
			});
	};
	
	
	// Call constructor
	return new WebAppImplementation();
};