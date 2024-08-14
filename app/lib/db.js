const {username,password}= process.env
export const connectionStr="mongodb+srv://"+username+":"+password+"@cluster0.ujeso.mongodb.net/foodDB?retryWrites=true&w=majority&appName=Cluster0";