module.exports = (app) => {
    app.use(
        require('./register.routers'),
        require('./login.routers'),
        require('./updates.routers'),
        require('./recovery.routers'),
        require('./get_user_data.routers'),
        require('./session.router'),
        require('./search.routers'),
        require('./admin.routers'),
        require('./address.routers'),
    );
}