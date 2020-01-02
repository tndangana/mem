
module.exports=(app)=>{
   
    require('./test.route')(app);
    require('./user.route')(app);

}
