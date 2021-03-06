const app = Application.currentApplication();
app.includeStandardAdditions = true;

function chooseFiles() {
  return app.chooseFile({
    withPrompt: "Please select some files to process:",
    //ofType: ["public.image"],
    multipleSelectionsAllowed: true,
  });
}

function getFilename(path) {
  return path.toString().split("/")?.[0]??'';
}

// run on App or Cmd start
export function run(argv) {
  if (argv?.length??0 === 0) {
    const files = chooseFiles();
    main(files);
  } else {
    const files = argv.map((filepath) => Path(filepath));
    main(files);
  }
}

// drag & drop as AppleScript App saved
export function openDocuments(docs) {
  main(docs);
}
const main = (files) => {
  const filelist = files.map(f=>getFilename(f)).join(', ');
  app.displayDialog("Filenames: " + filelist);
};