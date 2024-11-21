# Google-Drive-TOC

## Background

Google drives can become very convoluted very quickly with folders nested inside more deeply nested folders. As such, the hard to navigate file system google drive provides, can be hard to traverse when you're not sure where the file you're looking for is located, or what the exact name is. As such, I wanted to create a simple script that would create a TOC (table of contents) for a specified directory.

## Creating your container-bound appscript

1. Create a google document and open it
2. Click on the **Extensions > Appscript** menu bar item
3. This will create a container-bound appscript
4. Rename the file to something like Google-Drive-TOC
5. Copy paste the contents from this repository's Code.gs into your script's Code.gs
6. On the left hand side of your browser window, click on the Project Settings (gear icon)
7. Once in project settings, enable "Show 'appsscript.json' manifest file in editor"
8. Copy paste the contents from this repository's appscript.json into your script's appscript.json

## Setting up to run your container-bound appscript

You most likely don't want to run your script via this editor window, so we need do some things to handle this.

1. On the left hand side of your browser window, click on Triggers (stop-watch icon)
2. Click on add trigger & choose the following modes

```
Choose which function to run: createMenuItem
Choose which deployment should run: Head
Select event source: From document
Select event type: On Open
Failure notification settings: Notify me weekly
```

3. Click on save
4. Since it's your first trigger it will ask for permissions (look those over)
```
This will allow Google-Drive-TOC to:
- See and download all your Google Drive files
- View and manage documents that this application has been installed in
- See, edit, create, and delete all your Google Docs documents
```
5. Accept them

---

### Note: I personally don't like how many permissions it asks for, and so I do the following to clean them up
**IMPORTANT:** For this to work, it has to be AFTER you've already created the trigger otherwise you have to start from the beginning

1. Once your trigger has been created and permissions accepted
2. Go to Google Account > Security
3. You will see a section called "Your Connections to third-party apps & services"
4. Click on See all connections > Google-Drive-TOC (or whatever your script is called) > See details > Remove all access > Confirm
5. From here, we go back to the appscript window
7. Reload it, and make sure that the trigger still shows up
6. On the left hand side of your browser window, make sure to click on Editor (the code bracket icon)
7. On the top menu bar, select the function-to-run and make sure that it's set to "createMenuItem"
8. Click Run
9. From here, it will ask you for review permissions once again, but you'll notice that they're less permissions than previously requested (these are the only permissions that the script actually requires)
```
This will allow Google-Drive-TOC to:
- See and download all your Google Drive files
- View and manage documents that this application has been installed in
```
10. Accept them
11. You can now exit the appscript editor window

## Using your appscript

1. Open your google document
2. Click on Extensions > Google-Drive-TOC > Traverse Folder
3. Enter the ID of the directory you wish to traverse
4. Click enter and give it a little time to run and complete

**Note: To get the ID of the directory you just have to visit the directory and copy the string the unique identifier in the url.**

As follows:

```
Example: https://drive.google.com/drive/folders/2t_OAdhehfkasdkalsdjsoe-LU1/
Copied: 2t_OAdhehfkasdkalsdjsoe-LU1
```