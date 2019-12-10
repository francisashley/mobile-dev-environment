// Provide an error and retrieve trace information
module.exports = function tracer(error) {
  // Get stack as string
  let stack = error.stack;
  // Get last line of stack
  stack = stack.split("\n")[stack.split("\n").length - 1];
  // Break stack into pieces of information
  const pieces = stack.split(":");
  // Get line number
  const lineNumber = pieces[3];
  // Get file path
  const filePath = (pieces[0].split("at ").join("") + ":" + pieces[1]).replace(/ /g, "");
  // Get file name
  const fileName = filePath.replace(/^.*[\\/]/, "");

  return {
    fileName: fileName.length > 0 ? fileName : "N/A",
    filePath,
    lineNumber
  };
};
