export class Logger {
  LogError() {
    console.log("Logger Error");
  }

  LogInfo() {
    console.log("Logger Info");
  }
}

export class DbLogger extends Logger {
  override LogError() {
    console.log("db error");
  }
  override LogInfo() {
    console.log("db info");
  }
}

export class FileLogger extends Logger {
  override LogError() {
    console.log("File Error");
  }

  override LogInfo() {
    console.log("File info");
  }
}
