/*
 * Run-Manually: To run this script manually via the function-to-run dropdown menu, use main()
 * Document-Trigger: To use this script in your document, set a trigger that runs createMenuItem()
*/

// Set the table of contents styling
const FONT_FAMILY = 'Times New Roman';
const FOREGROUND = '#507FCA';
const LINE_SPACING = 1.5;
const BOLD = true

// Create a submenu item for the document: Extensions > [ScriptName] > Traverse Folder
function createMenuItem(ev) {
  DocumentApp.getUi().createAddonMenu()
    .addItem("Traverse Directory", "main")
    .addToUi();
}

// Get the folder to traverse from the user
function getTraverseFolderId() {
  const ui = DocumentApp.getUi();

  // Prompt for the user for the parent folder ID
  const userInput = ui.prompt("\n\nSpecify the ID of the directory you wish to traverse:\n");
  const traverseFolderId = userInput.getResponseText();

  Logger.log("parentFolderId: " + traverseFolderId);
  return traverseFolderId;
}

function traverseDrive(parentFolderId, hierarchy = [], depth = 0) {
  // Get the folder by ID
  const folder = DriveApp.getFolderById(parentFolderId);
  const folderObj = {
    name: folder.getName(),
    url: folder.getUrl(),
    id: folder.getId(),
    depth: depth,
    type: "Folder"
  }
  Logger.log(`[${folderObj.name}](${folderObj.url}) - FolderId: ${folderObj.id}`);
  hierarchy.push(folderObj);

  // List all files in the folder
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();

    const fileObj = {
      name: file.getName(),
      url: file.getUrl(),
      id: file.getId(),
      depth: depth + 1,
      type: "File"
    }
    Logger.log(`[${fileObj.name}](${fileObj.url}) - FileId: ${fileObj.id}`);
    hierarchy.push(fileObj);
  }

  // List all subfolders in the folder
  const subfolders = folder.getFolders();
  while (subfolders.hasNext()) {
    const subfolder = subfolders.next();

    // Recursively traverse the subfolder
    traverseDrive(subfolder.getId(), hierarchy, depth + 1);
  }

  return hierarchy;
}

function setFileHeader(content) {
  const file = DocumentApp.getActiveDocument();
  const body = file.getBody();
  const headerParagraph = body.setText(content);

  // Style the header
  headerParagraph.setFontFamily(FONT_FAMILY);
  headerParagraph.setForegroundColor(FOREGROUND);
  headerParagraph.setFontSize(18);
  headerParagraph.setUnderline(true);
  headerParagraph.setBold(BOLD);

  const paragraphs = body.getParagraphs();
  paragraphs[0].setLineSpacing(LINE_SPACING);
}

function writeLinkToFile(el) {
  const file = DocumentApp.getActiveDocument();
  const body = file.getBody();

  // Create an indented link
  const indentation = '\t'.repeat(el.depth);
  let linkParagraph;

  if (el.type == "Folder") {
    linkParagraph = body.appendParagraph(indentation + el.name + "/");
  } else if (el.type == "File") {
    linkParagraph = body.appendParagraph(indentation + el.name);
  }

  linkParagraph.setLinkUrl(el.url);

  // Style the link
  linkParagraph.setFontFamily(FONT_FAMILY);
  linkParagraph.setForegroundColor(FOREGROUND);
  linkParagraph.setFontSize(12);
  linkParagraph.setUnderline(false);
  linkParagraph.setBold(BOLD);
  linkParagraph.setLineSpacing(LINE_SPACING);
}

function clearFile() {
  const file = DocumentApp.getActiveDocument();
  const body = file.getBody();
  body.setText('');
}

function main() {
  // Get the folder to traverse & traverse it
  const traverseFolderId = getTraverseFolderId();
  const hierarchy = traverseDrive(traverseFolderId);

  // Write the header & returned hierarchy to the file
  setFileHeader("Table of Contents:");
  for (const el of hierarchy) {
    writeLinkToFile(el);
    Logger.log(el);
  }
}