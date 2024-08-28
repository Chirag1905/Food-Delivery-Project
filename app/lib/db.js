const { USERNAMEE, PASSWORD } = process.env;

export const connectionStr =
  "mongodb+srv://" +
  USERNAMEE +
  ":" +
  PASSWORD +
  "@cluster0.ujeso.mongodb.net/foodDB?retryWrites=true&w=majority&appName=Cluster0";
// export const connectionStr ="mongodb+srv://test:test@cluster0.ujeso.mongodb.net/foodDB?retryWrites=true&w=majority&appName=Cluster0";
